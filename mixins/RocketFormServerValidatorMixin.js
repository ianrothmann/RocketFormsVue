import {Validator} from 'vee-validate';

export default {
    props : {

    },
    data(){
        return {

        }
    },
    methods : {
        createServerValidator(){
            Validator.remove('rf_server');
            Validator.remove('rf_server_express');

            Validator.extend('rf_server', {
                 getMessage: (field,args,data) => {
                   return data || 'Something went wrong during validation.';
                 },
                 validate: (value,args) => {
                     const data={fieldId:args[0],value,data:this.formStateData};
                     if(this.value){
                         data['id']=this.value;
                     }
                     return this.validateServerSide(data);
                 }
             });

            Validator.extend('rf_server_express', {
                getMessage: (field,args,data) => {
                    return data || 'Something went wrong during validation.';
                },
                validate: (value,args) => {
                    const data={fieldId:args[0],value};
                    if(this.value){
                        data['id']=this.value;
                    }
                    return this.validateServerSide(data);
                }
            });
        },
        validateServerSide(data){
            return this.dataProvider({
                command : 'validate',
                data
            });
        }
    },
    mounted(){
        this.createServerValidator();
    }

}