'use strict';

function run(ok, ko) {
  this.sh('echo ASKING HELLLO', ko, true);
  this.logger.info(`Param1: ${this.params.paramInquire}`);
}

function check() {
  this.logger.info('#blue', 'Check if all you need to execute this step exists');
}

function config() {
  this.logger.info('#yellow', 'Config the step to run');
}

function prove() {
  this.logger.info('#green', 'Check if the step has run ok');
}

function notify() {
  this.logger.info('#grey', 'Notify the end of the shot to someone or something');
}

function emit() {
  this.logger.info('#white', 'Emit the result of the step to other steps. Allow communication between steps');
  return {message: 'emit a message'};
}

module.exports = {
  run: run,
  check: check,
  config: config,
  prove: prove,
  notify: notify,
  emit: emit
};
