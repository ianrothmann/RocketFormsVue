'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RocketFormEventBus = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RocketFormEventBus = exports.RocketFormEventBus = new _vue2.default({
    data: {
        currentID: 0
    },
    methods: {
        getUniqueID: function getUniqueID(prefix) {
            this.currentID++;
            return 'rocketform_' + prefix + this.currentID;
        },
        errorMessage: function errorMessage(message) {
            this.$emit('errorMessage', message);
        }
    }
});

_vue2.default.component('rocket-view-edit', require('./RocketViewEdit.vue').default);
_vue2.default.component('rocket-delete', require('./RocketDelete.vue').default);
_vue2.default.component('rocket-form', require('./RocketForm.vue').default);
_vue2.default.component('rocket-view', require('./RocketView.vue').default);
_vue2.default.component('rocket-form-renderer', require('./renderer/RocketFormRenderer.vue').default);
_vue2.default.component('rocket-view-renderer', require('./renderer/RocketViewRenderer.vue').default);