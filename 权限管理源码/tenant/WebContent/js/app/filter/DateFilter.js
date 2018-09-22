define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('DateFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        	if(!date){
        		return;
        	}
        	var dd;
        	if(date.indexOf("-")>0){
        		var split=date.split("-");
        		if(split[1].length<2){
        			split[1]="0"+split[1];
        		}
        		if(split[2].length<2){
        			split[2]="0"+split[2];
        		}
        		return split[1]+"月"+split[2]+"日"; 
        	}else{
        		return date;
        	}
        };
	}]);
    

});
