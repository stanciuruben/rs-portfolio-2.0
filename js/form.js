function sendMail() {
	// Validation

	sendRequest(
		'http://localhost:3421/',
		'name=' +
			nameInput.value +
			'&email=' +
			emailInput.value +
			'&message=' +
			messageInput.value,
		function (req) {
			if (JSON.parse(req.response) === true) {
				// Show user successful message
				return;
			}
			// Show user error message
		}
	);
	return false;
}

var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('form-name');
var emailInput = document.getElementById('form-email');
var messageInput = document.getElementById('form-message');
addEvent(contactForm, 'submit', sendMail);
