class CarouselOption {
	constructor(space, autoplayTiming) {
		this.pagination = {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		};
		this.navigation = {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		};
		this.autoplay = {
			delay: autoplayTiming,
			pauseOnMouseEnter: false,
		};
		this.slidesPerView = "auto";
		this.spaceBetween = space;
		this.loop = true;
	}
}

export const mainOption = new CarouselOption(10, 5000);
export const galleryOption = new CarouselOption(0, 5000);
