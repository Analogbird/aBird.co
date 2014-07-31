'use strict';


var request = require('request');

module.exports = {

	fly : function (options) {

		/**
		 * The API's base URL to be used.
		 */
		this.url = 'http://api.abird.co/';

		if (options) {
			this.apiKey = options.apiKey || null;
			this.timeout = options.timeout || 3600;
		}

		return this;
	},

	shrink : function (birdUrl, mask, callback) {

		if (typeof mask === 'function') {
			callback = mask;
			mask = '';
		}

		var requestOptions = {
				uri: this.url + 'shrink/',
				json: true,
				body: {
					"key": this.apiKey,
					"url": birdUrl,
					"mask": mask
				},
				timeout: this.timeout
			};

		request.post(requestOptions, function (err, res, data) {

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
	
	expandFromURL : function (birdUrl, callback) {

		var requestOptions = {
				uri: this.url + 'expand/?url=' + birdUrl,
				json: true,
				timeout: this.timeout
			};

		request.get(requestOptions, function (err, res, data) {

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

	expandFromHash : function (birdHash, callback) {

		return this.expandFromURL('http://ab.je/' + birdHash, callback);

	}

};
