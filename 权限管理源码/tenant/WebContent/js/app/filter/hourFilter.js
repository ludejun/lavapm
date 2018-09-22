define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('hourFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        		if(!data && data!=0){
        			return ;
        		}
        		if(data<10){
        			data = "0"+data;
        		}
        		return data+":00~"+data+":59";
        };
	}]);
    

});
