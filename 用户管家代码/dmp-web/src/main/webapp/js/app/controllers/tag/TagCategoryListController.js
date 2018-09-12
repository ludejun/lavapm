define(['angularAMD','app/controllers/common/EchartsOptions','css!/enterprise/css/libs/zTreeStyle/zTreeStyle','css!../../../../css/app/tag/tagCategory','jquery.ztree.core-3.5','jquery.ztree.excheck-3.5','jquery.ztree.exedit-3.5','app/services/common/CommonService', 'app/services/admin/DicService', 'app/services/tag/TagCategoryService', 'app/services/tag/TagService','echarts','app/directives/TdEcharts','app/filters/common/CommonFilter'], function (angularAMD,EchartsOptions) {
    'use strict';
    return ['$scope','CommonService','DicService','TagCategoryService','TagService','$state','$stateParams','NgTableParams', '$location', function ($scope,CommonService,DicService,TagCategoryService,TagService,$state,$stateParams,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.checkTenantAdmin();
    		$scope.tagCategoryId = $location.search()['filter[tagCategoryId]'] || "";
    		$scope.currentCategory = {
    			name : $scope.nlsRoot.tagClassification,
    			nodeId : $scope.tagCategoryId
    		};
    		$scope.isShowAddTag = false;
    		
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.load = {
    			isLoading :false
    		};
    		$scope.tagCategory = {};
    		$scope.tagCategoryDetails = {};
    		$scope.tagCategoryTree = [];
    		$scope.tagCategortSearch = {
    			name : ''
    		};
    		
    		$scope.isShowOperator = false;
    		
    		$scope.selectedTagList = [];
    		$scope.firstTagList = [];
    		$scope.initQueryTagCategory();
    		
    		$scope.firstTagObj = {};
    		$scope.firstTagObj.keyword = "";
    		
    		
    	};
    	
    	$scope.checkTenantAdmin = function(){
    		var tenantAdmin = false;
    		if(window.parent && window.parent.appConfig && window.parent.appConfig.user && window.parent.appConfig.user['tenantAdmin']){
    			tenantAdmin = window.parent.appConfig.user['tenantAdmin'];
			}else{
				tenantAdmin = appConfig.user['tenantAdmin'];
			}
    		$scope.tenantAdmin = tenantAdmin;
    	}
    	
    	$scope.clearTagCategortSearch = function(){
    		$scope.tagCategortSearch.name = "";
    		$scope.findNodes();
    	}
    	
    	$scope.showHideEditTagCategory = function(){
    		$scope.isEditTagCategory = !$scope.isEditTagCategory;
    		if($scope.isEditTagCategory){
    			setTimeout(function(){
    				$("#rename-input").focus();
    			},200);
    		}
    		$scope.currentTagCategoryName = $scope.tagCategoryDetails.name;
    	}
    	
    	$scope.queryTagsWithTagCategory = function(){
    		$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                },
    			filter : {
    				//q : $scope.searchValue,
    				tagCategoryId : $scope.tagCategoryId
    			}
            },
            $location.search()), {
                counts: [10, 20, 50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	$location.search(params.url()); 
                	TagCategoryService.queryTagByCategory(params).then(function(tags){
                		$scope.rebuildObjects(tags);
                		tags = $scope.rebuildTags(tags);
        				params.total(tags.total);
                        $defer.resolve(tags.rows);
                        $scope.tagList = tags.rows;
                        $scope.checkIsShowOperator();
                        $scope.goTop();
        			});
                }
            });
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
    	
    	$scope.rebuildObjects = function(objects){
    		if(objects && objects.length > 0){
    			for(var i = 0;i < objects.length;i++){
    				var obj = $scope.getObjectByDicItemKey(objects[i].touchPointType,$scope.touchPointTypes);
    				objects[i].touchPointTypeName = obj.dicItemValue;
    			}
    		}
    	}
    	
    	$scope.rebuildTags = function(tags){
			var result = {
				"total": 0,
				"rows": []
			};
			if(tags && 
				tags && 
				tags.length > 0 &&
				$scope.tagCategoryTable.thead.length > 0
				){
				result.total = tags.total;
				var tagsRows = tags;
				var length = tagsRows.length;
				var tableHead = $scope.tagCategoryTable.thead;
				var tableHeadLength = tableHead.length;
				
				for(var i = 0;i <length;i++){
					var tagsRow = tagsRows[i];
					var rowItem = {};
					for(var j = 0;j < tableHeadLength;j++){
						rowItem[tableHead[j].id] = tagsRow[tableHead[j].id] || '';
					}
					
					var createBy = tagsRow["createBy"];
    				var isViewRule = $scope.checkLoginUserIsViewRule(createBy);
    				rowItem.isViewRule = isViewRule;
					rowItem.id = tagsRow["id"];
					rowItem.createBy = createBy;
					rowItem.touchPointTypeName = tagsRow["touchPointTypeName"];
					result.rows.push(rowItem);
				}
			}
			return result;
		}
    	
    	$scope.buildTagCategoryTable = function(){
    		$scope.tagCategoryTable = {
    			thead:[{
    				id:"name",
    				label:$scope.nlsRoot.tagName
    			},
    			{
    				id:"crowdIcon",
    				label:$scope.nlsRoot.touchPointTypes
    			},
    			{
    				id:"type",
    				label:$scope.nlsRoot.tagType
    			},
    			{
    				id:"status",
    				label:$scope.nlsRoot.status
    			},
    			{
    				id:"creator",
    				label:$scope.nlsRoot.creator
    			}],
    			tbody:[]
    		};
    	}
    	
    	$scope.queryCurTagCategoryInfo = function(){
    		$scope.isShowAddTag = false;
			$scope.currentTagCategoryName = '';
    		TagCategoryService.findTagCategoryInfo($scope.tagCategoryId,'1').then(function(tagCategory){
    			$scope.tagCategoryDetails = tagCategory;
    			$scope.currentTagCategoryName = tagCategory.name;
			});
    	}
    	
    	$scope.checkIsShowOperator = function(){
    		$scope.isShowOperator = true;
    		$scope.isShowTableOperator = true;
    		if($scope.tagCategoryDetails){
    			var isViewRule = $scope.checkLoginUserIsViewRule($scope.tagCategoryDetails.createBy);
    			if($scope.tagCategoryDetails.code == 'systemtag' || 
    				$scope.tagCategoryDetails.code == 'presettag' || 
    				$scope.tagCategoryDetails.parentId == -1){
    				$scope.isShowOperator = false;
    				$scope.isShowTableOperator = false;
    			}else{
    				$scope.isShowTableOperator = false;
    				if($scope.tagList && $scope.tagList.length > 0){
    					for(var i = 0;i<$scope.tagList.length;i++){
    						var createBy = $scope.tagList[i]["createBy"];
            				var isViewRule = $scope.checkLoginUserIsViewRule(createBy);
            				if(!isViewRule){
            					$scope.isShowTableOperator = true;
            					 break;
            				}
    					}
    				}
    			}
    		}
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
    	
    	$scope.initQueryTagCategory = function(){
    		$scope.buildTagCategoryTable();
    		$scope.queryTagCategory(true);
    	}
    	
    	$scope.queryTagCategory = function(init){   
    		$scope.tagCategoryObj = {
				ids : "",
				names : ""
			}
    		
    		$scope.hasNoTagCategory = false;
    		$scope.searchValue = $scope.searchValue || '';
    		$scope.load.isLoading = true;
//    		var params = {
//    			'name':$scope.tagCategortSearch.name
//    		};
    		var params = {
    			random:CommonService.getRandomNum(1,100000000)
    		};
    		
			TagCategoryService.queryTagCategory(params).then(function(tagCategoryTree){
				$scope.load.isLoading = false;
				if(tagCategoryTree && tagCategoryTree.length > 0){
					//console.dir(["tagCategoryTree:",tagCategoryTree,tagCategoryTree[0].children]);
					$scope.tagCategoryTree = tagCategoryTree;
					
					$scope.tagCategoryMenuTree = [];
					$scope.tagCategoryMenuChildren = [];
					if(tagCategoryTree){
						$scope.tagCategoryMenuTree = angular.copy(tagCategoryTree);
						$scope.tagCategoryMenuTree[0].children = [];
						if(tagCategoryTree[0].children){
							$scope.rebuildTagCategoryMenu(tagCategoryTree[0].children);
							$scope.tagCategoryMenuTree[0].children = $scope.tagCategoryMenuChildren;
						}
					}
					
					$scope.initCurTagCategoryId();
					
					zTreeOptions.zNodes = $scope.tagCategoryTree;
					$scope.drawZTree(true);
					$scope.drawTagCategoryMenuTree();
					
					$scope.queryCurTagCategoryInfo();
					if(init){
						$scope.queryTagsWithTagCategory();
					}else{
						$scope.search();
					}
					$scope.buildTagCategoryPie();
				}else{
					$scope.hasNoTagCategory = true;
					$scope.tagCategoryTree = [];
					$("#tagCategoryTree").html('<li>'+$scope.nlsRoot.noData+'</li>');
				}
			});
		};
		
		$scope.rebuildTagCategoryMenu = function(obj){
			if(obj && obj.length > 0){
				for (var i = 0; i < obj.length; i++) {
					if(obj[i].code != "systemtag" && obj[i].code != 'presettag'){
						$scope.tagCategoryMenuChildren.push(obj[i]);
					}
				}
			}
		}
		
		$scope.initCurTagCategoryId = function(){
			if(!$scope.tagCategoryId && $scope.tagCategoryTree && $scope.tagCategoryTree.length > 0){
				$scope.tagCategoryId = $scope.tagCategoryTree[0].id;
			}
		}
		
		
		/*$scope.changeLocationHash = function(tagCategory){
			var newHash = '#/tag/tagCategories?parentId='+tagCategory.parentId+'&tagCategoryId='+tagCategory.id;
			window.location.hash = newHash;
			$scope.queryTagCategory(tagCategory.parentId,tagCategory.id);
		}*/
    	
		$scope.createTagCategory = function(tagCategory,$hide){
			
			TagCategoryService.create(tagCategory).then(function(response){
				$.layerLoading.hide();
				//$scope.changeLocationHash(response);
				$scope.queryTagCategory();
				$hide();
			},function(response) {
				$scope.tagCategoryNameIsError = true;
				$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					//$.Pop.alerts(response.data.msg);
					$scope.tagCategoryNameErrorMsg = response.data.msg;
				}
			});
		};
		
		$scope.editTagCategory = function(tagCategory,$hide){
			$scope.search();
			//$scope.searchValue = "";
			//$location.search()['filter[q]'] = "";
			//$scope.tableParams.filter({q:'',tagCategoryId:$scope.tagCategoryId});
			if(!$scope.currentTagCategoryName){
				$.Pop.alerts($scope.nlsRoot.categoryNameIsEmpty);
				$scope.showHideEditTagCategory();
				$scope.currentTagCategoryName = tagCategory.name;
				return false;
			}
			//tagCategory.name = $scope.currentTagCategoryName;
			var tagCategory = {
				"id" : tagCategory.id,
				"name":  $scope.currentTagCategoryName,
				"parentId": tagCategory.parentId	
			};
			
			var urlAddress = '/dmp-web/tag/tagCategories/updateTagCategories';
			var callType = 'post';
			var dataType = 'json';
			
			$.ajax({
				url:urlAddress,
				type:callType,
				async:true,
				cache:true,
				dataType:dataType,
				data:tagCategory,
				timeout:60000,
				success:function(response){
					$.layerLoading.hide();
					$scope.queryTagCategory();
					$scope.showHideEditTagCategory();
					//$("#rename-input").removeClass("input-error");
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.layerLoading.hide();
					$scope.showHideEditTagCategory();
					$scope.currentTagCategoryName = tagCategory.name;
					//$("#rename-input").addClass("input-error");
					var obj = JSON.parse(XMLHttpRequest.responseText);
					if(obj && obj.msg){
						$.Pop.alerts(obj.msg);
					}else{
						$.Pop.alerts($scope.nlsRoot.netWorkUngelivable);
					}
				}
			});	
			
			/*callApi(tagCategory, urlAddress,callType,dataType, function(response){
				$.layerLoading.hide();
				//$scope.changeLocationHash(response);
				$scope.queryTagCategory();
				$scope.showHideEditTagCategory();
			});*/
		};
		
		$scope.saveTagCategory = function(tagCategory,$hide,formHorizontal){
			if(!$scope.tagCategoryObj.ids){
				$("#tagCategoryNames").addClass("input-error").siblings(".form-error-msg").removeClass("ng-hide");
				return false;
			}else{
				tagCategory.parentId = $scope.tagCategoryObj.ids;
				$("#tagCategoryNames").removeClass("input-error").siblings(".form-error-msg").addClass("ng-hide");
			}
			
			if(!tagCategory.name){
				formHorizontal.tagCategoryName.$dirty = true;
				return false;
			}
			
			$.layerLoading.show();
			tagCategory.id === undefined ? $scope.createTagCategory (tagCategory,$hide) : $scope.editTagCategory (tagCategory,$hide);
		}
		
		$scope.checkTagCategoryName = function(){
			$scope.tagCategoryNameIsRepeat = false;
		}
		
		
		$scope.showTagCategoryDialog = function(tagCate){
			$scope.tagCategoryNameIsError = false;
			$scope.tagCategoryNameErrorMsg = "";
			
			$scope.tagCategoryObj.ids = "";
			$scope.tagCategory = {};
			$scope.isAddTagCategory = true;
			
			window.setTimeout(function(){
				$scope.onCheckParent();
			},200);
			
			/*if(window.parent && window.parent.resetModelDialogStyle){
				window.setTimeout(window.parent.resetModelDialogStyle,200);
			}*/
		}
		
		$scope.onCheckParent = function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree"),
			selectNodes = zTree.getSelectedNodes(),
			nodes = zTree.getNodes();
			var parentNode = {
				id:"",
				name:''
			};
			if(selectNodes && selectNodes.length > 0){
				if(selectNodes[0].code != 'systemtag' && selectNodes[0].code != 'presettag'){
					parentNode = selectNodes[0];
				}
				
				/*if(selectNodes[0].parentId != -1){
					parentNode = selectNodes[0].getParentNode();
				}else{
					parentNode = nodes[0];
				}*/
				
			}/*else if(nodes && nodes.length > 0){
				//parentNode = nodes[0];
			}*/
			var tagCategoryNames = $("#tagCategoryNames");
			tagCategoryNames.val(parentNode.name).removeClass("input-error").siblings(".form-error-msg").addClass("ng-hide");
			
			$scope.tagCategoryObj = {
				ids : parentNode.id,
				names : parentNode.name
			}
		}
	
		
		$scope.removeTagCategory = function(tagCategory){    		
			$.Pop.confirms($scope.nlsRoot.confirmDelete+tagCategory.name+'"？',function(){
				if(tagCategory.children && tagCategory.children.length > 0){
					$.Pop.alerts($scope.nlsRoot.canNotDelete+tagCategory.name+$scope.nlsRoot.subCategory);
					return false;
				}
				
				var data = {
	    			random:CommonService.getRandomNum(1,100000000)
	    		};
					
				var param = {
					url : '/dmp-web/tag/tagCategories/delTagCategories/'+tagCategory.id,
					callType : 'get',
					contentType : 'application/json',
					dataType : 'json',
					data : data
				};
				
				$.callApi(param, function(response){
					if(response.success){
						$scope.currentCategory.name = $scope.nlsRoot.tagCategory;
						$scope.currentCategory.nodeId = tagCategory.parentId;
						$scope.queryTagCategory();
						$scope.tagCategoryId = tagCategory.parentId;
						//$scope.buildTagCategoryPie();
					}else{
						$.Pop.alerts(response.msg);
					}
				});
				
			});
		};		
		
		$scope.search= function(){ 
			var random = CommonService.getRandomNum(1,100000000);
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					'q' : "",
					'tagCategoryName':$scope.tagCategoryName,
					"tagCategoryId":$scope.tagCategoryId,
					"name" : $scope.moreSearchCondition.name,
					"code" : $scope.moreSearchCondition.code,
					"touchPointType" : $scope.moreSearchCondition.touchPointType,
					"description" : $scope.moreSearchCondition.description,
					"source" : $scope.moreSearchCondition.source,
					"type" : $scope.moreSearchCondition.type,
					"status" : $scope.moreSearchCondition.status,
					"calcStatus" : $scope.moreSearchCondition.calcStatus,
					"tagDataTimeStart" : $scope.moreSearchCondition.tagDataTimeStart,
					"tagDataTimeEnd" : $scope.moreSearchCondition.tagDataTimeEnd,
					"creator" : $scope.moreSearchCondition.creator,
					"createTimeStart" : $scope.moreSearchCondition.createTimeStart,
					"createTimeEnd" : $scope.moreSearchCondition.createTimeEnd,
					"random":random
				});
			}else{
				$scope.tableParams.filter({
					'q' : $scope.searchValue,
					"tagCategoryId":$scope.tagCategoryId,
					"random":random
				});
			}
			$location.search()['filter[random]'] = random;
		};
		
		$scope.reloadMoreSearchCondition = function(){
			$scope.reloadMoreSearch = {};
			$scope.reloadMoreSearch.name = $location.search()['filter[name]'] || '';
    		$scope.reloadMoreSearch.code = $location.search()['filter[code]'] || '';
    		$scope.reloadMoreSearch.touchPointType = $location.search()['filter[touchPointType]'] || '';
    		$scope.reloadMoreSearch.description = $location.search()['filter[description]'] || '';
    		$scope.reloadMoreSearch.source = $location.search()['filter[source]'] || '';
    		$scope.reloadMoreSearch.type = $location.search()['filter[type]'] || '';
    		$scope.reloadMoreSearch.status = $location.search()['filter[status]'] || '';
    		$scope.reloadMoreSearch.calcStatus = $location.search()['filter[calcStatus]'] || '';
    		$scope.reloadMoreSearch.tagDataTimeStart = $location.search()['filter[tagDataTimeStart]'] || '';
    		$scope.reloadMoreSearch.tagDataTimeEnd = $location.search()['filter[tagDataTimeEnd]'] || '';
    		$scope.reloadMoreSearch.creator = $location.search()['filter[creator]'] || '';
    		$scope.reloadMoreSearch.createTimeStart = $location.search()['filter[createTimeStart]'] || '';
    		$scope.reloadMoreSearch.createTimeEnd = $location.search()['filter[createTimeEnd]'] || '';
    		if($scope.reloadMoreSearch.name || 
    		   $scope.reloadMoreSearch.code || 
    		   $scope.reloadMoreSearch.touchPointType || 
    		   $scope.reloadMoreSearch.description || 
    		   $scope.reloadMoreSearch.source || 
    		   $scope.reloadMoreSearch.type || 
    		   $scope.reloadMoreSearch.status || 
    		   $scope.reloadMoreSearch.calcStatus || 
    		   $scope.reloadMoreSearch.tagDataTimeStart || 
    		   $scope.reloadMoreSearch.tagDataTimeEnd || 
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
    	    			type:$scope.reloadMoreSearch.type,
    	    			status:$scope.reloadMoreSearch.status,
    	    			calcStatus:$scope.reloadMoreSearch.calcStatus,
    	    			tagDataTimeStart:$scope.reloadMoreSearch.tagDataTimeStart,
    	    			tagDataTimeEnd:$scope.reloadMoreSearch.tagDataTimeEnd,
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
    			name : '',
    			code:"",
    			touchPointType :"",
    			description:"",
    			source:"",
    			type:"",
    			status:"",
    			calcStatus:"",
    			tagDataTimeStart:"",
    			tagDataTimeEnd:"",
    			creator:"",
    			createTimeStart:"",
    			createTimeEnd:""
    		};
		}
		
		$scope.checkIsNoTagCategory = function(){
			$scope.hasNoTagCategory = true;
			for(var i = 0; i < $scope.tagCategoryTree.length;i++){
				if($scope.tagCategoryTree[i].isShow){
					$scope.hasNoTagCategory = false;
					break;
				}
				for(var j = 0;j < $scope.tagCategoryTree[i].children.length;j++){
					if($scope.tagCategoryTree[i].children[j].isShow){
						$scope.hasNoTagCategory = false;
						break;
					}
				}
			}
		}
		
		$scope.buildTagCategoryPie = function(){
			$scope.tagCategoryPieData = {};
			TagCategoryService.buildTagCategoryPie($scope.tagCategoryId).then(function(data){
				if(data){
					$scope.checkPieIsEmpty(data.valueList);
					var formatData = $scope._formatTagCategoryData(data);
					$scope.tagCategoryPieData = data;
	    			$scope.echartTagCategoryPie = EchartsOptions.tagCategoryPie(formatData,true,false);
				}
    		});
    	}
		
		$scope.checkPieIsEmpty = function(valueList){
			$scope.isEmptyPie = true;
			if(valueList && valueList.length > 0){
				for(var i = 0;i < valueList.length;i++){
					if(valueList[i] > 0){
						$scope.isEmptyPie = false;
						break;
					}
				}
			}
		}

		$scope._formatTagCategoryData = function(data) {
			var data = data || {};
			var displayNameList = data.displayNameList;
			var valueList = data.valueList;

			var formatData = {
				displayNames : [],
				datas : []
			};
			var nameStr = formatData.tagCategoryNames;
			for (var i = 0; i < displayNameList.length; i++) {
				if(i < 8){
					formatData.displayNames.push(
						displayNameList[i]
					);
				}
				formatData.datas.push({
					name : displayNameList[i],
					value : valueList[i],
				});
			}
			return formatData;
		}
		
		$scope.addTag = function(){
			$scope.firstTagObj.keyword = "";
			$scope.selectedTagList = [];
			$scope.isShowAddTag = true;
			$scope.currentTagCategoryName = $scope.tagCategory.name;
			TagCategoryService.queryTagsWithoutTagCategory().then(function(tags){
				$scope.firstTagList = tags;
				$scope.rebuildTagsWithoutTagCategoryRules();
			});
		}
		
		$scope.rebuildTagsWithoutTagCategoryRules = function(){
			var tags = [];
			if($scope.firstTagList && $scope.firstTagList.length > 0){
				for(var i = 0;i < $scope.firstTagList.length;i++){
					var createBy = $scope.firstTagList[i]["createBy"];
					var isViewRule = $scope.checkLoginUserIsViewRule(createBy);
					if(!isViewRule){
						tags.push($scope.firstTagList[i]);
					}
				}
			}
			$scope.firstTagList = tags;
		}
		
		$scope.goBackHistory = function(){
			$scope.isShowAddTag = false;
			$scope.currentTagCategoryName = '';
			$scope.tableParams.reload();
		}
		
		$scope.selectTagItem = function(tag){
			$scope.firstTagObj.keyword = "";
			$scope.hideFirstTagDropdowMenu();
			
			if($scope.selectedTagList.length >= 20){
				$.Pop.alerts($scope.nlsRoot.selectUp20);
				return false;
			}
				
			var hasRepeat = $scope.checkHasRepeatSelectedTag(tag);
			if(hasRepeat){
				$.Pop.alerts($scope.nlsRoot.noRepeatAddTag);
				return false;
			}
			$scope.selectedTagList.push(tag);
			//$scope.firstTagObj.keyword = tag.name;
			
			setTimeout(function(){
				$(".tag-list").scrollTop($(".tag-list").height());
			},200);
		};
		
		$scope.filterFirstTagList = function(keyword){
			$scope.firstTagFilterList = [];
			if($scope.firstTagList.length == 0){
				$scope.isShowFirstTagDropdownMenu = false;
				return false;
			}
			$scope.isShowFirstTagDropdownMenu = true;
			
			if(keyword == ""){//显示所有
				$scope.firstTagFilterList = angular.copy($scope.firstTagList);
			}else{
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
						$.Pop.alerts($scope.nlsRoot.noCheckedTag);
						return false;
					}
				}
			}
			$scope.hideHasSelectedTags();//隐藏已经选择的标签
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			}
		};
		
		$scope.hideHasSelectedTags = function(){
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
		
		$scope.onHideDropdownMenu = function(event) {
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.hideFirstTagDropdowMenu();
			}
		}
		
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
		
		$scope.removeHasSelectedTag = function(tag){
			var selectedTagList = $scope.selectedTagList,
			selectedTagListLength = selectedTagList.length;
			for(var i = 0; i < selectedTagListLength; i++){
				if(tag.id == selectedTagList[i].id && tag.source == selectedTagList[i].source){
					$scope.selectedTagList.splice(i,1);
					break;
				}
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
		
		$scope.saveTagsToTagCategory = function(){
			var tagsLength = $scope.selectedTagList.length;
			if(tagsLength == 0){
				$.Pop.alerts($scope.nlsRoot.selectTagThanSave);
				return false;
			}
			var tags = [];
			for(var i = 0;i < tagsLength;i++){
				var item = {};
				item.id = $scope.selectedTagList[i].id;
				item.source = $scope.selectedTagList[i].source;
				item.type = $scope.selectedTagList[i].type;
				tags.push(item);
			}
			var params = {
				tagCategoryId:$scope.tagCategoryDetails.id,
				tags:tags
			};
			TagCategoryService.addTagWithTagCategory(params).then(function(response){
				$scope.isShowAddTag = false;
				$scope.currentTagCategoryName = '';
				//$scope.tableParams.reload();
				$scope.search();
				$scope.queryCurTagCategoryInfo();
				$scope.buildTagCategoryPie();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		}
		
		//移除标签
		$scope.removeTagWithTagCategory = function(tag){
			$scope.deleteTags = [];
			$scope.deleteTags.push(tag);
			$.Pop.confirms($scope.nlsRoot.confirmRemoveTagFromCategory+tag.name+'"？',function(){
				var tags = $scope._buildNeedRemovedTags();
				var params = {
					tagCategoryId:$scope.tagCategoryId,
					isDeleteChild : false,
					tags:tags
				};
				
				TagCategoryService.removeTagWithTagCategory(params).then(function(response){
					if(response.success){
						if(response && response.data.isExistChild){
							$scope.showTagCategoryRemoveTagsDialog(tag,response);
						}else{
							//$scope.tableParams.reload();
							$scope.search();
							$scope.queryCurTagCategoryInfo();
							$scope.buildTagCategoryPie();
						}
					}else{
						$.Pop.alerts(response.msg);
					}
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
				
			});
		}
		
		$scope._buildChildTagCategoryList = function(){
			var childTagCategoryList = [];
			for(var i = 0; i < $scope.childTagCategoryList.length;i++){
				if($scope.childTagCategoryList[i].isChecked){
					childTagCategoryList.push($scope.childTagCategoryList[i]);
				}
			}
			return childTagCategoryList;
		}
		
		$scope._buildNeedRemovedTags = function(){
			var tags = [];
			var deleteTagsLength = $scope.deleteTags.length;
			if(deleteTagsLength == 0){
				$.Pop.alerts($scope.nlsRoot.selectTagThanRemove);
				return false;
			}
			
			for(var i = 0;i < deleteTagsLength;i++){
				var item = {};
				item.id = $scope.deleteTags[i].id;
				item.source = $scope.deleteTags[i].source;
				item.name = $scope.deleteTags[i].name;
				item.type = $scope.deleteTags[i].type;
				tags.push(item);
			}
			return tags;
		}
		
		$scope.removeTagsFromChildrenTagCaterogrys = function($hide){//从子分类删除当前标签
			$scope.deleteTags = [];
			$scope.deleteTags.push($scope.removeTag);
			var tags = $scope._buildNeedRemovedTags();
			var childTagCategoryList = $scope._buildChildTagCategoryList();
			if(childTagCategoryList && childTagCategoryList.length > 0){
				var params = {
					tagCategoryId:$scope.tagCategoryId,
					isDeleteChild : true,
					tags:tags,
					childTagCategoryList:childTagCategoryList
				};
				
				TagCategoryService.removeTagWithTagCategory(params).then(function(response){
					if(response.success){
						$.Pop.alerts($scope.nlsRoot.removeTagSuccess+$scope.removeTag.name+'"');
						//$scope.tableParams.reload();
						$scope.search();
						$hide();
					}else{
						$.Pop.alerts(response.msg);
					}
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			}else{
				$.Pop.alerts($scope.nlsRoot.selectRemoveTag);
			}
			
		}
		
		$scope.showTagCategoryRemoveTagsDialog = function(tag,response){//显示是否需要删除子分类下弹框
			$scope.childTagCategoryList = [];
			$scope.removeTagsMsg = "";
			$scope.removeTag = tag;
			if(response){
				if(response.data && response.data.childTagCategoryList){
					$scope.childTagCategoryList = response.data.childTagCategoryList;
				}
				if(response.msg){
					$scope.removeTagsMsg = response.msg;
				}
			}
			
			if($scope.childTagCategoryList && $scope.childTagCategoryList.length > 0){
				for(var i = 0; i < $scope.childTagCategoryList.length;i++){
					$scope.childTagCategoryList[i].isChecked = true;
				}
				$('#btnShowRemoveTags').click();
			}
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_OBJECT_STATUS,TAG_TYPE,DMP_BASE_CALC_RECORD_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.tagTypes = angular.copy(appConfig.dicMap['TAG_TYPE']);
    			$scope.tagStatus = angular.copy(appConfig.dicMap['DMP_OBJECT_STATUS']);
    			$scope.tagCalcStatus = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
    			
    			$scope.init();
    		});
    	}
    	$scope.initDicByName();
    	
    	$scope.resetNodes = function(){
			var newNodes = [];
			//var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
			//newNodes =  treeObj.getNodesByParamFuzzy("name", $scope.tagCategoryKeywords, null);
			var treeData = angular.copy($scope.tagCategoryTree);
			newNodes = $scope.getNodesByParamFuzzy(treeData,'name',$scope.tagCategortSearch.name);
			return newNodes;
		};
		
		$scope.getNodesByParamFuzzy = function(nodes, key, value) {
			if (!nodes || !key) return [];
			var childKey = 'children',
			result = [];
			value = value.toLowerCase();
			for (var i = 0, l = nodes.length; i < l; i++) {
				if (typeof nodes[i][key] == "string") {
					if(nodes[i][key].toLowerCase().indexOf(value)>-1){
						result.push(nodes[i]);
					}else{
						//console.dir(["nodes[i][childKey]",nodes[i][childKey]]);
						
						if(nodes[i][childKey]){
							/*var parentNode = nodes[i];
							var children = [];
							for(var j = 0; j < nodes[i][childKey].length; j++){
								if(typeof nodes[i][childKey][j][key] == "string" && nodes[i][childKey][j][key].indexOf(value) > -1){
									children.push(nodes[i][childKey][j]);
								}
							}
							if(children.length > 0){
								parentNode.children = children;
								result.push(parentNode);
							}*/
							result = result.concat($scope.getNodesByParamFuzzy( nodes[i][childKey], key, value));
						}
						
					}
				}
				
			}
			return result;
		};
		
		$scope.findNodes = function(){
			if(!$scope.tagCategortSearch.name){
				zTreeOptions.zNodes = $scope.tagCategoryTree;
			}else{
				var newNodes = $scope.resetNodes();
				zTreeOptions.zNodes = newNodes;
			}
			//console.dir(["zTreeOptions.zNodes",zTreeOptions.zNodes]);
			$scope.drawZTree();
		}
		
		$scope.drawZTree = function(isSelectNode){
			$scope.openTagCategory(zTreeOptions.zNodes);
			var $tagCategoryTree = $("#tagCategoryTree");
			if(zTreeOptions.zNodes.length == 0){
				$tagCategoryTree.html($scope.nlsRoot.noData);
			}else{
				$.fn.zTree.init($tagCategoryTree, zTreeOptions.setting, zTreeOptions.zNodes);
			}
        	
        	if(isSelectNode){
        		$scope.autoSelectTreeNodes(isSelectNode);
        	}
        	
        	if (window.parent && window.parent.iFrameScrollHeight) {
				window.setTimeout(window.parent.iFrameScrollHeight, 200);
			}
		}
		
		$scope.autoSelectTreeNodes = function(isSelectNode){
			var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
        	if(treeObj && isSelectNode){
        		var nodes = treeObj.getNodes();
        		var nodeId = $scope.currentCategory.nodeId;
        		if(!nodeId){
        			if(nodes && nodes.length > 0){
        				nodeId = nodes[0].id;
        			}
        		}
        		$scope.selectTreeNodes(nodes,nodeId);
        	}
		}
		
		$scope.selectTreeNodes = function(nodes,nodeId){//选中当前的节点
			for(var i = 0;i < nodes.length;i++){
				if(nodes[i].id == nodeId){
					var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
					treeObj.selectNode(nodes[i]);
					break;
				}
				if(nodes[i].children && nodes[i].children.length > 0){
					$scope.selectTreeNodes(nodes[i].children,nodeId);
				}
			}
		}
		
		$scope.openTagCategory = function(obj){
			if(obj && obj.length > 0){
				for(var i = 0; i< obj.length;i++){
					if(obj[i].children && obj[i].children.length > 0){
						obj[i].open = true;
						//obj[i].nocheck = true;
						$scope.openTagCategory(obj[i].children);
					}
				}
			}
		}
		
		$scope.checkTagCategoryNameHasRepeat = function(treeNode,nodeName){
			var hasReapet = false;
			if(treeNode.children.length > 0){
				for(var i = 0 ;i < treeNode.children.length;i++){
					if(treeNode.children[i].name == nodeName){
						hasReapet = true;
					}
				}
			}
			return hasReapet;
		}
		
		$scope.addHoverDom = function(treeId, treeNode) {
			//console.dir(["treeId",treeId]);
			//console.dir(["treeNode",treeNode]);
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var html = '<div class="z-tree-operator">';
			html +='<div class="z-tree-operator-text" id="z-tree-operator'+treeNode.tId+'">';
			html += '<span>'+$scope.nlsRoot.operation+'</span><i></i>';
			html += '</div>';
			html += '<div class="z-tree-operator-list hide">';
			html += '<div class="z-tree-item-operator">';
			html += '<a href="javascript:;" title="'+$scope.nlsRoot.newSubCategory+'" id="addBtn_' + treeNode.tId + '">';
			html += '<span class="button add" ></span>';
			html += '<span class="item-operator-name">'+$scope.nlsRoot.newSubCategory+'</span>';
			html += '</a>';
			html += '</div>';
			
			/*var code = treeNode.code;
			if(code){
				html += "<span class='icons icon-portrait' id='viewPortraitBtn_" + treeNode.tId
				+ "' title='查看画像' onfocus='this.blur();' tagId='" + treeNode.id + "'></span>";
			}*/
			/*添加标签start*/
			
			//if(treeNode.id != 1){
			html += '<div class="z-tree-item-operator">';
			html += '<a href="javascript:;" title="'+$scope.nlsRoot.addTag+'" id="addTagsBtn_' + treeNode.tId + '">';
			html += '<span class="button add-tags"></span>';
			html += '<span class="item-operator-name">'+$scope.nlsRoot.addTag+'</span>'
			html += '</a>';
			html += '</div>';
			//}
			/*添加标签end*/
			
			/*重命名start*/
			html += '<div class="z-tree-item-operator">';
			html += '<a href="javascript:;" title="'+$scope.nlsRoot.rename+'" id="editTagsBtn_' + treeNode.tId + '">';
			html += '<span class="button edit"></span>';
			html += '<span class="item-operator-name">'+$scope.nlsRoot.rename+'</span>'
			html += '</a>';
			html += '</div>';
			/*重命名end*/
			
			/*删除start*/
			html += '<div class="z-tree-item-operator">';
			html += '<a href="javascript:;" title="'+$scope.nlsRoot.toDelete+'" id="removeTagsBtn_' + treeNode.tId + '">';
			html += '<span class="button remove"></span>';
			html += '<span class="item-operator-name">'+$scope.nlsRoot.toDelete+'</span>'
			html += '</a>';
			html += '</div>';
			/*删除end*/
			
			html += '</div>';
			html += '</div>';
			sObj.parent().after(html);
			
			var $zTreeOperatorBtn = $("#z-tree-operator"+treeNode.tId);
			if($zTreeOperatorBtn){
				$zTreeOperatorBtn.bind("click", function(){
					$zTreeOperatorBtn.toggleClass("cur-operator");
					$zTreeOperatorBtn.siblings(".z-tree-operator-list").toggleClass("hide");
					return false;
				});
			}
			
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
				zTree.selectNode(treeNode);
				
				var nodeName = $scope.nlsRoot.tagClassification + (zTreeOptions.newCount++);
				if(treeNode.children.length > 0){
					for(var i = 0;i<treeNode.children.length;i++){
						var hasReapet = $scope.checkTagCategoryNameHasRepeat(treeNode,nodeName);
						if(hasReapet){
							nodeName = $scope.nlsRoot.tagClassification + (zTreeOptions.newCount++);
							hasReapet = $scope.checkTagCategoryNameHasRepeat(treeNode,nodeName);
						}else{
							break;
						}
					}
				}
				
				var parentId = treeNode.id;
				//zTree.addNodes(treeNode, {id:(100 + zTreeOptions.newCount), pId:treeNode.id, name:nodeName});
				//onAddApi();
				var tagCategory = {
					name: nodeName,
					parentId: parentId	
				};
				$scope.saveTagCategory(tagCategory,false,treeNode);
				return false;
			});
			
			var btn = $("#addTagsBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				$scope.selectedTagList = [];
				$scope.isShowFirstTagDropdownMenu = false;
				var nodeName = treeNode.name;
				var nodeId = treeNode.id;
				$scope.currentCategory.name = nodeName;
				$scope.currentCategory.nodeId = nodeId;
				$('#btnShowAddTags').click();
				var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
				zTree.selectNode(treeNode);
				$('#btn-search').trigger('click');
				$scope.addTag(treeNode);
				
				if(document.all){
	    			window.event.cancelBubble = true;
	    	 	}else{
	    			event.stopPropagation(); 
	    		}
				return false;
			});
			
			var $editTagsBtn = $("#editTagsBtn_"+treeNode.tId);
			if ($editTagsBtn) {
				$editTagsBtn.bind("click", function(){
					var $z_tree_operator = $editTagsBtn.parentsUntil(".z-tree-operator").parent();
					var $edit = $z_tree_operator.parent().find("a .edit");
					$edit.click();
					
					if(document.all){
		    			window.event.cancelBubble = true;
		    	 	}else{
		    			event.stopPropagation(); 
		    		}
					return false;
				});
			}
			
			var $removeTagsBtn = $("#removeTagsBtn_"+treeNode.tId);
			if ($removeTagsBtn) {
				$removeTagsBtn.bind("click", function(){
					var $z_tree_operator = $editTagsBtn.parentsUntil(".z-tree-operator").parent();
					var $remove = $z_tree_operator.parent().find("a .remove");
					$remove.click();
					
					if(document.all){
		    			window.event.cancelBubble = true;
		    	 	}else{
		    			event.stopPropagation(); 
		    		}
					return false;
				});
			}
			
			var viewBtn = $("#viewPortraitBtn_"+treeNode.tId);
			if (viewBtn) {
				viewBtn.bind("click", function(){
					var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
					zTree.selectNode(treeNode);
					var $this = $(this);
					var tagId = $.trim($this.attr("tagId"));
					if(tagId != ""){
						//window.open("#/tag/portrait/list/"+tagId);
						window.location.href = "#/tag/tags/portrait/"+tagId;
					}
					return false;
				});
			}
		}
		
		
		$scope.beforeDrag = function(treeId, treeNodes){
			return false;
		}
		$scope.beforeEditName = function(treeId, treeNode){
			zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
			//$.Pop.alerts("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
			zTree.selectNode(treeNode);
			return true;
			//return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
		}
		$scope.beforeRemove = function(treeId, treeNode){
			zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
			//$.Pop.alerts("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
			zTree.selectNode(treeNode);
			$scope.onRemove('',treeId, treeNode);
			return false;
			//return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
		}

		$scope.onRemove = function(e, treeId, treeNode){
			if(treeNode.children && treeNode.children.length > 0){
				$.Pop.alerts($scope.nlsRoot.existingCanNotDel);
				return false;
			}
			$.Pop.confirms($scope.nlsRoot.confirmDelete+treeNode.name+'"？',function(){
				var nodeName = treeNode.name;
				var nodeId = treeNode.id;
				var tagCategory = {
					//id : nodeId,
					//name: nodeName,
					//parentId: parentId	
				};
				
				var param = {
					url : '/dmp-web/tag/tagCategories/delTagCategories/'+nodeId,
					callType : 'get',
					contentType : 'application/json',
					dataType : 'json',
					data : {}
				};
				
				/*var urlAddress = '/dmp-web/tag/tagCategories/delTagCategories/'+nodeId;
				var callType = 'get';
				var dataType = 'json';
				callApi(tagCategory, urlAddress,callType,dataType, function(response){*/
				$.callApi(param, function(response){
					//$state.reload();
					if(response.success){
						var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
						var nodes = treeObj.getSelectedNodes();
						for (var i=0, l=nodes.length; i < l; i++) {
							treeObj.removeNode(nodes[i]);
						}
					}else{
						$.Pop.alerts(response.msg);
					}
				});
				
			});
			//$.Pop.alerts("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		}
		$scope.beforeRename = function(treeId, treeNode, newName, isCancel){
			zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
			//$.Pop.alerts((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			$scope.oldName = treeNode.name;
			if (newName.length == 0) {
				$.Pop.alerts($scope.nlsRoot.nodeNameNoEmpty);
				//var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
				//setTimeout(function(){zTree.editName(treeNode)}, 10);
				return false;
			}else{
				/*var nodeId = treeNode.id;
				var parentId = "";
				if(treeNode.parentId){
					parentId = treeNode.parentId;
				}else if(treeNode.pId){
					parentId = treeNode.pId;
				}*/
				
				
				/*var isExist = false;
				var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
				var parentNode = treeObj.getNodeByParam("id",parentId, null);
				var siblingsNodes = parentNode.children;
				if(siblingsNodes.length > 0){
					for(var i = 0; i < siblingsNodes.length; i++){
						if(siblingsNodes[i].id == nodeId){
							$scope.oldName = siblingsNodes[i].name;
							//isExist = true;
							break;
						}
					}
				}*/
				
			}
			return true;
		}

		$scope.onRename = function(e, treeId, treeNode, isCancel){
			return false;
			var nodeName = $.trim(treeNode.name);
			var nodeId = treeNode.id;
			var parentId = "";
			if(treeNode.parentId){
				parentId = treeNode.parentId;
			}else if(treeNode.pId){
				parentId = treeNode.pId;
			}
			
			var isExist = false;
			var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
			var parentNode = treeObj.getNodeByParam("id",parentId, null);
			if(parentNode){
				var siblingsNodes = parentNode.children;
				if(siblingsNodes.length > 0){
					for(var i = 0; i < siblingsNodes.length; i++){
						if(siblingsNodes[i].id != nodeId && $.trim(siblingsNodes[i].name) == nodeName){
							isExist = true;
							break;
						}
					}
				}
			}
			if(isExist){
				treeNode.name = $scope.oldName;
				$.Pop.alerts($scope.nlsRoot.editFailNodeNameNoRepeat);
				var tId = treeNode.tId;
				$("#" + tId+'_span').html($scope.oldName);
				return false;
			}
			/*var param = {
				url : '/dmp-web/tag/tagCategories/updateTagCategories',
				callType : 'post',
				contentType : 'application/json',
				dataType : 'json',
				data : {
					"id" : nodeId,
					"name": nodeName,
					"parentId": parentId
				}
			};*/
			
			var tagCategory = {
				"id" : nodeId,
				"name": nodeName,
				"parentId": parentId	
			};
			
			var urlAddress = '/dmp-web/tag/tagCategories/updateTagCategories';
			var callType = 'post';
			var dataType = 'json';
			callApi(tagCategory, urlAddress,callType,dataType, function(response){
			//$.callApi(param, function(response){
				//console.dir(["response:",response]);
			});
			//$.Pop.alerts((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
		}

		$scope.showRemoveBtn = function(treeId, treeNode){
			return true;
			/*if(treeNode.children && treeNode.children.length > 0){
				return false;
			}else{
				return true;
			}*/
			//return !treeNode.isFirstNode;
		}

		$scope.showRenameBtn = function(treeId, treeNode){
			return true;//!treeNode.isLastNode;
		}

		$scope.removeHoverDom = function(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
			$("#viewPortraitBtn_"+treeNode.tId).unbind().remove();
			$("#addTagsBtn_"+treeNode.tId).unbind().remove();
			$(".z-tree-operator").remove();
		}
		
		//单击菜单树事件
		$scope.tagCategoryTreeClick = function(event, treeId, treeNode) {
			$scope.isShowMoreSearch = false;
			$scope.searchValue = "";
			
			var nodeName = treeNode.name;
			var nodeId = treeNode.id;
			$scope.currentCategory.name = nodeName;
			$scope.currentCategory.nodeId = nodeId;
			$scope.tagCategoryId = nodeId;
			
    		$scope.buildTagCategoryPie();
    		$scope.queryCurTagCategoryInfo();
    		
    		//$scope.tableParams.filter({tagCategoryId:nodeId});
    		$scope.search();
    		$scope.isEditTagCategory = false;
        }
    	
    	var zTreeOptions = {
			zNodes : [],
			nodeList : [],
			className : "dark",
			newCount : 1,
		    setting : {
		    	view: {
		    		addHoverDom: $scope.addHoverDom,
		    		removeHoverDom: $scope.removeHoverDom,
		    		selectedMulti: false,
		    		showLine: false
		    	},
		    	edit: {
		    		enable: true,
		    		editNameSelectAll: true,
		    		showRemoveBtn: $scope.showRemoveBtn,
		    		showRenameBtn: $scope.showRenameBtn
		    	},
		    	data: {
		    		simpleData: {
		    			enable: true
		    		}
		    	},
		    	callback: {
		    		beforeDrag: $scope.beforeDrag,
		    		beforeEditName: $scope.beforeEditName,
		    		beforeRemove: $scope.beforeRemove,
		    		beforeRename: $scope.beforeRename,
		    		onRemove: $scope.onRemove,
		    		onRename: $scope.onRename,
		    		onClick: $scope.tagCategoryTreeClick
		    	}
		    }
		}
    	
    	
    	/*下拉框分类菜单start*/
    	$scope.beforeClick = function(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		}

		$scope.onCheck = function(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("tagCategoryMenuTree"), nodes = zTree.getCheckedNodes(true), v = "", ids = "";
			for (var i = 0, l = nodes.length; i < l; i++) {
				v += nodes[i].name + "，";
				ids += nodes[i].id + ",";
			}
			if (v.length > 0)
				v = v.substring(0, v.length - 1);
			if (ids.length > 0)
				ids = ids.substring(0, ids.length - 1);
			var tagCategoryNames = $("#tagCategoryNames");
			tagCategoryNames.val(v);
			
			tagCategoryNames.removeClass("input-error").siblings(".form-error-msg").addClass("ng-hide");
			
			$scope.tagCategoryObj = {
				ids : ids,
				names : v
			}
			
			$("#menuContent").fadeOut("fast");
		}

		$scope.showTagCategoryMenu = function() {
			var cityObj = $("#tagCategoryNames");
			var cityOffset = $("#tagCategoryNames").offset();
			$("#menuContent").css({
				left : cityOffset.left + "px",
				top : cityOffset.top + cityObj.outerHeight() + "px"
			}).slideDown("fast");

			$("body").bind("mousedown", $scope.onBodyDown);

			var treeObj = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
			if (treeObj) {
				var nodes = treeObj.getNodes();
				$scope.selectTagCategoryMenuTree(nodes);

				if (window.parent && window.parent.iFrameScrollHeight) {
					window.setTimeout(window.parent.iFrameScrollHeight, 200);
				}
			}
		}

		$scope.selectTagCategoryMenuTree = function(nodes) {// 自动选中节点
			if($scope.tagCategoryObj && $scope.tagCategoryObj.ids){
				var idsArr = $scope.tagCategoryObj.ids.split(',');
				var treeObj = $.fn.zTree.getZTreeObj("tagCategoryMenuTree");
				for (var i = 0; i < nodes.length; i++) {
					for (var j = 0; j < idsArr.length; j++) {
						if (nodes[i].id == idsArr[j]) {
							treeObj.checkNode(nodes[i], true, true);
						}
					}
					if (nodes[i].children && nodes[i].children.length > 0) {
						$scope.selectTagCategoryMenuTree(nodes[i].children);
					}
				}
			}
		}

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
		
		$scope.goTop = function(){
			$("#content").parent().scrollTop(0);
		}
		
		$scope.drawTagCategoryMenuTree = function() {
			$scope.openTagCategory($scope.tagCategoryMenuTree);
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
			$.fn.zTree.init($("#tagCategoryMenuTree"), setting, $scope.tagCategoryMenuTree);
			
		}
		
		/*下拉框分类菜单end*/
    	
    }];
});
