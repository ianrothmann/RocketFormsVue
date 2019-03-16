'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        addOptionalHint: function addOptionalHint(props, def) {
            if (!props.hasOwnProperty('hint') && (def.hasOwnProperty('validation') && def.validation.indexOf('required') === -1 || !def.hasOwnProperty('validation'))) {
                props['hint'] = 'Optional';
                props['persistent-hint'] = true;
            }
        },
        veeValidateDirective: function veeValidateDirective(def) {
            if (def.validation) return { name: 'validate', value: def.validation, expression: "'" + def.validation + "'" };else return {};
        },
        veeValidateAttrs: function veeValidateAttrs(def) {
            var attrs = {
                'data-vv-as': def.label
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(def.options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (key.startsWith('data-vv-')) {
                        attrs[key] = def.options[key];
                    }
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

            return attrs;
        },
        processBindings: function processBindings(props, def, data) {
            if (def.bindings) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(def.bindings)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var key = _step2.value;

                        props[key] = data[def.bindings[key]];
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
            }
        },
        renderTextInput: function renderTextInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.value = this.formData[def.name];
            this.addOptionalHint(props, def);
            this.processBindings(props, def, data);

            return h('rw-input', {
                props: props,
                attrs: this.veeValidateAttrs(def),
                'class': this.getSGridClasses(def),
                directives: [this.veeValidateDirective(def)],
                on: {
                    input: function input(val) {
                        _this.formData[def.name] = val;
                    }
                }
            });
        }
    }
};