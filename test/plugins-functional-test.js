'use strict';

const expect = require('chai').expect;
const child_process = require('child_process');
const fs = require('fs');
const _ = require('lodash');
const jsonpath = require('jsonpath');
const utils = require('../utils/index');

/* global define, it, describe, before */
describe('Plugin functional tests', () => {
  const COMMAND_CONFIG = 'node ' + process.env.PISCO + ' ::configHello';
  const WORLD_DIR = {cwd: __dirname + '/world'};
  const parseFileToJson = (data) => JSON.parse(data.toString());
  const queryFile = (scullion) => expect(jsonpath.query(scullion, '$..cordova.installer', 1).join("")).to.deep.equal('npm');
  const testStdOut = (stdout, containValue) => () => expect(stdout).contain(containValue);
  const scullionPath = () => {
    var pisco = process.env.PISCO;
    return pisco.split(" ").filter((element, index) => index === 0)
      .join("").split("/").slice(0, -2).join("/").concat('/scullion.json');
  };
  const queryFileFunction = (property, value) => (scullion) => expect(jsonpath.query(scullion, property, 1).join("")).to.deep.equal(value);


  const testExePiscoConfiguration = (stdout, evaluate, queryScullion) => {
    testStdOut(stdout, 'hello world from plugin config')();
    if (evaluate) {
      evaluate();
    }
    const queryFinal = queryScullion ? queryScullion : queryFile;
    return utils.nodeInvoke(fs, 'readFile', scullionPath())
      .then(parseFileToJson)
      .then((scullion) => queryFinal(scullion));
  }

  it('A plugin should fulfill requirements', (done) => {
    utils.nodeInvoke(child_process, 'exec', COMMAND_CONFIG, WORLD_DIR)
      .then(testExePiscoConfiguration)
      .then(() => done())
      .catch(error => done(error));
  });
  it('A plugin should use other plugins', (done) => {
    utils.nodeInvoke(child_process, 'exec', COMMAND_CONFIG, WORLD_DIR)
      .then((stdout) => testExePiscoConfiguration(stdout, testStdOut(stdout, 'emitter1 ->'), null))
      .then(() => done())
      .catch(error => done(error));
  });
  it('A plugin should declare params with the last priority', (done) => {
    utils.nodeInvoke(child_process, 'exec', COMMAND_CONFIG, WORLD_DIR)
      .then((stdout) => testExePiscoConfiguration(stdout, null, queryFileFunction('$..cordova.installer', 'npm')))
      .then(() => done())
      .catch(error => done(error));
  });
});