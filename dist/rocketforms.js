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

_vue2.default.component('rocket-view-edit', require('./RocketViewEdit.vue'));
_vue2.default.component('rocket-delete', require('./RocketDelete.vue'));
_vue2.default.component('rocket-form', require('./RocketForm.vue'));
_vue2.default.component('rocket-view', require('./RocketView.vue'));
_vue2.default.component('rocket-form-renderer', require('./renderer/RocketFormRenderer.vue'));
_vue2.default.component('rocket-view-renderer', require('./renderer/RocketViewRenderer.vue'));

/*
window.RocketForm=class RocketForm{
    constructor(items) {
        this.items = items;
    }
};

export class RFSection{
    constructor(title,instructions,inputs) {
        this.title = title;
        this.instructions = instructions;
        this.inputs = inputs;
    }

}

export class RocketFormInput{
    constructor(type,colname,label,validation,options) {
        this.colname = colname;
        this.label = label;
        this.validation = validation;
        this.type = type;
        this.options = options;
    }
}

export class RFText extends RocketFormInput{
    constructor(colname,label,validation,options) {
        super('text',colname,label,validation,options);
    }
}

class RFSelect{
    constructor(colname,label,validation,values,options,descriptioncol,idcol) {
        this.colname = colname;
        this.label = label;
        this.validation = validation;
        this.type = 'select';
        this.values = values;

        this.options = options;
    }
}
*/