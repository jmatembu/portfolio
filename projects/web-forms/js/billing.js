/*********Signup Form*********/
(function(){

	var form = document.querySelector('form.billing-form'),
		billingFirstName = form.elements.billing_first_name,
		billingLastName = form.elements.billing_last_name,
		billingAddress = form.elements.billing_address,
		billingCountry = form.elements.billing_country,
		billingCity = form.elements.billing_city,
		billingIsShipping = form.elements.billing_is_shipping,
		shippingFirstName = form.elements.shipping_first_name,
		shippingLastName = form.elements.shipping_last_name,
		shippingAddress = form.elements.shipping_address,
		shippingCountry = form.elements.shipping_country,
		shippingCity = form.elements.shipping_city,
		shippingDetails = document.getElementById('shipping-details'),

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

		billingIsEmpty = function() {
			return false;
		},

		validateForm = function() {

			var message = "";

			if (validator.isEmpty(billingFirstName.value)) {

				message = "We need to know your first name.";
				setErrors(billingFirstName, message);
				
			} else if (!validator.isOfLength(billingFirstName.value, 2)) {

				message = "Please provide your first name in full e.g Joe";
				setErrors(billingFirstName, message);

			} 

			if (validator.isEmpty(billingLastName.value)) {

				message = "We need to know your last name.";
				setErrors(billingLastName, message);

			} else if (!validator.isOfLength(billingLastName.value, 2)) {

				message = "Please provide your last name in full e.g Carter";
				setErrors(billingLastName, message);

			}

			if (validator.isEmpty(billingAddress.value)) {

				message = "Please provide your date of birth.";
				setErrors(billingAddress, message);
				
			} else if (!validator.isLength(billingAddress.value, 250)) {
				
				message = "Address information exceeds limit.";
				setErrors(billingAddress, message);

			}

			if (validator.isEmpty(billingCountry.value)) {

				message = "Please select country.";
				setErrors(billingCountry, message);

			}

			if (!validator.isEmpty(billingCountry.value) && validator.isEmpty(billingCity.value)) {

				message = "Please select city.";
				setErrors(billingCity, message);
				
			}

			if (validator.isEmpty(shippingFirstName.value)) {

				message = "We need to know your first name.";
				setErrors(shippingFirstName, message);
				
			} else if (!validator.isOfLength(billingFirstName.value, 2)) {

				message = "Please provide your first name in full e.g Joe";
				setErrors(shippingFirstName, message);
				
			} 

			if (validator.isEmpty(shippingLastName.value)) {

				message = "We need to know your last name.";
				setErrors(shippingLastName, message);

			} else if (!validator.isOfLength(shippingLastName.value, 2)) {

				message = "Please provide your last name in full e.g Carter";
				setErrors(shippingLastName, message);

			}

			if (validator.isEmpty(shippingAddress.value)) {

				message = "Please provide your date of birth.";
				setErrors(shippingAddress, message);
				
			} else if (!validator.isLength(shippingAddress.value, 250)) {
				
				message = "Address information exceeds limit.";
				setErrors(shippingAddress, message);

			}

			if (validator.isEmpty(shippingCountry.value)) {

				message = "Please select country.";
				setErrors(shippingCountry, message);
				
			}

			if (!validator.isEmpty(shippingCountry.value) && validator.isEmpty(shippingCity.value)) {

				message = "Please select city.";
				setErrors(shippingCity, message);
				
			}

		};

	populateSelectElement(billingCountry, countryNames);
	populateSelectElement(shippingCountry, countryNames);

	billingFirstName.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(billingFirstName.value) || validator.isOfLength(billingFirstName.value, 2)) {
			doClearError();
		}

	}, false);

	billingLastName.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(billingLastName.value) || validator.isOfLength(billingLastName.value, 2)) {
			doClearError();
		}

	}, false);

	billingAddress.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(billingAddress.value) || validator.isLength(billingAddress.value, 250)) {
			doClearError();
		}

	}, false);

	billingCountry.addEventListener('change', function(e) {

		// TODO: Refactor this code, like separate code into a reusable function perhaps?
		var selected = this.value,
			doClearError = clearError.bind(this),
			country;

		country = countryData.getCountryData(selected);

		if (billingCity.options.length > 1) {

			for (var i = billingCity.options.length - 1; i >= 1; i--) {
				billingCity.options.remove(i); // Remove an entire city option element
			}

		}
		// Only if a country was found
		if (country !== undefined) {
			populateSelectElement(billingCity, country.cities);	
		}

		if (!validator.isEmpty(selected)) {
			doClearError();
		}

	});

	billingCity.addEventListener('change', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(this.value)) {
			doClearError();
		}
		
	});

	shippingFirstName.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(shippingFirstName.value) || validator.isOfLength(shippingFirstName.value, 2)) {
			doClearError();
		}

	}, false);

	shippingLastName.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(shippingLastName.value) || validator.isOfLength(shippingLastName.value, 2)) {
			doClearError();
		}

	}, false);

	shippingAddress.addEventListener('input', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(shippingAddress.value) || validator.isLength(shippingAddress.value, 250)) {
			doClearError();
		}

	}, false);

	shippingCountry.addEventListener('change', function(e) {

		// TODO: Refactor this code, like separate code into a reusable function perhaps?
		var selected = this.value,
			doClearError = clearError.bind(this),
			country;

		country = countryData.getCountryData(selected);

		if (shippingCity.options.length > 1) {

			for (var i = shippingCity.options.length - 1; i >= 1; i--) {
				shippingCity.options.remove(i); // Remove an entire city option element
			}

		}
		// Only if a country was found
		if (country !== undefined) {
			populateSelectElement(shippingCity, country.cities);	
		}

		if (!validator.isEmpty(selected)) {
			doClearError();
		}

	});

	shippingCity.addEventListener('change', function(e) {

		var doClearError = clearError.bind(this);

		if (!validator.isEmpty(this.value)) {
			doClearError();
		}
		
	});

	billingIsShipping.addEventListener('change', function(e) {
		
		if (billingIsShipping.checked) {
			shippingDetails.setAttribute('class', 'hidden');
		} else {
			shippingDetails.removeAttribute('class');
		}

	});

	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something

	}, false);

})();