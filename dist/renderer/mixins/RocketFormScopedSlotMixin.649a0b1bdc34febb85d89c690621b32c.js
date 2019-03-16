'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderScopedSlot: function renderScopedSlot(h, def, data) {
            var children = this.$scopedSlots[def.name](this.formData);

            return h('div', {
                'class': this.getSGridClasses(def)
            }, children);
        }
    }
};