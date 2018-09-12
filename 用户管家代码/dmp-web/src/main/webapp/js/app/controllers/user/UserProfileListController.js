define(['angularAMD','app/lib/tag/builder/DefinitionBuilder', 'app/controllers/tag/TagBuilder','app/controllers/crowd/CrowdDefinitionController','css!/enterprise/css/app/searchTagator/searchTagator','css!../../../../css/app/tag/tag','css!../../../../css/app/user/user', 'app/services/admin/DicService','app/services/common/CommonService','app/services/tag/TagService','app/services/user/UserProfileService','app/services/crowd/CrowdService','app/directives/TdStringHtmlDirective','app/filters/common/CommonFilter','app/directives/TdTreeSelect'], function (angularAMD,DefinitionBuilder,TagBuilder,CrowdDefinitionController) {
    'use strict';
    return ['$scope','$stateParams','$rootScope','DicService','CommonService','TagService','UserProfileService','CrowdService','$state','NgTableParams', '$location', function ($scope,$stateParams,$rootScope,DicService,CommonService,TagService,UserProfileService,CrowdService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.crowdId = $stateParams.crowdId;
    		$scope.parentHash = $stateParams.parentHash || "";
    		
    		$scope.reloadSearchValue();
    		$scope.initUserProfileFilter();
    		$scope.queryTagMetaData('user_profile');
    	};
    	
    	$scope.viewUserprofiles = function(){
    		$.layerLoading.show();
    	}
    	
    	$scope.goBackCrowdPortrait = function() {
    		$state.go('crowd_portrait', { crowdId: $scope.crowdId,parentHash:$scope.parentHash});
		}
    	
    	$scope.reloadSearchValue = function(){
    		if(!$scope.isShowMoreSearch){
    			setTimeout(function(){
    				$scope.searchValue = $location.search()['filter[q]'] || '';
    			},200);
    		}
		}
    	
    	$scope.getMetaDic = function(){
    		var metaDic = ["product_id","platform_id","partner_id"];
			for(var i = 0;i < metaDic.length;i++){
				$scope.initMetaDic(metaDic[i]);
			}
    	}
    	
    	$scope.queryTagMetaData = function(search_type) {
    		$.layerLoading.show();
			TagService.getTagMetadata(search_type).then(function(tagMetadata) {
				$.layerLoading.hide();
				TagBuilder.init(tagMetadata);
				$scope.initTagTouchPointType();
	    		if($scope.touchPointType){
	    			var userTables = TagBuilder.getAttributeTables($scope.touchPointType);
    				$scope.buildSearchVisible(userTables);
    				$scope.buildSearchResultVisible(userTables);
	    		}
			}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
		}
    	
    	$scope.buildSearchVisible = function(userTables){
			$scope.userSearchVisibleTables = angular.copy(userTables);
			$scope.userSearchVisibleTables = $scope._buildAttributeTableAttributes($scope.userSearchVisibleTables,$scope.touchPointType,"user_profile","search_visible");
			if($scope.userSearchVisibleTables && $scope.userSearchVisibleTables.length > 0){
				$scope.isNeedMoreSearch = true;
				$scope.initUserProfilesFilters();
			}
    	}
    	
    	$scope.buildSearchResultVisible = function(userTables){
    		$scope.userSearchResultVisibleTables = angular.copy(userTables);
			$scope.userSearchResultVisibleTables = $scope._buildAttributeTableAttributes($scope.userSearchResultVisibleTables,$scope.touchPointType,"user_profile","search_result_visible");
			$scope.buildUserProfileTableHead();
			$scope.definition = $scope.buildCrowdAnalysisCondtions();
			$scope.queryUserProfiles();
			
			console.dir([$scope.userSearchResultVisibleTables]);
    	}
    	
    	$scope.buildUserProfileTableHead = function(){
    		$scope.userProfileTable = {
    			thead:[],
    			tbody:[]
    		};
    		if($scope.userSearchResultVisibleTables && $scope.userSearchResultVisibleTables.length > 0){
    			var userSearchResultVisibleTables = $scope.userSearchResultVisibleTables;
    			var userSearchResultVisibleTablesLength = userSearchResultVisibleTables.length;
    			for(var i = 0;i < userSearchResultVisibleTablesLength;i++){
    				//if(userSearchResultVisibleTables[i].id == 'fpd_account_user'){
    					if(userSearchResultVisibleTables[i].attributes && userSearchResultVisibleTables[i].attributes.length > 0){
        					var attributesLength = userSearchResultVisibleTables[i].attributes.length;
        					for(var j = 0;j < attributesLength;j++){
        						//if(userSearchResultVisibleTables[i].attributes[j].id != 'brand' && userSearchResultVisibleTables[i].attributes[j].id != 'model'){
        							if(!$scope.checkTheadIsRepeat(userSearchResultVisibleTables[i].attributes[j].id)){
        								$scope.userProfileTable.thead.push({
                							id:userSearchResultVisibleTables[i].attributes[j].id,
                							label:userSearchResultVisibleTables[i].attributes[j].label
                						});
        							}
        						//}
        						
        					}
        				}
    				//}
    			}
    		}
    	}
    	
    	$scope.checkTheadIsRepeat = function(id){
    		var isRepeat = false;
    		if(id && $scope.userProfileTable && $scope.userProfileTable.thead && $scope.userProfileTable.thead.length > 0){
    			var length = $scope.userProfileTable.thead.length;
    			for(var i = 0;i < length;i++){
    				if($scope.userProfileTable.thead[i].id == id){
    					isRepeat = true;
    					break;
    				}
    			}
    		}
    		return isRepeat;
    	}
    	
    	$scope._buildAttributeTableAttributes = function(attributeTables,deviceType,attributeGroupType,attributeGroupCode){
			var attributeTableAttributes = [];
			if(attributeTables && attributeTables.length > 0){
				var group = TagBuilder.findByAttributeGroupTypeAndCode(deviceType,attributeGroupType,attributeGroupCode);
				for(var i = 0;i < attributeTables.length;i++){
					var attributeTable = attributeTables[i];
					var attributes = TagBuilder.getAttributesByObject(group, attributeTable.id);
					attributeTable.attributes = attributes;
				}
				attributeTableAttributes = attributeTables;
			}
			return attributeTableAttributes;
		}
    	
    	$scope.buildCrowdAnalysisCondtions = function(){
    		var result = {};
    		return result;
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
    	
    	$scope.tagRelationsCallback = function(){
    		$scope.calNgTableBody(); 
    	}
    	
    	$scope.initUserProfilesFilters = function(){
    		$scope.tagRelationsPanelHtml = "";
    		$scope.CrowdDefinitionController = new CrowdDefinitionController();
    		var that = this;
    		if($scope.touchPointType){
    			that.CrowdDefinitionController.model.deviceType = $scope.touchPointType;
    			var html = this.CrowdDefinitionController.initHtml();
    			$scope.tagRelationsPanelHtml = html;
    			$scope.clickWelcomeBtn();
    		}
    		
    		if(!$scope.tagRelationsPanelHtml){
    			$scope.isNeedMoreSearch = false;
    		}
    	}
    	
    	$scope.clickWelcomeBtn = function(){
    		if($(".user-profile-container #relations-panel .welcome-btn span").length > 0){
    			$(".user-profile-container #relations-panel .welcome-btn span").click();
    		}else{
    			setTimeout(function(){$scope.clickWelcomeBtn()},200);
    		}
    	}
    	
    	$scope.resetSearchConditions = function(){
    		var html = this.CrowdDefinitionController.resetSearchConditions();
    		$("#relations-panel .ralation-box").html(html);
    		$scope.clickWelcomeBtn();
    		$scope.calNgTableBody();
    	}
    	
    	$scope.searchUserProfiles = function(){
    		var respone = this.CrowdDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				var definition = respone.db.definition;
				if($.isNullObj(definition.filter) || $.isNullObj(definition.condition)){
					$.Pop.alerts("请先创建用户属性条件再搜索用户");
					return false;
				}
				$scope.definition = definition;
				$scope.search();
			}else{
				$.Pop.alerts(respone.msg);
			}
    	}
    	
    	$scope.selectCrowdCallback = function(crowd){
    		$scope.$apply(function (){
    			$scope.userProfileObject.crowdId = crowd.id;
    			$scope.search();
		    });
		}
    	
    	$scope.initUserProfileFilter = function(){
			$scope.userProfileObject = {
				crowdId:$location.search()['filter[crowdId]'] || $stateParams.crowdId || "",
    			selectLabel : "全部用户",
    			menuElem:"menuUserProfileContent",
    			keywords:""
    		};
			
			CrowdService.queryValidCrowdList().then(function(crowds){
				var crowds = $scope.filterCrowdsWithUser(crowds);
				$scope.selectUserProfileSourceList = crowds;
				$scope.userProfileObject.selectLabel = $scope.getCrowdNameById(crowds);
			});
		}
    	
    	$scope.getCrowdNameById = function(crowds){
    		var crowdName = "全部用户";
    		if($scope.userProfileObject.crowdId && crowds && crowds.length > 0){
    			var crowdsLength = crowds.length;
    			for(var i = 0;i < crowdsLength;i++){
    				if(crowds[i].id == $scope.userProfileObject.crowdId){
    					crowdName = crowds[i].name;
    					break;
    				}
    			}
    		}
    		return crowdName;
    	}
    	
    	$scope.filterCrowdsWithUser = function(crowds){
    		var result = [{
				id:"",
				name:"全部用户"
			}];
    		if(crowds && crowds.length > 0){
    			var crowdsLength = crowds.length;
    			for(var i = 0;i < crowdsLength;i++){
    				if(crowds[i].touchPointType == 'account_id' || crowds[i].majorAccount){
    					result.push(crowds[i]);
    				}
    			}
    		}
    		return result;
    	}
    	
    	$scope.queryUserProfiles = function(){
    		$scope.searchValue = $scope.searchValue || "";
	    	$scope.tableParams = new NgTableParams(angular.extend({
	            page: 1,           
	            count: 10,          
	            sorting: {
	                name: 'asc'     
	            },
	            filter : {
    				q : $scope.searchValue,
    				crowdId : $scope.userProfileObject.crowdId
    			}
	        },
	        $location.search()), {
	            counts: [10, 20, 50],
	            paginationMaxBlocks: 9,
	            total: 0,                           
	            getData: function ($defer, params) {
	            	$location.search(params.url()); 
	    			UserProfileService.queryUserProfiles($scope.definition,params).then(function(userProfiles){
	    				$scope.userProfiles = $scope.rebuildUserProfiles(userProfiles);
	    				params.total(userProfiles.total);
	    				$defer.resolve($scope.userProfiles.rows);
	    				
	    				window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
	    			},function(response) {
	    				if(response.data != null && !response.data.success){
	    					
	    				}
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
				var $moreSearchBox = $ngTableContainer.find(".form-horizontal-tag");
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
		
		$scope.rebuildUserProfiles = function(userProfiles){
			var result = {
				"total": 0,
				"rows": []
			};
			if(userProfiles && 
				userProfiles.rows && 
				userProfiles.rows.length > 0 &&
				$scope.userProfileTable.thead.length > 0
				){
				result.total = userProfiles.total;
				var userProfilesRows = userProfiles.rows;
				var length = userProfilesRows.length;
				var tableHead = $scope.userProfileTable.thead;
				var tableHeadLength = tableHead.length;
				
				for(var i = 0;i <length;i++){
					var userProfilesRow = userProfilesRows[i];
					var first_party_profile = userProfilesRow.first_party_profile || {};
					var td_online_screen_profile = userProfilesRow.td_online_screen_profile || {};
					first_party_profile = _.extend(first_party_profile, td_online_screen_profile);
					var rowItem = {};
					for(var j = 0;j < tableHeadLength;j++){
//						rowItem[tableHead[j].id] = first_party_profile[tableHead[j].id] || "";
						rowItem[tableHead[j].id] = userProfilesRow[tableHead[j].id] || "";
					}
					rowItem._id = userProfilesRow["_id"];
					result.rows.push(rowItem);
				}
			}
			return result;
		}
		
		$scope.resetMoreSearchCondition = function(){
			$scope.isNeedMoreSearch = true;
		}
		$scope.search = function(){  
			var random = CommonService.getRandomNum(1,100000000);
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({crowdId : $scope.userProfileObject.crowdId,"random":random});
			}else{
				$scope.definition = {};
				$scope.tableParams.filter({'q' : $scope.searchValue,crowdId : $scope.userProfileObject.crowdId,"random":random});
			}
		};
		
		$scope.initMetaDic = function(attributeCode){
			var deviceType = $scope.touchPointType;
			var objectCode = "cross_screen_account";
			var param = {
				url : '/dmp-web/tag/metadata/enum/'+objectCode+'/'+attributeCode + '/'+deviceType,
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : {}
			};
			$.callApi(param, function(response) {
				if(response && response.rows){
					var rows = response.rows;
					var dics = [];
					for(var i = 0;i < rows.length;i++){
						dics.push({
							dicItemKey:rows[i].key,
							dicItemValue:rows[i].value
						});
					}
					appConfig.dicMap[attributeCode] = dics;
				}
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				
			});
		}
		
		
		$scope.initDicByName = function(){
			
    		/*DicService.getDicByName('').then(function(dicMap){
    			$scope.tagCalcStatus = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);*/
    			$scope.init();
    		//});
    	}
    	
    	$scope.initDicByName();
		
		
    }];
});
