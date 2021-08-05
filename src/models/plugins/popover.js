export function createPopover() {
	let popoverBlock = null;
	document.addEventListener("mouseover", (e) => {
		if (e.target.dataset.popover) {
			const bg = e.target.dataset.popoverBg;
			const textColor = e.target.dataset.popoverText;
			popoverBlock = document.createElement("div");
			popoverBlock.classList.add("popover-container", bg, textColor);
			popoverBlock.textContent = e.target.dataset.popover;
			popoverBlock.style.position = "absolute";
			const left = e.target.offsetLeft - 20;
			popoverBlock.style.left = `${left}px`;
			e.target.closest(".popover-parent").append(popoverBlock);
		}
	});
	document.addEventListener("mouseout", () => {
		if (popoverBlock) {
			popoverBlock.remove();
			popoverBlock = null;
		}
	});
}
