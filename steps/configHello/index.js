'use strict';



module.exports = {
  run(ok, ko){
    this.sh('echo HELLO WORLD CONFIG', ko, true);
    this.logger.info(`Params for this step --> ${this.params}`);
  },
  check(){},
  config(ok, ko){
    this.sh(`echo ${this.configReturn()}`, ko, true);
  },
  prove(){},
  notify(){},
  emit(){}
};
