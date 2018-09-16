define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CalcObjectLogDetailService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/monitor/calcObjectLogDetails');
    return {
	    query : function(params) {
//	    	return base.getList(CommonService.buildQueryParams(params));
	    	return Restangular.all('/monitor/subCalcObjectLogs').getList(CommonService.buildQueryParams(params));
		},
		create : function(calcObjectLogDetail) {
			return base.post(calcObjectLogDetail, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/monitor/calcObjectLogDetails', id).get();
		},
		update : function(calcObjectLogDetail) {
			return calcObjectLogDetail.put();
		},
		remove : function(calcObjectLogDetail) {
			return calcObjectLogDetail.remove();
		}
    };
  }]);
});

