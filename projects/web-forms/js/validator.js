(function (window) {
	var validator = {};

	/**
	 * Checks if the input parameter is an email address, consisting of three parts.
	 */
	validator.isEmailAddress = function(input) {
		var isEmail = false,
			posAtSymbol = input.indexOf('@'),
			posPeriod = input.indexOf('.');

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (posAtSymbol > 0 && posAtSymbol < input.length - 1) {
			isEmail = true;
			if (posPeriod < posAtSymbol || posPeriod === input.length -1 || posPeriod === posAtSymbol + 1 || input.charAt(posPeriod + 1) === '.') {
				isEmail = false;
			}
		}

		return isEmail;
	};

	/**
	 * Checks if the input parameter is a valid phone number for Uganda.
	 */
	validator.isPhoneNumber = function(input) {

		var result = false,
			phoneNumber = "" + input;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (!phoneNumber.startsWith('+')) {
			return false;
		} else if (phoneNumber.length !== 16) {
			return false;
		} else if (phoneNumber.charAt(4) !== " " && phoneNumber.charAt(7) !== " " && phoneNumber.charAt(11) !== " ") {
			return false;
		}

		// Start from index 1 to ignore the '+' symbol
		for (var i = 1; i < phoneNumber.length; i++) {
			
			if (Number(phoneNumber.charAt(i))) {
				result = true;
			} else {
				result = false;
			}

		}

		return result;
	};

	/**
	 * Returns the input parameter text with all symbols removed
	 */
	validator.withoutSymbols = function(input) {
		var string = "" + input;
		var result = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		for (var i = 0; i < string.length; i++) {
			if((string.charAt(i).toLowerCase() >= "a" && string.charAt(i) <= "z" ) || 
				string.charAt(i) === " " || Number(string.charAt(i))) {
				result+=string.charAt(i);
			}
		}

		return result;
	};

	/**
	 * Checks if the input parameter text is a valid date, taking a valid date as any 
	 * string that can be turned into a JavaScript Date Object.
	 */
	validator.isDate = function(input) {

		var date = new Date(input.toString());

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}


		return date !== "Invalid Date" && !isNaN(date);
	};

	/**
	 * Checks if the input parameter is a date that comes after the reference date
	 */
	validator.isBeforeDate = function(input, reference) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.isDate(input) && this.isDate(reference)) {
			return new Date(input.toString()) < new Date(reference.toString());
		}

		return false;
	};

	/**
	 * Checks if the input parameter is a date that comes before the reference date
	 */
	validator.isAfterDate = function(input, reference) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.isDate(input) && this.isDate(reference)) {
			return new Date(input.toString()) > new Date(reference.toString());
		}

		return false;
	};

	/**
	 * Checks if the input parameter is a date that comes before today
	 */
	validator.isBeforeToday = function(input) {

		input = new Date(input);

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isDate(input)) {
			return input < new Date();
		}

		return false;
	};

	validator.isAfterToday = function(input) {

		input = new Date(input);

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isDate(input)) {
			return input > new Date();
		}

		return false;
	};

	/**
	 * Checks the input parameter and returns true if it is an empty string
	 */
	validator.isEmpty = function(input) {
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input == false) {
			return true;
		}

		return false;
	};

	/**
	 * Checks if the input text parameter contains one or more of the words within the words array
	 */
	validator.contains = function(input, words) {

		var string = input.toLowerCase(),
			i,
			word = "",
			charAfterWord,
			charBeforeWord,
			wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined],
			isWordMarker = function(value) {
				return wordMarkers.indexOf(value) >= 0;
			};

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		for (i = 0; i < words.length; i++) {

			word = words[i].toLowerCase();
			charBeforeWord = string.charAt(string.indexOf(word) - 1);
			charAfterWord = string.charAt(string.indexOf(word) + word.length);

			if (string.indexOf(word) >= 0 && 
				isWordMarker(charBeforeWord) && 
				isWordMarker(charAfterWord)) {
				return true;
			}
	
		}

		return false;
	};

	/**
	 * Checks if the input text parameter does not contain any of the words within the words array.
	 */
	validator.lacks = function(input, words) {

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		if (this.contains(input, words)) {
			return false;
		}

		return true;
	};

	/**
	 * Checks that the input text parameter contains only strings found within the strings array.
	 */
	validator.isComposedOf = function(input, strings) {

		var result = false,
			i,
			len,
			start = 0,
			end = 0,
			string = "";

		input = input.toLowerCase();

		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		for (i = 0, len = strings.length; i < len; i++) {

			string = strings[i].toLowerCase();

			if (input.indexOf(string) >= 0) {

				start = input.indexOf(string);
				end = string.length - 1;

				input = input.slice(start, end);
			}

		}

		return this.isEmpty(input);
	};

	/**
	 * Checks if the input parameter’s character count is less than or equal to the n parameter.
	 */
	validator.isLength = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return input.length <= n;
	};

	/**
	 * Checks if the input parameter’s character count is greater than or equal to the n parameter.
	 */
	validator.isOfLength = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}

		return input.length >= n;
	};

	/**
	 * Counts the number of words in the input parameter.
	 */
	validator.countWords = function(input) {

		var i, len,
			word = "",
			temp = 0,
			words = [],
			isWordMarker = function(value) {
				var wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined];

				return wordMarkers.indexOf(value) >= 0;
			},
			hasWordMarker = function(value) {

				for (var i = 0; i < value.length; i++) {
					if (isWordMarker(value[i])) {
						return true;
					}
				}

				return false;

			};

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		input = input.trim();		

		if (input.length === 0) {
			return 0;
		} else if (hasWordMarker(input) && input.length > 0) {
			for (i = 0, len = input.length; i < len; i++) {

				if (isWordMarker(input[i])) {
					word = input.slice(temp, i);
					temp = i + 1;
					words.push(word);
				}
			}	
		} else {
			return 1;
		}
		

		return words.length;
	};

	/**
	 * Checks if the input parameter has a word count less than or equal to the n parameter.
	 */
	validator.lessWordsThan = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}
		return this.countWords(input) <= n;
	};

	/**
	 * Checks if the input parameter has a word count greater than or equal to the n parameter.
	 */
	validator.moreWordsThan = function(input, n) {
		if (arguments.length < 2) {
			throw "Function requires 2 parameters, " + arguments.length + " given";
		}
		return this.countWords(input) >= n;
	};

	/**
	 * Checks that the input parameter matches all of the following:
	 * 	- input is greater than or equal to the floor parameter
	 *	- input is less than or equal to the ceil parameter..
	 */
	validator.isBetween = function(input, floor, ceil) {
		if (arguments.length < 3) {
			throw "Function requires 3 parameters, " + arguments.length + " given";
		}

		return this.countWords(input) >= floor && this.countWords(input) <= ceil;
	};

	/**
	 * Checks that the input parameter string is only composed of the following characters: a—z, A—Z, or 0—9.
	 */
	validator.isAlphanumeric = function(input) {
		var code, i, len;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		for (i = 0, len = input.length; i < len; i++) {
			code = input.charCodeAt(i);
			if(!(code >= 48 && code <= 57) && !(code >= 65 && code <= 90) && !(code >= 97 && code <= 122 )) {
				return false;
			}
		}

		return true;
	};

	/**
	 * Checks if the input parameter has leading or trailing whitespaces
	 * or too many spaces between words
	 */
	validator.isTrimmed = function(input) {
		
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.charAt(0) === " " || 
			input.charAt(input.length - 1) === " " || 
			input.indexOf("  ") >= 0) {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input parameter is a credit card or bank card number.
	 */
	validator.isCreditCard = function(input) {

		var string = input.toUpperCase();

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if ((string.length === 16 && this.isAlphanumeric(string)) || 
			(string.length === 19 && 
				(string.charAt(4) === "-" && 
					string.charAt(9) === "-" && 
					string.charAt(14) === "-")
				)
			) {
			return true;
		}

		return false;
	};

	/**
	 * Checks if the input string is a hexadecimal color, such as #3677bb.
	 */
	validator.isHex = function(input) {
		var code, i, len;

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if ((input.length === 7 || input.length === 4) && input.charAt(0) === "#") {
			for (i = 1, len = input.length; i < len; i++) {
				code = input.charCodeAt(i);
				if(!(code >= 48 && code <= 57) && 
					!(code >= 65 && code <= 70) && 
					!(code >= 97 && code <= 102 )) {
					return false;
				}
			}
		} else {
			return false;
		}

		return true;
	};

	/**
	 * Checks if the input string is an RGB color, such as rgb(200, 26, 131).
	 */
	validator.isRGB = function(input) {

		var arr = [], i, len, num, string = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.indexOf("rgb(") >= 0 && input.charAt(input.length - 1) === ")") {

			string = input.replace("rgb(", "");
			string = string.replace(")", "");
			arr = string.split(",");

			if (!!arr && arr.length === 3) {
				for (i = 0, len = arr.length; i < len; i++) {
					num = Number(arr[i]);
					if (!(num >= 0 && num <= 255)) {
						return false;
					}
				}

				return true;	
			}
	
		}

		return false;
	};

	/**
	 * Checks if the input string is an HSL color, such as hsl(122, 1, 1).
	 */
	validator.isHSL = function(input) {

		var arr = [], i, len, string = "";

		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (input.indexOf("hsl(") >= 0 && input.charAt(input.length - 1) === ")") {
			
			string = input.replace("hsl(", "");
			string = string.replace(")", "");
			arr = string.split(",");

			if (!!arr && arr.length === 3 &&
				(Number(arr[0]) >= 0 && Number(arr[0]) <= 360) && 
				(Number(arr[1]) >= 0 && Number(arr[1]) <= 1) && 
				(Number(arr[2]) >= 0 && Number(arr[2]) <= 1)) {
				return true;
			}

		}

		return false;
	};

	/**
	 * Checks if the input parameter is a hex, RGB, or HSL color type.
	 */
	validator.isColor = function(input) {
		if (arguments.length === 0) {
			throw "Function requires 1 parameter, 0 given";
		}

		if (this.isHex(input) || this.isRGB(input) || this.isHSL(input)) {
			return true;
		}

		return false;
	};	

	window.validator = validator;
})(window);