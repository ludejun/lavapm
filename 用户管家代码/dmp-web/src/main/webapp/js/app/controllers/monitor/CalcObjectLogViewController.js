define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/admin/DicService', 'app/services/monitor/CalcObjectLogService', 'app/services/monitor/CalcObjectLogDetailService', 'app/services/monitor/SchedulerTaskLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'CalcObjectLogService','CalcObjectLogDetailService','SchedulerTaskLogService', '$state','NgTableParams', '$location', function ($scope, $stateParams,DicService, CalcObjectLogService,CalcObjectLogDetailService,SchedulerTaskLogService, $state,NgTableParams,$location) {
    	$scope.viewEditCalcObjectLog = function(){
    		if($stateParams.calcObjectLogId){
    			CalcObjectLogService.findWithIdAndTenantId($stateParams.calcObjectLogId).then(function(calcObjectLog){
        			$scope.calcObjectLog = calcObjectLog;    	
        			$scope.calcObjectLog.times = $scope.calculateCalcObjectLogTimes();
        			$scope.querySchedulerTaskLogBySchedulerTaskId();
    			});
    		}
		}
    	
    	$scope.goBackHistory = function() {
			window.history.back();
			//window.history.back();
		}
		
		$scope.tabSwitchCondition = function(condition){
			$scope.calcObjectLogTab.condition = condition;
		}
		
		$scope.calculateCalcObjectLogTimes = function(){
			var times = "";
			var startTime = $scope.calcObjectLog.startTime == null ? "" : $scope.calcObjectLog.startTime;
			var endTime = $scope.calcObjectLog.endTime == null ? "" : $scope.calcObjectLog.endTime;
			if(startTime != ""){
				times = $.calculateTimes(startTime,endTime);
			}
			return times;
		}
		
		$scope.queryCalcObjectLogDetailsByCalcObjectLogId = function(){
			$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                },
                filter : {
                	calcObjectLogId : $stateParams.calcObjectLogId
    			}
            },
            $location.search()), {
                counts: [10,20,50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	//$location.search(params.url()); 
        			CalcObjectLogDetailService.query(params).then(function(subCalcObjectLogs){
        				params.total(subCalcObjectLogs.total);
                        $defer.resolve(subCalcObjectLogs);
        			});
                }
            });
		}
		
		$scope.querySchedulerTaskLogBySchedulerTaskId = function(){
			$scope.schedulerTaskLog;
			SchedulerTaskLogService.getByIdAndTenantId($scope.calcObjectLog.schedulerTaskLogId).then(function(schedulerTaskLog){
    			$scope.schedulerTaskLog = schedulerTaskLog;    			
			});
		}
		
		$scope.init = function(){
			$scope.sourcePage = $stateParams.sourcePage || "";
			$scope.calcObjectLog;
			$scope.calcObjectLogTab = {
				condition : 'calculate'
			}
			$scope.viewEditCalcObjectLog();
			$scope.queryCalcObjectLogDetailsByCalcObjectLogId();
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_BASE_CALC_RECORD_STATUS'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.init();
    		});
    	}
    	$scope.initDicByName();
		  
    }];
});
