(function(window) {

	var calculator = {},
		screen = document.getElementById('screen'),
		clearButton = document.getElementById('clearScreen'),
		deleteButton = document.getElementById('delete'),
		numButtons = document.querySelectorAll('.num'),
		equalsButton = document.getElementById('equals'),
		clearInput = function(element) {
			return element.value = "";
		},
		deleteCharacter = function(element) {
			var string = element.value,
				newString = string.substr(0, string.length - 1);

			element.value = newString;
		},
		calculate = function(string) {
			return eval(string);
		};

	clearButton.addEventListener('click', function() {
		return clearInput(screen);
	});

	deleteButton.addEventListener('click', function() {
		return deleteCharacter(screen);
	});

	equalsButton.addEventListener('click', function() {
		var equation = screen.value;
		screen.value = eval(equation);
	})


	for (var i = 0; i < numButtons.length; i++) {
		numButtons[i].addEventListener('click', function(event) {
			screen.value = screen.value + event.target.value;
		});
	}

})(window);

