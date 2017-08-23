<script>
    import InputMixin from './mixins/RocketFormInputMixin';
    import SGridMixin from './mixins/SGridMixin';
    import SingleOptionMixin from './mixins/RocketFormSingleOptionMixin';
    import MultiOptionMixin from './mixins/RocketFormMultiOptionMixin';
    import BooleanMixin from './mixins/RocketFormBooleanMixin';
    import UploadMixin from './mixins/RocketFormUploadMixin';
    import DateTimeMixin from './mixins/RocketFormDateTimeMixin';
    import LocationMixin from './mixins/RocketFormLocationMixin';
    import ScopedSlotMixin from './mixins/RocketFormScopedSlotMixin';

    export default{
        props : {
            definition : {
                required:true,
                type : Array
            },
            value : Object,
            id : {required:true},
            submitButton : String,
            cancelButton : String,
            loading : {
                type : Boolean,
                default : false
            }
        },
        $validates: true,
        mixins : [SGridMixin,InputMixin,SingleOptionMixin,MultiOptionMixin,BooleanMixin,UploadMixin,DateTimeMixin,ScopedSlotMixin,LocationMixin],
        data(){
           return {
               formData : {},
               innerSubmitButton : null
           }
        },
        created(){
            this.syncFormData();
        },
        mounted(){

           this.innerSubmitButton=this.submitButton;
           this.$watch('submitButton', function () {
               this.innerSubmitButton=this.submitButton;
            });

            this.$watch('formData', function () {
                this.$emit('change',this.formData);
            }, {deep:true});

           this.$watch('value', function () {
               this.syncFormData();
               this.$validator.clean();
           }, {deep:true});

           RocketEventHub.$on('validate',(id)=>{
             if(this.id==id){
                this.validate();
             }
           });

            this.$validator.clean();
        },
        methods : {
            validate(){

                this.$validator.validateAll().then(()=>{
                    this.emitValue('valid');
                }).catch((err)=>{
                    console.error(err);
                    let val = {
                        data : {},
                        errors : null
                    };
                    Object.assign(val.data,this.formData);
                    val.errors=this.verrors;
                    this.$emit('invalid',val);
                });
            },
            emitValue(event='input'){
                let val = {};
                Object.assign(val,this.formData);
                this.$emit(event,val);
            },
            assignValue(item){
                if(!this.formData.hasOwnProperty(item.name)){
                    this.$set(this.formData,item.name,item.type==='multi-option'||item.type==='upload'?[]:null);
                }
            },
            syncFormData(){
                this.formData=Object.assign({},this.formData,this.value);
            },
            renderSection(h,item){

                const children=[];
                if(item.title&&item.instructions){
                    children.push(h('s-cell',{props:item.options},[
                        h('span',{'class':'title'},item.title),
                        h('p',{},item.instructions),
                    ]));
                }else if(item.title){
                    children.push(h('s-cell',{props:item.options},[h('p',{'class':'title'},item.title)]));
                }else if(item.instructions){
                    children.push(h('s-cell',{props:item.options},[h('p',{},item.instructions)]));
                }
                return children;
            },
            renderElement(h,item){
                if(item.type!=='section'){
                    //Ensure formData is properly initialised
                    this.assignValue(item);
                }

                if(item.type==='section'){
                    let children=[];
                    children.push(this.renderSection(h,item));
                    for(let subitem of item.inputs){
                        children.push(this.validatedRender(h,subitem));
                    }
                    return children;
                }else if(item.type==='text'){
                    return this.renderTextInput(h,item,this.formData);
                }else if(item.type==='location'){
                    return this.renderLocationInput(h,item,this.formData);
                }else if(item.type==='single-option'){
                    return this.renderSingleOption(h,item,this.formData);
                }else if(item.type==='multi-option'){
                    return this.renderMultiOption(h,item,this.formData);
                }else if(item.type==='boolean'){
                    return this.renderBooleanInput(h,item,this.formData);
                }else if(item.type==='file'||item.type==='files'||item.type==='image'||item.type==='images'){
                    return this.renderUploadInput(h,item,this.formData);
                }else if(item.type==='date'){
                    return this.renderDateInput(h,item,this.formData);
                }else if(item.type==='time'){
                    return this.renderTimeInput(h,item,this.formData);
                }else if(item.type==='datetime'){
                    return this.renderDateTimeInput(h,item,this.formData);
                }else if(item.type==='scoped-slot'){
                    return this.renderScopedSlot(h,item,this.formData);
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

            },
            renderButton(h){
                if(this.innerSubmitButton&&this.definition.length>0){
                    let buttons=[];
                    buttons.push(h('rw-btn',{
                        props:{
                            primary:true,
                            disabled : this.loading
                        },
                        on : {
                            click : ()=>{
                                this.validate();
                            }
                        }
                    },this.innerSubmitButton));

                    if(this.cancelButton){
                        buttons.push(h('rw-btn',{
                            props:{
                                secondary:true,
                                disabled : this.loading
                            },
                            on : {
                                click : ()=>{
                                    this.$emit('cancel',this.formData);
                                }
                            }
                        },this.cancelButton));
                    }
                    return buttons;
                }else{
                    return null;
                }

            }
        },
        render(h){
            let children=[];
            for(let item of this.definition){
                children.push(this.validatedRender(h,item));
            }
            children.push(this.renderButton(h));

          return h('s-grid',{},children);
        }
    }
</script>
