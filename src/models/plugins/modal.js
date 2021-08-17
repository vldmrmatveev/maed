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
				this.userModal(e);
				const link = e.target.getAttribute("href");
				const modal = document.querySelector(link);
				modal.closest(".modal__bg").classList.add("open");
				this.bodyClassList();
			}
		});
	}
	userModal(e) {
		const res = this.generateObj(e);
		this.changeModalData(e, res);
	}
	changeModalData(e, obj) {
		const parentModal = document.querySelector(e.target.getAttribute("href"));
		for (let key in obj) {
			let keyElement = parentModal.querySelector(`[${key}]`);
			if (parentModal.querySelector(`[${key}]`) != null) {
				keyElement.setAttribute(key, obj[key]);
				switch (keyElement.tagName) {
					case "IMG":
						keyElement.setAttribute("src", obj[key]);
						break;
					case "A":
						keyElement.setAttribute("href", obj[key]);
						break;
					default:
						keyElement.textContent = obj[key];
				}
			}
		}
	}
	generateObj(e) {
		if (e.target.dataset.modal == "user") {
			let res = {
				"data-facebook-modal": false,
				"data-vk-modal": false,
				"data-instagram-modal": false,
			};
			const attrs = e.target.attributes;
			for (let i = 0; i < attrs.length; i++) {
				if (
					attrs[i].name.split("-")[0] == "data" &&
					attrs[i].name.split("-")[1] != "modal"
				) {
					res[attrs[i].name + "-modal"] = attrs[i].value;
				}
			}
			return res;
		}
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
