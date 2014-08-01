'use strict';


var log = require('debug')('abird.co'),
    util = require('util');

require('should');

var testURL = 'https://github.com/aichholzer/aBird.co',
	options = {
		apiKey: '7e061221a7fee8ebf2ee5108f0196536af59246e',
		timeout: 3600
	},
	abird = require('../lib/index').fly(options);


describe('aBird', function () {

	describe('#shrink', function () {
		it('should return a shrunken URL and size reduction', function (done) {
			abird.shrink(testURL, function (err, data) {
				if (err) {
					throw err;
				}
				
				log('Shrink:' + testURL);
				log('Data: ' + util.inspect(data));
				data.should.not.equal.null;

				// To be used in the expanding tests.
				testURL = data.url;
				done();
			});
		});
	});

	describe('#expandFromURL', function () {
		it('should return an expanded URL and size expansion', function (done) {
			abird.expandFromURL(testURL, function (err, data) {
				if (err) {
					throw err;
				}

				log('Expand:' + testURL);
				log('Data: ' + util.inspect(data));
				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('#expandFromHash', function () {
		it('should return an expanded URL and size expansion', function (done) {
			var hash = testURL.split('/').pop();
			abird.expandFromHash(hash, function (err, data) {
				if (err) {
					throw err;
				}

				log('Expand:' + hash);
				log('Data: ' + util.inspect(data));
				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('#softDelete', function () {
		it('should return a 200 status code', function (done) {
			abird.delete(testURL, 'soft', function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});

	describe('#hardDelete', function () {
		it('should return a 200 status code', function (done) {
			abird.delete(testURL, 'hard', function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});

});
