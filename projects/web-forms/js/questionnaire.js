/*********Login Form*********/
(function(){

	var form = document.querySelector('form.questionnaire-form'),
		clubOptions = document.getElementById('clubOption'),
		other = form.other_club;

	other.addEventListener('input', function(e) {

		if (!validator.isEmpty(other.value)) {

			clubOptions.firstElementChild.className = "error";
			clubOptions.firstElementChild.textContent = "";
			this.className = "";

		}
	});

	form.addEventListener('submit', function(e) {

		e.preventDefault();

		var club = this.elements.club,
			otherClub = this.elements.other_club;

		if (club.value === "Other" && validator.isEmpty(otherClub.value)) {

			clubOptions.firstElementChild.className = "error active";
			clubOptions.firstElementChild.textContent = "You have to provide a value because you selected: " + club.value;
			otherClub.className = "invalid";
			
		}

		// Do something with the form's data

	}, false);

})();