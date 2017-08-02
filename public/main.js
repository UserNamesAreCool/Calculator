(function () {
	'use_strict'
	let operation;
	let value = 0;
	let displayValue = "";


	function clear() {
		value = 0;
		displayValue = "";
		document.getElementById("answer_area").innerText = 0;
	}

	// TODO: Pick a better name
	function sum() {
		// Operation handler has already been done, this is just displaying the result
		displayValue = ""
		document.getElementById("answer_area").innerText = value;
	}

	function operationHandler(oper, number) {
		// Do operation
		switch (oper) {
			case "+":
				value += number
				break;
			case "-":
				value -= number;
				break;
			case "/":
				if (number == 0) {
					break
				}
				value = (value / number) || 0;
				break;
			case "*":
				value *= number;
				break;
			default:
				break;
		}
		sum();
	}

	function parseNum(num) {
		var polarity = 1
		if (num[0] === "-") {
			if (num.length === 1) {
				return 0;
			}
			polarity = -1;
			num = num.slice(1, num.length);
		}
		if (num.length === 0) {
			return 0;
		}

		if (num === ".") {
			return 0
		}
		/// strip 0's in front of num
		while (num[0] == "0" && num.length > 1) {
			num = num.slice(1, num.length);
		}
		// strip trailing .'s
		while (num[num.length] === ".") {
			num = num.slice(0, num.length - 1);
			if (num.length === 0) {
				return 0
			}

		}
		// If num starts with . repad it with 0
		if (num[0] === ".") {
			num = "0" + num;
		}
		// Sets the polarity, and if NaN, return 0
		return (parseFloat(num) * polarity) || 0;
	}
	// TODO: Add %
	function eventHandler(event) {

		let target = event.target;
		let txt = target.innerHTML
		// Handle +/-
		if (txt == "+/-") {
			if (displayValue === "0") {
				return
			};
			if (displayValue[0] === "-") {
				displayValue = displayValue.slice(1, displayValue.length);
				return
			}
			displayValue = "-" + displayValue;
			document.getElementById("answer_area").innerText = displayValue;

		}
		// Handle + - / *
		if (['+', '-', '/', '*'].includes(txt)) {
			if (operation === undefined) {
				value = parseNum(displayValue)
				operation = txt
				sum();
			} else {
				operationHandler(operation, parseNum(displayValue));
				operation = txt;
			}
			return

		}
		// Handle = or Clear
		if (['=', 'A/C'].includes(txt)) {
			switch (txt) {
				case "A/C":
					clear();
					return;
				case "=":
					if (operation == undefined) {
						clear();
						return
					}
					operationHandler(operation, parseNum(displayValue));
					return;

			}
			return

		}
		// Handle numbers
		if ('0123456789.'.split('').includes(txt)) {
			displayValue += txt;
			document.getElementById("answer_area").innerText = displayValue;
		}
	}
	let buttons = document.querySelectorAll('button');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', eventHandler);
	}

	clear(); // Clear at start

}())