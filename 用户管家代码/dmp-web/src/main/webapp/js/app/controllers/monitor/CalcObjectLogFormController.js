define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/monitor/CalcObjectLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams', 'CalcObjectLogService', '$state', function ($scope, $stateParams, CalcObjectLogService, $state) {
    	$scope.viewEditCalcObjectLog = function(){
    		if($stateParams.calcObjectLogId){
    			CalcObjectLogService.getById($stateParams.calcObjectLogId).then(function(calcObjectLog){
        			$scope.calcObjectLog = calcObjectLog;    			
    			});
    		}
		};
		
		$scope.saveCalcObjectLog = function(calcObjectLog){
			CalcObjectLogService.update(calcObjectLog).then(function(calcObjectLog){
				$state.go('calcObjectLogs');
			});
		};
		
		$scope.init = function(){
			$scope.calcObjectLog;
			$scope.viewEditCalcObjectLog();
		}
		
		$scope.init();
    }];
});
