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
