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


function fixParams (obj) {
  var key;
  var nw = [];
  var k;
  var i;

  if (obj) {
    for (key in obj) {
      if (obj [key] instanceof Array) {
        for (i = 0; i < obj [key] .length; i++) {
          nw.push (key + '[]=' + encodeURIComponent (obj [key] [i]));
        }
      } else if (obj [key] instanceof Object) {
        for (k in obj [key]) {
          nw.push (key + '[' + k + ']=' + encodeURIComponent (obj [key] [k]));
        }
      } else {
        nw.push (key + '=' + encodeURIComponent (obj [key]));
      }
    }
  }
  return nw.length ? '?' + nw.join ('&') : '';
}


module.exports = function (config) {
  return function (request) {
    var options = {
      url: 'https://overheid.io/api/' + (request.dataset || config.dataset),
      method: 'GET',
      headers: {
        'ovio-api-key': config.apikey || '',
        'User-Agent': 'npmjs.com/overheid.io'
      },
      timeout: request.timeout || config.timeout || defaults.timeout
    };

    options.url += request.path ? '/' + request.path : '';
    options.url += fixParams (request.params);

    http.doRequest (options, function (err, res) {
      var data = res && res.body || null;
      var error = null;

      if (err) {
        error = new Error ('request failed');
        error.error = err;
        error.body = data;
        request.callback (error);
        return;
      }

      try {
        data = JSON.parse (data);

        if (Object.keys (data) .length === 1 && Object.keys (data.headers) .length === 0) {
          error = new Error ('no result');
          request.callback (error);
          return;
        }
      } catch (e) {
        error = new Error ('invalid response');
        error.error = e;
        error.code = res.statusCode;
        error.body = data;
        request.callback (error);
        return;
      }

      if (res.statusCode >= 300) {
        error = new Error ('API error');
        error.code = res.statusCode;
        error.text = data.error || null;
        request.callback (error);
        return;
      }

      request.callback (null, data);
    });
  };
};
