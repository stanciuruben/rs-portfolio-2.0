function sendMail(e) {
	e.preventDefault();

	// Validation
	var errors = [];
	if (nameInput.value.length < 2 || nameInput.value.length > 35) {
		nameInput.style.border = '1px solid red';
		errors.push('Name must be between 2 and 35 characters!');
	} else {
		nameInput.style.border = 'none';
	}
	if (emailInput.value.length < 1) {
		emailInput.style.border = '1px solid red';
		errors.push('Email too short!');
	} else {
		emailInput.style.border = 'none';
	}
	if (messageInput.value.length < 3 || messageInput.value.length > 2000) {
		messageInput.style.border = '1px solid red';
		errors.push('Message must be between 3 and 2000 characters!');
	} else {
		messageInput.style.border = 'none';
	}

	if (errors.length > 0) {
		var errorList = '';
		for (var i = 0; i < errors.length; i++) {
			errorList += `<li>${errors[i]}</li>`;
		}
		contactModalTitle.innerText = 'Invalid Inputs';
		contactModalInfo.innerHTML = errorList;
		contactModal.showModal();
		return;
	}

	var URL = 'http://localhost:3421/';

	sendRequest(
		URL,
		'name=' +
			nameInput.value +
			'&email=' +
			emailInput.value +
			'&message=' +
			messageInput.value,
		function (req) {
			if (JSON.parse(req.response) === true) {
				// Show user successful message
				contactModalTitle.innerHTML = `Thank you ${nameInput.value}, for your message! I'll respond to you at ${emailInput.value} as soon as possible.`;
				contactModalInfo.innerHTML = '';
				contactModal.showModal();

				// Remove form from UI
				var newTitle = document.createElement('h2');
				newTitle.innerText = 'Message Sent!';
				newTitle.classList.add('text-center', 'heading-1');
				newTitle.style.color = 'var(--secondary)';
				contactFormContainer.insertAdjacentElement(
					'afterend',
					newTitle
				);
				contactFormContainer.style.display = 'none';
			} else {
				// Show user error message
				contactModalTitle.innerHTML = `Something went wrong! Message could not be sent, please try again later or contact me via e-mail!`;
				contactModalInfo.innerHTML = '';
				contactModal.showModal();
			}
		}
	);

	return false;
}

var contactFormContainer = document.getElementById('contact-form-container');
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('form-name');
var emailInput = document.getElementById('form-email');
var messageInput = document.getElementById('form-message');
var contactModal = document.getElementById('contact-modal');
var contactModalTitle = document.getElementById('contact-modal__title');
var contactModalInfo = document.getElementById('contact-modal__info');
addEvent(contactForm, 'submit', sendMail);
