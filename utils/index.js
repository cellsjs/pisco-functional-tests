'use strict';

module.exports = {
  nodeFCall(fn) {
    return new Promise((resolve, reject) => {
      var args = [].slice.call(arguments, 1);
      fn.apply({}, args.concat(function(err) {
        var resultArgs = [].slice.call(arguments, 1);
        if (err) {
          reject(err);
        } else {
          resolve(...resultArgs);
        }
      }));
    })
  },
  nodeInvoke(obj, method) {
    var args = [].slice.call(arguments, 2),
      fn = obj[method];
    return this.nodeFCall(fn.bind(obj), ...args);
  }
}