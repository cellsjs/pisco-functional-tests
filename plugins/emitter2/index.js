'use strict';

const PLUGIN_EMIT = 'EMIT-plugin2';

module.exports = {
  emit(){
    return {
      pluginEmit: PLUGIN_EMIT
    }
  }
};