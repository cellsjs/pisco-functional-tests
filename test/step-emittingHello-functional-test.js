'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('::emittingHello validation', function() {
  it('Should \'::emittingHello\' works', (done) => {
    exec(process.env.piscoExec + ' ::emittingHello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('HELLA TO YOU ALL');
      done();
    });
  });
  it('Should \'::emittingHello\' say not the root of a world', (done) => {
    exec(process.env.piscoExec + ' world::emittingHello', {
      cwd: __dirname
    }, (error, stdout, stderr) => {
      expect(error).not.equal(null);
      expect(stderr).to.contain('This is not the root of a world');
      expect(stdout).not.contain('HELLA TO YOU ALL');
      done();
    });
  });
});
