'use strict';

module.exports = {
  run() {
    this.logger.info(`emit-to-all-${this.params.messageToEmit}`);
    this.logger.info(`out-sayHello2-${this.params.message}`);
  }
};
