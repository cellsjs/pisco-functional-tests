'use strict';

const PLUGIN_EMIT = 'EMIT-plugin2';

module.exports = {
  emit(){
    this.logger.info('emitter2 ->', PLUGIN_EMIT);
    return {
      pluginEmit: PLUGIN_EMIT
    }
  }
};