'use strict';

const fs = require('fs');
const utils = require('../utils/index');
const child_process = require('child_process');
const expect = require('chai').expect;
const rimraf = require('rimraf');

/* global define, it, describe, before, beforeEach, afterEach, after */

const checkReloadExecution = (stdout) => {
  expect(stdout).contain('worldLight::checkContexts');
  expect(stdout).contain('worldLight::changeContexts');
  expect(stdout).contain('planet::checkContexts2');
  expect(stdout).contain('planetLight::checkContexts2');
  expect(stdout).contain('planet::changeContexts2');
};

describe('Testing reloadContext functionality', () => {
  const RELOAD_FLOW_COMMAND = process.env.piscoExec + ' :reload';
  const EXECUTION_DIR = {cwd: __dirname + '/tmp'};
  beforeEach('Should create tmp', (done) => {
    utils.nodeInvoke(fs, 'mkdir', `${__dirname}/tmp`)
      .then(() => utils.nodeInvoke(fs, 'open', `${__dirname}/tmp/world.txt`, 'w'))
      .then(() => done())
      .catch(done);
  });
  it('Sould have a tmp directory', (done) => {
    utils.nodeInvoke(child_process, 'exec', `pwd`, {cwd: __dirname + '/tmp'})
      .then((stdout) => expect(stdout).contain('tmp'))
      .then(() => done())
      .catch(done);
  });
  it('Should execute the flow reaload and reload the context', (done) => {
    utils.nodeInvoke(child_process, 'exec', RELOAD_FLOW_COMMAND, EXECUTION_DIR)
      .then(checkReloadExecution)
      .then(done)
      .catch(done);
  });
  afterEach('Should delete the tmp directory', (done) => {
    utils.nodeFCall(rimraf, `${__dirname}/tmp`)
      .then(done, done);
  });
})
;