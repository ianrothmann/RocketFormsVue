export default {
    props : {
        url : {
            required:true,
            type : String
        }
    },
    data(){
        return {
            loading : false,
        }
    },
    methods : {
        dataProvider(command){
            this.loading=true;
            return this.$http.post(this.url, command).then((response)=>{
                this.loading=false;
                return response.body;
            });
        }
    },
    mounted(){

    }

}