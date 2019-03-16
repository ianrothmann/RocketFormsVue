'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _veeValidate = require('vee-validate');

exports.default = {
    props: {},
    data: function data() {
        return {};
    },

    methods: {
        createServerValidator: function createServerValidator() {
            var _this = this;

            _veeValidate.Validator.remove('rf_server');
            _veeValidate.Validator.remove('rf_server_express');

            _veeValidate.Validator.extend('rf_server', {
                getMessage: function getMessage(field, args, data) {
                    return data || 'Something went wrong during validation.';
                },
                validate: function validate(value, args) {
                    var data = { fieldId: args[0], value: value, data: _this.formStateData };
                    if (_this.value) {
                        data['id'] = _this.value;
                    }
                    return _this.validateServerSide(data);
                }
            });

            _veeValidate.Validator.extend('rf_server_express', {
                getMessage: function getMessage(field, args, data) {
                    return data || 'Something went wrong during validation.';
                },
                validate: function validate(value, args) {
                    var data = { fieldId: args[0], value: value };
                    if (_this.value) {
                        data['id'] = _this.value;
                    }
                    return _this.validateServerSide(data);
                }
            });
        },
        validateServerSide: function validateServerSide(data) {
            return this.dataProvider({
                command: 'validate',
                data: data
            });
        }
    },
    mounted: function mounted() {
        this.createServerValidator();
    }
};