import { postData } from "./send-data";

export class ValidateForm {
	constructor(selector) {
		this.selector = document.querySelectorAll(selector);
	}
	doValidate() {
		document.addEventListener("click", (e) => {
			this.selector.forEach((item) => {
				if (e.target == item) {
					e.preventDefault();
					this.submit(e.target);
				}
			});
		});
	}
	submit(target) {
		const form = target.closest("form");
		const allInputs = form.querySelectorAll("input");
		const url = form.getAttribute("action");
		const allRequiredInputs = form.querySelectorAll("input:required");
		const validationResult = this.validate(allRequiredInputs);
		if (validationResult) {
			this.postAction(url, target, allInputs);
		}
	}
	// validatePhone(inputs) {
	// 	inputs.forEach((input) => {
	// 		if (input.getAttribute("name") == "phone") {
	// 			input.addEventListener("input", () => {
	// 				if (input.value[0] == "8") {
	// 					input.value = "+7" + input.value.slice(1);
	// 				}
	// 				input.value.replace(/\w/gi, "~");
	// 				console.log(input.value.match(/\w/gi, "~"));
	// 			});
	// 		}
	// 	});
	// }
	validateOnChange(input) {
		input.addEventListener("change", () => {
			if (input.validity.valid) {
				input.classList.remove("border-red");
				input.classList.add("border-white");
			} else {
				input.classList.remove("border-white");
				input.classList.add("border-red");
			}
		});
	}
	getCheckboxValue(arr) {
		arr.forEach((input) => {
			if (input.getAttribute("type") == "checkbox") {
				if (input.checked) {
					input.value = true;
				} else {
					input.value = false;
				}
			}
		});
	}
	validate(inputs) {
		const resultArr = [];
		inputs.forEach((input) => {
			if (!input.validity.valid) {
				input.classList.remove("border-white");
				input.classList.add("border-red");
				resultArr.push(false);
			} else {
				input.classList.remove("border-red");
				input.classList.add("border-white");
				resultArr.push(true);
			}
			this.validateOnChange(input);
		});
		const res = resultArr.every((res) => res === true);
		return res;
	}
	postAction(url, target, arr) {
		let objRes = {};
		this.getCheckboxValue(arr);
		arr.forEach((item) => {
			objRes[item.name] = item.value;
		});
		objRes.time = createDate();
		const result = postData(url, objRes);
		const parent = target.closest(".form_container");
		const textContentSubmitted = target.dataset.text;
		const textContainerSubmitted = target.dataset.container || false;
		result.then((res) => {
			if (res) {
				this.generateTextSubmit(
					textContainerSubmitted,
					parent,
					textContentSubmitted
				);
				arr.forEach((item) => (item.disabled = true));
				target.disabled = true;
			} else {
				this.generateTextSubmit(
					textContainerSubmitted,
					parent,
					"Что-то пошло не так, попробуйте перезагрузить страницу"
				);
			}
		});
	}
	generateTextSubmit(selector, parent, text) {
		if (selector) {
			document.querySelector(selector).textContent = text;
		} else {
			const textItem = document.createElement("p");
			textItem.classList.add("text-revert-bg");
			textItem.textContent = text;
			parent.append(textItem);
		}
	}
}

function createDate() {
	const date = new Date();
	const hours = date.getHours();
	const minutes =
		date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
	const day = date.getDate();
	const month =
		date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	const year = date.getFullYear();
	return `${hours}:${minutes} ${day}.${month}.${year}`;
}

class ValidatePhone {
	constructor(selector) {
		this.selector = document.querySelectorAll(selector);
	}
	validatePhone() {
		this.selector.forEach((input) => {
			input.addEventListener("input", () => {
				if (input.value[0] == "+" && input.value[1] == "7") {
					input.value = "8" + input.value.slice(2);
				}
				input.value = input.value.replace(/[A-Za-zА-Яа-яЁё]/, "");
				let val = input.value.match(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/);
				if (val !== null) {
					input.value = `${val[1]} (${val[2]}) ${val[3]}-${val[4]}-${val[5]}`;
				}
			});
			input.addEventListener("change", () => {
				if (input.value.length < 17) {
					input.value = "";
				}
			});
		});
	}
}

const phoneInput = new ValidatePhone(".input__phone");
phoneInput.validatePhone();
