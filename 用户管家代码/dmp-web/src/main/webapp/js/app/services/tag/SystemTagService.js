define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('SystemTagService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/tag/systemTags');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(systemTag) {
			return base.post(systemTag, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/systemTags', id).customGET("", {random: random});
		},
		update : function(systemTag) {
			return systemTag.put();
		},
		remove : function(systemTag) {
			return systemTag.remove();
		},
		queryAllScriptInfoList : function(params) {//获取脚本列表
			return Restangular.all('/tag/systemTags/scriptInfos').getList(params);
		},
		queryAllDatabaseConfigs:function(params){//获取数据源列表
			return Restangular.all('/tag/systemTags/DataSources').getList(params);
		},
		reCalCulatesystemTag:function(systemTagId){//系统标签重新计算
			return Restangular.one('/tag/systemTags', systemTagId).customGET('restart');
		},
		goCalcObjectLog : function(systemTagId) {//查看系统标签计算日志
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/tag/tags/bizObjectTableName', 'TD_SYSTEM_TAG').one('bizObjectId', systemTagId).one('objectCode', 'systemTag').customGET('clacObjectLog', {random: random});		
		}
    };
  }]);
});

