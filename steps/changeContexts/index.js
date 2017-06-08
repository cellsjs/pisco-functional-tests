'use strict';

const nodeUtils = require('../../utils/index');
const fs = require('fs');
const process = require('process');

let newPlanetDirectory;

function run(ok, ko) {
  this.logger.info(`Changing the file ${process.cwd()}/world.txt to ${process.cwd()}/planet.txt`);
  return nodeUtils.nodeInvoke(fs, 'rename', `${process.cwd()}/world.txt`, `${process.cwd()}/planet.txt`)
    .then(ok, ko);
}



function prove(ok, ko) {
  this.logger.info('#green', `Check if the step has run ok (changed the name of the file) ${process.cwd()}/planet.txt`);
  return nodeUtils.nodeInvoke(fs, 'access', `${process.cwd()}/planet.txt`).then(ok, ko);
}

module.exports = {
  run: run,
  prove: prove
};
