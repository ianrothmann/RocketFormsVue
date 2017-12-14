<script>
    import DataProvider from './mixins/RocketFormDataProviderMixin';
    import FormDefiner from './mixins/RocketFormDefinesFormMixin';
    import DataOperations from './mixins/RocketFormDataOperationMixin';
    import DataPreparation from './mixins/RocketFormDataPreparationMixin';
    import ServerValidator from './mixins/RocketFormServerValidatorMixin';
    import {RocketFormEventBus} from './rocketforms';
    export default{
        props : {
            value : {},
            viewDefinition : Object,
            preloadedData : Object
        },
        mixins : [DataProvider,DataOperations,FormDefiner,DataPreparation],
        data(){
           return {
               formData : {},
               definition : [],
               id : 'id'

           }
        },
        computed : {
            formType(){
                return 'view';
            }
        },
        watch:{
           value(){
               this.getData();
           }
        },
        created(){
           this.id=RocketFormEventBus.getUniqueID();
        },
        mounted(){
            if(this.viewDefinition&&this.preloadedData){
                this.createRocketFormDefinition(this.viewDefinition);
                this.formData=this.prepareIncomingData(this.preloadedData);
            }else if(this.viewDefinition){
                this.createRocketFormDefinition(this.viewDefinition);
                this.getData();
            }else{
                this.getDataAndDefinition();
            }

        },
        methods : {
            createSelect(rField,field){
                rField['type']='text';
                rField['options']['valueProp']=field['valueDescriptorFieldName'];

            },
            createMultiSelect(rField,field){
                rField['type']='text';
                rField['options']['valueProp']=field['valueDescriptorFieldName'];
                rField['items']=[];
            }

        },
         render(h){

             let children=[
                h('rocket-view-renderer',{
                    props : {
                        definition : this.definition,
                        value : this.formData,
                        id : this.id,
                        loading : this.loading
                    },
                    scopedSlots : this.$scopedSlots,
                    on : {

                    }
                }),
                // h('code',{},JSON.stringify(this.formData))
             ];

            return h('div',{},children);
        }
    }
</script>
