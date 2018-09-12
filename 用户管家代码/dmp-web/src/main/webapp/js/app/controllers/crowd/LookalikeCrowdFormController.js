define(['angularAMD','css!../../../../css/app/crowd/crowd', 'app/services/crowd/LookalikeCrowdService','app/services/crowd/CrowdService','app/services/tag/TagService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope','$rootScope', '$stateParams', 'LookalikeCrowdService','CrowdService','TagService', '$state', function ($scope,$rootScope, $stateParams, LookalikeCrowdService,CrowdService,TagService, $state) {
    	$scope.viewEditLookalikeCrowd = function(){
    		$scope.isViewRule = true;
    		LookalikeCrowdService.getById($stateParams.lookalikeCrowdId).then(function(lookalikeCrowd){
    			$scope.isViewRule = $scope.checkLoginUserIsViewRule(lookalikeCrowd.createBy);
    			if(lookalikeCrowd && lookalikeCrowd.seedCrowdName){
    				$scope.seedCrowdObj.keyword = lookalikeCrowd.seedCrowdName;
    			}
    			if(lookalikeCrowd && lookalikeCrowd.rangeCrowdName){
    				$scope.rangeCrowdObj.keyword = lookalikeCrowd.rangeCrowdName;
    			}
    			$scope.lookalikeCrowd = lookalikeCrowd;    		
    			
    			if($scope.lookalikeCrowd && $scope.lookalikeCrowd.crowdModel){
    				$scope.isUseAdvancedSettings = true;
    				if($scope.lookalikeCrowd.crowdModel.algorithmParam){
        				$scope.selectedTagList = JSON.parse($scope.lookalikeCrowd.crowdModel.algorithmParam);
        			}
    				if($scope.lookalikeCrowd.algorithmId){
    					$scope.lookalikeCrowd.algorithmId = $scope.lookalikeCrowd.algorithmId.toString();
    				}else{
    					$scope.lookalikeCrowd.algorithmId = $scope.getTdAlgorithm();
    				}
    				if($scope.lookalikeCrowd.crowdModel.algorithmId){
    					$scope.lookalikeCrowd.crowdModel.algorithmId = $scope.lookalikeCrowd.crowdModel.algorithmId.toString();
    				}
    			}
    			$scope.blurSeedCrowdList();
    			$rootScope.lookalikeCrowdName = lookalikeCrowd.name;
    			$scope.lookalikeCrowdName = lookalikeCrowd.name;
			});
		};
		
		$scope.checkLoginUserIsViewRule = function(createBy){//验证登录用户权限，是否只有只读权限
			var isViewRule = false;
			if($scope.loginUser.loginName && createBy){
				if(createBy != $scope.loginUser.loginName){
					isViewRule = true;
				}else{
					isViewRule = false;
				}
			}
			return isViewRule;
		}
		
		
		$scope.createLookalikeCrowd = function(lookalikeCrowd){
			$.layerLoading.show();
			LookalikeCrowdService.create(lookalikeCrowd).then(function(lookalikeCrowd){
				$.layerLoading.hide();
				$.Pop.alerts("人群放大添加成功", "/crowd/lookalikeCrowds");
				//$state.go('lookalikeCrowds');
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
//					var msg = JSON.parse(response.data.msg);
					if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "/crowd/lookalikeCrowds");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "/crowd/lookalikeCrowds");
					}else if(response.data.errorCode && response.data.errorCode == '9001'){
						var errMesObject = JSON.parse(response.data.msg);
						if(errMesObject && errMesObject.crowdNameError){
							$scope.errorMessage = errMesObject.crowdNameError;
							$scope.isRepeadLookalikeName = true;
						}
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						var errMesObject = JSON.parse(response.data.msg);
						if(errMesObject && errMesObject.rangeCrowdError){
							$.Pop.alerts(errMesObject.rangeCrowdError);
						}else if(errMesObject && errMesObject.algorithmParamError){
							$.Pop.alerts(errMesObject.algorithmParamError);
						}
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};
		
		$scope.restartLookalikeCrowd = function(lookalikeCrowd){
			if(lookalikeCrowd.calcStatus == -4){
				$.Pop.alerts("正在重新计算，请稍后再试");
				return false;
			}
			$.layerLoading.show();
			LookalikeCrowdService.restartLookalikeCrowd(lookalikeCrowd.id).then(function(data){
				$.layerLoading.hide();
				//$scope.goBackHistory();
				$.Pop.alerts('人群放大发起重新计算成功', "history_back");
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "history_back");
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		}
		
		$scope.editLookalikeCrowd = function(lookalikeCrowd){
			$.layerLoading.show();
			LookalikeCrowdService.update(lookalikeCrowd).then(function(lookalikeCrowd){
				$.layerLoading.hide();
				$.Pop.alerts("人群放大编辑成功", "history_back");
				//$scope.goBackHistory();
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					var msg = JSON.parse(response.data.msg);
					if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts($scope.getFirstMsg(msg), "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts($scope.getFirstMsg(msg), "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '9001'){
						var errMesObject = JSON.parse(response.data.msg);
						if(errMesObject && errMesObject.crowdNameError){
							$scope.errorMessage = errMesObject.crowdNameError;
							$scope.isRepeadLookalikeName = true;
						}
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						var errMesObject = JSON.parse(response.data.msg);
						if(errMesObject && errMesObject.rangeCrowdError){
							$.Pop.alerts(errMesObject.rangeCrowdError);
						}else if(errMesObject && errMesObject.algorithmParamError){
							$.Pop.alerts(errMesObject.algorithmParamError);
						}
					}else{
						$.Pop.alerts($scope.getFirstMsg(msg));
					}
				}
			});
		};
		
		$scope.getFirstMsg = function(msg){
			for(var p in msg){
				return msg[p];
			}
		}
		
		$scope.goBackHistory = function(){
			window.history.back();
		}
		
		$scope.inputLookalikeCrowdName = function(lookalikeCrowd){
			$scope.isRepeadLookalikeName = false;
		}
		
		$scope.buildAlikeCrowdDesc = function(lookalikeCrowd){
			var description = '选取<b style="color:#5f93e1;">';
			description += lookalikeCrowd.seedCrowdName;
			description += '</b>为种子人群，在<b style="color:#5f93e1;">';
			if(lookalikeCrowd.rangeCrowdName){
				description += lookalikeCrowd.rangeCrowdName;
			}else{
				description += '全部用户';
			}
			description += '</b>范围内按照<b style="color:#5f93e1;">';
			description += lookalikeCrowd.algorithmName;
			description += '</b>进行预测，且预测规模限制在<b style="color:#5f93e1;">';
			if(lookalikeCrowd.isExcludeSeedCrowd){
				description += '已排除';
			}else{
				description += '未排除';
			}
			description += '</b>种子人群。';
			return description;
		}
		
		$scope.saveLookalikeCrowd = function(lookalikeCrowd,formHorizontal){
			if(!lookalikeCrowd || !lookalikeCrowd.name){
				formHorizontal.lookalikeCrowdName.$dirty = true;
				//$.Pop.alerts("人群名称不能为空，请填写人群名称");
				return false;
			}
			
			$scope.predictNumIsError = '';
			if(!lookalikeCrowd.predictNum){
				//$.Pop.alerts("预测规模不能为空，请输入");
				formHorizontal.predictNum.$dirty = true;
				return false;
			}else{
				var predictNumIsInteger = $.checkNumberIsInteger(lookalikeCrowd.predictNum);
				if(!predictNumIsInteger){
					//$.Pop.alerts("预测规模必须为正整数，请重新输入");
					$scope.predictNumIsError = 'int';
					return false;
				}
				if(lookalikeCrowd.predictNum == 0){
					$scope.predictNumIsError = 'zero';
					return false;
				}
				if(lookalikeCrowd.predictNum > 2147483647){
					$scope.predictNumIsError = 'max';
					//$.Pop.alerts("人群规模超出最大值，目前支持最大值为：2147483647");
					return false;
				}
			}
			
			
			$scope.seedCrowdIdIsError = false;
			if(!$scope.seedCrowdObj.keyword && !lookalikeCrowd.seedCrowdId){
				//formHorizontal.seedCrowdId.$dirty = true;
				//$.Pop.alerts("请输入有效的种子人群");
				$scope.seedCrowdIdIsError = true;
				return false;
			}else{
				var seedObj = $scope.checkInputSeedCrowdIsHasNot(lookalikeCrowd);
				if($scope.seedCrowdObj.keyword){
					if(!seedObj.has){
						$scope.seedCrowdIdIsError = true;
						//formHorizontal.seedCrowdId.$dirty = true;
						//$.Pop.alerts("请输入有效的种子人群");
						return false;
					}else if(seedObj.crowd && seedObj.crowd.crowdCount == 0){
						$scope.seedCrowdIdIsError = true;
						//formHorizontal.seedCrowdId.$dirty = true;
						//$.Pop.alerts("请输入有效的种子人群 ");
						return false;
					}
				}else{
					lookalikeCrowd.seedCrowdId = "";
				}
			}
			
			if($scope.isUseAdvancedSettings){
				if(!lookalikeCrowd.crowdModel){
					lookalikeCrowd.crowdModel = {};
				}
				
				/*if(!lookalikeCrowd.crowdModel || !lookalikeCrowd.crowdModel.algorithmId){
					$.Pop.alerts("请选择训练算法");
					return false;
				}*/
				
				var crowds = $scope.createTagDatas();
				if(crowds.length > 0){
					lookalikeCrowd.crowdModel.algorithmParam = JSON.stringify(crowds);
				}else{
					lookalikeCrowd.crowdModel.algorithmParam = "";
				}
				/*if(lookalikeCrowd.crowdModel.tags.length == 0){
					$.Pop.alerts("训练参数不能为空，请选择");
					return false;
				}*/
				
				var rangeObj = $scope.checkInputRangeCrowdIsHasNot(lookalikeCrowd);
				if($scope.rangeCrowdObj.keyword){
					if(!rangeObj.has){
						formHorizontal.rangCrowd.$dirty = true;
						formHorizontal.rangCrowd.$valid = false;
						formHorizontal.rangCrowd.errorText = "请输入有效的范围人群";
						//$.Pop.alerts("请输入有效的范围人群");
						return false;
					}else if(rangeObj.crowd && rangeObj.crowd.crowdCount == 0){
						formHorizontal.rangCrowd.$dirty = true;
						formHorizontal.rangCrowd.$valid = false;
						formHorizontal.rangCrowd.errorText = "范围人群不能使用人群规模为0的人群";
						//$.Pop.alerts("范围人群不能使用人群规模为0的人群");
						return false;
					}
				}else{
					lookalikeCrowd.rangeCrowdName = null;
					lookalikeCrowd.rangeCrowdId = null;
				}
				
				if(!lookalikeCrowd.isExcludeSeedCrowd){
					lookalikeCrowd.isExcludeSeedCrowd = false;
				}
			}else{
				lookalikeCrowd.rangeCrowdId = null;
				lookalikeCrowd.rangeCrowdName = null;
				//lookalikeCrowd.algorithmId = "";
				lookalikeCrowd.algorithmId = $scope.getTdAlgorithm();
				lookalikeCrowd.isExcludeSeedCrowd = false;
				lookalikeCrowd.crowdModel = null;
			}
			
			if(!lookalikeCrowd.isOptimization){
				lookalikeCrowd.isOptimization = false;
			}
			
			var alikeCrowdDesc = $scope.buildAlikeCrowdDesc(lookalikeCrowd);
			lookalikeCrowd.description = alikeCrowdDesc;
			lookalikeCrowd.id === undefined ? $scope.createLookalikeCrowd (lookalikeCrowd) : $scope.editLookalikeCrowd (lookalikeCrowd);
			
		};
		
		$scope.queryAllCrowdList = function(){
			$scope.hideRangeCrowdDropdowMenu();
			
			CrowdService.queryValidCrowdList().then(function(crowds){
				var crowdsList = angular.copy(crowds);
				$scope.allRangeCrowdList = crowdsList;
				$scope.allSeedCrowdList = crowdsList;
				$scope.firstTagList = crowdsList;
			});
		}
		
		$scope.checkInputRangeCrowdIsHasNot = function(lookalikeCrowd){
			var rangeList = $scope.allRangeCrowdList,
			rangeListLength = rangeList.length;
			var rangeObj = {
				has : false,
				crowd : {}
			};
			for(var i = 0; i < rangeListLength; i++){
				if($scope.rangeCrowdObj.keyword == rangeList[i].name && $scope.seedTouchPointType == rangeList[i].touchPointType){
					rangeObj = {
						has : true,
						crowd : rangeList[i]
					};
					if(lookalikeCrowd){
						lookalikeCrowd.rangeCrowdId = rangeList[i].id;
					}
					break;
				}
			}
			return rangeObj;
		}
		
		$scope.filterRangeCrowdList = function(){
			$scope.seedTouchPointType = $scope.getSeedCrwodTouchPointType();//种子人群touchPointType
			
			$scope.isShowSeedCrowdDropdownMenu = false;
			$scope.rangeCrowdFilterList = [];
			
			if($scope.allRangeCrowdList.length == 0){
				$scope.isShowRangeCrowdDropdownMenu = false;
				return false;
			}
			
			if(!$scope.rangeCrowdObj.keyword){//显示所有
				$scope.rangeCrowdFilterList = angular.copy($scope.allRangeCrowdList);
				//$scope.rangeCrowdFilterList = [];
				$scope.isShowRangeCrowdDropdownMenu = true;
			}else{
				$scope.isShowRangeCrowdDropdownMenu = true;
				var rangeList = $scope.allRangeCrowdList;
				var rangeListLength = rangeList.length;
				var hasFilter = false;
				for(var i = 0; i < rangeListLength; i++){
					if(rangeList[i].name && rangeList[i].name.indexOf($scope.rangeCrowdObj.keyword) != -1){
						$scope.rangeCrowdFilterList.push(rangeList[i]);
						hasFilter = true;
					}
				}
				if(!hasFilter){
					$scope.hideRangeCrowdDropdowMenu();
				}
			}
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		};
		$scope.selectRangeCrowdItem = function(range){
			$scope.rangeCrowdObj.keyword = range.name;
			$scope.hideRangeCrowdDropdowMenu();
		};
		$scope.hideRangeCrowdDropdowMenu = function(){
			$scope.isShowRangeCrowdDropdownMenu = false;
		};
		
		$scope.checkInputSeedCrowdIsHasNot = function(lookalikeCrowd){
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
					if(lookalikeCrowd){
						lookalikeCrowd.seedCrowdId = seedList[i].id;
					}
					break;
				}
			}
			return seedObj;
		}
		
		$scope.changeSeedCrowdsList = function(lookalikeCrowd){
			lookalikeCrowd = lookalikeCrowd || {};
			$scope.selectedTagList = [];
			$scope.isUseAdvancedSettings = false;
			//$scope.seedCrowdIdIsError = false;
			
			$scope.rangeCrowdObj.keyword = "";
			lookalikeCrowd.isExcludeSeedCrowd = false;
			//lookalikeCrowd.algorithmId = "";
			lookalikeCrowd.algorithmId = $scope.getTdAlgorithm();
			if(lookalikeCrowd.crowdModel){
				lookalikeCrowd.crowdModel.algorithmId = "";
			}
			
			var seedCrwod = $scope.getSeeCrowdByKeyword();
			$scope.isAppTDID = $scope.checkSeedCrowdIsAppTDID(seedCrwod);
		}
		
		$scope.blurSeedCrowdList = function(){
			var seedCrwod = $scope.getSeeCrowdByKeyword();
			$scope.isAppTDID = $scope.checkSeedCrowdIsAppTDID(seedCrwod);
		}
		
		$scope.getSeedCrwodTouchPointType = function(){//获取种子人群的touchPointType
			var touchPointType = "";
			var seedCrwod = $scope.getSeeCrowdByKeyword();
			if(seedCrwod && seedCrwod.touchPointType){
				touchPointType = seedCrwod.touchPointType;
			}
			return touchPointType;
		}
		
		$scope.filterSeedCrowdsList = function(){
			$scope.isShowRangeCrowdDropdownMenu = false;
			$scope.seedCrowdFilterList = [];
			
			if($scope.allSeedCrowdList.length == 0){
				$scope.isShowSeedCrowdDropdownMenu = false;
				return false;
			}
			
			if(!$scope.seedCrowdObj.keyword){//显示所有
				$scope.seedCrowdFilterList = angular.copy($scope.allSeedCrowdList);
				//$scope.seedCrowdFilterList = [];
				$scope.isShowSeedCrowdDropdownMenu = true;
			}else{
				$scope.isShowSeedCrowdDropdownMenu = true;
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
		
		$scope.checkSeedCrowdIsAppTDID = function(seed){
			var isAppTDID = false;
			if(seed && seed.touchPointType == 'app_tdid'){
				isAppTDID = true;
			}
			return isAppTDID;
		}
		
		$scope.getSeeCrowdByKeyword = function(){
			var seedCrowd = {};
			var seedObj = $scope.checkInputSeedCrowdIsHasNot();
			if(seedObj.has){
				seedCrowd = seedObj.crowd;
			}
			return seedCrowd;
		}
		
		$scope.selectSeedCrowdItem = function(seed,lookalikeCrowd){
			$scope.seedCrowdObj.keyword = seed.name;
			$scope.hideSeedCrowdDropdowMenu();
			$scope.isAppTDID = $scope.checkSeedCrowdIsAppTDID(seed);
			
			$scope.lookalikeCrowd = $scope.lookalikeCrowd || {};
			if(!$scope.lookalikeCrowd.algorithmId){
				$scope.lookalikeCrowd.algorithmId = $scope.getTdAlgorithm();
			}else{
				$scope.lookalikeCrowd.algorithmId = $scope.lookalikeCrowd.algorithmId.toString();
			}
		};
		$scope.hideSeedCrowdDropdowMenu = function(){
			$scope.isShowSeedCrowdDropdownMenu = false;
		};
		
		$scope.queryAlgorithmList = function(){
			var params = {         
		        rows: 10000
			};
			
			LookalikeCrowdService.queryAllgorithms(params).then(function(algorithms){
				$scope.algorithmList = algorithms;
			});
		}
		
		$scope.getTdAlgorithm = function(){
			var algorithmId = "";
			if($scope.algorithmList && $scope.algorithmList.length > 0){
				for(var i = 0;i < $scope.algorithmList.length;i++){
					if($scope.algorithmList[i].type == 2){
						algorithmId = $scope.algorithmList[i].id.toString();
						break;
					}
				}
			}
			return algorithmId;
		}
		
		/*高级设置start*/
		$scope.tagSwitch = function(tagType){
			$scope.tagType = tagType;
		}
		
		$scope.queryFirstTagList = function(){ 
			$scope.hideFirstTagDropdowMenu();
			var params = {         
		        rows: 10000
			};
			
			/*TagService.queryAllTagList(params).then(function(tags){
				$scope.firstTagList = tags;
			});*/
		};
		
		$scope.filterFirstTagList = function(keyword){
			$scope.seedTouchPointType = $scope.getSeedCrwodTouchPointType();//种子人群touchPointType
			
			$scope.firstTagFilterList = [];
			if($scope.firstTagList.length == 0){
				$scope.isShowFirstTagDropdownMenu = false;
				return false;
			}
			
			if(!keyword){//显示所有
				$scope.firstTagFilterList = angular.copy($scope.firstTagList);
				//$scope.firstTagFilterList = [];
				$scope.isShowFirstTagDropdownMenu = true;
			}else{
				$scope.isShowFirstTagDropdownMenu = true;
				var firstTagList = $scope.firstTagList;
				var firstTagListLength = firstTagList.length;
				var hasFilter = false;
				for(var i = 0; i < firstTagListLength; i++){
					if(firstTagList[i].name.toUpperCase().indexOf(keyword.toUpperCase()) != -1){
						$scope.firstTagFilterList.push(firstTagList[i]);
						hasFilter = true;
					}
				}
				if(!hasFilter){
					$scope.hideFirstTagDropdowMenu();
				}
				
				if(event.keyCode == 13){
					var tag = $scope.checkInputTagIsValid(keyword,$scope.firstTagFilterList);
					if(!$.isNullObj(tag)){
						$scope.selectTagItem(tag);
					}else{
						$.Pop.alerts("输入的标签未查询到，请重新输入");
						return false;
					}
				}
			}
			
			$scope.hideHasSelectedFirstTags();//隐藏已经选择的第一方标签
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		};
		
		$scope.hideHasSelectedFirstTags = function(){
			for(var i = 0; i < $scope.selectedTagList.length;i++){
				for(var j = 0;j < $scope.firstTagFilterList.length;j++){
					if($scope.selectedTagList[i].id == $scope.firstTagFilterList[j].id && $scope.selectedTagList[i].source == $scope.firstTagFilterList[j].source){
						$scope.firstTagFilterList[j].hasSelected = true;
					}
				}
			}
		}
		
		$scope.hideFirstTagDropdowMenu = function(){
			$scope.isShowFirstTagDropdownMenu = false;
		};
		
		$scope.checkInputTagIsValid = function(keyword,tagList){//查询
			var tag = {};
			var tagListLength = tagList.length;
			for(var i = 0; i < tagListLength; i++){
				if(keyword == tagList[i].name){
					tag = tagList[i];
					break;
				}
			}
			return tag;
		}
		
		$scope.selectTagItem = function(tag){
			//if(tag.source == 1){//第一方标签
				$scope.firstTagObj.keyword = "";
				$scope.hideFirstTagDropdowMenu();
			//}else if(tag.source == 3){//第三方标签
				$scope.thirdTagObj.keyword = "";
				$scope.hideThirdTagDropdowMenu();
			//}
			
			var hasRepeat = $scope.checkHasRepeatSelectedTag(tag);
			if(hasRepeat){
				$.Pop.alerts("此标签已经添加了，不能重复添加");
				return false;
			}
			$scope.selectedTagList.push(tag);
			//$scope.firstTagObj.keyword = tag.name;
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		};
		
		//校验输入人群规模取值
		$scope.checkPredictNum = function(value){
			$scope.predictNumIsError = '';
			if(value){
				var predictNumIsInteger = $.checkNumberIsInteger(value);
				if(!predictNumIsInteger){
					$scope.predictNumIsError = 'int';
					return false;
				}
				if(value > 2147483647){
					$scope.predictNumIsError = 'max';
					//$.Pop.alerts("人群规模超出最大值，目前支持最大值为：2147483647");
					return false;
				}
			}
			
		}
		
		$scope.removeHasSelectedTag = function(tag){
			var selectedTagList = $scope.selectedTagList,
			selectedTagListLength = selectedTagList.length;
			for(var i = 0; i < selectedTagListLength; i++){
				if(tag.id == selectedTagList[i].id && tag.source == selectedTagList[i].source){
					$scope.selectedTagList.splice(i,1);
					break;
				}
			}
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		}
		
		$scope.checkHasRepeatSelectedTag = function(tag){
			var selectedTagList = $scope.selectedTagList,
			selectedTagListLength = selectedTagList.length,
			hasRepeat = false;
			for(var i = 0; i < selectedTagListLength; i++){
				if(tag.id == selectedTagList[i].id && tag.source == selectedTagList[i].source){
					hasRepeat = true;
					break;
				}
			}
			return hasRepeat;
		}
		
		$scope.queryThirdTagList = function(){ 
			$scope.hideThirdTagDropdowMenu();
			var params = {         
		        rows: 10000
			};
			
			TagService.queryAllExternTagList(params).then(function(tags){
				$scope.thirdTagList = tags;
			});
		};
		
		$scope.filterThirdTagList = function(keyword){
			
			$scope.thirdTagFilterList = [];
			if($scope.thirdTagList.length == 0){
				$scope.isShowThirdTagDropdownMenu = false;
				return false;
			}
			if(!keyword){//显示所有
				$scope.thirdTagFilterList = angular.copy($scope.thirdTagList);
				//$scope.thirdTagFilterList = [];
				$scope.isShowThirdTagDropdownMenu = true;
			}else{
				$scope.isShowThirdTagDropdownMenu = true;
				var thirdTagList = $scope.thirdTagList;
				var thirdTagListLength = thirdTagList.length;
				var hasFilter = false;
				for(var i = 0; i < thirdTagListLength; i++){
					if(thirdTagList[i].name.toUpperCase().indexOf(keyword.toUpperCase()) != -1){
						$scope.thirdTagFilterList.push(thirdTagList[i]);
						hasFilter = true;
					}
				}
				if(!hasFilter){
					$scope.hideThirdTagDropdowMenu();
				}
				
				if(event.keyCode == 13){
					var tag = $scope.checkInputTagIsValid(keyword,$scope.thirdTagFilterList);
					if(!$.isNullObj(tag)){
						$scope.selectTagItem(tag);
					}else{
						$.Pop.alerts("输入的标签未查询到，请重新输入");
						return false;
					}
				}
			}
			$scope.hideHasSelectedThirdTags();//隐藏已经选择的第三方标签
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		};
		
		$scope.hideHasSelectedThirdTags = function(){
			for(var i = 0; i < $scope.selectedTagList.length;i++){
				for(var j = 0;j < $scope.thirdTagFilterList.length;j++){
					if($scope.selectedTagList[i].id == $scope.thirdTagFilterList[j].id && $scope.selectedTagList[i].source == $scope.thirdTagFilterList[j].source){
						$scope.thirdTagFilterList[j].hasSelected = true;
					}
				}
			}
		}
		
		$scope.hideThirdTagDropdowMenu = function(){
			$scope.isShowThirdTagDropdownMenu = false;
		};
		
		$scope.onHideDropdownMenu = function(event){
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.isShowSeedCrowdDropdownMenu = false;
				$scope.isShowRangeCrowdDropdownMenu = false;
				$scope.isShowFirstTagDropdownMenu = false;
				$scope.isShowThirdTagDropdownMenu = false;
			}
		}
		
		$scope.changeIsUseAdvancedSettings = function(isUseAdvancedSettings){
			$scope.seedCrowdIdIsError = false;
			if(!$scope.seedCrowdObj.keyword){
				//$.Pop.alerts("请输入有效的种子人群");
				$scope.seedCrowdIdIsError = true;
				return false;
			}else{
				var seedObj = $scope.checkInputSeedCrowdIsHasNot();
				if(!seedObj.has){
					$scope.seedCrowdIdIsError = true;
					//$.Pop.alerts("请输入有效的种子人群");
					return false;
				}else if(seedObj.crowd && seedObj.crowd.crowdCount == 0){
					$scope.seedCrowdIdIsError = true;
					//$.Pop.alerts("请输入有效的种子人群 ");
					return false;
				}
			}
			$scope.isUseAdvancedSettings = isUseAdvancedSettings;
			
			if(!$scope.lookalikeCrowd.algorithmId){
				$scope.lookalikeCrowd.algorithmId = $scope.getTdAlgorithm();
			}else{
				$scope.lookalikeCrowd.algorithmId = $scope.lookalikeCrowd.algorithmId.toString();
			}
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		}
		
		$scope.createTagDatas = function(){
			var tags = [];
			for(var i = 0; i < $scope.selectedTagList.length; i++){
				var tag = {};
				tag.id = $scope.selectedTagList[i].id;
				tag.name = $scope.selectedTagList[i].name;
				tag.source = $scope.selectedTagList[i].source;
				tag.touchPointType = $scope.selectedTagList[i].touchPointType;
				tags.push(tag);
			}
			return tags;
		}
		/*高级设置end*/
		
		$scope.reCalCulateLookalikeCrowd = function(lookalikeCrowd){//重新计算相似人群
			if(lookalikeCrowd.id){
				LookalikeCrowdService.reCalCulateLookalikeCrowd(lookalikeCrowd.id).then(function(lookalikeCrowd){
					$state.go('lookalikeCrowds');
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
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
		
		$scope.init = function(){
			$scope.getUserLoginDetails();
			$scope.firstTagList = [];
			$scope.isAppTDID = false;
			$scope.isEdit = false;
			$scope.isRepeadLookalikeName = false;
			$scope.errorMessage = "";
			
			$scope.lookalikeCrowd; 
			
			/*初始化种子客群start*/
    		$scope.isShowSeedCrowdDropdownMenu = false;
    		$scope.seedCrowdObj = {};
    		$scope.seedCrowdObj.keyword = "";
    		$scope.seedCrowdFilterList = [];
    		$scope.allSeedCrowdList = [];
    		/*初始化种子客群end*/
    		
    		/*初始化范围客群start*/
    		$scope.isShowRangeCrowdDropdownMenu = false;
    		$scope.rangeCrowdObj = {};
    		$scope.rangeCrowdObj.keyword = "";
    		$scope.rangeCrowdFilterList = [];
    		$scope.allRangeCrowdList = [];
    		/*初始化范围客群end*/
    		
    		/*初始化预测算法start*/
    		$scope.algorithmList = [];
    		$scope.queryAlgorithmList();
    		/*初始化预测算法end*/
    		$scope.queryAllCrowdList();//查询所有客群列表
			
    		if($stateParams.lookalikeCrowdId){
    			$scope.isEdit = true;
    			$scope.viewEditLookalikeCrowd();
    		}
    		
    		/*人群模型start*/
    		$scope.isUseAdvancedSettings = false;
    		$scope.tagType = 1;//初始化为第一方标签
    		
    		$scope.selectedTagList = [];
    		
    		$scope.isShowFirstTagDropdownMenu = false;
    		$scope.firstTagObj = {};
    		$scope.firstTagObj.keyword = "";
    		$scope.firstTagFilterList = [];
    		//$scope.queryFirstTagList();
    		
    		$scope.thirdTagList = [];
    		$scope.isShowThirdTagDropdownMenu = false;
    		$scope.thirdTagObj = {};
    		$scope.thirdTagObj.keyword = "";
    		$scope.thirdTagFilterList = [];
    		$scope.queryThirdTagList();
    		/*人群模型end*/
		}
		
		$scope.init();
		  
    }];
});
