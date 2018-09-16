define(['angularAMD', 'app/services/admin/DicService', 'app/services/tag/SystemTagService', 'app/services/tag/TagService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'SystemTagService','TagService', '$state', function ($scope, $stateParams,DicService, SystemTagService,TagService, $state) {
    	$scope.viewEditSystemTag = function(){
    		$scope.isViewRule = true;
    		if($stateParams.systemTagId){
    			SystemTagService.getById($stateParams.systemTagId).then(function(systemTag){
    				$scope.isViewRule = $scope.checkLoginUserIsViewRule(systemTag.createBy);
        			$scope.systemTag = systemTag;    
        			$scope.systemTagName = systemTag.name;
        			if($scope.systemTag.scriptInfoId){
        				$scope.systemTag.scriptInfoId = $scope.systemTag.scriptInfoId.toString();
        			}
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
		
		$scope.validInputValue = function(type,val,elem,label,isCode){
    		var textType = "";
    		if(type == 'input'){
    			textType = $scope.nlsRoot.pleaseSelect;
    		}else if(type == 'select'){
    			textType = $scope.nlsRoot.pleaseSelect;
    		}
    		if(!val){
    			elem.errorText = textType + label;
    		}else if(isCode){
    			if(!/^[A-Za-z0-9_]+$/.test(val)){
    				elem.$dirty = true;
    				elem.$valid = false;
    				elem.errorText = label + $scope.nlsRoot.onlyZmSzXhx;
    			}
    		}
    	}
		
		$scope.createSystemTag = function(systemTag, systemTagForm){
			$.layerLoading.show();
			SystemTagService.create(systemTag).then(function(response){
				$.layerLoading.hide();
				$.Pop.alerts($scope.nlsRoot.systemTagAddSuccess, "/tag/systemTags");
				//$state.go('systemTags');
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					if(response.data.errorCode && response.data.errorCode == '9001'){
						systemTagForm.name.$dirty = true;
						systemTagForm.name.$valid = false;
						systemTagForm.name.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						systemTagForm.code.$dirty = true;
						systemTagForm.code.$valid = false;
						systemTagForm.code.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "/tag/systemTags");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "/tag/systemTags");
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};
		
		$scope.editSystemTag = function(systemTag, systemTagForm){
			$.layerLoading.show();
			SystemTagService.update(systemTag).then(function(response){
				$.layerLoading.hide();
				$.Pop.alerts($scope.nlsRoot.systemTagEditSuccess, "history_back");
				//$scope.goBackHistory();
			},function(response) {
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					if(response.data.errorCode && response.data.errorCode == '9001'){
						systemTagForm.name.$dirty = true;
						systemTagForm.name.$valid = false;
						systemTagForm.name.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '9002'){
						systemTagForm.code.$dirty = true;
						systemTagForm.code.$valid = false;
						systemTagForm.code.errorText = response.data.msg;
					}else if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "/tag/systemTags");
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};
		$scope.buildSystemTagDesc = function(){
			var scriptName = $("[name=scriptInfoId]").find("option:selected").text();
			var touchPointTypeName = $("[name=touchPointType]").find("option:selected").text();
			var systemTagDesc = '使用<b style="color:#5f93e1;">';
			systemTagDesc += scriptName + '</b>为计算脚本生成的<b style="color:#5f93e1;">';
			systemTagDesc += touchPointTypeName + '</b>。';
			return systemTagDesc;
		}
		
		$scope.saveSystemTag = function(systemTag, systemTagForm){
			if(!systemTag.name){
				systemTagForm.name.$dirty = true;
				systemTagForm.name.errorText = $scope.nlsRoot.inputSystemTagName;
				return false;
			}
			if(!systemTag.touchPointType){
				systemTagForm.touchPointType.$dirty = true;
				return false;
			}
			if(!systemTag.scriptInfoId){
				systemTagForm.scriptInfoId.$dirty = true;
				return false;
			}
			if(!systemTag.scriptParam){
				systemTagForm.scriptParam.$dirty = true;
				return false;
			}
			if(systemTag.description && systemTag.description.length > 512){
				systemTagForm.description.$error.maxlength = true;
				return false;
			}
			var systemTagDesc = $scope.buildSystemTagDesc();
			systemTag.description = systemTagDesc;
			systemTag.id === undefined ? $scope.createSystemTag (systemTag, systemTagForm) : $scope.editSystemTag (systemTag, systemTagForm);
		};
		
		$scope.queryScriptInfoList = function(){
			var params = {         
		        rows: 10000
			};
			SystemTagService.queryAllScriptInfoList(params).then(function(scripts){
				$scope.scriptInfoList = scripts;
			});
		}
		
		// 系统标签重新计算
		$scope.restartSystemTag = function(systemTag){
			if(systemTag.calcStatus == 1 || systemTag.calcStatus == -4){
				$.Pop.alerts($scope.nlsRoot.countingAgainLater);
				return false;
			}
			$.layerLoading.show();
			SystemTagService.reCalCulatesystemTag(systemTag.id).then(function(response){
				$.layerLoading.hide();
				$.Pop.alerts($scope.nlsRoot.systemTagCalcuSuccess, "history_back");
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
		
		$scope.goBackHistory = function() {
			window.history.back();
		}
		
		$scope.init = function(){
			$scope.scriptInfoList = [];
			$scope.systemTag = {};
			$scope.isEdit = false;
			
			if($stateParams.systemTagId){
    			$scope.isEdit = true;
    			$scope.viewEditSystemTag();
    		}
			
			$scope.queryScriptInfoList();
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_OBJECT_STATUS,DMP_BASE_CALC_RECORD_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.individualUserList = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
		  
    }];
});
