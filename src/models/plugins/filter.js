import noUiSlider from "nouislider";
import {
	rangeSlider,
	rangeSliderSetting,
	rangeSliderValues,
} from "@models/plugins/range";

export class Filter {
	constructor(selector) {
		this.form = document.forms[selector];
		this.checkboxes = [
			this.form.elements["free"],
			this.form.elements["employment"],
			this.form.elements["sale"],
			this.form.elements["soon"],
			this.form.elements["diploma"],
		];
		this.property = this.form.elements["property"];
		this.specification = this.form.elements["specification"];
		this.searchInput = this.form.elements.searchName;
		this.category = this.form.elements["radio-category"];

		this.checkboxesVal = [
			{ name: "free", value: false },
			{ name: "employment", value: false },
			{ name: "sale", value: false },
			{ name: "soon", value: false },
			{ name: "diploma", value: false },
		];

		this.free = false;
		this.employment = false;
		this.sale = false;
		this.soon = false;
		this.diploma = false;

		this.rangeMin = null;
		this.rangeMax = null;
		this.categoryValue = "all";
		this.textValue = "";
		this.prop = "all";
		this.spec = "all";
	}
	filter() {
		this.form.onsubmit = (e) => {
			e.preventDefault();
		};
		this.createSlider();
		this.changeSliderVal();
		this.getCategoryValue(this.category);
		this.getSearchText(this.searchInput);
		this.getCheckBoxValue(this.checkboxes, this.checkboxesVal);
		this.getSelectValue(this.property);
		this.getSelectValue(this.specification);
	}
	changeSliderVal() {
		if (rangeSliderValues[0] != null && rangeSlider != null) {
			rangeSlider.noUiSlider.on("slide", function (values, handle) {
				this.rangeMin = Math.floor(values[0]);
				this.rangeMax = Math.floor(values[1]);
				rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
			});
			rangeSlider.noUiSlider.on("change", () => this.iterateCardRange());
		}
	}
	iterateCardRange() {
		const cards = document.querySelectorAll(".course-card-main");
		cards.forEach((item) => {
			const value = item.dataset.title.toUpperCase();
			if (
				(this.categoryValue == "all" &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					item.dataset.specification == this.spec) ||
				(item.dataset.category == this.categoryValue &&
					value.includes(this.textValue) &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					item.dataset.specification == this.spec) ||
				(item.dataset.category == this.categoryValue &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					item.dataset.specification == this.spec) ||
				(value.includes(this.textValue) &&
					this.categoryValue == "all" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					item.dataset.specification == this.spec) ||
				(this.categoryValue == "all" &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					item.dataset.specification == this.spec) ||
				(item.dataset.category == this.categoryValue &&
					value.includes(this.textValue) &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					item.dataset.specification == this.spec) ||
				(item.dataset.category == this.categoryValue &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					item.dataset.specification == this.spec) ||
				(value.includes(this.textValue) &&
					this.categoryValue == "all" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					item.dataset.specification == this.spec) ||
				(this.categoryValue == "all" &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					this.spec == "all") ||
				(item.dataset.category == this.categoryValue &&
					value.includes(this.textValue) &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					this.spec == "all") ||
				(item.dataset.category == this.categoryValue &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					this.spec == "all") ||
				(value.includes(this.textValue) &&
					this.categoryValue == "all" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					this.prop == "all" &&
					this.spec == "all") ||
				(this.categoryValue == "all" &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					this.spec == "all") ||
				(item.dataset.category == this.categoryValue &&
					value.includes(this.textValue) &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					this.spec == "all") ||
				(item.dataset.category == this.categoryValue &&
					this.textValue == "" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					this.spec == "all") ||
				(value.includes(this.textValue) &&
					this.categoryValue == "all" &&
					item.dataset.month >= this.rangeMin &&
					item.dataset.month <= this.rangeMax &&
					item.dataset.property == this.prop &&
					this.spec == "all")
			) {
				this.iterateCardsCheckbox(this.checkboxesVal, item);
			} else {
				item.style.display = "none";
			}
			this.checkEmptyContainer(cards);
		});
	}
	checkEmptyContainer(cards) {
		const hiddenCards = document.querySelectorAll(
			'.course-card-main[style="display: none;"]'
		);
		document.querySelectorAll(".catalog-title-item").forEach((title) => {
			if (hiddenCards.length === cards.length) {
				title.textContent =
					"К сожалению, ничего не найдено. Попробуйте изменить критерии поиска";
			} else {
				title.textContent = title.dataset.titleitem;
			}
		});
	}
	iterateCardsCheckbox(arr, item) {
		const newArr = arr.filter((checkbox) => checkbox.value == true);
		if (newArr.length == 0) {
			item.style.display = "flex";
		} else if (newArr.length == 1) {
			if (newArr.length == 0 || item.dataset.feature.includes(newArr[0].name)) {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
		} else {
			let cardArr = item.dataset.feature.split(" ");
			let filterArr = newArr.map((checkbox) => checkbox.name);
			let filterRes = cardArr.filter(this.fitrateCheckboxValue(filterArr));
			if (filterRes.length == filterArr.length) {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
		}
	}
	fitrateCheckboxValue(arr) {
		return function (x) {
			return arr.includes(x);
		};
	}
	getSelectValue(select) {
		select.onchange = () => {
			if (select.name == "specification") {
				this.spec = select.value;
				this.iterateCardRange();
			} else if (select.name == "property") {
				this.prop = select.value;
				this.iterateCardRange();
			}
		};
	}
	createSlider() {
		if (rangeSlider != null) {
			noUiSlider.create(rangeSlider, rangeSliderSetting(1, 24, 24));
			rangeSlider.noUiSlider.on("update", (values, handle) => {
				this.rangeMin = Math.floor(values[0]);
				this.rangeMax = Math.floor(values[1]);
				rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
			});
		}
	}
	getCategoryValue(arr) {
		arr.forEach((item) => {
			item.onchange = () => {
				this.categoryValue = item.value;
				this.iterateCardRange();
			};
		});
	}
	getSearchText(input) {
		input.oninput = (e) => {
			e.preventDefault();
			this.textValue = input.value.toUpperCase().trim();
			this.iterateCardRange();
		};
	}
	getCheckBoxValue(arr, arrValues) {
		arr.forEach((item) => {
			item.onchange = () => {
				if (item.checked) {
					this.checkCheckbox(arrValues, item, true);
					this.iterateCardRange();
				} else {
					this.checkCheckbox(arrValues, item, false);
					this.iterateCardRange();
				}
			};
		});
	}
	checkCheckbox(arr, item, val) {
		arr.forEach((obj) => {
			if (obj.name == item.name) {
				obj.value = val;
			}
		});
	}
}
