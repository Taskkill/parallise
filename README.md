# parallise
Simple module of one function returning Promise, which content is executed parallely in web-worker and chainable in main context.

It's still in development.

Main purpose is to create Promises in web-workers, thenable in main context.

You should use it only in browser, since node does not provide Worker API. In this time, it has not been tested on node with fake Worker APIs.

```bash
npm install parallise
```

# It uses some specific APIs:

Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob - I don't use it in workers so, don't worry about support.

window.URL.createObjectURL() : https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#Browser_compatibility - Which has good basic support.

Tests will come soon.

Example of usage:
```javascript
  import Parallise from 'parallise';

  Parallise(function (resolve, reject) {
    console.log("inside worker promise");
    resolve(23);
    }
  )
  .then(result => {console.log(result); return result * 2})
  .then(result => console.log(result));

  console.log("this will execute before then");
```

# It's worker-less!

Main reason why you should choose this package is because it doesn't use native Worker creation.
So you are not forced to configure you webpack/browserify to split bundle and server worker.js file separately.

It depends on native Promises yet. I will add polyfill support lately.
