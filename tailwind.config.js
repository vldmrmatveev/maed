module.exports = {
	purge: ["./src/*.pug", "./src/models/*/*.pug"],
	darkMode: false, // or 'media' or 'class'
	separator: "_",
	theme: {
		fontFamily: {
			sans: ["Proxima Nova", "Arial", "sans-serif"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			blue: {
				sea: "#EBF5FF",
				wave: "#5DC7D1",
				light: "#D1E2EB",
				DEFAULT: "#B4D1E0",
				dark: "#6A7EDA",
				darken: "#2E2D41",
			},
			pink: {
				DEFAULT: "#E37FC1",
				dark: "#e469bb",
			},
			white: "#ffffff",
			gray: "#F5F5F5",
			indigo: "#223549",
			red: {
				DEFAULT: "#EC663D",
				dark: "#A7411D",
			},
			yellow: {
				DEFAULT: "#F7C154",
				dark: "#ffba2f",
			},
		},
		container: {
			padding: "1rem",
			center: true,
			screens: {
				sm: "560px",
				md: "720px",
				lg: "991px",
				xl: "1140px",
			},
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
