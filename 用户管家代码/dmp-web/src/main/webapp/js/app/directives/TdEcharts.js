define(['app','angularAMD','mint','app/controllers/common/EchartsOptions'], function (app,angularAMD,tarTheme,EchartsOptions) {
    'use strict';
    angularAMD.directive('tdEcharts', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			struct:"=",
    		},
    		link: function(scope, elem, attrs) {
    			var $elem = $(elem);
    			var hg = $elem.height();
    			scope.$watch('struct',function() {
    				if(scope.struct){
    					var html = '<div class="no-portrait">';
		  				html += '<div class="img"></div>';
		  				html += '<div class="text">暂无数据</div>';
		  				html += '</div>';
		  				
    					if(!$.isNullObj(scope.struct)){
    						var edata= {};
            				angular.copy(scope.struct,edata);
            				if(edata.hasOwnProperty('series')){
            					var oDiv = document.getElementById($elem.attr("id"));
                				var myChart = echarts.init(oDiv);
                				myChart.setOption(edata);
                				
            					if(edata.series[0].type == 'map'){//中国地图
            						if(edata.series[0].data.length == 0){
            							var provinceHtml = '<dt class="clrfix">省份分布Top10</dt>';
            							provinceHtml += '<dd>'+html+'</dd>';
            							if($elem.next().length > 0){
            								$elem.next().html(provinceHtml);
            							}else{
            								$elem.html(html);
            							}
            						}else{
            							//$elem.next().html(EchartsOptions.chinaMapRankingHtml(edata.series[0].data,10));
            						}
                				}else if(edata.series[0].type == 'force'){//关联度
                					myChart.setTheme(tarTheme);//设置主题
                				}
                				
            				}else{
            					$elem.html('<div class="ta-c" style="line-height:'+hg+'px">暂无数据</div>');
            				}
    					}else{
    						$elem.html('<div class="ta-c" style="line-height:'+hg+'px">加载中</div>');
    					}
    					
    				}else{
    					$elem.html('<div class="ta-c" style="line-height:'+hg+'px">加载中</div>');
    				}
    				
    			},true);
		    }
    	}
    });
});
