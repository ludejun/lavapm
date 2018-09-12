seajs.config({
	base : "/market/assets/js",//基础路径
	paths : {//路由配置自由----配置路径开发--书写规则带上key值标识使用其路径
		target : "/market/assets/js"
	},
	alias : {//别名配置,路径走的是基础路径配置
		ui : "ui/ui",
		base : "base/base"
	}
})
seajs.use(["target/admin/admin_main"])
