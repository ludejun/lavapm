define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('eventTitleFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(type){
        	
        	if(type == "0"){
				return "系统默认定义事件";
			}else if(type == "1"){
				return "灵动分析自定义事件";
			}else{
				return type;
			}
        	
        };
	}]);
    

});
