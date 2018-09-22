define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('reverseDoubleToNum', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item==null){
        			return 0;
        		}else{
        			return Number(item);
        		}
        	
        	
        };
	}]);
    

});
