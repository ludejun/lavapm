define(['angularAMD','app/directives/TdTreeSelect', 'app/services/admin/DicService', 'app/services/tag/TagService', 'app/services/tag/TagCategoryService','app/services/common/CommonService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','$rootScope','DicService','TagService','TagCategoryService','$state','NgTableParams', '$location' , 'CommonService', function ($scope,$rootScope,DicService,TagService,TagCategoryService,$state,NgTableParams,$location, CommonService) {    
    	$scope.init = function(){
    		$scope.getUserLoginDetails();
    		$scope.resetMoreSearchCondition();
    		$scope.reloadMoreSearchCondition();
    		
    		$scope.tagCategoryId = $location.search()['filter[tagCategoryId]'] || "";
    		$scope.tagCategoryName = $scope.nlsRoot.allTags || $location.search()['filter[tagCategoryName]'];
    		
    		$scope.selectSearchObject = {
    			keyword:"",
    			placeholder : $scope.nlsRoot.inputTypeName,
    			selectLabel : $scope.tagCategoryName
    		};
    		
			$scope.isViewRule = false;
			$scope.queryTags();
    		$scope.sourceList;
    		$scope.queryTagCategory();
    	};
    	
    	$scope.goTagFormPage = function(){
    		$.layerLoading.show();
    	}
    	
    	$scope.goCalcObjectLog = function(tagId){
    		TagService.goCalcObjectLog(tagId).then(function(calcObjectLog){
				if(calcObjectLog){
					$state.go('schedulerTaskLogs_view', { schedulerTaskLogId: calcObjectLog.schedulerTaskLogId,sourcePage:$scope.nlsRoot.labelDefinitionList});
					//var dmpreportUrl = appConfig.urlMap.dmpreportUrl;
					//$('#main-frame', parent.document).attr("src","/tenant#/monitor/schedulerTaskLogs?url="+dmpreportUrl+"dmp-report/#/monitor/schedulerTaskLogs/view/"+calcObjectLog.schedulerTaskLogId);
				}
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
    	}
    	
    	$scope.queryTags = function(){
    		$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                },
    			filter : {
    				q : $scope.searchValue,
    				tagCategoryId : $scope.tagCategoryId,
    				tagCategoryName : $scope.tagCategoryName,
    				type:'TB'
    			}
            },
            $location.search()), {
                counts: [10, 20, 50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	$location.search(params.url()); 
                	TagService.query(params).then(function(tags){
                		$scope.rebuildObjects(tags);
                		$scope.tagsList = tags;
        				params.total(tags.total);
                        $defer.resolve(tags);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
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
    	
		$scope.queryTagCategory = function(){  
			$scope.tagCategoryObject = {
    			selectLabel : "全部标签",
    			menuElem:"menuTagCategoryContent",
    			keywords:""
    		};
			
			$scope.tagCategoryTree = [];
			var params = {
    			random:CommonService.getRandomNum(1,100000000)
    		};
			TagCategoryService.queryTagCategory(params).then(function(tagCategoryTree){
				if(tagCategoryTree && tagCategoryTree.length > 0){
					//$scope.tagCategoryTree = tagCategoryTree;//[0].children;
					$scope.rebuildTagCategory(tagCategoryTree);
					$scope.selectTree = $scope.tagCategoryTree;
					console.dir(['$scope.selectTree',$scope.selectTree]);
				}
			});
		};
		
		$scope.selectTagCategoryCallback = function(tc){
    		$scope.$apply(function (){
    			$scope.tagCategoryId = tc.id;
        		$scope.tagCategoryName = tc.name;
        		$scope.search();
		    });
		}
		
		$scope.rebuildTagCategory = function(tagCategoryTree){
			$scope.tagCategoryTree.push({
				"id": "",
//				"name": "全部标签",
				"name": $scope.nlsRoot.allTags,
				"description": null,
				"parentId": -1,
				"createBy": "dmpadmin",
				"creator": "DMP管理员",
				"updateBy": "dmpadmin",
				"createTime": 1459945275000,
				"updateTime": 1460086688000,
				"isChecked": false,
				"children": [],
				"isShow" : true
			});
			for(var i = 0;i < tagCategoryTree[0].children.length;i++){
				if(tagCategoryTree[0].children[i].code != 'systemtag' && tagCategoryTree[0].children[i].code != 'presettag'){
					$scope.tagCategoryTree.push(tagCategoryTree[0].children[i]);
				}
			}
			for(var i = 0; i<$scope.tagCategoryTree.length;i++){
				//if(i == 1){
					$scope.tagCategoryTree[i].isShowChildren = true;
				/*}else{
					$scope.tagCategoryTree[i].isShowChildren = false;
				}*/
				$scope.tagCategoryTree[i].isShow = true;
				for(var j = 0; j<$scope.tagCategoryTree[i].children.length;j++){
					$scope.tagCategoryTree[i].children[j].isShow = true;
				}
			}
		}
    	
    	$scope.showMoreOperator = function(tag){
    		for(var i = 0; i < $scope.tagsList.length; i++){
    			if(tag.id != $scope.tagsList[i].id){
    				$scope.tagsList[i].isShowMoreOperator = false;
    			}else{
    				tag.isShowMoreOperator = !tag.isShowMoreOperator;
    			}
    		}
    		
    		if(tag.isShowMoreOperator){
    			if(window.parent && window.parent.iFrameScrollHeight){
    				window.setTimeout(window.parent.iFrameScrollHeight,200);
    			}
    		}else{
    			if(window.parent && window.parent.iFrameHeight){
    				window.setTimeout(window.parent.iFrameHeight,200);
    			}
    		}
    		
    		if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
    	}
    	
    	$scope.hideMoreOperator = function(){
    		if($scope.tagsList){
    			for(var i = 0; i < $scope.tagsList.length; i++){
        			$scope.tagsList[i].isShowMoreOperator = false;
        		}
        		$scope.$apply();
    		}
    	}
    	
    	document.onclick = function(){
    		$scope.isShowSelectList = false;
    		$scope.hideMoreOperator();
    	};

		$scope.removeTag = function(tag){   
			var createBy = tag.createBy;
			var isViewRule = $scope.checkLoginUserIsViewRule(createBy);
			if(isViewRule){
				$.Pop.alerts($scope.nlsRoot.noPowerDelOtherTags);
				return false;
			}
			
			$.Pop.confirms($scope.nlsRoot.confirmDelTags+tag.name+'"？',function(){
				TagService.remove(tag).then(function(tag){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			});
			
		};	
		
		$scope.getUserLoginDetails = function(){
			$scope.loginUser = {};
			if(window.parent && window.parent.appConfig && window.parent.appConfig.user){
				$scope.loginUser = window.parent.appConfig.user;
			}else{
				$scope.loginUser = appConfig.user;
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
		
		$scope.reloadSearchValue = function(){
			setTimeout(function(){
				$scope.searchValue = $location.search()['filter[q]'] || '';
			},200);
		}
		
		$scope.search = function(){   
			if($scope.isShowMoreSearch){
				$scope.tableParams.filter({
					//'q' : $scope.searchValue,
					'type' : 'TB',
					'tagCategoryName':$scope.tagCategoryName,
					"tagCategoryId":$scope.tagCategoryId,
					"name" : $scope.moreSearchCondition.name,
					"code" : $scope.moreSearchCondition.code,
					"touchPointType" : $scope.moreSearchCondition.touchPointType,
					"description" : $scope.moreSearchCondition.description,
					"source" : $scope.moreSearchCondition.source,
					"status" : $scope.moreSearchCondition.status,
					"calcStatus" : $scope.moreSearchCondition.calcStatus,
					"tagDataTimeStart" : $scope.moreSearchCondition.tagDataTimeStart,
					"tagDataTimeEnd" : $scope.moreSearchCondition.tagDataTimeEnd,
					"creator" : $scope.moreSearchCondition.creator,
					"createTimeStart" : $scope.moreSearchCondition.createTimeStart,
					"createTimeEnd" : $scope.moreSearchCondition.createTimeEnd
				});
			}else{
				$scope.tableParams.filter({
					'q' : $scope.searchValue || "",
					'type' : 'TB',
					'tagCategoryName':$scope.tagCategoryName,
					"tagCategoryId":$scope.tagCategoryId
				});
			}
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
    			$scope.reloadSearchValue();
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
    			status:"",
    			calcStatus:"",
    			tagDataTimeStart:"",
    			tagDataTimeEnd:"",
    			creator:"",
    			createTimeStart:"",
    			createTimeEnd:""
    		};
		}
		
		$scope.changeCreateTime = function(start,end){
			$scope.moreSearchCondition.createTimeStart = start;
			$scope.moreSearchCondition.createTimeEnd = end;
		}
		
		$scope.changeTagDataTime = function(start,end){
			$scope.moreSearchCondition.tagDataTimeStart = start;
			$scope.moreSearchCondition.tagDataTimeEnd = end;
		}
		
		$scope.changeTestTime = function(start,end,type){
			//alert("start:"+start+",end:"+end+"type:"+type);
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_OBJECT_STATUS,TAG_SOURCE,DMP_BASE_CALC_RECORD_STATUS',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.tagSources = angular.copy(appConfig.dicMap['TAG_SOURCE']);
    			$scope.tagStatus = angular.copy(appConfig.dicMap['DMP_OBJECT_STATUS']);
    			$scope.tagCalcStatus = angular.copy(appConfig.dicMap['DMP_BASE_CALC_RECORD_STATUS']);
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			
    			$scope.init();
    			
    			/*$scope.fastSelectDays = [{
    				key:'6',
    				label:'近7日'
    			},{
    				key:'29',
    				label:'近30日'
    			},
    			{
    				key:'89',
    				label:'近90日'
    			},
    			{
    				key:'179',
    				label:'近180日'
    			}];*/
    			
    			$scope.moreSearchCondition.testTimeStart = 1452988800000;
    			$scope.moreSearchCondition.testTimeEnd = 1452988800000;

    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
