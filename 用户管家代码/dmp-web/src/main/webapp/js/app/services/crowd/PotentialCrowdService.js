define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('PotentialCrowdService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/crowd/potentialCrowds');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(potentialCrowd) {
			return base.post(potentialCrowd, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/crowd/potentialCrowds', id).get();
		},
		update : function(potentialCrowd) {
			return potentialCrowd.put();
		},
		remove : function(potentialCrowd) {
			return potentialCrowd.remove();
		},
		
		/**
		 * 客群投放
		 */
		launchPotentialCrowd : function(potentialCrowd, dspLaunch){
			dspLaunch.crowdName = potentialCrowd.name;
			return potentialCrowd.post('launchPotentialCrowd', dspLaunch, {}, {'Content-Type' : 'application/json'});
		},
		
		queryAllActivityList : function(params) {
	    	return base.getList(params);			
		},
		queryPtentialCorwdNumbers : function(potentialCrowd){
			return Restangular.one('/crowd/potentialCrowds/potentialInfo', potentialCrowd.id).customGET();
		},
		/**
		 * 查询已投放活动
		 */
		queryDeliveredActivityList : function(potentialCrowd, status) {
			return potentialCrowd.customGET('status/delivered', {
				status : status
			});
		},
		exportPotentialCrowd : function(potentialCrowd){
			return Restangular.one('/crowd/potentialCrowds/exportPotentialCrowd', potentialCrowd.id).customGET();
		}
    };
  }]);
});

