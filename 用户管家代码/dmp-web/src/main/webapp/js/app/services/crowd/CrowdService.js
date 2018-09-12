define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CrowdService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/crowd/crowds');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(crowd) {
			return base.post(crowd, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/crowds', id).customGET("", {random: random});
		},
		update : function(crowd) {
			return crowd.put();
		},
		remove : function(crowd) {
			return crowd.remove();
		},
		queryAllCrowdList : function(params) {
	    	return base.getList(params);			
		},
		queryValidCrowdList : function() {
			var random = CommonService.getRandomNum(1,100000000);
			var params = {
				random:random
			};
	    	return Restangular.all('/crowd/crowds/validCrowdList').getList(params);			
		},
		getCrowdWithScale : function(crowdId) {
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/crowd/crowds', crowdId).customGET('scale', {random: random});		
		},
		checkCrowdRelationIsCompute : function(crowdId){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/crowds/checkCrowdRelationIsCompute/', crowdId).customGET('', {random: random});
		},
		/*exportCrowd : function(crowdId,exportWay,data){
			return Restangular.all('/crowd/crowds/'+crowdId+'/export').post(data, {}, {'Content-Type' : 'application/json'});
		},*/
		exportCrowd : function(crowdId,exportWay,data){
			return Restangular.all('/crowd/crowds/'+crowdId+'/export/'+exportWay + '/exportWay').post(data, {}, {'Content-Type' : 'application/json'});
		},
		/**
		 * 查询已投放活动
		 */
		queryEffectiveExceptself : function(crowd) {
			var random = CommonService.getRandomNum(1,100000000);
			return crowd.customGET('status/effective/exceptself', {random: random});
		},
		/**
		 * 客群投放
		 */
		launchCrowd : function(crowd, dspLaunch){
			dspLaunch.crowdName = crowd.name;
			return crowd.post('launchCrowd', dspLaunch, {}, {'Content-Type' : 'application/json'});
		},
    };
  }]);
});

