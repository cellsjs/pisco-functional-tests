'use strict';

module.exports = {
    run: function(ok, ko) {
        this.sh('echo HELLO WORLD', ko, true);
    }
};
