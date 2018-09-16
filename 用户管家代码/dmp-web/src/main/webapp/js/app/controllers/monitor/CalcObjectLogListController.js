define(['angularAMD','css!../../../../css/app/monitor/monitor','app/services/admin/DicService', 'app/services/monitor/SchedulerTaskService','app/services/monitor/CalcObjectLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','SchedulerTaskService','CalcObjectLogService','$state','NgTableParams', '$location', function ($scope,DicService,SchedulerTaskService,CalcObjectLogService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
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
        			CalcObjectLogService.query(params).then(function(calcObjectLogs){
        				params.total(calcObjectLogs.total);
        				$scope.getSummaryByInputParam(calcObjectLogs);
                        $defer.resolve(calcObjectLogs);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    	};
    	
    	$scope.getSummaryByInputParam = function(calcObjectLogs){
    		if(calcObjectLogs && calcObjectLogs.length > 0){
    			for(var i = 0;i < calcObjectLogs.length;i++){
    				var calcObjectLog = calcObjectLogs[i];
    				var inputParam = JSON.parse(calcObjectLog.schedulerInputParam);
    			
    				if(!!inputParam.bizObjectName){
    					calcObjectLog.summary = inputParam.bizObjectName + "-" + calcObjectLog.schedulerTaskName + "任务";
    				} else {
    					calcObjectLog.summary = calcObjectLog.schedulerTaskName + "任务";
    				}
    			}
    		}
    		return calcObjectLogs;
    	}
    	
    	$scope.calNgTableBody = function(){
			if($("#tableParams").attr("freeze") == "true"){
				var windowObj = window.parent || window;
				var winHg = $(windowObj).height();
				var $content = $("#content");
				var $ngTableContainer = $content.find(".ng-table-container");
				var $moreSearchBox = $ngTableContainer.find(".more-search-box");
				var $ngTableHead = $content.find(".ng-table-head");
				var $ngTableBody =  $content.find(".ng-table-body");
				var $operatorPanel = $content.find(".operator-panel");
				var $table = $("#tableParams");
				var $tbody = $table.find("tbody");
				var operatorPanelHg = $operatorPanel.outerHeight();
				var ngTableHeadHg = $ngTableHead.outerHeight();
				var moreSearchBoxHg = $moreSearchBox.outerHeight();
				var ngTableBodyHg = winHg - operatorPanelHg - ngTableHeadHg - moreSearchBoxHg - 40 - 50;
				var tbodyHg = $tbody.height();
				if(tbodyHg == 0){
					$ngTableBody.addClass("ng-table-body-empty");
				}else{
					$ngTableBody.removeClass("ng-table-body-empty");
				}
				$ngTableBody.css({"max-height":ngTableBodyHg+"px"});
				$table.FrozenTable(1,0,0);
			}
		}
    	
		$scope.createCalcObjectLog = function(calcObjectLog){
			CalcObjectLogService.create(calcObjectLog).then(function(calcObjectLog){
				$state.go('calcObjectLogs'); // 当为弹出窗口时为 $state.reload(); 
			});
		};
		
		$scope.editCalcObjectLog = function(calcObjectLog){
			CalcObjectLogService.update(calcObjectLog).then(function(calcObjectLog){
				$scope.tableParams.reload();
				$scope.$hide;
			});
		};
		
		$scope.saveCalcObjectLog = function(calcObjectLog){
			calcObjectLog.id === undefined ? $scope.createCalcObjectLog (calcObjectLog) : $scope.editCalcObjectLog (calcObjectLog);
		};
		
		$scope.removeCalcObjectLog = function(calcObjectLog){    		
			CalcObjectLogService.remove(calcObjectLog).then(function(calcObjectLog){
				$scope.tableParams.reload();
			});
		};
		
		$scope.search = function(){    		
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q': $scope.searchValue,
					'id':$scope.moreSearchCondition.id,
					'objectName':$scope.moreSearchCondition.objectName,
					'objectType':$scope.moreSearchCondition.objectType,
					'objectCode':$scope.moreSearchCondition.objectCode,
					'schedulerTaskId' :$scope.moreSearchCondition.schedulerTaskId,
					'schedulerTaskCode' :$scope.moreSearchCondition.schedulerTaskCode,
					'startTimeStart':$scope.moreSearchCondition.startTimeStart,
	    			'startTimeEnd':$scope.moreSearchCondition.startTimeEnd,
	    			'endTimeStart':$scope.moreSearchCondition.endTimeStart,
	    			'endTimeEnd':$scope.moreSearchCondition.endTimeEnd,
	    			'status':$scope.moreSearchCondition.status,
	    			'creator':$scope.moreSearchCondition.creator,
	    			'createTimeStart':$scope.moreSearchCondition.createTimeStart,
	    			'createTimeEnd':$scope.moreSearchCondition.createTimeEnd
				});
			}else{
				$scope.tableParams.filter({'q' : $scope.searchValue});
			}
		};
		
		$scope.resetMoreSearchCondition = function(resetMoreSearch){
			$scope.isNeedMoreSearch = true;
			if(resetMoreSearch && "resetMoreSearch" == resetMoreSearch){
				$scope.queryDistinctName();
			}
			$scope.moreSearchCondition = {
				id:"",
				objectName:"",	
				objectType:"",
				objectCode:"",
				schedulerTaskId :"",
				schedulerTaskCode : "",
				startTimeStart:"",
    			startTimeEnd:"",
    			endTimeStart:"",
    			endTimeEnd:"",
    			status:"",
    			creator:"",
    			createTimeStart:"",
    			createTimeEnd:""
    		};
		}
		
		$scope.reloadSearchValue = function(){
			setTimeout(function(){
				$scope.searchValue = $location.search()['filter[q]'] || '';
			},200);
		}
		
		$scope.reloadMoreSearchCondition = function(){
			$scope.reloadMoreSearch = {};
			$scope.reloadMoreSearch.id = $location.search()['filter[id]'] || '';
			$scope.reloadMoreSearch.objectName = $location.search()['filter[objectName]'] || '';
    		$scope.reloadMoreSearch.objectType = $location.search()['filter[objectType]'] || '';
    		$scope.reloadMoreSearch.objectCode = $location.search()['filter[objectCode]'] || '';
    		$scope.reloadMoreSearch.schedulerTaskId = $location.search()['filter[schedulerTaskId]'] || '';
    		$scope.reloadMoreSearch.schedulerTaskCode = $location.search()['filter[schedulerTaskCode]'] || '';
    		$scope.reloadMoreSearch.startTimeStart = $location.search()['filter[startTimeStart]'] || '';
    		$scope.reloadMoreSearch.startTimeEnd = $location.search()['filter[startTimeEnd]'] || '';
    		$scope.reloadMoreSearch.endTimeStart = $location.search()['filter[endTimeStart]'] || '';
    		$scope.reloadMoreSearch.endTimeEnd = $location.search()['filter[endTimeEnd]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		
    		if($scope.reloadMoreSearch.id || 
    		   $scope.reloadMoreSearch.objectName || 
    		   $scope.reloadMoreSearch.objectType || 
    		   $scope.reloadMoreSearch.objectCode || 
    		   $scope.reloadMoreSearch.schedulerTaskId || 
    		   $scope.reloadMoreSearch.schedulerTaskCode ||
    		   $scope.reloadMoreSearch.startTimeStart || 
    		   $scope.reloadMoreSearch.startTimeEnd || 
    		   $scope.reloadMoreSearch.endTimeStart || 
    		   $scope.reloadMoreSearch.endTimeEnd || 
    		   $scope.reloadMoreSearch.status || 
    		   $scope.reloadMoreSearch.creator || 
    		   $scope.reloadMoreSearch.createTimeStart ||
    		   $scope.reloadMoreSearch.createTimeEnd ){
    			$scope.isShowMoreSearch = true;
    			$scope.moreSearchCondition = {
    					id : $scope.reloadMoreSearch.id,
    					objectName : $scope.reloadMoreSearch.objectName,
    					objectType : $scope.reloadMoreSearch.objectType,
    					objectCode : $scope.reloadMoreSearch.objectCode,
    					schedulerTaskId : $scope.reloadMoreSearch.schedulerTaskId,
    					schedulerTaskCode : $scope.reloadMoreSearch.schedulerTaskCode,
    					startTimeStart:$scope.reloadMoreSearch.startTimeStart,
    					startTimeEnd:$scope.reloadMoreSearch.startTimeEnd,
    					endTimeStart:$scope.reloadMoreSearch.endTimeStart,
    					endTimeEnd:$scope.reloadMoreSearch.endTimeEnd,
    					status:$scope.reloadMoreSearch.status,
    					creator:$scope.reloadMoreSearch.creator,
    					createTimeStart:$scope.reloadMoreSearch.createTimeStart,
    					createTimeEnd:$scope.reloadMoreSearch.createTimeEnd
    	    		};
    		}else{
    			$scope.isShowMoreSearch = false;
    			$scope.reloadSearchValue();
    		}
		}
		
		$scope.changeStartTime = function(start,end){
			$scope.moreSearchCondition.startTimeStart = start;
			$scope.moreSearchCondition.startTimeEnd = end;
		}
		
		$scope.changeEndTime = function(start,end){
			$scope.moreSearchCondition.endTimeStart = start;
			$scope.moreSearchCondition.endTimeEnd = end;
		}
		
		$scope.querySchedulerTaskList = function(){
			var params = {         
		        rows: 10000
			};
			SchedulerTaskService.dropDownSchedulerTasks(params).then(function(schedulerTasks){
				$scope.schedulerTaskList = schedulerTasks;
			});
		}
		
		$scope.queryDistinctName = function(objectType){
			$scope.moreSearchCondition.objectName = null;
			if(!objectType || objectType == undefined){
				objectType = "default";
			}
			CalcObjectLogService.queryDistinctName(objectType).then(function(list){
				$scope.calcObjectLogDistinctName = list;
			});
		};
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_BASE_CALC_RECORD_STATUS,DMP_CALC_OBJECT_LOG_OBJECT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.calcObjectLogStatusList = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
    			$scope.calcObjectLogObjectTypeList = angular.copy(appConfig.dicMap['DMP_CALC_OBJECT_LOG_OBJECT_TYPE']);
    			$scope.init();
    			$scope.querySchedulerTaskList();
    			$scope.queryDistinctName();
    		});
    	}
    	$scope.initDicByName();
    }];
});
