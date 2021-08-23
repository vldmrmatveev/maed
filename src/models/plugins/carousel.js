import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay]);

// import { SwiperTest } from "@models/plugins/test";

class CarouselOption {
	constructor(space, autoplay, loop) {
		this.pagination = {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		};
		this.navigation = {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		};
		if (autoplay != false) {
			this.autoplay = {
				delay: 5000,
				pauseOnMouseEnter: false,
			};
		}
		this.slidesPerView = "auto";
		this.spaceBetween = space;
		this.loop = loop;
	}
}

const mainOption = new CarouselOption(10, true, true);
const galleryOption = new CarouselOption(0, true, true);
// const testOption = new CarouselOption(0, false, false);

window.addEventListener("load", () => {
	new Swiper(".swiper-container", mainOption);
	new Swiper(".swiper-gallery", galleryOption);
	// const testSwiper = new Swiper(".swiper-test", testOption);
	// if (document.querySelector(".swiper-test") != null) {
	// 	new SwiperTest(testSwiper).test();
	// }
});
