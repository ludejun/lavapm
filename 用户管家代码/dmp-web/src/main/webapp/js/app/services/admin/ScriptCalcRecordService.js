define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('ScriptCalcRecordService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/admin/scriptCalcRecords');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(scriptCalcRecord) {
			return base.post(scriptCalcRecord, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/admin/scriptCalcRecords', id).get();
		},
		update : function(scriptCalcRecord) {
			return scriptCalcRecord.put();
		},
		remove : function(scriptCalcRecord) {
			return scriptCalcRecord.remove();
		},
		downloadScriptCalcRecord : function(calcObject){
			return Restangular.one('/admin/attachments', calcObject.id).customGET('download');
		},
		queryScriptCalcRecords : function(params) {
	    	return Restangular.all('/admin/calcObjects/exportCalcRecord').getList(CommonService.buildQueryParams(params));	
		},
		restartCompute : function(calcObject){
			return Restangular.one('/admin/calcObjects', calcObject.id).customGET('restartCompute');
		}
    };
  }]);
});

