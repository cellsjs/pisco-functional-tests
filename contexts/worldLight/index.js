"use strict";

const utilsNode = require('../../utils/index');

const _isWorldLightFolder = function() {
  return utilsNode.exists('world.txt');
};

module.exports = {

    check() {
        return _isWorldLightFolder(); // add a condition to check 'world'
    }

};
