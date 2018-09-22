define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('platformFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(plat){
        	
        	if(plat == "1"){
				return "logo_android_min";
			}else if(plat == "2"){
				return "logo_apple_min";
			}else if(plat == "4"){
				return "logo_winp_min";
			}else if(plat == "7"){
				return "logo_all_min";
			}else{
				return plat;
			}
        	
        };
	}]);
    

});
