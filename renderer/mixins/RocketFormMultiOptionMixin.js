export default {
    methods : {
        renderMultiOption(h,def,data){
           return this.renderMultiSelect(h,def,data);
        },
        renderMultiSelect(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.items=def.items;
            if(def.items.length > 0){
                if(def.items.length > 10){
                    props.search=true;
                }
                props.multi=true;
                props.itemValue=def.idcol;
                props.itemText=def.valuecol;
                props.value=this.formData[def.name];

                this.addOptionalHint(props,def);
                this.processBindings(props,def,data);

                return h('rw-select',{
                    props,
                    'class':this.getSGridClasses(def),
                    attrs : this.veeValidateAttrs(def),
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
}