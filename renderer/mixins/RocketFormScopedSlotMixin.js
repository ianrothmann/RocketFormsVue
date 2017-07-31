export default {
    methods : {
        renderScopedSlot(h,def,data){
            const children= this.$scopedSlots[def.name](this.formData);

            return h('div',{
                'class':this.getSGridClasses(def),
            },children);
        }
    }
}