# Pisco Functional Tests

In this project is defined the functional behaviour of [piscosour][1]. These are the principal, behaviours tested:
1. [Expected context behaviour][2]
1. [Expected step behaviour][3]
1. [Expected stage behaviour. In the correct order as well][4]
1. [Expected plugin behaviour][5]
1. [Inquirer][6]
1. [Expected pririty order in the params][7]
1. [Expected behaviour in the pass of paramaters][8]

Paso de parámetros entre steps


## <a name="context-behaviour"></a>Context  Behaviour
We are going to test if the context world is correct throw pisco. In order to do so, we execute the pisco executable (we use a environmment variable [PISCO] for that) with -c option. If we are in a folder called "world" we will get the word "world" in the console and we will not get that word in other case. The test for this feature:
```javascript
'use strict';

/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('Pisco context world validation', function() {
  it('Should return the context world', (done) => {
    exec(process.env.piscoExec + ' -c', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('world');
      done();
    });
  });
  it('Should not return the context world', (done) => {
    exec(process.env.piscoExec + ' -c', {
      cwd: __dirname + '/notworld'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).not.contain('world');
      done();
    });
  });
});
```
In order to accomplish this test, we generate the follow code for this context:
```javascript
"use strict";

const path = require('path');
const process = require('process');

const _isWorldFolder = function() {
    const dir = process.cwd().split(path.sep);
    return dir[dir.length - 1] === 'world';
};

module.exports = {

    check() {
        return _isWorldFolder(); // add a condition to check 'world'
    }

};
```

## <a name="step-behaviour"></a>Step  Behaviour
We are going to test the emittingHello step. The config of this step is the following:
```javascript
{
  "name": "emittingHello",
  "description": "Emitting Hello World",
  "contexts": [
    "world"
  ]
}
```
So we have to be in a world context in order to execute the step. If we are in such context, the step writes in the console "HELLA TO YOU ALL":
```javascript
function run(ok, ko) {
  this.sh('echo HELLA TO YOU ALL', ko, true);
  this.toEmit = helloWorld;
}
```
```javascript
'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('::emittingHello validation', function() {
  this.timeout(5000);
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
```

## <a name="stage-behaviour"></a>Stage  Behaviour
In this case we have tested the order of execution off all the stages in a determined step. 

The functional test:
```javascript
'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('Stages order validation', function() {
  const stage = {
    check: {
      name: 'Check',
      order: 1
    },
    config: {
      name: 'Config',
      order: 2
    },
    run: {
      name:  'Run',
      order: 3
    },
    prove: {
      name: 'Prove',
      order: 4
    },
    notify:{
      name: 'Notify',
      order: 5
    },
    emit: {
      name: 'Emit',
      order: 6
    }
  };
  it('Should \'::emittingHello\' works execute the stages in the correct order', (done) => {
    exec(process.env.piscoExec + ' ::emittingHello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain(`${stage.check.name} stage order: ${stage.check.order}`);
      expect(stdout).contain(`${stage.config.name} stage order: ${stage.config.order}`);
      expect(stdout).contain(`${stage.run.name} stage order: ${stage.run.order}`);
      expect(stdout).contain(`${stage.prove.name} stage order: ${stage.prove.order}`);
      expect(stdout).contain(`${stage.notify.name} stage order: ${stage.notify.order}`);
      expect(stdout).contain(`${stage.emit.name} stage order: ${stage.emit.order}`);
      done();
    });
  });
});

```


