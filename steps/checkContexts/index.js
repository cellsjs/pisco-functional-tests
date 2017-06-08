'use strict';

const process = require('process');

function check() {
  this.logger.info(`My context --> ${this._context}. Cwd --> ${process.cwd()}`);
  this.logger.info('#blue', 'Check if all you need to execute this step exists');
}

module.exports = {
  check: check
};
