/*********Signup Form*********/
(function(){

	var form = document.querySelector('form.signup-form'),
		firstName = form.elements.first_name,
		lastName = form.elements.last_name,
		dob = form.elements.dob,
		email = form.elements.email,
		password = form.elements.password,

		clearError = function() {

			this.className = "";
			this.previousElementSibling.className = "error";
			this.previousElementSibling.textContent = "";

		},

		validateForm = function() {

			var firstNameInput = firstName.value,
				lastNameInput = lastName.value,
				dobInput = dob.value,
				passwordInput = password.value,
				emailInput = email.value;

			if (validator.isEmpty(firstNameInput)) {

				firstName.className = "invalid";
				firstName.previousElementSibling.className = "error active";
				firstName.previousElementSibling.textContent = "We need to know your first name.";
				
			} else if (!validator.isOfLength(firstNameInput, 2)) {

				firstName.className = "invalid";
				firstName.previousElementSibling.className = "error active";
				firstName.previousElementSibling.textContent = "Please provide your first name in full e.g Joe";
				
			} 

			if (validator.isEmpty(lastNameInput)) {

				lastName.className = "invalid";
				lastName.previousElementSibling.className = "error active";
				lastName.previousElementSibling.textContent = "We need to know your last name.";

			} else if (!validator.isOfLength(lastNameInput, 2)) {

				lastName.className = "invalid";
				lastName.previousElementSibling.className = "error active";
				lastName.previousElementSibling.textContent = "Please provide your last name in full e.g Carter";

			}

			if (validator.isEmpty(dobInput)) {

				dob.className = "invalid";
				dob.previousElementSibling.className = "error active";
				dob.previousElementSibling.textContent = "Please provide your date of birth.";
				
			} else if (!validator.isBeforeToday(dobInput)) {
				
				dob.className = "invalid";
				dob.previousElementSibling.className = "error active";
				dob.previousElementSibling.textContent = "Your date of birth can only be before today. :)";

			}

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
				password.previousElementSibling.textContent = "You need a password to secure your account.";

			} else if (validator.isOfLength(passwordInput, 13)) {

				password.className = "invalid";
				password.previousElementSibling.className = "error active";
				password.previousElementSibling.textContent = "The password is too long. Such passwords are difficult to remember.";
				
			} else if (validator.isLength(passwordInput, 5)) {

				password.className = "invalid";
				password.previousElementSibling.className = "error active";
				password.previousElementSibling.textContent = "The password is too short. Such passwords are easier to guess.";

			}

		};

	firstName.addEventListener('input', function(e) {

		var firstNameInput = firstName.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(firstNameInput) || validator.isOfLength(firstNameInput, 2)) {
			
			doClearError();

		 }

	}, false);

	lastName.addEventListener('input', function(e) {

		var lastNameInput = lastName.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(lastNameInput) || validator.isOfLength(lastNameInput, 2)) {

			doClearError();

		}

	}, false);

	dob.addEventListener('input', function(e) {

		var dobInput = this.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(dobInput) || validator.isBeforeToday(dobInput)) {

			doClearError();
		}

	}, false);

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

		// Do something

	}, false);

})();