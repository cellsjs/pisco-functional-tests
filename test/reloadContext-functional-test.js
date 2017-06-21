'use strict';

const fs = require('fs');
const child_process = require('child_process');
const expect = require('chai').expect;
const rimraf = require('rimraf');
const pctp = require('pisco-callback-to-promise');

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
    pctp.c2p(fs.mkdir, `${__dirname}/tmp`)
      .then(() => pctp.c2p(fs.open, `${__dirname}/tmp/world.txt`, 'w'))
      .then(() => Promise.resolve())
      .catch((err) => {
        pctp.logError(err, done);
        return Promise.resolve(error.error ? error.error : error);
      })
      .then(done);
  });
  it('Sould have a tmp directory', (done) => {
    pctp.c2p(child_process.exec, `pwd`, {cwd: __dirname + '/tmp'})
      .then((stdout) => expect(stdout).contain('tmp'))
      .then(() => Promise.resolve())
      .catch((err) => {
        pctp.logError(err, done);
        return Promise.resolve(error.error ? error.error : error);
      })
      .then(done);
  });
  it('Should execute the flow reaload and reload the context', (done) => {
    pctp.c2p(child_process.exec, RELOAD_FLOW_COMMAND, EXECUTION_DIR)
      .then(checkReloadExecution)
      .catch((err) => {
        pctp.logError(err, done);
        return Promise.resolve(error.error ? error.error : error);
      })
      .then(done);
  });
  afterEach('Should delete the tmp directory', (done) => {
    pctp.c2p(rimraf, `${__dirname}/tmp`)
      .catch((err) => {
        pctp.logError(err, done);
        return Promise.resolve(error.error ? error.error : error);
      })
      .then(done);
  });
})
;