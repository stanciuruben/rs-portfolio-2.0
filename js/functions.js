// Add Event Cross Browser
function addEvent(elem, event, fn) {
	// Avoid memory overhead of new anonymous functions for every event handler that's installed
	// By using local functions
	function listenHandler(e) {
		var ret = fn.apply(this, arguments);
		if (ret === false) {
			e.stopPropagation();
			e.preventDefault();
		}
		return ret;
	}

	function attachHandler() {
		// Set the this pointer same as addEventListener when fn is called
		// And make sure the event is passed to the fn also so that works the same too
		var ret = fn.call(elem, window.event);
		if (ret === false) {
			window.event.returnValue = false;
			window.event.cancelBubble = true;
		}
		return ret;
	}

	if (elem.addEventListener) {
		elem.addEventListener(event, listenHandler, false);
		return { elem: elem, handler: listenHandler, event: event };
	} else {
		elem.attachEvent('on' + event, attachHandler);
		return { elem: elem, handler: attachHandler, event: event };
	}
}

// HTTP request Cross Browser
var XMLHttpFactories = [
	function () {
		return new XMLHttpRequest();
	},
	function () {
		return new ActiveXObject('Msxml3.XMLHTTP');
	},
	function () {
		return new ActiveXObject('Msxml2.XMLHTTP.6.0');
	},
	function () {
		return new ActiveXObject('Msxml2.XMLHTTP.3.0');
	},
	function () {
		return new ActiveXObject('Msxml2.XMLHTTP');
	},
	function () {
		return new ActiveXObject('Microsoft.XMLHTTP');
	}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i = 0; i < XMLHttpFactories.length; i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		} catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}

function sendRequest(url, postData, callback) {
	var req = createXMLHTTPObject();
	if (!req) return;
	var method = postData ? 'POST' : 'GET';
	req.open(method, url, true);
	req.setRequestHeader('Access-Control-Allow-Origin', true);
	if (postData)
		req.setRequestHeader(
			'Content-type',
			'application/x-www-form-urlencoded'
		);
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			// alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
	};
	if (req.readyState == 4) return;
	req.send(postData);
}
