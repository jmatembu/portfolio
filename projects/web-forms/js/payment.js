/*********Signup Form*********/
(function(){

	var form = document.querySelector('form.payment-form'),
		cardName = form.elements.name,
		cardNumber = form.elements.card_number,
		cardCVV = form.elements.cvv,

		setErrors = function(element, message) {

			element.className = "invalid";
			element.nextElementSibling.className = "error active";
			element.nextElementSibling.textContent = message;

		},

		clearError = function() {

			this.className = "";
			this.nextElementSibling.className = "error";
			this.nextElementSibling.textContent = "";

		},

		validateForm = function() {

			var message = "";

			if (validator.isEmpty(cardName.value)) {

				message = "Name on the card is required.";
				setErrors(cardName, message);
				
			}

			if (validator.isEmpty(cardNumber.value)) {

				message = "Card number is required.";
				setErrors(cardNumber, message);

			} else if (!validator.isCreditCard(cardNumber.value)) {

				message = "Not a valid card number";
				setErrors(cardNumber, message);

			}

			if (validator.isEmpty(cardCVV.value)) {

				message = "Required.";
				setErrors(cardCVV, message);
				
			} else if (!validator.equalsLength(cardCVV.value, 3)) {
				
				message = "Should be 3 digits";
				setErrors(cardCVV, message);

			} else if (!validator.isNumeric(cardCVV.value)) {

				message = "Not digits";
				setErrors(cardCVV, message);
			}

		};


	cardName.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(cardName.value)) {
			doClearError();
		}

	}, false);

	cardNumber.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(cardNumber.value) || validator.isCreditCard(cardNumber.value)) {
			doClearError();
		}

	}, false);

	cardCVV.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(cardCVV.value) || 
				validator.equalsLength(cardCVV.value, 3) || 
				validator.isNumeric(cardCVV.value)) {

			doClearError();

		}

	}, false);

	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something

	}, false);

})();