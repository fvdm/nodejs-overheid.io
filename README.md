overheid.io
===========

overheid.io API wrapper

[![Build Status](https://travis-ci.org/fvdm/nodejs-overheid.io.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-overheid.io)

* [node.js](https://nodejs.org)
* [overheid.io](https://overheid.io)
* [API documentation](https://overheid.io/documentatie)


Voorbeeld
---------

```js
var ovio = require ('overheid.io') ({
  apikey: 'abc123',
  dataset: 'rdw'
});

ovio ({
  path: '4-TFL-24',
  params: { fields: ['eerstekleur'] },
  callback: function (err, data) {
    if (err) { return console.log (err); }
    console.log (data.eerstekleur);
  }
});
```


Installatie
-----------

Normaal: `npm install overheid.io`

Development: `npm install fvdm/nodejs-overheid.io#develop`


Setup
-----

De module geeft een _function_ terug voor algemene instellingen.


#### Instellingen

 param   | type    | vereist | default | uitleg
:--------|:--------|:--------|:--------|:--------------------------
 apikey  | string  | ja      |         | de API key
 dataset | string  | nee     |         | welke dataset te gebruiken
 timeout | integer | nee     | 5000    | wacht time-out in ms


> Je kan `timeout` en `dataset` ook per call in de API functie instellen.


```js
var ovio = require ('overheid.io') ({
  apikey: 'abc123',
  dataset: 'rdw'
});
```


API functie
-----------

De _Setup_ geeft ook een _function_ terug, deze doet de API calls.


#### Instellingen

 param    | type     | vereist | default| uitleg
:---------|:---------|:--------|:-------|:-----------------------------
 path     | string   | nee     |        | resource pad, i.e. `DA-GO-12`
 params   | object   | nee     |        | parameters om mee te sturen
 timeout  | integer  | nee     | 5000   | wacht time-out in ms
 dataset  | string   | nee     |        | welke dataset te gebruiken
 callback | function | ja      |        | `function (err, data) {}`


> `timeout` and `dataset` default to Setup when not provided.


```js
ovio ({
  path: '4-TFL-24',
  params: { fields: ['eerstekleur'] },
  callback: function (err, data) {
    if (err) { return console.log (err); }
    console.log (data.eerstekleur);
  }
});
```


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
