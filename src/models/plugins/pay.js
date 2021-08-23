function toggleInstallment() {
	document.addEventListener("click", (e) => {
		if (e.target.id == "installment") {
			const input = document.querySelector("#correctNumber");
			const btn = document.querySelector("#correctNumberBtn");
			const paymentMethod = document.querySelector("#paymentMethods");
			const banksPartners = document.querySelector("#banksPartners");
			const installmentValueInput = document.querySelectorAll(
				".installment-value-input"
			);
			installmentValueInput.forEach((item) => {
				item.value = e.target.checked;
			});
			if (e.target.checked) {
				input.removeAttribute("disabled");
				btn.removeAttribute("disabled");
				paymentMethod.classList.add("hidden");
				banksPartners.classList.remove("hidden");
			} else {
				input.value = "";
				input.setAttribute("disabled", "disabled");
				btn.setAttribute("disabled", "disabled");
				paymentMethod.classList.remove("hidden");
				banksPartners.classList.add("hidden");
				document.querySelector(
					".price-value"
				).textContent = document.querySelector(".price-value").dataset.value;
			}
		}
	});
}

function correctPrice() {
	document.addEventListener("click", (e) => {
		if (e.target.id == "correctNumberBtn") {
			let input = e.target
				.closest(".installment-block")
				.querySelector("#correctNumber");
			let priceHtml = document.querySelector(".price-value");
			if (input.value) {
				priceHtml.textContent = input.value;
			} else {
				priceHtml.textContent = priceHtml.dataset.value;
			}
		}
	});
}

function changeForm() {
	document.addEventListener("click", (e) => {
		if (e.target.id == "entity") {
			const parentSection = document.getElementById("paySection");
			const formSections = parentSection.querySelectorAll(".form_container");
			formSections.forEach((item) => {
				item.classList.toggle("hidden");
			});
		}
	});
}

function changeNumOfPersons() {
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("btn_minus")) {
			const numOfUsers = document.getElementById("numOfPerson");
			if (numOfUsers.value > 1) {
				numOfUsers.value--;
			}
		}
		if (e.target.classList.contains("btn_plus")) {
			const numOfUsers = document.getElementById("numOfPerson");
			numOfUsers.value++;
		}
	});
}

toggleInstallment();

correctPrice();

changeForm();

changeNumOfPersons();
