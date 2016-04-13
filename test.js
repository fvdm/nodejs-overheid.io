/*
Name:         overheid.io - test.js
Description:  Access overheid.io endpoints like OpenKvK, RDW and BAG with node.js
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-overheid.io
Feedback:     https://github.com/fvdm/nodejs-overheid.io/issues
License:      Unlicense (Public Domain) - see LICENSE file
              (https://github.com/fvdm/nodejs-overheid.io/raw/master/LICENSE)
*/

var dotest = require ('dotest');
var app = require ('./');


// Setup
var config = {
  apikey: process.env.OVIO_APIKEY || null,
  timeout: process.env.OVIO_TIMEOUT || 5000,
  dataset: 'voertuiggegevens'
};

var ovio = app (config);


// Tests
dotest.add ('API key', function () {
  if (!config.apikey) {
    dotest.log ('OVIO_APIKEY is not set');
    dotest.exit ();
  } else {
    dotest.log ('good', 'OVIO_APIKEY key is set');
    dotest.test ()
      .done ();
  }
});


dotest.add ('Module', function () {
  dotest.test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'module', ovio)
    .done ();
});


dotest.add ('config.timeout', function () {
  ovio ({
    path: '4-TFL-24',
    params: {
      fields: ['eerstekleur']
    },
    timeout: 1,
    callback: function (err) {
      dotest.test ()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'request failed')
        .isError ('fail', 'err.error', err && err.error)
        .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
        .done ();
    }
  });
});


dotest.add ('no result', function () {
  ovio ({
    path: 'error.test',
    callback: function (err) {
      dotest.test ()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'no result')
        .done ();
    }
  });
});


dotest.add ('item', function () {
  ovio ({
    path: '4-TFL-24',
    callback: function (err, data) {
      dotest.test (err)
        .isNotEmpty ('fail', 'data', data)
        .isObject ('fail', 'data', data)
        .isExactly ('fail', 'data.kenteken', data && data.kenteken, '4-TFL-24')
        .isString ('fail', 'data.eerstekleur', data && data.eerstekleur)
        .done ();
    }
  });
});


dotest.add ('list', function () {
  ovio ({
    params: {
      filters: { merk: 'bmw' },
      fields: ['eerstekleur', 'vermogen']
    },
    callback: function (err, data) {
      dotest.test (err)
        .isObject ('fail', 'data', data)
        .isCondition ('fail', 'data.totalItemCount', data && data.totalItemCount, '>=', 1)
        .isArray ('fail', 'data._embedded.kenteken', data && data._embedded && data._embedded.kenteken)
        .isNotEmpty ('warn', 'data._embedded.kenteken', data && data._embedded && data._embedded.kenteken)
        .done ();
    }
  });
});


// Start the tests
dotest.run ();
