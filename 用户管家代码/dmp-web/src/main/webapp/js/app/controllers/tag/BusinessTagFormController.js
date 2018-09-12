define([ 'angularAMD', 'app/controllers/tag/TagBuilder', 'app/controllers/tag/BusinessTagDefinitionController','css!/enterprise/css/libs/zTreeStyle/zTreeStyle','css!/enterprise/css/app/searchTagator/searchTagator','css!../../../../css/app/tag/tag','jquery.ztree.core-3.5','jquery.ztree.excheck-3.5','jquery.ztree.exedit-3.5', 'app/services/tag/TagService', 'app/services/tag/TagCategoryService', 'app/services/admin/DicService', 'app/services/common/CommonService', 'app/controllers/common/searchTagator', 'app/controllers/common/jquerySearchSelect', 'app/filters/common/CommonFilter' ], function(angularAMD, TagBuilder, BusinessTagDefinitionController) {
	'use strict';

	return [ '$scope', '$rootScope', '$stateParams', 'TagService', 'TagCategoryService', 'DicService', 'CommonService', '$state', function($scope, $rootScope, $stateParams, TagService, TagCategoryService, DicService, CommonService, $state) {
		$scope.tag;
		$scope.tagId = $stateParams.tagId;
		$scope.isViewRule = false;
		$scope.isTesterUser = false;
		$scope.isEditTag = false;
		$scope.businessTagDefinitionController = null;

		$scope.viewEditTag = function() {
			if ($scope.tagId) {
				$scope.isViewRule = true;
				$scope.isEditTag = true;
				$.layerLoading.show();
				TagService.getById($scope.tagId).then(function(tag) {
					$.layerLoading.hide();
					$scope.isViewRule = $scope.checkLoginUserIsViewRule(tag.createBy);
					if (tag.tagCategoryList && tag.tagCategoryList.length > 0) {
						$scope.tagCategoryList = tag.tagCategoryList;
						var ids = "", names = "";
						for (var i = 0; i < tag.tagCategoryList.length; i++) {
							if (i == tag.tagCategoryList.length - 1) {
								ids += tag.tagCategoryList[i].id;
								names += tag.tagCategoryList[i].name;
							} else {
								ids += tag.tagCategoryList[i].id + ',';
								names += tag.tagCategoryList[i].name + '，';
							}
						}
						//$("#tagCategoryNames").val(names);
						$scope.tagCategoryObj = {
							ids : ids,
							names : names
						}
					}
					$scope.tag = tag;
					//$scope.tag.definition = {"filter":{"and":[{"condition":"condition1"},{"condition":"condition2"},{"condition":"condition3"},{"or":[{"condition":"condition4"},{"condition":"condition5"}]},{"and":[{"condition":"condition6"},{"condition":"condition7"}]},{"condition":"condition8"}]},"condition":{"condition1":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"app_version":{"ne":["2.0.1","3.0.1","1.1.0"]}}}]}}},"condition2":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"partner_name":{"ne":["应用宝","豌豆荚"]}}}]}}},"condition3":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"province_name":{"ne":["北京","默认","福建"]}}}]}}},"condition4":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"city_name":{"eq":["深圳市","福州市"]}}}]}}},"condition5":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"os_version":{"ne":["Android 4.5.2","Android 4.5.1"]}}}]}}},"condition6":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_session","objectType":"MetaBehavior"},"query":{"bool":{"must":[{"term":{"country_name":{"eq":"432"}}},{"range":{"start_time":{"gte":"2016-03-29","lte":"2016-03-29"}}}]}}},"condition7":{"indice":{"objectIdType":"web_tdid","objectCode":"web_init_profile","objectType":"MetaStaticAttributeCollection"},"query":{"bool":{"must":[{"term":{"system":{"gte":"43243"}}}]}}},"condition8":{"indice":{"objectIdType":"web_tdid","objectCode":"web_tdid_account","objectType":"MetaAccount"},"query":{"bool":{"must":[{"term":{"pixel":{"ne":["1920*1080","1024*768"]}}}]}}}}};
					$scope.initDefinitionHtml();
					$rootScope.tagName = tag.name;
					$scope.tagName = tag.name;
				}, function(response) {
					$.layerLoading.hide();
					if (response.data && !response.data.success) {
						
					}
				});
			}
		};
		$scope.checkIsTesterUser = function(){
			var isTesterUer = false;
			var loginName = "";
			if(window.parent && window.parent.appConfig && window.parent.appConfig.user['loginName']){
				loginName = window.parent.appConfig.user['loginName'];
			}else{
				loginName = appConfig.user['loginName'];
			}
			if(loginName == 'test@163.com'){
				isTesterUer = true;
			}
			return isTesterUer;
		}
		
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

		$scope.createTag = function(tag,formHorizontal) {
			TagService.create(tag).then(function(tag) {
				$.Pop.alerts($scope.nlsRoot.addTagSuccess, "/tag/businessTags");
				$.layerLoading.hide();
				// $state.go('tags');
				// $state.reload();
			}, function(response) {
				$.layerLoading.hide();
				if (response.data && !response.data.success) {
					if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "/tag/businessTags");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "/tag/businessTags");
					}else if(response.data.errorCode && response.data.errorCode == '9001'){
						formHorizontal.tagName.$dirty = true;
						formHorizontal.tagName.$valid = false;
						formHorizontal.tagName.errorText = response.data.msg;
						$scope.goTop();
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});

		};

		$scope.editTag = function(tag,formHorizontal,isNeedCalculate) {
			TagService.update(tag).then(function(tag) {
				$.layerLoading.hide();
				if(isNeedCalculate){
					$scope.recalculateTag(tag,formHorizontal);
				}else{
					$.Pop.alerts($scope.nlsRoot.editTagSuccess, "history_back");
				}
				// $state.go('tags');
			}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					if(response.data.errorCode && response.data.errorCode == '8001'){
						$.Pop.alerts(response.data.msg, "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '8002'){
						$.Pop.alerts(response.data.msg, "history_back");
					}else if(response.data.errorCode && response.data.errorCode == '9001'){
						formHorizontal.tagName.$dirty = true;
						formHorizontal.tagName.$valid = false;
						formHorizontal.tagName.errorText = response.data.msg;
						$scope.goTop();
					}else{
						$.Pop.alerts(response.data.msg);
					}
				}
			});
		};

		$scope.saveTag = function(tag,formHorizontal,isNeedCalculate) {
			tag = tag || {};
			tag.type = 'TC';
			if(!tag.name){
				formHorizontal.tagName.$dirty = true;
				formHorizontal.tagName.errorText = $scope.nlsRoot.inputTagName;
				$scope.goTop();
				return false;
			}
			if(tag.name && tag.name.length > 256){
				formHorizontal.tagName.$error.maxlength = true;
				$scope.goTop();
				return false;
			}
			
			if(!tag.touchPointType){
				$scope.goTop();
				return false;
			}
			
			var respone = this.businessTagDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				var definition = respone.db.definition;
				if($.isNullObj(definition.filter) || $.isNullObj(definition.condition)){
					$.Pop.alerts($scope.nlsRoot.createBusinessTag);
					return false;
				}
				tag.tagCategoryIds = $scope.tagCategoryObj.ids;
				tag.definition = definition;
				$.layerLoading.show();
				tag.id === undefined ? $scope.createTag(tag,formHorizontal) : $scope.editTag(tag,formHorizontal,isNeedCalculate);
			}else{
				$.Pop.alerts(respone.msg);
			}
		};
		
		$scope.goTop = function(){
			$("#content").parent().scrollTop(0);
		}

		$scope.queryTagSource = function() {
			CommonService.getDict('TAG_SOURCE').then(function(sourceList) {
				$scope.sourceList = sourceList;
			});
		};

		$scope.searchAllTagList = function() {
			var params = {
				rows : 10000
			};

			TagService.queryAllTagList(params).then(function(tags) {
				TagDefinition.model.tagList = tags;
			});
		};

		$scope.beforeClick = function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		}
		
		$scope.removeTagCategory = function(cate){
			if(cate && $scope.tagCategoryList && $scope.tagCategoryList.length > 0){
				for(var i = 0;i < $scope.tagCategoryList.length;i++){
					if(cate.id == $scope.tagCategoryList[i].id){
						$scope.tagCategoryList.splice(i, 1);
						break;
					}
				}
			}
			
			$scope.tagCategoryObj = {
				ids : "",
				names : ""
			}
		}
		
		$scope.onCheck = function(e, treeId, treeNode) {
			$scope.tagCategoryList = [];
			$scope.tagCategoryList.push(treeNode);
			$scope.$apply();
			$scope.tagCategoryObj = {
				ids : treeNode.id,
				names : treeNode.name
			}
			
			$("#menuContent").fadeOut("fast");
		}

		$scope.showTagCategoryMenu = function() {
			var cityObj = $("#tagCategoryNames");
			var cityOffset = $("#tagCategoryNames").offset();
			var outerWidth = cityObj.outerWidth();
			$("#menuContent").css({
				width:outerWidth+'px',
				left : cityOffset.left + "px",
				top : cityOffset.top + cityObj.outerHeight() + "px"
			}).slideDown("fast");

			$("body").bind("mousedown", $scope.onBodyDown);

			var treeObj = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
			if (treeObj) {
				var nodes = treeObj.getNodes();
				$scope.selectTagCategory(nodes);

				if (window.parent && window.parent.iFrameScrollHeight) {
					window.setTimeout(window.parent.iFrameScrollHeight, 200);
				}
			}
		}

		$scope.selectTagCategory = function(nodes) {// 自动选中节点
			if($scope.tagCategoryObj.ids){
				$scope.tagCategoryObj.ids = $scope.tagCategoryObj.ids.toString();
			}
			var idsArr = $scope.tagCategoryObj.ids.split(',');
			var treeObj = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
			for (var i = 0; i < nodes.length; i++) {
				for (var j = 0; j < idsArr.length; j++) {
					if (nodes[i].id == idsArr[j]) {
						treeObj.checkNode(nodes[i], true, true);
					}
				}
				if (nodes[i].children && nodes[i].children.length > 0) {
					$scope.selectTagCategory(nodes[i].children);
				}
			}
		}
		
		$("#content").parent().scroll(function () {
			$scope.hideMenu();
		});

		$scope.hideMenu = function() {
			$("#menuContent").fadeOut("fast");
			$("body").unbind("mousedown", $scope.onBodyDown);

			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
		}
		$scope.onBodyDown = function(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "tagCategoryNames" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
				$scope.hideMenu();
			}
		}

		$scope.queryTagCategory = function() {
			$scope.tagCategoryTree = [];
			$scope.tagCategoryObj = {
				ids : "",
				names : ""
			}
			var setting = {
				check: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				view : {
					dblClickExpand : false,
					showLine: false
				},
				data : {
					simpleData : {
						enable : true
					}
				},
				callback : {
					beforeClick : $scope.beforeClick,
					onCheck : $scope.onCheck
				}
			};
			
			var params = {
    			random:CommonService.getRandomNum(1,100000000)
    		};

			TagCategoryService.queryTagCategory(params).then(function(tagCategoryTree) {
				if (tagCategoryTree && tagCategoryTree.length > 0) {
					//$scope.tagCategoryTree = tagCategoryTree[0].children;
					$scope.rebuildTagCategory(tagCategoryTree[0].children);
					
					$scope.resetTagCategory($scope.tagCategoryTree);
					$.fn.zTree.init($("#tagCategoryMenuTree"), setting, $scope.tagCategoryTree);
				}
			});
		}
		
		$scope.rebuildTagCategory = function(obj){
			if(obj && obj.length > 0){
				for (var i = 0; i < obj.length; i++) {
					if(obj[i].code != "systemtag" && obj[i].code != 'presettag'){
						$scope.tagCategoryTree.push(obj[i]);
					}
				}
			}
		}
		
		$scope.resetTagCategory = function(obj) {
			if(obj && obj.length > 0){
				for (var i = 0; i < obj.length; i++) {
					if (obj[i].children && obj[i].children.length > 0) {
						obj[i].open = true;
						// obj[i].nocheck = true;
						$scope.resetTagCategory(obj[i].children);
					}
				}
			}
		}

		$scope.changeTouchPointType = function(tag) {
			this.businessTagDefinitionController.model.deviceType = tag.touchPointType;
			$scope.initTagListForDefinition(true);
			//$scope.initDefinitionHtml(true);
		}

		$scope.goBackHistory = function() {
			window.history.back();
		}

		$scope.initDicByName = function() {
			$scope.businessTagDefinitionController = new BusinessTagDefinitionController();
			$scope.queryTagCategory();
			var params = {         
			        //dicName : 'UNIT_DATE_DATETIME',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
			DicService.getDicByName(params).then(function(dicMap) {

			});
		}

		$scope.queryTagMetaData = function() {
			$.layerLoading.show();
			TagService.getTagMetadata('tag_visible').then(function(tagMetadata) {
				$.layerLoading.hide();
				TagBuilder.init(tagMetadata);
				$scope.initTouchPointTypes();
				//console.dir([ "tagMetadata", tagMetadata ]);
				/*if ($scope.tagId) {
					$scope.initTag();
				}else{
					$scope.initTagListForDefinition();
				}*/
				$scope.initTagListForDefinition();
			}, function(response) {
				$.layerLoading.hide();
				if (response.data != null && !response.data.success) {
					
				}
			});
		}
		
		$scope.initTagListForDefinition = function(isReset){
			
			var that = this;
			var random = CommonService.getRandomNum(1,100000000);
			var data = {
				page:1,
				q:'',
				random:random,
				rows:20,
				tagIds:'',
				type:'TB',
				touchPointType:$scope.tag.touchPointType,
				status:2,
				gtCrowdCount:0
			};
			
			var param = {
				url : '/dmp-web/tag/tags/fastQuery',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : data
				
			};
			
			$.layerLoading.show();
			$.callApi(param, function(response) {
				$.layerLoading.hide();
				if(response && response.rows){
					that.businessTagDefinitionController.model.tagMap = response;
	        		$scope.initTag(isReset);
				}
				
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				$.layerLoading.hide();
			});
			
		}

		$scope.initTouchPointTypes = function() {
			$scope.individualUserList = TagBuilder.getAccountIdTypes();
			/*console.dir([$scope.individualUserList]);*/
			if (!$scope.tag) {
				$scope.tag = {};
				$scope.initTagTouchPointType();
			} else {
				if (!$scope.tag.touchPointType) {
					$scope.initTagTouchPointType();
				}
			}
		}
		
		$scope.initTagTouchPointType = function(){
			if($scope.individualUserList && $scope.individualUserList.length > 0){
				var hasAccountId = false;
				
				for(var i = 0;i < $scope.individualUserList.length;i++){
					if($scope.individualUserList[i].majorAccount){
						hasAccountId = true;
						$scope.tag.touchPointType = $scope.individualUserList[i].id;
						break;
					}
				}
				
				if(!hasAccountId){
					$scope.tag.touchPointType = $scope.individualUserList[0].id;
				}
			}
		}

		$scope.initTag = function(isReset) {
			$scope.isBackHistory = true;
			if ($scope.tagId && !isReset) {
				$scope.viewEditTag();
			} else {
				var backUrl = $.urlPara("backUrl=");
				if (backUrl && backUrl == 'default') {
					$scope.isBackHistory = false;
				}
				$scope.initDefinitionHtml(true);
			}
			$scope.isTesterUser = $scope.checkIsTesterUser();
		}

		$scope.initDefinitionHtml = function(isReset) {
			var that = this;
			this.businessTagDefinitionController.model.deviceType = $scope.tag.touchPointType;
			var $tag_relations_panel = $("#tag-relations-panel");
			//var $relations_panel = $("#relations-panel");
			var tableTypes = TagBuilder.getTableTypeSelector($scope.tag.touchPointType);
			if (isReset) {
				var html = this.businessTagDefinitionController.initHtml();
				$tag_relations_panel.html(html);
			} else {
				if ($scope.tagId) {// 编辑
					this.businessTagDefinitionController.model.tagId = $scope.tagId;
					this.businessTagDefinitionController.getTagListByDefinition($scope.tag.definition);
					//this.businessTagDefinitionController.buildTagHtmlByTagDefinitionData($scope.tag.definition,tableTypes);
				}
			}
		}
		
		$scope.validInputValue = function(type,val,elem,label,isCode){
    		var textType = "";
    		if(type == 'input'){
    			textType = $scope.nlsRoot.pleaseInput;
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
		
		$scope.checkDefinitionIsEqual = function(tag,formHorizontal){
			var isEqual = false;
			var respone = this.businessTagDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				$scope.tagJsonDefinitionNew = respone.db.definition;
				$scope.tagJsonDefinitionOld = this.businessTagDefinitionController.model.definition;
				if(_.isEqual($scope.tagJsonDefinitionNew,$scope.tagJsonDefinitionOld)){
					isEqual = true;
					$scope.recalculateTag(tag,formHorizontal);
				}else{
					$.Pop.confirms($scope.nlsRoot.tagRecalculateConfirms,function(){
						$scope.saveTag(tag,formHorizontal,true);
					});
					
					var $confirms = $("#confirms");
					var $cancel = $("#cancel");
					if(window.parent && window.parent){
						$confirms = $('#confirms', parent.document);
						$cancel = $('#cancel', parent.document);
					}
					
					$confirms.html($scope.nlsRoot.save);
					$cancel.html($scope.nlsRoot.noSave);
					$cancel.bind('click',function(){
						$scope.recalculateTag(tag,formHorizontal);
					});
				}
			}
			return isEqual;
		}
		
		$scope.recalculateTag = function(tag,formHorizontal){
			tag = tag || {};
			if(!tag.name){
				formHorizontal.tagName.$dirty = true;
				formHorizontal.tagName.errorText = $scope.nlsRoot.inputTagName;
				return false;
			}
			if(tag.name && tag.name.length > 256){
				formHorizontal.tagName.$error.maxlength = true;
				return false;
			}
			
			var respone = this.businessTagDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				var definition = respone.db.definition;
				if($.isNullObj(definition.filter) || $.isNullObj(definition.condition)){
					$.Pop.alerts($scope.nlsRoot.createCrowdAttrOrHavior);
					return false;
				}
				tag.tagCategoryIds = $scope.tagCategoryObj.ids;
				tag.definition = definition;
				
				$scope.isCalculating = true;
				$.layerLoading.show();
				TagService.recalculateTag(tag).then(function(response) {
					$.layerLoading.hide();
					$scope.isCalculating = false;
					$.Pop.alerts($scope.nlsRoot.tagRecalculateSuccess, "history_back");
				}, function(response) {
					$.layerLoading.hide();
					$scope.isCalculating = false;
					if (response.data != null && !response.data.success) {
						if(response.data.errorCode && response.data.errorCode == '8001'){
							$.Pop.alerts(response.data.msg, "history_back");
						}else if(response.data.errorCode && response.data.errorCode == '8002'){
							$.Pop.alerts(response.data.msg, "history_back");
						}else if(response.data.errorCode && response.data.errorCode == '9001'){
							formHorizontal.tagName.$dirty = true;
							formHorizontal.tagName.$valid = false;
							formHorizontal.tagName.errorText = response.data.msg;
						}else{
							$.Pop.alerts(response.data.msg);
						}
					}
				});
			}else{
				$.Pop.alerts(respone.msg);
			}
		}

		$scope.builderTagJson = function() {
			$scope.tagRule = "";
			var respone = this.businessTagDefinitionController.buildDefinition();
			if(respone.success && respone.db && respone.db.definition){
				//var jsonStr = respone.db.toString();
				//console.dir([ "def", jsonStr ]);
				$scope.tagJson = respone.db;
				
				var definition = respone.db.definition;
				if($.isNullObj(definition.filter) || $.isNullObj(definition.condition)){
					$.Pop.alerts($scope.nlsRoot.createCrowdAttrOrHavior);
					return false;
				}
				TagService.testJson(definition).then(function(response) {
					$scope.tagRule = response;
				}, function(response) {
					if (response && response.data && !response.success) {
						$.Pop.alerts(response.data.msg);
					}
				});
			}else{
				$scope.tagJson = "";
				$.Pop.alerts(respone.msg);
			}
			
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			} 
			 
		}

		$scope.initDicByName();
		$scope.queryTagMetaData();

	} ];
});
