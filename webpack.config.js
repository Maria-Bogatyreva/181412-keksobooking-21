const path = require("path");

module.exports = {
	entry: [
		"./js/util.js",
		"./js/constant.js",
		"./js/backend.js",
		"./js/debounce.js",
		"./js/card.js",
		"./js/filter.js",
		"./js/mark.js",
		"./js/move.js",
		"./js/map.js",
		"./js/main.js",
		"./js/validate.js",
		"./js/form.js"
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname),
		iife: true
	},
	devtool: false
};
