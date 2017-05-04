'use strict';

/* global define, it, describe, before, afterEach */
const expect = require('chai').expect;
const exec = require('child_process').exec;

function expectWithError(stderr, stdout, done) {
  expect(stderr).to.equal('');
  done();
}

function expectOkExecution(error, stdout, stderr, done) {
  expect(error).to.equal(null);
  expectWithError(stderr, stdout, done);
}

describe('Examples using parameters in the steps', () => {
  const stepEmitHello = 'world:hello';
  const commandEmitHello = 'node ' + process.env.PISCO + ' ' + stepEmitHello + ' ';
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

  function commandEmitHelloWithParamsFile() {
    return commandEmitHello + ' --' + paramsFileName +
      ' ' + __dirname + '/' + paramsFile;
  }

  function getCommandEmitHelloWithParamFromCommandLine() {
    return commandEmitHelloWithParamsFile() +
      ' --' + secondPriority +
      ' ' + commandLine;
  }

  it('Should recognize external file parameter option', (done) => {
    //Arrange

    //Act
    exec(commandEmitHelloWithParamsFile(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });

  it('Should recognize command line parameters option', (done) => {
    //Arrange

    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${commandLine}"}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should recognize the rest of the param configuration in the right order', (done) => {
    //Arrange

    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${commandLine}"}`);
      expect(stdout).to.contain(`"${thirdPriority}":"${wdPiscoJson}"`);

      //It only happens if the test is executed from a meta recipe (piscosour)
      //expect(stdout).to.contain(`"${fourthPriority}":"${piscosourJsonMetaRecipe}"`);
      expect(stdout).to.contain(`"${fifthPriority}":"${piscoFunctionalTestJsonRecipe}"`);
      expect(stdout).to.contain(`"${sixthPriority}":"${flowConfigSpecificStepAndContext}"`);
      expect(stdout).to.contain(`"${seventhPriority}":"${flowConfigSpecificStep}"`);
      expect(stdout).to.contain(`"${eightPriority}":"${flowConfig}"`);
      expect(stdout).to.contain(`"${ninethPriority}":"${stepConfig}"`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should recognize boolean configuration with the right priority order', (done) => {
    //Arrange

    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('"boolean":true');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should recognize boolean configuration with the right priority order', (done) => {
    //Arrange

    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('"boolean2":false');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});