import links from "@/js/links.json";

class TestPlugin {
	constructor(selector) {
		this.url = links;
		this.btn = document.querySelector(selector);
		this.testContent = document.getElementById("testContainerMain");
		this.resultContainer = document.getElementById("testContainerResult");
		this.resultLink = document.getElementById("generatedLink");
		this.hiddenBtn = document.getElementById("hideResult");
	}
	test() {
		if (this.btn != null) {
			this.changeBtn(this.btn);
			this.changeBtn(this.hiddenBtn);
			this.getResult(this.btn);
			this.showTest(this.hiddenBtn);
		}
	}
	changeBtn(btn) {
		btn.addEventListener("click", () => {
			this.hideElem(btn, "inline-flex");
			this.iterateBtns(btn);
		});
	}
	getResult(btn) {
		btn.addEventListener("click", () => {
			this.hideElem(this.testContent, "flex");
			this.showElem(this.resultContainer, "block");
			const radioChecked = document.querySelectorAll(
				"#testContainerMain input:checked"
			);
			let resArr = [];
			radioChecked.forEach((input) => {
				let inputValueArr = input.value.split(",");
				inputValueArr.forEach((item) => {
					resArr.push(item);
				});
			});
			let res = filterValues(resArr);
			generateLink(res, this.url, this.resultLink);
		});
	}
	showTest(btn) {
		btn.addEventListener("click", () => {
			this.hideElem(this.resultContainer, "block");
			this.showElem(this.testContent, "flex");
		});
	}
	iterateBtns(btn) {
		let btnsContainer = this.btn.closest(".absolute-btn-container");
		for (let i = 0; i < btnsContainer.children.length; i++) {
			if (btnsContainer.children[i].id != btn.id) {
				this.showElem(btnsContainer.children[i], "inline-flex");
			}
		}
	}
	hideElem(item, initialClass) {
		item.classList.remove(initialClass);
		item.classList.add("hidden");
	}
	showElem(item, initialClass) {
		item.classList.remove("hidden");
		item.classList.add(initialClass);
	}
}

export class SwiperTest {
	constructor(slider) {
		this.url = links;
		this.slider = slider;
	}
	test() {
		this.slider.on("slideChange", () => {
			this.changeUnderText();
			if (this.slider.activeIndex >= this.slider.slides.length - 2) {
				const resLink = document.querySelector(".generated-link");
				generateLink(this.createValuesArr(), this.url, resLink);
			}
		});
	}
	changeUnderText() {
		let textItemHidden = document.querySelector(
			".swiper-test__undertext-hidden"
		);
		let textItemShow = document.querySelector(".swiper-test__undertext");
		let numOfList = document.querySelector(".swiper-test__undertext-num");
		if (this.slider.activeIndex <= this.slider.slides.length - 2) {
			textItemShow.classList.remove("hidden");
			textItemHidden.classList.add("hidden");
			numOfList.textContent = this.slider.activeIndex + 1;
		} else {
			textItemHidden.classList.remove("hidden");
			textItemShow.classList.add("hidden");
		}
	}
	createValuesArr() {
		let arrResult = [];
		const arrOfInputs = document.querySelectorAll(
			'.swiper-test input[type="radio"]:checked'
		);
		arrOfInputs.forEach((input) => {
			let inputVal = input.value.split(",");
			inputVal.forEach((val) => {
				arrResult.push(val);
			});
		});
		return filterValues(arrResult);
	}
}

async function getDataFromUrl(url) {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const res = await response.json();
			return res;
		}
	} catch (err) {
		return Promise.reject(err);
	}
}

function generateLink(result, url, link) {
	let fetchingData = getDataFromUrl(url);
	fetchingData.then((item) => filterData(item, result, link));
}

function filterData(fetchingRes, result, el) {
	el.textContent = "";
	fetchingRes.forEach((item) => {
		if (item.index == result) {
			el.setAttribute("href", "#" + item.href);
			el.textContent = item.title;
		}
	});
}

function filterValues(arr) {
	let resultValue = "";
	let max = 0;
	arr.forEach((item) => {
		let counter = 0;
		for (let k = 1; k < arr.length - 1; k++) {
			if (item == arr[k]) counter++;
		}
		if (counter > max) {
			resultValue = item;
			max = counter;
		}
	});
	return resultValue;
}

export const testDesktop = new TestPlugin("#showResult");
