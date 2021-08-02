export function getYear() {
	const date = new Date();
	if (document.querySelector(".date") != null) {
		document.querySelector(".date").textContent = date.getFullYear();
	}
}
