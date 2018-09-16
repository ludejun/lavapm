seajs.config({
    base : "http://www.datamarket.com/js",//基础路径
    paths : {//路由配置自由----配置路径开发--书写规则带上key值标识使用其路径
        target : "http://www.datamarket.com/js"
    },
    alias : {//别名配置,路径走的是基础路径配置
        ui : "ui/ui",
        base : "base/base"
    }
})
seajs.use(["target/login/login_main"])
