define([ 'common', 'app/states/common/state'], function(angularAMD, state) {
	'use strict';
	if(window.parent && window.parent.onHashChange){
		window.addEventListener("hashchange", function(event){
			  window.parent.onHashChange(event);
		});
	}

	var app = angular.module('td.enterprise.analytics', [ 'ui.router','ngTable',
			'mgcrea.ngStrap', 'restangular','ngFileUpload', 'ui.tree','ngSanitize']);
	app.config([
			'$stateProvider',
			'$urlRouterProvider',
			'RestangularProvider',
			function($stateProvider, $urlRouterProvider, RestangularProvider) {
				
				angular.forEach(state, function(item) {
					$stateProvider.state(item.state, angularAMD.route(item));
                });
				
				// // Else
				//$urlRouterProvider.otherwise('/nativepage/usermanage');

//				// set base url
				RestangularProvider.setBaseUrl(appConfig.requestUri);

				// add a response interceptor
				RestangularProvider.addResponseInterceptor(function(data,
						operation, what, url, response, deferred) {
					
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
					var extractedData;
					// .. to look for getList operations
					if (operation === "getList") {
						// .. and handle the data and meta data
						if(data.grid) {
							extractedData = data.rows;
							extractedData.total = data.total;
						} else{
							extractedData = data.data;
						}
						
					} else {
						extractedData = data;
					}
					return extractedData;
				});

			} ])
	.constant('treeConfig', {
		treeClass: 'angular-ui-tree',
		emptyTreeClass: 'angular-ui-tree-empty',
		hiddenClass: 'angular-ui-tree-hidden',
		nodesClass: 'angular-ui-tree-nodes',
		nodeClass: 'angular-ui-tree-node',
		handleClass: 'angular-ui-tree-handle',
		placeholderClass: 'angular-ui-tree-placeholder',
		dragClass: 'angular-ui-tree-drag',
		dragThreshold: 3,
		levelThreshold: 30
    });
	
	return angularAMD.bootstrap(app);
});

/*window.onresize=function(){  
	cal_con_height();//设置页面最小高度，自适应屏幕高度
}  
cal_con_height();//设置页面最小高度，自适应屏幕高度
function cal_con_height(){
	var clientHeight = document.documentElement.clientHeight - 95;
	var content = document.getElementById("content");
	content.style.minHeight = clientHeight +'px';
}*/

window.onresize=function(event){  
	cal_con_height();//设置页面最小高度，自适应屏幕高度
	//console.dir(["event",event]);
	if(window.parent && window.parent.iFrameScrollHeight){
		window.setTimeout(window.parent.iFrameScrollHeight,200);
	}
}  
cal_con_height();//设置页面最小高度，自适应屏幕高度
function cal_con_height(){
	var windowObj = window.parent || window;
	var clientHeight = windowObj.document.documentElement.clientHeight - 55;
	//var clientWidth = document.documentElement.clientWidth;
	var content = document.getElementById("content");
	content.style.minHeight = clientHeight +'px';
	//content.parentElement.style.width = clientWidth - 198 +'px';
}

function resetLocalHash(url){
	window.location.hash = url;
}

function iFrameExternPageHeight(){
	var winHg = $(window).height() - $("#header").height() - 3;
	var ifm = document.getElementById("extern-pages");
	var subWeb = document.frames ? document.frames["extern-pages"].document
			: ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		if (winHg > subWeb.body.clientHeight) {
			ifm.height = winHg;
		}else{
			ifm.height = subWeb.body.clientHeight;
		}
	}
}

function iFrameExternPageScrollHeight() {
	var winHg = $(window).height() - $("#header").height() - 3;
	var ifm = document.getElementById("extern-pages");
	var subWeb = document.frames ? document.frames["extern-pages"].document
			: ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		if(winHg > subWeb.body.scrollHeight){
			ifm.height = winHg;
		}else{
			ifm.height = subWeb.body.scrollHeight;
		}
	}
}
