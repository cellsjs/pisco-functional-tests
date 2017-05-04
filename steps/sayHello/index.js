'use strict';

function run(ok, ko) {
  this.logger.info(`${this.params.messageToEmit}`);
  this.firstPriority = this.params.firstPriority;
  this.secondPriority = this.params.secondPriority;
  this.priorityOrder = this.params.priorityOrder ? this.params.priorityOrder : {'p1': 'No Params File'};
  this.logger.info(`{"firstPriority":"${this.firstPriority}"}`);
  this.logger.info(`{"secondPriority":"${this.secondPriority}"}`);
  this.logger.info(`{"boolean":${this.params.boolean}}`);
  this.logger.info(`{"boolean2":${this.params.boolean2}}`);
  this.logger.info(`Priority Order: ${JSON.stringify(this.params.priorityOrder)}`);
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
