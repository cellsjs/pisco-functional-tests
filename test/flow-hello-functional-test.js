'use strict';

/* global define, it, describe, before */
const path = require('path');
const expect = require('chai').expect;
const exec = require('child_process').exec;
const u = require('../utils');

/* constants */
const helloWorld = 'HELLO WORLD';

function expectWithError(stderr, stdout, done) {
  expect(stderr).to.equal('');
  done();
}

function expectOkExecution(error, stdout, stderr, done) {
  expect(error).to.equal(null);
  expectWithError(stderr, stdout, done);
}

function expectKOExecution(error, done) {
  expect(error).not.equal(null);
  done();
}

describe('Run the hello flow in different contexts', function() {
  it(`Should return ${helloWorld} in the console`, (done) => {
    u.c2p(exec, `${process.env.piscoExec} world:hello`, {cwd: path.join(__dirname, 'world')})
      .then((stdout) => {
        expect(stdout).contain(helloWorld);
        done();
      }).catch((error) => u.logError(error, done));
  });
  it(`Should return ${helloWorld} in the console not especifying the context, only the flow`, function(done) {
    u.c2p(exec, `${process.env.piscoExec} hello`, {cwd: path.join(__dirname, 'world')})
      .then((stdout) => {
        expect(stdout).contain(helloWorld);
        done();
      }).catch((error) => {
        expectKOExecution(error, done);
      });
  });
  it(`Should not return ${helloWorld} in the console because is not the right context`, function(done) {
    u.c2p(exec, `${process.env.piscoExec} world:hello`, {cwd: path.join(__dirname, 'notworld')})
      .then((stdout) => {
        expect(stdout).not.contain(helloWorld);
        expect(stderr).contain('This is not the root of a world');
        done();
      }).catch((error) => {
        expectKOExecution(error, done);
      });
  });
});

const message1 = 'MESSAGE-EMIT';
const message2 = 'MESSAGE-SAY-HELLO';

describe('Run the hello flow emitting for all steps', function() {
  it(`Should return out-sayHello-${message1} emitted from emittingHello step`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello-${message1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return out-sayHello2-${message2} emitted from sayHello step`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello2-${message2}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should not fail and return noemit-true not emmited from a noemit step but configured`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain('noemit-true');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return GoodBye2 in subflow step from step emittingHello`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain('GoodBye2');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return GOODBYE! from subflow step sayGoodbye in subflow step getGoodbye`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain('GOODBYE!');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});

const PLUGIN_EMIT_1 = 'EMIT-plugin1';

describe('Run the hello flow with emitting plugins', function() {
  it(`Should not return plugin-emitter-${PLUGIN_EMIT_1} emitted from emitter1 plugin`, function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).not.contain(`plugin-emitter-${PLUGIN_EMIT_1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});

describe('Run the hello flow multi-contexts emitting params', function() {
  it(`Should return out-sayHello-${message1} emitted from emittingHello step`, function(done) {
    exec(process.env.piscoExec + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello-${message1}`);
      expectKOExecution(error, done);
    });
  });
  it(`Should not return out-sayHelloWonderfull-${message2} emitted from emittingHello step in context world`, function(done) {
    exec(process.env.piscoExec + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).not.contain(`out-sayHelloWonderfull-${message2}`);
      expectKOExecution(error, done);
    });
  });
});
