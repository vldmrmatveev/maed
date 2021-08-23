import noUiSlider from "nouislider";
import {
	rangeSlider,
	rangeSliderSetting,
	rangeSliderValues,
} from "@models/plugins/range";

class Filter {
	constructor(selector, cards) {
		this.cards = document.querySelectorAll(cards);
		this.errorMessageContainer = document.querySelectorAll(
			".catalog-title-item"
		);
		this.errorMessage =
			"К сожалению, ничего не найдено. Попробуйте изменить критерии поиска";
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
		this.generateSliderValues();
		this.getFilterValues();
	}
	getFilterValues() {
		this.getCategoryValue(this.category);
		this.getSearchText(this.searchInput);
		this.getCheckBoxValue(this.checkboxes, this.checkboxesVal);
		this.getSelectValue(this.property);
		this.getSelectValue(this.specification);
	}
	generateSliderValues() {
		this.createSlider();
		this.changeSliderVal();
	}
	changeSliderVal() {
		if (rangeSliderValues[0] != null && rangeSlider != null) {
			rangeSlider.noUiSlider.on("slide", function (values, handle) {
				this.rangeMin = Math.floor(values[0]);
				this.rangeMax = Math.floor(values[1]);
				rangeSliderValues[handle].innerHTML = Math.floor(values[handle]);
			});
			rangeSlider.noUiSlider.on("change", () => this.iterateCards());
		}
	}
	iterateCards() {
		this.cards.forEach((item) => {
			if (
				this.iterateCardsText(item) &&
				this.iterateCardsCheckbox(this.checkboxesVal, item) &&
				this.iterateCardsRadio(item) &&
				this.iterateCardsRange(item) &&
				this.iterateCardsSelectProperty(item) &&
				this.iterateCardsSelectSpecification(item)
			) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
			this.checkEmptyContainer();
		});
	}
	checkEmptyContainer() {
		const hiddenCards = [];
		this.cards.forEach((item, i) => {
			if (item.style.display == "none") {
				hiddenCards.push(i);
			}
		});
		this.errorMessageContainer.forEach((title) => {
			if (hiddenCards.length === this.cards.length) {
				title.textContent = this.errorMessage;
			} else {
				title.textContent = title.dataset.titleitem;
			}
		});
	}
	iterateCardsSelectProperty(item) {
		if (this.prop == "all" || item.dataset.property == this.prop) {
			return true;
		}
	}
	iterateCardsSelectSpecification(item) {
		if (this.spec == "all" || item.dataset.specification == this.spec) {
			return true;
		}
	}
	iterateCardsRange(item) {
		if (
			item.dataset.month >= this.rangeMin &&
			item.dataset.month <= this.rangeMax
		) {
			return true;
		}
	}
	iterateCardsRadio(item) {
		if (
			this.categoryValue == "all" ||
			item.dataset.category == this.categoryValue
		) {
			return true;
		}
	}
	iterateCardsText(item) {
		const value = item.dataset.title.toUpperCase();
		if (this.textValue == "" || value.includes(this.textValue)) {
			return true;
		}
	}
	iterateCardsCheckbox(arr, item) {
		const checkboxesFiltered = arr.filter((checkbox) => checkbox.value == true);
		const feature = item.dataset.feature;
		if (checkboxesFiltered.length == 0) {
			return true;
		} else if (
			checkboxesFiltered.length == 1 &&
			feature.includes(checkboxesFiltered[0].name)
		) {
			return true;
		} else {
			const featureArr = feature.split(" ");
			const isCheckedCheckboxArr = checkboxesFiltered.map(
				(checkbox) => checkbox.name
			);
			const featureArrContainsCheckboxes = featureArr.filter(
				this.fitrateCheckboxValue(isCheckedCheckboxArr)
			);
			if (featureArrContainsCheckboxes.length == isCheckedCheckboxArr.length) {
				return true;
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
				this.iterateCards();
			} else if (select.name == "property") {
				this.prop = select.value;
				this.iterateCards();
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
				this.iterateCards();
			};
		});
	}
	getSearchText(input) {
		input.oninput = (e) => {
			e.preventDefault();
			this.textValue = input.value.toUpperCase().trim();
			this.iterateCards();
		};
	}
	getCheckBoxValue(arr, arrValues) {
		arr.forEach((item) => {
			item.onchange = () => {
				if (item.checked) {
					this.checkCheckbox(arrValues, item, true);
					this.iterateCards();
				} else {
					this.checkCheckbox(arrValues, item, false);
					this.iterateCards();
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

document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementById("filterItem")) {
		const filter = new Filter("filter", ".course-card-main__block");
		filter.filter();
	}
});
