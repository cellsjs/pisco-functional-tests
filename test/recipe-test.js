'use strict';

/* global define, it, describe, before */
const assert = require('chai').assert;
const exec = require('child_process').exec;
const expect = require('chai').expect;

describe('Testing the recipe functionality', function() {
  this.timeout(5000);
  const WEATHER_REPORT = 'Weather report:';
  it('Should \'recipe::weather\' works', (done) => {
    exec('node ' + process.env.PISCO + ' recipe::weather', {
      cwd: 'test'
    }, (error, stdout, stderr) => {
      assert.equal(stderr, '', stderr);
      assert.equal(error, null, error);
      expect(stdout).contains(WEATHER_REPORT);
      done();
    });
  });
});
