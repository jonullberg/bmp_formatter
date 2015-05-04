'use strict';

var expect = require('chai').expect;
var create = require('../lib/create.js');
var fs = require('fs');

describe('Create.js', function() {
  describe('Bitmap Header Info', function() {
    it('Should create header', function() {
      var testBuffer;
      var path = '../tmp/bitmap1.bmp';
      var expectObject = {
        bfType: 19778,
        bfSize: 11078,
        bfReserved1: 0,
        bfReserved2: 0,
        bfOffBits: 1078
      };
      fs.readFile(path, function(err, data) {
        if (err) throw err;
        expect(create.createFileHeader(data)).to.eql(expectObject);
      });
    });
  });

  describe('DIB Header Info', function() {

  });

  describe('Palette Data', function() {

  });

  describe('Pixel Data', function() {

  });
});
