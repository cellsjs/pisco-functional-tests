'use strict';

/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('Pisco context world validation', function() {
  it('Should return the context world', (done) => {
    exec('node ../.. -c', {
      cwd: 'test/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('world');
      done();
    });
  });
  it('Should not return the context world', (done) => {
    exec('node ../.. -c', {
      cwd: 'test/notworld'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).not.contain('world');
      done();
    });
  });
});
