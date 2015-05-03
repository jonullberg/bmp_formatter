'use strict';

var Change = module.exports = exports = function() {};

exports.changeValue = function(data, arr, color, value, index) {
	var i = 0;
	if (color === "b") {i = index;} else if (color === "g") {i = index + 1;} else {i = index + 2;}
	while(i < arr.length + 54) {
		data.writeUInt8(value, i);
		i = i + 4;
	}
	return data;
};
