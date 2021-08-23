class SelectJs {
	constructor(selector) {
		this.selector = selector;
		this.listOfItems = document.querySelectorAll(selector);
	}
	create() {
		this.listOfItems.forEach((select) => {
			this.createMainContainer(select);
		});
	}
	createMainContainer(select) {
		const imgSrc = select.dataset.img || null;
		const parent = select.closest(".select-container");
		const customSelect = document.createElement("div");
		const classListForSelect = this.getClassList(select);
		if (classListForSelect.length > 0) {
			classListForSelect.forEach((className) => {
				customSelect.classList.add(className);
			});
		}
		customSelect.classList.add("select-container__item");
		const img = addImg(imgSrc);
		if (img) {
			customSelect.insertAdjacentHTML("afterbegin", img);
		}
		const text = document.createElement("span");
		text.textContent = select[0].text;
		const angle = document.createElement("div");
		angle.classList.add("select-container__item-angle");
		const container = document.createElement("div");
		container.classList.add("relative", "w-full");
		container.append(text, angle);
		customSelect.append(container);
		parent.append(customSelect);
		const list = this.createList(select);
		parent.append(list);
		this.toggleListVisibillity(parent);
		this.hiddenList(select);
		this.getValueFromListItem(parent, select);
	}
	getClassList(select) {
		const [...classListArr] = select.classList;
		const selectorClass = this.selector.slice(1);
		const clearClassArr = classListArr.filter((item) => item != selectorClass);
		return clearClassArr;
	}
	createList(select) {
		const lengthOfValues = select.length;
		const ul = document.createElement("div");
		ul.classList.add("select-container__list", "hidden");
		ul.setAttribute("data-simplebar", "");
		let i = 0;
		if (select[0].disabled) {
			i = 1;
		}
		for (i; i < lengthOfValues; i++) {
			const fragment = document.createDocumentFragment();
			const li = document.createElement("div");
			li.setAttribute("data-value", select[i].value);
			li.textContent = select[i].text;
			li.classList.add("select-container__list-item");
			fragment.append(li);
			ul.append(fragment);
		}
		return ul;
	}
	toggleListVisibillity(parent) {
		parent.addEventListener("click", () => {
			if (!parent.classList.contains("select-container-active")) {
				document.querySelectorAll(".select-container").forEach((item) => {
					item.classList.remove("select-container-active");
					item.querySelector(".select-container__list").classList.add("hidden");
				});
			}
			parent.classList.toggle("select-container-active");
			parent
				.querySelector(".select-container__list")
				.classList.toggle("hidden");
		});
	}
	hiddenList(select) {
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".select-container")) {
				const parent = select.closest(".select-container");
				const list = parent.querySelector(".select-container__list");
				parent.classList.remove("select-container-active");
				list.classList.add("hidden");
			}
		});
	}
	getValueFromListItem(parent, select) {
		parent.addEventListener("click", (e) => {
			if (e.target.classList.contains("select-container__list-item")) {
				const value = e.target.dataset.value;
				const text = e.target.textContent;
				select.value = value;
				parent.querySelector(".select-container__item span").textContent = text;
				this.addOnChange(select);
			}
		});
	}
	addOnChange(item) {
		if ("createEvent" in document) {
			const event = new Event("change");
			item.dispatchEvent(event);
		} else {
			item.fireEvent("onchange");
		}
	}
}

function addImg(value) {
	switch (value) {
		case "student":
			return `<svg class="mr-3 w-5 min-w-5" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.30908 7.42969V12.6048C4.30908 12.8772 4.41803 13.204 4.63593 13.3674C5.23515 13.9666 6.76044 15.0017 9.81102 15.0017C12.8616 15.0017 14.3869 13.9666 14.9861 13.3674C15.204 13.1495 15.313 12.8772 15.313 12.6048V7.42969" stroke="currentColor" stroke-width="1.63424" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.93968 9.3891L1.69455 6.33852C0.768483 5.9572 0.768483 4.6498 1.69455 4.26848L8.93968 1.16342C9.48443 0.945525 10.1381 0.945525 10.6829 1.16342L17.928 4.26848C18.8541 4.6498 18.8541 5.9572 17.928 6.33852L10.6829 9.44357C10.1381 9.607 9.48443 9.607 8.93968 9.3891Z" stroke="currentColor" stroke-width="1.63424" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18.7451 5.25V11.678" stroke="currentColor" stroke-width="1.41634" stroke-miterlimit="10" stroke-linecap="round"/></svg>`;
		case "star":
			return `<svg class="mr-3 w-5 min-w-5" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.5 1L12.4078 5.49779L17.584 6.87336L14.2049 11.0287L14.4962 16.3766L9.5 14.447L4.50383 16.3766L4.79512 11.0287L1.41602 6.87336L6.59223 5.49779L9.5 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>`;
		default:
			return false;
	}
}
window.addEventListener("load", () => {
	if (document.querySelector(".custom-select")) {
		new SelectJs(".custom-select").create();
	}
});
