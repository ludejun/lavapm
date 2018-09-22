define(['app'], function (app) {
  'use strict';
  app.filter('DateFormatDefault',function(){
	    return function(d){
	    	var formatStr = ""; 
	    	if(d != null){
	    		var sign = '/';
		    	var myDate = new Date(d);
		    	var fullYear = myDate.getFullYear();
		    	var month = myDate.getMonth()+1; 
		    	var date = myDate.getDate(); 
		    	var hours = myDate.getHours();       //获取当前小时数(0-23)
		    	var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
		    	var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
		    	//myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		    	if(sign == undefined){
		    		sign = '';
		    	}
		    	if(month < 10){
		    		month = '0' + month;
		    	}
		    	if(date < 10){
		    		date = '0' + date;
		    	}
		    	if(hours < 10){
		    		hours = '0' + hours;
		    	}
		    	if(minutes < 10){
		    		minutes = '0' + minutes;
		    	}
		    	if(seconds < 10){
		    		seconds = '0' + seconds;
		    	}
		    	formatStr = fullYear + sign + month + sign + date;
		    	//formatStr.ymd = fullYear + sign + month + sign + date;
		    	formatStr = formatStr + ' ' + hours + ':' + minutes + ':' + seconds;
	    	}
	    	return formatStr;
	    }
  });
  
  app.filter('DateFormatYYYYMMDD',function(){
	    return function(d){
	    	var formatStr = ""; 
	    	if(d != null){
	    		var sign = '/';
		    	var myDate = new Date(d);
		    	var fullYear = myDate.getFullYear();
		    	var month = myDate.getMonth()+1; 
		    	var date = myDate.getDate(); 
		    	//myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		    	if(sign == undefined){
		    		sign = '';
		    	}
		    	if(month < 10){
		    		month = '0' + month;
		    	}
		    	if(date < 10){
		    		date = '0' + date;
		    	}
		    	
		    	formatStr = fullYear + sign + month + sign + date;
		    	//formatStr.ymd = fullYear + sign + month + sign + date;
	    	}
	    	return formatStr;
	    }
});
  
  app.filter('DictFormatter',function(){
	    return function(dicValue,params){
	    	var dicName = "";
	        var args = Array.prototype.slice.call(arguments);  
	        var dicId = '';
	        if (args.length > 0 && args[1] != undefined) {//args[1]传入的字典参数
	            dicId = args[1];
	            var dictList = appConfig.dicMap[dicId];
	 	    	for(var i = 0; i < dictList.length; i++){
	 	    		if(dictList[i].dicItemKey == dicValue){
	 	    			dicName = dictList[i].dicItemValue;
	 	    		}
	 	    	}
	 	    	return dicName;
	        }
	    }
	});
  
  	app.filter('trusted', ['$sce', function ($sce) {
	    return function(url) {
	        return $sce.trustAsResourceUrl(url);
	    };
	}]);
  	
  	app.filter('pageUrl', [function () {
	    return function(url) {
	        return url.substring(url.indexOf('url=') + 4);;
	    };
	}]);
    app.filter('ExportFilter', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(category){
        	if("0"==category){
            	return "nativepage";
            }else if ("3"==category){
            	return "crosspage";
            }else{
            	return "webpage";
            }
        };
	}]);
});





