function showHiddenBlocks() {
	document.addEventListener("click", (e) => {
		if (e.target.dataset.showitems) {
			e.preventDefault();
			const link = e.target.getAttribute("href");
			const parentElem = document.querySelector(link);
			let res = checkAttr(parentElem, "data-hidden");
			if (res) {
				e.target.querySelector("span").textContent = "Все преподаватели";
			} else {
				e.target.querySelector("span").textContent = "Скрыть";
			}
		}
	});
}

function checkAttr(parent, attr) {
	let resArr = [];
	parent.querySelectorAll("[" + attr + "]").forEach((item) => {
		if (item.getAttribute(attr) === "true") {
			item.classList.remove("hidden");
			item.setAttribute(attr, "false");
			resArr.push(item.getAttribute(attr));
		} else {
			item.classList.add("hidden");
			item.setAttribute(attr, "true");
			resArr.push(item.getAttribute(attr));
		}
	});
	return resArr.every((item) => item == "true");
}

document.addEventListener("DOMContentLoaded", () => {
	showHiddenBlocks();
});