The step implementation:
```javascript
'use strict';

const helloWorld = 'HELLO WORLD';

const statusAccess =  () => {
  var status = 0;
  return {
    getStatus: () => {
      return status;
    },
    increment: () => {
      ++status;
    }
  };
}

const status = statusAccess();

function run(ok, ko) {
  status.increment();
  this.sh('echo HELLA TO YOU ALL', ko, true);
  this.logger.info(`Run stage order: ${status.getStatus()}`);
  this.toEmit = helloWorld;
}

function check() {
  status.increment();
  this.logger.info(`Check stage order: ${status.getStatus()}`);
  this.logger.info('#blue', 'Emit-Check Check if all you need to execute this step exists');
}

function config() {
  status.increment();
  this.logger.info(`Config stage order: ${status.getStatus()}`);
  this.logger.info('#yellow', 'Emit-Config Config the step to run');
}

function prove() {
  status.increment();
  this.logger.info(`Prove stage order: ${status.getStatus()}`);
  this.logger.info('#green', 'Emit -Prove Check if the step has run ok');
}

function notify() {
  status.increment();
  this.logger.info(`Notify stage order: ${status.getStatus()}`);
  this.logger.info('#grey', 'Emit-Notify Notify the end of the shot to someone or something');
}

function emit() {
  status.increment();
  this.logger.info(`Emit stage order: ${status.getStatus()}`);
  this.logger.info('#white', 'Emit-Emit Emit the result of the step to other steps. Allow communication between steps');
  return {message: 'emit a message', emitted: this.toEmit};
}


module.exports = {
  run: run,
  check: check,
  config: config,
  prove: prove,
  notify: notify,
  emit: emit
};
```
If we execute 
```bash
pisco world::emittingHello
```
We get this output from the console:
```log
[15:08:07] Execution contexts: [ world, feature ]
[15:08:07] 

 Starting | Emitting Hello World | [ world::emittingHello ] 

[15:08:07] check stage running...
[15:08:07] Check stage order: 1
[15:08:07] Emit-Check Check if all you need to execute this step exists
[15:08:07] config stage running...
[15:08:07] Config stage order: 2
[15:08:07] Emit-Config Config the step to run
[15:08:07] run stage running...
HELLA TO YOU ALL
[15:08:07] Run stage order: 3
[15:08:07] prove stage running...
[15:08:07] Prove stage order: 4
[15:08:07] Emit -Prove Check if the step has run ok
[15:08:07] notify stage running...
[15:08:07] Notify stage order: 5
[15:08:07] Emit-Notify Notify the end of the shot to someone or something
[15:08:07] emit stage running...
[15:08:07] Emit stage order: 6
[15:08:07] Emit-Emit Emit the result of the step to other steps. Allow communication between steps
[15:08:07] 

 Finished | Emitting Hello World - 011 ms 

[15:08:07] Allowed not implemented step: [ feature::emittingHello ]
[15:08:07] Total time - 283 ms

```


## <a name="plugin-behaviour"></a>Plugin  Behaviour
In the previous example we've used a piscosour core plugin (this.sh) to execute some OS command.
```javascript
(...)
this.sh('echo HELLA TO YOU ALL', ko, true);
```
We have tested it:
```javascript
'use strict';
/* global define, it, describe, before */
const expect = require('chai').expect;
const exec = require('child_process').exec;

describe('::emittingHello validation', function() {
  this.timeout(5000);
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
```

All the plugins in piscosour will be available (as we saw in this example) through the **this** element.

## <a name="inquirer-behaviour"></a>Inquirer  Behaviour
For the inquire behaviour, we have definied this test:
```javascript
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
```
It tests the ability of get from the input the param **paramInquire** with the value **"inquirerInput"** The configuration of this step:

```javascript
{
  "name": "askHello",
  "description": "Asking sayHello",
  "contexts": [
    "world"
  ],
  "prompts": [
    {
      "type": "input",
      "name": "paramInquire",
      "message": "What is the value of param1",
      "default": "value1"
    }
  ]

}
```
Finally, the code of the run method of the step:

```javascript
function run(ok, ko) {
  (...)
  this.logger.info(`Param1: ${this.params.paramInquire}`);
}
```

## <a name="params-behaviour"></a>Priority order Parameters  Behaviour
This functionality is documented in the guides for developers of [piscosour][9]. So, in order to test it, we have defined several places where the parameters will be defined. We have some common constants for the test examples:
```javascript
const stepEmitHello = 'world:hello';
const commandEmitHello = process.env.piscoExec + ' ' + stepEmitHello + ' ';
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
```
Let's see what we have defined:

