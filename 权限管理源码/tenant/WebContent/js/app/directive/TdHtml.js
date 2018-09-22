define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdHtml', function() {
    	return {
    		restrict : 'EA',
    		scope:{
    			html:"=", //直接渲染html片段  ,如<div data-td-html html={{data}}></div>
    		},
    		link: function(scope, elem, attrs) {
    			$(elem).html(scope.html);
		    }
    	}
    });
});
