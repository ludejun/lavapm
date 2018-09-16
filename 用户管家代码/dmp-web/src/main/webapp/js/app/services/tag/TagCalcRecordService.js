define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('TagCalcRecordService', ['Restangular', 'CommonService', function (Restangular, CommonService) {
	var base = Restangular.all('/tag/tagCalcRecords');
    return {
	    query : function(params) {
	    	return base.getList(CommonService.buildQueryParams(params));			
		},
		create : function(tagCalcRecord) {
			return base.post(tagCalcRecord, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			var random = CommonService.getRandomNum(1,100000000);
			return Restangular.one('/tag/tagCalcRecords', id).customGET("", {random: random});
		},
		update : function(tagCalcRecord) {
			return tagCalcRecord.put();
		},
		remove : function(tagCalcRecord) {
			return tagCalcRecord.remove();
		},
		getTagForTagCalcRecordDisplay : function(tagCalcRecordId){//子节点类型：TR,TM  有子节点：TB,TC
			return Restangular.one('/tag/tagCalcRecords/tagForTagCalcRecordDisplay', tagCalcRecordId).get();
		}
    };
  }]);
});

