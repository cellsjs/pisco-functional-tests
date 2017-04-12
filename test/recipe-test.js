"use strict";

/* global define, it, describe, before */
const assert = require('chai').assert;
const exec = require('child_process').exec;
const expect = require("chai").expect;

describe('Testing the recipe functionality', function() {
    this.timeout(5000);
    const REPORT_SPAIN = "Weather report: Madrid, Spain";
    it('Should \'recipe::weather\' works', (done) => {
        exec('node .. recipe::weather', {
            cwd: 'test'
        }, (error, stdout, stderr) => {
            assert.equal(stderr, '', stderr);
            assert.equal(error, null, error);
            expect(stdout).contains(REPORT_SPAIN);
            done();
        });
    });
});
