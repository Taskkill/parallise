module.exports.onmessage = function (message) {
  const fun = buildFun(message.data.fun);
  const __this = message.data.__this;
  fun.call(__this, result => this.postMessage({result, success: true}), error => this.postMessage({error, success: false}));
}

module.exports.buildFun = function buildFun(funString) {
 const regexParams = new RegExp('function\\s{0,}(\\w{1,})?\\s{0,}(\\((\\s{0,}\\w{0,}\\s{0,},?){0,}\\s{0,}\\))', 'm', 'g' );
 const headF = funString.match(regexParams)[2];
 const paramsF = headF.substring(1, headF.length - 1);
 const parmsF = paramsF.split(",");
 const bodyF = funString.substring(funString.indexOf('{') + 1, funString.lastIndexOf('}'));
 return new Function(parmsF, bodyF);
}
