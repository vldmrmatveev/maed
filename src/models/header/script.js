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
			e.target.closest(".header-block-item").classList.add("hidden");
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
			if (e.target.dataset.content) {
				showHeaderMenuDesktop(e);
				window.addEventListener("resize", () => {
					resizeHead(e);
				});
			} else {
				// document.querySelectorAll("ul [data-open]").forEach((item) => {
				// 	if (item.classList.contains("opened")) {
				// 		// changeValueHeader(item);
				// 	}
				// });
				showHeaderMenuMob(e.target);
				window.addEventListener("resize", () => {
					resizeHeadMob(e);
				});
			}
			window.addEventListener("resize", () => {
				changeHiddenBlockHeight();
			});
		}
	});
}

function showHeaderMenuDesktop(e) {
	changeValueHeader(e.target);
	document.querySelectorAll("[data-content]").forEach((item) => {
		if (item.classList.contains("opened") && item != e.target) {
			changeValueHeader(item);
		}
	});
}

function resizeHeadMob(e) {
	if (e.target.classList.contains("opened")) {
		if (window.innerWidth >= 640) {
			if (!document.querySelector("[data-content].opened")) {
				document.body.classList.remove("overflow-hidden");
				document.body.classList.remove("modal-opened");
				e.target.closest("#header").classList.remove("header-opened");
			}
		} else {
			document.body.classList.add("overflow-hidden");
			document.body.classList.add("modal-opened");
			e.target.closest("#header").classList.add("header-opened");
		}
	}
}

function resizeHead(e) {
	if (e.target.classList.contains("opened")) {
		if (window.innerWidth < 640) {
			if (!document.querySelector("button[data-open].opened")) {
				document.body.classList.remove("overflow-hidden");
				document.body.classList.remove("modal-opened");
				e.target.closest("#header").classList.remove("header-opened");
			}
		} else {
			document.body.classList.add("overflow-hidden");
			document.body.classList.add("modal-opened");
			e.target.closest("#header").classList.add("header-opened");
		}
	}
}

function showHeaderMenuMob(item) {
	const elem = item.dataset.open;
	item.classList.toggle("opened");
	item.closest("#header").classList.toggle("header-opened");
	document.getElementById(elem).classList.toggle("open");
	document.body.classList.toggle("overflow-hidden");
	document.body.classList.toggle("modal-opened");
}

function changeValueHeader(item) {
	const elem = item.dataset.content;
	document.getElementById(elem).classList.toggle("hidden");
	item.classList.toggle("opened");
	item.closest("#header").classList.toggle("header-opened");
	const elemParent = item.dataset.open;
	document.getElementById(elemParent).classList.toggle("open");
	document.body.classList.toggle("overflow-hidden");
	document.body.classList.toggle("modal-opened");
}

function changeHiddenBlockHeight() {
	if (window.innerWidth < 1024) {
		let headerHeight = document.querySelector(".header__container")
			.offsetHeight;
		document.getElementById(
			"headerDesktopHidden"
		).style.height = `calc(100vh - ${headerHeight}px)`;
		document.getElementById(
			"headerDesktopHiddenMob"
		).style.height = `calc(100vh - ${headerHeight}px)`;
	} else {
		document.getElementById("headerDesktopHidden").style.height = "";
		document.getElementById("headerDesktopHiddenMob").style.height = "";
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
