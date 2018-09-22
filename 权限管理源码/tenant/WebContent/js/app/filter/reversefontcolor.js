define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
 
    
    app.filter('reversefontcolor', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(c){
        
            var d;
            if (c < 20) {
                d = "#373c46"
            } else {
                if (c < 40) {
              	  d = "#fff"
                } else {
                    if (c < 60) {
                  	  d = "#fff"
                    } else {
                        if (c < 80) {
                      	  d = "#fff"
                        } else {
                        	  d = "#fff"
                        }
                    }
                }
            }
            return d
};
	}]);
});
