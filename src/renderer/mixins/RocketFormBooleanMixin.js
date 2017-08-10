export default {
    methods : {
        renderBooleanInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.secondary=true;
            props.value=this.formData[def.name];
            this.processBindings(props,def,data);
            let type='rw-switch';
            if(def.options.checkbox)
                type='rw-checkbox';

            return h(type,{
                props,
                attrs : this.veeValidateAttrs(def),
                'class':this.getSGridClasses(def),
                directives : [
                    this.veeValidateDirective(def)
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