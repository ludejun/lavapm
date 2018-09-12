define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CalcObjectService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/admin/calcObjects');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(calcObject) {
			return base.post(calcObject, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/admin/calcObjects', id).get();
		},
		update : function(calcObject) {
			return calcObject.put();
		},
		remove : function(calcObject) {
			return calcObject.remove();
		}    
    };
  }]);
});

