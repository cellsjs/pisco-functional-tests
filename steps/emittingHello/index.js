'use strict';

const helloWorld = 'HELLO WORLD';
const message = 'MESSAGE-EMIT';

const statusAccess =  () => {
  var status = 0;
  return {
    getStatus: () => {
      return status;
    },
    increment: () => {
      ++status;
    }
  };
}

const status = statusAccess();

function run(ok, ko) {
  status.increment();
  this.sh('echo HELLA TO YOU ALL', ko, true);
  this.logger.info(`Run stage order: ${status.getStatus()}`);
  this.toEmit = helloWorld;
  this.saySomething();
}

function check() {
  status.increment();
  this.logger.info(`Check stage order: ${status.getStatus()}`);
  this.logger.info('#blue', 'Emit-Check Check if all you need to execute this step exists');
}

function config() {
  status.increment();
  this.logger.info(`Config stage order: ${status.getStatus()}`);
  this.logger.info('#yellow', 'Emit-Config Config the step to run');
}

function prove() {
  status.increment();
  this.logger.info(`Prove stage order: ${status.getStatus()}`);
  this.logger.info('#green', 'Emit -Prove Check if the step has run ok');
}

function notify() {
  status.increment();
  this.logger.info(`Notify stage order: ${status.getStatus()}`);
  this.logger.info('#grey', 'Emit-Notify Notify the end of the shot to someone or something');
}

function emit() {
  status.increment();
  this.logger.info(`Emit stage order: ${status.getStatus()}`);
  this.logger.info('#white', 'Emit-Emit Emit the result of the step to other steps. Allow communication between steps');
  return {message: message, emitted: this.toEmit};
}


module.exports = {
  run: run,
  check: check,
  config: config,
  prove: prove,
  notify: notify,
  emit: emit
};
