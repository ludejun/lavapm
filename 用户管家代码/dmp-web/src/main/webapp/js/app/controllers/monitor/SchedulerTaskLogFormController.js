define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/monitor/SchedulerTaskLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams', 'SchedulerTaskLogService', '$state', function ($scope, $stateParams, SchedulerTaskLogService, $state) {
    	$scope.schedulerTaskLog;    	
    	
    	$scope.viewEditSchedulerTaskLog = function(){
    		SchedulerTaskLogService.getById($stateParams.schedulerTaskLogId).then(function(schedulerTaskLog){
    			$scope.schedulerTaskLog = schedulerTaskLog;    			
			});
		};
		
		$scope.saveSchedulerTaskLog = function(schedulerTaskLog){
			SchedulerTaskLogService.update(schedulerTaskLog).then(function(schedulerTaskLog){
				$state.go('schedulerTaskLogs');
			});
		};
		
		$scope.viewEditSchedulerTaskLog();
		  
    }];
});
