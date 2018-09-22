define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('preFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
    		return (Number(data)*100).toFixed(2)+"%";
        };
	}]);
    

});
