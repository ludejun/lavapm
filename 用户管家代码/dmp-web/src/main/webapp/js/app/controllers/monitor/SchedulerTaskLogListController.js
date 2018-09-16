define(['angularAMD','css!../../../../css/app/monitor/monitor','app/services/admin/DicService', 'app/services/monitor/SchedulerTaskService','app/services/monitor/SchedulerTaskLogService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','SchedulerTaskService','SchedulerTaskLogService','$state','NgTableParams', '$location', function ($scope,DicService,SchedulerTaskService,SchedulerTaskLogService,$state,NgTableParams,$location) {    
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
        			SchedulerTaskLogService.query(params).then(function(schedulerTaskLogs){
        				params.total(schedulerTaskLogs.total);
                        $defer.resolve(schedulerTaskLogs);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    	};
    	
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
    	
		$scope.createSchedulerTaskLog = function(schedulerTaskLog){
			SchedulerTaskLogService.create(schedulerTaskLog).then(function(schedulerTaskLog){
				$state.go('schedulerTaskLogs'); // 当为弹出窗口时为 $state.reload(); 
			});
		};
		
		$scope.editSchedulerTaskLog = function(schedulerTaskLog){
			SchedulerTaskLogService.update(schedulerTaskLog).then(function(schedulerTaskLog){
				$scope.tableParams.reload();
				$scope.$hide;
			});
		};
		
		$scope.saveSchedulerTaskLog = function(schedulerTaskLog){
			schedulerTaskLog.id === undefined ? $scope.createSchedulerTaskLog (schedulerTaskLog) : $scope.editSchedulerTaskLog (schedulerTaskLog);
		};
		
		$scope.removeSchedulerTaskLog = function(schedulerTaskLog){    		
			SchedulerTaskLogService.remove(schedulerTaskLog).then(function(schedulerTaskLog){
				$scope.tableParams.reload();
			});
		};
		
		$scope.search = function(){    		
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q' : $scope.searchValue,
					'id':$scope.moreSearchCondition.id,
					'taskName':$scope.moreSearchCondition.taskName,
					'taskSummary':$scope.moreSearchCondition.taskSummary,
					'taskCode':$scope.moreSearchCondition.taskCode,
					'systemCode':$scope.moreSearchCondition.systemCode,
					'startTimeStart':$scope.moreSearchCondition.startTimeStart,
	    			'startTimeEnd':$scope.moreSearchCondition.startTimeEnd,
	    			'endTimeStart':$scope.moreSearchCondition.endTimeStart,
	    			'endTimeEnd':$scope.moreSearchCondition.endTimeEnd,
	    			'inputParam':$scope.moreSearchCondition.inputParam,
					'status':$scope.moreSearchCondition.status
				});
			}else{
				$scope.tableParams.filter({'q' : $scope.searchValue});
			}
		};
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
			$scope.moreSearchCondition = {
				id:"",
				taskName:"",	
				taskSummary:"",
				taskCode:"",
				systemCode:"",
				startTimeStart:"",
    			startTimeEnd:"",
    			endTimeStart:"",
    			endTimeEnd:"",
    			inputParam:"",
    			status:""
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
    		$scope.reloadMoreSearch.taskName = $location.search()['filter[taskName]'] || '';
    		$scope.reloadMoreSearch.taskSummary = $location.search()['filter[taskSummary]'] || '';
    		$scope.reloadMoreSearch.taskCode = $location.search()['filter[taskCode]'] || '';
    		$scope.reloadMoreSearch.systemCode = $location.search()['filter[systemCode]'] || '';
    		$scope.reloadMoreSearch.startTimeStart = $location.search()['filter[startTimeStart]'] || '';
    		$scope.reloadMoreSearch.startTimeEnd = $location.search()['filter[startTimeEnd]'] || '';
    		$scope.reloadMoreSearch.endTimeStart = $location.search()['filter[endTimeStart]'] || '';
    		$scope.reloadMoreSearch.endTimeEnd = $location.search()['filter[endTimeEnd]'] || '';
    		$scope.reloadMoreSearch.inputParam = $location.search()['filter[inputParam]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		if($scope.reloadMoreSearch.id || 
    		   $scope.reloadMoreSearch.taskName || 
    		   $scope.reloadMoreSearch.taskSummary || 
    		   $scope.reloadMoreSearch.taskCode || 
    		   $scope.reloadMoreSearch.systemCode || 
    		   $scope.reloadMoreSearch.startTimeStart || 
    		   $scope.reloadMoreSearch.startTimeEnd || 
    		   $scope.reloadMoreSearch.endTimeStart || 
    		   $scope.reloadMoreSearch.endTimeEnd || 
    		   $scope.reloadMoreSearch.inputParam || 
    		   $scope.reloadMoreSearch.status){
    			$scope.isShowMoreSearch = true;
    			$scope.moreSearchCondition = {
    					id : $scope.reloadMoreSearch.id,
    					taskName : $scope.reloadMoreSearch.taskName,
    					taskSummary : $scope.reloadMoreSearch.taskSummary,
    					taskCode : $scope.reloadMoreSearch.taskCode,
    					systemCode : $scope.reloadMoreSearch.systemCode,
    					startTimeStart:$scope.reloadMoreSearch.startTimeStart,
    					startTimeEnd:$scope.reloadMoreSearch.startTimeEnd,
    					endTimeStart:$scope.reloadMoreSearch.endTimeStart,
    					endTimeEnd:$scope.reloadMoreSearch.endTimeEnd,
    					inputParam:$scope.reloadMoreSearch.inputParam,
    					status:$scope.reloadMoreSearch.status
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
		
		$scope.updateSchedulerTaskLogStatus = function(schedulerTaskLogId,action){
			$.layerLoading.show();
			SchedulerTaskLogService.updateSchedulerTaskLogStatus(schedulerTaskLogId,action).then(function(data){
//				$state.go('schedulerTaskLogs'); // 当为弹出窗口时为 $state.reload();
				$.layerLoading.hide();
				if(data != null && !data.success){
					$.Pop.alerts(data.msg);
					return;
				}
				$scope.tableParams.reload();
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		}
		
		$scope.querySchedulerTaskList = function(){
			SchedulerTaskService.dropDownSchedulerTasks().then(function(schedulerTasks){
				$scope.schedulerTaskList = schedulerTasks;
			});
		}
		
		$scope.openIframe = function(schedulerTaskLog){
			$("#viewSchedulerTaskLogDialog").click();
			$scope.iframe = {};
    		var execid = "";
    		if(schedulerTaskLog && schedulerTaskLog.azkabanExecutorId){
    			execid = schedulerTaskLog.azkabanExecutorId;
    		}
    		
    		if(execid){
    			if(appConfig.urlMap && appConfig.urlMap.batchmanagerUrl){
    				var batchmanagerUrl = appConfig.urlMap.batchmanagerUrl;
    				var batchmanagerUser = appConfig.urlMap.batchmanagerUser;
    				var batchmanagerPassword = appConfig.urlMap.batchmanagerPassword;
    				var iframeSrc =  batchmanagerUrl + 'executor?execid='+execid+'&session.id='+batchmanagerPassword+'&username='+batchmanagerUser+'&password='+batchmanagerPassword+'&access=read#jobslist';
    				$scope.iframe.src = iframeSrc;
    			}
    		}
    	}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_BASE_CALC_RECORD_STATUS'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.appVersion = angular.copy(appConfig.appVersion);
    			$scope.schedulerTaskLogStatusList = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
//    			ParamService.querySystemApp().then(function(result){
//    				$scope.systemApps = result;
//        		});
    			$scope.init();
    			$scope.querySchedulerTaskList();
    		});
    	}
    	$scope.initDicByName();
    }];
});
