function changeHeaderPadding(selector) {
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

function closeHeaderHiddenBlock() {
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

function openHeaderHiddenBlock() {
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

function changeValueHeader(target) {
	const header = target.closest('#header');
	const headerBar = header ? header.querySelector(".header__container") : null;
	const openedMenu = document.getElementById(target.dataset.content);
	const menu = document.getElementById(target.dataset.open);
	
	target.classList.toggle("opened");
	if (header) header.classList.toggle("header-opened");
	if (openedMenu) openedMenu.classList.toggle("hidden");
	if (menu) menu.classList.toggle("open");
	if (menu) menu.style.height = '';
	
	const headerHeight = headerBar ? headerBar.offsetHeight : 0;
	
	if (menu && menu.classList.contains("open") && menu.offsetHeight > window.innerHeight - headerHeight) {
		menu.style.height =  (window.innerHeight - headerHeight) + 'px';
	}
	
	document.body.classList.toggle("overflow-hidden");
	document.body.classList.toggle("modal-opened");
}

function changeHiddenBlockHeight() {
	const headerBar = document.querySelector('#header .header__container');
	const openedMenuDesktop = document.getElementById('headerDesktopHidden');
	const openedMenuMob = document.getElementById('headerDesktopHiddenMob');
	
	openedMenuDesktop.style.height = '';
	openedMenuMob.style.height = '';
	
	const openedMenuDesktopHeight = openedMenuDesktop ? openedMenuDesktop.offsetHeight : 0;
	const headerHeight = headerBar ? headerBar.offsetHeight : 0;
	const visibleHeight = window.innerHeight - headerHeight;
	
	if (openedMenuDesktopHeight >= visibleHeight && openedMenuDesktop) {
		openedMenuDesktop.style.height =  (window.innerHeight - headerHeight) + 'px';
	}
	
	if (openedMenuMob) openedMenuMob.style.height = `calc(100vh - ${headerHeight}px)`;
}

function dropdownClick() {
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

document.addEventListener("DOMContentLoaded", () => {
	closeHeaderHiddenBlock();
	openHeaderHiddenBlock();
	dropdownClick();
});

window.addEventListener("load", () => {
	changeHeaderPadding("#header");
});
