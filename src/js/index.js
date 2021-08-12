import "@/style/libs.scss";
import "@/style/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import { Fancybox } from "@fancyapps/ui";
import {
	changeHeaderPadding,
	closeHeaderHiddenBlock,
	openHeaderHiddenBlock,
	dropdownClick,
} from "@models/header/script";
import { getYear } from "@models/footer/script";
import { Tab } from "@models/plugins/tabs";
import { testDesktop, SwiperTest } from "@models/plugins/test";
import {
	mainOption,
	galleryOption,
	testOption,
} from "@models/carousel-start/script";
import { createPopover } from "@models/plugins/popover";
import { ValidateForm } from "@models/plugins/validation";
import { selectLevel, selectEducation } from "@models/plugins/select";
import { Filter } from "@models/plugins/filter";

Swiper.use([Navigation, Pagination, Autoplay]);

document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementById("filterItem") != null) {
		const filter = new Filter("filter", ".course-card-main__block");
		filter.filter();
	}
	new Tab(".tab").init();
	testDesktop.test();
	Fancybox.bind("[data-fancybox]", {});
	new Swiper(".swiper-container", mainOption);
	new Swiper(".swiper-gallery", galleryOption);
	const testSwiper = new Swiper(".swiper-test", testOption);
	if (document.querySelector(".swiper-test") != null) {
		new SwiperTest(testSwiper).test();
	}
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
