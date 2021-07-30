import { postData } from "./send-data";

export function validation(className) {
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains(className)) {
			e.preventDefault();
			const form = e.target.closest("form");
			const inputEmail = form.elements.email;
			const textSuccess = e.target.dataset.text;
			const formParent = form.closest(".form_container");
			if (!inputEmail.validity.valid) {
				inputEmail.classList.remove("border-white");
				inputEmail.classList.add("border-red");
			} else {
				inputEmail.classList.remove("border-red");
				inputEmail.classList.add("border-white");
				const result = postData(inputEmail.value);
				result.then((res) => {
					if (res) {
						const textItem = document.createElement("p");
						textItem.classList.add("text-revert-bg");
						textItem.textContent = textSuccess;
						formParent.append(textItem);
						inputEmail.disabled = true;
						e.target.disabled = true;
					} else {
						const textItem = document.createElement("p");
						textItem.classList.add("text-revert-bg");
						textItem.textContent =
							"Что-то пошло не так, попробуйте перезагрузить страницу";
						formParent.append(textItem);
					}
				});
			}
		}
	});
}
