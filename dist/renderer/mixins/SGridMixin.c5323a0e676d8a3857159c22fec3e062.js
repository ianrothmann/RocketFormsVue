"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={methods:{getSGridClasses:function(s){function o(o){return void 0!==s.options[o]&&s.options[o]}function t(s,o){return"s-grid-cell-"+s+"-"+o}function e(s,o){return"s-grid-cell-offset-"+s+"-"+o}var f=["s-grid-cell",t("xs",s.options.xs||12),"mb-0","pb-0"];return o("sm")&&f.push(t("sm",s.options.sm)),o("md")&&f.push(t("md",s.options.md)),o("lg")&&f.push(t("lg",s.options.lg)),o("xl")&&f.push(t("xl",s.options.xl)),o("offsetXs")&&f.push(e("sm",s.options.offsetXs)),o("offsetSm")&&f.push(e("sm",s.options.offsetSm)),o("offsetMd")&&f.push(e("md",s.options.offsetMd)),o("offsetLg")&&f.push(e("lg",s.options.offsetLg)),o("offsetXl")&&f.push(e("xl",s.options.offsetXl)),f}}};