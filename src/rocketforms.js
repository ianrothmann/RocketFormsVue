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

Vue.component('rocket-view-edit', require('./RocketViewEdit.vue').default);
Vue.component('rocket-delete', require('./RocketDelete.vue').default);
Vue.component('rocket-form', require('./RocketForm.vue').default);
Vue.component('rocket-view', require('./RocketView.vue').default);
Vue.component('rocket-form-renderer', require('./renderer/RocketFormRenderer.vue').default);
Vue.component('rocket-view-renderer', require('./renderer/RocketViewRenderer.vue').default);




