define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
 
    
    app.filter('reverse1', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(c){
        
            var d;
            if (c!="0"&&c < 20) {
                d = "#e3f2fe"
            }else if(c=="0"){
            	 d = "#FFF"
            } else if(c!="0") {
                if (c < 40) {
                    d = "#bcddfe"
                } else {
                    if (c < 60) {
                        d = "#91c9fd"
                    } else {
                        if (c < 80) {
                            d = "#65b3fb"
                        } else {
                        	d = " #43a3fb"
                        }
                    }
                }
            }
            return d
};
	}]);
});
