define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
   
    app.filter('DateStrFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(date){
        	if(!date){
        		return;
        	}
        	var dd;
    		if(date){
    			dd = new Date(date);
    		}else{
    			dd= new Date(); 
    		}
    	    var seperator1 = "-";
    	    var seperator2 = ":";
    		var y = dd.getFullYear(); 
    		var m = dd.getMonth()+1;
    		var d = dd.getDate(); 
    		var h = dd.getHours();
    		var min = dd.getMinutes()
    		var s = dd.getSeconds();
    		if(m<10){
    			m  = "0" + m;
    		}
    		if(d<10){
    			d = "0" + d;
    		}
    		if(h<10){
    			h = "0" + h;
    		}
    		if(min<10){
    			min = "0" + min;
    		}
    		if(s<10){
    			s = "0" + s;
    		}
    		return y+seperator1+m+seperator1+d+" "+h+seperator2+min+seperator2+s; 
        	
        };
	}]);
    

});
