'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        renderSingleOption: function renderSingleOption(h, def, data) {
            return this.renderSelect(h, def, data); //TODO: Decide about radio buttons in rocket form
            /*if(def.items.length >2){
                return this.renderSelect(h,def,data);
            }else{
                return this.renderRadio(h,def,data);
            }*/
        },
        renderSelect: function renderSelect(h, def, data) {
            var _this = this;

            var props = def.options;
            props.label = def.label;
            props.name = def.name;
            props.items = def.items;
            if (def.items.length > 0) {
                if (def.items.length > 10) {
                    props.search = true;
                }
                props.itemValue = def.idcol;
                props.itemText = def.valuecol;
                props.value = this.formData[def.name];

                this.addOptionalHint(props, def);
                this.processBindings(props, def, data);

                return h('rw-select', {
                    props: props,
                    'class': this.getSGridClasses(def),
                    attrs: this.veeValidateAttrs(def),
                    directives: [this.veeValidateDirective(def)],
                    on: {
                        input: function input(val) {
                            _this.formData[def.name] = val;
                        }
                    }
                });
            }
        } /*,
          renderRadio(h,def,data){
             const props=def.options;
             props.label=def.label;
             props.name=def.name;
             props.primary=true;
             props.value=this.formData[def.name];
              const radios=[];
             for(let item of def.items){
                 radios.push(h('rw-radio',{
                    props : {
                        label : item[def.valuecol],
                        value : item[def.idcol]
                    }
                 }));
             }
              this.processBindings(props,def,data);
              return h('rw-radio-group',{
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
             },radios);
          }*/

    }
};