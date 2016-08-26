/*********Login Form*********/
(function(){

	var form = document.querySelector('form.login-form'),
		email = form.elements.email,
		password = form.elements.password,

		clearError = function() {

			this.className = "";
			this.previousElementSibling.className = "error";
			this.previousElementSibling.textContent = "";

		},

		validateForm = function() {

			var passwordInput = password.value,
				emailInput = email.value;

			if (validator.isEmpty(emailInput)) {

				email.className = "invalid";
				email.previousElementSibling.className = "error active";
				email.previousElementSibling.textContent = "Please provide your email address, we need it to identify you.";
				
			} else if (!validator.isEmailAddress(emailInput)) {

				email.className = "invalid";
				email.previousElementSibling.className = "error active";
				email.previousElementSibling.textContent = "The email is of an invalid format. Emails are usually in this format: 'username@domain.com'";
				
			}

			if (validator.isEmpty(passwordInput)) {

				password.className = "invalid";
				password.previousElementSibling.className = "error active";
				password.previousElementSibling.textContent = "Please provide the password to your account.";

			}

		};

	email.addEventListener('input', function(e) {

		var input = email.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input) || validator.isEmailAddress(input)) {

			doClearError();

		}

	}, false);

	password.addEventListener('input', function(e) {

		var input = password.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input) || validator.isLength(input, 5)) {

			doClearError();

		}

	}, false);


	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something with the form's data

	}, false);

})();