'use strict';

/* global define, it, describe, before, afterEach */
const assert = require('assert');
const contextWorld = require('../contexts/world/index.js');

describe('Verify the current folder with the step', () => {
  const currentDirectory = process.cwd();
  it('Should return KO because folder is not world, is test', () => {
    //Arrange
    // Act
    const isWorld = contextWorld.check();

    //Assert
    assert.ok(!isWorld, 'Folder is not world');
  });
  it('Should return OK because folder is world', () => {
    //Arrange
    process.chdir(__dirname + '/world');

    //Act
    const isWorld = contextWorld.check();

    //Assert
    assert.ok(isWorld, 'Folder is not world');
  });

  afterEach('Get back to the correct directory', () => {
    process.chdir(currentDirectory);
  });
});
