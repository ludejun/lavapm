define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdChinamapCharts', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			struct:"=",
    		},
    		link: function(scope, elem, attrs) {
    			scope.$watch('struct',function() {
    				var hdata= {};
    				angular.copy(scope.struct,hdata)

    				buildChinaMap.data = hdata;
    	    		buildChinaMap.mapWidth = '100%';
    	    		buildChinaMap.mapHeight = '400';
    	    		$(elem).next().html(buildChinaMap.rankingHtml(15));
    	    		buildChinaMap.build($(elem));
    				
    			},true);
		    }
    	}
    });
});
