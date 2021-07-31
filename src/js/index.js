import "@/style/libs.scss";
import "@/style/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import noUiSlider from "nouislider";
import { carouselOptions } from "@models/carousel-start/script";
import { ScrollAnimationAsymetric } from "@models/plugins/animation";
import { createPopover } from "@models/plugins/popover";
import { validation } from "@models/plugins/validation";
import { selectLevel, selectEducation } from "@models/plugins/select";
import {
	rangeSlider,
	rangeSliderSetting,
	rangeSliderValues,
} from "@models/plugins/range";

Swiper.use([Navigation, Pagination, Autoplay]);

document.addEventListener("DOMContentLoaded", () => {
	noUiSlider.create(rangeSlider, rangeSliderSetting(1, 6, 12));
	rangeSlider.noUiSlider.on("slide", function (values, handle) {
		rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
	});
	new Swiper(".swiper-container", carouselOptions());
	createPopover();
	validation("btn_submit"); //селектор класса submit-кнопки без точки, тк используется classList.contains(val)
	selectLevel.create();
	selectEducation.create();
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
