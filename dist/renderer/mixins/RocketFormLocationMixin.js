'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderLocationInput: function renderLocationInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            try {
                props.value = JSON.parse(this.formData[def.name]);
            } catch (e) {
                props.value = null;
            }
            this.processBindings(props, def, data);

            return h('rw-map', {
                props: props,
                attrs: this.veeValidateAttrs(def),
                'class': this.getSGridClasses(def),
                directives: [this.veeValidateDirective(def)],
                on: {
                    input: function input(val) {
                        _this.formData[def.name] = JSON.stringify(val);
                    }
                }
            });
        }
    }
};