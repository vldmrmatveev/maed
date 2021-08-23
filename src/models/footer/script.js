function getYear() {
	const date = new Date();
	if (document.querySelector(".date")) {
		document.querySelector(".date").textContent = date.getFullYear();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	getYear();
});
