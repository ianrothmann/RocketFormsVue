'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RocketTest = function () {
    function RocketTest() {
        _classCallCheck(this, RocketTest);
    }

    _createClass(RocketTest, [{
        key: 'setName',
        value: function setName(v) {
            this.name = v;
            return this;
        }
    }, {
        key: 'setSurname',
        value: function setSurname(v) {
            this.surname = v;
            return this;
        }
    }, {
        key: 'log',
        value: function log() {
            console.log(this);
        }
    }]);

    return RocketTest;
}();

var RocketFormField = function () {
    function RocketFormField(type, name, label) {
        _classCallCheck(this, RocketFormField);

        this.type = type;
        this.name = name;
        this.label = label;
        this.validation = 'required';
        this.options = {};
    }

    _createClass(RocketFormField, [{
        key: 'withName',
        value: function withName(val) {
            this.name = val;
            return this;
        }
    }, {
        key: 'withLabel',
        value: function withLabel(val) {
            this.label = val;
            return this;
        }
    }, {
        key: 'withOption',
        value: function withOption(key, value) {
            console.log(this.options);
            this.options[key] = value;
        }

        //Validation

    }, {
        key: 'withoutValidation',
        value: function withoutValidation() {
            this.validation = '';
            return this;
        }
    }, {
        key: 'withValidation',
        value: function withValidation(veeValidators) {
            this.validation = veeValidators;
            return this;
        }
    }, {
        key: 'withValidationDelay',
        value: function withValidationDelay(ms) {
            this.withOption('data-vv-delay', ms);
            return this;
        }
    }, {
        key: 'withValidationLabel',
        value: function withValidationLabel(val) {
            this.withOption('data-vv-as', val);
            return this;
        }

        //Layout classes

    }, {
        key: 'xs',
        value: function xs(breakpoint) {
            this.options['xs'] = breakpoint;
            return this;
        }
    }, {
        key: 'sm',
        value: function sm(breakpoint) {
            this.options['sm'] = breakpoint;
            return this;
        }
    }, {
        key: 'md',
        value: function md(breakpoint) {
            this.options['md'] = breakpoint;
            return this;
        }
    }, {
        key: 'lg',
        value: function lg(breakpoint) {
            this.options['lg'] = breakpoint;
            return this;
        }
    }, {
        key: 'xl',
        value: function xl(breakpoint) {
            this.options['xl'] = breakpoint;
            return this;
        }
    }, {
        key: 'offsetXs',
        value: function offsetXs(breakpoint) {
            this.options['offset-xs'] = breakpoint;
            return this;
        }
    }, {
        key: 'offsetSm',
        value: function offsetSm(breakpoint) {
            this.options['offset-sm'] = breakpoint;
            return this;
        }
    }, {
        key: 'offsetMd',
        value: function offsetMd(breakpoint) {
            this.options['offset-md'] = breakpoint;
            return this;
        }
    }, {
        key: 'offsetLg',
        value: function offsetLg(breakpoint) {
            this.options['offset-lg'] = breakpoint;
            return this;
        }
    }, {
        key: 'offsetXl',
        value: function offsetXl(breakpoint) {
            this.options['offset-xl'] = breakpoint;
            return this;
        }
    }]);

    return RocketFormField;
}();

var RocketFormTextField = function (_RocketFormField) {
    _inherits(RocketFormTextField, _RocketFormField);

    function RocketFormTextField(name, label) {
        _classCallCheck(this, RocketFormTextField);

        return _possibleConstructorReturn(this, (RocketFormTextField.__proto__ || Object.getPrototypeOf(RocketFormTextField)).call(this, 'text', name, label));
    }

    _createClass(RocketFormTextField, [{
        key: 'withHint',
        value: function withHint(val) {
            this.withOption('hint', val);
            return this;
        }
    }, {
        key: 'withPersistentHint',
        value: function withPersistentHint(val) {
            this.withOption('persistentHint', true);
            this.withHint('hint');
            return this;
        }
    }, {
        key: 'withIcon',
        value: function withIcon(val) {
            this.withOption('prepend-icon', val);
            return this;
        }
    }, {
        key: 'withIconAppended',
        value: function withIconAppended(val) {
            this.withOption('append-icon', val);
            return this;
        }
    }, {
        key: 'withPrefix',
        value: function withPrefix(val) {
            this.withOption('prefix', val);
            return this;
        }
    }, {
        key: 'withSuffix',
        value: function withSuffix(val) {
            this.withOption('suffix', val);
            return this;
        }
    }, {
        key: 'makePassword',
        value: function makePassword() {
            this.withOption('password', true);
            return this;
        }
    }, {
        key: 'makeMultiLine',
        value: function makeMultiLine() {
            this.withOption('multiline', true);
            return this;
        }
    }, {
        key: 'withRows',
        value: function withRows(rows) {
            this.withOption('rows', rows);
            return this;
        }
    }]);

    return RocketFormTextField;
}(RocketFormField);

