"use strict";

const fs = require('fs');

const _isWonderfullWorldFile = function() {

  //TODO: change when testing framework exists
  const exists = (filename) => {
    try {
      return fs.statSync(filename);
    } catch (e) {
      if (e.syscall === 'stat') {
        return false;
      } else {
        throw e;
      }
    }
  };

  return exists('wonderfull.txt');
};

module.exports = {

  check() {
    return _isWonderfullWorldFile();
  }

};
