define(['angularAMD','app/filter/DateStrSubstring'], function (angularAMD) {
    'use strict';
    angularAMD.factory('FilterPartnerBoxService', [ '$http', function($http) {
    	var filterData = undefined;
    	var isPartnerOpen = false;
    	var isVersionOpen = false;
    	var isUserSegOpen = false;
		return {
//        	queryVersionDemo:function(){
//        		return $http.get('js/app/demodata/ProductVersion.json')
//        	},
        	
        	
        	getFilterData : function(data){
        		return  filterData;
        	},
        	setFilterData : function(data){
        		filterData = data;
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
    angularAMD.directive('tdScreeningPartnerBox',['$rootScope','ConditionService','FilterPartnerBoxService','ReportService', 
                                                  function($rootScope,ConditionService,FilterPartnerBoxService,ReportService) {
    	return {
    		restrict : 'EA',
    		scope:{
    			partnerList:"=",
    		},
    		templateUrl : "js/app/directive/template/td-screening-partner-box.html",
    		link: function(scope, elem, attrs) {
    			scope.$watch('partnerList', function(){
    				if(scope.partnerList){
    					scope.getPartners(partnerParams);
    				}
    			});
    			
    			scope.partnerQuick = [];
    			
    			
    			scope.isVersionOpen = FilterPartnerBoxService.getVersionStatus();
    			
    			var filterdata = FilterPartnerBoxService.getFilterData();
    			
    			scope.$on("ConditionService.onChange", function(
    					event, data) {
    				if(data.BreakCrumbData){
    					var BreakCrumbData = data.BreakCrumbData;
    					var platformid = BreakCrumbData.platformid;
    					var productid = BreakCrumbData.productid;
    					var platformidstr = platformid.toString();
    	    			if(platformidstr!=null){
    	    				partnerParams.platformid = platformidstr;
    	    			}
    	    			partnerParams.productid = productid[0];
    	    			
//    	    			scope.getPartners(partnerParams); 
    				}
    			});
    			var BreakCrumbData = appConfig.UserCondition.BreakCrumbData;
    			var platformid = BreakCrumbData.platformid;
    			var productid = BreakCrumbData.productid;
    			var platformidstr = platformid.toString();
    			var productidstr = productid[0];
    			var platcategory = BreakCrumbData.platcategory;
    			
    		 	var partnerParams ={
    	      			platformid: platformidstr,
    	      		    productid: productidstr,
    	      		    category :platcategory,
    	      		    serviceCode: "9995"
    	      		};
    	      	
    	     	//获取渠道信息
    			scope.getPartners = function(params){
    				ReportService.getPartnerByParams(params).then(function (data){
    					angular.forEach(data.data9995,function(it){
    						angular.forEach(scope.partnerList, function(partnername){
    	    					if(it.value == partnername){
    	    						it.selected = true;
    	    					}
    	    				})
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
    					scope.partners=data.data9995;
    				});
    			}
    			
    			scope.initPatners = function(){
    				angular.forEach(scope.partnerList, function(data,index,array){
        				var split=data.split(",");
        				if("1" == split[1]){
        					split[1]="logo_android_min"
    					}else if("2" == split[1]){
    						split[1]="logo_apple_min"
    					}else if("4" == split[1]){
    						split[1]="logo_winp_min"
    					}
        				angular.forEach(scope.partners, function(it){
        					if(it.value == split[0] && it.logoName == split[1]){
        						it.selected = true;
        					}
        				})
            		});
    			}
//    			scope.getPartners(partnerParams);
    			scope.seletedItem = function(data,k,v){
    				var num=0;
    				var flag=true;
    				angular.forEach(data, function(it){
    					if(it.selected == true){
    						num++;
    						if(it[k] == v){
    							flag=false;
    						}
    					}
    				})
    				if(num>5 ||(num==5 && flag) ){
    					scope.validation=true;
    					return;
    				}else{
    					scope.validation=false;
    				}
    				angular.forEach(data, function(it){
    					if(it[k] == v){
    						it.selected = !it.selected;
    					}
    				})
    				scope.clearQuickData();
    			}
    			scope.quickSearch = function(val,m){
    			
    				if(m == 'partner'){
    					angular.copy(scope.partners,scope.partnerQuick);
        				scope.partnerSearching=true;
        				var its = [];
        				angular.forEach(scope.partnerQuick, function(it){
        					if(it.value.indexOf(val) == 0){
        						its.push(it);
        					}
        				})
        				scope.partnerQuick = its;
    				}
    				
    				
    			}
    			scope.clearQuickData = function(){
    				scope.partnerSearching=false;
    				scope.quickVersionSearchVal="";
    				
    			}
    			
    			scope.clearAll = function(m){
    				if(m == "partner"){
    					angular.forEach(scope.partners, function(it){
        					it.selected = false;
        				})
    				}
    			}
    			//切换开关按钮状态
    			scope.onOff = function(m){
    				scope.clearAll(m);
    				
    					scope.isVersionOpen = !scope.isVersionOpen
        				//FilterBoxService.setVersionStatus(scope.isVersionOpen);
    				
    			}
    			scope.selectAll = function(m){
    				if(m == "partner"){
    					angular.forEach(scope.partners, function(it){
	    					it.selected = true;
	    				})
    				}
    			}
    			scope.sortByType = function(){
    				//TODO  发起后端请求进行排序
    			}
    			scope.saveFilterBox = function(callback){
    				
    				var partnerIds = [];
    				
    				
    				angular.forEach(scope.partners,function(it){
    					if(it.selected){
    						partnerIds.push(it.key+"")
    					}
    				});
    				if(partnerIds.length>5){
    					scope.validation =true;
    					return ;
    				}else{
    					scope.validation =false;
    				}
    				var d = {
    						partnerIds :partnerIds
    				
    				}
    				FilterPartnerBoxService.setFilterData(d);
    				callback();
    				$rootScope.$broadcast("td-screening-partner-box.onChange",d);
    			}
    			scope.cancel = function(){
    				//还原到上次确认操作的数据
    				var fdata = FilterPartnerBoxService.getFilterData();
    				if(fdata){
    					
    					angular.forEach(scope.partners, function(it){
							if(fdata.partnerIds && fdata.partnerIds.indexOf(it.key+"")!=-1){
								it.selected = true;
							}else{
								it.selected = false;
							}
    					})
    					
    					
    					
//    					angular.forEach(scope.partners, function(it){
//							angular.forEach(fdata.partnerIds, function(partnerId){
//								if(it.key == partnerId){
//									it.selected = true;
//								}else{
//									it.selected = false;
//								}
//							})
//    					})
    				
    				}else{
    					angular.forEach(scope.partners, function(it){
									it.selected = false;
    					})
    				}
    			}
		    }
    	}
    }]);
});
