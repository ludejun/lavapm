define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('SchedulerTaskLogService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/monitor/schedulerTaskLogs');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(schedulerTaskLog) {
			return base.post(schedulerTaskLog, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/schedulerTaskLogs', id).customGET("", {random: random});
		},
		getByIdAndTenantId : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/schedulerTaskLogs', id).customGET('tenantId', {random: random});
		},
		update : function(schedulerTaskLog) {
			return schedulerTaskLog.put();
		},
		remove : function(schedulerTaskLog) {
			return schedulerTaskLog.remove();
		},
		updateSchedulerTaskLogStatus : function(schedulerTaskLogId,action) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/schedulerTaskLogs', schedulerTaskLogId).one('action',action).customGET("", {random: random});
		}
    };
  }]);
});

