class SelectJs {
	constructor(selector) {
		this.selector = document.getElementById(selector);
		this.imgSrc = this.selector.dataset.img || null;
		this.parent = this.selector.closest(".select-container");
	}
	create() {
		const select = document.createElement("div");
		select.classList.add("select-container-item");
		const img = addImg(this.imgSrc);
		if (img) {
			select.insertAdjacentHTML("afterbegin", img);
		}
		let text = document.createElement("span");
		text.textContent = this.selector[0].text;
		select.append(text);
		this.parent.append(select);
		let list = this.addValuetoList();
		this.parent.append(list);
		this.showList();
		this.getValue();
		this.hideListOnClickOut();
	}
	addValuetoList() {
		const ul = document.createElement("ul");
		ul.classList.add("select-container__list");
		for (let i = 1; i < this.lengthValue; i++) {
			const fragment = document.createDocumentFragment();
			const li = document.createElement("li");
			li.setAttribute("data-value", this.selector[i].value);
			li.textContent = this.selector[i].text;
			li.classList.add("select-container__list-item");
			fragment.append(li);
			ul.append(fragment);
		}
		return ul;
	}
	showList() {
		this.parent.addEventListener("click", (e) => {
			if (
				e.target.classList.contains("select-container-item") ||
				e.target.closest(".select-container-item") ||
				e.target.classList.contains("select-container__list-item")
			) {
				this.parent
					.querySelector(".select-container-item")
					.classList.toggle("dropped");
				this.parent
					.querySelector(".select-container__list")
					.classList.toggle("active");
			}
		});
	}
	hideListOnClickOut() {
		document.addEventListener("click", (e) => {
			let customSelect = this.parent.querySelectorAll(".select-container-item");
			customSelect.forEach((item) => {
				if (item.classList.contains("dropped")) {
					if (!this.parent.contains(e.target)) {
						item.classList.remove("dropped");
						item.nextElementSibling.classList.remove("active");
					}
				}
			});
		});
	}
	getValue() {
		this.parent.addEventListener("click", (e) => {
			if (e.target.classList.contains("select-container__list-item")) {
				const value = e.target.dataset.value;
				const text = e.target.textContent;
				this.selector.value = value;
				this.parent.querySelector(
					".select-container-item span"
				).textContent = text;
				// console.log(this.selector.value);
			}
		});
	}
	get lengthValue() {
		return this.selector.length;
	}
}

function addImg(value) {
	switch (value) {
		case "student":
			return `<svg class="mr-3" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.30908 7.42969V12.6048C4.30908 12.8772 4.41803 13.204 4.63593 13.3674C5.23515 13.9666 6.76044 15.0017 9.81102 15.0017C12.8616 15.0017 14.3869 13.9666 14.9861 13.3674C15.204 13.1495 15.313 12.8772 15.313 12.6048V7.42969" stroke="white" stroke-width="1.63424" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.93968 9.3891L1.69455 6.33852C0.768483 5.9572 0.768483 4.6498 1.69455 4.26848L8.93968 1.16342C9.48443 0.945525 10.1381 0.945525 10.6829 1.16342L17.928 4.26848C18.8541 4.6498 18.8541 5.9572 17.928 6.33852L10.6829 9.44357C10.1381 9.607 9.48443 9.607 8.93968 9.3891Z" stroke="white" stroke-width="1.63424" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18.7451 5.25V11.678" stroke="white" stroke-width="1.41634" stroke-miterlimit="10" stroke-linecap="round"/></svg>`;
		case "star":
			return `<svg class="mr-3" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.5 1L12.4078 5.49779L17.584 6.87336L14.2049 11.0287L14.4962 16.3766L9.5 14.447L4.50383 16.3766L4.79512 11.0287L1.41602 6.87336L6.59223 5.49779L9.5 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
		default:
			return false;
	}
}

export const selectLevel = new SelectJs("selectLevel");
export const selectEducation = new SelectJs("selectProfession");
