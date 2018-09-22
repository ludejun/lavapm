define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('categoryFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(plat){
        	
        	if(plat == "Native" || plat == "0"){
				return "Mobile-APP";
			}else if(plat == "H5"|| plat == "2"){
				return "mobile-h5";
			}else if(plat == "PC"|| plat == "1"){
				return "PCweb";
			}else{
				return plat;
			}
        	
        };
	}]);
    

});
