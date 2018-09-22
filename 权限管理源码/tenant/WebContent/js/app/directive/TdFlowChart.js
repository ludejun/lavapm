define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdFlowChart', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			data:"=",
    			tdChange: "&"
    		},
    		templateUrl : "js/app/directive/template/td-flow-chart.html",
    		link: function(scope, elem, attrs) {
    			var callback = function(k,v){
    			   scope.tdChange()(k,v);
				}
    			scope.$watch('data',function() {
    				var fdata= {};
    				
    				if(scope.data&&scope.data.datainfo.length>0){
    					var dataString = JSON.stringify(scope.data.datainfo);
        				render_flow_chart(dataString,callback);
    				}else{
    					var dataString=[{"name":"暂无数据"}]
    					dataString = JSON.stringify(dataString);
    					render_flow_chart(dataString,callback);
    					
    				}
    				
    			},true);
    			
    			
		    }
    	}
    });
});
