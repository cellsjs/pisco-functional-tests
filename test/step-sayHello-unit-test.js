'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;
const stepSayHello = require('../steps/sayHello/index');

describe('Testing sayHello Step', function() {
  // The pisco context is not up so we can not run unit test over an step
  it.skip('Should say HELLO WORLD in the console', () => {
    //Act
    var sayHello = stepSayHello.run();

    //Assert
    expect(sayHello).contain('HELLA TO YOU ALL');
  });
});
