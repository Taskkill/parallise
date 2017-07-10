'use strict';

module.exports.onmessage = function (message) {
  const fun = buildFun(message.data.fun);
  const __this = message.data.__this;
  fun.call(__this, result => this.postMessage({result, success: true}), error => this.postMessage({error, success: false}));
}

module.exports.buildFun = function buildFun(fnStr) {
  let fn;
  eval('fn = ' + fnStr);
  return fn;
}
