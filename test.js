/*
Name:         overheid.io - test.js
Description:  Access overheid.io endpoints like OpenKvK, RDW and BAG with node.js
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-overheid.io
Feedback:     https://github.com/fvdm/nodejs-overheid.io/issues
License:      Unlicense (Public Domain) - see LICENSE file
              (https://github.com/fvdm/nodejs-overheid.io/raw/master/LICENSE)
*/

// Setup
var app = require ('./');
var ovio = new app (
  process.env.OVIO_APIKEY || null,
  'rdw',
  {
    timeout: process.env.OVIO_TIMEOUT || 5000
  }
);


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error ('\033[1m\033[31mERROR\033[0m - '+ label +'\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if(testErrors.length === 0) {
      console.log ('\033[1m\033[32mgood\033[0m - '+ label);
    } else {
      console.error ('\033[1m\033[31mFAIL\033[0m - '+ label +' ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}


queue.push (function () {
  var tmp = new app (
    process.env.OVIO_APIKEY || null,
    'rdw',
    {
      timeout: 1
    }
  );

  tmp ('4-TFL-24', { fields: ['eerstekleur'] }, function (err) {
    doTest (null, 'config.timeout', [
      ['type', err instanceof Error],
      ['message', err && err.message === 'request failed'],
      ['error', err && err.error instanceof Object],
      ['code', err && err.error && err.error.code === 'TIMEOUT']
    ]);
  });
});


queue.push (function () {
  ovio ('error.test', function (err, data) {
    doTest (null, 'error handling', [
      ['type', err instanceof Error],
      ['message', err && err.message === 'no result']
    ]);
  });
});


queue.push (function () {
  ovio ('4-TFL-24', { fields: ['eerstekleur'] }, function (err, data) {
    doTest (err, 'item', [
      ['data', data && data != null],
      ['type', data instanceof Object],
      ['property', data && data.kenteken === '4-TFL-24'],
      ['field', data && typeof data.eerstekleur === 'string']
    ]);
  })
});


queue.push (function () {
  ovio (
    {
      filters: { merk: 'bmw' },
      fields: ['eerstekleur', 'vermogen']
    },
    function (err, data) {
      doTest (err, 'list', [
        ['type', data && data instanceof Object],
        ['total', data && data.totalItemCount >= 1],
        ['path', data && data._embedded && data._embedded.kenteken instanceof Array],
        ['size', data && data._embedded && data._embedded.kenteken && data._embedded.kenteken.length >= 1],
        ['item', data && data._embedded && data._embedded.kenteken && data._embedded.kenteken.length && data._embedded.kenteken [0] instanceof Object]
      ]);
    }
  );
})


// Start the tests
console.log ('Running tests...\n');
queue [0] ();
