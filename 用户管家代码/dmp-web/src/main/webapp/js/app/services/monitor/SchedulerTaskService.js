define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('SchedulerTaskService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/monitor/schedulerTasks');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(schedulerTask) {
			return base.post(schedulerTask, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/monitor/schedulerTasks', id).get();
		},
		update : function(schedulerTask) {
//			return schedulerTask.put();
			return Restangular.all('/monitor/schedulerTasks/'+schedulerTask.id).customPUT(schedulerTask);
		},
		remove : function(schedulerTask) {
			return schedulerTask.remove();
		},
		queryAllSchedulerTask : function() {
			var random = CommonService.getRandomNum(1,100000000);
			var params = {         
				rows: 10000,
				random:random
			};
	    	return base.getList(params);			
		},
		updateSchedulerTaskStatus : function(schedulerTaskId,action) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/monitor/schedulerTasks', schedulerTaskId).one('action',action).customGET("", {random: random});
		},
		dropDownSchedulerTasks : function() {
			var random = CommonService.getRandomNum(1,100000000);
			var params = {
				random:random
			};
			return Restangular.all('/monitor/schedulerTasks/dropDown/schedulerTasksName').getList(params);			
		}
    };
  }]);
});

