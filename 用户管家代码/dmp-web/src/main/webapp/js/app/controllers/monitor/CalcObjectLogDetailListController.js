define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/monitor/CalcObjectLogDetailService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','CalcObjectLogDetailService','$state','NgTableParams', '$location', function ($scope,CalcObjectLogDetailService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                }
            },
            $location.search()), {
                counts: [10, 20, 50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	$location.search(params.url()); 
        			CalcObjectLogDetailService.query(params).then(function(calcObjectLogDetails){
        				params.total(calcObjectLogDetails.total);
                        $defer.resolve(calcObjectLogDetails);
        			});
                }
            });
    	};
    	
		$scope.createCalcObjectLogDetail = function(calcObjectLogDetail){
			CalcObjectLogDetailService.create(calcObjectLogDetail).then(function(calcObjectLogDetail){
				$state.go('calcObjectLogDetails'); // 当为弹出窗口时为 $state.reload(); 
			});
		};
		
		$scope.editCalcObjectLogDetail = function(calcObjectLogDetail){
			CalcObjectLogDetailService.update(calcObjectLogDetail).then(function(calcObjectLogDetail){
				$scope.tableParams.reload();
				$scope.$hide;
			});
		};
		
		$scope.saveCalcObjectLogDetail = function(calcObjectLogDetail){
			calcObjectLogDetail.id === undefined ? $scope.createCalcObjectLogDetail (calcObjectLogDetail) : $scope.editCalcObjectLogDetail (calcObjectLogDetail);
		};
		
		$scope.removeCalcObjectLogDetail = function(calcObjectLogDetail){    		
			CalcObjectLogDetailService.remove(calcObjectLogDetail).then(function(calcObjectLogDetail){
				$scope.tableParams.reload();
			});
		};
		
		$scope.searchCalcObjectLogDetail = function(){    		
			$scope.tableParams.filter({'q' : $scope.searchValue});
		};
		
		$scope.init();
    }];
});
