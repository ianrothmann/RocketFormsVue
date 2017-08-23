export default {
    methods : {
        renderLocationInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            try{
                props.value=JSON.parse(this.formData[def.name]);
            }catch(e){
                props.value=null;
            }
            this.addOptionalHint(props,def);
            this.processBindings(props,def,data);

            return h('rw-map',{
                props,
                attrs : this.veeValidateAttrs(def),
                'class':this.getSGridClasses(def),
                directives : [
                    this.veeValidateDirective(def)
                ],
                on : {
                    input : (val)=>{
                        this.formData[def.name]=JSON.stringify(val);
                    }
                }
            });
        }
    }
}