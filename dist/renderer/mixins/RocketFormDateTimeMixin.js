'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderDateInput: function renderDateInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.noMargins = true;
            props.value = this.formData[def.name];
            this.addOptionalHint(props, def);
            this.processBindings(props, def, data);

            var el = h('rw-date', {
                props: props,
                attrs: this.veeValidateAttrs(def),
                directives: [this.veeValidateDirective(def)],

                on: {
                    input: function input(val) {
                        _this.formData[def.name] = val;
                    }
                }
            });

            return h('div', { 'class': this.getSGridClasses(def) }, [el]);
        },
        renderTimeInput: function renderTimeInput(h, def, data) {
            var _this2 = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.noMargins = true;
            props.value = this.formData[def.name];
            this.addOptionalHint(props, def);
            this.processBindings(props, def, data);
            var el = h('rw-time', {
                props: props,
                attrs: this.veeValidateAttrs(def),
                directives: [this.veeValidateDirective(def)],

                on: {
                    input: function input(val) {
                        _this2.formData[def.name] = val;
                    }
                }
            });

            return h('div', { 'class': this.getSGridClasses(def) }, [el]);
        },
        renderDateTimeInput: function renderDateTimeInput(h, def, data) {
            var _this3 = this;

            var props = def.options;
            props.dateLabel = def.dateLabel;
            props.timeLabel = def.timeLabel;
            props.name = def.name;
            props.noMargins = true;
            props.value = this.formData[def.name];
            this.addOptionalHint(props, def);
            var attrs = this.veeValidateAttrs(def);
            attrs['data-vv-as'] = def.dateLabel + '/' + def.timeLabel;
            this.processBindings(props, def, data);

            var el = h('rw-datetime', {
                props: props,
                attrs: attrs,
                style: {
                    margin: 0
                },
                directives: [this.veeValidateDirective(def)],
                on: {
                    input: function input(val) {
                        _this3.formData[def.name] = val;
                    }
                }
            });

            return h('div', { 'class': this.getSGridClasses(def) }, [el]);
        }
    }
};