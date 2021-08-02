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
		const inputEmail = form.elements.email;
		const url = form.getAttribute("action");
		const validationResult = this.validate(inputEmail);
		if (validationResult) {
			this.postAction(inputEmail, url, target);
		}
	}
	validate(emailInput) {
		if (!emailInput.validity.valid) {
			emailInput.classList.remove("border-white");
			emailInput.classList.add("border-red");
			return false;
		} else {
			emailInput.classList.remove("border-red");
			emailInput.classList.add("border-white");
			return true;
		}
	}
	postAction(emailInput, url, target) {
		const result = postData(emailInput.value, url);
		const parent = emailInput.closest(".form_container");
		const textContentSubmitted = target.dataset.text;
		const textContainerSubmitted = target.dataset.container || false;
		result.then((res) => {
			if (res) {
				this.generateTextSubmit(
					textContainerSubmitted,
					parent,
					textContentSubmitted
				);
				emailInput.disabled = true;
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
