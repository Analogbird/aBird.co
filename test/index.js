'use strict';


var log = require('debug')('abird.co'),
    util = require('util');

require('should');

var testURL = 'https://github.com/aichholzer/aBird.co',
	options = {
		apiKey: '680e...dd99',
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

});
