define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('intFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        		if(!data && data!=0){
        			return ;
        		}
        	return parseInt(data);	
        };
	}]);
    

});
