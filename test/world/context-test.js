"use strict";

/* global define, it, describe, before */
const assert = require('assert');
const sayHello = require("../../contexts/world/index.js");


describe("Verify the current folder", () => {
    it("Should return OK in the current world folder", () => {
        //Arrange
        //Act
        const isWorld = sayHello.check();
        //Assert
        assert.ok("Folder is called world", isWorld);
    });
});
