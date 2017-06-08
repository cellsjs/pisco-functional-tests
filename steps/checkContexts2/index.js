'use strict';


function check() {
  this.logger.info(`My context --> ${this._context}`);
  this.logger.info('#blue', 'Check if all you need to execute this step exists');
}

module.exports = {
  check: check
};
