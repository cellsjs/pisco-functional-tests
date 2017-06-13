'use strict';

const fs = require('fs');

module.exports = {
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