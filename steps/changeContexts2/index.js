'use strict';

const pctp = require('pisco-callback-to-promise');const fs = require('fs');
const process = require('process');

let newPlanetDirectory;

function run(ok, ko) {
  this.logger.info(`Changing the file ${process.cwd()}/planet.txt to ${process.cwd()}/world.txt`);
  return pctp.c2p(fs.rename, `${process.cwd()}/planet.txt`, `${process.cwd()}/world.txt`)
    .then(ok, ko);
}



function prove(ok, ko) {
  this.logger.info('#green', `Check if the step has run ok (changed the name of the file) ${process.cwd()}/world.txt`);
  return pctp.c2p(fs.access, `${process.cwd()}/world.txt`).then(ok, ko);
}

module.exports = {
  run: run,
  prove: prove
};
