define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('reverse_k', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item!=null&&item.length>3){
        			return item.substring(0,item.length-3)+" K";
        		}else{
        			return item;
        		}
        	
        	
        };
	}]);
    

});
