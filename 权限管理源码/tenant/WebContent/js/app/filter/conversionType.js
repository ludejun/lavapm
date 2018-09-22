define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('conversionType', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item==0){
        			return "Mobile App";
        		}else if(item==1){
        			return "PC Web";
        		}else if(item=2){
        			return "Mobile H5";
        		}else {
        			return "跨屏";
        		}
        	
        };
	}]);
    

});
