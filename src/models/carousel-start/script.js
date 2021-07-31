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
		slidesPerView: "auto",
		spaceBetween: 10,
		loop: true,
	};
}
