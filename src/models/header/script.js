export function changeHeaderPadding(selector) {
	let lastTopPosition = 0;
	const headerContainer = document.querySelector(
		selector + " .header__container"
	);
	window.addEventListener("scroll", () => {
		if (lastTopPosition < window.pageYOffset) {
			headerContainer.classList.remove("sm_py-8");
			headerContainer.classList.add("sm_py-3");
		} else {
			headerContainer.classList.remove("sm_py-3");
			headerContainer.classList.add("sm_py-8");
		}
		lastTopPosition = window.pageYOffset;
	});
}

export function closeHeaderHiddenBlock() {
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("close-header-container")) {
			e.preventDefault();
			e.target.closest("#header").classList.remove("header-opened");
			document.querySelectorAll("[data-open]").forEach((item) => {
				item.classList.remove("opened");
			});
			e.target.closest(".header__container-hidden").classList.remove("open");
			document.body.classList.remove("overflow-hidden");
			document.body.classList.remove("modal-opened");
		}
	});
}

export function openHeaderHiddenBlock() {
	document.addEventListener("click", (e) => {
		if (e.target.dataset.open) {
			changeHiddenBlockHeight();
			e.preventDefault();
			document.querySelectorAll("[data-open]").forEach((item) => {
				item.classList.toggle("opened");
			});
			e.target.closest("#header").classList.toggle("header-opened");
			const elem = e.target.dataset.open;
			document.getElementById(elem).classList.toggle("open");
			document.body.classList.toggle("overflow-hidden");
			document.body.classList.toggle("modal-opened");
			window.addEventListener("resize", () => {
				changeHiddenBlockHeight();
			});
		}
	});
}

function changeHiddenBlockHeight() {
	if (window.innerWidth < 1024) {
		let headerHeight = document.querySelector(".header__container")
			.offsetHeight;
		document.getElementById(
			"headerDesktopHidden"
		).style.height = `calc(100vh - ${headerHeight}px)`;
	} else {
		document.getElementById("headerDesktopHidden").style.height = "";
	}
}

export function dropdownClick() {
	document.addEventListener("click", (e) => {
		if (e.target.dataset.dropdown) {
			e.preventDefault();
			let link = e.target.getAttribute("href");
			document.querySelector(link).classList.toggle("drop__collapse-open");
			e.target.classList.toggle("drop__link-active");
			if (e.target.dataset.parent) {
				let items = document.querySelectorAll(
					e.target.dataset.parent + " [data-dropdown]"
				);
				items.forEach((item) => {
					if (
						item.classList.contains("drop__link-active") &&
						item != e.target
					) {
						item.classList.remove("drop__link-active");
						document
							.querySelector(item.getAttribute("href"))
							.classList.remove("drop__collapse-open");
					}
				});
			}
		}
	});
}
