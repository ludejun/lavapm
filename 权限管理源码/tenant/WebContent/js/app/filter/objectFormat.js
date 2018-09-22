define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('objectFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	if(!data){
        		return;
        	}
        	if(typeof data === "object" && !(data instanceof Array)){
        		
        		var hasProp = false;
        		var num ="0";
        		for (var prop in data.value){
        			hasProp = true;
        			break;
        		}
        		if (hasProp){
        			num = data.metrics[0].value;
        		}
        		return num;
        	}else{
        		return data;
        	}
        }
	}]);
    

});
