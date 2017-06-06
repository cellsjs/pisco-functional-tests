'use strict';

module.exports = {
  run() {},
  check(){},
  config(){},
  prove(){},
  notify(){},
  emit() {},
  addons: {
    configReturn(){
      return 'hello world from plugin config';
    }
  }
}