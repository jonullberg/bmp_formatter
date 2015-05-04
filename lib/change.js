'use strict';

/**
 * Transform image data objects returned by @module:lib/create.js
 * @module lib/change.js
 */
var Change = module.exports = exports = function() {};

/**
 * @function changePaletteValue
 * @param {buffer} data - New buffer that will be written to new file
 * @param {array} arr - Color palette data created by @function:/lib/create.js:createColorData();
 * @param {string} color - Color to change
 * @param {number} value - Value to set color to
 * @param {number} index - Location of first write byte
 * @returns {buffer} data - New buffer to write to new file
 */
module.exports.changePaletteValue = function(data, arr, color, value, index, callback) {
	var i = index;
	// if (color === "b") {i = index;} else if (color === "g") {i = index + 1;} else {i = index + 2;}
	while(i < arr.length + 54) {
		data.writeUInt8(value, i);
		i = i + 4;
	}
	if(typeof callback === 'function') {
		callback();
	}
	return data;
};

/**
 * @function changePixelValue
 * @param {buffer} data - New buffer that will be written to new file
 * @param {array} arr - Pixel data created by @function:/lib/create.js:createPixelData();
 * @param {string} color - Color to change
 * @param {number} value - Value to set color to
 * @param {number} index - Location of first write byte
 * @returns {buffer} data - New buffer to write to new file
 */
module.exports.changePixelValue = function(data, arr, color, value, index, callback) {
	var i = index;
	// if (color === 'b') {i = index;} else if (color === 'g') {i = index + 1;} else {i = index + 2;}
	while(i < (arr.length * 3) + 54) {
		data.writeUInt8(value, i);
		i = i + 3;
	}
	if(typeof callback === 'function') {
		callback();
	}
	return data;
};
