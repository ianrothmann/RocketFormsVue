export default {
    data(){
        return {

        }
    },
    methods : {
        prepareDataForSubmission(data){
            let newData=Object.assign({},data);
            Object.keys(this.fieldSet).forEach((fieldId)=>{
                const field=this.fieldSet[fieldId];
                if(field.dataType==='file'||field.dataType==='image'){
                    if(Array.isArray(data[fieldId])){
                        delete newData[fieldId];
                        newData[fieldId]=data[fieldId][0];
                    }
                }else if(field.dataType==='time'){
                    newData[fieldId]=Vue.filter('rwtime')(newData[fieldId]);
                }

                if(field.orderPivotField){
                    const items=data[fieldId];
                    if(Array.isArray(items)){
                        for(let [index,item] of items.entries()){
                            if(!item.pivot)
                                item.pivot=[];

                            item.pivot[field.orderPivotField]=index;
                        }
                    }

                }


            });

            return newData;
        },
        prepareIncomingData(data){
            Object.keys(this.fieldSet).forEach((fieldId)=>{
                const field=this.fieldSet[fieldId];

                if(field.dataType==='file'||field.dataType==='image'){
                    data[fieldId]=[data[fieldId]];
                }else if(field.dataType==='date'){
                    data[fieldId]=Vue.filter('rdate')(data[fieldId],'dbdate');
                }else if(field.dataType==='time'){
                    data[fieldId]=Vue.filter('rdate')(data[fieldId],'time');
                }else if(field.dataType==='datetime'){
                    data[fieldId]=Vue.filter('rdate')(data[fieldId],'dbdatetime');
                }

                if(field.orderPivotField){
                    const items=data[fieldId];
                    if(Array.isArray(items)){
                        items.sort((a,b)=>{
                            return a.pivot[field.orderPivotField]-b.pivot[field.orderPivotField];
                        });
                    }

                }
            });

            return data;
        }
    }
}