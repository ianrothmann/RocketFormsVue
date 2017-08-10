<script>
    import DataProvider from './mixins/RocketFormDataProviderMixin';
    import DataOperations from './mixins/RocketFormDataOperationMixin';
    import ServerValidator from './mixins/RocketFormServerValidatorMixin';
    import {RocketFormEventBus} from './rocketforms';
    export default{
        props : {
            value : {},
            editDefinition : Object
        },
        mixins : [DataProvider,DataOperations],
        data(){
           return {
               formData : {},
               definition : [],
               showDialog : false

           }
        },
        computed : {
            formType(){
                return 'delete';
            },
            descriptor(){

               if(this.definition.recordDescriptor!='')
                return this.formData[this.definition.recordDescriptor];
               else
                return this.formData[this.definition.primaryKey];
            },
            confirmText(){
                return 'Are you sure that you want to delete '+(this.descriptor||'')+'?';
            }
        },
        mounted(){
            if(this.editDefinition){
                this.getData();
            }else{
                this.getDataAndDefinition();
            }
        },
        methods : {
            createRocketFormDefinition(def){
                this.definition=def;
            },
            prepareIncomingData(data){
                this.showDialog=true;
                return data;
            }
        },
         render(h){
            let msgChildren=[];

             msgChildren.push(h('v-card-text',{},this.confirmText),
                 h('v-card-actions',{},[
                     h('v-spacer'),
                     h('v-btn',{
                         props:{
                             error:true,
                             loading:this.loading
                         },
                         on:{
                             click : ()=>{
                                 this.deleteRecord();
                             }
                     }},'Yes'),
                     h('v-btn',{props:{secondary:true},on:{
                         click : ()=>{
                             this.showDialog=false;
                             this.$emit('cancel',this.value);
                         }
                     }
                     },'No'),
                 ]));

            let children=[
                h('v-card',{},[
                    h('v-card-title',{class:'headline'},'Confirm delete'),
                    msgChildren
                ])
             ];

            return h('v-dialog',{
                props : {
                    value : this.showDialog,
                    persistent:true
                },
                on : {

                }
            },children);
        }
    }
</script>
