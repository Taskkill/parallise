'use strict';

const buildFun = require('./worker').buildFun;
const onmessage = require('./worker').onmessage;

const source = `
  'use strict';
  ${buildFun.toString()}
  this.onmessage = ${onmessage.toString()}
`;

const getWorkerURL = (script) => window.URL.createObjectURL(createTextFile(script));

const createTextFile = (content) => new Blob([content], {type: 'text/plain'});

module.exports = (fun) => {
  const worker = new Worker(getWorkerURL(source));

  let __resolve;
  let __reject;

  worker.onmessage = message => {
    if (message.data.success) __resolve(message.data.result);
    else __reject(message.data.error);
  }

  worker.postMessage({fun: fun.toString(),});

  return new Promise((resolve, reject) => {
    __resolve = resolve;
    __reject = reject;
  });
}
