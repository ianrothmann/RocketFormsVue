export default {
    data(){
        return {

        }
    },
    methods : {
        getDefinition(prepareDefinition=true){
            return this.dataProvider({
                formType : this.formType,
                command : 'def'
            }).then((result)=>{
                if(prepareDefinition)
                    this.createRocketFormDefinition(result);
                else
                    return result;
            });

        },
        getData(prepareData=true){
            if(!this.value){
                console.error("RocketForm: No record ID provided. Please v-model or bind :value to the ID you want to edit. To add records, change the operation property to 'add' or 'add-edit'");
            }else{
                return this.dataProvider({
                    formType : this.formType,
                    command : 'get',
                    id : this.value
                }).then((data)=>{
                    if(prepareData)
                        this.formData=this.prepareIncomingData(data);
                    else
                        return data;
                });
            }

        },
        submitData(data){
            if(this.isEditMode){
                return this.saveRecord(data);
            }else{
                return this.createRecord(data);
            }
        },
        saveRecord(data){
            this.dataProvider({
                formType : 'edit',
                command : 'save',
                data : this.prepareDataForSubmission(data)
            }).then((data)=>{
                this.formData=this.prepareIncomingData(data);
                this.$emit('saved',data);
            });
        },
        deleteRecord(){
            this.dataProvider({
                formType : 'delete',
                command : 'delete',
                id : this.value
            }).then(()=>{
                this.$emit('delete');
            });
        },
        createRecord(data){
            this.dataProvider({
                formType : 'add',
                command : 'createThenEdit',
                data : this.prepareDataForSubmission(data)
            }).then((data)=>{
                this.prepareDataAndDefinition(data.def,data.data);
                this.$emit('input',this.formData[this.serverDefinition.primaryKey]);
                this.$emit('created',this.formData);
            });
        },
        getDataAndDefinition(){
            if(!this.value){
                console.error("Rocket: No record ID provided. Please v-model or bind :value to the ID you want to edit. To add records, change the operation property to 'add' or 'add-edit'");
            }else{
                return this.dataProvider({
                    formType : this.formType,
                    command : 'defGet',
                    id : this.value
                }).then((data)=>{
                    this.prepareDataAndDefinition(data.def,data.data);
                });
            }
        },
        prepareDataAndDefinition(def,data){
            this.definition=[];
            this.createRocketFormDefinition(def);
            this.formData=this.prepareIncomingData(data);
        }

    }
}