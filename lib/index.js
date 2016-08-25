'use strict';


let request = require('request'),
    underscore = require('underscore');

module.exports = {

    fly: function(options) {

        options = options || {};

        this.url = 'http://api.abird.co/';
        this.apiKey = options.apiKey || null;
        this.timeout = options.timeout || 3600;

        return this;
    },

    shrink: function(content) {

        return new Promise((yes, no) => {

            if (!underscore.isObject(content) || underscore.isEmpty(content)) {
                return no({ status: 404, message: 'The expected data was not found.' });
            }

            let requestOptions = {
                method: 'POST',
                uri: this.url + 'content/',
                json: true,
                body: content,
                timeout: this.timeout
            };

            request(requestOptions, function (err, res) {
                if (err || res.statusCode !== 200) {
                    return no({ status: res.statusCode || 400, message: res.body || err });
                }

                yes(res.body);
            });
        });
    },

    expand: function(mask) {

        let requestOptions = {
            method: 'GET',
            uri: `${this.url}content/${mask}`,
            json: true,
            timeout: this.timeout
        };

        return new Promise((yes, no) => {

            request(requestOptions, function (err, res) {
                if (err || res.statusCode !== 200) {
                    return no({ status: res.statusCode || 400, message: res.body || err });
                }

                yes(res.body);
            });
        });
    },

    delete: function(mask) {

        let requestOptions = {
            method: 'DELETE',
            uri: `${this.url}content/${mask}`,
            timeout: this.timeout
        };

        return new Promise((yes, no) => {

            request(requestOptions, function (err, res) {

                if (err || res.statusCode !== 200) {
                    return no({ status: res.statusCode || 400, message: err || null});
                }

                yes(res.statusCode);
            });
        });
    }
};
