define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('timeFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	if(!data){
        		return;
        	}
        	var time = Number(data);
			var minute = Math.floor(time/60)-Math.floor(time/3600)*60;  
            var second = Math.floor(time)-Math.floor(time/60)*60;
            if(minute <=9){
            	minute="0"+minute;
            }
            if(second<=9){
            	second="0"+second;
            }
            return minute + " : " +second;
        };
	}]);
    

});
