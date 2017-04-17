'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('::sayHello validation', function() {
  this.timeout(5000);
  it('Should \'::sayHello\' works', (done) => {
    exec('node ../.. ::sayHello', {
      cwd: 'test/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('HELLA TO YOU ALL');
      done();
    });
  });
  it('Should \'::sayHello\' say not the root of a world', (done) => {
    exec('node . world::sayHello', {
      cwd: '.'
    }, (error, stdout, stderr) => {
      expect(error).not.equal(null);
      expect(stderr).to.contain('This is not the root of a world');
      expect(stdout).not.contain('HELLA TO YOU ALL');
      done();
    });
  });
});
