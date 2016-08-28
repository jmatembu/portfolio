/*********Signup Form*********/
(function(){

	var form = document.querySelector('form.billing-form'),
		billingFirstName = form.elements.billing_first_name,
		billingLastName = form.elements.billing_last_name,
		billingAddress = form.elements.billing_address,
		billingCountry = form.elements.billing_country,
		billingCity = form.elements.billing_city,
		billingIsShipping = form.elements.billing_is_shipping,

		countryData = {
			countries: [
				{
					name: "Kenya",
					cities: ["Mombasa", "Nairobi"]
				},
				{
					name: "Tanzania",
					cities: ["Arusha", "Dar es Salam", "Dodoma"]
				},
				{
					name: "Uganda",
					cities: ["Kampala"]
				}
			],
			getCountryData: function(country) {

				var i,
					countries = this.countries,
					obj = countries.find(function(value) {
						return value.name === country;
					});

				return obj;
			},
			getCountryNames: function() {

				var names = [],
					countries = this.countries;

				for (var i = countries.length - 1; i >= 0; i--) {

					if (countries[i].hasOwnProperty('name')) {

						names.push(countries[i].name);

					}

				}

				return names;
			}
		},

		countryNames = countryData.getCountryNames(countryData.countries),

		addOption = function(selectElement, option) {
			var elementOption = document.createElement('option'),
				optionValue = document.createTextNode(option);

			elementOption.setAttribute('value', option);
			elementOption.appendChild(optionValue);
			selectElement.appendChild(elementOption);
		},

		populateSelectElement = function(element, options) {
			
			options.forEach(function(value) {
				return addOption(element, value);
			});

		},

		clearError = function() {

			this.className = "";
			this.previousElementSibling.className = "error";
			this.previousElementSibling.textContent = "";

		},

		billingIsEmpty = function() {
			return false;
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

	populateSelectElement(billingCountry, countryNames);

	billingCountry.addEventListener('change', function(e) {

		// TODO: Refactor this code, like separate code into a reusable function perhaps?
		var selected = this.value,
			country;

		country = countryData.getCountryData(selected);

		if (billingCity.options.length > 1) {

			for (var i = billingCity.options.length - 1; i >= 1; i--) {

				billingCity.options.remove(i); // Remove an entire city option element

			}

		}
		// Only if a country was found
		if (country !== undefined) {
			// Will populated city element with the provided list of cities
			populateSelectElement(billingCity, country.cities);	
		}

	});

	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something

	}, false);

})();