define(['angularAMD','app/controllers/common/EchartsOptions', 'app/controllers/tag/TagBuilder','css!../../../../css/app/user/user','app/directives/TdTreeSelect','app/controllers/common/HighchartsOptions', 'app/services/admin/DicService','app/services/tag/TagService','app/services/user/UserProfileService','echarts','app/directives/TdEcharts','app/directives/TdHighcharts','app/filters/common/CommonFilter'], function (angularAMD,EchartsOptions,TagBuilder) {
    'use strict';
    return ['$scope','$stateParams','$rootScope','DicService','TagService','UserProfileService','$state','NgTableParams', '$location', function ($scope,$stateParams,$rootScope,DicService,TagService,UserProfileService,$state,NgTableParams,$location) {    
    	
    	$scope.viewEditUserProfile = function() {
			if ($scope.userProfileId) {
				$.layerLoading.show();
				UserProfileService.getById($scope.userProfileId).then(function(userProfile) {
					$.layerLoading.hide();
					$scope.userProfile = userProfile;
					$scope.renderCreditChart();
					$scope.renderAssetDataPie();
					$scope.getUserProfileCrowd();
					$scope.queryTagMetaData();
				}, function(response) {
					$.layerLoading.hide();
					if (response.data != null && !response.data.success) {
						
					}
				});
			}
			
			$scope.initUserConsumeFilter();
			$scope.renderConsumeDataChart();
		
			$scope.initProductMessage();//产品
			$scope.queryProductList();
			
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		};
		
		$scope.getUserProfileCrowd = function(){
			$scope.crowdId = $stateParams.crowdId || "";
			$scope.userProfileCrowd = "";
			if($scope.userProfile && $scope.userProfile.crowds){
				if($scope.crowdId){
					for(var k in $scope.userProfile.crowds){
						if($scope.crowdId && $scope.crowdId == k){
							if($scope.userProfile.crowds[k] && $scope.userProfile.crowds[k].name){
								$scope.userProfileCrowd = $scope.userProfile.crowds[k].name;
								break;
							}
						}
					}
				}else{
					var i = 0;
					for(var k in $scope.userProfile.crowds){
						if(i == 0){
							if($scope.userProfile.crowds[k] && $scope.userProfile.crowds[k].name){
								$scope.userProfileCrowd = $scope.userProfile.crowds[k].name;
								break;
							}
						}
					}
				}
			}
		}
		
		$scope.queryTagMetaData = function() {
			$.layerLoading.show();
			TagService.getTagMetadata('tag_visible').then(function(tagMetadata) {
				$.layerLoading.hide();
				TagBuilder.init(tagMetadata);
				$scope.initTagTouchPointType();
	    		if($scope.touchPointType){
	    			$scope.initUserBehaviorFilter();//行为
	    			$scope.queryUserBehaviorList();
	    		}
			}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
		}
		
		$scope.initTagTouchPointType = function(){
			$scope.individualUserList = TagBuilder.getAccountIdTypes();
			if($scope.individualUserList && $scope.individualUserList.length > 0){
				$scope.hasAccountId = false;
				for(var i = 0;i < $scope.individualUserList.length;i++){
					if($scope.individualUserList[i].majorAccount){
						$scope.hasAccountId = true;
						$scope.touchPointType = $scope.individualUserList[i].id;
						break;
					}
				}
			}
		}
		
		
		
		$scope.selectProductCallback = function(productCategory){
			//console.dir([productCategory,'productCategory']);
			$scope.productCategoryObject.productCategoryId = productCategory.id;
			$scope.search();
		}
		
		$scope.search = function(){  
			/*if($scope.isShowMoreSearch){
				
			}else{*/
				$scope.productTableParams.filter({'q' : $scope.searchValue,productCategoryId:$scope.productCategoryObject.productCategoryId});
			//}
		};
		
		$scope.initProductMessage = function(){
			$scope.productCategoryObject = {
				productCategoryId:'',
    			selectLabel : "产品信息",
    			menuElem:"menuProductContent"
    		};
			$scope.selectProductCategoryTree = [{
				id:"",
				name:'所有产品'
			},
			{
				id:"1",
				name:'证券类'
			},
			{
				id:"2",
				name:'保险类'
			},
			{
				id:"3",
				name:'理财类'
			},
			{
				id:"4",
				name:'股票类'
			}];
		}
		
		$scope.queryProductList = function(){
			$scope.userProfiles = {
				total:200,
				rows:[{
					id:'1',
					name:'申万中证500',
					price:'100,000',
					time:'2015-05-06 10:22:49',
					period:'5年',
					productCategoryId:'证券类',
					rate:'7.50%',
					channel:'牛网'
				},
				{
					id:'2',
					name:'华润100ETF',
					price:'150,000',
					time:'2015-06-02 13:12:22',
					period:'1年',
					productCategoryId:'证券类',
					rate:'5.02%',
					channel:'E号通'
				},{
					id:'3',
					name:'易方达上证50',
					price:'130,000',
					time:'2014-10-22 10:32:11',
					period:'2年',
					productCategoryId:'证券类',
					rate:'4.32%',
					channel:'牛网'
				},
				{
					id:'4',
					name:'国泰TMT50',
					price:'120,000',
					time:'2015-06-02 13:12:22',
					period:'1.5年',
					productCategoryId:'证券类',
					rate:'2.54%',
					channel:'E号通'
				},
				{
					id:'5',
					name:'长信一带一路',
					price:'140,000',
					time:'2013-04-02 13:22:10',
					period:'3年',
					productCategoryId:'证券类',
					rate:'4.35%',
					channel:'牛网'
				},
				{
					id:'6',
					name:'质押宝',
					price:'160,000',
					time:'2014-03-15 14:16:25',
					period:'2年',
					productCategoryId:'理财类',
					rate:'3.28%',
					channel:'E号通'
				}]
			};
			$scope.productTableParams = new NgTableParams(angular.extend({
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
	            	//$location.search(params.url()); 
	    			//UserProfileService.queryUserProfiles(condition,params).then(function(userProfiles){
	    				params.total($scope.userProfiles.total);
	                    $defer.resolve($scope.userProfiles);
	    			/*},function(response) {
	    				if(response.data != null && !response.data.success){
	    					
	    				}
	    			});*/
	            }
	        });
		}
		
		/*行为轨迹start*/
		
		$scope.selectUserBehaviorCallback = function(behavior){
			//console.dir([behavior,'behavior']);
			$scope.userBehaviorObject.behaviorType = behavior.id;
			$scope.searchUserBehavior();
		}
		
		$scope.searchUserBehavior = function(){  
			/*if($scope.isShowMoreSearch){
				
			}else{*/
				$scope.behaviorTableParams.filter({
					'q' : $scope.searchValue,
					behaviorType:$scope.userBehaviorObject.behaviorType,
					userId:$scope.userProfile.user_id,
					timeStart:$scope.userBehaviorObject.timeStart,
	    			timeEnd:$scope.userBehaviorObject.timeEnd
	    		});
			//}
		};
		
		$scope.changeUserBehaviorTime = function(start,end){
			$scope.userBehaviorObject.timeStart = start;
			$scope.userBehaviorObject.timeEnd = end;
			$scope.searchUserBehavior();
		}
		
		$scope.changeUserBehaviorFilter = function(){
			$scope.searchUserBehavior();
			$scope.calculateSelectStyle();
		}
		
		$scope.getMapLableByKey = function(key){
			var label = "";
			if(key && $scope.userBehaviorGroupMap){
				for(var o in $scope.userBehaviorGroupMap){
					var vals = $scope.userBehaviorGroupMap[o];
					for(var i = 0;i < vals.length;i++){
						if(key == vals[i].id){
							label = vals[i].label;
							break;
						}
					}
				}
			}
			return label;
		}
		
		$scope.calculateSelectStyle = function(){
			$scope.userBehaviorObject = $scope.userBehaviorObject || {};
			if($scope.userBehaviorObject.behaviorType){
				var label = $scope.getMapLableByKey($scope.userBehaviorObject.behaviorType);
				var length = label.length;
				var width = length * 17;
				$scope.userBehaviorObject.style = 'width:'+width+'px';
			}else{
				$scope.userBehaviorObject.style = 'width:80px';
			}
		}
		
		$scope.initUserBehaviorFilter = function(){
			var userprofileMaxTime = angular.copy(appConfig.dmpDataUserProfileXaxTimerRnge);
			var selectDays = [{key:'-'+(userprofileMaxTime - 3 > 0? 3: userprofileMaxTime),label:'近3日'},
			              {key:'-'+(userprofileMaxTime - 7 > 0? 7: userprofileMaxTime),label:'近7日'},
			              {key:'-'+(userprofileMaxTime - 30 > 0? 30: userprofileMaxTime),label:'近30日'},
			              {key:'-'+(userprofileMaxTime - 90 > 0? 90: userprofileMaxTime),label:'近90日'}];
			
			$scope.userBehaviorObject = {
				limitFirstDate:-(userprofileMaxTime-1),
				style:'width:80px',
				behaviorType:'',
    			selectLabel : "全部行为",
    			menuElem:"menuUserBehaviorContent",
    			initDateRangeValue:"-30",
    			timeStart:"",
    			timeEnd:"",
    			fastSelectDays:selectDays
    				
    		};
			var userBehaviorTables = TagBuilder.getBehaviorTables($scope.touchPointType);
			//$scope.selectUserBehaviorTree = $scope.buildUserBehaviorTables(userBehaviorTables);
			
			var groupMap = _.groupBy(userBehaviorTables, function(item){
				var group = "其它行为";
				if(item && item.objInfo && item.objInfo.group){
					group = item.objInfo.group;
				}
				return group;
			});
			groupMap = $scope.sortUserBehaviorGroupMap(groupMap);
			$scope.userBehaviorGroupMap = groupMap;
		}
		
		$scope.sortUserBehaviorGroupMap = function(groupMap){
			if(groupMap){
				for(var group in groupMap){
					var groupTables = groupMap[group];
					if(groupTables && groupTables.length > 0){
						groupTables = _.sortBy(groupTables, function(item){
							return item && item.objInfo && item.objInfo.idx;
						});
						groupMap[group] = groupTables;
					}
				}
			}
			return groupMap;
		}
		
		$scope.queryUserBehaviorList = function(){
			$scope.behaviorTableParams = new NgTableParams(angular.extend({
	            page: 1,           
	            count: 10,          
	            sorting: {
	                name: 'asc'     
	            },
	            filter : {
    				q : $scope.searchValue,
    				behaviorType : $scope.userBehaviorObject.behaviorType,
    				userId:$scope.userProfile.user_id
    			}
	        },
	        $location.search()), {
	            counts: [10, 20, 50],
	            paginationMaxBlocks: 9,
	            total: 0,                           
	            getData: function ($defer, params) {
	            	//$location.search(params.url()); 
	            	//$.layerLoading.show();
	    			UserProfileService.queryUserBehaviors(params).then(function(userBehaviors){
	    				//$.layerLoading.hide();
	    				params.total(userBehaviors.total);
	                    $defer.resolve(userBehaviors);
	                    $scope.formatUserBehaviorType(userBehaviors);
	                    
	                    window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
	    			},function(response) {
	    				//$.layerLoading.hide();
	    				if(response.data != null && !response.data.success){
	    					
	    				}
	    			});
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
		
		$scope.formatUserBehaviorType = function(userBehaviors){
			if(userBehaviors && userBehaviors.length > 0){
				for(var i = 0;i < userBehaviors.length;i++){
					if(userBehaviors[i].behavior_type == '\\N'){
						userBehaviors[i].behavior_type = '';
					}
				}
			}
		}
		
		$scope.showMoreUserBehavior = function(behavior,data){
			if(data && data.length > 0){
				for(var i = 0;i < data.length;i++){
					if(behavior._id != data[i]._id){
						data[i].isShowMore = false;
					}
				}
			}
			behavior.isShowMore = !behavior.isShowMore;
			
			$scope.queryMoreUserBehavior(behavior);
		}
		
		$scope.queryMoreUserBehavior = function(behavior){
			if(behavior){
				//$.layerLoading.show();
				UserProfileService.queryMoreUserBehavior(behavior).then(function(userBehaviors){
					$.layerLoading.hide();
					behavior.userBehaviors = userBehaviors;
				},function(response) {
					$.layerLoading.hide();
					if(response.data != null && !response.data.success){
						
					}
				});
			}
		}
		
		/*行为轨迹end*/
		
		$scope.renderAssetDataPie = function(){//资产数据
			if($scope.userProfile && $scope.userProfile.capitalInfo){
				var formatData = $scope._formatEchartPieData($scope.userProfile.capitalInfo);
				$scope.assetDataPieData = $scope.userProfile.capitalInfo;
				$scope.echartAssetDataPie = EchartsOptions.tagCategoryPie(formatData,true);
			}
		}
		
		$scope.renderCreditChart = function(){//信用信息
			if($scope.userProfile && $scope.userProfile.creditInfo){
				$scope.highchartCreditChart = HighchartsOptions.radar($scope.userProfile.creditInfo);
			}
		}
		
		$scope.renderConsumeDataChart = function(){//消费数据
			if($scope.userConsumeFilter.time == '6'){
				$scope.consumeDatas = {
			    		categories: ['超市','餐饮','机票','旅游','酒店','商场','娱乐','医疗','教育','汽车','电商','健身','物业','公共事业'],
			    		series:[{
				            name: '交易总额',
				            color: '#669DED',
				            type: 'column',
				            yAxis: 1,
				            data: [1360,3593,6432,8839,1479,579,111,6255,6324,1256,1718,1997,185,787],
				            tooltip: {
				                valueSuffix: ' 元'
				            }

				        }, {
				            name: '交易次数',
				            color: '#89A54E',
				            type: 'spline',
				            data: [8,7,3,2,10,5,1,3,9,3,5,7,1,3],
				            tooltip: {
				                valueSuffix: ' 次'
				            }
				        }] 
			    	};
			}else{
				$scope.consumeDatas = {
			    		categories: ['超市','餐饮','机票','旅游','酒店','商场','娱乐','医疗','教育','汽车','电商','健身','物业','公共事业'],
			    		series:[{
				            name: '交易总额',
				            color: '#669DED',
				            type: 'column',
				            yAxis: 1,
				            data: [831,2167,1062,1416,699,2934,363,2150,2032,699,1192,194,164,463],
				            tooltip: {
				                valueSuffix: ' 元'
				            }

				        }, {
				            name: '交易次数',
				            color: '#89A54E',
				            type: 'spline',
				            data: [1,3,4,2,8,3,5,3,9,10,7,2,3,6],
				            tooltip: {
				                valueSuffix: ' 次'
				            }
				        }] 
			    	};
			}
			
			$scope.buildConsumeTableDatas($scope.consumeDatas);
			$scope.highchartConsumeDataChart = HighchartsOptions.lineColumnTwoY($scope.consumeDatas);
		}
		
		$scope.buildConsumeTableDatas = function(data){

			$scope.consumeTableDatas = {
    			thead:[{
    				id:'thead-name',
    				label:'名称'
    			}],
    			tbody:[]
    		};
    		
    		if(data && data.categories && data.series && data.series.length > 0){
    			var categories = data.categories;
    			for(var i = 0;i < categories.length;i++){
    				$scope.consumeTableDatas.thead.push({
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
            					label:seriesItemData[j]
        					});
        				}
        				$scope.consumeTableDatas.tbody.push({
        					id:i,
        					list:trItem
        				});
    				}
    			}
    			
    		}
    	}
		
		$scope.initUserConsumeFilter = function(){//消费数据
			$scope.userConsumeFilter = {
    			time:'3',
    			chart:'5'
    		};
			$scope.getUserConsumeDataMapsList();
			$scope.getUserConsumeDataTimesList();
		}
		
		$scope.changeUserConsumeFilter = function(filter,field){
    		if(filter){
    			$scope.userConsumeFilter[field] = filter.id;
    			$scope.renderConsumeDataChart();
    		}else{
    			$scope.userConsumeFilter[field] = "";
    		}
    	}
		
		$scope.getUserConsumeDataMapsList = function(){
    		$scope.userConsumeDataMapsList = [{
    			id:'5',
    			label:'混合图',
    			code:'trend'
    		},{
    			id:'table',
    			label:'表格',
    			code:'table'
    		}];
    	}
    	
    	$scope.getUserConsumeDataTimesList = function(){
    		$scope.userConsumeDataTimesList = [{
    			id:'3',
    			label:'近3个月'
    		},{
    			id:'6',
    			label:'近6个月'
    		}];
    	}
		
		$scope._formatEchartPieData = function(data) {
			var data = data || {};
			var displayNameList = data.displayNameList;
			var valueList = data.valueList;

			var formatData = {
				displayNames : [],
				datas : []
			};
			for (var i = 0; i < displayNameList.length; i++) {
				formatData.displayNames.push(
					displayNameList[i]
				);
				formatData.datas.push({
					name : displayNameList[i],
					value : valueList[i],
				});
			}
			return formatData;
		}
		
		$scope.showHideHistoryCrowds = function(){
			$scope.showHistoryCrowds = !$scope.showHistoryCrowds;
		}
		
		$scope.goBackHistory = function() {
			window.history.back();
		}
    	
    	$scope.init = function(){
    		$scope.userProfileId = $stateParams.userProfileId || "";
    		$scope.userProfile = {};
    		if($scope.userProfileId) {
    			$scope.viewEditUserProfile();
    		}
    	};
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'BEHAVIOR_TYPE',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			//$scope.tagCalcStatus = angular.copy(appConfig.dicMap['BEHAVIOR_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
		
		
    }];
});
