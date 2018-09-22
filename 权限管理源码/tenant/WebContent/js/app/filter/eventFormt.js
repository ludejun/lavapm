define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('eventFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(!item){
        			return "事件名";
        		}else{
        			return item;
        		}
        };
	}]);
    

});
