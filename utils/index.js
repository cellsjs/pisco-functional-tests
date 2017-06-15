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
  },
  logError(err, done){
    console.log('\n---------------\nstdout:\n---------------\n', err.std[0]);
    console.log('\n---------------\nstderr:\n---------------\n', err.std[1]);
    done(err.error)
  }
};