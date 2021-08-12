export class Tab {
	constructor(selector) {
		this.item = document.querySelectorAll(selector);
	}
	init() {
		if (this.item != null) {
			this.item.forEach((tab) => {
				tab.addEventListener("click", (e) => {
					if (e.target.classList.contains("tab__item")) {
						e.preventDefault();
						this.changeActiveTab(tab, e);
						this.showBlock(e);
					}
				});
			});
		}
	}
	changeActiveTab(tab, event) {
		tab.querySelectorAll(".tab__item").forEach((elem) => {
			if (elem.classList.contains("tab__item-active") && elem != event.target) {
				elem.classList.remove("tab__item-active");
			}
			event.target.classList.add("tab__item-active");
		});
	}
	showBlock(event) {
		const href = event.target.getAttribute("href").slice(1);
		const element = document.getElementById(href);
		const allElem = element
			.closest(".tab-content")
			.querySelectorAll(".collapse");
		allElem.forEach((el) => {
			if (el.getAttribute("id") == href) {
				el.classList.add("active");
			} else {
				el.classList.remove("active");
			}
		});
	}
}
