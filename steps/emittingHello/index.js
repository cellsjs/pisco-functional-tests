'use strict';

const helloWorld = 'HELLO WORLD';

function run(ok, ko) {
  this.sh('echo HELLA TO YOU ALL', ko, true);
  this.toEmit = helloWorld;
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
  return { message: 'emit a message', emitted: this.toEmit };
}

module.exports = {
  run: run,
  check: check,
  config: config,
  prove: prove,
  notify: notify,
  emit: emit
};