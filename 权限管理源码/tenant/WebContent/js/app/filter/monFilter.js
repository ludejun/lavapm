define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('monFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        	if(!date){
        		return;
        	}
        	date= date+"";
        	var dateArr = date.split("-");
        	if(dateArr.length>1){
        		return dateArr[0] + "年" +dateArr[1] + "月";
        	}else{
        		return date.substring(0,4)+"年"+date.substring(4,6)+"月";
        	}
        	
        };
	}]);
    

});
