'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rocketFormSnackbarMixin = undefined;

var _rocketforms = require('./rocketforms');

var rocketFormSnackbarMixin = exports.rocketFormSnackbarMixin = {
    created: function created() {
        var _this = this;

        _rocketforms.RocketFormEventBus.$on('errorMessage', function (message) {
            _this.$snackbar(message, 'error');
        });

        _rocketforms.RocketFormEventBus.$on('infoMessage', function (message) {
            _this.$snackbar(message, 'info');
        });
    }
};