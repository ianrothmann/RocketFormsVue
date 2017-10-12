export default {
    methods : {
        renderRichtextInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.value=this.formData[def.name];
            this.processBindings(props,def,data);

            return h('quill-editor',{
                props,
                attrs : this.veeValidateAttrs(def),
                'class':this.getSGridClasses(def),
                directives : [
                   // this.veeValidateDirective(def)
                ],
                on : {
                    input : (val)=>{
                        this.formData[def.name]=val;
                    }
                }
            });
        }
    }
}