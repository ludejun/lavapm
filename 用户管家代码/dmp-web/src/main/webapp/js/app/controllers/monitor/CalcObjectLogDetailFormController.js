define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/monitor/CalcObjectLogDetailService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams', 'CalcObjectLogDetailService', '$state', function ($scope, $stateParams, CalcObjectLogDetailService, $state) {
    	$scope.viewEditCalcObjectLogDetail = function(){
    		if($stateParams.calcObjectLogDetailId){
    			CalcObjectLogDetailService.getById($stateParams.calcObjectLogDetailId).then(function(calcObjectLogDetail){
        			$scope.calcObjectLogDetail = calcObjectLogDetail;    			
    			});
    		}
		};
		
		$scope.saveCalcObjectLogDetail = function(calcObjectLogDetail){
			CalcObjectLogDetailService.update(calcObjectLogDetail).then(function(calcObjectLogDetail){
				$state.go('calcObjectLogDetails');
			});
		};
		
		$scope.init = function(){
			$scope.calcObjectLogDetail;
			$scope.viewEditCalcObjectLogDetail();
		}
		
		$scope.init();
    }];
});
