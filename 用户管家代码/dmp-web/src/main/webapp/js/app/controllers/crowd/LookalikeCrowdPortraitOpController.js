define(['angularAMD','app/controllers/common/EchartsOptions','echarts','mint','funnel', 'app/services/admin/DicService','app/services/crowd/CrowdPortraitService', 'app/services/crowd/CrowdService','app/services/tag/TagService','app/directives/TdHighcharts','app/directives/TdEcharts','app/controllers/common/HighchartsOptions','app/filters/common/CommonFilter','app/controllers/common/searchTagator'], function (angularAMD,EchartsOptions) {
    'use strict';
    return ['$scope','$rootScope','DicService','CrowdPortraitService','CrowdService','TagService','$state','$stateParams', '$location', function ($scope,$rootScope,DicService,CrowdPortraitService,CrowdService,TagService,$state,$stateParams,$location) {    
    	
    	$scope.init = function(){
    		$scope.curTab = 'area';
	    	$scope.lookalikeCrowdId = $stateParams.lookalikeCrowdId;
	    	
	    	$scope.checkChannel = "";
	    	$scope.lookalikeCrowdDetails;

	    	if($scope.lookalikeCrowdId){//相似人群
	    		$scope.checkChannel = 'lookalikeCrowd';
	    		$scope.queryLookalikeCrowdDetailsCrowdId();//根据相似客群ID查询客群信息
	    	}
	    	
	    	$scope.cityPercent = {
    			one : '0%',
    			two : '0%',
    			three : '0%'
    		};
    	};
    	
    	
    	
    	$scope.tabClick = function(tab){
    		$scope.curTab = tab;
    		if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			} 
    	}
    	
    	$scope.showExportCrowdLayer = function(crowd){
    		$scope.exportObj = {};
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
						$.createDownloadIframe(params);
					}else{
						$.Pop.alerts(response.msg);
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
    	
    	
    	$scope.queryLookalikeCrowdDetailsCrowdId = function(){
    		CrowdPortraitService.getLookalikeWithScale($scope.lookalikeCrowdId).then(function(lookalikeCrowd){
    			$scope.lookalikeCrowdDetails = lookalikeCrowd;

    			if($scope.lookalikeCrowdDetails.crowdCount > 0){
    				$scope.drawCityPortrait();
    				$scope.drawChinaMapProvice();
    			}
    			
    		});
    	}
    	
    	$scope.drawChinaMapProvice = function(){
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'province_name', 4).then(function(data){
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
    	
    	$scope.drawCityPortrait = function(){
    		$scope.highchartCity = {};
    		
    		$scope.drawAllCityPortrait('all');
    		$scope.drawFirstTierCitiesLevelPortrait();
    		$scope.drawTwoTierCitiesLevelPortrait('twoTierCities');
    		$scope.drawThirdTierCitiesLevelPortrait('thirdTierCities');
    		
    		$scope.drawBrandPortrait();
    		$scope.drawModelPortrait();
    		$scope.drawNetworkTypePortrait();
    		
    		$scope.drawPixelPortrait();
    		$scope.drawOsVersionPortrait();
    		$scope.drawCarrierPortrait();
    		$scope.drawPartnerNamePortrait();
    	}
    	
    	$scope.drawBrandPortrait = function(){
    		$scope.brandNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'brand', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.brandNoData = true;
    			}else{*/
    				$scope.highchartBrand = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawModelPortrait = function(){
    		$scope.modelNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'model', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.modelNoData = true;
    			}else{*/
    				$scope.highchartModel = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawNetworkTypePortrait = function(){
    		$scope.networkTypeNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'network_type', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.networkTypeNoData = true;
    			}else{*/
    				$scope.highchartNetworkType = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawPixelPortrait = function(){
    		$scope.pixelNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'pixel', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.pixelNoData = true;
    			}else{*/
    				$scope.highchartPixel = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawOsVersionPortrait = function(){
    		$scope.osVersionNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'os_version', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.osVersionNoData = true;
    			}else{*/
    				$scope.highchartOsVersion = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawCarrierPortrait = function(){
    		$scope.carrierNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'carrier', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.carrierNoData = true;
    			}else{*/
    				$scope.highchartCarrier = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawPartnerNamePortrait = function(){
    		$scope.partnerNameNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'partner_name', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.partnerNameNoData = true;
    			}else{*/
    				$scope.highchartPartnerName = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	
    	$scope.drawAllCityPortrait = function(level){
    		$scope.allCityNoData = false;
    		CrowdPortraitService.queryCrowdPortrait($scope.lookalikeCrowdId, 'city_name', 1).then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.allCityNoData = true;
    			}else{*/
    				$scope.highchartCityAll = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawFirstTierCitiesLevelPortrait = function(){
    		$scope.firstTierCitiesNoData = false;
    		CrowdPortraitService.queryCrowdCityPortrait($scope.lookalikeCrowdId, 'city_name',1, 'firstTierCities').then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.firstTierCitiesNoData = true;
    			}else{*/
    				$scope.highchartFirstTierCities = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawTwoTierCitiesLevelPortrait = function(){
    		$scope.twoTierCitiesNoData = false;
    		CrowdPortraitService.queryCrowdCityPortrait($scope.lookalikeCrowdId, 'city_name',1, 'twoTierCities').then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.twoTierCitiesNoData = true;
    			}else{*/
    				$scope.highchartTwoTierCities = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.drawThirdTierCitiesLevelPortrait = function(){
    		$scope.thirdTierCitiesNoData = false;
    		CrowdPortraitService.queryCrowdCityPortrait($scope.lookalikeCrowdId, 'city_name',1, 'thirdTierCities').then(function(data){
    			/*if(data.series[0].data.length == 0 || (data.series[0].data.length == 1 && data.series[0].data[0] == 0)){
    				$scope.thirdTierCitiesNoData = true;
    			}else{*/
    				$scope.highchartThirdTierCities = HighchartsOptions.bar(data);
    			//}
    		});
    	}
    	
    	$scope.calculateCityPercent = function(){
    		CrowdPortraitService.queryCityPercent($scope.lookalikeCrowdId).then(function(respone){
    			/*$scope.cityPercent = {
	    			one : '20%',
	    			two : '30%',
	    			three : '50%'
	    		};*/
    		});
    	}
    	
    	$scope.initDicByName = function(){
    		var params = {         
			        dicName : 'REPORT_VIEW_TYPE,USER_ACCOUNTID_PROFILE_COLUMNS,USER_APPTDID_PROFILE_COLUMNS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.reportViewTypeDict = angular.copy(appConfig.dicMap['REPORT_VIEW_TYPE']);
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	$scope.initDicByName();
		
    }];
});


