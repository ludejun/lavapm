define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('reverse', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item=="0"){
        			return "";
        		}else{
        			return item;
        		}
        	
        	
        };
	}]);
    

});
