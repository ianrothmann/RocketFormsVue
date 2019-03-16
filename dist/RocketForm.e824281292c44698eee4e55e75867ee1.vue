<script>
    import DataProvider from './mixins/RocketFormDataProviderMixin';
    import FormDefiner from './mixins/RocketFormDefinesFormMixin';
    import DataOperations from './mixins/RocketFormDataOperationMixin';
    import DataPreparation from './mixins/RocketFormDataPreparationMixin';
    import ServerValidator from './mixins/RocketFormServerValidatorMixin';
    import {RocketFormEventBus} from './rocketforms';
    export default{
        props : {
            operation : {
                type : String,
                default : 'edit'
            },
            value : {},
            saveButtonText : String,
            createButtonText : String,
            cancelButtonText : {
               type : String,
               default : 'Cancel'
            },
            manipulationDefinition : Object,
            preloadedData : Object
        },
        mixins : [DataProvider,DataOperations,FormDefiner,DataPreparation,ServerValidator],
        data(){
           return {
               formData : {},
               formStateData : {}, //Current state of rocket form renderer, not validated. Read only
               definition : [],
               id : 'id'

           }
        },
        watch:{
            value(){
                this.getData();
            }
        },
        computed : {
           isEditMode(){
               return this.operation==='edit'||(this.operation==='add-edit'&&this.value);
           },
           formType(){
               return this.isEditMode?'edit':'add';
           }
        },
        created(){
           this.id=RocketFormEventBus.getUniqueID();
        },
        mounted(){
            if(!this.isEditMode&&this.manipulationDefinition) {
                this.createRocketFormDefinition(this.manipulationDefinition);
            }else if(this.isEditMode&&this.manipulationDefinition&&this.preloadedData){
                this.createRocketFormDefinition(this.manipulationDefinition);
                this.formData=this.prepareIncomingData(this.preloadedData);
            }else if(this.isEditMode&&this.manipulationDefinition){
                this.createRocketFormDefinition(this.manipulationDefinition);
                this.getData();
            }else if(this.isEditMode){
                this.getDataAndDefinition();
            }else{
                this.getDefinition();
            }
        },
        methods : {


        },
         render(h){
             let children=[
                h('rocket-form-renderer',{
                    props : {
                        definition : this.definition,
                        value : this.formData,
                        id : this.id,
                        submitButton:this.isEditMode?this.saveButtonText || 'Save':this.createButtonText ||'Create',
                        cancelButton:this.cancelButtonText,
                        loading : this.loading
                    },
                    scopedSlots : this.$scopedSlots,
                    on : {
                        input : (data)=>{this.formData=data;},
                        cancel : (data)=>{
                           this.$emit('cancel',data);
                        },
                        valid : (data)=>{
                            this.formData=data;
                            this.submitData(data);
                        },
                        invalid : (data)=>{
                            RocketFormEventBus.errorMessage('There are some errors on the form.');
                           // this.formData=data.data;//TODO: Temp
                        },
                        change : (data)=>{this.formStateData=data;}
                    }
                }),
                // h('code',{},JSON.stringify(this.formStateData))
             ];

            return h('div',{},children);
        }
    }
</script>
