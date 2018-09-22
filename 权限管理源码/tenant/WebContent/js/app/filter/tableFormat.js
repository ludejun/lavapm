define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('tableFormat', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(data){
        	if(!data){
        		return;
        	}
        	var dataArr = data.split("^");
        	if(dataArr.length<=1){
        		if(data == "0"){
        			return "0.00 %";
        		}
        		return data+" %";
        	}else{
        		if(dataArr[0] == "0.00"){
        			dataArr[0] = "0";
        		}
        		if(dataArr[1] == "0"){
        			dataArr[1] = "0.00"
        		}
        		if(dataArr[1].split(".").length<2){
        			dataArr[1] = dataArr[1] +".00";
        		}
        		if(dataArr[1].split(".")[1].length==1){
        			dataArr[1] = dataArr[1] +"0";
        		}
        		return dataArr[0]+" ("+dataArr[1]+"%"+")";
        	}
        };
	}]);
    

});
