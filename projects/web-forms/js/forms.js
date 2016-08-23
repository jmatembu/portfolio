(function() {
	var loginForm = document.getElementById('login');

	// document.forms['login'].addEventListener('submit', function(event) { 
	loginForm.addEventListener('submit', function(event) {
		
		event.preventDefault();

		var password = document.getElementById('password');

		if (!validator.isOfLength(password.value, 6)) { 
			password.setCustomValidity('Password should be 6 or more characters long.'); 
		} else if (validator.isLength(password.value, 12)) {
			password.setCustomValidity('Password should be 12 or less characters.');
		} else { 
			password.setCustomValidity(''); 
		}

		console.log(password.validity.customError);

		// var password = doc.getElementById('password'),
		// 	min = 6,
		// 	max = 12;

		// if (validator.isOfLength(password.value, min) && validator.isLength(password.value, max)) {
		// 	password.setCustomValidity('Password must be between ' + min + ' and ' + max);
		// } else {
		// 	password.setCustomValidity('');
		// }

		
	}, false);
})();