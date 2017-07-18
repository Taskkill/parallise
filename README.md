# parallise
Special Promise, which content is executed parallely in web-worker and chainable in main context.

```
It's still in development. I am basically polishing everything, enhancing stuff and writing tests.
Any constructive feedback would by very appreciated.
Use project's github page. Thanks.
```
Main purpose is to create Promises in web-workers, thenable in main context.

You should use it only in browser, since node does not provide Worker API. In this time, it has not been tested on node with fake Worker APIs.

```bash
npm install parallise
```

# It uses some specific APIs:

Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob - I don't use it in workers so, don't worry about support.

window.URL.createObjectURL() : https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#Browser_compatibility - Which has good basic support.

Tests will come soon.

## You can, but don't have to use `new Parallise`

Example of usage:
```javascript
  import Parallise from 'parallise';
  // or
  var Parallise = require('parallise');

  Parallise(function (resolve, reject) {
    console.log("inside worker promise");
    resolve(23);
    }
  )
  .then(result => {console.log(result); return result * 2})
  .then(result => console.log(result));

  console.log("this will execute before then");
```


Even use arrow functions and `new` keyword:
```javascript
  import Parallise from 'parallise';
  // or
  var Parallise = require('parallise');

  new Parallise((resolve, reject) => console.log("inside worker promise") || resolve(23))
  .then(result => {console.log(result); return result * 2})
  .then(result => console.log(result));

  console.log("this will execute before then");
```


Now you can also specify your own this object, inside worker thread. Use it like this:
```javascript
  import Parallise from 'parallise';
  // or
  var Parallise = require('parallise');

  Parallise(function (resolve, reject) {
    console.log("inside worker promise");
    resolve(this.multiplier * 23);
    },
    {multiplier: 4}
  )
  .then(result => {console.log(result); return result * 2})
  .then(result => console.log(result));

  console.log("this will execute before then");
```


# Executed function
Function expression which you are supplying into Parallise function can be either old fashioned function expression or new => operator.
In this time it cannot make use of async functions, in future maybe parallel iterators will be introduced.


# It's worker-less!

Main reason why you should choose this package is because it doesn't use native - separate file - Worker creation.
So you are not forced to configure you webpack/browserify to split bundle and server worker.js file separately.

It depends on native Promises yet. I will add polyfill support lately.
Actually just now, Promises are used only in main context/thread. Inside worker there is my own and very simply logic.
