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

export const mainOption = new CarouselOption(10, true, true);
export const galleryOption = new CarouselOption(0, true, true);
export const testOption = new CarouselOption(0, false, false);
