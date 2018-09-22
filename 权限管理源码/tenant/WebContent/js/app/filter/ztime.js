define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('ztime', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item=="0"){
        			return "00:00";
        		}
        	
        };
	}]);
    

});
