define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('TaskCalcRecordService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/admin/taskCalcRecords');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(taskCalcRecord) {
			return base.post(taskCalcRecord, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/admin/taskCalcRecords', id).get();
		},
		update : function(taskCalcRecord) {
			return taskCalcRecord.put();
		},
		remove : function(taskCalcRecord) {
			return taskCalcRecord.remove();
		},
		queryTaskCrowdCalcRecords : function(lookalikeCrowdId,taskType) {
			return base.one('refId', lookalikeCrowdId).one('taskType', taskType).get();
		},
		fetchExecFlow : function(taskCalcRecordId,taskType) {
			return base.one('recordId', taskCalcRecordId).customGET('fetchExecFlow');
		}
    };
  }]);
});

