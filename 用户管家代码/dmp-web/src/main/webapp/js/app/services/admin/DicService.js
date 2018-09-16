define(['app','ngload!restangular','app/services/common/CommonService'], function (app) {
  'use strict';
  app.factory('DicService', ['Restangular', 'CommonService', '$q', function (Restangular, CommonService, $q) {
	  appConfig.dicMap = appConfig.dicMap || {};
	  return {
		getDicTree :function(){
			return Restangular.one('/admin/dics/name/dicTree').get();
		},
		getDicByName : function(dicNameMap){
    		var deferred = $q.defer();
    		var dicNameStr = "";
    		if(dicNameMap && dicNameMap.dicName){
    			dicNameStr = dicNameMap.dicName;
    		}
    		if(dicNameMap && dicNameMap.metaDicName){
    			if(dicNameStr == ""){
    				dicNameStr = dicNameMap.metaDicName;
    			}else{
    				dicNameStr = dicNameStr + "," + dicNameMap.metaDicName;
    			}
    		}
    		var dicNames = dicNameStr.split(',');
    		var isCached = true;
    		for(var i=0; i<dicNames.length; i++){
    			if(!appConfig.dicMap[dicNames[i]]){
    				isCached = false;
    				break;
    			}
    		}    		
    		if(isCached){
    			deferred.resolve(appConfig.dicMap);
    			return deferred.promise;
    		} else {
    			Restangular.all('/admin/dics/name').post(dicNameMap, {}, {'Content-Type' : 'application/json'}).then(function(result){
//    			Restangular.all('/admin/dics/name').getList(dicNameMap).then(function(result){  
    				for(var i=0; i<dicNames.length; i++){
    					appConfig.dicMap[dicNames[i]] = result[dicNames[i]];
    				}
    				deferred.resolve(appConfig.dicMap); 			
    			});
    			return deferred.promise;
    		}
    	}
    };
  }]);
});

