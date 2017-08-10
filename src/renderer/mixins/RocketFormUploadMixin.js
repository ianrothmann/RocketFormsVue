export default {
    methods : {
        renderUploadInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.url=def.url;
            props.name=def.name;
            props.value=this.formData[def.name];

            if(def.type==='image'||def.type==='file'){
                props['maxNumFiles']=1;
            }

            this.processBindings(props,def,data);

            return h('rw-multi-file',{
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