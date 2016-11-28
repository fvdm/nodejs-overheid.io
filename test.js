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
dotest.add ('Module', function (test) {
  test()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', ovio)
    .done();
});


dotest.add ('no result', function (test) {
  ovio ({
    path: 'error.test',
    callback: function (err) {
      test()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'no result')
        .done();
    }
  });
});


dotest.add ('item', function (test) {
  ovio ({
    path: '4-TFL-24',
    callback: function (err, data) {
      test (err)
        .isNull ('fail', 'err', err)
        .isNotEmpty ('fail', 'data', data)
        .isObject ('fail', 'data', data)
        .isExactly ('fail', 'data.kenteken', data && data.kenteken, '4-TFL-24')
        .isString ('fail', 'data.eerstekleur', data && data.eerstekleur)
        .done();
    }
  });
});


dotest.add ('list', function (test) {
  ovio ({
    params: {
      query: '*X*',
      queryFields: ['handelsbenaming'],
      filters: { merk: 'bmw' },
      fields: ['eerstekleur', 'vermogen']
    },
    callback: function (err, data) {
      var embedded = data && data._embedded;

      test (err)
        .isNull ('fail', 'err', err)
        .isObject ('fail', 'data', data)
        .isCondition ('fail', 'data.totalItemCount', data && data.totalItemCount, '>=', 1)
        .isObject ('fail', 'data._embedded', embedded)
        .isArray ('fail', 'data._embedded.kenteken', embedded && embedded.kenteken)
        .isNotEmpty ('warn', 'data._embedded.kenteken', embedded && embedded.kenteken)
        .done();
    }
  });
});


dotest.add ('Error: request failed', function (test) {
  ovio ({
    path: '4-TFL-24',
    params: {
      fields: ['eerstekleur']
    },
    timeout: 1,
    callback: function (err, data) {
      var error = err && err.error;

      test()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'request failed')
        .isError ('fail', 'err.error', error)
        .isExactly ('fail', 'err.error.code', error && error.code, 'TIMEOUT')
        .isUndefined ('fail', 'data', data)
        .done();
    }
  });
});


dotest.add ('Error: invalid response', function (test) {
  ovio ({
    params: {
      fields: ''
    },
    callback: function (err, data) {
      test()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'invalid response')
        .isCondition ('warn', 'err.code', err && err.code, '>=', 300)
        .isUndefined ('fail', 'data', data)
        .done();
    }
  });
});


dotest.add ('Error: API error', function (test) {
  var tmp = app ({
    dataset: 'voertuiggegevens'
  });

  tmp ({
    params: {
      filters: { merk: 'bmw' }
    },
    callback: function (err, data) {
      test()
        .isError ('fail', 'err', err)
        .isExactly ('fail', 'err.message', err && err.message, 'API error')
        .isString ('fail', 'err.error', err && err.error)
        .isNotEmpty ('fail', 'err.error', err && err.error)
        .isCondition ('fail', 'err.code', err && err.code, '>=', 300)
        .isUndefined ('fail', 'data', data)
        .done();
    }
  });
});


// Start the tests
dotest.run();
