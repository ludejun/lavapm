define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('DateStrSubstringmin', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        	if(!date){
        		return;
        	}
        	if(20>=date.length){
        		return date;
        	}
        	var len=0;
        	var j=0;
        	for (var i = 0; i < date.length; i++) {
        		var c = date.charCodeAt(i);
                //单字节加1 
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    len++;
                }
                else {
                    len += 2;
                }
                if(len>41){
                	j=i;
                	break;
                }
			}
    		if(len>41){
    			date=date.substring(0,j)+"...";
    		}
    		return date; 
        };
	}]);
    

});