### External file configuration
We will execute
```bash
node /home/albertoeyo/git/piscosour/bin/pisco.js --uuid 288b3227-ba32-440c-8651-28b44d2ecd5d world:hello  --paramsFile /home/albertoeyo/git/pisco-functional-tests/test/params-test.json --secondPriority commandLine
```
We will explain the rest of the parameters, the one that interests us right now is **--paramsFile** The content of  **/home/albertoeyo/git/pisco-functional-tests/test/params-test.json**
```javascript
{
  "firstPriority": "externalFile"
}
```
The fragment for our test:
```javascript
it('Should recognize the rest of the param configuration in the right order', (done) => {
    //Arrange
    console.log(getCommandEmitHelloWithParamFromCommandLine());
    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      (...)
    }
}
```
And our run method of one of the steps pf the **hello** flow:
```javascript
function run(ok, ko) {
  (...)
  this.firstPriority = this.params.firstPriority;
  (...)
  this.logger.info(`{"firstPriority":"${this.firstPriority}"}`);
  (...)
}
```

### Command line parameters option
```bash
node /home/albertoeyo/git/piscosour/bin/pisco.js --uuid 288b3227-ba32-440c-8651-28b44d2ecd5d world:hello  --paramsFile /home/albertoeyo/git/pisco-functional-tests/test/params-test.json --secondPriority commandLine
```
Test:
```javascript
it('Should recognize the rest of the param configuration in the right order', (done) => {
    //Arrange
    console.log(getCommandEmitHelloWithParamFromCommandLine());
    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${commandLine}"}`);
      (...)
    }
}
```
Run method:
```javascript
function run(ok, ko) {
  (...)
  this.firstPriority = this.params.firstPriority;
  this.secondPriority = this.params.secondPriority;
  (...)
  this.logger.info(`{"firstPriority":"${this.firstPriority}"}`);
  this.logger.info(`{"secondPriority":"${this.secondPriority}"}`);
  (...)
}
```

### Working Directory .piscosour/piscosour.json file configuration
Content of the file:
```javascript
{
  "params": {
    "firstPriority": ".piscosour/piscosourJsonWorkingDir",
    "secondPriority": ".piscosour/piscosourJsonWorkingDir",
    "priorityOrder": {
      "thirdPriority": ".piscosour/piscosourJsonWorkingDir"
    }
  }
}
```
Test
```javascript
it('Should recognize the rest of the param configuration in the right order', (done) => {
    //Arrange
    console.log(getCommandEmitHelloWithParamFromCommandLine());
    //Act
    exec(getCommandEmitHelloWithParamFromCommandLine(), {
      cwd: contextWorldDir
    }, (error, stdout, stderr) => {
      //Assert
      expect(stdout).to.contain(`{"${firstPriority}":"${externalFile}"}`);
      expect(stdout).to.contain(`{"${secondPriority}":"${commandLine}"}`);
      expect(stdout).to.contain(`"${thirdPriority}":"${wdPiscoJson}"`);
      (...)
    }
}
```
And the code of the run method (the entire one):
```javascript
function run(ok, ko) {
  this.logger.info(`${this.params.messageToEmit}`);
  this.firstPriority = this.params.firstPriority;
  this.secondPriority = this.params.secondPriority;
  this.priorityOrder = this.params.priorityOrder ? this.params.priorityOrder : {'p1': 'No Params File'};
  this.logger.info(`{"firstPriority":"${this.firstPriority}"}`);
  this.logger.info(`{"secondPriority":"${this.secondPriority}"}`);
  this.logger.info(`Priority Order: ${JSON.stringify(this.params.priorityOrder)}`);
}
```

### Receipt piscosour.json file configuration
This order will not be automatized (but it has benn proved) because it takes modify the piscosour.json of the recipe that executes the functional-tests project. And that is an anti pattern (modify code in order to test something).
### Flow config.json file configuration
Configuration:
```javascript
{
  "name": "hello",
  "description": "Hello World sample flow",
  "steps": {
    "emittingHello": {},
    "sayHello": {
      "inputs": {
        "messageToEmit": {
          "emittingHello": "emitted"
        }
      },
      "params": {
        "registryUrl": "https://registry.npmjs.org/",
        "firstPriority": "flowConfigSpecificStep",
        "secondPriority": "flowConfigSpecificStep",
        "priorityOrder": {
          "thirdPriority": "flowConfigSpecificStep",
          "fourthPriority": "flowConfigSpecificStep",
          "fifthPriority": "flowConfigSpecificStep",
          "sixthPriority": "flowConfigSpecificStep",
          "seventhPriority": "flowConfigSpecificStep"
        }
      },
      "world": {
        "params": {
          "registryUrl": "https://registry.npmjs.org/",
          "firstPriority": "flowConfigSpecificStepAndContext",
          "secondPriority": "flowConfigSpecificStepAndContext",
          "priorityOrder": {
            "thirdPriority": "flowConfigSpecificStepAndContext",
            "fourthPriority": "flowConfigSpecificStepAndContext",
            "fifthPriority": "flowConfigSpecificStepAndContext",
            "sixthPriority": "flowConfigSpecificStepAndContext"
          }
        }
      }
    }
  },
  "params": {
    "registryUrl": "https://registry.npmjs.org/",
    "firstPriority": "flowConfig",
    "secondPriority": "flowConfig",
    "priorityOrder": {
      "thirdPriority": "flowConfig",
      "fourthPriority": "flowConfig",
      "fifthPriority": "flowConfig",
      "sixthPriority": "flowConfig",
      "seventhPriority": "flowConfig",
      "eightPriority": "flowConfig"
    }
  }
}
```

### Step config.json configuration
Configuration
```javascript
{
  "name": "sayHello",
  "description": "Saying Hello",
  "contexts": [
    "world"
  ],
  "firstPriority": "stepConfig",
  "secondPriority": "stepConfig",
  "priorityOrder": {
    "thirdPriority": "stepConfig",
    "fourthPriority": "stepConfig",
    "fifthPriority": "stepConfig",
    "sixthPriority": "stepConfig",
    "seventhPriority": "stepConfig",
    "eightPriority": "stepConfig",
    "ninethPriority": "stepConfig"
  }
}
```

## <a name="pass-params-behaviour"></a>Step Behaviour passing Parameters
In this case we are going to test the parameters pass between steps. For that matter, the echo will be the result of the param emited by the emittingHello step to the sayHello step. The test is as simple as:

```javascript
function expectKOExecution(stdout, stderr, done) {
  expect(stderr).contain('This is not the root of a world');
  expect(stdout).not.contain('HELLO WORLD');
  done();
}

describe('Run the hello flow in different contexts', function() {
  it('Should return HELLO WORLD in the console', function(done) {
    exec(process.env.piscoExec + ' world:hello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expectOkExecution(error, stdout, stderr, done);
    });
  });
});
```
The flow configuration:

```javascript
{
  "name": "hello",
  "description": "Hello World sample flow",
  "steps": {
    "emittingHello": {},
    "sayHello": {
      "inputs": {
        "messageToEmit": {
          "emittingHello": "emitted"
        }
      },
      (...)
  }
}
```
The emittingHello implementation:

```javascript
const helloWorld = 'HELLO WORLD';

function run(ok, ko) {
  (...)
  this.toEmit = helloWorld;
}

function emit() {
  (...)
  return {message: 'emit a message', emitted: this.toEmit};
}
```
And the sayHello implementation:

```javascript
function run(ok, ko) {
  this.logger.info(`${this.params.messageToEmit}`);
  (...)
}
```



[1]: https://github.com/cellsjs/piscosour
[2]:#context-behaviour
[3]:#step-behaviour
[4]:#stage-behaviour
[5]:#plugin-behaviour
[6]:#inquirer-behaviour
[7]:#params-behaviour
[8]:#pass-params-behaviour
