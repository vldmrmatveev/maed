import "@/style/libs.scss";
import "@/style/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import { Fancybox } from "@fancyapps/ui";
import noUiSlider from "nouislider";
import {
	changeHeaderPadding,
	closeHeaderHiddenBlock,
	openHeaderHiddenBlock,
	dropdownClick,
} from "@models/header/script";
import { getYear } from "@models/footer/script";
import { mainOption, galleryOption } from "@models/carousel-start/script";
import { ScrollAnimationAsymetric } from "@models/plugins/animation";
import { createPopover } from "@models/plugins/popover";
import { ValidateForm } from "@models/plugins/validation";
import { selectLevel, selectEducation } from "@models/plugins/select";
import {
	rangeSlider,
	rangeSliderSetting,
	rangeSliderValues,
} from "@models/plugins/range";

Swiper.use([Navigation, Pagination, Autoplay]);

document.addEventListener("DOMContentLoaded", () => {
	Fancybox.bind("[data-fancybox]", {});
	if (rangeSliderValues[0] != null && rangeSlider != null) {
		noUiSlider.create(rangeSlider, rangeSliderSetting(1, 6, 12));
		rangeSlider.noUiSlider.on("slide", function (values, handle) {
			rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
		});
	}
	new Swiper(".swiper-container", mainOption);
	new Swiper(".swiper-gallery", galleryOption);
	getYear();
	createPopover();
	const validateBtn = new ValidateForm(".btn_submit");
	validateBtn.doValidate();
	selectLevel.create();
	selectEducation.create();
	closeHeaderHiddenBlock();
	openHeaderHiddenBlock();
	dropdownClick();
});

window.addEventListener("load", () => {
	changeHeaderPadding("#header");
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
