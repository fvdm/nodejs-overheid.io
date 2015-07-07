/*
Name:         overheid.io
Description:  Access overheid.io endpoints like OpenKvK, RDW and BAG with node.js
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-overheid.io
Feedback:     https://github.com/fvdm/nodejs-overheid.io/issues
License:      Unlicense (Public Domain) - see LICENSE file
              (https://github.com/fvdm/nodejs-overheid.io/raw/master/LICENSE)
*/

var http = require ('httpreq');
var defaults = {
  timeout: 5000
};


// ('abc123', 'rdw', {timeout: 5000})
module.exports = function (apikey, endpoint, config) {
  // ('AB-12-XY', {filters: {merk: 'bmw'}}, function)
  return function (path, params, callback) {
    // ("", {}, function)
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    // ({}, function)
    if (path instanceof Object) {
      params = path;
      path = '';
    }

    var url = 'https://overheid.io/api/'+ endpoint +'/'+ path + fixParams (params);

    var options = {
      headers: {
        'ovio-api-key': apikey || '',
        'User-Agent': 'npmjs.com/overheid.io'
      },
      timeout: parseInt (config && config.timeout || defaults.timeout)
    };

    http.get (url, options, function (err, res) {
      var data = res && res.body || null;
      var error = null;

      if (err) {
        error = new Error ('request failed');
        error.error = err;
        error.body = data;
        callback (error);
        return;
      }

      try {
        data = JSON.parse (data);

        if (data.headers instanceof Object && Object.keys (data.headers) .length === 0) {
          error = new Error ('no result');
        }
      }
      catch (e) {}

      if (err) {
        error = new Error ('request failed');
        error.error = err;
      }

      if (res.statusCode >= 300) {
        error = new Error ('API error');
        error.code = res.statusCode;
      }

      callback (error, data);
    });
  };
};


function fixParams (o) {
  if (o) {
    var n = [], k, i;
    for (key in o) {
      if (o [key] instanceof Object) {
        for (k in o [key]) {
          n.push (key +'['+ k +']='+ encodeURIComponent (o [key] [k]));
        }
      } else if (o [key] instanceof Array) {
        for (i = 0; i < o [key] .length; i++) {
          n.push (key +'[]='+ encodeURIComponent (o [key] [i]));
        }
      } else {
        n.push (key +'='+ encodeURIComponent (o [key]));
      }
    }
    return '?'+ n.join ('&');
  }
  return '';
}
