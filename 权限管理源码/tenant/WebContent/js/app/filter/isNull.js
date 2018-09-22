define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('isNull', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(!item){
        			return "0 | 0.00";
        		}
        		return item;
        	
        };
	}]);
    

});
