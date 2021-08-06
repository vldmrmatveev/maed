export const rangeSlider = document.getElementById("sliderRange");
export const rangeSliderValues = [
	document.getElementById("sliderRangeMin"),
	document.getElementById("sliderRangeMax"),
];

export function rangeSliderSetting(start, end, max) {
	return {
		start: [start, end],
		snap: true,
		connect: true,
		range: createRangeForSlider(start, max),
	};
}

function createRangeForSlider(minValue, maxValue) {
	let value = (100 / (maxValue - minValue)).toFixed(2);
	let range = {
		min: minValue,
		max: maxValue,
	};
	for (let i = +value; i < 100; i += +value) {
		range[i.toFixed(2) + "%"] = ++minValue;
	}
	return range;
}
