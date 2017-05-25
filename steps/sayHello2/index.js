'use strict';

module.exports = {
  run() {
    this.logger.info(`emit-to-all-${this.params.messageToEmit}`);
    this.logger.info(`out-sayHello2-${this.params.message}`);
    this.logger.info(`plugin-emitter-2-${this.params.pluginEmit}`);
    this.logger.info(`plugin-emitter-2-All-${this.params.pluginEmitAll}`);
    this.logger.info(`noemit-${this.params.noemitParam === undefined}`);
  }
};
