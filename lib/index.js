'use strict';


var request = require('request'),
	underscore = require('underscore');

module.exports = {

	fly : function (options) {

		/**
		 * The API's base URL to be used.
		 */
		var devUrl = 'http://sandbox.abird.co/',
			proUrl = 'http://api.abird.co/';

		this.url = proUrl;
		this.serviceUrl = 'http://ab.je/';

		if (options) {
			this.apiKey = options.apiKey || null;
			this.timeout = options.timeout || 3600;

			if (options.env && options.env.toLowerCase() === 'dev') {
				this.url = devUrl;
			}
		}

		return this;
	},

	shrink : function (birdData, callback) {

		if (!underscore.isObject(birdData) || underscore.isEmpty(birdData)) {
			callback({ code: 404, message: 'The expected data was not found.' });
			return;
		}

		var requestOptions = {
			uri: this.url + 'content/',
			json: true,
			body: {
				"key": this.apiKey,
				"public": (birdData.public === false) ? false : true,
				"data": birdData.data,
				"meta": birdData.meta || {}
			},
			timeout: this.timeout
		};
		
		request.post(requestOptions, function (err, res) {

			if (err) {
				callback({ code: 500, message: err });
			} else if (res.statusCode !== 200 && res.statusCode !== 404) {
				callback({ code: res.statusCode, message: res.body });
			} else if (res.statusCode === 404) {
				callback(null, null);
			} else {
				callback(null, res.body);
			}

			return;
		});
	},

	expand : function (birdMask, callback) {

		var requestOptions = {
			uri: this.url + 'content/' + birdMask,
			json: true,
			timeout: this.timeout
		};

		request.get(requestOptions, function (err, res) {

			if (err) {
				callback({ code: 500, message: err });
			} else if (res.statusCode !== 200 && res.statusCode !== 404) {
				callback({ code: res.statusCode, message: res.body });
			} else if (res.statusCode === 404) {
				callback(null, null);
			} else {
				callback(null, res.body);
			}

			return;
		});
	},

	stats : function (birdMask, callback) {

		var requestOptions = {
			uri: this.url + 'content/' + birdMask + '/stats',
			json: true,
			timeout: this.timeout
		};

		request.get(requestOptions, function (err, res) {

			if (err) {
				callback({ code: 500, message: err });
			} else if (res.statusCode !== 200 && res.statusCode !== 404) {
				callback({ code: res.statusCode, message: res.body });
			} else if (res.statusCode === 404) {
				callback(null, null);
			} else {
				callback(null, res.body);
			}

			return;
		});

	},

	delete : function (birdMask, deleteType, callback) {

		if (typeof deleteType === 'function') {
			callback = deleteType;
			deleteType = 'soft';
		}

		var requestOptions = {
			uri: this.url + 'content/',
			json: true,
			body: {
				"key": this.apiKey,
				"mask": birdMask,
				"type": (deleteType === 'hard') ? 'hard' : 'soft'
			},
			timeout: this.timeout
		};

		request.del(requestOptions, function (err, res) {

			if (err) {
				callback({ code: 500, message: err });
			} else if (res.statusCode !== 200 && res.statusCode !== 404) {
				callback({ code: res.statusCode, message: null });
			} else {
				callback(null, res.statusCode);
			}

			return;
		});

	}

};
