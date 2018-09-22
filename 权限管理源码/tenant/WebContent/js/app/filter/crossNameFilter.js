define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('crossNameFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(name){
        		name+="";
        		if(name =="0"){
        			return "Mobile App"
        		}else if(name =="2"){
        			return "Mobile H5"
        		}else if(name =="1"){
        			return "PC Web"
        		}else{
        			return name;
        		}
        		
        };
	}]);
    

});
