<script>
    import SGridMixin from './mixins/SGridMixin';

    export default{
        props : {
            definition : {
                required:true,
                type : Array
            },

            value : Object
        },
        mixins : [SGridMixin],
        data(){
           return {
                formData : {}
           }
        },
        created(){

        },
        mounted(){

        },
        methods : {
            renderSection(h,item){
                const children=[];
                if(item.title&&item.instructions){
                    children.push(h('s-cell',{props:item.options},[
                        h('span',{'class':'title'},item.title),
                     //   h('p',{},item.instructions),
                    ]));
                }else if(item.title){
                    children.push(h('s-cell',{props:item.options},[h('p',{'class':'title'},item.title)]));
                }else if(item.instructions){
                    children.push(h('s-cell',{props:item.options},[h('p',{},item.instructions)]));
                }
                return children;
            },
            renderTextInput(h,def,data){
                const props=def.options;
                props.label=def.label;
                props.placeholder='Not provided';
                delete props['value'];
                props['value']=data[def.name];
                const el=h('rw-label',{
                    props,
                },[]);

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            renderLocationInput(h,def,data){
                const props=def.options;
                props.label=def.label;
                delete props['value'];
                let el;
                try{
                    props['value']=JSON.parse(data[def.name]);
                    props['mode']='view';
                    el=h('rw-map',{
                        props,
                    },[]);

                }catch(e){
                    console.error('Invalid JSON: '+data[def.name]);
                    props['value']='Location not set';
                    el=h('rw-label',{
                        props,
                    },[]);
                }
                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])

            },
            renderBooleanInput(h,def,data){
                const props=def.options;
                props.label=def.label;
                props.placeholder='Undetermined';
                delete props['value'];
                let value=data[def.name];

                if(value==true||value===1){
                    if(props.trueDisplayValue){
                        value=props.trueDisplayValue;
                    }else{
                        value='Yes';
                    }

                }else if(value==false||value==null||value===0){ //TODO: Test for null values? False is not the same as null
                    if(props.falseDisplayValue){
                        value=props.falseDisplayValue;
                    }else{
                        value='No';
                    }
                }

                const el=h('rw-label',{
                    props,
                },[value]);

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            renderDateTimeInput(h,def,data){
                const props=def.options;
                if(def.type==='datetime'){
                    props.label=def.dateLabel + ' & ' + def.timeLabel;
                }else{
                    props.label=def.label;
                }
                props.placeholder='Not provided';
                delete props['value'];
                props['value']=data[def.name];
                props['date']=def.type;

                const el=h('rw-label',{
                    props,
                },[]);

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            valueLookup(items,value,idcol,valuecol){
                let temp=items.filter((i)=> {
                    return i[idcol]==value;
                });

                if(temp.length>0){
                    temp=temp[0][valuecol];
                }else{
                    temp=null;
                }
                return temp;
            },
            renderSingleOption(h,def,data){
                const props=def.options;
                props.label=def.label;
                props.placeholder='None';
                delete props['value'];

                let value=null;
                if(data[def.name]&&data[def.name]!==''&&data[def.name]!==null){
                   value=this.valueLookup(def.items,data[def.name],def.idcol,def.valuecol);
                }else{
                    value=this.valueLookup(def.items,0,def.idcol,def.valuecol);//TODO: 0 not the same as null
                }


                const el=h('rw-label',{
                    props,
                },[value]);

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            renderMultiOption(h,def,data){
                const props=def.options;
                props.label=def.label;
                props.placeholder='None';
                delete props['value'];
                let value=[];
                if(data[def.name]&&Array.isArray(data[def.name])&&data[def.name].length>0){
                   for(let v of data[def.name]){
                       const temp=this.valueLookup(def.items,v,def.idcol,def.valuecol);
                       if(temp)
                           value.push(temp);
                   }
                }

                props['value']=value;

                const el=h('rw-label',{
                    props,
                },'');

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            renderFile(h,def,data,type){
                const props=def.options;
                props.label=def.label;
                props.placeholder='None';
                delete props['value'];
                props['file']=type;
                props['value']=data[def.name];

                const el=h('rw-label',{
                    props,
                },[]);

                return h('div',{
                    'class':this.getSGridClasses(def)
                },[el])
            },
            renderScopedSlot(h,def,data){
                const children= this.$scopedSlots[def.name](data);

                return h('div',{
                    'class':this.getSGridClasses(def),
                },children);
            },
            renderElement(h,item){

                if(item.type==='section'){
                    let children=[];
                    if(item.inputs.length>0)
                        children.push(this.renderSection(h,item));
                    for(let subitem of item.inputs){
                        children.push(this.validatedRender(h,subitem));
                    }
                    return children;
                }else if(item.type==='text'){
                    return this.renderTextInput(h,item,this.value);
                }else if(item.type==='location'){
                    return this.renderLocationInput(h,item,this.value);
                }else if(item.type==='single-option'||item.type==='enum'){
                    return this.renderSingleOption(h,item,this.value);
                }else if(item.type==='multi-option'){
                    return this.renderMultiOption(h,item,this.value);
                }else if(item.type==='boolean'){
                    return this.renderBooleanInput(h,item,this.value);
                }else if(item.type==='file'||item.type==='files'||item.type==='image'||item.type==='images'){
                    let type='file';
                    if(item.type==='image'||item.type==='images')
                        type='image';
                    return this.renderFile(h,item,this.value,type);
                }
                else if(item.type==='date'){
                    return this.renderDateTimeInput(h,item,this.value);
                }else if(item.type==='time'){
                    return this.renderDateTimeInput(h,item,this.value);
                }else if(item.type==='datetime'){
                    return this.renderDateTimeInput(h,item,this.value);
                }else if(item.type==='scoped-slot'){
                    return this.renderScopedSlot(h,item,this.value);
                }
            },
            validatedRender(h,item){
                if(!item.options){
                    item.options={};
                }

                if(item.show&&typeof item.show==='function'){
                    if(item.show(this.formData)){
                        return this.renderElement(h,item);
                    }
                }else{
                    return this.renderElement(h,item);
                }

            }
        },
        render(h){
          let children=[];
          for(let item of this.definition){
              children.push(this.validatedRender(h,item));
          }

          return h('s-grid',{},children);
        }
    }
</script>
