export default {
    methods : {
        addOptionalHint(props,def){
            if(!props.hasOwnProperty('hint')&&((def.hasOwnProperty('validation')&&def.validation.indexOf('required')===-1)||!def.hasOwnProperty('validation'))){
                props['hint']='Optional';
                props['persistent-hint']=true;
            }
        },
        veeValidateDirective(def){
            if(def.validation)
                return {name:'validate',value:def.validation,expression:"'"+def.validation+"'"};
            else
                return {};
        },
        veeValidateAttrs(def){
            const attrs={
                'data-vv-as':def.label
            };
            for(let key of Object.keys(def.options)){
                if(key.startsWith('data-vv-')){
                    attrs[key]=def.options[key];
                }
            }
            return attrs;
        },
        processBindings(props,def,data){
            if(def.bindings){
                for(let key of Object.keys(def.bindings)){
                    props[key]=data[def.bindings[key]];
                }
            }
        },
        renderTextInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.value=this.formData[def.name];
            this.addOptionalHint(props,def);
            this.processBindings(props,def,data);

            return h('rw-input',{
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