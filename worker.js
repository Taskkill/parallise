exports.onmessage = function (message) {
  const fun = buildFun(message.data.fun);
  new Promise(fun).then(result => this.postMessage({result, success: true}), error => this.postMessage({error, success: false}));
}

exports.buildFun = function buildFun(funString) {
  // TODO: tune up regexp
 var regexParams = new RegExp("\\({1}\\ *(.*\\ *,?){0,}\\){1}");
   var headF = funString.match(regexParams)[0];
   var paramsF = headF.substring(1, headF.length - 1);
   var parmsF = paramsF.split(",");
   var bodyF = funString.substring(funString.indexOf('{') + 1, funString.length - 2);
   return new Function(parmsF, bodyF);
}
