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
  const PISCO = process.env.piscoExec;
  const stepEmitHello = 'world:hello';
  const STEP_GET_PARAMS = 'world::getParams';
  const commandEmitHello = PISCO.concat(' ', stepEmitHello, ' ');
  const COMMAND_GET_PARAMS = PISCO.concat(' ', STEP_GET_PARAMS, ' ');
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

  const COCHE_MODELO = 'coche.modelo';
  const FORD = 'FORD';

  function commandEmitHelloWithParamsFile() {
    return commandEmitHello.concat(' --', paramsFileName, ' ', __dirname, '/', paramsFile);
  }

  function getCommandEmitHelloWithParamFromCommandLine() {
    return commandEmitHelloWithParamsFile().concat(' --', firstPriority, ' ', commandLine);
  }

  const concatValuesForCommandLine = (mapValues) => {
    return mapValues.reduce((prevVal, element) => {
      return prevVal.concat('--', element.key, ' ', element.value, ' ');
    }, ' ');
  }

  const getCommand = (command, mapValues) => {
    return mapValues ? command.concat(concatValuesForCommandLine(mapValues)).trim() : command;
  }

  const getParamsCommand = (mapValues) => {
    return getCommand(COMMAND_GET_PARAMS, mapValues);
  }
  it('Should recognize command line parameters option', (done) => {
    //Arrange
    expect(getCommand(commandEmitHello, [
      {key: paramsFileName, value: __dirname + '/' + paramsFile},
      {key: firstPriority, value: commandLine} ]))
      .to.equals(getCommandEmitHelloWithParamFromCommandLine());
    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${commandLine}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${externalFile}"}`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should recognize external file parameter option', (done) => {
    //Arrange
    expect(getCommand(commandEmitHello, [ {key: paramsFileName, value: __dirname + '/' + paramsFile} ]))
      .to.equals(commandEmitHelloWithParamsFile());
    //Act
    exec(commandEmitHelloWithParamsFile(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${secondPriority}":"${externalFile}"}`);
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
      expect(stdout).to.contain(`{"${firstPriority}":"${commandLine}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${externalFile}"}`);
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
    exec(getParamsCommand(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('boolean: true');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should recognize boolean configuration with the right priority order', (done) => {
    //Arrange
    //Act
    exec(getParamsCommand(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('boolean2: false');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should set nested objects from command line', (done) => {
    exec(getParamsCommand([ {key: COCHE_MODELO, value: FORD} ]), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`coche: { modelo: '${FORD}'`);
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should merge objects if include one from command line', (done) => {
    exec(getParamsCommand([ {key: 'priorityOrder.newPriority', value: 'commandLine'} ]), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('newPriority: \'commandLine\'');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should merge objects from command line, paramsFile and pisco config', (done) => {
    exec(getParamsCommand(
      [ {key: 'priorityOrder.newPriority', value: 'commandLine'},
        {key: 'priorityOrder.firstPriority', value: 'commandLine'},
        {key: paramsFileName, value: __dirname + '/' + paramsFile} ]), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('newPriority: \'commandLine\'');
      expect(stdout).to.contain('firstPriority: \'commandLine\'');
      expect(stdout).to.contain('thirdPriority: \'.piscosour/piscosourJsonWorkingDir\'');
      expect(stdout).to.contain('ninethPriority');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should generate a object from command line with several definitions', (done) => {
    exec(getParamsCommand(
      [ {key: 'casa.ventanas', value: '4'},
        {key: 'casa.puertasCount', value: '6'},
        {key: 'casa.habitaciones.puertasCount', value: '1'},
        {key: paramsFileName, value: __dirname + '/' + paramsFile} ]), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('casa:');
      expect(stdout).to.contain('ventanas: \'4\'');
      expect(stdout).to.contain('puertasCount: \'6\'');
      expect(stdout).to.contain('puertasCount: \'1\'');
      expectOkExecution(error, stdout, stderr, done);
    });
  });
  it('Should generate a object from command line with bollean values', (done) => {
    exec(getParamsCommand(
      [ {key: 'casa.ventanas', value: '4'},
        {key: 'casa.puertasCount', value: '6'},
        {key: 'casa.habitaciones.puertasCount', value: '1'},
        {key: 'b-casa.habitaciones.habitable', value: false},
        {key: 'b-casa.habitaciones.buscable', value: true},
        {key: paramsFileName, value: __dirname + '/' + paramsFile} ]), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain('casa:');
      expect(stdout).to.contain('ventanas: \'4\'');
      expect(stdout).to.contain('puertasCount: \'6\'');
      expect(stdout).to.contain('puertasCount: \'1\'');
      expect(stdout).to.contain('habitable: false');
      expect(stdout).to.contain('buscable: true');
      expectOkExecution(error, stdout, stderr, done);
    });
  });


});