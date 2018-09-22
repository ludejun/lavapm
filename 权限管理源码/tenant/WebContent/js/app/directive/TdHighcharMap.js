define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdHighcharMap', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			struct:"=",
    		},
    		link: function(scope, elem, attrs) {
    			scope.$watch('struct',function() {
    				if(scope.struct){
    					var hdata= {};
        				angular.copy(scope.struct,hdata)
        				$(elem).highmaps("Map",hdata);
    				}
    			},true);
		    }
    	}
    });
});
