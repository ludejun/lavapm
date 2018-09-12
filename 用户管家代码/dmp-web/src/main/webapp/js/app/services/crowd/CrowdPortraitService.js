define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('CrowdPortraitService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
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
		queryCrowdPortrait : function(crowdId, attribute, viewType, isChangeNullValueFilter, tagRuleId) {
			isChangeNullValueFilter = !!isChangeNullValueFilter;
			if(!tagRuleId){
				tagRuleId = '';
			}
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.all('/crowd').one('crowds', crowdId).one('groupCode', attribute.attributeGroupCode).one('attributeId', attribute.attributeId).one('attributeCode', attribute.attributeCode).customGET('portrait', {'viewType': viewType,'isChangeNullValueFilter':isChangeNullValueFilter,'tagRuleId':tagRuleId,random: random});			
		},
		queryCrowdCityPortrait:function(crowdId, attribute, viewType,cityLevel){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.all('/crowd').one('crowds', crowdId).one('groupCode', attribute.attributeGroupCode).one('attributeId', attribute.attributeId).one('attributeCode', attribute.attributeCode).one('city', cityLevel).customGET('portrait', {'viewType': viewType,random: random});
		},
		queryCityPercent:function(crowdId,attribute){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.all('/crowd').one('crowds', crowdId).one('attributeId', attribute.attributeId).one('attributeCode', attribute.attributeCode).customGET('/city/percent', {random: random});
		},
		queryMaktEffectTrackPortrait : function(dspLaunchId, type, attributeId, dataParam){//营销效果追踪画像
			return Restangular.all('/campaign').one('mktEffectTrack', dspLaunchId).one('type', type).one('attributes', attributeId).customGET('portrait', dataParam);
		},
		getCrowdWithScale : function(crowdId) {
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/crowd/crowds', crowdId).customGET('scale', {random: random});		
		},
		getMaktEffectTrackWithScale : function(crowdId, dataParam) {
	    	return Restangular.one('/campaign/mktEffectTrack', crowdId).customGET('scale', dataParam);		
		},
		queryCrowdAnalysis:function(crowdId,conditions,params){
			return Restangular.one('/crowd/crowds', crowdId).customPOST(conditions, 'crowdAnalysis', {viewType : params.viewType,timeRangeType : params.timeRangeType}, {'Content-Type' : 'application/json'});
		},
		queryCrowdAnalysisIndicators:function(params){
			return Restangular.all('/crowd/crowds/indicators').getList(params);
		},
		queryCube:function(cubeId){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/crowds/cube', cubeId).customGET('', {random: random});		
		},
		queryDimensionEnumValues:function(params){
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/crowd/crowds').customGET('dimensionEnumValues',{'cubeName': params.cubeName,'dimensionName':params.dimensionName,random: random});	
		}
		
    };
  }]);
});

