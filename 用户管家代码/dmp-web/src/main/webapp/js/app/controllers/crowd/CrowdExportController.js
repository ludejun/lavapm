define(['angularAMD', 'app/controllers/tag/TagBuilder','css!../../../../css/app/crowd/crowd', 'app/services/tag/TagService','app/services/admin/DicService', 'app/services/crowd/CrowdService','app/filters/common/CommonFilter'], function (angularAMD,TagBuilder) {
    'use strict';

    return ['$scope', '$stateParams','TagService','DicService', 'CrowdService', '$state', function ($scope, $stateParams,TagService,DicService, CrowdService, $state) {
    	$scope.viewEditCrowd = function(){
    		if($stateParams.crowdId){
    			$.layerLoading.show();
	    		CrowdService.getById($stateParams.crowdId).then(function(crowd){
	    			$.layerLoading.hide();
	    			var obj = $scope.getObjectByDicItemKey(crowd.touchPointType,$scope.touchPointTypes);
	    			crowd.touchPointTypeName = obj.dicItemValue;
	    			$scope.crowd = crowd; 
	    			$scope.queryTagMetaData();
	    		}, function(response) {
					$.layerLoading.hide();
					if (response.data != null && !response.data.success) {
						
					}
				});
    		}
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
		
		$scope.viewEditLookalikeCrowd = function(){
			$.layerLoading.show();
    		LookalikeCrowdService.getById($stateParams.lookalikeCrowdId).then(function(lookalikeCrowd){
    			$.layerLoading.hide();
    			$scope.crowd = lookalikeCrowd;
    			$scope.queryTagMetaData();
    		}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
		};
		
		$scope.queryTagMetaData = function() {
			$.layerLoading.show();
			
			TagService.getTagMetadata('export_visible').then(function(tagMetadata) {
				$scope.isLoadedMetaData = true;
				$.layerLoading.hide();
				TagBuilder.init(tagMetadata);
				$scope.attributesTables = TagBuilder.getAttributeTables($scope.crowd.touchPointType);
				//$scope.insertAttributesToTables();
				$scope.attributesTables = $scope._buildAttributeTableAttributes($scope.attributesTables,$scope.crowd.touchPointType,"export_visible","export_visible");
				$scope._buildAttributeTableToShow();
				//console.dir([$scope.attributesTables]);
				
				$scope.hasAttributes = $scope.checkHasAttributes();
			}, function(response) {
				
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
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
		
		$scope._buildAttributeTableToShow = function(){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				if($scope.attributesTables[i].objectType != 'MetaAccount'){
					if($scope.attributesTables[i].attributes && $scope.attributesTables[i].attributes.length > 0){
						$scope.attributesTables[i].isShow = true;
						break;
					}
				}
			}
		}
		
		/*$scope.insertAttributesToTables = function(){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				$scope.attributesTables[i].attributes = TagBuilder.getAttributes($scope.attributesTables[i].objectType,$scope.attributesTables[i].id,'exportUsed');
				if($scope.attributesTables[i].objectType != 'MetaAccount'){
					if($scope.attributesTables[i].attributes && $scope.attributesTables[i].attributes.length > 0){
						$scope.attributesTables[i].isShow = true;
						break;
					}
				}
			}
		}*/
		
		$scope.selectRemoveAttributesToTable = function(attrTable,attr){
			$scope.errorObject = {
				isError:false,
				msg:''
			};
			if(attr.isSelected){
				$scope.selectAttributesToTable(attrTable,attr);
			}else{
				if(attr.isSelected == undefined){
					$scope.selectAttributesToTable(attrTable,attr);
				}else{
					$scope.removeAttributeFromTable(attrTable,attr);
				}
			}
		}
		
		$scope.removeAttributeFromTable = function(attrTable,attr){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				if(attrTable.id == $scope.attributesTables[i].id){
					if($scope.attributesTables[i].selectedAttributes && $scope.attributesTables[i].selectedAttributes.length > 0){
						for(var j = 0; j < $scope.attributesTables[i].selectedAttributes.length;j++){
							if($scope.attributesTables[i].selectedAttributes[j].id == attr.id){
								$scope.attributesTables[i].selectedAttributes.splice(j,1);
								break;
							}
						}
					}
				}
			}
			$scope._changeAttributeNoSelected(attrTable,attr);
			
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		}
		
		
		$scope._changeAttributeNoSelected = function(attrTable,attr){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				if(attrTable.id == $scope.attributesTables[i].id){
					if($scope.attributesTables[i].attributes && $scope.attributesTables[i].attributes.length > 0){
						for(var j = 0; j < $scope.attributesTables[i].attributes.length;j++){
							if($scope.attributesTables[i].attributes[j].id == attr.id){
								$scope.attributesTables[i].attributes[j].isSelected = false;
								break;
							}
						}
					}
				}
			}
		}
		
		$scope.selectAttributesToTable = function(attrTable,attr){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				if(attrTable.id == $scope.attributesTables[i].id){
					if(!$scope.attributesTables[i].selectedAttributes){
						$scope.attributesTables[i].selectedAttributes = [];
					}
					var hasRepeat = $scope._checkAttributeHasRepeat(attr,$scope.attributesTables[i].selectedAttributes);
					if(!hasRepeat){
						$scope.attributesTables[i].selectedAttributes.push(attr);
					}
					
				}
			}
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		}
		
		$scope._checkAttributeHasRepeat = function(attr,selectedAttributes){
			var hasRepeat = false;
			for(var i = 0; i < selectedAttributes.length;i++){
				if(selectedAttributes[i].id == attr.id){
					hasRepeat = true;
					break;
				}
			}
			return hasRepeat;
		}
		
		$scope._buildSelectedAttributes = function(){
			var datas = [];
			for(var i = 0;i < $scope.attributesTables.length;i++){
				var item = {
					objectIdType : $scope.crowd.touchPointType,
					objectType : $scope.attributesTables[i].objectType,
					objectCode : $scope.attributesTables[i].id,
					attributes : ""
				};
				//if($scope.attributesTables[i].objectType == "MetaAccount" || ($scope.attributesTables[i].objectType != "MetaAccount" && $scope.attributesTables[i].isShow)){
					if($scope.attributesTables[i].selectedAttributes){
						var attributes = "";
						var selectedAttributes = $scope.attributesTables[i].selectedAttributes;
						var len = selectedAttributes.length;
						for(var j = 0;j < len;j++){
							if(j == len - 1){
								attributes += selectedAttributes[j].id;
							}else{
								attributes += selectedAttributes[j].id + ',';
							}
						}
						if(attributes){
							item.attributes = attributes;
							datas.push(item);
						}
					}
				//}
				
			}
			return datas;
		}
		
		$scope._checkDatasIsValid = function(datas){
			var isValid = true;
			for(var i = 0;i < datas.length;i++){
				if(datas[i].attributes){
					isValid = false;
					break;
				}
			}
			return isValid;
		}
		
		$scope.checkHasAttributes = function(){
			var has = false;
			for(var i = 0;i < $scope.attributesTables.length;i++){
				var table = $scope.attributesTables[i];
				if(table.objectType != 'MetaAccount' && table.attributes && table.attributes.length > 0){
					has = true;
					break;
				}
			}
			return has;
		}
		
		$scope.selectExportWay = function(){
			$scope.errorExportWay = {
				isError:false,
				msg:''
			};
		}
		
		$scope.exportCrowd = function(){
			$scope.errorObject = {
				isError:false,
				msg:''
			};
			//if(!$scope.checkHasAttributes()){
			if($scope.attributesTables.length == 0){
				$scope.errorObject = {
					isError:true,
					msg:'没有可勾选的属性项，请修改元数据配置'
				};
				return false;
			}
			
			var datas = $scope._buildSelectedAttributes();
			var isValid = $scope._checkDatasIsValid(datas);
			if(!isValid){
				if(!$scope.exportWay){
					$scope.errorExportWay = {
						isError:true,
						msg:'请选择导出方式'
					};
					return false;
				}
				$.layerLoading.show();
				CrowdService.exportCrowd($scope.crowd.id,$scope.exportWay,datas).then(function(response){
					$.layerLoading.hide();
					var html = '导出任务创建成功，请稍后到<a href="javascript:;" onclick="$.changeLocationHash(this);" hash="/discovery/scriptCalcRecords">探索-数据下载</a>页面下载您需要的附件。';
					$.Pop.alerts(html);
				},function(response) {
					$.layerLoading.hide();
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			}else{
				$scope.errorObject = {
					isError:true,
					msg:'请勾选需要导出的属性项'
				};
			}
		}
		
		$scope.showStaticAttributesTables = function(attrTable){
			for(var i = 0;i < $scope.attributesTables.length;i++){
				if(attrTable.id == $scope.attributesTables[i].id){
					$scope.attributesTables[i].isShow = true;
				}else{
					$scope.attributesTables[i].isShow = false;
				}
			}
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		}
		
		$scope.goBackHistory = function() {
			window.history.back();
		}
		
		$scope.init = function(){
			//FIXME:暂时默认 1
			$scope.exportWay = "1";
			$scope.channel = '';
			$scope.attributesTables = [];
			if($stateParams.crowdId){
				$scope.channel = 'crowd';
				$scope.viewEditCrowd();
			}
			
			/*if($stateParams.lookalikeCrowdId){
				$scope.channel = 'lookalikeCrowd';
				$scope.viewEditLookalikeCrowd();
			}*/
		}
		
		$scope.initDicByName = function(){
			$scope.sourcePage = $stateParams.sourcePage || '';
			var params = {         
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
			DicService.getDicByName(params).then(function(dicMap){
				$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
