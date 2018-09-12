define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('UserProfileService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/userProfile/userProfiles');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(userProfile) {
			return Restangular.all('/userProfile/userProfiles').post(userProfile, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one('/userProfile/userProfiles', id).get();
		},
		update : function(userProfile) {
			userProfile.id = userProfile.rowkey;
			//return userProfile.put();
			return Restangular.all('/userProfile/userProfiles/'+userProfile.rowkey).post(userProfile, {}, {'Content-Type' : 'application/json'});
		},
		remove : function(userProfile) {
			return userProfile.remove();
		},
		queryUserProfiles:function(condition,params){
			params = CommonService.buildQueryParams(params);
			return Restangular.one('/userProfile/userProfiles').customPOST(condition, '', {page : params.page,rows : params.rows,q: params.q,crowdId:params.crowdId}, {'Content-Type' : 'application/json'});
		},
		queryUserBehaviors:function(params){
			return Restangular.all('/userProfile/userProfiles/userLogs').getList(CommonService.buildQueryParams(params));
		},
		queryMoreUserBehavior:function(behavior){
//			return Restangular.all('/userProfile/userProfiles/userLogs').customGET("behaviorData", {behaviorType: behavior.behavior_type,rowKey:behavior.rowkey});
			var behaviorData = {behaviorType: behavior.behavior_type, rowKey:behavior.rowkey};
			return Restangular.all('/userProfile/userProfiles/userLogs/behaviorData').post(behaviorData, {}, {'Content-Type' : 'application/json'});
		},
		queryDetail:function(params){
//			return Restangular.all('/userProfile/detail').customGETLIST("products",CommonService.buildQueryParams(params));
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/userProfile/detail').customGET('products',{'userId': params.userId,random: random});
		},
		queryTheadParam:function(paramName){
//			return Restangular.all('/userProfile/detail').customGETLIST("products",CommonService.buildQueryParams(params));
			var random = CommonService.getRandomNum(1,100000000);
//			return Restangular.one('/query').customGET('theadParam',{'paramName': params.paramName,random: random});
			return Restangular.one('/userProfile/query', paramName).get();
//			return  Restangular.one('/query/theadParam', paramName).customGET('paramMap');
		}
    };
  }]);
});

