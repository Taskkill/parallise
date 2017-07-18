'use strict';

const buildFun = require('./worker').buildFun;
const onmessage = require('./worker').onmessage;

const source = `
  'use strict';
  let iter;

  ${buildFun.toString()}
  this.onmessage = ${onmessage.toString()}
`;

const getWorkerURL = (script) => window.URL.createObjectURL(createTextFile(script));

const createTextFile = (content) => new Blob([content], {
  type: 'text/plain'
});

module.exports = function Parallise (fun, __this) {
  const worker = new Worker(getWorkerURL(source));

  let __resolve;
  let __reject;

  worker.onmessage = message => {
    if (message.data.success) {
      __resolve(message.data.result);
    } else {
      __reject(message.data.error);
    }
  }

  worker.postMessage({
    fun: fun.toString(),
    __this: __this,
  });

  return new Promise((resolve, reject) => {
    __resolve = resolve;
    __reject = reject;
  });
}
