'use strict';

var Hex = module.exports = exports = function() {};

Hex.prototype.hex = function(data) {
	console.log(data.toString(16));
	return data.toString(16);
};