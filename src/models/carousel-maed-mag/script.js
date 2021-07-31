export function carouselOptions() {
	return {
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: false,
		},
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			// when window width is >= 480px
			720: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			// when window width is >= 640px
			1140: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
	};
}
