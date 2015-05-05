'use strict';

var expect = require('chai').expect;
var Create = require('../lib/create.js');
var Change = require('../lib/change.js');
var create = new Create();
var change = new Change();
var fs = require('fs');

describe('Change.js', function() {

  describe('@function changePaletteValue()', function() {
    it('Should return a transformed buffer', function(done) {
      fs.readFile('./tmp/bitmap1.bmp', function(err, data) {
        if (err) console.log(err);
        var bitmap = {};
        create.createHeader(data, bitmap, function(bitmap, data) {
          bitmap = create.createColorData(bitmap, data);
          var newBuffer = new Buffer(data);
          change.changePaletteValue(newBuffer, bitmap.colorTable, 'red', 255, 56, function(err, data) {
            expect(Buffer.isBuffer(newBuffer)).to.eql(true);
            done();
          });
        });
      });
    });
  });

  describe('@function changePixelValue()', function() {
    it('Should return modified buffer of pixel data', function(done) {
      fs.readFile('./tmp/non-palette-bitmap.bmp', function(err, data) {
        if (err) console.log(err);
        var bitmap = {};
        create.createHeader(data, bitmap, function(bitmap, data) {
          bitmap = create.createPixelData(bitmap, data);
          var newBuffer = new Buffer(data);
          change.changePaletteValue(newBuffer, bitmap.pixelData, 'red', 255, 56, function(err, data) {
            expect(Buffer.isBuffer(newBuffer)).to.eql(true);
            done();
          });
        });
      });
    });
  });

});
