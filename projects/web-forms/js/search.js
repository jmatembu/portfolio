/*********Login Form*********/
(function(){

	var form = document.querySelector('form.search-form'),
		search = form.elements.s,

		clearError = function() {

			this.className = "";
			this.previousElementSibling.className = "error";
			this.previousElementSibling.textContent = "";

		},

		validateForm = function() {

			var searchInput = search.value;

			if (validator.isEmpty(searchInput)) {

				search.className = "invalid";
				search.previousElementSibling.className = "error active";
				search.previousElementSibling.textContent = "Please enter your search term.";
				
			}

		};

	search.addEventListener('input', function(e) {

		var input = search.value,
			doClearError = clearError.bind(this);

		if (!validator.isEmpty(input)) {

			doClearError();

		}

	}, false);


	form.addEventListener('submit', function(e) {

		e.preventDefault();

		validateForm();

		// Do something with the form's data

	}, false);

})();