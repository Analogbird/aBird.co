<div align="center" style="margin:30px 0 40px">
	<img src="http://www.analogbird.com/static/img/playground/abird.co.png"/>
</div>

aBird.co
===============

[![Build Status](https://travis-ci.org/analogbird/aBird.co.svg)](https://travis-ci.org/analogbird/aBird.co)
[![Dependencies](https://david-dm.org/analogbird/aBird.co.png)](https://david-dm.org/analogbird/aBird.co)

[![NPM](https://nodei.co/npm/abird.co.png?downloads=true&stars=true)](https://nodei.co/npm/abird.co/)

[![NPM](https://nodei.co/npm-dl/abird.co.png)](https://nodei.co/npm/abird.co/)

Simple wrapper for the aBird.co API -The world's most awesome content shortening service. Please make sure you visit (and read) [the API documentation](http://abird.co/doc) for more specific details.

##### Using this module can't be made any easier:

Install aBird.co

```
npm install abird.co
```

Require aBird.co

```
var abird = require('abird.co').fly(options);
```

The `options` object may contain:

* `env` - Which environment is being used; `PRO` or `DEV`. Defaults to `PRO`.
* `apiKey` - Your API key, obtained from your [aBird.co](https://account.aBird.co) profile page. Providing an API key is only required when using the `shrink` method.
* `timeout` - API request timeout, in milliseconds. Defaults to `3600`. 


And you are ready to use this awesome API.


API
===============

- **.shrink(object, callback)**
- **.expand(mask, callback)**
- **.stats(mask, callback)**
- **.delete(mask [, deleteType], callback)**

In all cases the `callback` has this signature:

```javascript
function(err, data) {

}
```


Some examples
===============

```
The examples listed in this document assume that Express is being used.
```

#### Shrink content

```javascript
var content = {
	"data": {
		"type": "url",
		"value": "http://abird.co"
	}
};

abird.shrink(content, function(err, data) {
	if (err) {
		return next(err);
	}

	res.send(data);
});
```


#### Expand content

```javascript
var mask = 'a';
abird.expand(mask, function(err, data) {
	if (err) {
		return next(err);
	}

	if (!data) {
		res.status(404).end();
	} else {
		res.redirect(302, data.value);
	}
});
```


#### Basic content statistics

```javascript
var mask = 'a';
abird.stats(mask, function(err, data) {
	if (err) {
		return next(err);
	}

	if (!data) {
		res.status(404).end();
	} else {
		res.send(data);
	}
});
```


#### Delete content

```javascript
var mask = 'a';
abird.delete(mask, 'soft', function(err, data) {
	if (err) {
		return next(err);
	}

	res.status(200).end();
});
```
