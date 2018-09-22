define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('conversionData', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(item){
        	
        		if(item!=null&&item!=""&&item.length==8){
        			var y=item.substring(0,4);
        			var m=item.substring(4,6);
        			var d=item.substring(6,8);
        			return y+"-"+m+"-"+d;
        		}else if(item!=null&&item!=""&&item.length==17){
        			var y=item.substring(0,4);
        			var m=item.substring(4,6);
        			var d=item.substring(6,8);
        			var y1=item.substring(9,13);
        			var m1=item.substring(13,15);
        			var d1=item.substring(15,17);
        			return y+"-"+m+"-"+d+"~"+y1+"-"+m1+"-"+d1;
        		}
        		return item;
        };
	}]);
    

});
