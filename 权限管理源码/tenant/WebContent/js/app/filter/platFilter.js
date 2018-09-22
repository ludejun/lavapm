define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('platFilter', [ function($rootScope,$http) {
        return function(pagename){
        	var split=pagename.split(",");
    		if(split.length>1){
    			if(split[1] == "1"){
    				split[1] = "logo_android_min";
    			}else if(split[1] == "2"){
    				split[1] = "logo_apple_min";
    			}else if(split[1] == "4"){
    				split[1] = "logo_winp_min";
    			}
    			var img = '<img style="vertical-align:middle;" src="images/logo_winp_min.png">';
    			return img+split[0];
    		}else{
    			return pagename;
    		}
        	
        };
	}]);
    

});
