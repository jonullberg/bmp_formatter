'use strict';

var Create = module.exports = exports = function() {};

module.exports.createFileHeader = function(data, callback) {
	var bitmap = {};
	bitmap.fileHeader = {};
	bitmap.fileHeader.bfType = data.readUInt16LE(0);
	bitmap.fileHeader.bfSize = data.readUInt32LE(2);
	bitmap.fileHeader.bfReserved1 = data.readUInt16LE(6);
	bitmap.fileHeader.bfReserved2 = data.readUInt16LE(8);
	bitmap.fileHeader.bfOffBits = data.readUInt32LE(10);
	if(typeof callback === 'function') {
		callback();
	}
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
	if(typeof callback === 'function') {
		callback();
	}
	return bitmap;
};

module.exports.createColorData = function(bitmap, data, callback) {
	var colorBytes = (bitmap.infoHeader.biteClrUsed * 4) + 54;
	var i = 0;
	bitmap.colorTable = [];
	if(bitmap.infoHeader.biteSize === (12 || 64)) {
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

module.exports.createPixelData = function(bitmap, data, callback) {
	var pixelBytes = bitmap.infoHeader.biteSizeImage + 54;
	var i = 0;
	bitmap.pixelData = [];
	i = 54;
	var n = i;
	while (i < pixelBytes) {
		var j = (i - n) / 3;
		bitmap.pixelData[j] = {};
		bitmap.pixelData[j].b = data.readUInt8(i);
		bitmap.pixelData[j].g = data.readUInt8(i + 1);
		bitmap.pixelData[j].r = data.readUInt8(i + 2);
		i = i + 3;
	}
	var stride = Math.floor(((bitmap.infoHeader.biteBitCount * bitmap.infoHeader.biteWidth) + 31) / 32) * 4;
	if(typeof callback === 'function') {
		callback();
	}
	return bitmap;
};
