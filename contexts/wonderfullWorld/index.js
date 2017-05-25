"use strict";

const path = require('path');
const process = require('process');
const fsUtils = require('piscosour/lib/utils/fsUtils');

const _isWonderfullWorldFile = function() {
  return fsUtils.exists('wonderfull.txt');
};

module.exports = {

  check() {
    return _isWonderfullWorldFile();
  }

};
