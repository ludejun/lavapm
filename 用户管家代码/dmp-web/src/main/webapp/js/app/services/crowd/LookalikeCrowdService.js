define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('LookalikeCrowdService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/crowd/lookalikeCrowds');
    return {
	    query : function(params){
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(lookalikeCrowd){
			return base.post(lookalikeCrowd, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/lookalikeCrowds', id).customGET("", {random: random});
		},
		update : function(lookalikeCrowd){
			return lookalikeCrowd.put();
		},
		remove : function(lookalikeCrowd){
			return lookalikeCrowd.remove();
		},
		exportLookalikeCrowd : function(param){
			return Restangular.all('/crowd/lookalikeCrowds/exportLookalikeCrowd').post(param, {}, {'Content-Type' : 'application/json'});
		},
		getLookalikeWithScale : function(lookalikeCrowdId){
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/crowd/lookalikeCrowds', lookalikeCrowdId).customGET('scale', {random: random});		
		},
		reCalCulateLookalikeCrowd:function(lookalikeCrowdId){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/lookalikeCrowds', lookalikeCrowdId).customGET('restart', {random: random});
		},
		//与reCalCulateLookalikeCrowd重复
		restartLookalikeCrowd:function(lookalikeCrowdId){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/lookalikeCrowds', lookalikeCrowdId).customGET('restart', {random: random});
		},
		goCalcObjectLog : function(lookalikeCrowdId) {
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/tag/tags/bizObjectTableName', 'TD_LOOKALIKE_CROWD').one('bizObjectId', lookalikeCrowdId).one('objectCode', 'LOOKALIKECROWDETL').customGET('clacObjectLog', {random: random});		
		},
		queryAllgorithms : function(params){
			var random = CommonService.getRandomNum(1,100000000);
			if(params){
				params.random = random;
			}
	    	return Restangular.all('/crowd/lookalikeCrowds/allAlgorithms').getList(params);			
		}
    };
  }]);
});

