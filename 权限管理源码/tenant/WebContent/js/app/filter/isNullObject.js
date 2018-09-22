define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('isNullObject', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	var hasProp=false;
			for (var prop in item){
				hasProp = true;
				break;
			}
        	if(hasProp){
        		return item;
        	}else{
        		return "0";
        	}
        };
	}]);
    

});
