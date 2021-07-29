import { postData } from "./send-data";

export function validation(className) {
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains(className)) {
			e.preventDefault();
			const form = e.target.closest("form");
			const inputEmail = form.elements.email;
			if (!inputEmail.validity.valid) {
				inputEmail.classList.remove("border-white");
				inputEmail.classList.add("border-red");
			} else {
				inputEmail.classList.remove("border-red");
				inputEmail.classList.add("border-white");
				const result = postData(inputEmail.value);
				result.then((res) => {
					if (res) {
						form.insertAdjacentHTML(
							"afterend",
							`<p class="text-revert-bg">Спасибо, ваши данные были отправлены</p>`
						);
						inputEmail.disabled = true;
						e.target.disabled = true;
					} else {
						form.insertAdjacentHTML(
							"afterend",
							`<p class="text-revert-bg">Что-то пошло не так, попробуйте перезагрузить страницу</p>`
						);
					}
				});
			}
		}
	});
}
