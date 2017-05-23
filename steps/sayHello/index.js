'use strict';

const message = 'MESSAGE-SAY-HELLO';

module.exports = {
  run() {
    this.logger.info(`${this.params.messageToEmit}`);
    this.logger.info(`out-sayHello-${this.params.message}`);
    this.firstPriority = this.params.firstPriority;
    this.secondPriority = this.params.secondPriority;
    this.priorityOrder = this.params.priorityOrder ? this.params.priorityOrder : {'p1': 'No Params File'};
    this.logger.info(`{"firstPriority":"${this.firstPriority}"}`);
    this.logger.info(`{"secondPriority":"${this.secondPriority}"}`);
    this.logger.info(`{"boolean":${this.params.boolean}}`);
    this.logger.info(`{"boolean2":${this.params.boolean2}}`);
    this.logger.info(`Priority Order: ${JSON.stringify(this.params.priorityOrder)}`);
    this.logger.info(`plugin-emitter-${this.params.pluginEmit}`);
  },
  check(){},
  config(){},
  prove(){},
  notify(){},
  emit() {
    return {message: message};
  }
};
