define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('fileModel', ['$parse',function($parse) {
    	return {
    		restrict : 'EA',
    		
    		/*scope:{
    			struct:"=",
    		},*/
    		link: function(scope, element, attrs) {
    			
    			var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
    			
    			/*scope.$watch('struct',function() {
    				var edata= {};
    				angular.copy(scope.struct,edata);
    				if(edata.hasOwnProperty('series')){
    					var oDiv = document.getElementById($(elem).attr("id"));
        				var myChart = echarts.init(oDiv);
        				myChart.setOption(edata);
        				$(elem).next().html(EchartsOptions.chinaMpaRankingHtml(edata.series[0].markPoint.data,10));
    				}
    				
    			},true);*/
		    }
    	}
    }]);
});
