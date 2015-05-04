'use strict';

var Change = module.exports = exports = function() {};

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