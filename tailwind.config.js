module.exports = {
	purge: {
		content: ['./src/*.pug', './src/models/*/*.pug'],
		safelist: [
			'mr-3',
			'overflow-hidden',
			'sm_py-3',
			'sm_py-8',
			'border-white',
			'border-red',
			'bg-blue-lightwave',
			'bg-red-light',
			'bg-yellow-light',
			'mb-16',
			'hover_bg-purple-dark',
			'hover_text-yellow',
			'md_text-indigo',
			'text-base',
			'sm_text-xl',
			'text-gray',
		],
	},
	darkMode: false, // or 'media' or 'class'
	separator: '_',
	theme: {
		letterSpacing: {
			widest: '1.5rem',
		},
		borderWidth: {
			DEFAULT: '1px',
			'0': '0',
			'2': '2px',
			'3': '3px',
			'4': '4px',
			'8': '8px',
		},
		maxHeight: {
			md: '28rem',
			xs: '20rem',
		},
		minWidth: {
			'4': '1rem',
			'5': '1.25rem',
			'8': '2rem',
			'20': '5rem',
			'28': '7rem',
		},
		minHeight: {
			sm: '4.5rem',
			md: '12rem',
			lg: '16.5rem',
			xl: '22rem',
		},
		fontFamily: {
			sans: ['Proxima Nova', 'Arial', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			blue: {
				lightwave: '#D8EEFA',
				newwave: '#6E99AE',
				gray: '#CBDCE3',
				sea: '#EBF5FF',
				wave: '#5DC7D1',
				light: '#D1E2EB',
				DEFAULT: '#B4D1E0',
				dark: '#6A7EDA',
			},
			purple: {
				DEFAULT: '#6A7EDA',
				dark: '#415bd0',
			},
			pink: {
				DEFAULT: '#E37FC1',
				dark: '#e469bb',
			},
			green: '#3DC47E',
			white: '#ffffff',
			gray: {
				DEFAULT: '#F5F5F5',
				base: '#4B5157',
				dark: '#939699',
				border: '#D9DADB',
			},
			indigo: {
				DEFAULT: '#223549',
				dark: '#2E2D41',
			},
			red: {
				light: '#FADFD8',
				DEFAULT: '#EC663D',
				dark: '#e04516',
				darken: '#A7411D',
			},
			yellow: {
				light: '#FFFCE0',
				DEFAULT: '#F7C154',
				dark: '#ffba2f',
			},
		},
		container: {
			padding: '1rem',
			center: true,
			screens: {
				sm: '560px',
				md: '720px',
				lg: '1024px',
				xl: '1140px',
			},
		},
		extend: {
			fontSize: {
				xxs: '11px',
			},
			width: {
				initial: 'initial',
			},
		},
	},
	variants: {
		extend: {
			grayscale: ['hover', 'focus'],
		},
	},
	plugins: [],
};
