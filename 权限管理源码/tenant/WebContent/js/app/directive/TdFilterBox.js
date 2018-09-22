define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.factory('FilterBoxService', [ '$rootScope','$http','ConditionService', function($rootScope,$http,ConditionService) {
    	var isPartnerOpen = false;
    	var isVersionOpen = false;
    	var isUserSegOpen = false;
    	return {
        	getFilterData : function(data){
        		if(appConfig.UserCondition && appConfig.UserCondition.filterBox){
        			return  appConfig.UserCondition.filterBox;
        		}
        		return undefined;
        	},
        	setFilterData : function(data){
        		if(!appConfig.UserCondition)
        			appConfig.UserCondition = {};
        		if(!appConfig.UserCondition.filterBox)
        			appConfig.UserCondition.filterBox = {};
        		if(true||!CommonUtils.equalsObj(appConfig.UserCondition.filterBox,data)){
        			angular.extend(appConfig.UserCondition.filterBox, data);
            		ConditionService.setSessionAttribute("UserCondition", appConfig.UserCondition);
            		ConditionService.setFilterBoxData(data);
            		$rootScope.$broadcast('td-panel-filter-condition.onChange', {
            			data:data
					});
        		}
        	},
        	getPartnerStatus : function(){
        		return isPartnerOpen;
        	},
        	setPartnerStatus : function(s){
        		isPartnerOpen = s;
        	},
        	getVersionStatus : function(){
        		return isVersionOpen;
        	},
        	setVersionStatus : function(s){
        		isVersionOpen = s;
        	},
        	getUserSegStatus : function(){
        		return isUserSegOpen;
        	},
        	setUserSegStatus : function(s){
        		isUserSegOpen = s;
        	}
		};
	}]);
    angularAMD.directive('tdFilterBox',['$rootScope','FilterBoxService','ConditionService', 'ReportService',
	  function($rootScope,FilterBoxService,ConditionService,ReportService) {
    	return {
    		restrict : 'EA',
    		templateUrl : "js/app/directive/template/td-filter-box.html",
    		link: function(scope, elem, attrs) {
    			scope.versionCondition = 3;
    			scope.partnerCondition = 3;
    			scope.userSegCondition = 3;
    			scope.partnerQuick = [];
    			scope.versionQuick = [];
    			scope.userSegQuick = [];
    			scope.isPartnerOpen = FilterBoxService.getPartnerStatus();
    			scope.isVersionOpen = FilterBoxService.getVersionStatus();
    			scope.isUserSegOpen = FilterBoxService.getUserSegStatus();
    			scope.filterdata = {};
    			if(appConfig.UserCondition!=null){
    				angular.copy(appConfig.UserCondition.filterBox,scope.filterdata);//FilterBoxService.getFilterData();
    			}
    			scope.$on("ConditionService.onChange", function(event, data) {
    				if(!data.filterBox){
    					scope.closeAll();
    				}else{
    					var selectPartners = data.filterBox.selectPartners;
    					var selectVersions = data.filterBox.selectVersions;
    					var selectUserSegs = data.filterBox.selectUserSegs;
    					if((!selectPartners ||selectPartners.length==0 )&& (!selectVersions ||selectVersions.length==0) && (!selectVersions || selectUserSegs.length==0)){
    						scope.closeAll();
    					}
    				}
    				if(data.broadcastType == "BreakCrumb"){
    					scope.filterdata={};
    					var d ={	partnerKeys :[],
    	    						versionKeys :[],
    	    						userSegKeys :[],
    	    						selectPartners:[],
    	        					selectVersions:[],
    	        					selectUserSegs:[]
    	    					};
    					FilterBoxService.setFilterData(d);
    					scope.init();
    					
    				}
    			});
    			scope.init = function(){
    				if(appConfig.UserCondition&& appConfig.UserCondition.BreakCrumbData){
    					scope.closeAll();
    					var BreakCrumbData = appConfig.UserCondition.BreakCrumbData;
    					var platformid = BreakCrumbData.platformid;
    					var productid = BreakCrumbData.productid;
    					var platformidstr ;
    					var productidstr = productid[0];
    					var platcategory = BreakCrumbData.platcategory;
    					if(platcategory == 0 || platcategory ==2){
    						platformidstr = platformid.toString();
    					}
    					
    					scope.versionParams = {
    							platformid: platformidstr,
    							productid: productidstr,
    							category:platcategory,
    							serviceCode: "9996"
    					};
    					scope.partnerParams = {
    							platformid: platformidstr,
    							productid: productidstr,
    							category:platcategory,
    							serviceCode: "9995"
    					};
    					scope.userSegParams = {
    							platformid: platformidstr,
    							productid: productidstr,
    							category:platcategory,
    							serviceCode: "3704"
    					};
    					
    					if(!scope.sortCondition || !scope.sortCondition.partnerHidden){
    						scope.getPartner(scope.partnerParams);
    					}else{
    						scope.selectPartners= [];
    					}
    					if(!scope.sortCondition || !scope.sortCondition.versionHidden){
    						scope.getVersion(scope.versionParams);
    					}else{
    						scope.selectVersions= [];
    					}
    					if(!scope.sortCondition || !scope.sortCondition.userSegHidden){
    						scope.getUserSeg(scope.userSegParams);
    					}else{
    						scope.selectUserSegs= [];
    					}
    				}
    			};
    			
    			scope.getPartner = function(params){
    				ReportService.getPartnerByParams(params).then(function(data){
        				angular.forEach(data.data9995,function(it){
        					var item = it.value.split(",");
        					it.value = item[0];
        					var plat = item[1];
        					if(plat == 1){
        						it.logoName="logo_android_min"
        					}else if(plat == 2){
        						it.logoName="logo_apple_min"
        					}else if(plat == 4){
        						it.logoName="logo_winp_min"
        					}
        				});
    					if(scope.filterdata){
        					angular.forEach(scope.filterdata.partnerKeys,function(key){
        						scope.isPartnerOpen = true;
            					scope.seletedItem(data.data9995,'key',key);
            				});
        				}
    					scope.selectPartners = scope.checkSeletdTtem(data.data9995);
    					scope.partners=data.data9995;
    				});
    			}
    			scope.getVersion = function(params){
    				ReportService.getVersionByParams(params).then(function(data){
        				angular.forEach(data.data9996,function(it){
        					var item = it.value.split(",");
        					it.value = item[0];
        					var plat = item[1];
        					if(plat == 1){
        						it.logoName="logo_android_min"
        					}else if(plat == 2){
        						it.logoName="logo_apple_min"
        					}else if(plat == 4){
        						it.logoName="logo_winp_min"
        					}
        				});
        				if(scope.filterdata){
        					angular.forEach(scope.filterdata.versionKeys,function(key){
        						scope.isVersionOpen = true;
        						scope.seletedItem(data.data9996,'key',key);
        					});
        				}
        				scope.selectVersions = scope.checkSeletdTtem(data.data9996);
    					scope.versions=data.data9996;
    				});
    			}
    			scope.getUserSeg = function(params){
    				ReportService.choseUserGroupByParams(params).then(function(data){
        				if(scope.filterdata){
        					angular.forEach(scope.filterdata.userSegKeys,function(key){
        						scope.isUserSegOpen = true;
            					scope.seletedItem(data["data3704"],'key',key);
            				});
        				}
        				angular.forEach(data.data3704,function(it){
        					var item = it.value.split(",");
        					it.value = item[0];
        					var plat = item[1];
        					if(plat == 1){
        						it.logoName="logo_android_min"
        					}else if(plat == 2){
        						it.logoName="logo_apple_min"
        					}else if(plat == 4){
        						it.logoName="logo_winp_min"
        					}
        				});
        				scope.selectUserSegs = scope.checkSeletdTtem(data.data3704);
        				scope.userSegs=data.data3704;
        			});
    			}
    			scope.seletedItem = function(data,k,v){
    				angular.forEach(data, function(it){
    					if(it[k] == v){
    						it.selected = !it.selected;
    					}
    				})
    				scope.clearQuickData();
    			}
    			scope.checkSeletdTtem = function(datas){
    				var selectDatas =[];
					angular.forEach(datas, function(it){
						if(it.selected){
							selectDatas.push(it);
						}
					})
					return selectDatas;
    			};
    			scope.quickSearch = function(val,m){
    				if(m == 'partner'){
    					angular.copy(scope.partners,scope.partnerQuick);
        				scope.partnerSearching=true;
        				scope.partnerQuick = scope.findSameItem(scope.partnerQuick,val);
    				}
    				if(m == 'version'){
    					angular.copy(scope.versions,scope.versionQuick);
        				scope.versionSearching=true;
        				scope.versionQuick = scope.findSameItem(scope.versionQuick,val);
    				}
    				if(m == 'userSeg'){
    					angular.copy(scope.userSegs,scope.userSegQuick);
        				scope.userSegSearching=true;
        				scope.userSegQuick = scope.findSameItem(scope.userSegQuick,val);
    				}
    				
    			};
    			scope.findSameItem = function(arr,str){
    				var sameArray  = [];
    				angular.forEach(arr, function(it){
    					var v = it.value.toLowerCase();
    					var l = str.toLowerCase();
    					if(v.indexOf(l) == 0){
    						sameArray.push(it);
    					}
    				});
    				return sameArray;
    			};
    			scope.clearQuickData = function(){
    				scope.partnerSearching=false;
    				scope.quickPartnerSearchVal="";
    				scope.versionSearching=false;
    				scope.quickVersionSearchVal="";
    				scope.userSegSearching=false;
    				scope.quickUserSegSearchVal="";
    			}
    			
    			scope.clearAll = function(m){
    				if(m == "partner"){
    					angular.forEach(scope.partners, function(it){
        					it.selected = false;
        				})
    				}else if(m == "version"){
    					angular.forEach(scope.versions, function(it){
        					it.selected = false;
        				})
    				}else if(m == "userSeg"){
    					angular.forEach(scope.userSegs, function(it){
        					it.selected = false;
        				})
    				}
    			}
    			scope.closeAll = function(){
    				scope.onOff('partner','off');
    				scope.onOff('version','off');
    				scope.onOff('userSeg','off');
    			}
    			//切换开关按钮状态
    			scope.onOff = function(m,act){
    				scope.clearAll(m);
    				if(m == 'partner'){
    					scope.isPartnerOpen = act=="off" ? false : !scope.isPartnerOpen
        				FilterBoxService.setPartnerStatus(scope.isPartnerOpen);
    				}else if(m == 'version'){
    					scope.isVersionOpen = act=="off" ? false : !scope.isVersionOpen
        				FilterBoxService.setVersionStatus(scope.isVersionOpen);
    				}else if(m == 'userSeg'){
    					scope.isUserSegOpen = act=="off" ? false : !scope.isUserSegOpen
        				FilterBoxService.setUserSegStatus(scope.isUserSegOpen);
    				}
    			}
    			scope.selectAll = function(m){
    				if(m == "partner"){
	    				angular.forEach(scope.partners, function(it){
	    					it.selected = true;
	    				})
    				}else if(m == "version"){
    					angular.forEach(scope.versions, function(it){
	    					it.selected = true;
	    				})
    				}else if(m == "userSeg"){
    					angular.forEach(scope.userSegs, function(it){
	    					it.selected = true;
	    				})
    				}
    			}
    			scope.sortByType = function(sort,item){
    				var params = "";
    				if(sort == "partner"){
    					params = angular.copy(scope.partnerParams);
    					params.item = item;
    					scope.partnerCondition = Number(item);
    	    			scope.getPartner(params);
    				}else if(sort == "version"){
    					params = angular.copy(scope.versionParams);
    					params.item = item;
    					scope.versionCondition = Number(item);
    					scope.getVersion(params);
    				}
    				else if(sort ="userSeg"){
    					params = angular.copy(scope.userSegParams);
    					params.item = item;
    					scope.userSegCondition = Number(item);
    					scope.getUserSeg(params);
    				}
    			}
    			scope.saveFilterBox = function(){
    				var partnerKeys = [];
    				var versionKeys = [];
    				var userSegKeys = [];
    				var selectPartners=[];
    				var selectVersions = [];
    				var selectUserSegs = [];
    				angular.forEach(scope.partners,function(it){
    					if(it.selected){
    						partnerKeys.push(it.key)
    						selectPartners.push(it);
    					}
    				});
    				angular.forEach(scope.versions,function(it){
    					if(it.selected){
    						versionKeys.push(it.key)
    						selectVersions.push(it);
    					}
    				});
    				angular.forEach(scope.userSegs,function(it){
    					if(it.selected){
    						userSegKeys.push(it.key)
    						selectUserSegs.push(it);
    					}
    				});
    				var d = {
    					partnerKeys : partnerKeys,
    					versionKeys :versionKeys,
    					userSegKeys : userSegKeys,
    					selectPartners:selectPartners,
    					selectVersions:selectVersions,
    					selectUserSegs:selectUserSegs,
    				}
    				FilterBoxService.setFilterData(d);
    			}
    			scope.cancel = function(){
    				//还原到上次确认操作的数据
    				var fdata = FilterBoxService.getFilterData();
    				if(fdata){
    					angular.forEach(scope.partners, function(it){
							if(fdata.partnerKeys && fdata.partnerKeys.indexOf(it.key)!=-1){
								it.selected = true;
							}else{
								it.selected = false;
							}
    					})
    					angular.forEach(scope.versions, function(it){
							if(fdata.versionKeys && fdata.versionKeys.indexOf(it.key)!=-1){
								it.selected = true;
							}else{
								it.selected = false;
							}
    					})
    					angular.forEach(scope.userSegs, function(it){
							if(fdata.userSegKeys && fdata.userSegKeys.indexOf(it.key)!=-1){
								it.selected = true;
							}else{
								it.selected = false;
							}
    					})
    				}
    			}
    			
    			scope.init();  // start
		    }
    	}
    }]);
});
