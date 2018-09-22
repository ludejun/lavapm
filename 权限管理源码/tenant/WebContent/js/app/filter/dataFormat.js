define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('dataFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	if(!data){
        		return;
        	}
        	var dataArr = data.split("^");
        	if(dataArr.length<=1){
        		return data+" %";
        	}else{
        		return dataArr[0]+" | "+dataArr[1];
        	}
        };
	}]);
    

});
