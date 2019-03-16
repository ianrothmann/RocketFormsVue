'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderBooleanInput: function renderBooleanInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.secondary = true;
            props.value = this.formData[def.name];
            this.processBindings(props, def, data);
            var type = 'rw-switch';
            if (def.options.checkbox) type = 'rw-checkbox';

            return h(type, {
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