define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    angularAMD.filter('interceptURL', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	return data.indexOf("?url=")>0?data.substring(0,data.indexOf("?url=")):data;
        };
	}]);
    

});




