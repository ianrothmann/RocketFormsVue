'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
    props: {
        createModifiers: Object,
        editModifiers: Object,
        viewModifiers: Object,
        createSlots: Array,
        editSlots: Array,
        viewSlots: Array
    },
    computed: {
        modifiers: function modifiers() {
            if (this.formType === 'edit') {
                return this.editModifiers;
            } else if (this.formType === 'add') {
                return this.createModifiers;
            } else if (this.formType === 'view') {
                return this.viewModifiers;
            }
        },
        customSlots: function customSlots() {
            if (this.formType === 'edit') {
                return this.editSlots;
            } else if (this.formType === 'add') {
                return this.createSlots;
            } else if (this.formType === 'view') {
                return this.viewSlots;
            }
        }
    },
    data: function data() {
        return {
            serverDefinition: {},
            fieldSet: {}
        };
    },

    methods: {
        createRocketFormDefinition: function createRocketFormDefinition(serverDefinition) {
            this.serverDefinition = serverDefinition;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.serverDefinition.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var field = _step.value;

                    this.fieldSet[field.fieldId] = field;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var fieldCount = 0;

            this.createCustomSlots(this.definition);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (this.serverDefinition.groups || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var groupOrFieldId = _step2.value;

                    if ((typeof groupOrFieldId === 'undefined' ? 'undefined' : _typeof(groupOrFieldId)) === 'object') {
                        var groupDefinition = {
                            type: 'section',
                            title: groupOrFieldId.label,
                            instructions: groupOrFieldId.description,
                            inputs: []
                        };
                        this.processGroupModifiers(groupDefinition, groupOrFieldId.groupId);
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = groupOrFieldId.fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var fieldId = _step3.value;

                                var _field = this.fieldSet[fieldId];
                                groupDefinition.inputs.push(this.createRocketFieldDefinition(_field, fieldCount));
                                fieldCount++;
                                this.createCustomSlots(groupDefinition.inputs, fieldId);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }

                        this.definition.push(groupDefinition);
                        this.createCustomSlots(this.definition, groupOrFieldId.groupId);
                    } else {
                        var _field2 = this.fieldSet[groupOrFieldId];

                        this.definition.push(this.createRocketFieldDefinition(_field2, fieldCount));
                        fieldCount++;
                        this.createCustomSlots(this.definition, _field2.fieldId);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        },
        createCustomSlots: function createCustomSlots(definition) {
            var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (this.customSlots) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.customSlots[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var slot = _step4.value;

                        if (slot.after === after) {
                            definition.push({
                                type: 'scoped-slot',
                                name: slot.name
                            });
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        },
        processGroupModifiers: function processGroupModifiers(groupDefinition, groupId) {
            if (this.modifiers) {
                if (this.modifiers[groupId]) {
                    var groupModifier = Object.assign({}, this.modifiers[groupId]);
                    delete groupModifier['type'];
                    delete groupModifier['inputs'];
                    groupDefinition = Object.assign(groupDefinition, groupModifier);
                }
            }
        },
        createRocketFieldDefinition: function createRocketFieldDefinition(field) {
            var fieldCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            var rField = {
                type: this.getFieldDataType(field),
                name: field.fieldId,
                label: field.label,
                validation: this.getValidation(field),
                options: {}
            };

            if (fieldCount === 0) rField['options']['autofocus'] = true;

            if (field.dataType === 'select') {
                this.createSelect(rField, field);
            } else if (field.dataType === 'enum') {
                rField['idcol'] = field['valueIdFieldName'];
                rField['valuecol'] = field['valueDescriptorFieldName'];
                rField['items'] = field['values'];
            } else if (field.dataType === 'multiselect') {
                this.createMultiSelect(rField, field);
            } else if (field.dataType === 'files' || field.dataType === 'file' || field.dataType === 'images' || field.dataType === 'image') {
                rField['url'] = this.url;
                if (field.orderPivotField) {
                    rField['options']['re-order'] = true;
                }
            } else if (field.dataType === 'longtext') {
                rField['options'] = {
                    multiline: true
                };
            } else if (field.dataType === 'boolean') {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = field.values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var value = _step5.value;

                        if (value.id === 0) rField['options']['falseDisplayValue'] = value.text;else if (value.id === 1) rField['options']['trueDisplayValue'] = value.text;
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            } else if (field.dataType === 'richtext') {
                rField['options'] = {};
            } else if (field.dataType === 'datetime') {
                rField['dateLabel'] = field.dateLabel;
                rField['timeLabel'] = field.timeLabel;
            } else if (field.dataType === 'location') {

                if (field.centerLat && field.centerLng) {
                    rField['options'] = {
                        center: {
                            lat: field.centerLat,
                            lng: field.centerLng
                        }
                    };
                }
            } else if (field.dataType === 'currency') {
                rField['options'] = {
                    prefix: field.currencySymbol
                };
            }
            this.processFieldModifiers(rField, field.fieldId);

            return rField;
        },
        createSelect: function createSelect(rField, field) {
            rField['idcol'] = field['valueIdFieldName'];
            rField['valuecol'] = field['valueDescriptorFieldName'];
            rField['items'] = field['values'];
        },
        createMultiSelect: function createMultiSelect(rField, field) {
            rField['idcol'] = field['valueIdFieldName'];
            rField['valuecol'] = field['valueDescriptorFieldName'];
            rField['items'] = field['values'];
        },
        processFieldModifiers: function processFieldModifiers(rField, fieldId) {
            if (this.modifiers) {
                if (this.modifiers[fieldId]) {
                    var fieldModifier = Object.assign({}, this.modifiers[fieldId]);
                    if (fieldModifier.options) {
                        rField['options'] = Object.assign(rField['options'], fieldModifier.options);
                        delete fieldModifier['options'];
                    }
                    rField = Object.assign(rField, fieldModifier);
                }
            }
        },
        getFieldDataType: function getFieldDataType(field) {
            var dataType = field.dataType;
            if (dataType === 'select') {
                return 'single-option';
            } else if (dataType === 'multiselect') {
                return 'multi-option';
            } else if (dataType === 'longtext') {
                return 'text';
            } else if (dataType === 'int' || dataType === 'decimal' || dataType === 'currency') {
                return 'text';
            } else {
                return dataType;
            }
        },
        getValidation: function getValidation(field) {
            var valArr = [];
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = field.validators[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var validator = _step6.value;

                    if (validator.rule === 'rf_server' || validator.rule === 'rf_server_express') {
                        valArr.push(validator.rule + ':' + field.fieldId);
                    } else {
                        valArr.push(validator.rule);
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (!field.isOptional) valArr.push('required');

            return valArr.join('|');
        }
    }
};