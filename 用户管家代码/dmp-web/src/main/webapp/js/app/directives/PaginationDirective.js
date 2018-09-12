define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('pagination', ['$parse',function($parse) {
    	return {
    		restrict : 'EA',
    		
    		/*scope:{
    			struct:"=",
    		},*/
    		link: function(scope, element, attrs) {
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
		    },
    		templateUrl: 'html/common/pagination.html'
    	}
    }]);
});
