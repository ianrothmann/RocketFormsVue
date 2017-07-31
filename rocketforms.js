import Vue from 'vue';

export const RocketFormEventBus = new Vue({
    data : {
        currentID : 0
    },
    methods : {
        getUniqueID(prefix){
            this.currentID++;
            return 'rocketform_'+prefix+this.currentID;
        },
        errorMessage(message){
            this.$emit('errorMessage',message);
        }
    }
});

Vue.component('rocket-view-edit', require('./RocketViewEdit.vue'));
Vue.component('rocket-delete', require('./RocketDelete.vue'));
Vue.component('rocket-form', require('./RocketForm.vue'));
Vue.component('rocket-view', require('./RocketView.vue'));
Vue.component('rocket-form-renderer', require('./renderer/RocketFormRenderer.vue'));
Vue.component('rocket-view-renderer', require('./renderer/RocketViewRenderer.vue'));


/*
window.RocketForm=class RocketForm{
    constructor(items) {
        this.items = items;
    }
};

export class RFSection{
    constructor(title,instructions,inputs) {
        this.title = title;
        this.instructions = instructions;
        this.inputs = inputs;
    }

}

export class RocketFormInput{
    constructor(type,colname,label,validation,options) {
        this.colname = colname;
        this.label = label;
        this.validation = validation;
        this.type = type;
        this.options = options;
    }
}

export class RFText extends RocketFormInput{
    constructor(colname,label,validation,options) {
        super('text',colname,label,validation,options);
    }
}

class RFSelect{
    constructor(colname,label,validation,values,options,descriptioncol,idcol) {
        this.colname = colname;
        this.label = label;
        this.validation = validation;
        this.type = 'select';
        this.values = values;

        this.options = options;
    }
}
*/
