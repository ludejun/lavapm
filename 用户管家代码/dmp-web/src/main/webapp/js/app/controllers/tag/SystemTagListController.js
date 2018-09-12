define(['angularAMD','app/services/admin/DicService', 'app/services/tag/SystemTagService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','SystemTagService','$state','NgTableParams', '$location', function ($scope,DicService,SystemTagService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.getUserLoginDetails();
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.systemTags = [];
    		
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
        			SystemTagService.query(params).then(function(systemTags){
        				$scope.rebuildObjects(systemTags);
        				$scope.systemTags = systemTags;
        				params.total(systemTags.total);
                        $defer.resolve(systemTags);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    	};
    	
    	$scope.getObjectByDicItemKey = function(dicItemKey,list){
    		var obj = {};
    		if(dicItemKey && list && list.length > 0){
    			for(var i = 0;i < list.length;i++){
    				if(dicItemKey == list[i].dicItemKey){
    					obj = list[i];
    					break;
    				}
    			}
    		}
    		return obj;
    	}
    	
    	$scope.rebuildObjects = function(objects){
    		if(objects && objects.length > 0){
    			for(var i = 0;i < objects.length;i++){
    				var obj = $scope.getObjectByDicItemKey(objects[i].touchPointType,$scope.touchPointTypes);
    				objects[i].touchPointTypeName = obj.dicItemValue;
    			}
    		}
    	}
    	
    	$scope.getUserLoginDetails = function(){
			$scope.loginUser = {};
			if(window.parent && window.parent.appConfig && window.parent.appConfig.user){
				$scope.loginUser = window.parent.appConfig.user;
			}else{
				$scope.loginUser = appConfig.user;
			}
		}
    	
		$scope.createSystemTag = function(systemTag, systemTagForm){
			SystemTagService.create(systemTag).then(function(systemTag){
				$state.go('systemTags'); // 当为弹出窗口时为 $state.reload(); 
			},function(response) {
				if(response.data != null && !response.data.success){
					if(response.data.errorCode && response.data.errorCode == '9001'){
						systemTagForm.name.$dirty = true;
						systemTagForm.name.$valid = false;
						systemTagForm.name.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						systemTagForm.code.$dirty = true;
						systemTagForm.code.$valid = false;
						systemTagForm.code.errorText = response.data.msg;
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};
		
		$scope.editSystemTag = function(systemTag, systemTagForm){
			SystemTagService.update(systemTag).then(function(systemTag){
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				if(response.data != null && !response.data.success){
					if(response.data.errorCode && response.data.errorCode == '9001'){
						systemTagForm.name.$dirty = true;
						systemTagForm.name.$valid = false;
						systemTagForm.name.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						systemTagForm.code.$dirty = true;
						systemTagForm.code.$valid = false;
						systemTagForm.code.errorText = response.data.msg;
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};
		
		$scope.saveSystemTag = function(systemTag, systemTagForm){
			systemTag.id === undefined ? $scope.createSystemTag (systemTag, systemTagForm) : $scope.editSystemTag (systemTag, systemTagForm);
		};
		
		$scope.removeSystemTag = function(systemTag){    	
			$.Pop.confirms($scope.nlsRoot.confirmDelSysTags+systemTag.name+'"？',function(){
				SystemTagService.remove(systemTag).then(function(systemTag){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			});
		};
		
		$scope.search = function(){
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
//					'q' : $scope.searchValue,
					'name':$scope.moreSearchCondition.name,
					'touchPointType':$scope.moreSearchCondition.touchPointType,
					'status':$scope.moreSearchCondition.status,
					'calcStatus':$scope.moreSearchCondition.calcStatus,
					'code':$scope.moreSearchCondition.code,
					'creator':$scope.moreSearchCondition.creator,
					'createTimeStart':$scope.moreSearchCondition.createTimeStart,
					'createTimeEnd':$scope.moreSearchCondition.createTimeEnd,
					"tagDataTimeStart" : $scope.moreSearchCondition.tagDataTimeStart,
					"tagDataTimeEnd" : $scope.moreSearchCondition.tagDataTimeEnd
				});
			}else{
				$scope.tableParams.filter({'q' : $scope.searchValue});
			}
		};
		
		$scope.changeCreateTime = function(start,end){
			$scope.moreSearchCondition.createTimeStart = start;
			$scope.moreSearchCondition.createTimeEnd = end;
		}
		
		$scope.changeTagDataTime = function(start,end){
			$scope.moreSearchCondition.tagDataTimeStart = start;
			$scope.moreSearchCondition.tagDataTimeEnd = end;
		}
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
			$scope.moreSearchCondition = {
    			name:"",
    			touchPointType:'',
    			status:"",
    			calcStatus:"",
    			code:"",
    			creator:"",
    			createTimeStart:"",
    			createTimeEnd:"",
    			tagDataTimeStart:"",
    			tagDataTimeEnd:""
    		};
		}
		
		$scope.reloadMoreSearchCondition = function(){
			$scope.reloadMoreSearch = {};
			$scope.reloadMoreSearch.name = $location.search()['filter[name]'] || '';
			$scope.reloadMoreSearch.touchPointType = $location.search()['filter[touchPointType]'] || '';
			$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
			$scope.reloadMoreSearch.calcStatus = $location.search()['filter[calcStatus]'] || '';
			$scope.reloadMoreSearch.code = $location.search()['filter[code]'] || '';
			$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		$scope.reloadMoreSearch.tagDataTimeStart = $location.search()['filter[tagDataTimeStart]'] || '';
    		$scope.reloadMoreSearch.tagDataTimeEnd = $location.search()['filter[tagDataTimeEnd]'] || '';
    		
    		if($scope.reloadMoreSearch.name || 
    		   $scope.reloadMoreSearch.touchPointType || 
    		   $scope.reloadMoreSearch.status || 
    		   $scope.reloadMoreSearch.calcStatus || 
    		   $scope.reloadMoreSearch.code || 
    		   $scope.reloadMoreSearch.creator || 
    		   $scope.reloadMoreSearch.createTimeStart || 
    		   $scope.reloadMoreSearch.createTimeEnd || 
    		   $scope.reloadMoreSearch.tagDataTimeStart || 
    		   $scope.reloadMoreSearch.tagDataTimeEnd
    		   ){
    			$scope.isShowMoreSearch = true;
    			$scope.moreSearchCondition = {
    	    			name : $scope.reloadMoreSearch.name,
    	    			touchPointType : $scope.reloadMoreSearch.touchPointType,
    	    			status:$scope.reloadMoreSearch.status,
    	    			calcStatus:$scope.reloadMoreSearch.calcStatus,
    	    			code : $scope.reloadMoreSearch.code,
    	    			creator:$scope.reloadMoreSearch.creator,
    	    			createTimeStart:$scope.reloadMoreSearch.createTimeStart,
    	    			createTimeEnd:$scope.reloadMoreSearch.createTimeEnd,
    	    			tagDataTimeStart:$scope.reloadMoreSearch.tagDataTimeStart,
    	    			tagDataTimeEnd:$scope.reloadMoreSearch.tagDataTimeEnd
    	    		};
    		}else{
    			$scope.isShowMoreSearch = false;
    			$scope.reloadSearchValue();
    		}
		}
		
		$scope.reloadSearchValue = function(){
			setTimeout(function(){
				$scope.searchValue = $location.search()['filter[q]'] || '';
			},200);
		}
		
		$scope.showMoreOperator = function(systemTag){
    		for(var i = 0; i < $scope.systemTags.length; i++){
    			if(systemTag.id != $scope.systemTags[i].id){
    				$scope.systemTags[i].isShowMoreOperator = false;
    			}else{
    				systemTag.isShowMoreOperator = !systemTag.isShowMoreOperator;
    			}
    		}
    		if(systemTag.isShowMoreOperator){
    			if(window.parent && window.parent.iFrameScrollHeight){
    				window.setTimeout(window.parent.iFrameScrollHeight,200);
    			}
    		}else{
    			if(window.parent && window.parent.iFrameHeight){
    				window.setTimeout(window.parent.iFrameHeight,200);
    			}
    		}
    		
    		if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
    	}
    	
    	$scope.hideMoreOperator = function(){
    		if($scope.systemTags){
    			for(var i = 0; i < $scope.systemTags.length; i++){
        			$scope.systemTags[i].isShowMoreOperator = false;
        		}
        		$scope.$apply();
    		}
    	}
    	
    	document.onclick = function(){
    		$scope.hideMoreOperator();
    	};
    	
    	// 系统标签重新计算
    	$scope.reCalCulatesystemTag = function(systemTag){
    		if(systemTag.calcStatus == 1 || systemTag.calcStatus == -4){
    			$.Pop.alerts($scope.nlsRoot.noRecalculate);
    			return false;
    		}
			if(systemTag.id){
				SystemTagService.reCalCulatesystemTag(systemTag.id).then(function(systemTag){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			}
		}
    	
    	// 查看系统标签计算日志
    	$scope.goCalcObjectLog = function(systemTagId){
    		SystemTagService.goCalcObjectLog(systemTagId).then(function(calcObjectLog){
				if(calcObjectLog){
					$state.go('schedulerTaskLogs_view', { schedulerTaskLogId: calcObjectLog.schedulerTaskLogId,sourcePage:$scope.nlsRoot.systemTagList});
//					var dmpreportUrl = appConfig.urlMap.dmpreportUrl;
//					$('#main-frame', parent.document).attr("src","/tenant#/monitor/schedulerTaskLogs?url="+dmpreportUrl+"dmp-report/#/monitor/schedulerTaskLogs/view/"+calcObjectLog.schedulerTaskLogId);
				}
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
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
				var ngTableBodyHg = winHg - operatorPanelHg - ngTableHeadHg - moreSearchBoxHg - 75 - 50;
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
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_OBJECT_STATUS,DMP_BASE_CALC_RECORD_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.systemTagStatusList = angular.copy(appConfig.dicMap['DMP_OBJECT_STATUS']);
    			$scope.systemTagCalcStatusList = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    	
    }];
    
});
