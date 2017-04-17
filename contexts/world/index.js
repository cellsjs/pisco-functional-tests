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
