define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('TagService', ['Restangular', 'CommonService', '$q', function (Restangular, CommonService, $q) {
	var base = Restangular.all('/tag/tags');
	var tagMetadata = null;
    return {
	    query : function(params) {
	    	return Restangular.all('/tag/tags/tagWithTagCategory').getList(CommonService.buildQueryParams(params));			
		},
		create : function(tag) {
			return base.post(tag, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/tags', id).customGET("", {random: random});
		},
		update : function(tag) {
			return tag.put();
		},
		remove : function(tag) {
			return Restangular.one('/tag/tags', tag.id).customDELETE();
			//return tag.remove();
		},
		recalculateTag:function(tag){
			return Restangular.all('/tag/tags/restart').post(tag, {}, {'Content-Type' : 'application/json'});
		},
		queryAllTagList : function(params) {//所有标签
	    	return Restangular.all('/tag/tags').getList(params);			
		},
		queryAllEffectTagList : function(params) {//所有有效的标签
	    	return Restangular.all('/tag/tags/effectTag').getList(params);			
		},
		getTagWithScale : function(tagId) {
	    	return Restangular.one('/tag/tags', tagId).customGET('scale');		
		},
		queryByCategory : function(categoryId) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		queryAllExternTagList : function(params) {//所有第三方标签
	    	return Restangular.all('/tag/externTags').getList(params);			
		},
		_checkMetaAttributeGroupMap:function(attributeGroupType){
			var has = false;
			if(tagMetadata && tagMetadata.crowdModel && tagMetadata.crowdModel.metaAttributeGroupMap){
				var metaAttributeGroupMap = tagMetadata.crowdModel.metaAttributeGroupMap;
				for(var o in metaAttributeGroupMap){
					if(o && o.indexOf(attributeGroupType) != -1){
						has = true;
						break;
					}
				}
			}
			return has;
		},
		getTagMetadata : function(attributeGroupType){
			var deferred = $q.defer();
			var has = this._checkMetaAttributeGroupMap(attributeGroupType);
			if(has){
				deferred.resolve(tagMetadata);
    			return deferred.promise;
			} else {
				var random = CommonService.getRandomNum(1,100000000);
				Restangular.all('/tag').customGET('metadata/'+attributeGroupType,{random: random}).then(function(result){    	
					if(result){
						if(tagMetadata && tagMetadata.crowdModel && 
								tagMetadata.crowdModel.metaAttributeGroupMap && 
								result.crowdModel && result.crowdModel.metaAttributeGroupMap){
							var resultMetaAttributeGroupMap = result.crowdModel.metaAttributeGroupMap;
							for(var o in resultMetaAttributeGroupMap){
								tagMetadata.crowdModel.metaAttributeGroupMap[o] = resultMetaAttributeGroupMap[o];
							}
							tagMetadata.crowdModel.metaAccountMap = result.crowdModel.metaAccountMap;
						}else{
							tagMetadata = {
								operatorModel : result.operatorModel,
								crowdModel : result.crowdModel
							};
						}
	    				deferred.resolve(tagMetadata);
					}		
    			});
    			return deferred.promise;
			}
		},
		queryTagByDmpTagType : function(dmpTagType) {
	    	return Restangular.one('/crowd/crowds', dmpTagType).customGET('queryWithDMPTagType');		
		},
		testJson:function(json){
			return Restangular.all('/tag/testjson').post(json, {}, {'Content-Type' : 'application/json'});
		},
		goCalcObjectLog : function(tagId) {
			var random = CommonService.getRandomNum(1,100000000);
	    	return Restangular.one('/tag/tags/bizObjectTableName', 'TD_TAG').one('bizObjectId', tagId).one('objectCode', 'TagCalcETL').customGET('clacObjectLog', {random: random});		
		},
		/*//查询标签节点运行记录,需要参数：调度ID
		queryTagNodeRunRecord : function(scheduleId) {
			return Restangular.one('http://172.30.4.217:8082/batchmanager-web/scheduler/calcExecution/calcExecution/', scheduleId).get();
		},
		//查询节点运行日志,需要两个参数："execId": 1696,"name": "init"
		queryTagNodeRunRecordLog : function(params) {
			base = Restangular.all('http://172.30.4.217:8082/batchmanager-web/scheduler/calcExecution/calcExecution');
			return base.post(params, {}, {'Content-Type' : 'application/json'});
		}*/
		queryTagsForDefinition : function(params) {
	    	return Restangular.all('/tag/tags/fastQuery').getList(params);			
		},
    };
  }]);
});

