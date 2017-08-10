'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderUploadInput: function renderUploadInput(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.url = def.url;
            props.name = def.name;
            props.value = this.formData[def.name];

            if (def.type === 'image' || def.type === 'file') {
                props['maxNumFiles'] = 1;
            }

            this.processBindings(props, def, data);

            return h('rw-multi-file', {
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