define(['angularAMD','app/services/admin/DicService', 'app/services/crowd/CrowdService', 'app/services/tag/TagService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'CrowdService','TagService', '$state', function ($scope, $stateParams,DicService, CrowdService,TagService, $state) {
    	    	
    	
    	$scope.viewEditCrowd = function(){
    		if($stateParams.crowdId){
	    		CrowdService.getById($stateParams.crowdId).then(function(crowd){
	    			$scope.isViewRule = $scope.checkLoginUserIsViewRule(crowd.createBy);
	    			$scope.crowd = crowd;    	
	    			$scope.tagObj.keyword = crowd.tagName;
	    			$scope.resetCrowdCount();
	    			$scope.queryTagList();
				});
    		}
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
		
		$scope.saveCrowd = function(crowd,formHorizontal){
			$scope.tagNameError = '';
			if(!crowd){
				crowd = {};
			}
			
			if(!crowd.name){
				formHorizontal.crowdName.$dirty = true;
				return false;
			}
			
			if(!crowd.tagType){
				formHorizontal.tagType.$dirty = true;
				return false;
			}
			
			if(!$scope.tagObj.keyword){
				formHorizontal.tagName.$dirty = true;
				return false;
			}
			
			var tagObj = $scope.checkInputTagIsValid();
			if(tagObj.has){
				if(tagObj.tag){
					if(tagObj.tag.status != 2){
						$scope.tagNameError = 'valid';
						//$.Pop.alerts("添加人群条件未生效，不能创建人群");
						return false;
					}else{
						crowd.tagId = tagObj.tag.id;
					}
				}
			}else{
				$scope.tagNameError = 'not';
				//$.Pop.alerts("添加人群条件不存在，请重新选择添加");
				return false;
			}
			$.layerLoading.show();
			crowd.id === undefined ? $scope.createCrowd (crowd) : $scope.editCrowd (crowd);
		};
		
		$scope.createCrowd = function(crowd){
			CrowdService.create(crowd).then(function(crowd){
				$.layerLoading.hide();
				$state.go('crowds');
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.editCrowd = function(crowd){
			CrowdService.update(crowd).then(function(crowd){
				$.layerLoading.hide();
				//$state.go('crowds');
				$scope.goBackHistory();
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.goBackHistory = function(){
			window.history.back();
		}
		
		$scope.queryTagList = function(isInit){
			
			TagService.queryTagByDmpTagType($scope.crowd.tagType).then(function(tags){
				$scope.tagList = tags;
				if(isInit){
					$scope.viewEditCrowd();
				}
			});
		};

		$scope.checkInputTagIsValid = function(){
			var tagObj = {
				has : false,
				tag : {}
			};
			
			var tagList = $scope.tagList,
			tagListLength = tagList.length;
			for(var i = 0; i < tagListLength; i++){
				if($scope.tagObj.keyword == tagList[i].name){
					tagObj = {
						has : true,
						tag : tagList[i]
					};
					break;
				}
			}
			
			return tagObj;
		}
		
		$scope.filterTagList = function(keyword){
			$scope.tagNameError = '';
			$scope.tagfilterList = [];
			if($scope.tagList && $scope.tagList.length == 0){
				$scope.isShowTagDropdownMenu = false;
				return false;
			}
			$scope.isShowTagDropdownMenu = true;
			
			if(!keyword){//显示所有
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
			
			var tagObj = $scope.checkInputTagIsValid();
			if(tagObj.has){
				$scope.tagNameError = '';
			}else{
				$scope.tagNameError = 'not';
			}
			$scope.resetCrowdCount();
		};
		$scope.selectTagItem = function(tag){
			$scope.tagNameError = '';
			$scope.tagObj.keyword = tag.name;
			$scope.hideTagDropdowMenu();
			$scope.resetCrowdCount();
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
		
		
		$scope.resetCrowdCount = function(){
			$scope.crowdCount = 0;
			var tagObj = $scope.checkInputTagIsValid();
			if(tagObj.has){
				if(tagObj.tag){
					if(tagObj.tag.crowdCount){
						$scope.crowdCount = tagObj.tag.crowdCount;
					}
				}
				
			}
		}
		
		$scope.changeTagWithDmpTagType = function(){
			$scope.tagObj.keyword = "";
			$scope.crowdCount = 0;
			$scope.queryTagList();
		}
		
		$scope.init = function(){
			$scope.crowd;
			$scope.crowdCount = 0;
			$scope.isViewRule = false;
			$scope.tagList;
    		$scope.isShowTagDropdownMenu = false;
    		$scope.tagObj = {};
    		$scope.tagObj.keyword = "";
    		$scope.tagfilterList;
    		if(!$scope.crowd){
    			$scope.crowd ={
    				tagType : $scope.tagTypeList[0].dicItemKey
    			}
    			$scope.queryTagList(true);
    		}
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_TAG_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.tagTypeList = angular.copy(appConfig.dicMap['DMP_TAG_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
