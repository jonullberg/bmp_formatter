var fs = require('fs');
// var inputElement = document.getElementById('input');


function handleFiles(e) {
	var files = e.target.files[0];
	var reader = new FileReader();
	reader.addEventListener('load', processImage, false);
	reader.readAsArrayBuffer(file);
}

function processImage(e) {
	var buffer = e.target.result;
	var bitmap = getBMP(buffer);
	var imageData = convertToImageData(bitmap);
	ctx1.putImageData(imageData, 0, 0);
}

function getBMP(buffer) {
	var datav = new DataView(buffer);
	var bitmap = {};

	bitmap.fileHeader = {};
	bitmap.fileHeader.bfType = datav.getUint16(0, true);
	bitmap.fileHeader.bfSize = datav.getUint32(2, true);

}

function toHex(data) {
	return data.toString(16);
}


// function toArrayBuffer(buffer) {
// 	var ab = new ArrayBuffer(buffer.length);
// 	var view = new Uint16Array(ab);
// 	for (var i = 0; i < buffer.length; i++) {
// 		view[i] = buffer[i];
// 	}
// 	return ab;
// }

// inputElement.addEventListener('change', handleFiles, false);

fs.readFile('./tmp/test.bmp', 'utf-8', function(err, data) {
	var datav = new Buffer(data, 'ASCII');
	var bitmap = {};

	bitmap.fileHeader = {};
	bitmap.fileHeader.bfType = datav.readUInt16LE(0).toString(16);
	bitmap.fileHeader.bfSize = datav.readUInt32LE(2).toString(16);
	bitmap.fileHeader.bfReserved1 = datav.readUInt16LE(6).toString(16);
	bitmap.fileHeader.bfReserved2 = datav.readUInt16LE(8).toString(16);
	bitmap.fileHeader.bfOffBits = datav.readUInt32LE(10).toString(16);

	bitmap.infoHeader = {};
	bitmap.infoHeader.biSize = datav.readUInt32LE(14).toString(16);
	bitmap.infoHeader.biWidth = datav.readUInt32LE(18).toString(16);
	bitmap.infoHeader.biHeight = datav.readUInt32LE(22).toString(16);
	bitmap.infoHeader.biPlanes = datav.readUInt16LE(26).toString(16);
	bitmap.infoHeader.biBitCount = datav.readUInt16LE(28).toString(16);
	bitmap.infoHeader.biCompression = datav.readUInt32LE(30).toString(16);
	bitmap.infoHeader.biSizeImage = datav.readUInt32LE(34).toString(16);
	bitmap.infoHeader.biXPelsPerMeter = datav.readUInt32LE(38).toString(16);
	bitmap.infoHeader.biYPelsPerMeter = datav.readUInt32LE(42).toString(16);
	bitmap.infoHeader.biClrUsed = datav.readUInt32LE(46).toString(16);
	bitmap.infoHeader.biClrImportant = datav.readUInt32LE(50).toString(16);

	var start = bitmap.fileHeader.bfOffBits;
	bitmap.stride = Math.floor((bitmap.infoHeader.biBitCount * bitmap.infoHeader.biWidth + 31) / 32) * 4;
	// bitmap.pixels = new UInt8Array(datav, start);

	console.log(bitmap);
});

