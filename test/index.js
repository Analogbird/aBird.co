'use strict';

require('should');

var options = {
		apiKey: '680e4bec6651c1b7682202b43761f392d633dd99',
		timeout: 3600
	},
	abird = require('../lib/index').fly(options),
	testMask;


describe('aBird basic tests:', function () {

	describe('Shrink (standard mask)', function () {
		it('Should return a shrunken URL and size reduction', function (done) {

			var content = {
				"data": {
					"value": 'https://yes.some-random-testing-domain.org/date/' + (+new Date),
					"type": 'url'
				}
			};

			abird.shrink(content, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;

				// To be used in the rest of the tests.
				testMask = data.mask;
				done();
			});
		});
	});

	describe('Expand (standard mask)', function () {
		it('Should return an expanded URL and size expansion', function (done) {
			abird.expand(testMask, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('Basic statistics (standard mask)', function () {
		it('Should return basic stats object', function (done) {
			abird.stats(testMask, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('Soft delete (standard mask)', function () {
		it('Should return a 200 status code', function (done) {
			abird.delete(testMask, function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});

	describe('Hard delete (standard mask)', function () {
		it('Should return a 200 status code', function (done) {
			abird.delete(testMask, 'hard', function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});


	// Custom mask
	describe('Shrink (custom mask)', function () {
		it('Should return a shrunken URL and size reduction', function (done) {

			var content = {
				"data": {
					"value": 'https://yes.some-random-testing-domain.org/date/' + (+new Date),
					"type": 'url',
					"mask": 'caminito'
				}
			};

			abird.shrink(content, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;

				// To be used in the rest of the tests.
				testMask = data.mask;
				done();
			});
		});
	});

	describe('Shrink (duplicate mask)', function () {
		it('Should return a a 409 status code', function (done) {

			var content = {
				"data": {
					"value": 'https://yes.some-random-testing-domain.org/date/' + (+new Date),
					"type": 'url',
					"mask": 'caminito'
				}
			};

			abird.shrink(content, function (err, data) {

				err.code.should.equal(409);
				done();
			});
		});
	});

	describe('Expand (custom mask)', function () {
		it('Should return an expanded URL and size expansion', function (done) {
			abird.expand(testMask, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('Basic statistics (custom mask)', function () {
		it('Should return basic stats object', function (done) {
			abird.stats(testMask, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('Soft delete (custom mask)', function () {
		it('Should return a 200 status code', function (done) {
			abird.delete(testMask, function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});

	describe('Hard delete (custom mask)', function () {
		it('Should return a 200 status code', function (done) {
			abird.delete(testMask, 'hard', function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});


	// Shrink text
	describe('Shrink text (custom mask)', function () {
		it('Should return a shrunken URL and size reduction', function (done) {

			var content = {
				data: {
					value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget arcu eget tellus ultricies accumsan non id tellus. Quisque id purus fringilla, porta quam id, iaculis dui. Aliquam erat volutpat. Sed scelerisque lorem at nibh blandit, vitae accumsan est malesuada. Maecenas luctus pharetra lorem, eget ullamcorper sem suscipit ac. Aliquam erat volutpat. In semper erat porta dolor ultricies, sed dictum mauris tempus. In in commodo massa. Proin sed risus tempus quam tempor mollis. Nullam ultrices orci in urna scelerisque, ac consequat odio scelerisque. Suspendisse quis ante cursus ipsum ultricies mollis.\r\n\r\nSuspendisse posuere scelerisque porttitor. Etiam non turpis justo. Fusce non lacinia magna, id blandit tellus. Quisque id turpis massa. Aliquam nibh nisl, porta pharetra dapibus at, efficitur sed risus. Nam id dignissim sem. In vel tellus arcu. Pellentesque in justo et sem gravida ultrices. Duis fringilla ante volutpat blandit volutpat. Vivamus eget nisi vel velit porttitor accumsan non a mi. In vel lacinia lectus. Ut lacinia egestas consectetur. Aliquam at orci sit amet purus pulvinar placerat. Donec tincidunt dui ut ligula lobortis, ut volutpat enim imperdiet. Morbi consequat risus nec mi convallis porta. Pellentesque facilisis diam nec dolor consectetur, at suscipit nibh accumsan.',
					type: 'txt',
					mask: 'lipsum'
				},
				meta: {
					url: 'http://en.wikipedia.org/wiki/Automobile',
					title: 'Lipsum',
					favicon: ''
				}
			};

			abird.shrink(content, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;

				// To be used in the rest of the tests.
				testMask = data.mask;
				done();
			});
		});
	});

	describe('Expand (custom mask)', function () {
		it('Should return an expanded URL and size expansion', function (done) {
			abird.expand(testMask, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('Hard delete (custom mask)', function () {
		it('Should return a 200 status code', function (done) {
			abird.delete(testMask, 'hard', function (err, statusCode) {
				if (err) {
					throw err;
				}

				(statusCode).should.be.exactly(200).and.be.a.Number;
				done();
			});
		});
	});

});
