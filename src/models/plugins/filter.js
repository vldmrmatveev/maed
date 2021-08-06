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
		this.free = false;
		this.employment = false;
		this.sale = false;
		this.soon = false;
		this.diploma = false;
		this.rangeMin = null;
		this.rangeMax = null;
	}
	get prop() {
		return this.getSelectValue(this.property) || "all";
	}
	get specific() {
		return this.getSelectValue(this.specification) || "all";
	}
	get categoryValue() {
		return this.getCategoryValue(this.category) || "all";
	}
	get textValue() {
		return this.getSearchText(this.searchInput) || "";
	}
	getCheckBoxValue(arr) {
		arr.forEach((item) => {
			item.onchange = () => {
				if (item.checked) {
					this[item.name] = true;
				} else {
					this[item.name] = false;
				}
			};
		});
	}
	filter() {
		this.createSlider();
		this.changeSliderVal();
		this.getCategoryValue(this.category);
		this.getSearchText(this.searchInput);
		console.log(this.prop);
		console.log(this.textValue);
		console.log(this.specific);
		this.getCheckBoxValue(this.checkboxes);
	}
	changeSliderVal() {
		if (rangeSliderValues[0] != null && rangeSlider != null) {
			rangeSlider.noUiSlider.on("slide", function (values, handle) {
				this.rangeMin = Math.floor(values[0]);
				this.rangeMax = Math.floor(values[1]);
				rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
			});
		}
	}
	getSelectValue(select) {
		select.onchange = () => {
			console.log(select.value);
			return select.value;
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
				const cards = document.querySelectorAll(".course-card-main");
				cards.forEach((el) => {
					if (el.dataset.category == item.value || item.value == "all") {
						el.style.display = "flex";
					} else {
						el.style.display = "none";
					}
				});
				return item.value;
			};
		});
	}
	getSearchText(input) {
		input.oninput = () => {
			const val = input.value.toUpperCase().trim();
			const cards = document.querySelectorAll(".course-card-main");
			cards.forEach((item) => {
				let itemValue = item.dataset.title.toUpperCase();
				if (itemValue.includes(val)) {
					item.style.display = "flex";
				} else {
					item.style.display = "none";
				}
			});
			return val;
		};
	}
}
