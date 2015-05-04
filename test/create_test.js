'use strict';

var expect = require('chai').expect;
var create = require('../lib/create.js');
var fs = require('fs');

describe('Create.js', function() {
  describe('Bitmap Header Info', function() {
    it('Should create header', function() {
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
    it('Should create DIB header', function() {
      var path = '../tmp/bitmap1.bmp';
      var expectObject = {
        biteSize: 40,
        biteWidth: 100,
        biteHeight: 100,
        bitePlanes: 1,
        biteBitCount: 8,
        biteCompression: 0,
        biteSizeImage: 10000,
        biteXPelsPerMeter: 2834,
        biteYPelsPerMeter: 2834,
        biteClrUsed: 256,
        biteClrImportant: 256
      };
      fs.readFile(path, function(err, data) {
        if (err) throw err;
        var bmp = create.createFileHeader(data);
        expect(create.createInfoHeader(bmp, data)).to.eql(expectObject);
      })
    });
  });

  describe('Palette Data', function() {

  });

  describe('Pixel Data', function() {

  });
});
