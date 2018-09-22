define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('secToMinFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        		if(date==null){
        			return ;
        		}
        		date=parseInt(date);
        		var hour=0;
        		var minutes=0;
        		var second=date;
        	    if(date >= 60) {
        	    	minutes = parseInt(date/60);
        	        second = parseInt(date%60);
        	            if(minutes >= 60) {
                    	hour = parseInt(minutes/60);
        	            minutes = parseInt(minutes%60);
        	            }
        	    }
                if(minutes<10){
                	minutes = "0" + minutes;
                }
                if(second<10){
                	second = "0" + second;
                }
                if(hour>0){
                	if(hour<10){
                		hour = "0" + hour;
                	}
                	return hour+":"+minutes+":"+second;
                }else{
                	return minutes+":"+second;
                }
        };
	}]);
    

});
