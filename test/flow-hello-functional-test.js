'use strict';

/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

/* constants */
const helloWorld = 'HELLO WORLD';

function expectWithError(stderr, stdout, done) {
  expect(stderr).to.equal('');
  expect(stdout).contain(helloWorld);
  done();
}

function expectOkExecution(error, stdout, stderr, done) {
  expect(error).to.equal(null);
  expectWithError(stderr, stdout, done);
}

function expectKOExecution(stdout, stderr, done) {
  expect(stderr).contain('This is not the root of a world');
  expect(stdout).not.contain(helloWorld);
  done();
}

describe('Run the hello flow in different contexts', function() {
  it('Should return HELLO WORLD in the console', function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should return HELLO WORLD in the console not especifying the context, only the flow', function(done) {
    exec('node ' + process.env.PISCO + ' hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expectWithError(stderr, stdout, done);
    });
  });
  it('Should not return HELLO WORLD in the console because is not the right context', function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/notworld'
    }, (error, stdout, stderr) => {
      expectKOExecution(stdout, stderr, done);
    });
  });
});

const message1 = 'MESSAGE-EMIT';
const message2 = 'MESSAGE-SAY-HELLO';

describe('Run the hello flow emitting for all steps', function() {
  it(`Should return out-sayHello-${message1} in the console`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello-${message1}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it(`Should return out-sayHello2-${message2} in the console`, function(done) {
    exec('node ' + process.env.PISCO + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(stdout).contain(`out-sayHello2-${message2}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});