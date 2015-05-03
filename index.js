'use strict';

var fs = require('fs');
var change = require('./lib/change');
var create = require('./lib/create');
var newFile = process.argv[2];
var color = process.argv[3];
console.log(newFile);

fs.readFile('./tmp/non-palette-bitmap.bmp', function(err, data) {
	if (err) console.log(err);
	var bitmap = create.createFileHeader(data);
	bitmap = create.createInfoHeader(bitmap, data);
	if(bitmap.infoHeader.biteClrUsed !== 0) {
		bitmap = create.createColorData(bitmap, data);
	} else {
		bitmap = create.createPixelData(bitmap, data);
	}
	if(bitmap.infoHeader.biteSize === (12 || 64)) {
		var i = 78;
	} else {
		i = 54;
	}
	var newBuffer = new Buffer(data);
	// var color = "r";
	if(bitmap.infoHeader.biteClrUsed !== 0) {
		change.changePaletteValue(newBuffer, bitmap.colorTable, color, 255, i);
	} else {
		change.changePixelValue(newBuffer, bitmap.pixelData, color, 255, 54);
	}

	fs.writeFile('./tmp/new1.bmp', newBuffer, function(err) {
		console.log('It\'s Saved!!!');
	});
});