var RocketFormSelectField = function (_RocketFormField2) {
    _inherits(RocketFormSelectField, _RocketFormField2);

    function RocketFormSelectField(type, name, label) {
        _classCallCheck(this, RocketFormSelectField);

        var _this2 = _possibleConstructorReturn(this, (RocketFormSelectField.__proto__ || Object.getPrototypeOf(RocketFormSelectField)).call(this, type, name, label));

        _this2.idcol = 'id';
        _this2.valuecol = 'text';
        return _this2;
    }

    _createClass(RocketFormSelectField, [{
        key: 'identifiedBy',
        value: function identifiedBy(idKey, valueKey) {
            this.idcol = idKey;
            this.valuecol = valueKey;
            return this;
        }
    }, {
        key: 'withItems',
        value: function withItems(valueArr) {
            this.items = valueArr;
            return this;
        }
    }]);

    return RocketFormSelectField;
}(RocketFormField);

var RocketFormSingleOptionField = function (_RocketFormSelectFiel) {
    _inherits(RocketFormSingleOptionField, _RocketFormSelectFiel);

    function RocketFormSingleOptionField(name, label) {
        _classCallCheck(this, RocketFormSingleOptionField);

        return _possibleConstructorReturn(this, (RocketFormSingleOptionField.__proto__ || Object.getPrototypeOf(RocketFormSingleOptionField)).call(this, 'single-option', name, label));
    }

    return RocketFormSingleOptionField;
}(RocketFormSelectField);

var RocketFormMultiOptionField = function (_RocketFormSelectFiel2) {
    _inherits(RocketFormMultiOptionField, _RocketFormSelectFiel2);

    function RocketFormMultiOptionField(name, label) {
        _classCallCheck(this, RocketFormMultiOptionField);

        return _possibleConstructorReturn(this, (RocketFormMultiOptionField.__proto__ || Object.getPrototypeOf(RocketFormMultiOptionField)).call(this, 'multi-option', name, label));
    }

    return RocketFormMultiOptionField;
}(RocketFormSelectField);

var RocketFormFileAbstractField = function (_RocketFormField3) {
    _inherits(RocketFormFileAbstractField, _RocketFormField3);

    function RocketFormFileAbstractField(type, name, label) {
        _classCallCheck(this, RocketFormFileAbstractField);

        return _possibleConstructorReturn(this, (RocketFormFileAbstractField.__proto__ || Object.getPrototypeOf(RocketFormFileAbstractField)).call(this, type, name, label));
    }

    return RocketFormFileAbstractField;
}(RocketFormField);

var RocketFormImageOptionField = function (_RocketFormFileAbstra) {
    _inherits(RocketFormImageOptionField, _RocketFormFileAbstra);

    function RocketFormImageOptionField(name, label) {
        _classCallCheck(this, RocketFormImageOptionField);

        return _possibleConstructorReturn(this, (RocketFormImageOptionField.__proto__ || Object.getPrototypeOf(RocketFormImageOptionField)).call(this, 'image', name, label));
    }

    return RocketFormImageOptionField;
}(RocketFormFileAbstractField);

var RocketFormImagesOptionField = function (_RocketFormFileAbstra2) {
    _inherits(RocketFormImagesOptionField, _RocketFormFileAbstra2);

    function RocketFormImagesOptionField(name, label) {
        _classCallCheck(this, RocketFormImagesOptionField);

        return _possibleConstructorReturn(this, (RocketFormImagesOptionField.__proto__ || Object.getPrototypeOf(RocketFormImagesOptionField)).call(this, 'images', name, label));
    }

    return RocketFormImagesOptionField;
}(RocketFormFileAbstractField);

var RocketFormFileOptionField = function (_RocketFormFileAbstra3) {
    _inherits(RocketFormFileOptionField, _RocketFormFileAbstra3);

    function RocketFormFileOptionField(name, label) {
        _classCallCheck(this, RocketFormFileOptionField);

        return _possibleConstructorReturn(this, (RocketFormFileOptionField.__proto__ || Object.getPrototypeOf(RocketFormFileOptionField)).call(this, 'file', name, label));
    }

    return RocketFormFileOptionField;
}(RocketFormFileAbstractField);

var RocketFormFilesOptionField = function (_RocketFormFileAbstra4) {
    _inherits(RocketFormFilesOptionField, _RocketFormFileAbstra4);

    function RocketFormFilesOptionField(name, label) {
        _classCallCheck(this, RocketFormFilesOptionField);

        return _possibleConstructorReturn(this, (RocketFormFilesOptionField.__proto__ || Object.getPrototypeOf(RocketFormFilesOptionField)).call(this, 'files', name, label));
    }

    return RocketFormFilesOptionField;
}(RocketFormFileAbstractField);

var rocketFormBuilder = {
    text: function text(name, label) {
        return new RocketFormTextField(name, label);
    },
    longText: function longText(name, label) {
        return new RocketFormTextField(name, label).makeMultiLine();
    },
    password: function password(name, label) {
        return new RocketFormTextField(name, label).makePassword();
    },
    singleOption: function singleOption(name, label) {
        return new RocketFormSingleOptionField(name, label);
    },
    multiOption: function multiOption(name, label) {
        return new RocketFormMultiOptionField(name, label);
    },
    file: function file(name, label) {
        return new RocketFormFileOptionField(name, label);
    },
    files: function files(name, label) {
        return new RocketFormFilesOptionField(name, label);
    },
    image: function image(name, label) {
        return new RocketFormImageOptionField(name, label);
    },
    images: function images(name, label) {
        return new RocketFormImagesOptionField(name, label);
    }
};

var RocketFormBuilder = exports.RocketFormBuilder = {};

RocketFormBuilder.install = function (Vue, options) {

    Vue.prototype.$rf = rocketFormBuilder;
};