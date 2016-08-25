<div align="center" style="margin:30px 0 40px">
	<img src="http://www.analogbird.com/static/img/playground/abird.co.png"/>
</div>

aBird.co
===============

[![Build Status](https://travis-ci.org/Analogbird/aBird.co.svg)](https://travis-ci.org/Analogbird/aBird.co)
[![Dependencies](https://david-dm.org/Analogbird/aBird.co.png)](https://david-dm.org/Analogbird/aBird.co)

[![NPM](https://nodei.co/npm/abird.co.png?downloads=true&stars=true)](https://nodei.co/npm/abird.co/)

[![NPM](https://nodei.co/npm-dl/abird.co.png)](https://nodei.co/npm/abird.co/)

```
Simple wrapper for the aBird.co API, the world's best, coolest and fastest URL shortening service. Period.
```

##### Using this module can't be any easier:

Install aBird.co

```
npm install abird.co
```

Require aBird.co

```
var abird = require('abird.co').fly(options);
```

The `options` object may contain:

* `apiKey` - Your API key, obtained from your [aBird.co](https://account.aBird.co) profile page. Providing an API key is only required when using the `shrink` method.
* `timeout` - API request timeout, in milliseconds. Defaults to `3600`. 


And you are ready to use this awesome API.


API
===============

- **.shrink(object)**
- **.expand(mask)**
- **.delete(mask)**

All of these methods return a promise.


Examples
===============

#### Shrink content

```javascript
let data = {
	type: "url",
	value: "http://abird.co"
};

abird.shrink(data)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.error(error);
    });
```


#### Expand content

```javascript
let mask = 'a';
abird.expand(mask)
    .then(result => {
        res.redirect(302, result.value);
    })
    .catch(error => {
        res.status(404).end();
        console.error(error);
    });
```


#### Delete content

```javascript
var mask = 'a';
abird.delete(mask)
    .then(() => {
        res.status(200).end();
    })
    .catch(error => {
        res.status(400).end();
        console.error(error);
    });
```
