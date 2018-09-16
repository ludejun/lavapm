define(['angularAMD', 'app/services/admin/DicService', 'app/services/crowd/LookalikeCrowdService','app/services/crowd/CrowdService','app/filters/common/CommonFilter','app/controllers/common/searchTagator'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','LookalikeCrowdService','CrowdService','$state','NgTableParams', '$location', function ($scope,DicService,LookalikeCrowdService,CrowdService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.getUserLoginDetails();
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.exportObj = {};
    		$scope.exportObj.fields = [];
    		
    		$scope.lookalikeCrowds = [];
    		$scope.isAddEditCate = 'add';
    		
    		$scope.queryLookalikeCrowds();
    	};
    	
    	$scope.getUserLoginDetails = function(){
			$scope.loginUser = {};
			if(window.parent && window.parent.appConfig && window.parent.appConfig.user){
				$scope.loginUser = window.parent.appConfig.user;
			}else{
				$scope.loginUser = appConfig.user;
			}
		}
    	
    	$scope.queryLookalikeCrowds = function(){
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
        			LookalikeCrowdService.query(params).then(function(lookalikeCrowds){
        				$scope.rebuildObjects(lookalikeCrowds);
        				$scope.lookalikeCrowds = lookalikeCrowds;
        				params.total(lookalikeCrowds.total);
                        $defer.resolve(lookalikeCrowds);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    	}
    	
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
    	
    	$scope.calNgTableBody = function(){
			//if($("#tableParams").attr("freeze") == "true"){
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
			//}
		}
    	
    	$scope.goCalcObjectLog = function(lookalikeCrowdId){
    		LookalikeCrowdService.goCalcObjectLog(lookalikeCrowdId).then(function(calcObjectLog){
				if(calcObjectLog){
					$state.go('schedulerTaskLogs_view', { schedulerTaskLogId: calcObjectLog.schedulerTaskLogId,sourcePage:'人群放大列表'});
//					var dmpreportUrl = appConfig.urlMap.dmpreportUrl;
//					$('#main-frame', parent.document).attr("src","/tenant#/monitor/schedulerTaskLogs?url="+dmpreportUrl+"dmp-report/#/monitor/schedulerTaskLogs/view/"+calcObjectLog.schedulerTaskLogId);
				}
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
    	}
    	
    	$scope.showMoreOperator = function(lookalikeCrowd){
    		for(var i = 0; i < $scope.lookalikeCrowds.length; i++){
    			if(lookalikeCrowd.id != $scope.lookalikeCrowds[i].id){
    				$scope.lookalikeCrowds[i].isShowMoreOperator = false;
    			}else{
    				lookalikeCrowd.isShowMoreOperator = !lookalikeCrowd.isShowMoreOperator;
    			}
    		}
    		if(lookalikeCrowd.isShowMoreOperator){
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
    		if($scope.lookalikeCrowds){
    			for(var i = 0; i < $scope.lookalikeCrowds.length; i++){
        			$scope.lookalikeCrowds[i].isShowMoreOperator = false;
        		}
        		$scope.$apply();
    		}
    	}
    	
    	document.onclick = function(){
    		$scope.hideMoreOperator();
    	};
    	
    	/*转化设置start*/
		$scope.transformFilterObj = {
			keyword : "",
			transformEventsType : "1"
		};
		
		$scope.isShowTransformDropdownMenu = false;
    	$scope.allTransformList = [];
    	$scope.selectedTransformList = [];
    	$scope.transformFilterList = [];
		
    	
    	/**
    	 * 获取“转化选择”所需要的时间数据
    	 */
		$scope.queryTransformsList = function(){ 
    		$scope.allTransformList = [];
    		
			$scope.isShowTransformDropdownMenu = false;
			var params = {
				keywords :$scope.transformFilterObj.keyword,
				type : $scope.transformFilterObj.transformEventsType,
		        rows: 10000
			};
			
			MarketingEffectTrackingService.queryTransformsList(params).then(function(transforms){
				$scope.allTransformList = transforms;
			});
		};
		
		$scope.filterTransformList = function(){
			$scope.transformFilterList = [];
			if($scope.allTransformList.length == 0){
				$scope.isShowTransformDropdownMenu = false;
				return false;
			}
			$scope.isShowTransformDropdownMenu = true;
			
			if($scope.transformFilterObj.keyword == ""){//显示所有
				$scope.transformFilterList = angular.copy($scope.allTransformList);
			}else{
				var allTransformList = $scope.allTransformList;
				var allTransformListLength = allTransformList.length;
				var hasFilter = false;
				for(var i = 0; i < allTransformListLength; i++){
					if(allTransformList[i].name.toUpperCase().indexOf($scope.transformFilterObj.keyword.toUpperCase()) != -1){
						$scope.transformFilterList.push(allTransformList[i]);
						hasFilter = true;
					}
				}
				if(!hasFilter){
					$scope.isShowTransformDropdownMenu = false;
				}
				
				if(event.keyCode == 13){
					var trans = $scope.checkInputTransformIsValid($scope.transformFilterObj.keyword,$scope.transformFilterList);
					if(!$.isNullObj(trans)){
						$scope.selectTransformItem(trans);
					}else{
						$.Pop.alerts("此转换未查询到，请重新输入");
						return false;
					}
				}
				
			}
			
		};
		
		$scope.checkInputTransformIsValid = function(keyword,transformList){//查询
			var trans = {};
			var transformListLength = transformList.length;
			for(var i = 0; i < transformListLength; i++){
				if(keyword == transformList[i].name){
					trans = transformList[i];
					break;
				}
			}
			return trans;
		}
		
		$scope.selectTransformItem = function(trans){
			$scope.transformFilterObj.keyword = "";
			$scope.isShowTransformDropdownMenu = false;
			
			
			var response = $scope.checkHasRepeatSelectedTransform(trans);
			if(response.hasRepeat){
				var transform = response.transform;
				//$.Pop.alerts("此转化已经添加了，不能重复添加");
				if(trans.type==3){
					$.Pop.alerts("安装类型的转化不能与其他类型同时选择，并只能选择一项");
				}else{
					//$.Pop.alerts("同类型的转化不能重复添加");
					$.Pop.alerts('已经添加了'+transform.eventNam+'，不能再添加'+trans.eventNam+'');
				}
				
				return false;
			}
			$scope.selectedTransformList.push(trans);
		};
		
		$scope.removeHasSelectedTransform = function(trans){
			for(var i = 0; i < $scope.selectedTransformList.length; i++){
				if(trans.id == $scope.selectedTransformList[i].id && trans.type == $scope.selectedTransformList[i].type){
					$scope.selectedTransformList.splice(i,1);
					break;
				}
			}
		}
		
		$scope.checkHasRepeatSelectedTransform = function(trans){
			var selectedTransformList = $scope.selectedTransformList,
			selectedTransformListLength = selectedTransformList.length;
			var response = {
				hasRepeat : false,
				transform:{}
			};
			if(trans.type == 3){
				if(selectedTransformListLength > 0){
					response = {
						hasRepeat : true,
						transform:selectedTransformList[0]
					};
				}
			}else{
				for(var i = 0; i < selectedTransformListLength; i++){
					if(trans.type == selectedTransformList[i].type){//trans.id == selectedTransformList[i].id && 同类型不能重复添加
						response = {
							hasRepeat : true,
							transform:selectedTransformList[i]
						};
						break;
					}
				}
			}
			return response;
		}
		
		$scope.onHideDropdownMenu = function(event) {
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.isShowTransformDropdownMenu = false;
			}
		}
		
		/*转化设置end*/
		
		$scope.initExportFields = function(touchPointType){
    		var fields = [];
    		if(touchPointType == 'account_id'){//跨屏
    			fields = angular.copy(appConfig.dicMap['USER_ACCOUNTID_PROFILE_COLUMNS']);
    		}else if(touchPointType == 'app_tdid'){//Mobile APP
    			fields = angular.copy(appConfig.dicMap['USER_APPTDID_PROFILE_COLUMNS']);
    		}else if(touchPointType == 'web_tdid'){//PC Web
    			fields = angular.copy(appConfig.dicMap['USER_APPTDID_PROFILE_COLUMNS']);
    		}else if(touchPointType == 'h5_tdid'){//HTML5
    			fields = angular.copy(appConfig.dicMap['USER_APPTDID_PROFILE_COLUMNS']);
    		}
    		return fields;
    	}
    	
    	$scope.showExportCrowdLayer = function(crowd){
    		$scope.exportObj.crowdId = crowd.id;
    		$scope.exportObj.crowdName = crowd.name;
    		$scope.exportObj.fields = $scope.initExportFields(crowd.touchPointType);
    		
    		setTimeout(function(){
    			var $input_tagator = $(".input-tagator");
        		var dictItemList = $scope.exportObj.fields;
    			$scope.renderSearchInputTagator($input_tagator,dictItemList);
    		},200);
    	}
    	
    	$scope.renderSearchInputTagator = function($input_tagator,dictItemList){
    		var nameList = [];
    		for(var i = 0; i < dictItemList.length; i++){
    			nameList.push(dictItemList[i].dicItemValue);
    		}
    		if ($input_tagator.data('tagator') === undefined) {
    			$input_tagator.tagator({
    				autocomplete: nameList,
    				allowCustom :false,
    				showAllOptionsOnFocus:true
    			});
    		}
    	}
    	
    	$scope.buildDicItemValueToDicItemKey = function(){//把输入的文本值转换成字典中的dicItemKey值
    		var ids = [];
    		var values = $(".input-tagator").val();
    		if(values){
    			var valueArr = values.split(',');
    			var dictItemList = [];
    			if($scope.exportObj.fields && $scope.exportObj.fields.length > 0){
    				dictItemList = $scope.exportObj.fields;
    			}
    			
    			for(var i = 0; i < valueArr.length; i++){
    				for(var j = 0; j < dictItemList.length; j++){
    					if($.trim(valueArr[i]) == dictItemList[j].dicItemValue){
    						ids.push(dictItemList[j].dicItemKey);
    					}
    				}
    				
    			}
    		}
    		return ids;
    	}
    	
    	$scope.exportCrowd = function(){
    		$scope.exportObj.exportType = [];
    		
			/*var isNotChecked = true;
			for(var i = 0; i < $scope.exportObj.fields.length;i++){
				if($scope.exportObj.fields[i].isChecked){
					isNotChecked = false;
					$scope.exportObj.exportType.push($scope.exportObj.fields[i].dicItemKey);
				}
			}*/
			
			$scope.exportObj.exportType = $scope.buildDicItemValueToDicItemKey();
			
			if($scope.exportObj.exportType && $scope.exportObj.exportType.length > 0){
				var exportObj = {
					lookalikeCrowdId:$scope.exportObj.crowdId,
					exportType : $scope.exportObj.exportType,
					description: $scope.exportObj.description
				};
				LookalikeCrowdService.exportLookalikeCrowd(exportObj).then(function(response){
					if(response.fileFlag == true){
						var exportType = "";
						for(var i = 0; i < $scope.exportObj.exportType.length; i++){
							if(i == $scope.exportObj.exportType.length - 1){
								exportType += $scope.exportObj.exportType[i];
							}else{
								exportType += $scope.exportObj.exportType[i]+',';
							}
						}
						var host = 'http://'+window.location.host +$scope.urlMap.dmpUrl;
						var params = {
							url : host+'/crowd/lookalikeCrowds/downloadLookalikeCrowdFile?exportType='+exportType+'&lookalikeCrowdId=' + $scope.exportObj.crowdId
						}
						$scope.downloadFile(params);
					}else{
						$.Pop.alerts(response.msg);
						//$("#confirms").attr('onclick','location.reload();');
					}
					
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			}else{
				$.Pop.alerts("请选择导出字段");
			}
    	}
    	
    	$scope.downloadFile = function(params){
    		//$.Pop.confirms('导出成功，文件已经生成，确定要下载吗？',function(){
    			$.createDownloadIframe(params);
    		//});
    	}
    	
    	
    	 /*$scope.$watch('checkboxes.checked', function(value) {
	        angular.forEach($scope.lookalikeCrowds, function(item) {
	            if (angular.isDefined(item.id)) {
	                $scope.checkboxes.items[item.id] = value;
	            }
	        });
	    });
	
	    
	    $scope.$watch('checkboxes.items', function(values) {
	        if (!$scope.lookalikeCrowds || $scope.lookalikeCrowds.length == 0) {
	            return;
	        }
	        var checked = 0, unchecked = 0,
	                total = $scope.lookalikeCrowds.length;
	        angular.forEach($scope.lookalikeCrowds, function(item) {
	            checked   +=  ($scope.checkboxes.items[item.id]) || 0;
	            unchecked += (!$scope.checkboxes.items[item.id]) || 0;
	        });
	        if ((unchecked == 0) || (checked == 0)) {
	            $scope.checkboxes.checked = (checked == total);
	        }
	        // grayed checkbox
	        angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
	    }, true);*/
    	
    	$scope.exportLookalikeCrowd = function(){
    		/*var notChecked = false;
    		for(var o in $scope.checkboxes.items){
    			if($scope.checkboxes.items[o]){
    				notChecked = true;
    			}
    		}
    		if(!notChecked){
    			$.Pop.alerts("请勾选需要导出的相似人群");
    			return false;
    		}
    		
    		
    		LookalikeCrowdService.exportLookalikeCrowd($scope.checkboxes.items).then(function(response){
    			$state.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});*/
			
			
		}
    	
		$scope.createLookalikeCrowd = function(lookalikeCrowd){
			LookalikeCrowdService.create(lookalikeCrowd).then(function(lookalikeCrowd){
				$state.go('lookalikeCrowds');
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
			
		};
		
		$scope.editLookalikeCrowd = function(lookalikeCrowd){
			LookalikeCrowdService.update(lookalikeCrowd).then(function(lookalikeCrowd){
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.saveLookalikeCrowd = function(lookalikeCrowd){
			
			
			lookalikeCrowd.id === undefined ? $scope.createLookalikeCrowd (lookalikeCrowd) : $scope.editLookalikeCrowd (lookalikeCrowd);
		}
		
		$scope.removeLookalikeCrowd = function(lookalikeCrowd){    		
			$.Pop.confirms('确定要删除相似人群"'+lookalikeCrowd.name+'"？',function(){
				LookalikeCrowdService.remove(lookalikeCrowd).then(function(lookalikeCrowd){
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
					//q : $scope.searchValue,
					name : $scope.moreSearchCondition.name,
	    			touchPointType :$scope.moreSearchCondition.touchPointType,
	    			seedCrowdName:$scope.moreSearchCondition.seedCrowdName,
	    			rangeCrowdName:$scope.moreSearchCondition.rangeCrowdName,
	    			isExcludeSeedCrowd:$scope.moreSearchCondition.isExcludeSeedCrowd,
	    			isOptimization:$scope.moreSearchCondition.isOptimization,
	    			description:$scope.moreSearchCondition.description,
	    			status:$scope.moreSearchCondition.status,
	    			calcStatus:$scope.moreSearchCondition.calcStatus,
	    			updateDataTimeStart:$scope.moreSearchCondition.updateDataTimeStart,
	    			updateDataTimeEnd:$scope.moreSearchCondition.updateDataTimeEnd,
	    			creator:$scope.moreSearchCondition.creator,
	    			createTimeStart:$scope.moreSearchCondition.createTimeStart,
	    			createTimeEnd:$scope.moreSearchCondition.createTimeEnd
				});
			}else{
				$scope.tableParams.filter({q : $scope.searchValue});
			}
		};
		
		$scope.reloadSearchValue = function(){
			setTimeout(function(){
				$scope.searchValue = $location.search()['filter[q]'] || '';
			},200);
		}
		
		$scope.reloadMoreSearchCondition = function(){
			$scope.reloadMoreSearch = {};
			$scope.reloadMoreSearch.name = $location.search()['filter[name]'] || '';
    		$scope.reloadMoreSearch.touchPointType = $location.search()['filter[touchPointType]'] || '';
    		$scope.reloadMoreSearch.seedCrowdName = $location.search()['filter[seedCrowdName]'] || '';
    		$scope.reloadMoreSearch.rangeCrowdName = $location.search()['filter[rangeCrowdName]'] || '';
    		$scope.reloadMoreSearch.isExcludeSeedCrowd = $location.search()['filter[isExcludeSeedCrowd]'] || '';
    		$scope.reloadMoreSearch.isOptimization = $location.search()['filter[isOptimization]'] || '';
    		$scope.reloadMoreSearch.description = $location.search()['filter[description]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		$scope.reloadMoreSearch.calcStatus = $location.search()['filter[calcStatus]'] || '';
    		$scope.reloadMoreSearch.updateDataTimeStart = $location.search()['filter[updateDataTimeStart]'] || '';
    		$scope.reloadMoreSearch.updateDataTimeEnd = $location.search()['filter[updateDataTimeEnd]'] || '';
    		$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		
    		if($scope.reloadMoreSearch.name || 
    		   $scope.reloadMoreSearch.touchPointType || 
    		   $scope.reloadMoreSearch.seedCrowdName || 
    		   $scope.reloadMoreSearch.rangeCrowdName || 
    		   $scope.reloadMoreSearch.isExcludeSeedCrowd || 
    		   $scope.reloadMoreSearch.isOptimization || 
    		   $scope.reloadMoreSearch.description || 
    		   $scope.reloadMoreSearch.status || 
    		   $scope.reloadMoreSearch.calcStatus || 
    		   $scope.reloadMoreSearch.updateDataTimeStart || 
    		   $scope.reloadMoreSearch.updateDataTimeEnd || 
    		   $scope.reloadMoreSearch.creator || 
    		   $scope.reloadMoreSearch.createTimeStart || 
    		   $scope.reloadMoreSearch.createTimeEnd ){
    			$scope.isShowMoreSearch = true;
    			$scope.moreSearchCondition = {
    	    			name : $scope.reloadMoreSearch.name,
    	    			touchPointType : $scope.reloadMoreSearch.touchPointType,
    	    			seedCrowdName : $scope.reloadMoreSearch.seedCrowdName,
    	    			rangeCrowdName : $scope.reloadMoreSearch.rangeCrowdName,
    	    			isExcludeSeedCrowd : $scope.reloadMoreSearch.isExcludeSeedCrowd,
    	    			isOptimization : $scope.reloadMoreSearch.isOptimization,
    	    			description : $scope.reloadMoreSearch.description,
    	    			status:$scope.reloadMoreSearch.status,
    	    			calcStatus:$scope.reloadMoreSearch.calcStatus,
    	    			updateDataTimeStart:$scope.reloadMoreSearch.updateDataTimeStart,
    	    			updateDataTimeEnd:$scope.reloadMoreSearch.updateDataTimeEnd,
    	    			creator:$scope.reloadMoreSearch.creator,
    	    			createTimeStart:$scope.reloadMoreSearch.createTimeStart,
    	    			createTimeEnd:$scope.reloadMoreSearch.createTimeEnd
    	    		};
    		}else{
    			$scope.isShowMoreSearch = false;
    			$scope.reloadSearchValue();
    		}
		}
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
			$scope.moreSearchCondition = {
    			name : "",
    			touchPointType :"",
    			seedCrowdName:"",
    			rangeCrowdName:"",
    			isExcludeSeedCrowd:"",
    			isOptimization:"",
    			description:"",
    			status:"",
    			calcStatus:"",
    			updateDataTimeStart:"",
    			updateDataTimeEnd:"",
    			creator:"",
    			createTimeStart:"",
    			createTimeEnd:""
    		};
		}
		
		$scope.changeCreateTime = function(start,end){
			$scope.moreSearchCondition.createTimeStart = start;
			$scope.moreSearchCondition.createTimeEnd = end;
		}
		
		$scope.changeTagDataTime = function(start,end){
			$scope.moreSearchCondition.updateDataTimeStart = start;
			$scope.moreSearchCondition.updateDataTimeEnd = end;
		}
		
		/*投放start*/
		
		
		$scope.deliveryCrowdObj = {
			excludeActivityList : [],
			selectedExcludeActivity : [],
			dspChannel : ""
		};
		
		$scope.dspLaunch = {};
		
		$scope.isShowExclude = false;
		$scope.isShowOutputToDSP = false;
		
		/*投放end*/
		
		/*投放start*/
		$scope.openDeliveryDialog = function(crowd){
			$scope.dspLaunch = {};
			$scope.dspLaunch.dspChannel = "1";
			$scope.dspLaunch.crowdId = crowd.id;
			
			$scope.openDeliveryDialogCrowd = crowd;
//			$scope.queryPtentialCorwdNumbers(potentialCrowd);
//			$scope.queryAllActivityList();
//			$scope.queryEffectiveExceptself(crowd);
			$scope.setDspLaunchByCrowd(crowd);
			$scope.queryCrowdDetailsByCrowdId(crowd.id);//相似人群id
			
			/*转化设置start*/
			$scope.selectedTransformList = [];
			$scope.transformFilterObj = {
				keyword : "",
				transformEventsType : "1"
			};
			$scope.queryTransformsList();
			/*转化设置end*/
		}
		
		$scope.queryCrowdDetailsByCrowdId = function(crowdId){
			$scope.crowdScale = 0;
			LookalikeCrowdService.getLookalikeWithScale(crowdId).then(function(crowd){
    			//$scope.crowdScale = crowd.scale;
				$scope.crowdScale = crowd.predictNum;
    		});
			/*$scope.crowdScale = 0;
			CrowdService.getCrowdWithScale(crowdId).then(function(crowd){
    			$scope.crowdScale = crowd.scale;
    		});*/
    	}
		
		/**
		 * 将需要的客群信息赋值给dsp投放
		 */
		$scope.setDspLaunchByCrowd = function(crowd){
			$scope.dspLaunch.crowdType = 'LC';
			$scope.dspLaunch.crowdName = crowd.name;
		}
		/**
		 * 暂时不用
		 * 查询所有有效的客群，除了自身（为了给排除客群选择框使用）
		 */
		$scope.queryEffectiveExceptself = function(crowd){
			CrowdService.queryEffectiveExceptself(crowd).then(function(crowds){
				var crowdList = angular.copy(crowds);
				$scope.deliveryCrowdObj.excludeActivityList = crowdList;	
				$scope.resetDeliveryPotential(crowd);
			});
			
		}
		
		$scope.resetDeliveryPotential = function(crowd){
    		$scope.deliveryCrowdObj.selectedExcludeActivity = [];
			var excludeIds = crowd.excludeIds;
			if(excludeIds){
				var excludeIdsArr = excludeIds.split(",");
				for(var i = 0; i < excludeIdsArr.length; i++){
					$scope.deliveryCrowdObj.selectedExcludeActivity.push(parseInt(excludeIdsArr[i]));
				}
				crowd.excludeList = excludeIdsArr;
				crowd.isExclude = true;
				$scope.isShowExclude = true;
			}else{
				crowd.excludeList = [];
				crowd.isExclude = false;
				$scope.isShowExclude = false;
			}
			
			if(crowd.dspChannel){
				crowd.isOutputToDSP = true;
				$scope.isShowOutputToDSP = true;
				$scope.deliveryCrowdObj.dspChannel = crowd.dspChannel;
			}else{
				crowd.isOutputToDSP = false;
				$scope.isShowOutputToDSP = false;
				$scope.deliveryCrowdObj.dspChannel = "";
			}
    	}
    	
    	$scope.checkIsShowExclude = function(isExclude){
    		if(isExclude){
    			$scope.isShowExclude = true;
    		}else{
    			$scope.isShowExclude = false;
    			$scope.deliveryCrowdObj.selectedExcludeActivity = [];
    		}
    	}
    	
    	$scope.checkIsShowOutputToDSP = function(isOutputToDSP){
    		if(isOutputToDSP){
    			$scope.isShowOutputToDSP = true;
    		}else{
    			$scope.isShowOutputToDSP = false;
    			$scope.deliveryCrowdObj.dspChannel = "";
    		}
    	}
    	
    	$scope.initDspChannelType = function(){
			var dspChannel = "";
			if($scope.dspChannelTypeList && $scope.dspChannelTypeList.length > 0){
				for(var i = 0; i < $scope.dspChannelTypeList.length; i++){
					if(i == 0){
						dspChannel = $scope.dspChannelTypeList[i].dicItemKey;
						break;
					}
				}
			}
			return dspChannel;
		}
    	
    	
    	/*投放end*/
    	
    	$scope.reCalCulateLookalikeCrowd = function(lookalikeCrowd){//重新计算相似人群
    		if(lookalikeCrowd.calcStatus == 1 || lookalikeCrowd.calcStatus == -4){//计算中
    			$.Pop.alerts("任务正在执行，不能重新计算");
    			return false;
    		}
			if(lookalikeCrowd.id){
				LookalikeCrowdService.reCalCulateLookalikeCrowd(lookalikeCrowd.id).then(function(lookalikeCrowd){
					//$state.go('lookalikeCrowds');
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			}
		}
    	
    	$scope.showMore = function(crowdId){
			if($scope.isShowMore == '0'){
				$scope.isShowMore = '1';
			}else if($scope.isShowMore == '1'){
				$scope.isShowMore = '0';
			}
    	}
    	
    	$scope.initDicByName = function(){
    		$scope.urlMap = angular.copy(appConfig.urlMap);
    		var params = {         
			        dicName : 'DMP_OBJECT_STATUS,DMP_BASE_CALC_RECORD_STATUS,COMMON_YES_NO,DSP_CHANNEL,CROWD_TYPE,USER_ACCOUNTID_PROFILE_COLUMNS,USER_APPTDID_PROFILE_COLUMNS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.dspChannelTypeList = angular.copy(appConfig.dicMap['DSP_CHANNEL']);
    			$scope.crowdTypeList =  angular.copy(appConfig.dicMap['CROWD_TYPE']);
    			
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.commonYesNo = angular.copy(appConfig.dicMap['COMMON_YES_NO']);
    			$scope.lookalikeCrowdStatus = angular.copy(appConfig.dicMap['DMP_OBJECT_STATUS']);
    			$scope.lookalikeCrowdCalStatus = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
    			
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
