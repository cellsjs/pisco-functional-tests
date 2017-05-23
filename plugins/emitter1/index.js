'use strict';

const PLUGIN_EMIT = 'EMIT-plugin1';

module.exports = {
  emit(){
    return {
      pluginEmit: PLUGIN_EMIT,
      pluginEmitAll: PLUGIN_EMIT
    }
  }
};