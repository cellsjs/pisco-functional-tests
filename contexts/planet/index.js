"use strict";

const utilsNode = require('../../utils/index');

const _isPlanetolder = function() {
  return utilsNode.exists('planet.txt');
};

module.exports = {

  check() {
    return _isPlanetolder(); // add a condition to check 'world'
  }

};
