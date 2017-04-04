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
            expect(stdout).contain('HELLO WORLD');
            done();
        });
    });
    it('Should \'::sayHello\' say not implemented', (done) => {
        exec('node . ::sayHello', {
            cwd: '.'
        }, (error, stdout, stderr) => {
            expect(error).to.equal(null);
            expect(stderr).to.equal('');
            expect(stdout).contain('Allowed not implemented step');
            done();
        });
    });
});
