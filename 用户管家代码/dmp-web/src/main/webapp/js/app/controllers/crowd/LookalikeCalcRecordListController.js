define(['angularAMD', 'app/services/admin/DicService', 'app/services/admin/TaskCalcRecordService', 'app/services/crowd/LookalikeCrowdService', 'app/services/common/AzkabanService','app/directives/AzkabanExecFlowDirective','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','TaskCalcRecordService','LookalikeCrowdService', 'AzkabanService','$state','NgTableParams', '$location', '$stateParams', function ($scope,DicService,TaskCalcRecordService,LookalikeCrowdService,AzkabanService,$state,NgTableParams,$location,$stateParams) {    
    	$scope.init = function(){
    		$scope.lookalikeCrowdId = $stateParams.lookalikeCrowdId;
    		$scope.lookalikeCrowdName = $stateParams.lookalikeCrowdName;
    		$scope.taskType = $stateParams.taskType;
    		//
    		$scope.buildCalcDetail($scope.lookalikeCrowdName);
    		
    		//
    		$scope.getLookalikeCrowdCalcRecordDisplay($scope.lookalikeCrowdId);
    		
    		$scope.queryLookalikeDetails();
    	};
    	
    	$scope.buildCalcDetail = function(lookalikeCrowdName){
			var html = "";
			html += '<div class="tag tag1 tip-box">' + lookalikeCrowdName + '</div>';
			$("#lookalikeCrowd_name").html(html);
//			$.help_float();
		}
    	
    	$scope.getLookalikeCrowdCalcRecordDisplay = function(lookalikeCrowdId){
    		TaskCalcRecordService.queryTaskCrowdCalcRecords(lookalikeCrowdId, "LookalikeCrowdCalcRecord").then(function(lookalikeCrowdCalcRecords){
				$scope.lookalikeCrowdCalcRecordList = lookalikeCrowdCalcRecords;
				
				$scope.azkabanExecFlow = {};
				for(var i = 0; i < $scope.lookalikeCrowdCalcRecordList.length; i++){
					$scope.lookalikeCrowdCalcRecordList[i].show = false;
					if(i == 0){
						$scope.lookalikeCrowdCalcRecordList[i].show = true;
					}
					$scope.queryAzkabanExecflow($scope.lookalikeCrowdCalcRecordList[i]);
					
        			var startTime = $scope.lookalikeCrowdCalcRecordList[i].startTime == null ? "" : $scope.lookalikeCrowdCalcRecordList[i].startTime;
        			var finishTime = $scope.lookalikeCrowdCalcRecordList[i].finishTime == null ? "" : $scope.lookalikeCrowdCalcRecordList[i].finishTime;
        			var times = "";
        			if(startTime == ""){//如果没有结束时间，结束时间取当前时间
        				times = "";
        			}else{
        				times = $.calculateTimes(startTime,finishTime);
        			}
        			$scope.lookalikeCrowdCalcRecordList[i].times = times;
        		}
	    		
			});
		}
    	
    	$scope.queryAzkabanExecflow = function(lookalikeCrowdCalcRecord){
    		AzkabanService.getAzkabanRecordsByExecId(lookalikeCrowdCalcRecord.execId).then(function(azkabans){
				$scope.azkabanExecFlow[lookalikeCrowdCalcRecord.execId] = azkabans;
			});
    	}
    	
    	$scope.showHideAzkabanExecflow = function(lookalikeCrowdCalcRecord){
			for(var i = 0; i < $scope.lookalikeCrowdCalcRecordList.length; i++){
				if(lookalikeCrowdCalcRecord.id == $scope.lookalikeCrowdCalcRecordList[i].id){
					lookalikeCrowdCalcRecord.show = !lookalikeCrowdCalcRecord.show;
				}else{
					$scope.lookalikeCrowdCalcRecordList[i].show = false;
				}
			}
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
    	}
    	
    	$scope.queryLookalikeDetails = function(){
    		$scope.lookalikeCrowdDetails = {};
    		LookalikeCrowdService.getById($scope.lookalikeCrowdId).then(function(lookalikeCrowd){
    			$scope.lookalikeCrowdDetails = lookalikeCrowd;
    		});
    	}
		
    	$scope.initDicByName = function(){
    		var params = {         
			        dicName : 'LOOKALIKE_CROWD_STATUS,LOOKALIKE_CROWD_CAL_RECORDS_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
