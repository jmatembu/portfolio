/*********Signup Form*********/
(function(){

	var form = document.querySelector('form.appointment-form'),
		email = form.elements.email,
		phoneNumber = form.elements.phone_number,
		message = form.elements.message,
		scheduleDate = form.elements.schedule_date,
		scheduleTime = form.elements.schedule_time,
		scheduleTimezone = form.elements.schedule_timezone,

		clearError = function() {

			this.className = "";
			this.nextElementSibling.className = "error";
			this.nextElementSibling.textContent = "";

		},

		validateForm = function() {

			var emailInput = email.value,
				phoneNumberInput = phoneNumber.value,
				messageInput = message.value,
				scheduleDateInput = scheduleDate.value,
				scheduleTimeInput = scheduleTime.value,
				scheduleTimezoneInput = scheduleTimezone.value;

			if (validator.isEmpty(emailInput)) {

				email.className = "invalid";
				email.nextElementSibling.className = "error active";
				email.nextElementSibling.textContent = "Please provide your email address, we need it to identify you.";
				
			} else if (!validator.isEmailAddress(emailInput)) {

				email.className = "invalid";
				email.nextElementSibling.className = "error active";
				email.nextElementSibling.textContent = "The email is of an invalid format. Emails are usually in this format: 'username@domain.com'";
				
			}

			if (!validator.isEmpty(phoneNumberInput) && !validator.isPhoneNumber(phoneNumberInput)) {

				phoneNumber.className = "invalid";
				phoneNumber.nextElementSibling.className = "error active";
				phoneNumber.nextElementSibling.textContent = "Phone number format is invalid. Use the format: +256 70 2111111";
				
			} 

			if (!validator.lessWordsThan(messageInput, 500)) {

				message.className = "invalid";
				message.nextElementSibling.className = "error active";
				message.nextElementSibling.textContent = "Your message is more than 500 words limit.";

			}

			if (validator.isEmpty(scheduleDateInput)) {

				scheduleDate.className = "invalid";
				scheduleDate.nextElementSibling.className = "error active";
				scheduleDate.nextElementSibling.textContent = "Please provide your date of birth.";
				
			} else if (!validator.isAfterToday(scheduleDateInput)) {
				
				scheduleDate.className = "invalid";
				scheduleDate.nextElementSibling.className = "error active";
				scheduleDate.nextElementSibling.textContent = "Your scheduled date can only be after today. :)";

			}

			if (validator.isEmpty(scheduleTimeInput)) {

				scheduleTime.className = "invalid";
				scheduleTime.nextElementSibling.className = "error active";
				scheduleTime.nextElementSibling.textContent = "Please specify preferred time of appointment.";

			} 

			if (validator.isEmpty(scheduleTimezoneInput)) {

				scheduleTimezone.className = "invalid";
				scheduleTimezone.nextElementSibling.className = "error active";
				scheduleTimezone.nextElementSibling.textContent = "Please select your timezone";
				
			}

		};

	email.addEventListener('input', function(e) {

		var input = email.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input) || validator.isEmailAddress(input)) {

			doClearError();

		}

	}, false);

	phoneNumber.addEventListener('input', function(e) {

		var phoneNumberInput = phoneNumber.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(phoneNumberInput) || validator.isPhoneNumber(phoneNumberInput)) {
			
			doClearError();

		 }

	}, false);

	message.addEventListener('input', function(e) {

		var messageInput = message.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(messageInput) || validator.lessWordsThan(messageInput, 500)) {
			
			doClearError();

		 }

	}, false);

	scheduleDate.addEventListener('input', function(e) {

		var scheduleDateInput = this.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(scheduleDateInput) || validator.isAfterToday(scheduleDateInput)) {

			doClearError();
		}

	}, false);

	scheduleTime.addEventListener('input', function(e) {

		var scheduleTimeInput = scheduleDate.value + this.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(scheduleTimeInput) || validator.isAfterToday(scheduleTimeInput)) {

			doClearError();
		}

	}, false);

	scheduleTimezone.addEventListener('input', function(e) {

		var scheduleTimezoneInput = this.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(scheduleTimezoneInput)) {

			doClearError();
		}

	}, false);


	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something

	}, false);

})();