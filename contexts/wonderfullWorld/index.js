"use strict";

const utilsNode = require('../../utils/index');

const _isWonderfullWorldFile = function() {
  return utilsNode.exists('wonderfull.txt');
};

module.exports = {

  check() {
    return _isWonderfullWorldFile();
  }

};
