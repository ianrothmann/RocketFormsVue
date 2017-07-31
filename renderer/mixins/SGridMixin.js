export default {
    methods : {
        getSGridClasses(def){
            function isset(val){
                return def.options[val]!==undefined&&def.options[val];
            }

            function createClass(breakpoint,cols){
                return 's-grid-cell-'+breakpoint+'-'+cols;
            }
            function createOffsetClass(breakpoint,cols){
                return 's-grid-cell-offset-'+breakpoint+'-'+cols;
            }
            const classes=[
                's-grid-cell',
                createClass('xs',def.options.xs || 12),
            ];

            if(isset('sm')){
                classes.push(createClass('sm',def.options.sm));
            }
            if(isset('md')){
                classes.push(createClass('md',def.options.md));
            }
            if(isset('lg')){
                classes.push(createClass('lg',def.options.lg));
            }
            if(isset('xl')){
                classes.push(createClass('xl',def.options.xl));
            }

            if(isset('offsetXs')){
                classes.push(createOffsetClass('sm',def.options.offsetXs));
            }
            if(isset('offsetSm')){
                classes.push(createOffsetClass('sm',def.options.offsetSm));
            }
            if(isset('offsetMd')){
                classes.push(createOffsetClass('md',def.options.offsetMd));
            }
            if(isset('offsetLg')){
                classes.push(createOffsetClass('lg',def.options.offsetLg));
            }
            if(isset('offsetXl')){
                classes.push(createOffsetClass('xl',def.options.offsetXl));
            }


           return classes; 
        }
    }
}