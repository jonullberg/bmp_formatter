'use strict';

var fs = require('fs');
var create = require('./lib/create');
var change = require('./lib/change');
var path = process.argv[2];
var color = process.argv[3].toLowerCase();

fs.readFile(path, function(err, data) {
	if (err) console.log(err);
	var i = 0;
	var bitmap = {};
	var startPoint = 0;
	var newBuffer = new Buffer(data);
	switch(color) {
		case 'b': 
		case 'blue':
			startPoint = 54;
			break;
		case 'g':
		case 'green':
			startPoint = 55;
			break;
		case 'r':
		case 'red':
			startPoint = 56;
			break;
		default:
			console.log('You did not enter a valid color choice, \n Please choose either r(ed), g(reen), or b(lue)');
			break;
	}
	bitmap = create.createFileHeader(data);
	bitmap = create.createInfoHeader(bitmap, data);
	// if(bitmap.infoHeader.biteSize === (12 || 64)) {
	// 	var startPoint = 78;
	// } else {
	// 	startPoint = 54;
	// }
	if(bitmap.infoHeader.biteBitCount <= 8) {
		bitmap = create.createColorData(bitmap, data);
		change.changePaletteValue(newBuffer, bitmap.colorTable, color, 255, startPoint);
	} else {
		bitmap = create.createPixelData(bitmap, data);
		change.changePixelValue(newBuffer, bitmap.pixelData, color, 255, startPoint);
	}


	fs.writeFile('./tmp/new1.bmp', newBuffer, function(err) {
		if(err) console.log(err);
	});
});

