define(['app','angularAMD','highcharts','highcharts-more'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdHighcharts', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			struct:"=",
    		},
    		link: function(scope, elem, attrs) {
    			Highcharts.setOptions({
    		        lang: {
    		        	thousandsSep : ",",
    		        	loading:"加载中",
    		        	noData:"暂无数据",
    		        	//numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
    		        	decimalPoint: '.'
    		        }
    		    });
    			
    			scope.$watch('struct',function() {
    				var hdata= angular.copy(scope.struct);
    				var $elem = $(elem);
    				var hg = $elem.height();
    				//console.dir(["hdata",hdata]);
    				var html = '<div class="no-portrait">';
	  				html += '<div class="img"></div>';
	  				html += '<div class="text">暂无数据</div>';
	  				html += '</div>';
    				if(hdata){
    					//if(hdata.series[0] && hdata.series[0].data && hdata.series[0].data.length == 0){
    					if($.isNullObj(hdata)){
    						html = '<div class="ta-c" style="line-height:'+hg+'px">加载中</div>';
    						$elem.html(html);
    					}else{
    						if(hdata.series.length > 0 && hdata.series[0].data && hdata.series[0].data.length == 0){
    							$elem.html(html);
    						}else{
    							$elem.highcharts(hdata);
    						}
    					}
    				}else{
    					$elem.html('<div class="ta-c" style="line-height:'+hg+'px">加载中</div>');
    				}
    				
    			},true);
		    }
    	}
    });
});
