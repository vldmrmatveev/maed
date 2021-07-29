import "@/style/libs.scss";
import "@/style/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import { carouselOptions } from "@models/carousel-start/script";
import { ScrollAnimationAsymetric } from "@models/plugins/animation";
import { createPopover } from "@models/plugins/popover";
import { validation } from "@models/plugins/validation";

Swiper.use([Navigation, Pagination, Autoplay]);

document.addEventListener("DOMContentLoaded", () => {
	new Swiper(".swiper-container", carouselOptions());
	createPopover();
	validation("btn_submit"); //селектор класса submit-кнопки без точки, тк используется classList.contains(val)
});

window.addEventListener("scroll", function () {
	const tools = new ScrollAnimationAsymetric("#marketing-tools");
	const coursesSpecial = new ScrollAnimationAsymetric("#courses-special");
	const coursesCatalog = new ScrollAnimationAsymetric("#catalog-courses");
	if (window.innerWidth >= 1024) {
		tools.createAnimation();
		coursesSpecial.createAnimation();
		coursesCatalog.createAnimation();
	}
});
