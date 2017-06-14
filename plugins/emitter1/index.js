'use strict';

const PLUGIN_EMIT = 'EMIT-plugin1';

module.exports = {
  run() {
    this.logger.info('run plugin');
  },
  emit(){
    this.logger.info('emitter1 ->', PLUGIN_EMIT);
    return {
      pluginEmit: PLUGIN_EMIT,
      pluginEmitAll: PLUGIN_EMIT
    }
  },
  addons : {
    saySomething(){
      this.logger.info('plugin say something');
    }
  }
};