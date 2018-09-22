define(['app','angularAMD','app/filter/CommonFilter','app/directive/externPagesDirective'], function (app,angularAMD) {
    'use strict';
    return ['$scope', '$location', function ($scope, $location) {  

		$scope.iframe = {};    	
    	$scope.init = function(){
    		$scope.iframe.src = $location.search().url+"#"+$location.hash()+"?hideMenu=true";  //默认隐藏左侧菜单。
    		
    		if(window.parent && window.parent.iFrameExternPageHeight){
				window.setTimeout(window.parent.iFrameExternPageHeight,200);
				if(window.parent.parent && window.parent.parent.iFrameHeight){
					window.setTimeout(window.parent.parent.iFrameHeight,300);
				}
			}else{
				if(window.parent && window.parent.iFrameHeight){
					window.setTimeout(window.parent.iFrameHeight,200);
				}
			}
    	};		
		$scope.init();
		
		//extern-pages iframe 高度自适应
		window.onresize = function(){
			if(window.parent && window.parent.iFrameExternPageHeight){
				window.setTimeout(window.parent.iFrameExternPageHeight,200);
				if(window.parent.parent && window.parent.parent.iFrameHeight){
					window.setTimeout(window.parent.parentt.iFrameHeight,300);
				}
			}else{
				if(window.parent && window.parent.iFrameHeight){
					window.setTimeout(window.parent.iFrameHeight,200);
				}
			}
		};
    }];
});
