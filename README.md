# parallise
Simple module of function returning promise executed parallely and chainable in main context.

It's still in development.

Main purpose is to create Promises in web-workers, thenable in main context.

You should use it only in browser, since node does not provide Worker API. In this time, it has not been tested on node with fake Worker APIs.

# It uses some specific APIs:

Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob - I don't use it in workers so, don't worry about support.

window.URL.createObjectURL() : https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#Browser_compatibility - Which has good basic support.

Tests will come soon.

Example of usage:
```javascript
  import getParallise from 'parallise';

  getParallise(function (resolve, reject) {
    console.log("inside worker promise");
    resolve(23);
    }
  )
  .then(result => {console.log(result); return result * 2})
  .then(result => console.log(result));

  console.log("this will execute before then");
```
