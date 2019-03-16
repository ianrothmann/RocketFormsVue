'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RocketFormRenderableItem = function () {
    function RocketFormRenderableItem() {
        _classCallCheck(this, RocketFormRenderableItem);
    }

    _createClass(RocketFormRenderableItem, [{
        key: 'onlyShowWhen',
        value: function onlyShowWhen(closure) {
            this.show = closure;
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

    return RocketFormRenderableItem;
}();

var RocketFormSlot = function (_RocketFormRenderable) {
    _inherits(RocketFormSlot, _RocketFormRenderable);

    function RocketFormSlot(name) {
        _classCallCheck(this, RocketFormSlot);

        var _this = _possibleConstructorReturn(this, (RocketFormSlot.__proto__ || Object.getPrototypeOf(RocketFormSlot)).call(this));

        _this.type = 'scoped-slot';
        _this.name = name;
        return _this;
    }

    return RocketFormSlot;
}(RocketFormRenderableItem);

var RocketFormField = function (_RocketFormRenderable2) {
    _inherits(RocketFormField, _RocketFormRenderable2);

    function RocketFormField(type, name, label) {
        _classCallCheck(this, RocketFormField);

        var _this2 = _possibleConstructorReturn(this, (RocketFormField.__proto__ || Object.getPrototypeOf(RocketFormField)).call(this));

        _this2.type = type;
        _this2.name = name;
        _this2.label = label;
        _this2.validation = 'required';
        _this2.options = {};
        return _this2;
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
            this.options[key] = value;
        }
    }, {
        key: 'withBinding',
        value: function withBinding(key, value) {
            this.bindings[key] = value;
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
    }]);

    return RocketFormField;
}(RocketFormRenderableItem);

var RocketFormTextAbstractField = function (_RocketFormField) {
    _inherits(RocketFormTextAbstractField, _RocketFormField);

    function RocketFormTextAbstractField(type, name, label) {
        _classCallCheck(this, RocketFormTextAbstractField);

        return _possibleConstructorReturn(this, (RocketFormTextAbstractField.__proto__ || Object.getPrototypeOf(RocketFormTextAbstractField)).call(this, type, name, label));
    }

    _createClass(RocketFormTextAbstractField, [{
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
    }]);

    return RocketFormTextAbstractField;
}(RocketFormField);

var RocketFormTextField = function (_RocketFormTextAbstra) {
    _inherits(RocketFormTextField, _RocketFormTextAbstra);

    function RocketFormTextField(name, label) {
        _classCallCheck(this, RocketFormTextField);

        return _possibleConstructorReturn(this, (RocketFormTextField.__proto__ || Object.getPrototypeOf(RocketFormTextField)).call(this, 'text', name, label));
    }

    _createClass(RocketFormTextField, [{
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
}(RocketFormTextAbstractField);

var RocketFormDateField = function (_RocketFormTextAbstra2) {
    _inherits(RocketFormDateField, _RocketFormTextAbstra2);

    function RocketFormDateField(name, label) {
        _classCallCheck(this, RocketFormDateField);

        return _possibleConstructorReturn(this, (RocketFormDateField.__proto__ || Object.getPrototypeOf(RocketFormDateField)).call(this, 'date', name, label));
    }

    _createClass(RocketFormDateField, [{
        key: 'allowBefore',
        value: function allowBefore(fieldName) {
            this.withBinding('allowBefore', fieldName);
            return this;
        }
    }, {
        key: 'allowAfter',
        value: function allowAfter(fieldName) {
            this.withBinding('allowAfter', fieldName);
            return this;
        }
    }]);

    return RocketFormDateField;
}(RocketFormTextAbstractField);

var RocketFormTimeField = function (_RocketFormTextAbstra3) {
    _inherits(RocketFormTimeField, _RocketFormTextAbstra3);

    function RocketFormTimeField(name, label) {
        _classCallCheck(this, RocketFormTimeField);

        return _possibleConstructorReturn(this, (RocketFormTimeField.__proto__ || Object.getPrototypeOf(RocketFormTimeField)).call(this, 'time', name, label));
    }

    return RocketFormTimeField;
}(RocketFormTextAbstractField);

var RocketFormDateTimeField = function (_RocketFormTextAbstra4) {
    _inherits(RocketFormDateTimeField, _RocketFormTextAbstra4);

    function RocketFormDateTimeField(name, dateLabel, timeLabel) {
        _classCallCheck(this, RocketFormDateTimeField);

        var _this7 = _possibleConstructorReturn(this, (RocketFormDateTimeField.__proto__ || Object.getPrototypeOf(RocketFormDateTimeField)).call(this, 'datetime', name, dateLabel));

        _this7.dateLabel = dateLabel;
        _this7.timeLabel = timeLabel;
        return _this7;
    }

    _createClass(RocketFormDateTimeField, [{
        key: 'allowBeforeDate',
        value: function allowBeforeDate(date) {
            this.withOption('allowBefore', date);
            return this;
        }
    }, {
        key: 'allowedDates',
        value: function allowedDates(dates) {
            this.withOption('allowedDates', dates);
            return this;
        }
    }, {
        key: 'allowAfterDate',
        value: function allowAfterDate(date) {
            this.withOption('allowAfter', date);
            return this;
        }
    }, {
        key: 'bindToAllowBefore',
        value: function bindToAllowBefore(fieldName) {
            this.withBinding('allowBefore', fieldName);
            return this;
        }
    }, {
        key: 'bindToAllowAfter',
        value: function bindToAllowAfter(fieldName) {
            this.withBinding('allowAfter', fieldName);
            return this;
        }
    }]);

    return RocketFormDateTimeField;
}(RocketFormTextAbstractField);

var RocketFormBoolField = function (_RocketFormField2) {
    _inherits(RocketFormBoolField, _RocketFormField2);

    function RocketFormBoolField(name, label) {
        _classCallCheck(this, RocketFormBoolField);

        return _possibleConstructorReturn(this, (RocketFormBoolField.__proto__ || Object.getPrototypeOf(RocketFormBoolField)).call(this, 'boolean', name, label));
    }

    _createClass(RocketFormBoolField, [{
        key: 'makeCheckbox',
        value: function makeCheckbox() {
            this.withOption('checkbox', true);
            return this;
        }
    }]);

    return RocketFormBoolField;
}(RocketFormField);

var RocketFormSelectField = function (_RocketFormTextAbstra5) {
    _inherits(RocketFormSelectField, _RocketFormTextAbstra5);

    function RocketFormSelectField(type, name, label) {
        _classCallCheck(this, RocketFormSelectField);

        var _this9 = _possibleConstructorReturn(this, (RocketFormSelectField.__proto__ || Object.getPrototypeOf(RocketFormSelectField)).call(this, type, name, label));

        _this9.idcol = 'id';
        _this9.valuecol = 'text';
        return _this9;
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
}(RocketFormTextAbstractField);

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

    _createClass(RocketFormFileAbstractField, [{
        key: 'to',
        value: function to(url) {
            this.url = url;
            return this;
        }
    }]);

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

var RocketFormSection = function (_RocketFormRenderable3) {
    _inherits(RocketFormSection, _RocketFormRenderable3);

    function RocketFormSection(title) {
        _classCallCheck(this, RocketFormSection);

        var _this17 = _possibleConstructorReturn(this, (RocketFormSection.__proto__ || Object.getPrototypeOf(RocketFormSection)).call(this, 'section'));

        _this17.type = 'section';
        _this17.title = title;
        return _this17;
    }

    _createClass(RocketFormSection, [{
        key: 'withInstructions',
        value: function withInstructions(instructions) {
            this.instructions = instructions;
            return this;
        }
    }, {
        key: 'withFields',
        value: function withFields(fields) {
            this.inputs = fields;
            return this;
        }
    }]);

    return RocketFormSection;
}(RocketFormRenderableItem);

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
    file: function file(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'File';

        return new RocketFormFileOptionField(name, label);
    },
    files: function files(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Files';

        return new RocketFormFilesOptionField(name, label);
    },
    image: function image(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Image';

        return new RocketFormImageOptionField(name, label);
    },
    images: function images(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Images';

        return new RocketFormImagesOptionField(name, label);
    },
    check: function check(name, label) {
        return new RocketFormBoolField(name, label).makeCheckbox();
    },
    bool: function bool(name, label) {
        return new RocketFormBoolField(name, label);
    },
    date: function date(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Date';

        return new RocketFormDateField(name, label);
    },
    time: function time(name) {
        var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Time';

        return new RocketFormTimeField(name, label);
    },
    dateTime: function dateTime(name) {
        var dateLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Date';
        var timeLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Time';

        return new RocketFormBoolField(name, dateLabel, timeLabel);
    },
    section: function section(title) {
        return new RocketFormSection(title);
    },
    slot: function slot(name) {
        return new RocketFormSlot(name);
    }
};

var RocketFormBuilder = exports.RocketFormBuilder = {};

RocketFormBuilder.install = function (Vue, options) {

    Vue.prototype.$rf = { builder: rocketFormBuilder };
};