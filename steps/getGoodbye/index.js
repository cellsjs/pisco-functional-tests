'use strict';

module.exports = {
  run() {
    this.logger.info('sayGoodbye said:', this.params.messageGood);
    this.logger.info('emittingHello said:', this.params.otherGood);
  }
};
