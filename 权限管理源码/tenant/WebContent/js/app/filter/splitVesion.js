define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('splitVesion', [ function($rootScope,$http) {
        return function(item){
        	
        		if(!item){
        			return "";
        		}
        		return item.substring(0,item.lastIndexOf(","));
        	
        };
	}]);
    

});
