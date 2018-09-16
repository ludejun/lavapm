define(['angularAMD', 'app/filters/common/CommonFilter','app/directives/externPagesDirective'], function (angularAMD) {
    'use strict';
    return ['$scope', '$location', function ($scope, $location) {  
    	$scope.iframe = {};    	
    	$scope.init = function(){
    		$scope.iframe.src = $location.search().url;
    	};		
		$scope.init();
    }];
});
