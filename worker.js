module.exports.onmessage = function (message) {
  const fun = buildFun(message.data.fun);
  const __this = message.data.__this;
  fun.call(__this, result => this.postMessage({result, success: true}), error => this.postMessage({error, success: false}));
}

module.exports.buildFun = function buildFun(funString) {
  // TODO: tune up regexp
 const regexParams = new RegExp("\\({1}\\ *(.*\\ *,?){0,}\\){1}");
 const headF = funString.match(regexParams)[0];
 const paramsF = headF.substring(1, headF.length - 1);
 const parmsF = paramsF.split(",");
 const bodyF = funString.substring(funString.indexOf('{') + 1, funString.length - 2);
 return new Function(parmsF, bodyF);
}
