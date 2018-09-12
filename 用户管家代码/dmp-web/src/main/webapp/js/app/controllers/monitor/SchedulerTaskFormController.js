define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/monitor/SchedulerTaskService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams', 'SchedulerTaskService', '$state', function ($scope, $stateParams, SchedulerTaskService, $state) {
    	    	
    	$scope.viewEditSchedulerTask = function(){
    		if($stateParams.schedulerTaskId){
    			SchedulerTaskService.getById($stateParams.schedulerTaskId).then(function(schedulerTask){
        			$scope.schedulerTask = schedulerTask;    			
    			});
    		}
		};
		
		$scope.saveSchedulerTask = function(schedulerTask){
			SchedulerTaskService.update(schedulerTask).then(function(schedulerTask){
				$state.go('schedulerTasks');
			});
		};
		
		$scope.init = function(){
			$scope.schedulerTask;
			$scope.viewEditSchedulerTask();
		};
		
		$scope.init();
		  
    }];
});
