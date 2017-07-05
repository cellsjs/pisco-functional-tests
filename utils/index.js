'use strict';

const fs = require('fs');
const pctp = require('pisco-callback-to-promise');

module.exports = {
  c2p: pctp.c2p,
  logError: (error, done) => {
    pctp.logError(error);
    done(error.error ? error.error : error);
  },
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
};