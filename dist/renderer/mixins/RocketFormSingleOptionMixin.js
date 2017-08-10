'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderSingleOption: function renderSingleOption(h, def, data) {
            if (def.items.length > 2) {
                return this.renderSelect(h, def, data);
            } else {
                return this.renderRadio(h, def, data);
            }
        },
        renderSelect: function renderSelect(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.items = def.items;
            if (def.items.length > 0) {
                if (def.items.length > 10) {
                    props.search = true;
                }
                props.itemValue = def.idcol;
                props.itemText = def.valuecol;
                props.value = this.formData[def.name];

                this.addOptionalHint(props, def);
                this.processBindings(props, def, data);

                return h('rw-select', {
                    props: props,
                    'class': this.getSGridClasses(def),
                    attrs: this.veeValidateAttrs(def),
                    directives: [this.veeValidateDirective(def)],
                    on: {
                        input: function input(val) {
                            _this.formData[def.name] = val;
                        }
                    }
                });
            }
        },
        renderRadio: function renderRadio(h, def, data) {
            var _this2 = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.primary = true;
            props.value = this.formData[def.name];

            var radios = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = def.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    radios.push(h('rw-radio', {
                        props: {
                            label: item[def.valuecol],
                            trueValue: item[def.idcol]
                        }
                    }));
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

            this.processBindings(props, def, data);

            return h('rw-radio-group', {
                props: props,
                'class': this.getSGridClasses(def),
                attrs: this.veeValidateAttrs(def),
                directives: [this.veeValidateDirective(def)],
                on: {
                    input: function input(val) {
                        _this2.formData[def.name] = val;
                    }
                }
            }, radios);
        }
    }
};