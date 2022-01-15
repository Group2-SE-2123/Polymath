/* eslint-disable global-require */
module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				custom: {
					gray: "#d1d1d1",
					yellow: "#fcc822",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("tailwind-scrollbar")],
};
