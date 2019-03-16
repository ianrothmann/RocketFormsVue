'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderRichtextInput: function renderRichtextInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.value = this.formData[def.name];
            this.processBindings(props, def, data);

            return h('quill-editor', {
                props: props,
                attrs: this.veeValidateAttrs(def),
                'class': this.getSGridClasses(def),
                directives: [
                    // this.veeValidateDirective(def)
                ],
                on: {
                    input: function input(val) {
                        _this.formData[def.name] = val;
                    }
                }
            });
        }
    }
};