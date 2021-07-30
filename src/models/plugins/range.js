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
	let range = {};
	for (let i = 0; i < 100; i += +value) {
		switch (Math.ceil(i)) {
			case 0:
				range.min = minValue++;
				break;
			case 100:
				range.max = minValue++;
				break;
			default:
				range[i.toFixed(1) + "%"] = minValue++;
		}
	}
	return range;
}
