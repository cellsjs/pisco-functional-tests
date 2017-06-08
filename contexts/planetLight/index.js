"use strict";

const utilsNode = require('../../utils/index');

const _isPlanetLightFolder = function() {
  return utilsNode.exists('planet.txt');
};

module.exports = {

  check() {
    return _isPlanetLightFolder(); // add a condition to check 'world'
  }

};
