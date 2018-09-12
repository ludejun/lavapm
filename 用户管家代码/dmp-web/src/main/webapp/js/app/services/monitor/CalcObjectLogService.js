define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CalcObjectLogService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/monitor/calcObjectLogs');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(calcObjectLog) {
			return base.post(calcObjectLog, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/calcObjectLogs', id).customGET("", {random: random});
		},
		update : function(calcObjectLog) {
			return calcObjectLog.put();
		},
		remove : function(calcObjectLog) {
			return calcObjectLog.remove();
		},
		findWithIdAndTenantId : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/calcObjectLogs', id).customGET('tenantId', {random: random});
		},
		queryGroup : function(schedulerTaskLogId) {
			var random = CommonService.getRandomNum(1,100000000);
	    	return base.customGET("groupByExecutorId", {schedulerTaskLogId: schedulerTaskLogId,random:random});		
		},
		queryDistinctName : function(objectType) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/calcObjectLogs/objectType', objectType).customGET("", {random: random});
		}
    };
  }]);
});

