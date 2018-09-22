define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('conversionTypeDistribution', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item==1){
        			return "Mobile App";
        		}else if(item==2){
        			return "Mobile H5";
        		}else if(item==3){
        			return "PC Web";
        		}else {
        			return "总计";
        		}
        	
        };
	}]);
    

});
