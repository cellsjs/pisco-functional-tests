'use strict';

const emitHello = require('../steps/sayHello/index');
const sayHello = require('../steps/emittingHello/index');
const expect = require('chai').expect;

/* global define, it, describe, before */
describe('Different methods (stages) implemented in the steps of the hello flow', function() {
  it('Should sayHello have all the stages (run, check, configHello, prove, notify, emit)', function() {
    //Assert
    expect(emitHello).to.include.keys('run');
    expect(emitHello).to.include.keys('check');
    expect(emitHello).to.include.keys('config');
    expect(emitHello).to.include.keys('prove');
    expect(emitHello).to.include.keys('notify');
    expect(emitHello).to.include.keys('emit');
  });
  it('Should emittingHello have all the stages (run, check, configHello, prove, notify, emit)', function() {
    //Assert
    expect(sayHello).to.include.keys('run');
    expect(sayHello).to.include.keys('check');
    expect(sayHello).to.include.keys('config');
    expect(sayHello).to.include.keys('prove');
    expect(sayHello).to.include.keys('notify');
    expect(sayHello).to.include.keys('emit');
  });
});