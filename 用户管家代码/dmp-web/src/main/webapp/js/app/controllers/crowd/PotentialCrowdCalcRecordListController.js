define(['angularAMD', 'app/services/admin/TaskCalcRecordService','app/directives/AzkabanExecFlowDirective','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','TaskCalcRecordService', '$state','NgTableParams', '$location', '$stateParams', function ($scope,TaskCalcRecordService,$state,NgTableParams,$location,$stateParams) {    
    	$scope.init = function(){
    		$scope.potentialCrowdId = $stateParams.potentialCrowdId;
    		$scope.potentialCrowdName = $stateParams.potentialCrowdName;
    		$scope.taskType = $stateParams.taskType;
    		//
    		$scope.buildCalcDetail($scope.potentialCrowdName);
    		
    		//
    		$scope.getpotentialCrowdCalcRecordDisplay($scope.potentialCrowdId);
    		
    	};
    	
    	$scope.buildCalcDetail = function(potentialCrowdName){
			var html = "";
			html += '<div class="tip-box">' + potentialCrowdName + '</div>';
			$("#potentialCrowd_name").html(html);
//			$.help_float();
		}
    	
    	$scope.getpotentialCrowdCalcRecordDisplay = function(potentialCrowdId){
    		TaskCalcRecordService.queryTaskCrowdCalcRecords(potentialCrowdId, "PotentialCrowdCalcRecord").then(function(potentialCrowdCalcRecords){
				$scope.potentialCrowdCalcRecordList = potentialCrowdCalcRecords;
				
				$scope.azkabanExecFlow = {};
				for(var i = 0; i < $scope.potentialCrowdCalcRecordList.length; i++){
					$scope.potentialCrowdCalcRecordList[i].show = false;
					if(i == 0){
						$scope.potentialCrowdCalcRecordList[i].show = true;
					}
					$scope.queryAzkabanExecflow($scope.potentialCrowdCalcRecordList[i]);
					
        			var startTime = $scope.potentialCrowdCalcRecordList[i].startTime == null ? "" : $scope.potentialCrowdCalcRecordList[i].startTime;
        			var finishTime = $scope.potentialCrowdCalcRecordList[i].finishTime == null ? "" : $scope.potentialCrowdCalcRecordList[i].finishTime;
        			var times = "";
        			if(startTime == ""){//如果没有结束时间，结束时间取当前时间
        				times = "";
        			}else{
        				times = $.calculateTimes(startTime,finishTime);
        			}
        			$scope.potentialCrowdCalcRecordList[i].times = times;
        		}
	    		
			});
		}
    	
    	$scope.queryAzkabanExecflow = function(potentialCrowdCalcRecord){
    		TaskCalcRecordService.fetchExecFlow(potentialCrowdCalcRecord.id).then(function(azkabans){
				$scope.azkabanExecFlow[potentialCrowdCalcRecord.id] = azkabans;
			});
    	}
    	
    	$scope.showHideAzkabanExecflow = function(potentialCrowdCalcRecord){
			for(var i = 0; i < $scope.potentialCrowdCalcRecordList.length; i++){
				if(potentialCrowdCalcRecord.id == $scope.potentialCrowdCalcRecordList[i].id){
					potentialCrowdCalcRecord.show = !potentialCrowdCalcRecord.show;
				}else{
					$scope.potentialCrowdCalcRecordList[i].show = false;
				}
			}
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
    	}
		
		$scope.init();
    }];
});
