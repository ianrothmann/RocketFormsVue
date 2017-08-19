export default {
    methods : {

        renderDateInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.noMargins=true;
            props.menu=true;
            props.value=this.formData[def.name];
            this.addOptionalHint(props,def);
            this.processBindings(props,def,data);

            const el=h('rw-date',{
                props,
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

            return h('div',{'class':this.getSGridClasses(def)},[el]);
        },
        renderTimeInput(h,def,data){
            const props=def.options;
            props.label=def.label;
            props.name=def.name;
            props.noMargins=true;
            props.menu=true;
            props.value=this.formData[def.name];
            this.addOptionalHint(props,def);
            this.processBindings(props,def,data);
            const el=h('rw-time',{
                props,
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

            return h('div',{'class':this.getSGridClasses(def)},[el]);
        },
        renderDateTimeInput(h,def,data){
            const props=def.options;
            props.dateLabel=def.dateLabel;
            props.timeLabel=def.timeLabel;
            props.name=def.name;
            props.menu=true;
            props.noMargins=true;
            props.value=this.formData[def.name];
            this.addOptionalHint(props,def);
            const attrs=this.veeValidateAttrs(def);
            attrs['data-vv-as']=def.dateLabel+ '/' + def.timeLabel;
            this.processBindings(props,def,data);

            const el= h('rw-datetime',{
                props,
                attrs,
                style : {
                   margin : 0
                },
                directives : [
                    this.veeValidateDirective(def)
                ],
                on : {
                    input : (val)=>{
                        this.formData[def.name]=val;
                    }
                }
            });

            return h('div',{'class':this.getSGridClasses(def)},[el]);

        }
    }
}