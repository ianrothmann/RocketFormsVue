export default {
    props : {
        createModifiers : Object,
        editModifiers : Object,
        viewModifiers : Object,
        createSlots : Array,
        editSlots : Array,
        viewSlots : Array,
    },
    computed : {
        modifiers(){
            if(this.formType==='edit'){
                return this.editModifiers;
            }else if(this.formType==='add'){
                return this.createModifiers;
            }else if(this.formType==='view'){
                return this.viewModifiers;
            }
        },
        customSlots(){
            if(this.formType==='edit'){
                return this.editSlots;
            }else if(this.formType==='add'){
                return this.createSlots;
            }else if(this.formType==='view') {
                return this.viewSlots;
            }
        }
    },
    data(){
        return {
            serverDefinition : {},
            fieldSet : {}
        }
    },
    methods : {
        createRocketFormDefinition(serverDefinition){
            this.serverDefinition = serverDefinition;

            for (let field of this.serverDefinition.fields){
                this.fieldSet[field.fieldId]=field;
            }

            let fieldCount=0;

            this.createCustomSlots(this.definition);

            for(let groupOrFieldId of this.serverDefinition.groups || []){
                if(typeof groupOrFieldId === 'object'){
                    let groupDefinition={
                        type : 'section',
                        title : groupOrFieldId.label,
                        instructions : groupOrFieldId.description,
                        inputs : []
                    };
                    this.processGroupModifiers(groupDefinition,groupOrFieldId.groupId);
                    for(let fieldId of groupOrFieldId.fields){
                        let field=this.fieldSet[fieldId];
                        groupDefinition.inputs.push(this.createRocketFieldDefinition(field,fieldCount));
                        fieldCount++;
                        this.createCustomSlots(groupDefinition.inputs,fieldId);
                    }
                    this.definition.push(groupDefinition);
                    this.createCustomSlots(this.definition,groupOrFieldId.groupId);
                }else{
                    let field=this.fieldSet[groupOrFieldId];

                    this.definition.push(this.createRocketFieldDefinition(field,fieldCount));
                    fieldCount++;
                    this.createCustomSlots(this.definition,field.fieldId);
                }


            }
        },
        createCustomSlots(definition,after=null){
            if(this.customSlots){
                for(let slot of this.customSlots){
                    if(slot.after===after){
                       definition.push({
                            type:'scoped-slot',
                            name : slot.name
                        });
                    }
                }
            }

        },
        processGroupModifiers(groupDefinition, groupId){
            if(this.modifiers){
                if(this.modifiers[groupId]){
                    const groupModifier=Object.assign({},this.modifiers[groupId]);
                    delete groupModifier['type'];
                    delete groupModifier['inputs'];
                    groupDefinition=Object.assign(groupDefinition,groupModifier);
                }
            }
        },
        createRocketFieldDefinition(field,fieldCount=null){

            let rField={
                type : this.getFieldDataType(field),
                name : field.fieldId,
                label : field.label,
                validation : this.getValidation(field),
                options : {}
            };

            if(fieldCount===0)
                rField['options']['autofocus']=true;

            if(field.dataType==='select'){
                this.createSelect(rField,field);
            }else if(field.dataType==='enum'){
                rField['idcol']=field['valueIdFieldName'];
                rField['valuecol']=field['valueDescriptorFieldName'];
                rField['items']=field['values'];
            }else if(field.dataType==='multiselect'){
               this.createMultiSelect(rField,field);
            }else if(field.dataType==='files'||field.dataType==='file'||field.dataType==='images'||field.dataType==='image'){
                rField['url']=this.url;
                if(field.orderPivotField){
                    rField['options']['re-order']=true;
                }
            }else if(field.dataType==='longtext'){
                rField['options']={
                    multiline : true
                }
            }else if(field.dataType==='boolean'){
                for(let value of field.values){
                    if(value.id===0)
                       rField['options']['falseDisplayValue']=value.text;
                    else if(value.id===1)
                       rField['options']['trueDisplayValue']=value.text;
                }

            }else if(field.dataType==='richtext'){
                rField['options']={
                    multiline : true
                }
            }else if(field.dataType==='datetime'){
                rField['dateLabel']=field.dateLabel;
                rField['timeLabel']=field.timeLabel;
            }else if(field.dataType==='currency'){
                rField['options']={
                    prefix : field.currencySymbol
                };

            }
            this.processFieldModifiers(rField,field.fieldId);


            return rField;
        },
        createSelect(rField,field){
            rField['idcol']=field['valueIdFieldName'];
            rField['valuecol']=field['valueDescriptorFieldName'];
            rField['items']=field['values'];
        },
        createMultiSelect(rField,field){
            rField['idcol']=field['valueIdFieldName'];
            rField['valuecol']=field['valueDescriptorFieldName'];
            rField['items']=field['values'];
        },
        processFieldModifiers(rField, fieldId){
            if(this.modifiers){
                if(this.modifiers[fieldId]){
                    const fieldModifier=Object.assign({},this.modifiers[fieldId]);
                    if(fieldModifier.options){
                        rField['options']=Object.assign(rField['options'],fieldModifier.options);
                        delete fieldModifier['options'];
                    }
                    rField=Object.assign(rField,fieldModifier);
                }
            }
        },
        getFieldDataType(field){
            const dataType=field.dataType;
            if(dataType==='select'){
                return 'single-option';
            }else if(dataType==='multiselect'){
                return 'multi-option';
            }else if(dataType==='longtext'){
                return 'text';
            }else if(dataType==='richtext'){
                return 'text';
            }else if(dataType==='int' || dataType==='decimal' || dataType==='currency'){
                return 'text';
            }else{
                return dataType;
            }
        },
        getValidation(field){
            let valArr=[];
            for(let validator of field.validators){
                if(validator.rule==='rf_server'||validator.rule==='rf_server_express'){
                    valArr.push(validator.rule+':'+field.fieldId);
                }else{
                    valArr.push(validator.rule);
                }

            }
            if(!field.isOptional)
                valArr.push('required');

            return valArr.join('|');
        }
    }
}