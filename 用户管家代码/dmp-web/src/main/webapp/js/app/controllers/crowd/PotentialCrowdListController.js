define(['angularAMD', 'app/services/admin/DicService', 'app/services/crowd/PotentialCrowdService','app/services/crowd/CrowdService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','PotentialCrowdService','CrowdService','$state','NgTableParams', '$location', function ($scope,DicService,PotentialCrowdService,CrowdService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		
    		/*初始化种子客群start*/
    		$scope.isShowSeedCrowdDropdownMenu = false;
    		$scope.seedCrowdObj = {};
    		$scope.seedCrowdObj.keyword = "";
    		$scope.seedCrowdFilterList = [];
    		$scope.allSeedCrowdList = [];
    		/*初始化种子客群end*/
    		
    		$scope.queryAllCrowdList();
    		$scope.queryPotentialCrowd();
    		
    		/*投放start*/
    		
    		
    		$scope.deliveryPotentialCrowdObj = {
    			excludeActivityList : [],
    			selectedExcludeActivity : [],
    			dspChannel : "",
    			potentialCorwdNumbers : {
    				potentialCorwdNumber : "",
    				excludePotentialCrowdNumber : "",
    				havePotentialCorwdNumber : "",
    			}
    		};
    		$scope.isShowExclude = false;
    		$scope.isShowOutputToDSP = false;
    		
    		/*投放end*/
    		
    		$scope.copyPotentialCrowd = {};
    		$scope.copyPotentialCrowdOld = {};
    	};
    	
    	$scope.showMoreOperator = function(potentialCrowd){
    		for(var i = 0; i < $scope.potentialCrowdsList.length; i++){
    			if(potentialCrowd.id != $scope.potentialCrowdsList[i].id){
    				$scope.potentialCrowdsList[i].isShowMoreOperator = false;
    			}else{
    				potentialCrowd.isShowMoreOperator = !potentialCrowd.isShowMoreOperator;
    			}
    		}
    		if(potentialCrowd.isShowMoreOperator){
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
    		if($scope.potentialCrowdsList){
    			for(var i = 0; i < $scope.potentialCrowdsList.length; i++){
        			$scope.potentialCrowdsList[i].isShowMoreOperator = false;
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
		
		
		
		/*转化设置end*/
    	
    	$scope.queryPtentialCorwdNumbers = function(potentialCrowd){
    		
//    		$scope.deliveryPotentialCrowdObj.potentialCorwdNumbers = {
//				potentialCorwdNumber : 100,
//				excludePotentialCrowdNumber : 10,
//				havePotentialCorwdNumber : 20
//    		}
    		
    		PotentialCrowdService.queryPtentialCorwdNumbers(potentialCrowd).then(function(potentialCorwdInfo){
				var potentialCorwdInfo = angular.copy(potentialCorwdInfo);
//				$scope.deliveryPotentialCrowdObj.potentialCorwdInfo = potentialCorwdInfo.noExcludeCount;
				
//				$scope.total = data.noExcludeCount;
//                $scope.exclude = data.noExcludeCount - data.exclude1Count;                    
//                if (data.exclude2Count != undefined && data.exclude2Count != null) {
//                	$scope.actExcludeInfo = "，排除下列活动客户" + (data.exclude1Count - data.exclude2Count) + "人";
//                	$scope.potential = data.exclude2Count;
//                } else {
//                	$scope.actExcludeInfo = "，未进行活动排重";
//                	$scope.potential = data.exclude1Count;
//                }
                
				$scope.deliveryPotentialCrowdObj.potentialCorwdNumbers = {
					potentialCorwdNumber : potentialCorwdInfo.potentialInfo.noExcludeCount,
					excludePotentialCrowdNumber : potentialCorwdInfo.potentialInfo.exclude1Count,
					havePotentialCorwdNumber : potentialCorwdInfo.potentialInfo.exclude2Count
	    		}
			});
    		
    	}
    	
    	$scope.querydeliveredActivityList = function(potentialCrowd){
			PotentialCrowdService.queryDeliveredActivityList(potentialCrowd, 4).then(function(activities){
				var activitiyList = angular.copy(activities);
				$scope.deliveryPotentialCrowdObj.excludeActivityList = activitiyList;	
				$scope.resetDeliveryPotential(potentialCrowd);
			});
			
		}
    	
    	$scope.resetDeliveryPotential = function(potentialCrowd){
    		$scope.deliveryPotentialCrowdObj.selectedExcludeActivity = [];
			var excludeIds = potentialCrowd.excludeIds;
			if(excludeIds){
				var excludeIdsArr = excludeIds.split(",");
				for(var i = 0; i < excludeIdsArr.length; i++){
					$scope.deliveryPotentialCrowdObj.selectedExcludeActivity.push(parseInt(excludeIdsArr[i]));
				}
				potentialCrowd.excludeList = excludeIdsArr;
				potentialCrowd.isExclude = true;
				$scope.isShowExclude = true;
			}else{
				potentialCrowd.excludeList = [];
				potentialCrowd.isExclude = false;
				$scope.isShowExclude = false;
			}
			
			if(potentialCrowd.dspChannel){
				potentialCrowd.isOutputToDSP = true;
				$scope.isShowOutputToDSP = true;
				$scope.deliveryPotentialCrowdObj.dspChannel = potentialCrowd.dspChannel;
			}else{
				potentialCrowd.isOutputToDSP = false;
				$scope.isShowOutputToDSP = false;
				$scope.deliveryPotentialCrowdObj.dspChannel = "";
			}
    	}
    	
    	$scope.checkIsShowExclude = function(isExclude){
    		if(isExclude){
    			$scope.isShowExclude = true;
    		}else{
    			$scope.isShowExclude = false;
    			$scope.deliveryPotentialCrowdObj.selectedExcludeActivity = [];
    		}
    	}
    	
    	$scope.checkIsShowOutputToDSP = function(isOutputToDSP){
    		if(isOutputToDSP){
    			$scope.isShowOutputToDSP = true;
    		}else{
    			$scope.isShowOutputToDSP = false;
    			$scope.deliveryPotentialCrowdObj.dspChannel = "";
    		}
    	}
    	
    	$scope.queryPotentialCrowd = function(){
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
        			PotentialCrowdService.query(params).then(function(potentialCrowds){
        				$scope.potentialCrowdsList = potentialCrowds;
        				params.total(potentialCrowds.total);
                        $defer.resolve(potentialCrowds);
        			});
                }
            });
    	}
    	
    	$scope.showAddEidtPotentialLayer = function(potentialCrowd){
    		$scope.crowdScale = 0;
    		if(potentialCrowd){
    			$scope.copyPotentialCrowdOld = angular.copy(potentialCrowd);
				$scope.copyPotentialCrowd = angular.copy(potentialCrowd);
				//console.dir(["potentialCrowd",potentialCrowd]);
				//console.dir(["$scope.copyPotentialCrowd",$scope.copyPotentialCrowd]);
				/*var seedCrwodId = "";
				var seedObj = $scope.checkInputSeedCrowdIsHasNot(potentialCrowd);
				seedCrwodId = seedObj.crowd.id;
				$scope.queryCrowdDetailsByCrowdId(seedCrwodId);*/
				
			}else{
				$scope.copyPotentialCrowd = {};
				$scope.copyPotentialCrowd.acquisitionChannel = "0";
			}
    		
    		if(potentialCrowd && potentialCrowd.seedCrowdName != "" && potentialCrowd.seedCrowdName != undefined){
    			$scope.seedCrowdObj.keyword = potentialCrowd.seedCrowdName;
    		}else{
    			$scope.seedCrowdObj.keyword = "";
    		}
    		$scope.isShowSeedCrowdDropdownMenu = false;
    		$scope.checkSeedCrowdsIsValid();
    	}
    	
//    	$scope.exportPotentialCrowd = function(potentialCrowd){
//    		PotentialCrowdService.exportPotentialCrowd(potentialCrowd).then(function(potentialCrowd){
//				console.dir([potentialCrowd]);
//    		},function(response) {
//				if(response.data != null && !response.data.success){
//					$.Pop.alerts(response.data.msg);
//				}
//			});
//    	}
    	//潜客人群下载
    	$scope.exportPotentialCrowd = function(potentialCrowd){
    		PotentialCrowdService.exportPotentialCrowd(potentialCrowd).then(function(response){
    			if(response.success){
    				var host = 'http://'+window.location.host + $scope.urlMap.dmpUrl;
        			var params = {
        				url : host+'/crowd/potentialCrowds/exportPotentialCrowd/' + potentialCrowd.id
        			}
        			$.createDownloadIframe(params);
    			}else{
    				$.Pop.alerts(response.msg);
    			}
    			
    		},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
    		
		}
    	
    	$scope.checkInputSeedCrowdIsHasNot = function(potentialCrowd){
			var seedList = $scope.allSeedCrowdList,
			seedListLength = seedList.length;
			var seedObj = {
				has : false,
				crowd : {}
			};
			for(var i = 0; i < seedListLength; i++){
				if($scope.seedCrowdObj.keyword == seedList[i].name){
					seedObj = {
						has : true,
						crowd : seedList[i]
					};
					if(potentialCrowd){
						potentialCrowd.seedCrowdId = seedList[i].id;
					}
					break;
				}
			}
			return seedObj;
		}
    	
    	$scope.checkSeedCrowdsIsValid = function(){
    		$scope.crowdScale = 0;
    		var seedObj = $scope.checkInputSeedCrowdIsHasNot();
			if(seedObj.has && seedObj.crowd && seedObj.crowd.crowdCount){
				$scope.crowdScale = seedObj.crowd.crowdCount;
			}
    	}
		
		$scope.filterSeedCrowdsList = function(){
			$scope.isShowRangeCrowdDropdownMenu = false;
			$scope.seedCrowdFilterList = [];
			
			if($scope.allSeedCrowdList.length == 0){
				$scope.isShowSeedCrowdDropdownMenu = false;
				return false;
			}
			
			$scope.isShowSeedCrowdDropdownMenu = true;
			
			if($scope.seedCrowdObj.keyword == "" || $scope.seedCrowdObj.keyword == undefined){//显示所有
				$scope.seedCrowdFilterList = angular.copy($scope.allSeedCrowdList);
			}else{
				var seedList = $scope.allSeedCrowdList;
				var seedListLength = seedList.length;
				var hasFilter = false;
				for(var i = 0; i < seedListLength; i++){
					if(seedList[i].name){
						if(seedList[i].name.indexOf($scope.seedCrowdObj.keyword) != -1){
							$scope.seedCrowdFilterList.push(seedList[i]);
							hasFilter = true;
						}
					}
				}
				if(!hasFilter){
					$scope.hideSeedCrowdDropdowMenu();
				}
				
				
				
			}
			
		};
		$scope.selectSeedCrowdItem = function(seed){
			$scope.seedCrowdObj.keyword = seed.name;
			$scope.hideSeedCrowdDropdowMenu();
			//$scope.queryCrowdDetailsByCrowdId(seed.id);
			$scope.checkSeedCrowdsIsValid();
		};
		$scope.hideSeedCrowdDropdowMenu = function(){
			$scope.isShowSeedCrowdDropdownMenu = false;
		};
		
		$scope.onHideDropdownMenu = function(event) {
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.hideSeedCrowdDropdowMenu();
				$scope.isShowTransformDropdownMenu = false;
			}
		}
    	
    	$scope.queryAllCrowdList = function(){
			var params = {         
		        rows: 10000
			};
			
			CrowdService.queryForCrowdCount(params).then(function(crowds){
				var crowdsList = angular.copy(crowds);
				$scope.allSeedCrowdList = crowdsList;
			});
		}
    	
    	
    	
    	
		$scope.createPotentialCrowd = function(potentialCrowd){
			PotentialCrowdService.create(potentialCrowd).then(function(potentialCrowd){
				//$state.go('potentialCrowds'); 
				$state.reload(); 
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.editPotentialCrowd = function(potentialCrowd){
			PotentialCrowdService.update(potentialCrowd).then(function(potentialCrowd){
				$state.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
					$.copyObjAttributeToNewObj($scope.copyPotentialCrowdOld,potentialCrowd);
				}
			});
		};
		
		$scope.openDeliveryDialog = function(potentialCrowd){
			$scope.crowdScale = 0;
			if(potentialCrowd && potentialCrowd.acquisitionNumber){//人群规模用获客数量代替
				$scope.crowdScale = potentialCrowd.acquisitionNumber;
			}
			$scope.dspLaunch = {};
			$scope.dspLaunch.dspChannel = "1";
			$scope.dspLaunch.crowdId = potentialCrowd.id;
			
			//$scope.queryPtentialCorwdNumbers(potentialCrowd);
//			$scope.queryAllActivityList();
			//$scope.querydeliveredActivityList(potentialCrowd);
			$scope.openDeliveryDialogCrowd = potentialCrowd;
			$scope.setDspLaunchByCrowd(potentialCrowd);
			//$scope.queryCrowdDetailsByCrowdId(potentialCrowd.seedCrowdId);//潜在人群种子人群id
			
			/*转化设置start*/
			$scope.selectedTransformList = [];
			$scope.transformFilterObj = {
				keyword : "",
				transformEventsType : "1"
			};
			$scope.queryTransformsList();
			/*转化设置end*/
		}
		
		/*$scope.queryCrowdDetailsByCrowdId = function(crowdId){
			$scope.crowdScale = 0;
			CrowdService.getCrowdWithScale(crowdId).then(function(crowd){
    			$scope.crowdScale = crowd.scale;
    		});
    	}*/
		
		/**
		 * 将需要的客群信息赋值给dsp投放
		 */
		$scope.setDspLaunchByCrowd = function(crowd){
			$scope.dspLaunch.crowdType = 'PC';
			$scope.dspLaunch.crowdName = crowd.name;
		}
		
		$scope.deliveryPotentialCrowd = function(potentialCrowd){//投放潜在客群
			
			if(potentialCrowd.dspStartDate && potentialCrowd.dspEndDate){
				if(potentialCrowd.dspStartDate > potentialCrowd.dspEndDate){
					$.Pop.alerts("开始日期不能大于结束日期");
					return false;
				}
			}else{
				$.Pop.alerts("请选择活动开始日期和结束日期");
				return false;
			}
			
			//if(potentialCrowd.isOutputToDSP){//需要输出到需求方平台（DSP）
				if($scope.deliveryPotentialCrowdObj.dspChannel){
					potentialCrowd.dspChannel = $scope.deliveryPotentialCrowdObj.dspChannel;
				}else{
					$.Pop.alerts("请选择需求方平台（DSP）");
					return false;
				}
			//}	
			
			if(potentialCrowd.isExclude){//需要排除已投放客户
				if($scope.deliveryPotentialCrowdObj.selectedExcludeActivity && $scope.deliveryPotentialCrowdObj.selectedExcludeActivity.length > 0){
					potentialCrowd.excludeList = $scope.deliveryPotentialCrowdObj.selectedExcludeActivity;
				}else{
					$.Pop.alerts("请选择排除已投放客户");
					return false;
				}
			}
			
			
			
			
			PotentialCrowdService.launchPotentialCrowd(potentialCrowd).then(function(potentialCrowd){
				$state.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		}
		
		$scope.savePotentialCrowd = function(potentialCrowd){
			if(potentialCrowd){
				$.copyObjAttributeToNewObj($scope.copyPotentialCrowd,potentialCrowd);
			}else{
				potentialCrowd = $scope.copyPotentialCrowd;
			}
			
			if(!potentialCrowd.name){
				$.Pop.alerts("人群名称不能为空，请填写");
				return false;
			}
			if(!potentialCrowd.acquisitionNumber){
				$.Pop.alerts("潜客数量不能为空，请填写");
				return false;
			}else{
				var predictNumIsInteger = $.checkNumberIsInteger(potentialCrowd.acquisitionNumber);
				if(!predictNumIsInteger){
					$.Pop.alerts("潜客数量必须为正整数，请重新输入");
					return false;
				}
			}
			if(!potentialCrowd.acquisitionChannel){
				//$.Pop.alerts("请选择获客渠道");
				//return false;
				potentialCrowd.acquisitionChannel = $scope.initAcquisitionChannel();
			}
			
			if($scope.seedCrowdObj.keyword){
				var seedObj = $scope.checkInputSeedCrowdIsHasNot(potentialCrowd);
				if(!seedObj.has){
					$.Pop.alerts("输入的种子客群不存在，请重新输入");
					return false;
				}else if(seedObj.crowd && seedObj.crowd.crowdCount == 0){
					$.Pop.alerts("不能使用人群规模为0的种子人群 ");
					return false;
				}
			}else{
				potentialCrowd.seedCrowdId = "";
				$.Pop.alerts("种子人群不能为空，请填写");
				return false;
			}
			potentialCrowd.id === undefined ? $scope.createPotentialCrowd (potentialCrowd) : $scope.editPotentialCrowd (potentialCrowd);
		};
		
		$scope.initAcquisitionChannel = function(){
			var acquisitionChannel = "";
			if($scope.acquisitionChannelList && $scope.acquisitionChannelList.length > 0){
				for(var i = 0; i < $scope.acquisitionChannelList.length; i++){
					if(i == 0){
						acquisitionChannel = $scope.acquisitionChannelList[i].dicItemKey;
						break;
					}
				}
			}
			return acquisitionChannel;
		}
		
		$scope.removePotentialCrowd = function(potentialCrowd){    	
			$.Pop.confirms('确定要删除潜在人群"'+potentialCrowd.name+'"？',function(){
				PotentialCrowdService.remove(potentialCrowd).then(function(potentialCrowd){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			});
		};
		
		$scope.search = function(){    		
			$scope.tableParams.filter({'q' : $scope.searchValue});
		};
		
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
		
		$scope.initDicByName = function(){
    		$scope.urlMap = angular.copy(appConfig.urlMap);
    		var params = {         
			        dicName : 'ACQUISITION_CHANNEL,DSP_CHANNEL,CROWD_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.acquisitionChannelList = angular.copy(appConfig.dicMap['ACQUISITION_CHANNEL']);
    			$scope.dspChannelTypeList = angular.copy(appConfig.dicMap['DSP_CHANNEL']);
    			$scope.crowdTypeList =  angular.copy(appConfig.dicMap['CROWD_TYPE']);
    			
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
