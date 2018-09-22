define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdPanel', function() {
    	return {
    		restrict : 'EA',
    		transclude : true,
    		scope:{
    			title:"@panelTitle",
    			titleHref:"@panelTitleHref",
    			inner : "@panelInner"
    		},
    		templateUrl : "js/app/directive/template/td-panel.html"
    	}
    });
});
