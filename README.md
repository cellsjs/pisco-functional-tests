
# Pisco Functional Tests

In this project is defined the functional behaviour of [piscosour][1]. These are the principal, behaviours tested:
1. [Spected context behaviour][2]
1. [Spected step behaviour][3]
1. [Spected stage behaviour. In the correct order as well][4]
1. [Spected plugin behaviour][5]
1. [Inquirer][6]
1. [Spected pririty order in the params][7]
1. [Spected behaviour in the pass of paramaters][8]

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
    exec('node ' + process.env.PISCO + ' -c', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('world');
      done();
    });
  });
  it('Should not return the context world', (done) => {
    exec('node ' + process.env.PISCO + ' -c', {
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
    exec('node ' + process.env.PISCO + ' ::emittingHello', {
      cwd: __dirname + '/world'
    }, (error, stdout, stderr) => {
      expect(error).to.equal(null);
      expect(stderr).to.equal('');
      expect(stdout).contain('HELLA TO YOU ALL');
      done();
    });
  });
  it('Should \'::emittingHello\' say not the root of a world', (done) => {
    exec('node ' + process.env.PISCO + ' world::emittingHello', {
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
    exec('node ' + process.env.PISCO + ' ::emittingHello', {
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


## <a name="inquirer-behaviour"></a>Inquirer  Behaviour


## <a name="params-behaviour"></a>Priority order Parameters  Behaviour


## <a name="pass-params-behaviour"></a>Step Behaviour passing Parameters



[1]: https://github.com/cellsjs/piscosour
[2]:#context-behaviour
[3]:#step-behaviour
[4]:#stage-behaviour
[5]:#plugin-behaviour
[6]:#inquirer-behaviour
[7]:#params-behaviour
[8]:#pass-params-behaviour
