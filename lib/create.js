'use strict';

var Create = module.exports = exports = function() {};

module.exports.createFileHeader = function(data, callback) {
	var bitmap = {};
	bitmap.fileHeader = {}
	bitmap.fileHeader.bfType = data.readUInt16LE(0);
	bitmap.fileHeader.bfSize = data.readUInt32LE(2);
	bitmap.fileHeader.bfReserved1 = data.readUInt16LE(6);
	bitmap.fileHeader.bfReserved2 = data.readUInt16LE(8);
	bitmap.fileHeader.bfOffBits = data.readUInt32LE(10);
	typeof callback === 'function' && callback();
	return bitmap;
};

module.exports.createInfoHeader = function(bitmap, data, callback) {
	bitmap.infoHeader = {};
	bitmap.infoHeader.biteSize = data.readUInt32LE(14);
	bitmap.infoHeader.biteWidth = data.readUInt32LE(18);
	bitmap.infoHeader.biteHeight = data.readUInt32LE(22);
	bitmap.infoHeader.bitePlanes = data.readUInt16LE(26);
	bitmap.infoHeader.biteBitCount = data.readUInt16LE(28);
	bitmap.infoHeader.biteCompression = data.readUInt32LE(30);
	bitmap.infoHeader.biteSizeImage = data.readUInt32LE(34);
	bitmap.infoHeader.biteXPelsPerMeter = data.readUInt32LE(38);
	bitmap.infoHeader.biteYPelsPerMeter = data.readUInt32LE(42);
	bitmap.infoHeader.biteClrUsed = data.readUInt32LE(46);
	bitmap.infoHeader.biteClrImportant = data.readUInt32LE(50);
	return bitmap;
};

module.exports.createColorData = function(bitmap, data, callback) {
	// var bitmap = {};
	// bitmap.fileHeader = {}
	// bitmap.fileHeader.bfType = data.readUInt16LE(0);
	// bitmap.fileHeader.bfSize = data.readUInt32LE(2);
	// bitmap.fileHeader.bfReserved1 = data.readUInt16LE(6);
	// bitmap.fileHeader.bfReserved2 = data.readUInt16LE(8);
	// bitmap.fileHeader.bfOffBits = data.readUInt32LE(10);

	// bitmap.infoHeader = {};
	// bitmap.infoHeader.biteSize = data.readUInt32LE(14);
	// bitmap.infoHeader.biteWidth = data.readUInt32LE(18);
	// bitmap.infoHeader.biteHeight = data.readUInt32LE(22);
	// bitmap.infoHeader.bitePlanes = data.readUInt16LE(26);
	// bitmap.infoHeader.biteBitCount = data.readUInt16LE(28);
	// bitmap.infoHeader.biteCompression = data.readUInt32LE(30);
	// bitmap.infoHeader.biteSizeImage = data.readUInt32LE(34);
	// bitmap.infoHeader.biteXPelsPerMeter = data.readUInt32LE(38);
	// bitmap.infoHeader.biteYPelsPerMeter = data.readUInt32LE(42);
	// bitmap.infoHeader.biteClrUsed = data.readUInt32LE(46);
	// bitmap.infoHeader.biteClrImportant = data.readUInt32LE(50);
	var colorBytes = (bitmap.infoHeader.biteClrUsed * 4) + 54;
	bitmap.colorTable = [];
	if(bitmap.infoHeader.biteSize === (12 || 64)) {
		var i = 78;
	} else {
		var i = 54;
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
	typeof callback === 'function' && callback();
	return bitmap;
};