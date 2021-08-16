export function openModal() {
	document.addEventListener("click", (e) => {
		if (e.target.hasAttribute("data-modal")) {
			e.preventDefault();
			const link = e.target.getAttribute("href");
			const modal = document.querySelector(link);
			console.log(link, modal);
			modal.closest(".modal__bg").classList.add("open");
		}
	});
}

export class Modal {
	constructor(dataAttr) {
		this.attr = dataAttr;
	}
	init() {
		this.openModal();
		this.closeModal();
	}
	openModal() {
		document.addEventListener("click", (e) => {
			if (e.target.hasAttribute(this.attr)) {
				e.preventDefault();
				const link = e.target.getAttribute("href");
				const modal = document.querySelector(link);
				modal.closest(".modal__bg").classList.add("open");
				this.bodyClassList();
			}
		});
	}
	closeModal() {
		document.addEventListener("click", (e) => {
			if (e.target.classList.contains("modal__bg")) {
				e.target.classList.remove("open");
				this.bodyClassList();
			}
			if (e.target.classList.contains("modal__close")) {
				e.target.closest(".modal__bg").classList.remove("open");
				this.bodyClassList();
			}
		});
	}
	bodyClassList() {
		document.body.classList.toggle("overflow-hidden");
		document.body.classList.toggle("modal-opened");
	}
}
