'use strict';

const buildFun = function buildFun(fnStr) {
  let fn;
  eval('fn = ' + fnStr);
  return fn;
}

const onmessage = function (message) {
  const fun = buildFun(message.data.fun);
  const __this = message.data.__this;
  fun.call(__this, result => this.postMessage({result, success: true}), error => this.postMessage({error, success: false}));
}

const source = `
  'use strict';
  ${buildFun.toString()}
  this.onmessage = ${onmessage.toString()}
`;

const getWorkerURL = (script) => window.URL.createObjectURL(createTextFile(script));

const createTextFile = (content) => new Blob([content], {
  type: 'text/plain'
});

window.Parallise = (fun, __this) => {
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
