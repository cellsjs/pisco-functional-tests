'use strict';

const fs = require('fs');

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
  },
  //TODO: change when testing framework exists
  exists(filename) {
    try {
      return fs.statSync(filename);
    } catch (e) {
      if (e.syscall === 'stat') {
        return false;
      } else {
        throw e;
      }
    }
  }
}