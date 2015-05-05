'use strict';

/**
 * Create object with bitmap header information
 * @module lib/create.js
 */
var Create = module.exports = exports = function() {};

/**
 * @function createHeader
 * @param {buffer} data - File buffer returned from FS
 * @param {function} callback - Function to execute on callback
 * @returns {object} with bitmap header information
 */
Create.prototype.createHeader = function(data, obj, callback) {
	var bitmap = obj;
	bitmap.header = {};
	bitmap.header.bitmapType = data.readUInt16LE(0);
	bitmap.header.fileSize = data.readUInt32LE(2);
	bitmap.header.reserved1 = data.readUInt16LE(6);
	bitmap.header.reserved2 = data.readUInt16LE(8);
	bitmap.header.startPixelData = data.readUInt32LE(10);
	bitmap.header.biteSize = data.readUInt32LE(14);
	bitmap.header.biteWidth = data.readUInt32LE(18);
	bitmap.header.biteHeight = data.readUInt32LE(22);
	bitmap.header.bitePlanes = data.readUInt16LE(26);
	bitmap.header.pixelDepth = data.readUInt16LE(28);
	bitmap.header.bmpCompression = data.readUInt32LE(30);
	bitmap.header.pixelDataSize = data.readUInt32LE(34);
	bitmap.header.biteXPelsPerMeter = data.readUInt32LE(38);
	bitmap.header.biteYPelsPerMeter = data.readUInt32LE(42);
	bitmap.header.colorsUsed = data.readUInt32LE(46);
	bitmap.header.colorsImportant = data.readUInt32LE(50);
	if(typeof callback === 'function') {
		callback(bitmap, data);
	}
	return bitmap;
};

/**
 * @function createColorData
 * @param {object} bitmap - Javascript object returned by @function:createFileHeader() or @function:createInfoHeader()
 * @param {buffer} data - File buffer returned from FS
 * @param {function} callback - Function to execute on callback
 * @returns {object} Attaches color table to bitmap object
 */
Create.prototype.createColorData = function(bitmap, data, callback) {
	var bitmap = bitmap;
	var colorBytes = (bitmap.header.colorsUsed * 4) + 54;
	var i = 0;
	bitmap.colorTable = [];
	if(bitmap.header.biteSize === (12 || 64)) {
		i = 78;
	} else {
		i = 54;
	}
	var n = i;
	while (i < colorBytes) {
		var j = (i - n) / 4;
		bitmap.colorTable[j] = {};
		bitmap.colorTable[j].b = data.readUInt8(i);
		bitmap.colorTable[j].g = data.readUInt8(i + 1);
		bitmap.colorTable[j].r = data.readUInt8(i + 2);
		bitmap.colorTable[j].a = data.readUInt8(i + 3);
		i = i + 4;
	}
	if(typeof callback === 'function') {
		callback();
	}
	return bitmap;
};

/**
 * @function createPixelData
 * @param {object} bitmap - Javascript object returned by @function:createFileHeader() or @function:createInfoHeader()
 * @param {buffer} data - File buffer returned from FS
 * @param {function} callback - Function to execute on callback
 * @returns {object} Attaches image pixels to object
 */
Create.prototype.createPixelData = function(bitmap, data, callback) {
	var pixelBytes = bitmap.header.pixelDataSize + 54;
	var i = 54;
	bitmap.pixelData = [];
	var n = i;
	while (i < pixelBytes) {
		var j = (i - n) / 3;
		bitmap.pixelData[j] = {};
		bitmap.pixelData[j].b = data.readUInt8(i);
		bitmap.pixelData[j].g = data.readUInt8(i + 1);
		bitmap.pixelData[j].r = data.readUInt8(i + 2);
		i = i + 3;
	}
	if(typeof callback === 'function') {
		callback();
	}
	return bitmap;
};