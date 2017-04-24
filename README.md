
# Pisco Functional Tests

In this project is defined the functional behaviour of [piscosour][1]. These are the principal, behaviours tested:
1. [Spected context behaviour][2]
1. [Spected step behaviour][3]
1. [Spected staage behaviour. In the correct order as well][4]
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
