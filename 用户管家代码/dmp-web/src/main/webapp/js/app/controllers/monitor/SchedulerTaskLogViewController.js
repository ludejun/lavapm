define(['angularAMD','css!../../../../css/app/monitor/monitor', 'app/services/admin/DicService', 'app/services/monitor/SchedulerTaskLogService', 'app/services/monitor/CalcObjectLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'SchedulerTaskLogService','CalcObjectLogService', '$state','NgTableParams', '$location', function ($scope, $stateParams,DicService, SchedulerTaskLogService,CalcObjectLogService, $state,NgTableParams,$location) {
    	$scope.viewEditSchedulerTaskLog = function(){
    		if($stateParams.schedulerTaskLogId){
    			SchedulerTaskLogService.getByIdAndTenantId($stateParams.schedulerTaskLogId).then(function(schedulerTaskLog){
    				$scope.schedulerTaskLog = {};
    				if(schedulerTaskLog != undefined){
    					$scope.schedulerTaskLog = schedulerTaskLog;
    					$scope.schedulerTaskLog.times = $scope.calculateSchedulerTaskLogTimes();
    				}
    			});
			}
		};
		
		$scope.goBackHistory = function() {
			window.history.back();
		}
		
		$scope.calculateSchedulerTaskLogTimes = function(){
			var times = "";
			var startTime = $scope.schedulerTaskLog.startTime == null ? "" : $scope.schedulerTaskLog.startTime;
			var endTime = $scope.schedulerTaskLog.endTime == null ? "" : $scope.schedulerTaskLog.endTime;
			if(startTime != ""){
				times = $.calculateTimes(startTime,endTime);
			}
			return times;
		}
		
		$scope.tabSwitchCondition = function(condition){
			$scope.schedulerTaskLogTab.condition = condition;
		}
		
		$scope.queryCalcObjectLogGroupsByTaskLogId = function(){
			$scope.isGroup = false;
			$scope.calcObjectLogsGroupsList = [];
			CalcObjectLogService.queryGroup($stateParams.schedulerTaskLogId).then(function(response){
				$scope.calcObjectLogsGroupsList = response.datas;
				if(response && response.isGroup){
					$scope.isGroup = true;
	                $scope.rebuildGroup();
				}else{
//					$scope.queryCalcObjectLogByTaskLogId();
				}
				
			});
		}
		
		$scope.rebuildGroup = function(){
			for(var i = 0; i<$scope.calcObjectLogsGroupsList.length;i++){
				$scope.calcObjectLogsGroupsList[i].isShow = true;
				if(i == 0){
					$scope.calcObjectLogsGroupsList[i].isShowChildren = true;
					
				}else{
					$scope.calcObjectLogsGroupsList[i].isShowChildren = false;
				}
				
				for(var j = 0; j<$scope.calcObjectLogsGroupsList[i].calcObjectLogList.length;j++){
					$scope.calcObjectLogsGroupsList[i].calcObjectLogList[j].isShow = true;
				}
			}
		}
		
		$scope.toggleShowHideChildren = function(tc){
			if(tc.isShowChildren){
				tc.isShowChildren = !tc.isShowChildren;
			}else{
				for(var i = 0; i<$scope.calcObjectLogsGroupsList.length;i++){
					$scope.calcObjectLogsGroupsList[i].isShowChildren = false;
				}
				tc.isShowChildren = true;
			}
			
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
		}
		
		$scope.init = function(){
			$scope.schedulerTaskLogId = $stateParams.schedulerTaskLogId || "";
			$scope.sourcePage = $stateParams.sourcePage || "";
			$scope.schedulerTaskLog;
			$scope.schedulerTaskLogTab = {
				condition:'calculate'
			};
			$scope.viewEditSchedulerTaskLog();
			$scope.queryCalcObjectLogGroupsByTaskLogId();
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
