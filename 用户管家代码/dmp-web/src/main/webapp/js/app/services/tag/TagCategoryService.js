define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('TagCategoryService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/tag/tagCategories');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(tagCategory) {//添加子类别
			return base.post(tagCategory, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/tagCategories', id).customGET("", {random: random});
		},
		update : function(tagCategory) {//标签类别修改
			return tagCategory.put();
		},
		remove : function(tagCategory) {//删除类别
			return tagCategory.remove();
		},
		queryTagCategory : function(params){//标签类别查询，树形结构
			return  Restangular.all('/tag/tagCategories/tree').getList(params);
		},
		queryFirstLevelTagCategory : function(){//查询一级标签类别
			return  Restangular.all('/tag/tagCategories/firstLevelTagCategories/tree').getList();
		},
		queryTagByCategory : function(params){//查询标签分类下的标签
			return  Restangular.one('/tag/tagCategories', params.$params.filter.tagCategoryId).customGETLIST('tags', CommonService.buildQueryParams(params));
		},
		queryAllTagNotTagCategory : function(tagCategoryId){//查询所有不在当前分类下的所有标签
			return  Restangular.one('/tag/tagCategories', tagCategoryId).customGETLIST('tagCategoryWithoutTags');
		},
		queryTagsWithoutTagCategory : function(){//查询当前租户下，未被删除且未分配到任何标签类别下的标签列表
			return  Restangular.all('/tag/tags/withoutTagCategory').getList();
		},
		addTagWithTagCategory:function(params){//标签类别添加标签，参数为Map<String,Object>包含：标签类别ID：tagCategoryId，标签集合：tags
			return Restangular.all('/tag/tagCategories/addTagWithTagCategory').post(params, {}, {'Content-Type' : 'application/json'});
		},
		removeTagWithTagCategory:function(params){//从当前分类下移除标签
			return Restangular.all('/tag/tagCategories/removeTagWithTagCategory').post(params, {}, {'Content-Type' : 'application/json'});
		},
		findTagCategoryInfo : function(id,relType){//查询指定标签类别信息
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/tagCategories/'+id+'/tagCategoryInfo/'+relType+'/relType').customGET("", {random: random});
		},
		buildTagCategoryPie : function(id){//构建标签类别子类别占比数据
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/tagCategories/'+id+'/tagCategoryPie').customGET("", {random: random});
		}
    };
  }]);
});

