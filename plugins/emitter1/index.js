'use strict';

const PLUGIN_EMIT = 'EMIT-plugin1';

module.exports = {
  emit(){
    this.logger.info('emitter1 ->', PLUGIN_EMIT);
    return {
      pluginEmit: PLUGIN_EMIT,
      pluginEmitAll: PLUGIN_EMIT
    }
  }
};