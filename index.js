'use strict';

var fs = require('fs');
var change = require('./lib/change');
var create = require('./lib/create');

fs.readFile('./tmp/test.bmp', function(err, data) {
	if (err) console.log(err);
	var bitmap = create.createFileHeader(data);
	bitmap = create.createInfoHeader(bitmap, data);
	bitmap = create.createColorData(bitmap, data);
	console.log(bitmap);

	if(bitmap.infoHeader.biteSize === (12 || 64)) {
		var i = 78;
	} else {
		var i = 54;
	}
	var newBuffer = new Buffer(data);
	var color = "r";
	change.changeValue(newBuffer, bitmap.colorTable, color, 255, i);
	// // var start = bitmap.fileHeader.bfOffBits;

	// fs.writeFile('./tmp/new.bmp', newBuffer, function(err) {
	// 	console.log('It\'s Saved!!!')
	// });
});

