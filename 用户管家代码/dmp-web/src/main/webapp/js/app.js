define([ 'common', 'app/states/common/state'], function(angularAMD, state) {
	'use strict';
	window.addEventListener("hashchange", function(event){
		if(window.parent && window.parent.onHashChange){
			window.parent.onHashChange(event);
		}
	});
		
	var app = angular.module('td.enterprise.dmp', [ 'ui.router','ngTable',
			'mgcrea.ngStrap', 'restangular','ngDraggable','ngDraggableDialog']);
	app.config([
			'$stateProvider',
			'$urlRouterProvider',
			'RestangularProvider',
			function($stateProvider, $urlRouterProvider, RestangularProvider) {
				//console.dir(['state', state]);
				angular.forEach(state, function(item) {
					$stateProvider.state(item.state, angularAMD.route(item));
                });
				
				// // Else
				$urlRouterProvider.otherwise('/tag/tags');

//				// set base url
				var urlMap = angular.copy(appConfig.urlMap);
				if(urlMap && urlMap.dmpUrl){
					RestangularProvider.setBaseUrl(urlMap.dmpUrl);
				}else{
					RestangularProvider.setBaseUrl('/dmp-web');
				}

				// add a response interceptor
				RestangularProvider.addResponseInterceptor(function(data,operation, what, url, response, deferred) {
					if(window.parent && window.parent.iFrameHeight){
						window.setTimeout(window.parent.iFrameHeight,500);
					}
					
					var extractedData;
					// .. to look for getList operations
					if (operation === "getList") {
						// .. and handle the data and meta data
						
						if(data.rows){
							extractedData = data.rows;
							extractedData.total = data.total;
						}else{
							extractedData = data;
						}
						
					} else {
						extractedData = data;
					}
					return extractedData;
				});

			} ]);
	
	var result = angularAMD.bootstrap(app);

	return result;
});

