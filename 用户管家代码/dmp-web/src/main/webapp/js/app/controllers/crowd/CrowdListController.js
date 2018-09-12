define(['angularAMD', 'app/services/admin/DicService', 'app/services/crowd/CrowdService', 'app/services/tag/TagService','app/filters/common/CommonFilter','app/controllers/common/searchTagator'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','CrowdService','$state','NgTableParams', '$location','TagService', function ($scope,DicService,CrowdService,$state,NgTableParams,$location,TagService) {    	
    	$scope.init = function(){
    		/*$scope.tdDateCondition = {
    			dayOperationStatus : true,
    			fastSelectDays:[{
    				key:'0',
    				label:'今日',
    			},{
    				key:'-1',
    				label:'昨日',
    			},{
    				key:'-7',
    				label:'近7日',
    			},{
    				key:'-30',
    				label:'近30日',
    			},{
    				key:'-365',
    				label:'近一年',
    			}]
    		};*/
    		
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.exportObj = {};
    		$scope.exportObj.fields = [];
    		
    		$scope.isAddEditCate = 'add';
    		
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
        			CrowdService.query(params).then(function(crowds){
        				$scope.rebuildObjects(crowds);
        				params.total(crowds.total);
                        $defer.resolve(crowds);
                        
                        $scope.crowdsList = crowds;
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    		
    		$scope.tagList;
    		$scope.operateType = '';
    		$scope.isShowTagDropdownMenu = false;
    		$scope.tagObj = {};
    		$scope.tagObj.keyword = "";
    		$scope.tagfilterList;
    		
    		$scope.isShowMore = '0';
    		
    		$scope.crowdCopy = {};
    		$scope.crowdCopyOld = {};
    		
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
				var ngTableBodyHg = winHg - operatorPanelHg - ngTableHeadHg - moreSearchBoxHg - 40 - 50;
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
		
		/*转化设置end*/
    	
    	
    	$scope.checkCrowdRelationIsCompute = function(crowd){
    		CrowdService.checkCrowdRelationIsCompute(crowd.id).then(function(response){
    			if(response){
    				window.location.href = '#/crowd/crowds/'+crowd.id+'/relation';
    			}else{
    				$.Pop.alerts('人群"'+crowd.name+'"还没有计算完成，请稍后重试');
    			}
    		},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
    	}
    	
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
    		
    		if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
    	}
    	
    	$scope.clickModal = function(){
    		if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
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
					crowdId:$scope.exportObj.crowdId,
					exportType : $scope.exportObj.exportType,
					description: $scope.exportObj.description
				};
				
				CrowdService.exportCrowd(exportObj).then(function(response){
					if(response.fileFlag == true){
						var exportType = "";
						for(var i = 0; i < $scope.exportObj.exportType.length; i++){
							if(i == $scope.exportObj.exportType.length - 1){
								exportType += $scope.exportObj.exportType[i];
							}else{
								exportType += $scope.exportObj.exportType[i]+',';
							}
						}
						var host = 'http://'+window.location.host + $scope.urlMap.dmpUrl;
						var params = {
							url : host+'/crowd/crowds/downloadCrowdFile?exportType='+exportType+'&crowdId=' + $scope.exportObj.crowdId
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
    		//createDownloadForm(params);
    		//$.Pop.confirms('导出成功，文件已经生成，确定要下载吗？',function(){
    			//$("#download_form").submit();
    			$.createDownloadIframe(params);
    		//});
    	}
    	
    	
		$scope.createCrowd = function(crowd){
			CrowdService.create(crowd).then(function(crowd){
				//$state.go('crowds');
				$state.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
			
		};
		
		$scope.editCrowd = function(crowd){
			CrowdService.update(crowd).then(function(crowd){
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
					$.copyObjAttributeToNewObj($scope.crowdCopyOld,crowd);
				}
			});
		};
		
		$scope.saveCrowd = function(crowd){
			if(crowd){
				$.copyObjAttributeToNewObj($scope.crowdCopy,crowd);
			}else{
				crowd = $scope.crowdCopy;
			}
			
			if(!crowd.name){
				$.Pop.alerts("人群名称不能为空，请填写人群名称");
				return false;
			}else if(!$scope.tagObj.keyword){
				$.Pop.alerts("添加标签不能为空，请选择");
				return false;
			}
			
			var tagList = $scope.tagList,
			tagListLength = tagList.length,
			hasTag = false,
			tagStatus = true;
			for(var i = 0; i < tagListLength; i++){
				if($scope.tagObj.keyword == tagList[i].name){
					hasTag = true;
					crowd.tagId = tagList[i].id;
					if(tagList[i].status != 2){
						tagStatus = false;
						break;
					}
				}
			}
			if(!hasTag){
				$.Pop.alerts("添加标签不存在，请重新选择添加");
				return false;
			}
			if(!tagStatus){
				$.Pop.alerts("添加标签未生效，不能创建人群");
				return false;
			}
			crowd.id === undefined ? $scope.createCrowd (crowd) : $scope.editCrowd (crowd);
		}
		
		$scope.removeCrowd = function(crowd){
			var createBy = crowd.createBy;
			var isViewRule = $scope.checkLoginUserIsViewRule(createBy);
			if(isViewRule){
				$.Pop.alerts("您没有权限删除他人创建的标签人群");
				return false;
			}
			
			$.Pop.confirms('确定要删除标签人群"'+crowd.name+'"？',function(){
				CrowdService.remove(crowd).then(function(crowd){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			});
		};	
		
		$scope.checkLoginUserIsViewRule = function(createBy){//验证登录用户权限，是否只有只读权限
			var isViewRule = false;
			var loginName = "";
			if(window.parent && window.parent.appConfig && window.parent.appConfig.user['loginName']){
				loginName = window.parent.appConfig.user['loginName'];
			}else{
				loginName = appConfig.user['loginName'];
			}
			 
			if(loginName && createBy){
				if(createBy != loginName){
					isViewRule = true;
				}else{
					isViewRule = false;
				}
			}
			return isViewRule;
		}
		
		$scope.search = function(){  
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q' : $scope.searchValue,
					"name" : $scope.moreSearchCondition.name,
					"code" : $scope.moreSearchCondition.code,
					"touchPointType" : $scope.moreSearchCondition.touchPointType,
					"type" : $scope.moreSearchCondition.type,
					"description" : $scope.moreSearchCondition.description,
					"source" : $scope.moreSearchCondition.source,
					"status" : $scope.moreSearchCondition.status,
					"calcStatus" : $scope.moreSearchCondition.calcStatus,
					"updateDataTimeStart" : $scope.moreSearchCondition.updateDataTimeStart,
					"updateDataTimeEnd" : $scope.moreSearchCondition.updateDataTimeEnd,
					"creator" : $scope.moreSearchCondition.creator,
					"createTimeStart" : $scope.moreSearchCondition.createTimeStart,
					"createTimeEnd" : $scope.moreSearchCondition.createTimeEnd
				});
			}else{
				$scope.tableParams.filter({'q' : $scope.searchValue});
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
    		$scope.reloadMoreSearch.code = $location.search()['filter[code]'] || '';
    		$scope.reloadMoreSearch.touchPointType = $location.search()['filter[touchPointType]'] || '';
    		$scope.reloadMoreSearch.type = $location.search()['filter[type]'] || '';
    		$scope.reloadMoreSearch.description = $location.search()['filter[description]'] || '';
    		$scope.reloadMoreSearch.source = $location.search()['filter[source]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		$scope.reloadMoreSearch.calcStatus = $location.search()['filter[calcStatus]'] || '';
    		$scope.reloadMoreSearch.updateDataTimeStart = $location.search()['filter[updateDataTimeStart]'] || '';
    		$scope.reloadMoreSearch.updateDataTimeEnd = $location.search()['filter[updateDataTimeEnd]'] || '';
    		$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		if($scope.reloadMoreSearch.name || 
    		   $scope.reloadMoreSearch.code || 
    		   $scope.reloadMoreSearch.touchPointType || 
    		   $scope.reloadMoreSearch.type || 
    		   $scope.reloadMoreSearch.description || 
    		   $scope.reloadMoreSearch.source || 
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
    	    			code : $scope.reloadMoreSearch.code,
    	    			touchPointType : $scope.reloadMoreSearch.touchPointType,
    	    			type : $scope.reloadMoreSearch.type,
    	    			description : $scope.reloadMoreSearch.description,
    	    			source:$scope.reloadMoreSearch.source,
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
    			code:"",
    			touchPointType :"",
    			type :"",
    			description:"",
    			source:"",
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
		
		$scope.queryTagList = function(operate,crowd){ 
			if(crowd){
				$scope.crowdCopy = angular.copy(crowd);
				$scope.crowdCopyOld = angular.copy(crowd);
			}else{
				$scope.crowdCopy = {};
			}
			
			$scope.hideTagDropdowMenu();
			if(operate == 'edit'){
				$scope.tagObj.keyword = crowd.tagName;
			}else{
				$scope.tagObj.keyword = "";
			}
			$scope.operateType = operate;
			var params = {         
		        rows: 10000
			};
			
			TagService.queryAllTagList(params).then(function(tags){
				$scope.tagList = tags;
			});
		};
		
		$scope.filterTagList = function(keyword){
			$scope.tagfilterList = [];
			if($scope.tagList && $scope.tagList.length == 0){
				$scope.isShowTagDropdownMenu = false;
				return false;
			}
			$scope.isShowTagDropdownMenu = true;
			
			if(keyword == ""){//显示所有
				$scope.tagfilterList = angular.copy($scope.tagList);
			}else{
				var tagList = $scope.tagList;
				var tagListLength = tagList.length;
				var hasFilter = false;
				for(var i = 0; i < tagListLength; i++){
					if(tagList[i].name.toUpperCase().indexOf(keyword.toUpperCase()) != -1){
						$scope.tagfilterList.push(tagList[i]);
						hasFilter = true;
					}
				}
				if(!hasFilter){
					$scope.hideTagDropdowMenu();
				}
			}
		};
		$scope.selectTagItem = function(tag){
			$scope.tagObj.keyword = tag.name;
			$scope.hideTagDropdowMenu();
		};
		$scope.hideTagDropdowMenu = function(){
			$scope.isShowTagDropdownMenu = false;
		};
		$scope.onHideDropdownMenu = function(event) {
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.hideTagDropdowMenu();
				$scope.isShowTransformDropdownMenu = false;
			}
		}
		
		
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
			$scope.queryCrowdDetailsByCrowdId(crowd.id);
			
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
			CrowdService.getCrowdWithScale(crowdId).then(function(crowd){
    			$scope.crowdScale = crowd.scale;
    		});
    	}
		
		/**
		 * 将需要的客群信息赋值给dsp投放
		 */
		$scope.setDspLaunchByCrowd = function(crowd){
			$scope.dspLaunch.crowdType = 'TC';
			$scope.dspLaunch.crowdName = crowd.name;
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
    	
    	$scope.showMoreOperator = function(crowd){
    		for(var i = 0; i < $scope.crowdsList.length; i++){
    			if(crowd.id != $scope.crowdsList[i].id){
    				$scope.crowdsList[i].isShowMoreOperator = false;
    			}else{
    				crowd.isShowMoreOperator = !crowd.isShowMoreOperator;
    			}
    		}
    		if(crowd.isShowMoreOperator){
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
    		if($scope.crowdsList){
    			for(var i = 0; i < $scope.crowdsList.length; i++){
        			$scope.crowdsList[i].isShowMoreOperator = false;
        		}
        		$scope.$apply();
    		}
    	}
    	
    	document.onclick = function(){
    		$scope.hideMoreOperator();
    	};
    	
    	$scope.getHash = function(){
    		$scope.curHash = window.location.hash;
    	}
    	
    	$scope.goToCrowdPortrait = function(crowd){
    		crowd = crowd || {};
    		if(!crowd.id){
    			return false;
    		}
    		
    		$.layerLoading.show();
    		$scope.getHash();
    		$state.go('crowd_portrait', { crowdId: crowd.id ,parentHash: $scope.curHash});
    	}
    	
    	$scope.goToCrowdExport = function(crowd){
    		if(!crowd || crowd.crowdCount == 0){
    			$.Pop.alerts("人群规模为0，不能导出");
    			return false;
    		}
    		$.layerLoading.show();
    		$state.go('crowds_export', { crowdId: crowd.id,sourcePage:'人群列表'});
    	}

    	$scope.initDicByName = function(){
    		$scope.urlMap = angular.copy(appConfig.urlMap);
    		var params = {         
			        dicName : 'TAG_SOURCE,DSP_CHANNEL,CROWD_TYPE,USER_ACCOUNTID_PROFILE_COLUMNS,USER_APPTDID_PROFILE_COLUMNS,DMP_OBJECT_STATUS,DMP_BASE_CALC_RECORD_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
        		$scope.dspChannelTypeList = angular.copy(appConfig.dicMap['DSP_CHANNEL']);
        		$scope.crowdTypeList =  angular.copy(appConfig.dicMap['CROWD_TYPE']);
        		
        		$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
        		$scope.tagSources = angular.copy(appConfig.dicMap['TAG_SOURCE']);
        		$scope.crowdStatus = angular.copy(appConfig.dicMap['DMP_OBJECT_STATUS']);
        		$scope.crowdCalcStatus = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
        		
    			$scope.init();
    		});
    	}
    	$scope.initDicByName();

    }];
});
