define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CrowdRelationService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/crowd/crowds');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(crowd) {
			return base.post(crowd, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/crowd/crowds', id).get();
		},
		update : function(crowd) {
			return crowd.put();
		},
		remove : function(crowd) {
			return crowd.remove();
		},
		queryCrowdRelation : function(crowdId){
			return Restangular.one('/crowd/crowds/crowdRelation/', crowdId).customGET();
		}
    };
  }]);
});

