
class RocketTest{


    constructor(){

    }

    setName(v){
        this.name=v;
        return this;
    }

    setSurname(v){
        this.surname=v;
        return this;
    }

    log(){
        console.log(this);
    }


}

class RocketFormField{

    constructor(type,name,label){
        this.type=type;
        this.name=name;
        this.label=label;
        this.validation='required';
        this.options={};
    }

    withName(val){
      this.name=val;
      return this;
    }

    withLabel(val){
        this.label=val;
        return this;
    }

    withOption(key,value){
        console.log(this.options);
        this.options[key]=value;
    }

    //Validation

    withoutValidation(){
        this.validation='';
        return this;
    }

    withValidation(veeValidators){
        this.validation=veeValidators;
        return this;
    }

    withValidationDelay(ms){
        this.withOption('data-vv-delay',ms);
        return this;
    }

    withValidationLabel(val){
        this.withOption('data-vv-as',val);
        return this;
    }

    //Layout classes
    xs(breakpoint){
        this.options['xs']=breakpoint;
        return this;
    }

    sm(breakpoint){
        this.options['sm']=breakpoint;
        return this;
    }

    md(breakpoint){
        this.options['md']=breakpoint;
        return this;
    }

    lg(breakpoint){
        this.options['lg']=breakpoint;
        return this;
    }

    xl(breakpoint){
        this.options['xl']=breakpoint;
        return this;
    }

    offsetXs(breakpoint){
        this.options['offset-xs']=breakpoint;
        return this;
    }

    offsetSm(breakpoint){
        this.options['offset-sm']=breakpoint;
        return this;
    }

    offsetMd(breakpoint){
        this.options['offset-md']=breakpoint;
        return this;
    }

    offsetLg(breakpoint){
        this.options['offset-lg']=breakpoint;
        return this;
    }

    offsetXl(breakpoint){
        this.options['offset-xl']=breakpoint;
        return this;
    }


}


class RocketFormTextField extends RocketFormField{

    constructor(name,label){
        super('text',name,label);
    }

    withHint(val){
        this.withOption('hint',val);
        return this;
    }

    withPersistentHint(val){
        this.withOption('persistentHint',true);
        this.withHint('hint');
        return this;
    }

    withIcon(val){
        this.withOption('prepend-icon',val);
        return this;
    }

    withIconAppended(val){
        this.withOption('append-icon',val);
        return this;
    }

    withPrefix(val){
        this.withOption('prefix',val);
        return this;
    }

    withSuffix(val){
        this.withOption('suffix',val);
        return this;
    }

    makePassword(){
        this.withOption('password',true);
        return this;
    }

    makeMultiLine(){
        this.withOption('multiline',true);
        return this;
    }

    withRows(rows){
        this.withOption('rows',rows);
        return this;
    }

}

class RocketFormSelectField extends RocketFormField{

    constructor(type,name,label){
        super(type,name,label);
        this.idcol='id';
        this.valuecol='text';
    }

    identifiedBy(idKey,valueKey){
        this.idcol=idKey;
        this.valuecol=valueKey;
        return this;
    }

    withItems(valueArr){
        this.items=valueArr;
        return this;
    }

}

class RocketFormSingleOptionField extends RocketFormSelectField{

    constructor(name,label){
        super('single-option',name,label);
    }

}

class RocketFormMultiOptionField extends RocketFormSelectField{

    constructor(name,label){
        super('multi-option',name,label);
    }

}

class RocketFormFileAbstractField extends RocketFormField{

    constructor(type,name,label){
        super(type,name,label);
    }

}

class RocketFormImageOptionField extends RocketFormFileAbstractField{

    constructor(name,label){
        super('image',name,label);
    }

}

class RocketFormImagesOptionField extends RocketFormFileAbstractField{

    constructor(name,label){
        super('images',name,label);
    }

}

class RocketFormFileOptionField extends RocketFormFileAbstractField{

    constructor(name,label){
        super('file',name,label);
    }

}

class RocketFormFilesOptionField extends RocketFormFileAbstractField{

    constructor(name,label){
        super('files',name,label);
    }

}

const rocketFormBuilder={
    text(name, label){
        return new RocketFormTextField(name,label);
    },
    longText(name, label){
        return new RocketFormTextField(name,label).makeMultiLine();
    },
    password(name, label){
        return new RocketFormTextField(name,label).makePassword();
    },
    singleOption(name, label){
        return new RocketFormSingleOptionField(name,label);
    },
    multiOption(name, label){
        return new RocketFormMultiOptionField(name,label);
    },
    file(name, label){
        return new RocketFormFileOptionField(name,label);
    },
    files(name, label){
        return new RocketFormFilesOptionField(name,label);
    },
    image(name, label){
        return new RocketFormImageOptionField(name,label);
    },
    images(name, label){
        return new RocketFormImagesOptionField(name,label);
    },
};



export const RocketFormBuilder = {};

RocketFormBuilder.install = function (Vue, options) {

    Vue.prototype.$rf = rocketFormBuilder;

};