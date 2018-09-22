define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('Substring4', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item!=null&&item.length>4){
        			return item.substring(0,4)+"...";
        		}else{
        			return item;
        		}
        	
        	
        };
	}]);
    

});
