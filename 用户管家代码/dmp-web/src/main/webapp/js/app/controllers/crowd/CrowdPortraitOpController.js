define(['angularAMD','app/lib/tag/builder/DefinitionBuilder', 'app/controllers/tag/TagBuilder', 'app/controllers/crowd/CrowdDefinitionController','app/controllers/common/EchartsOptions','css!../../../../css/app/crowd/crowd','css!../../../../css/app/crowd/crowdOp','css!/enterprise/css/libs/zTreeStyle/zTreeStyle','echarts','mint','funnel', 'app/services/admin/DicService','app/services/crowd/CrowdPortraitService', 'app/services/crowd/CrowdService','app/services/tag/TagService', 'app/services/user/UserProfileService','app/directives/TdHighcharts','app/directives/TdEcharts','app/controllers/common/HighchartsOptions','app/filters/common/CommonFilter','app/directives/TdTreeSelect','app/directives/TdStringHtmlDirective'], function (angularAMD,DefinitionBuilder,TagBuilder,CrowdDefinitionController,EchartsOptions) {
    'use strict';
    return ['$scope','$rootScope','DicService','CrowdPortraitService','CrowdService','TagService','UserProfileService','$state','$stateParams', '$location','NgTableParams', function ($scope,$rootScope,DicService,CrowdPortraitService,CrowdService,TagService,UserProfileService,$state,$stateParams,$location,NgTableParams) {    
    	$scope.init = function(){
    		$scope.CrowdDefinitionController = null;
    		$scope.crowdId = $stateParams.crowdId;
    		$scope.parentHash = $stateParams.parentHash || "";
    		
	    	$scope.crowdDetails;
	    	if($scope.crowdId){
	    		$scope.queryCrowdDetailsCrowdId($scope.crowdId,false);//根据客群ID查询客群信息
	    	}
	    	
	    	$scope.cityPercent = {
    			one : '0.00',
    			two : '0.00',
    			three : '0.00'
    		};
	    	
	    	$scope.cityPercentCompare = {
    			one : '0.00',
    			two : '0.00',
    			three : '0.00'
    		};
	    	
	    	$scope.portraitDimentionKeywords = {
	    		keywords :''
	    	};
	    	var crowdportraitLocationConfig = eval("("+angular.copy(appConfig.crowdportraitLocationConfig)+")");
	    	$scope.crowdportraitConfigParam = {
	    			city:crowdportraitLocationConfig.city_attr,
	    			province:crowdportraitLocationConfig.province_attr
	    	};
    	};
    	
    	$scope.checkCrowdHasUsers = function(){
    		if($scope.crowdDetails){
    			var majorAccountObject = $scope.getMajorAccountObject($scope.touchPointTypes);
    			
    			if(!$scope.crowdDetails.majorAccount){
    				$scope.crowdInfo = {
		    			isShowBtns:false,
		    			user_profile_status:'-1',
		    			msg:'非'+majorAccountObject.dicItemValue+'类型的人群，不支持查看用户微观',
		    			msgInsight:'非'+majorAccountObject.dicItemValue+'类型的人群，不支持人群洞察'
		    		};
    				return false;
    			}
    			
				if($scope.crowdDetails && $scope.crowdDetails.userProfileStatus != '1'){
					$scope.crowdInfo = {
		    			isShowBtns:false,
		    			user_profile_status:'0',
		    			msg:'新建的人群，T+1日数据更新后才可以查看用户档案信息',
		    			msgInsight:'新建的人群，T+1日数据更新后才可以查看人群洞察信息'
		    		};
					return false;
				}
				
				if($scope.crowdDetails && $scope.crowdDetails.crowdCount == 0){
    				$scope.crowdInfo = {
		    			isShowBtns:false,
		    			user_profile_status:'2',
		    			msg:'人群规模为0，不支持用户微观',
		    			msgInsight:'人群规模为0，不支持人群洞察'
		    		};
    				return false;
    			}
				
				$scope.crowdInfo = {
	    			isShowBtns:true,
	    			msg:''
	    		};
    		}
    	}
    	
    	/*人群画像，人群洞察公共部分start*/
    	$scope.initTabGroups = function(){
    		if($scope.isShowCrowdCompareControl || $scope.isShowCrowdComparePanel){
    			$scope.tabGroups = [{
        			id:'crowdPortrait',
        			name:'人群画像',
        			isSelected :true,
        			isShowBtns:true
        		}];
    			
    			var portrait = $scope.getSelectedPortrait();
    			if(portrait && portrait.attributeGroupCode){
    				$scope.curAttributeGroupCode = portrait.attributeGroupCode;
    				$scope.curAttributeGroupName = portrait.attributeGroupName
        			//$scope.tabPortraitClick(portrait);
    			}
    		}else{
    			if(!$scope.crowdInfo.isShowBtns){
        			$scope.tabGroups = [{
            			id:'crowdPortrait',
            			name:'人群画像',
            			isSelected :true,
            			isShowBtns:true
            		},{
            			id:'crowdInsight',
            			name:'人群洞察',
            			isSelected :false,
            			isShowBtns:false
            		}];
        		}else{
        			$scope.tabGroups = [{
            			id:'crowdPortrait',
            			name:'人群画像',
            			isSelected :true,
            			isShowBtns:true
            		},{
            			id:'crowdInsight',
            			name:'人群洞察',
            			isSelected :false,
            			isShowBtns:true
            		}];
        		}
    		}
    		
    		$scope.initCurTabGroup();
    	}
    	
    	$scope.initCurTabGroup = function(){
    		for(var i = 0;i<$scope.tabGroups.length;i++){
    			if($scope.tabGroups[i].isSelected){
    				$scope.curTabGroup = $scope.tabGroups[i].id;
    				break;
    			}
    		}
    	}
    	
    	$scope.changeAttributeGroup = function(){
    		if($scope.tabGroups && $scope.tabGroups.length > 0){
    			for(var j = 0;j < $scope.tabGroups.length;j++){
    				var tab = $scope.tabGroups[j];
    				if(tab.isSelected){
    					if(tab.id == 'crowdPortrait'){
        	    			if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
        	        			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
        	        				if($scope.portraitAttributeGroups[i].isSelected){
        	        					$scope.curAttributeGroupCode = $scope.portraitAttributeGroups[i].attributeGroupCode;
        	        		    		$scope.curAttributeGroupName = $scope.portraitAttributeGroups[i].attributeGroupName;
        	        					break;
        	        				}
        	        			}
        	        		}
        	    		}else if(tab.id == 'crowdInsight'){
        	    			if($scope.crowdInsights && $scope.crowdInsights.length > 0){
        	        			for(var i = 0;i < $scope.crowdInsights.length;i++){
        	        				if($scope.crowdInsights[i].isSelected){
        	        					$scope.curAttributeGroupCode = $scope.crowdInsights[i].attributeGroupCode;
        	        		    		$scope.curAttributeGroupName = $scope.crowdInsights[i].attributeGroupName;
        	        					break;
        	        				}
        	        			}
        	        		}
        	    		}
    					break;
    				}
    			}
    		}
    	}
    	
    	
    	
    	$scope.tabGroupsClick = function(tab){
    		/*if(tab.isSelected){
    			return false;
    		}*/
    		for(var i = 0;i<$scope.tabGroups.length;i++){
    			$scope.tabGroups[i].isSelected = false;
    		}
    		tab.isSelected = true;
    		$scope.initCurTabGroup();
    		$scope.changeAttributeGroup();
    		
    		if($scope.curAttributeGroupCode == 'users'){
    			$scope.queryUserProfiles();
    		}else if($scope.curAttributeGroupCode == 'analysis'){
    			$scope.initCrowdAnalysis();
    		}
    		
    		if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
    	}
    	/*人群画像，人群洞察公共部分end*/

    	/*人群洞察start*/
    	$scope.initCrowdInsights = function(){
    		$scope.crowdInsights = [{
    			accountIdType: "app_tdid",
    			attributeGroupCode: "analysis",
    			attributeGroupName: "人群分析",
    			attributeGroupType: "crowd_analysis"
    		}/*,
    		{
    			accountIdType: "app_tdid",
    			attributeGroupCode: "users",
    			attributeGroupName: "用户列表",
    			attributeGroupType: "crowd_analysis"
    		}*/];
    		if($scope.crowdInsights && $scope.crowdInsights.length > 0){
    			for(var i = 0;i < $scope.crowdInsights.length;i++){
    				if(i == 0){
    					$scope.crowdInsights[i].isSelected = true;
    				}else{
    					$scope.crowdInsights[i].isSelected = false;
    				}
    			}
    		}
    	}
    	
    	$scope.initCrowdAnalysis = function(){
    		$scope.crowdAnalysisFilter = {
    			attribute:'',
    			startTime:'',
    			endTime:'',
    			time:'day',
    			chart:'4',
    			initDateRangeValue:'-30',
    			fastSelectDays:[,
    			{
    				key:'-3',
    				label:'近3日'
    			},{
    				key:'-7',
    				label:'近7日'
    			},{
    				key:'-30',
    				label:'近30日'
    			},
    			{
    				key:'-90',
    				label:'近90日'
    			}]
    		};
    		
    		$scope.getCrowdAnalysisIndicatorsList();
    		
    		$scope.getCrowdAnalysisTimesList();
    		$scope.getCrowdAnalysisMapsList();
    		
    		
    	}
    	
    	$scope.selectDefaultCrowdAnalysisIndicator = function(){
    		$scope.selectedAnalysisIndicatorsDimentions = [];
    		if($scope.crowdAnalysisIndicatorsList && $scope.crowdAnalysisIndicatorsList.length > 0){
    			$scope.selectedAnalysisIndicatorsDimentions.push($scope.crowdAnalysisIndicatorsList[0]);
    		}
    	}
    	
    	$scope.getCrowdAnalysisMapsList = function(){
    		$scope.crowdAnalysisMapsList = [{
    			id:'4',
    			label:'趋势图',
    			code:'trend'
    		},{
    			id:'2',
    			label:'汇总图',
    			code:'summary'
    		},{
    			id:'5',
    			label:'统计图',
    			code:'statistical'
    		}];
    	}
    	
    	$scope.getCrowdAnalysisTimesList = function(){
    		$scope.crowdAnalysisTimesList = [{
    			id:'day',
    			label:'天'
    		},{
    			id:'week',
    			label:'周'
    		},{
    			id:'month',
    			label:'月'
    		}];
    	}
    	
    	$scope.getCrowdAnalysisIndicatorsList = function(){
    		$scope.crowdAnalysisIndicatorsList = [];
    		var params = {
    			accountIdTypeCode : $scope.crowdDetails.touchPointType
    		};
    		CrowdPortraitService.queryCrowdAnalysisIndicators(params).then(function(data){
    			$scope.crowdAnalysisIndicatorsList = data;
    			$scope.selectDefaultCrowdAnalysisIndicator();
    			$scope.getCube();
    			//$scope.changeAnalysisIndicator();
    		});
    	}
    	
    	$scope.getCube = function(){
    		$scope.crowdAnalysisFilter.attribute='';
			$scope.crowdAnalysisAttributesList = [];
			$scope.crowdAnalysisAttributeValuesList = [];
			$scope.selectedAnalysisAttributesValuesDimentions = [];
			
    		if($scope.selectedAnalysisIndicatorsDimentions && $scope.selectedAnalysisIndicatorsDimentions.length == 1){
    			var cubeId = $scope.selectedAnalysisIndicatorsDimentions[0].cubeId;
	    		CrowdPortraitService.queryCube(cubeId).then(function(data){
	    			$scope.cube = data;
	    			$scope.crowdAnalysisAttributesList = $scope.cube.dimensions;
	    			$scope.changeAnalysisIndicator();
	    		});
    		}else{
    			$scope.changeAnalysisIndicator();
    		}
    	}
    	
    	$scope.checkAnalysisIndicatorsDimentionLength = function(){
    		var selectDimentionsLength = 0;
    		if($scope.crowdAnalysisIndicatorsList && $scope.crowdAnalysisIndicatorsList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisIndicatorsList.length;i++){
    				if($scope.crowdAnalysisIndicatorsList[i].isSelected){
    					selectDimentionsLength++;
    					if(selectDimentionsLength > 3){
    						break;
    					}
    				}
        		}
    		}
    		return selectDimentionsLength;
    	}
    	
    	$scope.toggleAnalysisIndicatorDimentionStatus = function(indicator){
    		indicator.isSelected = !indicator.isSelected;
    	}
    	
    	$scope.confirmSelectedAnalysisIndicatorsDimentions = function(){
    		var selectDimentionsLength = $scope.checkAnalysisIndicatorsDimentionLength();
    		if(selectDimentionsLength > 3){
    			$.Pop.alerts("最多可选择3个指标");
    		}else if(selectDimentionsLength == 0){
    			$.Pop.alerts("请至少选择1个指标");
    		}else{
    			$scope.resetSelectedAnalysisIndicatorsDimentions();
    			$scope.showHideAnalysisIndicatorsBox();
    			$scope.getCube();
    			//$scope.changeAnalysisIndicator();
    		}
    	}
    	
    	$scope.resetSelectedAnalysisIndicatorsDimentions = function(){
    		$scope.selectedAnalysisIndicatorsDimentions = [];
    		if($scope.crowdAnalysisIndicatorsList && $scope.crowdAnalysisIndicatorsList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisIndicatorsList.length;i++){
    				if($scope.crowdAnalysisIndicatorsList[i].isSelected){
    					$scope.selectedAnalysisIndicatorsDimentions.push($scope.crowdAnalysisIndicatorsList[i]);
    				}
        		}
    		}
    	}
    	
    	$scope.clearAnalysisIndicatorsKeywords = function(){
    		if($scope.analysisIndicatorsKeywords){
    			$scope.analysisIndicatorsKeywords.keywords = "";
    			$scope.searchAnalysisIndicatorsDimentions();
    		}
    	}
    	
    	$scope.buildFilterList = function(keywords,list){
    		var filterList = [];
    		if(keywords && list && list.length > 0){
    			for(var i = 0;i < list.length;i++){
    				var name = list[i].name;
    				if(name && name.indexOf(keywords) != -1){
    					filterList.push(list[i]);
    				}
    			}
    		}
    		return filterList;
    	}
    	
    	$scope.selectItemToList = function(item,list){
    		if(item && list && list.length > 0){
    			for(var i =0;i<list.length;i++){
    				if(item.id == list[i].id){
    					list[i].isSelected = true;
    					break;
    				}
    			}
    		}
    		$scope.clearAnalysisIndicatorsKeywords();
    	}
    	
    	$scope.searchAnalysisIndicatorsDimentions = function(){
    		$scope.filterCrowdAnalysisIndicatorsList = [];
    		var keywords = $scope.analysisIndicatorsKeywords.keywords || '';
    		if(keywords){
    			$scope.filterCrowdAnalysisIndicatorsList = $scope.buildFilterList(keywords,$scope.crowdAnalysisIndicatorsList);
    		}else{
    			//$scope.showAllAnalysisIndicators();
    		}
    	}
    	
    	$scope.showHideAnalysisIndicatorsBox = function(){
    		$scope.isShowAnalysisIndicatorsBox = !$scope.isShowAnalysisIndicatorsBox;
    		$scope.isShowAnalysisAttributesBox = false;
    		$scope.analysisIndicatorsKeywords = {
	    		keywords :''
	    	};
    		$scope.showAllAnalysisIndicators();
    		$scope.selectAnalysisIndicatorsDimentions();
    		
    		if($scope.isShowAnalysisIndicatorsBox){
    			if (window.parent && window.parent.iFrameScrollHeight) {
    				window.setTimeout(window.parent.iFrameScrollHeight, 200);
    			} 
    		}else{
    			if (window.parent && window.parent.iFrameHeight) {
    				window.setTimeout(window.parent.iFrameHeight, 200);
    			} 
    		}
    	}
    	
    	$scope.showAllAnalysisIndicators = function(){
    		if($scope.crowdAnalysisIndicatorsList && $scope.crowdAnalysisIndicatorsList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisIndicatorsList.length;i++){
    				$scope.crowdAnalysisIndicatorsList[i].isShow = true;
    				$scope.crowdAnalysisIndicatorsList[i].isSelected = false;
        		}
    		}
    	}
    	
    	$scope.selectAnalysisIndicatorsDimentions = function(){
    		if($scope.selectedAnalysisIndicatorsDimentions && $scope.selectedAnalysisIndicatorsDimentions.length > 0){
    			for(var i = 0;i < $scope.selectedAnalysisIndicatorsDimentions.length;i++){
    				for(var j = 0;j < $scope.crowdAnalysisIndicatorsList.length;j++){
    					if($scope.selectedAnalysisIndicatorsDimentions[i].id == $scope.crowdAnalysisIndicatorsList[j].id){
    						$scope.crowdAnalysisIndicatorsList[j].isSelected = true;
    					}
    				}
    			}
    		}
    	}
    	
    	$scope.showHideAnalysisAttributesBox = function(){
    		$scope.isShowAnalysisAttributesBox = !$scope.isShowAnalysisAttributesBox;
    		$scope.isShowAnalysisIndicatorsBox = false;
    		$scope.analysisAttributeValuesKeywords = {
	    		keywords :''
	    	};
    		$scope.showAllAnalysisAttributeValues();
    		$scope.selectAnalysisAttributesValuesDimentions();
    		if($scope.isShowAnalysisAttributesBox){
    			if (window.parent && window.parent.iFrameScrollHeight) {
    				window.setTimeout(window.parent.iFrameScrollHeight, 200);
    			} 
    		}else{
    			if (window.parent && window.parent.iFrameHeight) {
    				window.setTimeout(window.parent.iFrameHeight, 200);
    			} 
    		}
    	}
    	
    	$scope.goBackHistory = function() {
			window.history.back();
		}
    	
    	$scope.selectAnalysisAttributesValuesDimentions = function(){
    		if($scope.selectedAnalysisAttributesValuesDimentions && $scope.selectedAnalysisAttributesValuesDimentions.length > 0){
    			for(var i = 0;i < $scope.selectedAnalysisAttributesValuesDimentions.length;i++){
    				for(var j = 0;j < $scope.crowdAnalysisAttributeValuesList.length;j++){
    					if($scope.selectedAnalysisAttributesValuesDimentions[i].key == $scope.crowdAnalysisAttributeValuesList[j].key){
    						$scope.crowdAnalysisAttributeValuesList[j].isSelected = true;
    					}
    				}
    			}
    		}
    	}
    	
    	$scope.showAllAnalysisAttributeValues = function(){
    		if($scope.crowdAnalysisAttributeValuesList && $scope.crowdAnalysisAttributeValuesList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisAttributeValuesList.length;i++){
    				$scope.crowdAnalysisAttributeValuesList[i].isShow = true;
    				$scope.crowdAnalysisAttributeValuesList[i].isSelected = false;
        		}
    		}
    	}
    	
    	$scope.changeAnalysisAttribute = function(){
    		$scope.analysisAttributeValuesKeywords = {
	    		keywords :''
	    	};
    		$scope.getAnalysisAttributeValues();
    		
    	}
    	
    	$scope.getAnalysisAttributeValues = function(){
    		$scope.crowdAnalysisAttributeValuesList = [];
    		
    		if($scope.crowdAnalysisFilter.attribute && $scope.selectedAnalysisIndicatorsDimentions[0] && $scope.selectedAnalysisIndicatorsDimentions[0].code){
    			var params = {
    				cubeName:$scope.selectedAnalysisIndicatorsDimentions[0].code,
    				dimensionName : $scope.crowdAnalysisFilter.attribute
    			};
    			
    			$scope.isLoadingAnalysisAttributeValues = true;
    			$.layerLoading.show();
    			CrowdPortraitService.queryDimensionEnumValues(params).then(function(data){
    				$scope.isLoadingAnalysisAttributeValues = false;
    				$.layerLoading.hide();
    				$scope.crowdAnalysisAttributeValuesList = data;
    				$scope.showAllAnalysisAttributeValues();
    	    		$scope.checkIsShowAnalysisAttributeValuesDimentions();
    			},function(response){
    				$scope.isLoadingAnalysisAttributeValues = false;
    				$.layerLoading.hide();
    				if(response.data != null && !response.data.success){
    					//$.Pop.alerts(response.data.msg);
    				}
    			});
    		}
    	}
    	
    	$scope.selectAnalysisAttributeValuesKeyToList = function(item,list){
    		if(item && list && list.length > 0){
    			for(var i =0;i<list.length;i++){
    				if(item.key == list[i].key){
    					list[i].isSelected = true;
    					break;
    				}
    			}
    		}
    		$scope.clearAnalysisIndicatorsKeywords();
    		$scope.clearAnalysisAttributeValuesKeywords();
    	}
    	
    	$scope.clearAnalysisAttributeValuesKeywords = function(){
    		if($scope.analysisAttributeValuesKeywords){
    			$scope.analysisAttributeValuesKeywords.keywords = "";
    			$scope.searchAnalysisAttributeValuesDimentions();
    		}
    	}
    	
    	$scope.buildFilterCrowdAnalysisAttributeValuesList = function(keywords,list){
    		var filterList = [];
    		if(keywords && list && list.length > 0){
    			for(var i = 0;i < list.length;i++){
    				var name = list[i].value;
    				if(name && name.indexOf(keywords) != -1){
    					filterList.push(list[i]);
    				}
    			}
    		}
    		return filterList;
    	}
    	
    	$scope.searchAnalysisAttributeValuesDimentions = function(){
    		$scope.filterCrowdAnalysisAttributeValuesList = [];
    		var keywords = $scope.analysisAttributeValuesKeywords.keywords || '';
    		if(keywords){
    			$scope.filterCrowdAnalysisAttributeValuesList = $scope.buildFilterCrowdAnalysisAttributeValuesList(keywords,$scope.crowdAnalysisAttributeValuesList);
    			/*if($scope.crowdAnalysisAttributeValuesList && $scope.crowdAnalysisAttributeValuesList.length > 0){
        			for(var i = 0;i < $scope.crowdAnalysisAttributeValuesList.length;i++){
        				var value = $scope.crowdAnalysisAttributeValuesList[i].value;
        				if(value && value.indexOf(keywords) != -1){
        					$scope.crowdAnalysisAttributeValuesList[i].isShow = true;
        				}else{
        					$scope.crowdAnalysisAttributeValuesList[i].isShow = false;
        				}
        			}
        		}*/
    		}else{
    			//$scope.showAllAnalysisAttributeValues();
    		}
    		
    		$scope.checkIsShowAnalysisAttributeValuesDimentions();
    	}
    	
    	$scope.checkIsShowAnalysisAttributeValuesDimentions = function(){
    		$scope.isShowAnalysisAttributeValuesDimentions = false;
    		if($scope.crowdAnalysisAttributeValuesList && $scope.crowdAnalysisAttributeValuesList.length > 0){
    			for(var i = 0;i < $scope.crowdAnalysisAttributeValuesList.length;i++){
    				if($scope.crowdAnalysisAttributeValuesList[i].isShow){
    					$scope.isShowAnalysisAttributeValuesDimentions = true;
    					break;
    				}
    			}
    		}
    	}
    	
    	$scope.checkAnalysisAttributesValuesDimentionLength = function(){
    		var selectDimentionsLength = 0;
    		if($scope.crowdAnalysisAttributeValuesList && $scope.crowdAnalysisAttributeValuesList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisAttributeValuesList.length;i++){
    				if($scope.crowdAnalysisAttributeValuesList[i].isSelected){
    					selectDimentionsLength++;
    					if(selectDimentionsLength > 6){
    						break;
    					}
    				}
        		}
    		}
    		return selectDimentionsLength;
    	}
    	
    	$scope.toggleAnalysisAttributeValueDimentionStatus = function(attributeValue){
    		attributeValue.isSelected = !attributeValue.isSelected;
    	}
    	
    	$scope.confirmSelectedAnalysisAttributesValuesDimentions = function(){
    		/*if(!$scope.crowdAnalysisFilter.attribute){
    			$.Pop.alerts("请选择一个属性");
    			return false;
    		}*/
    		
    		var selectDimentionsLength = $scope.checkAnalysisAttributesValuesDimentionLength();
    		if(selectDimentionsLength > 3){
    			$.Pop.alerts("最多可选择一个属性的3个值");
    		}else{
    			$scope.resetSelectedAnalysisAttributesValuesDimentions();
    			$scope.showHideAnalysisAttributesBox();
    			$scope.changeAnalysisIndicator();
    		}
    	}
    	
    	$scope.resetSelectedAnalysisAttributesValuesDimentions = function(){
    		$scope.selectedAnalysisAttributesValuesDimentions = [];
    		if($scope.crowdAnalysisAttributeValuesList && $scope.crowdAnalysisAttributeValuesList.length > 0){
    			for(var i = 0;i<$scope.crowdAnalysisAttributeValuesList.length;i++){
    				if($scope.crowdAnalysisAttributeValuesList[i].isSelected){
    					$scope.selectedAnalysisAttributesValuesDimentions.push($scope.crowdAnalysisAttributeValuesList[i]);
    				}
        		}
    		}
    	}
    	
    	$scope.changeCrowdAnalysisFilter = function(filter,field){
    		if(filter){
    			$scope.crowdAnalysisFilter[field] = filter.id;
    			$scope.changeAnalysisIndicator();
    		}else{
    			$scope.crowdAnalysisFilter[field] = "";
    		}
    	}
    	
    	$scope.changeAnalysisIndicator = function(){
    		$scope.renderCrowdAnalysis();
    	}
    	
    	$scope.changeCrowdAnalysisFilterTime = function(start,end){
    		$scope.crowdAnalysisFilter.startTime = start;
			$scope.crowdAnalysisFilter.endTime = end;
			$scope.changeAnalysisIndicator();
    	}
    	
    	$scope.buildCrowdAnalysisCondtions = function(){
    		var conditions = [];
    		
    		if($scope.selectedAnalysisIndicatorsDimentions && $scope.selectedAnalysisIndicatorsDimentions.length > 0){
    			var indicatorsLength = $scope.selectedAnalysisIndicatorsDimentions.length;
    			var db = new DefinitionBuilder();
    			db.initDefinition();
    			
    			if(indicatorsLength == 1 && 
    					$scope.crowdAnalysisFilter.attribute && 
    					$scope.selectedAnalysisAttributesValuesDimentions && 
    					$scope.selectedAnalysisAttributesValuesDimentions.length > 0){

					var attributesValuesLength = $scope.selectedAnalysisAttributesValuesDimentions.length;
					for(var j = 0;j < attributesValuesLength;j++){
						var index = j + 1;
        				var condition = 'condition' + index;
        				var indice = db.buildIndice("enterprise", "", "cube", $scope.selectedAnalysisIndicatorsDimentions[0].code);
            			var qualifiers = [];
						
						var value = $scope.selectedAnalysisAttributesValuesDimentions[j].key;
						
						if($scope.crowdDetails.id){
							var temp = $scope.crowdDetails.id;
							qualifiers.push(db.buildTermQualifier('crowd_id', db.buildEqOperatorValue(temp)));
						}
						qualifiers.push(db.buildTermQualifier($scope.crowdAnalysisFilter.attribute, db.buildEqOperatorValue(value)));
					
						qualifiers.push(db.buildRangeQualifier("starttime_day", db.buildRangeOperatorValue("gte", $scope.crowdAnalysisFilter.startTime, "lte", $scope.crowdAnalysisFilter.endTime)));
            			var query = db.buildMustQueryWithQualifiers(qualifiers);
            			db.setIndice(condition, indice);
            			db.setQuery(condition, query);
            			
            			conditions.push(db.getCondition(condition));
					}
    			}else{
    				for(var i = 0;i < indicatorsLength;i++){
        				var index = i + 1;
        				var condition = 'condition' + index;
        				
        				var indice = db.buildIndice("enterprise", "", "cube", $scope.selectedAnalysisIndicatorsDimentions[i].code);
            			var qualifiers = [];
            			if($scope.crowdDetails.id){
            				var temp = $scope.crowdDetails.id;
							qualifiers.push(db.buildTermQualifier('crowd_id', db.buildEqOperatorValue(temp)));
						}
            			qualifiers.push(db.buildRangeQualifier("starttime_day", db.buildRangeOperatorValue("gte", $scope.crowdAnalysisFilter.startTime, "lte", $scope.crowdAnalysisFilter.endTime)));
            			var query = db.buildMustQueryWithQualifiers(qualifiers);
            			db.setIndice(condition, indice);
            			db.setQuery(condition, query);
            			
            			conditions.push(db.getCondition(condition));
        			}
    			}
    		}
    		return conditions;
    	}
    	
    	$scope.renderCrowdAnalysis = function(){
    		var conditions = $scope.buildCrowdAnalysisCondtions();
    		var params = {
    			viewType : $scope.crowdAnalysisFilter.chart,
    			timeRangeType : $scope.crowdAnalysisFilter.time
    		};
    		$.layerLoading.show();
    		CrowdPortraitService.queryCrowdAnalysis($scope.crowdId, conditions,params).then(function(data){
    			if($scope.crowdAnalysisFilter.chart == 4){
    				var result = HighchartsOptions.buildDataForMultipCharts(data,'spline');
    				$scope.highchartCrowdAnalysis = HighchartsOptions.multipYCharts(result,false);
    				//$scope.highchartCrowdAnalysis = HighchartsOptions.lineCustomToolTip(data,true);
    			}else if($scope.crowdAnalysisFilter.chart == 2){
    				var result = HighchartsOptions.buildDataForMultipCharts(data,'column');
    				$scope.highchartCrowdAnalysis = HighchartsOptions.multipYCharts(result,false);
    				//$scope.highchartCrowdAnalysis = HighchartsOptions.columnCustomToolTip(data,true);
    			}else if($scope.crowdAnalysisFilter.chart == 5){
    				//var result = HighchartsOptions.buildDataForMultipCharts(data,'column');
    				//$scope.highchartCrowdAnalysis = HighchartsOptions.multipYCharts(result,false);
    				$scope.highchartCrowdAnalysis = HighchartsOptions.column(data,true);
    			}
    			
    			$scope.buildCrowdAnalysisTableDatas(data);
    			$.layerLoading.hide();
    		},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					//$.Pop.alerts(response.data.msg);
				}
			});
    	}
    	
    	$scope.buildCrowdAnalysisTableDatas = function(data){
    		console.dir([data]);
    		if($scope.selectedAnalysisIndicatorsDimentions && 
    			$scope.selectedAnalysisIndicatorsDimentions.length == 1 && 
    			$scope.selectedAnalysisAttributesValuesDimentions && 
    			$scope.selectedAnalysisAttributesValuesDimentions.length > 0
    			){
    			if($scope.crowdAnalysisFilter.chart == 5){
    				$scope.crowdAnalysisTableDatas = {
		    			thead:[{
		    				id:'shuxing',
		    				label:'属性'
		    			}],
		    			tbody:[]
		    		};
    			}else{
    				$scope.crowdAnalysisTableDatas = {
		    			thead:[{
		    				id:'riqi',
		    				label:'日期'
		    			}],
		    			tbody:[]
		    		};
    			}
    		}else{
    			if($scope.crowdAnalysisFilter.chart == 5){
	    			$scope.crowdAnalysisTableDatas = {
		    			thead:[{
		    				id:'zhibiao',
		    				label:'指标'
		    			}],
		    			tbody:[]
		    		};
    			}else{
    				$scope.crowdAnalysisTableDatas = {
		    			thead:[{
		    				id:'riqi',
		    				label:'日期'
		    			}],
		    			tbody:[]
		    		};
    			}
    		}
    		
    		if(data && data.categories && data.series && data.series.length > 0){
    			var series = data.series;
    			var trLength = series.length;
    			for(var i = 0;i < trLength;i++){
    				var seriesItem = series[i];
    				var seriesItemData = seriesItem.data;
    				$scope.crowdAnalysisTableDatas.thead.push({
    					id:seriesItem.name,
    					label:seriesItem.name
    				});
    			}
    			
    			
    			var categories = data.categories;
    			for(var i = 0;i < categories.length;i++){
    				var trItem = [];
    				trItem.push({
    					id:categories[i],
    					label:categories[i]
    				});
    				
    				for(var j = 0;j < trLength;j++){
        				var seriesItem = series[j];
        				var seriesItemData = seriesItem.data;
        				trItem.push({
        					id:seriesItemData[i],
        					label:$.formatNumThousand($.fomatNumDecimal(seriesItemData[i],1))
        				});
        			}
    				
    				$scope.crowdAnalysisTableDatas.tbody.push(trItem);
    			}
    		}
    		//console.dir([$scope.crowdAnalysisTableDatas,'$scope.crowdAnalysisTableDatas']);
    	}
    	
    	/*$scope.buildCrowdAnalysisTableDatas = function(data){
    		if($scope.selectedAnalysisIndicatorsDimentions && 
    			$scope.selectedAnalysisIndicatorsDimentions.length == 1 && 
    			$scope.selectedAnalysisAttributesValuesDimentions && 
    			$scope.selectedAnalysisAttributesValuesDimentions.length > 0
    			){
    			$scope.crowdAnalysisTableDatas = {
	    			thead:[{
	    				id:'zhibiao',
	    				label:'属性'
	    			}],
	    			tbody:[]
	    		};
    		}else{
    			$scope.crowdAnalysisTableDatas = {
	    			thead:[{
	    				id:'zhibiao',
	    				label:'指标'
	    			}],
	    			tbody:[]
	    		};
    		}
    		
    		if(data && data.categories && data.series && data.series.length > 0){
    			var categories = data.categories;
    			for(var i = 0;i < categories.length;i++){
    				$scope.crowdAnalysisTableDatas.thead.push({
    					id:categories[i],
    					label:categories[i]
    				});
    			}
    			var series = data.series;
    			var trLength = series.length;
    			for(var i = 0;i < trLength;i++){
    				var seriesItem = series[i];
    				var seriesItemData = seriesItem.data;
    				if(seriesItemData && seriesItemData.length > 0){
    					var trItem = [{
    						id:seriesItem.name,
    	    				label:seriesItem.name
    					}];
    					var tdLength = seriesItemData.length;
        				for(var j = 0;j < tdLength;j++){
        					trItem.push({
        						id:seriesItemData[j].toString() + j + '',
            					label:$.formatNumThousand($.fomatNumDecimal(seriesItemData[j],1))
        					});
        				}
        				$scope.crowdAnalysisTableDatas.tbody.push({
        					id:i,
        					list:trItem
        				});
    				}
    			}
    			
    		}
    	}*/
    	
    	$scope.queryCrowdFeatures = function(crowd){
    		var crowdFeatures = [];
    		if(crowd && crowd.features){
    			var features = crowd.features.split(';');
    			var moreText = "";
    			for(var i = 0;i < features.length;i++){
    				if(i < 5){
    					crowdFeatures.push({
        					id:features[i],
        					name:features[i]
        				});
    				}else{
    					moreText += features[i]+";";
    				}
    			}
    			if(moreText){
    				crowdFeatures.push({
    					id:moreText,
    					name:moreText
    				});
    			}
    		}
    		return crowdFeatures;
    	}
    	
    	$scope.tabCrowdInsightClick = function(ci){
    		/*if(ci.isSelected){
    			return false;
    		}*/
    		if($scope.crowdInsights && $scope.crowdInsights.length > 0){
    			for(var i = 0;i < $scope.crowdInsights.length;i++){
    				$scope.crowdInsights[i].isSelected = false;
    			}
    		}
    		ci.isSelected = true;
    		$scope.changeAttributeGroup();
    		
    		/*$scope.getAttributesWithObject();
    		$scope.initDimentions();
    		$scope.drawSelectedPortrait();*/
    		
    		if(ci.attributeGroupCode == 'users'){
    			$scope.queryUserProfiles();
    		}else if(ci.attributeGroupCode == 'analysis'){
    			//$scope.initCrowdAnalysis();
    			$scope.changeAnalysisIndicator();
    		}
    		
    		if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			} 
    	}
    	
    	/*用户列表start*/
    	$scope.initUserProfilesFilters = function(){
    		$scope.tagRelationsPanelHtml = "";
    		$scope.CrowdDefinitionController = new CrowdDefinitionController();
    		var that = this;
    		that.CrowdDefinitionController.model.deviceType = $scope.crowdDetails.touchPointType;
			var html = this.CrowdDefinitionController.initHtml();
			$scope.tagRelationsPanelHtml = html;
    	}
    	
    	$scope.resetSearchConditions = function(){
    		var html = this.CrowdDefinitionController.resetSearchConditions();
    		$("#relations-panel .ralation-box").html(html);
    	}
    	
    	$scope.searchUserProfiles = function(){
    		var respone = this.CrowdDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				var definition = respone.db.definition;
				if($.isNullObj(definition.filter) || $.isNullObj(definition.condition)){
					$.Pop.alerts("请先创建用户属性条件再搜索用户");
					return false;
				}
				$scope.queryUserProfiles();
				//$.layerLoading.show();
			}else{
				$.Pop.alerts(respone.msg);
			}
    	}
    	
    	$scope.queryUserProfiles = function(){
    		$scope.isNeedMoreSearch = true;
    		$scope.initUserProfilesFilters();
	    	
	    	return false;
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
	    			UserProfileService.query(params).then(function(userProfiles){
	    				params.total(userProfiles.total);
	                    $defer.resolve(userProfiles);
	    			});
	            }
	        });
			
		};
		
		$scope.reloadMoreSearchCondition = function(){
			$scope.reloadMoreSearch = {};
			$scope.reloadMoreSearch.name = $location.search()['filter[name]'] || '';
    		$scope.reloadMoreSearch.code = $location.search()['filter[code]'] || '';
    		$scope.reloadMoreSearch.touchPointType = $location.search()['filter[touchPointType]'] || '';
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
    		}
		}
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
			$scope.moreSearchCondition = {
    			name : "",
    			code:"",
    			touchPointType :"",
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
		$scope.search = function(){  
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q' : $scope.searchValue,
					"name" : $scope.moreSearchCondition.name,
					"code" : $scope.moreSearchCondition.code,
					"touchPointType" : $scope.moreSearchCondition.touchPointType,
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
    	/*用户列表end*/
    	
    	/*人群洞察end*/
    	
    	/*人群画像start*/
		
		$scope.clearPortraitDimentionKeywords = function(){
			$scope.portraitDimentionKeywords.keywords = "";
			$scope.searchPortraitDimentions();
		}
		
		$scope.buildCrowdPortraitAttributesFilterList = function(keywords,list){
    		var filterList = [];
    		if(keywords && list && list.length > 0){
    			for(var i = 0;i < list.length;i++){
    				var name = list[i].label;
    				if(name && name.indexOf(keywords) != -1){
    					filterList.push(list[i]);
    				}
    			}
    		}
    		return filterList;
    	}
		
		$scope.selectCrowdPortraitAttributeToList = function(item,list){
    		if(item && list && list.length > 0){
    			for(var i =0;i<list.length;i++){
    				if(item.id == list[i].id){
    					list[i].isSelected = true;
    					break;
    				}
    			}
    		}
    		$scope.clearPortraitDimentionKeywords();
    	}
		
    	$scope.searchPortraitDimentions = function(){
    		$scope.filterCrowdPortraitAttributes = [];
    		var keywords = $scope.portraitDimentionKeywords.keywords || '';
    		if(keywords){
    			$scope.filterCrowdPortraitAttributes = $scope.buildCrowdPortraitAttributesFilterList(keywords,$scope.portraitAttributes);
    		}else{
    			//$scope.showAllAnalysisIndicators();
    		}
    		/*var keywords = $scope.portraitDimentionKeywords.keywords || '';
    		if(keywords){
    			if($scope.portraitAttributes && $scope.portraitAttributes.length > 0){
        			for(var i = 0;i < $scope.portraitAttributes.length;i++){
        				var label = $scope.portraitAttributes[i].label;
        				if(label && label.indexOf(keywords) != -1){
        					$scope.portraitAttributes[i].isShow = true;
        				}else{
        					$scope.portraitAttributes[i].isShow = false;
        				}
        			}
        		}
    		}else{
    			$scope.showAllPortraitAttributes();
    		}*/
    	}
    	
    	$scope.getSelectedPortrait = function(){
    		var portrait = {};
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				if($scope.portraitAttributeGroups[i].isSelected){
    					portrait = $scope.portraitAttributeGroups[i];
    					break;
    				}
    			}
    		}
    		return portrait;
    	}
    	
    	$scope.tabPortraitClick = function(portrait){
    		if(portrait.isSelected){
    			return false;
    		}
    		$scope.isShowDimensionsBox = false;
    		
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				$scope.portraitAttributeGroups[i].isSelected = false;
    			}
    		}
    		portrait.isSelected = true;
    		$scope.changeAttributeGroup();
    		
    		$scope.getAttributesWithObject();
    		$scope.initDimentions();
    		$scope.drawSelectedPortrait();
    		
    		if($scope.isShowCrowdComparePanel){
    			$scope.drawSelectedPortrait(true);
    		}
    		
    		if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			} 
    	}
    	
    	
    	$scope.queryCrowdDetailsCrowdId = function(crowdId,isCompareCrowd){
    		$scope.crowdInfo = {
    			isShowBtns:false,
    			msg:''
    		};
    		
    		if(crowdId){
    			$scope.isLoadingCrowd = true;
    			$scope.isLoadedCrowd = false;
        		$.layerLoading.show();
        		CrowdPortraitService.getCrowdWithScale(crowdId).then(function(crowd){
        			$scope.isLoadedCrowd = true;
        			$scope.isLoadingCrowd = false;
        			var obj = $scope.getObjectByDicItemKey(crowd.touchPointType,$scope.touchPointTypes);
    				crowd.touchPointTypeName = obj.dicItemValue;
    				crowd.majorAccount = $scope.stringToBoolean(obj.majorAccount);
        			
        			$.layerLoading.hide();
        			if(isCompareCrowd){
        				$scope.crowdCompareDetails = crowd;
        				$scope.crowdCompareDetails.crowdFeatures = $scope.queryCrowdFeatures(crowd);
        				$scope.checkCrowdHasUsers();
        				$scope.drawSelectedPortrait();
        				$scope.drawSelectedPortrait(isCompareCrowd);
        			}else{
        				
        				
        				$scope.crowdDetails = crowd;
        				$scope.crowdDetails.crowdFeatures = $scope.queryCrowdFeatures(crowd);
        				$scope.checkCrowdHasUsers();
        				//if($scope.crowdDetails.crowdCount > 0){
    	    				$scope.queryTagMetaData();
    	    			//}
    	    				
        				$scope.initTabGroups();
            			$scope.initCrowdInsights();
            			
            			$scope.initCrowdCompareSelect();
        			}
        			
        		},function(response) {
        			$.layerLoading.hide();
        			$scope.isLoadedCrowd = true;
        			$scope.isLoadingCrowd = false;
    				if(response.data != null && !response.data.success){
    					
    				}
    			});
    		}
    	}
    	
    	$scope.stringToBoolean = function(str){
    		var boolean = false;
    		if(str == 'false' || str == false){
    			boolean = false;
    		}else if(str == 'true' || str == true){
    			boolean = true;
    		}
    		return boolean;
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
    	
    	$scope.getMajorAccountObject = function(list){
    		var obj = {};
    		if(list && list.length > 0){
    			for(var i = 0;i < list.length;i++){
    				if(list[i].majorAccount == 'true'){
    					obj = list[i];
    					break;
    				}
    			}
    		}
    		return obj;
    	}
    	
    	$scope.drawChinaMapProvice = function(){
    		CrowdPortraitService.queryCrowdPortrait($scope.crowdId, $scope.crowdportraitConfigParam.province, 4, $scope.isNullValueFilter).then(function(data){
    			var formatData = $scope._formatChinaMapData(data,'省份分布');
    			$scope.echartChinaMapProvice = EchartsOptions.chinaMapProvice(formatData);
    		});
    	}
    	
    	$scope._formatChinaMapData = function(data,label){
    		
    		var data = data || {};
    		var rate = data.rate;
    		var value = data.value;
    		var key = data.key;
    		
    		var formatData ={
    			label:label,
    			legend : key,
    			data:[]
    		};
    		for(var i = 0;i < key.length;i++){
    			formatData.data.push({
    				name: key[i],
    				value: value[i],
    				rate : rate[i]
    			});
    		}
    		return formatData;
    	}
    	
    	$scope.drawCityPortrait = function(demension,isCompareCrowd){
    		$scope.highchartCity = {};
    		$scope.drawCityLevelPortrait(demension,'firstTierCities',isCompareCrowd);
    		$scope.drawCityLevelPortrait(demension,'twoTierCities',isCompareCrowd);
    		$scope.drawCityLevelPortrait(demension,'thirdTierCities',isCompareCrowd);
    		//$scope.calculateCityPercent(demension);
    	}

    	
    	$scope.drawCityLevelPortrait = function(demension,level,isCompareCrowd){
    		
    		var defaultViewType = '1';
    		if(demension && demension.metaAttributeViewType && demension.metaAttributeViewType.defaultViewType){
    			defaultViewType = demension.metaAttributeViewType.defaultViewType;
    		}
    		
    		var crowdId = $scope.crowdId;
    		if(isCompareCrowd){
    			crowdId = $scope.crowdCompareDetails.id;
    			if(level == 'firstTierCities'){
    				$scope.highchartCityLevelFirstTierCitiesCompare = {};
    			}else if(level == 'twoTierCities'){
    				$scope.highchartCityLevelTwoTierCitiesCompare = {};
    			}else if(level == 'thirdTierCities'){
    				$scope.highchartCityLevelThirdTierCitiesCompare = {};
    			}
    		}else{
    			if(level == 'firstTierCities'){
    				$scope.highchartCityLevelFirstTierCities = {};
    			}else if(level == 'twoTierCities'){
    				$scope.highchartCityLevelTwoTierCities = {};
    			}else if(level == 'thirdTierCities'){
    				$scope.highchartCityLevelThirdTierCities = {};
    			}
    		}
    		
    		if(crowdId && demension && defaultViewType && level){
    			CrowdPortraitService.queryCrowdCityPortrait(crowdId, demension,defaultViewType, level).then(function(data){
        			if(level == 'firstTierCities'){
        				if(isCompareCrowd){
        					$scope.highchartCityLevelFirstTierCitiesCompare = HighchartsOptions.bar(data);
            				$scope.cityPercentCompare.one = data.cityPercent;
        	    		}else{
        	    			$scope.highchartCityLevelFirstTierCities = HighchartsOptions.bar(data);
            				$scope.cityPercent.one = data.cityPercent;
        	    		}
        			}else if(level == 'twoTierCities'){
        				if(isCompareCrowd){
        					$scope.highchartCityLevelTwoTierCitiesCompare = HighchartsOptions.bar(data);
            				$scope.cityPercentCompare.two = data.cityPercent;
        				}else{
        					$scope.highchartCityLevelTwoTierCities = HighchartsOptions.bar(data);
            				$scope.cityPercent.two = data.cityPercent;
        				}
        			}else if(level == 'thirdTierCities'){
        				if(isCompareCrowd){
        					$scope.highchartCityLevelThirdTierCitiesCompare = HighchartsOptions.bar(data);
            				$scope.cityPercentCompare.three = data.cityPercent;
        				}else{
        					$scope.highchartCityLevelThirdTierCities = HighchartsOptions.bar(data);
            				$scope.cityPercent.three = data.cityPercent;
        				}
        			}
        			
        		});
    		}
    	}
    	
    	$scope.calculateCityPercent = function(demension){
    		CrowdPortraitService.queryCityPercent($scope.crowdId,demension).then(function(respone){
    			$scope.cityPercent = {
	    			one : respone.firstTierCities,
	    			two : respone.twoTierCities,
	    			three : respone.thirdTierCities
	    		};
    		});
    	}
    	
    	$scope.showHideDimensionsBox = function(){
    		$scope.isShowDimensionsBox = !$scope.isShowDimensionsBox;
    		$scope.portraitDimentionKeywords = {
	    		keywords :''
	    	};
    		$scope.showAllPortraitAttributes();
    	}
    	
    	$scope.confirmSelectedDimentions = function(){
    		var selectDimentionsLength = $scope.checkPortraitDimentionLength();
    		if(selectDimentionsLength > 6){
    			$.Pop.alerts("最多可选择6个维度");
    		}else if(selectDimentionsLength == 0){
    			$.Pop.alerts("请至少选择1个维度");
    		}else{
    			$scope.resetSelectedPortraitDimentions();
    			$scope.drawSelectedPortrait();
    			if($scope.isShowCrowdComparePanel){
    				$scope.drawSelectedPortrait(true);
    			}
    			$scope.showHideDimensionsBox();
    		}
    	}
    	
    	$scope.resetSelectedPortraitDimentions = function(){
    		$scope.selectedPortraitDimentions = [];
    		if($scope.selectedPortraitDimentions.length == 0 && $scope.portraitAttributes && $scope.portraitAttributes.length > 0){
    			for(var i = 0;i<$scope.portraitAttributes.length;i++){
    				if($scope.portraitAttributes[i].isSelected){
    					$scope.selectedPortraitDimentions.push($scope.portraitAttributes[i]);
    				}
        		}
    		}
    	}
    	
    	$scope.queryTagMetaData = function() {
    		$.layerLoading.show();
			TagService.getTagMetadata('crowd_portrait').then(function(tagMetadata) {
				$.layerLoading.hide();
				TagBuilder.init(tagMetadata);
				$scope.initPortraitAttributeGroups();
				$scope.getAttributesWithObject();	
				$scope.initDimentions();
				$scope.drawSelectedPortrait();
				
				
				//console.dir([$scope.portraitAttributeGroups,'$scope.portraitAttributeGroups',tagMetadata,'tagMetadata',$scope.portraitAttributes,'$scope.portraitAttributes']);
			}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
		}
    	
    	$scope.getAttributesWithObject = function(){
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				if($scope.portraitAttributeGroups[i].isSelected){
    					$scope.curAttributeGroupName = $scope.portraitAttributeGroups[i].attributeGroupName;
    					$scope.curAttributeGroupCode = $scope.portraitAttributeGroups[i].attributeGroupCode;
    					$scope.portraitAttributes = TagBuilder.getAttributesWithObject($scope.portraitAttributeGroups[i]);
    					$scope.buildPortraitAttributesViewTypes();
    					break;
    				}
    			}
    		}
    	}
    	
    	$scope.buildPortraitAttributesViewTypes = function(){
    		if($scope.portraitAttributes && $scope.portraitAttributes.length > 0){
    			for(var i = 0;i < $scope.portraitAttributes.length;i++){
        			var portraitAttribute = $scope.portraitAttributes[i];
        			if(portraitAttribute && portraitAttribute.metaAttributeViewType && portraitAttribute.metaAttributeViewType.viewType){
        				var viewType = portraitAttribute.metaAttributeViewType.viewType;
            			var viewTypes = [];
            			if(viewType){
            				var viewTypesAttr = viewType.split(',');
            				if(viewTypesAttr && viewTypesAttr.length > 0){
            					for(var j = 0;j < viewTypesAttr.length;j++){
                					viewTypes.push({
                						id:viewTypesAttr[j],
                						name:viewTypesAttr[j]
                					});
                				}
            					portraitAttribute.metaAttributeViewType.viewTypes = viewTypes;
            				}
            				
            			}
        			}
        		}
    		}
    	}
    	
    	$scope.rebuildPortraitAttributeGroups = function(){
    		var group = [];
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				var metaAttributeGroupRelationships = $scope.portraitAttributeGroups[i].metaAttributeGroupRelationships;
    				if(metaAttributeGroupRelationships && metaAttributeGroupRelationships.length > 0){
    					group.push($scope.portraitAttributeGroups[i]);
    				}
    			}
    		}
    		$scope.portraitAttributeGroups = group;
    	}
    	
    	$scope.initPortraitAttributeGroups = function(){
    		$scope.portraitAttributeGroups = TagBuilder.findByAttributeGroupsType($scope.crowdDetails.touchPointType,'crowd_portrait');
    		$scope.rebuildPortraitAttributeGroups();
    		
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			$scope.checkProvinceAttributeGroups();
    			$scope.checkCityAttributeGroups();
    			$scope.removeLocationAttributeGroups();
    			
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				if(i == 0){
    					$scope.portraitAttributeGroups[i].isSelected = true;
    				}else{
    					$scope.portraitAttributeGroups[i].isSelected = false;
    				}
    			}
    		}else{
    			$scope.noMetaDatas = true;
    		}
    	}
    	
    	$scope.removeLocationAttributeGroups = function(){
    		if(!$scope.hasLocationProvince && !$scope.hasLocationCity){
    			if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
        			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
        				var portraitAttributeGroups = $scope.portraitAttributeGroups[i];
        				if(portraitAttributeGroups.attributeGroupCode == 'location'){
        					$scope.portraitAttributeGroups.splice(i,1);
        					break;
        				}
        			}
    			}
			}
    	}
    	
    	$scope.checkProvinceAttributeGroups = function(){
    		$scope.hasLocationProvince = false;
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				var portraitAttributeGroups = $scope.portraitAttributeGroups[i];
    				if(portraitAttributeGroups.attributeGroupCode == 'location'){
    					var metaAttributeGroupRelationships = portraitAttributeGroups.metaAttributeGroupRelationships;
    					if(metaAttributeGroupRelationships && metaAttributeGroupRelationships.length > 0){
    						for(var j = 0;j < metaAttributeGroupRelationships.length;j++){
    							var provinceName = $scope.crowdportraitConfigParam.province;
    							if(metaAttributeGroupRelationships[j].attributeCode == provinceName){
    								$scope.hasLocationProvince = true;
    								break;
    							}
    						}
    					}
    					break;
    				}
    			}
    		}
    	}
    	
    	$scope.checkCityAttributeGroups = function(){
    		$scope.hasLocationCity = false;
    		if($scope.portraitAttributeGroups && $scope.portraitAttributeGroups.length > 0){
    			for(var i = 0;i < $scope.portraitAttributeGroups.length;i++){
    				var portraitAttributeGroups = $scope.portraitAttributeGroups[i];
    				if(portraitAttributeGroups.attributeGroupCode == 'location'){
    					var metaAttributeGroupRelationships = portraitAttributeGroups.metaAttributeGroupRelationships;
    					if(metaAttributeGroupRelationships && metaAttributeGroupRelationships.length > 0){
    						for(var j = 0;j < metaAttributeGroupRelationships.length;j++){
    							var cityName = $scope.crowdportraitConfigParam.city;
    							if(metaAttributeGroupRelationships[j].attributeCode == cityName){
    								$scope.hasLocationCity = true;
    								break;
    							}
    						}
    					}
    					break;
    				}
    			}
    		}
    	}
    	
    	$scope.initDimentions = function(){
    		$scope.selectedPortraitDimentions = [];
    		if($scope.portraitAttributes && $scope.portraitAttributes.length > 0){
    			for(var i = 0;i<$scope.portraitAttributes.length;i++){
        			if(i < 6){
        				$scope.selectedPortraitDimentions.push($scope.portraitAttributes[i]);
        				$scope.portraitAttributes[i].isSelected = true;
        			}else{
        				break;
        			}
        		}
    			$scope.showAllPortraitAttributes();
    		}
    	}
    	
    	$scope.showAllPortraitAttributes = function(){
    		if($scope.portraitAttributes && $scope.portraitAttributes.length > 0){
    			for(var i = 0;i<$scope.portraitAttributes.length;i++){
    				$scope.portraitAttributes[i].isShow = true;
        		}
    		}
    	}
    	
    	$scope.drawSelectedPortrait = function(isCompareCrowd){
    		$scope.highchartPortrait = {};
    		if($scope.selectedPortraitDimentions && $scope.selectedPortraitDimentions.length > 0){
    			for(var i = 0;i<$scope.selectedPortraitDimentions.length;i++){
    				$scope.render($scope.selectedPortraitDimentions[i],isCompareCrowd);
    			}
    		}
    	}
    	
    	$scope.checkPortraitDimentionLength = function(){
    		var selectDimentionsLength = 0;
    		if($scope.portraitAttributes && $scope.portraitAttributes.length > 0){
    			for(var i = 0;i<$scope.portraitAttributes.length;i++){
    				if($scope.portraitAttributes[i].isSelected){
    					selectDimentionsLength++;
    					if(selectDimentionsLength > 6){
    						break;
    					}
    				}
        		}
    		}
    		return selectDimentionsLength;
    	}
    	
    	$scope.togglePortraitDimentionStatus = function(attribute){
    		attribute.isSelected = !attribute.isSelected;
    	}
    	
    	$scope.changeDimentionViewType = function(dimention){
    		$scope.render(dimention);
    		if($scope.isShowCrowdComparePanel){
    			$scope.render(dimention,true);
    		}
    	}
    	
    	$scope.changeNullValueFilter = function(dimention){    		
    		$scope.render(dimention);
    		if($scope.isShowCrowdComparePanel){
    			$scope.render(dimention,true);
    		}
    	}
    	
    	$scope.render = function(demension,isCompareCrowd){
    		if(demension.attributeGroupCode == 'location' && demension.id == $scope.crowdportraitConfigParam.province){
    			demension.metaAttributeViewType.defaultViewType = '4';
    			if(isCompareCrowd){
    				$scope.echartChinaMapProviceCompare = {};
    				$scope.highchartCityAllCompare = {};
    			}else{
    				$scope.echartChinaMapProvice = {};
    				$scope.highchartCityAll = {};
    			}
    		}
    		
    		var defaultViewType = '1';
    		if(demension && demension.metaAttributeViewType && demension.metaAttributeViewType.defaultViewType){
    			defaultViewType = demension.metaAttributeViewType.defaultViewType;
    			//update 20160713对于city_name defaultViewType需值为1
    			if (demension.attributeGroupCode == 'location' && demension.id == 'city_name'){
    				defaultViewType = '1';
    			}
    		}
    		
    		var crowdId = $scope.crowdId;
    		if(isCompareCrowd && $scope.crowdCompareDetails && $scope.crowdCompareDetails.id){
    			crowdId = $scope.crowdCompareDetails.id;
    		}
    		var key = demension.objectCode + '#' + demension.id + '#' + crowdId;
    		$scope.highchartPortrait[key] = {};
    		
    		if(crowdId && demension && defaultViewType){
    			CrowdPortraitService.queryCrowdPortrait(crowdId, demension, defaultViewType, demension.nullValueFilter).then(function(data){
    				if(defaultViewType == '1'){//横行柱状图
        				$scope.highchartPortrait[key] = HighchartsOptions.bar(data);
        				if(demension.id == $scope.crowdportraitConfigParam.city){
        					if(isCompareCrowd){
        						$scope.highchartCityAllCompare = HighchartsOptions.bar(data);
        					}else{
        						$scope.highchartCityAll = HighchartsOptions.bar(data);
        					}
        					$scope.drawCityPortrait(demension,isCompareCrowd);
        				}
        			}else if(defaultViewType == '2'){//纵向柱状图
        				$scope.highchartPortrait[key] = HighchartsOptions.column(data);
        			}else if(defaultViewType == '3'){//饼图
        				$scope.highchartPortrait[key] = HighchartsOptions.pie(data);
        			}else if(defaultViewType == '4'){//中国地图
        				var formatData = $scope._formatChinaMapData(data,demension.label);
        				if(formatData){
        					if(demension.attributeGroupCode == 'location' && demension.id == $scope.crowdportraitConfigParam.province){//地域分布地图
        						
        						//FIXME: 临时解决方案: 解决客户数据中 省份带"省"字导致大地图显示不相关数据
        						
        						for(var _index in formatData.data){
        							formatData.data[_index].name = formatData.data[_index].name.replace("省","");
        						}
        						for(var _index in formatData.legend){
        							formatData.legend[_index] = formatData.legend[_index].replace("省","");
        						}
        						//end 临时解决方案
        						
                    			if(isCompareCrowd){
                    				$scope.echartChinaMapProviceCompare = EchartsOptions.chinaMapProvice(formatData);
                    				if(formatData.data){
                    					$scope.proviceTopTenCompareHtml = EchartsOptions.chinaMapRankingHtml(formatData.data,10); 
                    				}
                    			}else{
                    				$scope.echartChinaMapProvice = EchartsOptions.chinaMapProvice(formatData);
                    				if(formatData.data){
                    					$scope.proviceTopTenHtml = EchartsOptions.chinaMapRankingHtml(formatData.data,10); 
                    				}
                    			}
            				}else{//其他画像地图
            					$scope.highchartPortrait[key] = EchartsOptions.chinaMapProvice(formatData);
            				}
        				}
        			}else if(defaultViewType == '5'){//折线图
        				$scope.highchartPortrait[key] = HighchartsOptions.line(data);
        			}
        			
        		});
    		}
    	}
    	/*人群画像end*/
    	
    	$scope.goToCrowdExport = function(crowd){
    		if(!crowd || crowd.crowdCount == 0){
    			$.Pop.alerts("人群规模为0，不能导出");
    			return false;
    		}
    	}
    	
    	$scope.otherAreaOnclick = function(){
			$scope.isShowAnalysisIndicatorsBox = false;
			$scope.isShowAnalysisAttributesBox = false;
			$scope.isShowDimensionsBox = false;
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
			//$scope.stopEventPropagation();
    	};
    	
    	$scope.stopEventPropagation = function(){
			if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
		}
    	
    	/*人群对比start*/
    	$scope.showHideCrowdCompareControl = function(){
    		if(!$scope.crowdCompareSelect || !$scope.crowdCompareSelect.sourceList || $scope.crowdCompareSelect.sourceList.length == 0){
    			$.Pop.alerts("同人群类型下没有可对比的人群");
    			return false;
    		}
    		
    		$scope.isShowCrowdCompareControl = !$scope.isShowCrowdCompareControl;
    		$scope.initTabGroups();
    		//$scope.resetCrowdCompareSelect();
    		$scope.initCrowdCompareSelect();
    	}
    	
    	$scope.resetCrowdCompareSelect = function(){
    		$scope.crowdCompareSelect.crowdId = "";
    		$scope.crowdCompareSelect.selectLabel = "请选择人群对比";
    		$scope.crowdCompareSelect.keywords = "";
    	}
    	
    	$scope.showHideCrowdComparePanel = function(){
    		$scope.isShowCrowdComparePanel = !$scope.isShowCrowdComparePanel;
    		$scope.initTabGroups();
    	}
    	
    	$scope.delCrowdCompare = function(){
    		$scope.showHideCrowdComparePanel();
    	}
    	
    	$scope.startCrowdCompare = function(){
    		if(!$scope.crowdCompareSelect.crowdId){
    			$.Pop.alerts("请选择人群后再开始对比");
    			return false;
    		}
    		
    		$scope.queryCrowdDetailsCrowdId($scope.crowdCompareSelect.crowdId,true);
    		
    		$scope.showHideCrowdCompareControl();
    		$scope.showHideCrowdComparePanel();
    	}
    	
    	$scope.initCrowdCompareSelect = function(){
			$scope.crowdCompareSelect = {
				crowdId:"",
    			selectLabel : "请选择人群对比",
    			menuElem:"menuCrowdCompareContent",
    			keywords:"",
    			sourceList:[],
    			noApply:true
    		};
			
			if($scope.crowdDetails && $scope.crowdDetails.touchPointType){
				var params = {
					touchPointType:	$scope.crowdDetails.touchPointType,
					rows:10000
				};
				
				CrowdService.queryValidCrowdList(params).then(function(crowds){
					var crowds = $scope.filterCrowdsWithTouchPointType(crowds,$scope.crowdDetails.touchPointType);
					$scope.crowdCompareSelect.sourceList = crowds;
				});
			}
		}
    	
    	$scope.filterCrowdsWithTouchPointType = function(crowds,touchPointType){
    		var result = [/*{
				id:"",
				name:"请选择人群"
			}*/];
    		if(touchPointType && crowds && crowds.length > 0){
    			var crowdsLength = crowds.length;
    			for(var i = 0;i < crowdsLength;i++){
    				if(crowds[i].touchPointType == touchPointType && crowds[i].id != $scope.crowdDetails.id){
    					result.push(crowds[i]);
    				}
    			}
    		}
    		return result;
    	}
    	
    	$scope.selectCrowdCallback = function(crowd){
    		if(crowd && crowd.id != $scope.crowdCompareSelect.crowdId){
    			$scope.$apply(function (){
    				$scope.crowdCompareSelect.crowdId = crowd.id;
    				$scope.crowdCompareSelect.selectLabel = crowd.name;
    				
    				$scope.startCrowdCompare();//选择之后立即对比
    		    });
    		}
		}
    	
    	/*人群对比end*/
    	
    	$scope.initDicByName = function(){
			var params = {         
		        dicName : 'REPORT_VIEW_TYPE',
		        metaDicName : 'TOUCH_POINT_TYPE'
			};
			DicService.getDicByName(params).then(function(dicMap){
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	if($stateParams.parentHash && $stateParams.parentHash.indexOf("crowd/crowds") == -1){
    		$scope.initDicByName();
    	}
    }];
});


