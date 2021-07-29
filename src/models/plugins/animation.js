export class ScrollAnimationAsymetric {
	constructor(parent) {
		this.parent = document.querySelector(parent);
		this.child_1 = document.querySelector(parent + " .animated-block-1");
		this.child_2 = document.querySelector(parent + " .animated-block-2");
	}
	createAnimation() {
		const top = this.parent.offsetTop - 200;
		if (pageYOffset > top && pageYOffset < top + 200) {
			this.child_1.style.transform = `translateY(-${
				(pageYOffset - top) / 2
			}px)`;
			this.child_2.style.transform = `translateY(-${
				(pageYOffset - top) / 4
			}px)`;
		}
	}
}
