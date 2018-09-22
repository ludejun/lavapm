define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('isNullz0null', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item==null||item=='null'){
        			return "0";
        		}
        		return item;
        	
        };
	}]);
    

});
