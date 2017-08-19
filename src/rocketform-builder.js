class RocketFormRenderableItem{

    onlyShowWhen(closure){
      this.show=closure;
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

class RocketFormSlot extends RocketFormRenderableItem{

    constructor(name){
        super();
        this.type='scoped-slot';
        this.name=name;
    }
}

class RocketFormField extends RocketFormRenderableItem{

    constructor(type,name,label){
        super();
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
        this.options[key]=value;
    }

    withBinding(key,value){
        this.bindings[key]=value;
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
}


class RocketFormTextAbstractField extends RocketFormField{

    constructor(type,name,label){
        super(type,name,label);
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



}

class RocketFormTextField extends RocketFormTextAbstractField{

    constructor(name,label){
        super('text',name,label);
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

class RocketFormDateField extends RocketFormTextAbstractField{

    constructor(name,label){
        super('date',name,label);
    }

    allowBefore(fieldName){
        this.withBinding('allowBefore',fieldName);
        return this;
    }

    allowAfter(fieldName){
        this.withBinding('allowAfter',fieldName);
        return this;
    }
}


class RocketFormTimeField extends RocketFormTextAbstractField{

    constructor(name,label){
        super('time',name,label);
    }

}


class RocketFormDateTimeField extends RocketFormTextAbstractField{

    constructor(name,dateLabel,timeLabel){
        super('datetime',name,dateLabel);
        this.dateLabel=dateLabel;
        this.timeLabel=timeLabel;
    }

    allowBeforeDate(date){
        this.withOption('allowBefore',date);
        return this;
    }

    allowedDates(dates){
        this.withOption('allowedDates',dates);
        return this;
    }

    allowAfterDate(date){
        this.withOption('allowAfter',date);
        return this;
    }

    bindToAllowBefore(fieldName){
        this.withBinding('allowBefore',fieldName);
        return this;
    }

    bindToAllowAfter(fieldName){
        this.withBinding('allowAfter',fieldName);
        return this;
    }
}



class RocketFormBoolField extends RocketFormField{

    constructor(name,label){
        super('boolean',name,label);
    }

    makeCheckbox(){
        this.withOption('checkbox',true);
        return this;
    }

}

class RocketFormSelectField extends RocketFormTextAbstractField{

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

    to(url){
        this.url=url;
        return this;
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

class RocketFormSection extends RocketFormRenderableItem{
    constructor(title){
        super('section');
        this.type='section';
        this.title=title;
    }

    withInstructions(instructions){
        this.instructions=instructions;
        return this;
    }

    withFields(fields){
        this.inputs=fields;
        return this;
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
    file(name, label='File'){
        return new RocketFormFileOptionField(name,label);
    },
    files(name, label='Files'){
        return new RocketFormFilesOptionField(name,label);
    },
    image(name, label='Image'){
        return new RocketFormImageOptionField(name,label);
    },
    images(name, label='Images'){
        return new RocketFormImagesOptionField(name,label);
    },
    check(name, label){
        return new RocketFormBoolField(name,label).makeCheckbox();
    },
    bool(name, label){
        return new RocketFormBoolField(name,label);
    },
    date(name, label='Date'){
        return new RocketFormDateField(name,label);
    },
    time(name, label='Time'){
        return new RocketFormTimeField(name,label);
    },
    dateTime(name, dateLabel='Date',timeLabel='Time'){
        return new RocketFormBoolField(name,dateLabel,timeLabel);
    },
    section(title){
        return new RocketFormSection(title);
    },
    slot(name){
        return new RocketFormSlot(name);
    }
};



export const RocketFormBuilder = {};

RocketFormBuilder.install = function (Vue, options) {

    Vue.prototype.$rf = {builder:rocketFormBuilder};

};