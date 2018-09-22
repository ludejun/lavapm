define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('eventImgFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(type){
        	
        	if(type == "0"){
				return "Developer";
			}else if(type == "1"){
				return "Flexible";
			}else{
				return type;
			}
        	
        };
	}]);
    

});
