// Navbar

var navbar = document.getElementById('navbar');
var navLinks = document.getElementsByClassName('nav-link');
var navbarToggler = document.getElementsByClassName('navbar-toggler')[0];

for (let i = 0; i < navLinks.length; i++) {
	addEvent(navLinks[i], 'click', function () {
		for (let j = 0; j < navLinks.length; j++) {
			if (j === i) {
				navLinks[i].classList.add('active');
				continue;
			}
			navLinks[j].classList.remove('active');
		}
		if (window.innerWidth < 992) {
			navbarToggler.click();
		}
	});
}

// Window Scroll

var watermarks = document.getElementById('watermarks-container');
var backToTop = document.getElementById('back-to-top');

addEvent(window, 'scroll', function () {
	var scrollTop = window.scrollY;
	if (watermarks) {
		watermarks.style.top = -(scrollTop * 1.2) + 'px';
	}
	if (backToTop) {
		if (scrollTop > 300) {
			backToTop.style.display = 'block';
		} else {
			backToTop.style.display = 'none';
		}
	}
});

// Cursors

var cursor1 = document.getElementById('cursor-1');
var cursor2 = document.getElementById('cursor-2');

addEvent(window, 'mousemove', function (e) {
	if (cursor1.classList.contains('hover-version')) {
		cursor1.style.top = e.clientY + 'px';
		cursor1.style.left = e.clientX + 'px';
		cursor2.style.display = 'none';
	} else {
		cursor2.style.display = 'block';
		cursor1.style.top = e.clientY + 'px';
		cursor1.style.left = e.clientX + 'px';
		setTimeout(function () {
			cursor2.style.top = e.clientY + 'px';
			cursor2.style.left = e.clientX + 'px';
		}, 50);
	}
});

// Interactions with other elements\

var skillItems = [].slice.call(
	document.getElementsByClassName('skills-grid-item')
);
skillItems.forEach((item) => {
	addEvent(item, 'mouseover', function (e) {
		cursor1.classList.add('hover-version');
		cursor1.innerText = item.getAttribute('data-title');
	});

	addEvent(item, 'mouseout', function (e) {
		cursor1.classList.remove('hover-version');
		cursor1.innerText = '';
	});
});

var hoverElements = [].slice.call(
	document.querySelectorAll('[data-hover="true"]')
);
hoverElements.forEach((item) => {
	addEvent(item, 'mouseover', function (e) {
		cursor1.classList.add('hover-version');
	});

	addEvent(item, 'mouseout', function (e) {
		cursor1.classList.remove('hover-version');
	});
});

// Tooltips

var tooltipTriggerList = [].slice.call(
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});
