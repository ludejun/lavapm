define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('externPages', ['$parse',function($parse) {
    	return {
    		restrict : 'EA',
    		link: function(scope, element, attrs) {
    			/*var iFrameHeight = function() {
            		var winHg = $(window).height() - 120;
            		var ifm = document.getElementById(attrs.id);
            		if(ifm){
            			ifm.height = winHg;
                		
                		var bHeight = ifm.contentWindow.document.body.scrollHeight;  
                        var dHeight = ifm.contentWindow.document.documentElement.scrollHeight;  
                        var ifmHeight = Math.max(bHeight, dHeight);
                		
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
            	}
                window.setTimeout(iFrameHeight,200);*/
              
		    }
    	}
    }]);
});

//function iFrameHeight(){
//	var winHg = $(window).height() - 120;
//	var ifm = document.getElementById('extern-pages');
//	if(ifm){
//		ifm.height = winHg;
//		
//		var bHeight = ifm.contentWindow.document.body.clientHeight; 
//	    var ifmHeight = bHeight;
//		
//		var subWeb = document.frames ? document.frames['extern-pages'].document
//				: ifm.contentWindow.document;
//		if (ifm != null && subWeb != null) {
//			if (winHg > ifmHeight) {
//				ifm.height = winHg;
//			} else {
//				ifm.height = ifmHeight+1;
//			}
//		}
//	}
//}

