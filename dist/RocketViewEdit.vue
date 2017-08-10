<script>
    import {RocketFormEventBus} from './rocketforms';
    import DataProviderMixin from './mixins/RocketFormDataProviderMixin';
    export default{
        props : {
            value : {required:true},
            title:{
                type:String,
                required:true
            },
            backButton : Boolean,
            backButtonHint : String,
            canEdit:{
                type:Boolean,
                default:true
            },
            editModifiers : Object,
            viewModifiers : Object,
            editSlots : Array,
            viewSlots : Array,
            menu : Array,
            initialEdit : Boolean
        },
        mixins : [DataProviderMixin],
        data(){
           return {
                editMode:false,
                editDef : {},
                editData : {},
                viewDef : {},
                viewData : {}
           }
        },
        watch:{
           value(){
               if(this.initialEdit){
                   this.editMode=true;
               }else {
                   this.editMode=false;
               }
           }
        },
        created(){
            if(this.initialEdit===true){
                this.editRecord();
            }
        },
        mounted(){
           // this.getDefinitionsAndData();

        },
        methods : {
            /*getDefinitionsAndData(){
                this.dataProvider({
                    'formType':'viewedit',
                    'id' : this.value
                }).then((data)=>{
                   this.editDef=data.edit.def;
                   this.editData=data.edit.data;
                   this.viewDef=data.view.def;
                   this.viewData=data.view.data;
                });
            },*/
            editRecord(){
                this.editMode=true;
            },
            renderBackButton(h){
                if(!this.backButton)
                    return null;

                let data={
                    props:{
                        icon:true
                    },
                    on:{
                        click:()=>{
                            this.$emit('back');
                        }
                    }
                };

                if(this.backButtonHint){

                    data.directives=[
                        {
                            name : 'tooltip',
                            value : {html:this.backButtonHint},
                            arg:'bottom'
                        }
                    ];
                }
                return h('v-btn',data,[h('v-icon',{},'chevron_left')]);
            },
            renderTitle(h){
               return h('v-card-title',{

               },[this.renderBackButton(h),h('div',{class:'headline'},this.title),h('v-spacer'),this.renderMenu(h)]);
            },
            renderMenu(h){
                let menuItems=[];
                if(this.canEdit && !this.editMode){
                    menuItems.push(h('rw-list-item',{
                        props : {
                            title : 'Edit...',
                            icon : 'mode_edit',
                            iconEnd : true
                        },
                        on : {
                            click : ()=>{
                                this.editRecord();
                            }
                        }
                    }));
                }

                if(this.menu){
                    for(let item of this.menu){
                        menuItems.push(h('rw-list-item',{
                            props : {
                                title : item.title
                            },
                            on : {
                                click : ()=>{
                                    const func=item.closure.bind(this,this.value);
                                    func();
                                }
                            }
                        }));
                    }
                }

                if(menuItems.length===0)
                    return '';

                return h('rw-menu',{
                    props:{
                        icon:'more_vert',
                        bottom:true,
                        left:true,
                        origin:"top",
                        light:true
                    }
                },[h('rw-list',{
                    props:{
                        compact : true,
                    }
                },menuItems)]);
            },
            renderView(h){
                const def= h('rocket-view',{
                   props : {
                       url:this.url,
                       value : this.value,
                       viewModifiers : this.viewModifiers,
                       viewSlots : this.viewSlots,
                       //viewDefinition : this.viewDef,
                       //preloadedData : this.viewData,
                   },
                   scopedSlots : this.$scopedSlots,
                });

                return def;
            },
            renderEdit(h){
                const def= h('rocket-form',{
                    props : {
                        url:this.url,
                        value : this.value,
                        editModifiers : this.editModifiers,
                        editSlots : this.editSlots,
                        //manipulationDefinition : this.editDef,
                        //preloadedData : this.editData
                    },
                    on : {
                        saved : (data)=>{
                            this.editMode=false;
                            this.editData=data;
                        },
                        cancel : ()=>{
                            this.editMode=false;
                        }
                    },
                    scopedSlots : this.$scopedSlots,
                });
                return def;
            }
        },
         render(h){
             let children=[
                  this.renderTitle(h)
             ];
             //todo: Currently it does not load its own def
             if(true||this.viewDef.primaryKey&&this.editDef.primaryKey){ //Check that def was loaded
                 if(this.editMode){
                     children.push(h('v-card-text',{},[this.renderEdit(h)]));
                 }else{
                     children.push(h('v-card-text',{},[this.renderView(h)]));
                 }
             }


            return h('v-card',{},children);
        }
    }
</script>
