'use strict';

const path = require('path');
const tester = require('piscosour/lib/tests/stepTester');
const expect = require('chai').expect;
const assert = require('assert');

/* global define, it, describe, before, beforeEach, afterEach, after */

// configure

tester.setLoggerLevel(0);

// constants

const stepName = 'askHello';
const contexts = ['world'];
const message = 'Unit Framework hola!';

describe('Unit testing framework for askHello step', () => {
  it('Should return the step to test', (done) => {
    const step = tester.loadStep({
      name: stepName,
      context: contexts
    });
    expect(step).not.equal(null);
    expect(step.name).to.equal(stepName);
    done();
  });
  it('Should run the step to test', (done) => {
    tester.setLoggerLevel(0);
    tester.runStep({
        name: stepName,
        context: contexts,
        baseDir: path.join(__dirname, 'world'),
        params: {
          paramInquire: message
        }
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
  it('Should run the step with plugins to test', (done) => {
    tester.setLoggerLevel(0);
    tester.runStep({
        name: 'emittingHello',
        context: contexts,
        baseDir: path.join(__dirname, 'world'),
        params: {
          paramInquire: message
        }
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
});

