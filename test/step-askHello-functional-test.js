'use strict';

const expect = require('chai').expect;
const exec = require('child_process').exec;
/* global define, it, describe, before */

function expectWithError(stderr, done) {
  expect(stderr).to.equal('');
  done();
}

function expectOkExecution(error, stderr, done) {
  expect(error).to.equal(null);
  expectWithError(stderr, done);
}


describe('Testing the inquirer capability', function() {
  const stepAskHello = '::askHello';
  const inquirerInput = 'inquirerInput';
  const commandAskHello = `echo ${inquirerInput}  | node ${process.env.PISCO}  ${stepAskHello} `;
  const contextWorldDir = __dirname + '/world';
  const paramsFile = 'params-test.json';
  const firstPriority = 'firstPriority';
  const secondPriority = 'secondPriority';
  const thirdPriority = 'thirdPriority';
  const fourthPriority = 'fourthPriority';
  const fifthPriority = 'fifthPriority';
  const sixthPriority = 'sixthPriority';
  const seventhPriority = 'seventhPriority';
  const eightPriority = 'eightPriority';
  const ninethPriority = 'ninethPriority';
  const externalFile = 'externalFile';
  const commandLine = 'commandLine';
  const wdPiscoJson = '.piscosour/piscosourJsonWorkingDir';
  const paramsFileName = 'paramsFile';
  const piscosourJsonMetaRecipe = 'piscosourJsonMetaRecipe';
  const piscoFunctionalTestJsonRecipe = 'piscoFunctionalTestJsonRecipe';
  const flowConfigSpecificStepAndContext = 'flowConfigSpecificStepAndContext';
  const flowConfigSpecificStep = 'flowConfigSpecificStep';
  const flowConfig = 'flowConfig';
  const stepConfig = 'stepConfig';


  it('Should get the inquire parameter', function(done) {
    //Arrange
    var callbackExecWithInquire = (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`Param1: ${inquirerInput}`);
      expectOkExecution(error, stderr, done);
    };

    //Act
    exec(commandAskHello, { cwd: contextWorldDir }, callbackExecWithInquire);
  });
});