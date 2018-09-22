define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('nameFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	if(!data){
        		return;
        	}
        	if(data == "NewUsers"){
        		return "新增用户";
        	}else if(data == "ActiveUsres"){
        		return "活跃用户";
        	}else{
        		return data;
        	}
        };
	}]);
    

});
