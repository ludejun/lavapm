define(['app','angularAMD','app/controllers/common/AzkabanExecFlowController'], function (app,angularAMD,AzkabanExecFlowController) {
    'use strict';
    angularAMD.directive('azkabanExecFlow', function() {
    	return {
    		restrict : 'EA',
    		
    		scope:{
    			struct:"=",
    		},
    		link: function(scope, elem, attrs) {
    			scope.$watch('struct',function() {
    				var hdata= angular.copy(scope.struct);
    				//console.dir(["hdata",hdata]);
    				if(hdata){
    					AzkabanExecFlowController.updateJobRow(hdata.nodes, elem);
        				var flowLastTime = hdata.endTime == -1 ? (new Date()).getTime() : hdata.endTime;
        				var flowStartTime = hdata.startTime;
        				AzkabanExecFlowController.updateProgressBar(hdata, flowStartTime, flowLastTime);
    				}
    				
    			},true);
		    }
    	}
    });
});
