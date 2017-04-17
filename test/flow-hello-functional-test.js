'use strict';

/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

function expectWithError(stderr, stdout, done) {
  expect(stderr).to.equal('');
  expect(stdout).contain('HELLO WORLD');
  done();
}

function expectOkExecution(error, stdout, stderr, done) {
  expect(error).to.equal(null);
  expectWithError(stderr, stdout, done);
}

function expectKOExecution(stdout, stderr, done) {
  expect(stderr).contain('This is not the root of a world');
  expect(stdout).not.contain('HELLO WORLD');
  done();
}

describe('Run the hello flow in different contexts', function() {
  it('Should return HELLO WORLD in the console', function(done) {
    exec('node ../.. world:hello', {
      cwd: 'test/world'
    }, (error, stdout, stderr) => {
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should return HELLO WORLD in the console not especifying the context, only the flow', function(done) {
    exec('node ../.. hello', {
      cwd: 'test/world'
    }, (error, stdout, stderr) => {
      expectWithError(stderr, stdout, done);
    });
  });
  it('Should not return HELLO WORLD in the console because is not the right context', function(done) {
    exec('node ../.. world:hello', {
      cwd: 'test/notworld'
    }, (error, stdout, stderr) => {
      expectKOExecution(stdout, stderr, done);
    });
  });
});


