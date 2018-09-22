define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('platFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item == 1){
        			return "Android";
        		}else if(item == 2){
        			return "iOS";
        		}else if(item == 4){ 
        			return "WP7"
        		}else if(item == "1,2,4"){
        			return "所有平台" ;
        		}else if(item == "1,2"){
        			return "Android+iOS" ;
        		}; 
        };
	}]);
    
    app.filter('platFormat2', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        		if(item == 1){
        			return '<img src="images/logo_android_min.png" style="vertical-align:middle;height: 26px;margin-top: -2px;"></img> Andriod';
        		}else if(item == 2){
        			return '<img src="images/logo_apple_min.png" style="vertical-align:middle;height: 26px;margin-top: -2px;"></img> iOS';
        		}else if(item == 4){ 
        			return '<img src="images/logo_winp_min.png" style="vertical-align:middle;height: 26px;margin-top: -2px;"></img> WP7'
        		}else if(item == "1,2,4"){
        			return '<img src="images/logo_all_min.png" style="vertical-align:middle;"></img> 所有平台' ;
        		}else if(item == "1,2"){
        			return "Android+iOS" ;
        		}; 
        };
	}]);
    
    app.filter('platFormat3', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        		if(item == 1){
        			return '<img src="images/logo_android_min.png" style="vertical-align:top;height: 30px;margin-top: -5px;"></img>';
        		}else if(item == 2){
        			return '<img src="images/logo_apple_min.png" style="vertical-align:top;height: 30px;margin-top: -5px;"></img>';
        		}else if(item == 4){ 
        			return '<img src="images/logo_winp_min.png" style="vertical-align:top;height: 30px;margin-top: -5px;"></img>'
        		}else if(item == "1,2,4"){
        			return '<img src="images/logo_all_min.png" style="vertical-align:top;"></img>' ;
        		}; 
        };
	}]);
    
    app.filter('categoryFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item == 1){
        			return '<img src="images/PCweb.png" style="vertical-align:middle;height: 30px;margin-top: -2px;"></img> PC Web';
        		}else if(item == 2){
        			return '<img src="images/mobile-h5.png" style="vertical-align:middle;height: 30px;margin-top: -2px;"></img> Mobile H5';
        		}else if(item == 0){ 
        			return '<img src="images/Mobile-APP.png" style="vertical-align:middle;height: 30px;margin-top: -2px;"></img> Mobile App';
        		}else if(item == 3){
        			return '<img src="images/crossIcon.png" style="vertical-align:top;height: 30px;margin-top: -6px;"></img>跨屏' ;
        		}; 
        };
	}]);
    
    app.filter('categoryFormat2', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item == 1){
        			return '<img src="images/PCweb.png" style="vertical-align:top;height: 30px;margin-top: -6px;"></img>';
        		}else if(item == 2){
        			return '<img src="images/mobile-h5.png" style="vertical-align:top;height: 30px;margin-top: -6px;"></img>';
        		}else if(item == 0){ 
        			return '<img src="images/Mobile-APP.png" style="vertical-align:top;height: 30px;margin-top: -6px;"></img>';
        		}else if(item == 3){
        			return '<img src="images/crossIcon.png" style="vertical-align:top;height: 30px;margin-top: -6px;"></img>' ;
        		}; 
        };
	}]);

});
