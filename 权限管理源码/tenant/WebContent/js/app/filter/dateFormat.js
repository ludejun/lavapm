define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('dateFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        	if(!date){
        		return;
        	}
        	date= date+"";
        	var dateArr = date.split("-");
        	if(dateArr.length>1){
        		return dateArr[0] + "-" +dateArr[1] + "-" +dateArr[2];
        	}else{
        		return date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
        	}
        	
        };
	}]);
    

});
