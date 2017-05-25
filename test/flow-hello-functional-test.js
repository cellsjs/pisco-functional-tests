'use strict';

/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

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
  it(`Should return ${helloWorld} in the console`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(helloWorld);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return ${helloWorld} in the console not especifying the context, only the flow`, function(done) {
    exec('node ' + process.env.PISCO + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(helloWorld);
      expectWithError(stderr, stdout, done);
    });
  });
  it(`Should not return ${helloWorld} in the console because is not the right context`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/notworld'
    }, (error, stdout, stderr) => {
      expect(stdout).not.contain(helloWorld);
      expect(stderr).contain('This is not the root of a world');
      expectKOExecution(error, done);
    });
  });
});

const message1 = 'MESSAGE-EMIT';
const message2 = 'MESSAGE-SAY-HELLO';

describe('Run the hello flow emitting for all steps', function() {
  it(`Should return out-sayHello-${message1} emitted from emittingHello step`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello-${message1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return out-sayHello2-${message2} emitted from sayHello step`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello2-${message2}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should not fail and return noemit-true not emmited from a noemit step but configured`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain('noemit-true');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});

const PLUGIN_EMIT_1 = 'EMIT-plugin1';
const PLUGIN_EMIT_2 = 'EMIT-plugin2';

describe('Run the hello flow with emitting plugins', function() {
  it(`Should return plugin-emitter-${PLUGIN_EMIT_1} emitted from emitter1 plugin`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`plugin-emitter-${PLUGIN_EMIT_1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return plugin-emitter-2-${PLUGIN_EMIT_2} emitted from emitter2 plugin`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`plugin-emitter-2-${PLUGIN_EMIT_2}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return plugin-emitter-2-All-${PLUGIN_EMIT_1} emitted from emitter1 plugin to all`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`plugin-emitter-2-All-${PLUGIN_EMIT_1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});

describe('Run the hello flow multi-contexts emitting params', function() {
  it(`Should return out-sayHello-${message1} emitted from emittingHello step`, function(done) {
    exec('node ' + process.env.PISCO + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello-${message1}`);
      expectKOExecution(error, done);
    });
  });
  it(`Should not return out-sayHelloWonderfull-${message2} emitted from emittingHello step in context world`, function(done) {
    exec('node ' + process.env.PISCO + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).not.contain(`out-sayHelloWonderfull-${message2}`);
      expectKOExecution(error, done);
    });
  });
});
