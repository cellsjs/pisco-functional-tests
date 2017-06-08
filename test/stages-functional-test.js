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
