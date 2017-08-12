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




