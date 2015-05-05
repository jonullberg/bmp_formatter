'use strict';

var expect = require('chai').expect;
var Create = require('../lib/create.js');
var create = new Create();
var fs = require('fs');

describe('Create.js', function() {
  describe('@function createHeader()', function() {
    it('Should return bitmap header info', function(done) {
      fs.readFile('./tmp/tester.bmp', function(err, data) {
        var bitmap = {};
        create.createHeader(data, bitmap, function(data, bmp) {
          expect(bitmap.header.colorsUsed).to.eql(256);
          done();
        });
      });
    });
  });

  describe('@function createColorData()', function() {
    it('Should create color palette data within array', function(done) {
      fs.readFile('./tmp/tester.bmp', function(err, data) {
        if (err) console.log(err);
        var bitmap = {};
        create.createHeader(data, bitmap, function(data, bmp) {
          create.createColorData(data, bitmap);
          expect(bitmap.colorTable[0].r).to.be.within(0, 255);
          done();
        });
      });
    });
  });
});
