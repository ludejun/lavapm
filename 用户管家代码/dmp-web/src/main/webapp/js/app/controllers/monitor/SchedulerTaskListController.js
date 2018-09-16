define(['angularAMD','css!../../../../css/app/monitor/monitor','app/services/admin/DicService','app/services/admin/ParamService', 'app/services/monitor/SchedulerTaskService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','ParamService','SchedulerTaskService','$state','NgTableParams', '$location', function ($scope,DicService,ParamService,SchedulerTaskService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.iframe = {};
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
        			SchedulerTaskService.query(params).then(function(schedulerTasks){
        				params.total(schedulerTasks.total);
                        $defer.resolve(schedulerTasks);
        			});
                }
            });
    	};
    	
		$scope.createSchedulerTask = function(schedulerTask){
			SchedulerTaskService.create(schedulerTask).then(function(schedulerTask){
				$state.go('schedulerTasks'); // 当为弹出窗口时为 $state.reload(); 
			});
		};
		
		$scope.editSchedulerTask = function(schedulerTask){
			SchedulerTaskService.update(schedulerTask).then(function(schedulerTask){
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.saveSchedulerTask = function(schedulerTask,schedulerTaskEditDialogForm){
			schedulerTask = schedulerTask || {};
			
			if (!schedulerTask.name) {
				schedulerTaskEditDialogForm.name.$dirty = true;
				return false;
			}

			/*if (!schedulerTask.systemCode) {
				schedulerTaskEditDialogForm.systemCode.$dirty = true;
				return false;
			}
			if (!schedulerTask.dataAppId) {
				schedulerTaskEditDialogForm.dataAppId.$dirty = true;
				return false;
			}
			if (!schedulerTask.tenantId) {
				schedulerTaskEditDialogForm.tenantId.$dirty = true;
				return false;
			}*/
			
			schedulerTask.id === undefined ? $scope.createSchedulerTask (schedulerTask) : $scope.editSchedulerTask (schedulerTask);
		};
		
		$scope.removeSchedulerTask = function(schedulerTask){    		
			SchedulerTaskService.remove(schedulerTask).then(function(schedulerTask){
				$scope.tableParams.reload();
			});
		};
		
		$scope.search = function(){   
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q' : $scope.searchValue,
					'name':$scope.moreSearchCondition.name,
					'azkabanProjectName':$scope.moreSearchCondition.azkabanProjectName,
					'systemCode':$scope.moreSearchCondition.systemCode,
					'dataAppId' : $scope.moreSearchCondition.dataAppId,
					'status':$scope.moreSearchCondition.status,
					'code':$scope.moreSearchCondition.code,
					'creator':$scope.moreSearchCondition.creator,
	    			'description':$scope.moreSearchCondition.description,
					'createTimeStart':$scope.moreSearchCondition.createTimeStart,
					'createTimeEnd':$scope.moreSearchCondition.createTimeEnd
				});
			}else{
				$scope.tableParams.filter({'q' : $scope.searchValue});
			}
		};
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
			$scope.moreSearchCondition = {
				name:"",
				azkabanProjectName:"",
				systemCode:"",
				dataAppId : "",
    			status:"",
    			code:"",
    			creator:"",
    			description:"",
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
			$scope.reloadMoreSearch.name = $location.search()['filter[name]'] || '';
    		$scope.reloadMoreSearch.azkabanProjectName = $location.search()['filter[azkabanProjectName]'] || '';
    		$scope.reloadMoreSearch.systemCode = $location.search()['filter[systemCode]'] || '';
    		$scope.reloadMoreSearch.dataAppId = $location.search()['filter[dataAppId]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		$scope.reloadMoreSearch.code = $location.search()['filter[code]'] || '';
    		$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.description = $location.search()['filter[description]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		if($scope.reloadMoreSearch.name || 
    		   $scope.reloadMoreSearch.azkabanProjectName || 
    		   $scope.reloadMoreSearch.systemCode || 
    		   $scope.reloadMoreSearch.dataAppId || 
    		   $scope.reloadMoreSearch.status || 
    		   $scope.reloadMoreSearch.code || 
    		   $scope.reloadMoreSearch.creator || 
    		   $scope.reloadMoreSearch.description || 
    		   $scope.reloadMoreSearch.createTimeStart || 
    		   $scope.reloadMoreSearch.createTimeEnd){
    			$scope.isShowMoreSearch = true;
    			$scope.moreSearchCondition = {
    					name : $scope.reloadMoreSearch.name,
    					azkabanProjectName : $scope.reloadMoreSearch.azkabanProjectName,
    					systemCode : $scope.reloadMoreSearch.systemCode,
    					dataAppId : $scope.reloadMoreSearch.dataAppId,
    					status:$scope.reloadMoreSearch.status,
    					code:$scope.reloadMoreSearch.code,
    					creator:$scope.reloadMoreSearch.creator,
    					description:$scope.reloadMoreSearch.description,
    					createTimeStart:$scope.reloadMoreSearch.createTimeStart,
    					createTimeEnd:$scope.reloadMoreSearch.createTimeEnd
    	    		};
    		}else{
    			$scope.isShowMoreSearch = false;
    			$scope.reloadSearchValue();
    		}
		}
		
		$scope.changeCreateTime = function(start,end){
			$scope.moreSearchCondition.createTimeStart = start;
			$scope.moreSearchCondition.createTimeEnd = end;
		}
		
		$scope.dialogInit = function(action,schedulerTask){
    		if(schedulerTask){
				$scope.schedulerTaskCopy = angular.copy(schedulerTask);
			}else{
				$scope.schedulerTaskCopy = {};
			}
    		
			if(action == 'add'){
				$scope.modal_title = "添加调度任务";
			}else if(action == 'edit'){
				$scope.modal_title = "编辑调度任务";
				ParamService.queryAllTenants().then(function(datas){
    				$scope.allTenants = datas;
        		});
			}
		};
		
		$scope.openIframe = function(schedulerTask){
    		var projectName = "";
    		var flow = "";
    		if(schedulerTask && schedulerTask.azkabanProjectName){
    			projectName = schedulerTask.azkabanProjectName;
    		}
    		
    		if(schedulerTask && schedulerTask.azkabanJobFlowId){
    			flow = schedulerTask.azkabanJobFlowId;
    		}
    		
    		if(projectName && flow){
    			if(appConfig.urlMap && appConfig.urlMap.batchmanagerUrl){
    				var batchmanagerUrl = appConfig.urlMap.batchmanagerUrl;
    				var batchmanagerUser = appConfig.urlMap.batchmanagerUser;
    				var batchmanagerPassword = appConfig.urlMap.batchmanagerPassword;
    				
    				var iframeSrc =  batchmanagerUrl + 'manager?project='+projectName+'&flow='+flow+'&session.id='+batchmanagerPassword+'&username='+batchmanagerUser+'&password='+batchmanagerPassword+'&access=read#graph';
    				$scope.iframe.src = iframeSrc;
//        			$scope.iframe.src = batchmanagerUrl + 'manager?project='+projectName;
    				//$scope.iframe.src = batchmanagerUrl + 'manager?project='+projectName+'&session.id='+batchmanagerPassword+'&username='+batchmanagerUser+'&password='+batchmanagerPassword;
    			}
    		}
    	}
		
		/**
		 * 启用，禁用
		 */
		$scope.updateSchedulerTaskStatus = function(schedulerTaskId,action){
			SchedulerTaskService.updateSchedulerTaskStatus(schedulerTaskId,action).then(function(schedulerTask){
				$scope.tableParams.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'SCHEDULER_TASK_STATUS'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.appVersion = angular.copy(appConfig.appVersion);
    			$scope.schedulerTaskStatusList = angular.copy(appConfig.dicMap['SCHEDULER_TASK_STATUS']);
    			ParamService.querySystemApp().then(function(result){
    				$scope.systemApps = result;
        			$scope.init();
        		});
    		});
    	}
    	$scope.initDicByName();
    }];
});
