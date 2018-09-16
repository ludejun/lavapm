define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('externPages', ['$parse',function($parse) {
    	return {
    		restrict : 'EA',
    		link: function(scope, element, attrs) {
    			var iFrameHeight = function() {
            		var winHg = $(window).height() - 120;
            		var ifm = document.getElementById(attrs.id);
            		ifm.height = winHg;
            		
            		var bHeight = ifm.contentWindow.document.body.clientHeight;  
                    //var dHeight = ifm.contentWindow.document.documentElement.scrollHeight;  
                    var ifmHeight = bHeight;//Math.max(bHeight, dHeight);
            		
            		var subWeb = document.frames ? document.frames[attrs.name].document
            				: ifm.contentWindow.document;
            		if (ifm != null && subWeb != null) {
            			if (winHg > ifmHeight) {
            				ifm.height = winHg;
            			} else {
            				ifm.height = ifmHeight;
            			}
            		}
            	}
                window.setTimeout(iFrameHeight,200);
              
		    }
    	}
    }]);
});

