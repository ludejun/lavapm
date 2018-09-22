define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('isNullz0', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(!item){
        			return "0";
        		}
        		return item;
        	
        };
	}]);
    

});
