define(['angularAMD'], function (angularAMD) {
    'use strict';
    angularAMD.factory('FilterVersionService', [ '$http', function($http) {
    	var filterData = undefined;
    	var isPartnerOpen = false;
    	var isVersionOpen = false;
    	var isUserSegOpen = false;
		return {
			
			//TODO  需要换成真实请求
			
        	queryVersionDemo:function(){
        		return $http.get('js/app/demodata/ProductVersion.json')
        	},
        	
        	
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
    angularAMD.directive('tdScreeningBox',['$rootScope','FilterVersionService','ReportService', function($rootScope,FilterVersionService,ReportService) {
    	return {
    		restrict : 'EA',
    		templateUrl : "js/app/directive/template/td-screening-box.html",
    		link: function(scope, elem, attrs) {
    			
    			scope.versionQuick = [];
    			
    			scope.$on("ConditionService.onChange", function(
    					event, data) {
    				if(data.BreakCrumbData){
    					var BreakCrumbData = data.BreakCrumbData;
    					var platformid = BreakCrumbData.platformid;
    					var productid = BreakCrumbData.productid;
    					var platformidstr = platformid.toString();
    	    			if(platformidstr!=null){
    	    				versionParams.platformid = platformidstr;
    	    			}
    	    			versionParams.productid = productid[0];
    	    			
    	    			scope.getVersionByParams(versionParams); 
    				}
    			});
    			scope.isVersionOpen = FilterVersionService.getVersionStatus();
    			
    			var filterdata = FilterVersionService.getFilterData();
    			
    			var BreakCrumbData = appConfig.UserCondition.BreakCrumbData;
    			var platformid = BreakCrumbData.platformid;
    			var productid = BreakCrumbData.productid;
    			var platformidstr = "";
    			var productidstr = productid[0];
				if(platformid.length>1){
	        		angular.forEach(platformid, function(data,index,array){
	        			if(index == platformid.length-1){
	        				platformidstr+=data;
	        			}else{
	        				platformidstr+=data+",";
	        			}
	        		});
					
				}else{
					platformidstr = platformid[0];
				}
    			
    		 	var versionParams ={
    		 			platformid: platformidstr,
    	      		    productid: productidstr,
    	      		    "serviceCode": "9996"
    	      		};
    	      	
    	      	
    	     	//获取版本信息
    		 	scope.getVersionByParams = function(params){
    		 		ReportService.getVersionByParams(versionParams).then(function (data){
    					scope.versions=data.data9996;
    					angular.forEach(scope.versions,function(it){
        					var item = it.value.split(",");
        					it.value = item[0];
        					var plat = item[1];
        					if(plat == 1){
        						it.logoName="logo_android_min"
        					    it.logo="Andriod"
        					}else if(plat == 2){
        						it.logoName="logo_apple_min"
        						it.logo="iOS"
        					}else if(plat == 4){
        						it.logoName="logo_winp_min"
        						it.logo="WP"
        					}
        				});
    				});
    			}
    		 	scope.getVersionByParams(versionParams);
    			
    	
    			scope.seletedItem = function(data,k,v){
    				angular.forEach(data, function(it){
    					if(it[k] == v){
    						it.selected = !it.selected;
    					}
    				})
    				scope.clearQuickData();
    			}
    			scope.quickSearch = function(val,m){
    			
    				if(m == 'version'){
    					angular.copy(scope.versions,scope.versionQuick);
        				scope.versionSearching=true;
        				var its = [];
        				angular.forEach(scope.versionQuick, function(it){
        					if(it.value.indexOf(val) == 0){
        						its.push(it);
        					}
        				})
        				scope.versionQuick = its;
    				}
    				
    				
    			}
    			scope.clearQuickData = function(){
    				scope.versionSearching=false;
    				scope.quickVersionSearchVal="";
    				
    			}
    			
    			scope.clearAll = function(m){
    				if(m == "version"){
    					angular.forEach(scope.versions, function(it){
        					it.selected = false;
        				})
    				}
    			}
    			//切换开关按钮状态
    			scope.onOff = function(m){
    				scope.clearAll(m);
    				
    					scope.isVersionOpen = !scope.isVersionOpen
        				//FilterVersionService.setVersionStatus(scope.isVersionOpen);
    				
    			}
    			scope.selectAll = function(m){
    				if(m == "version"){
    					angular.forEach(scope.versions, function(it){
	    					it.selected = true;
	    				})
    				}
    			}
    			scope.sortByType = function(){
    				//TODO  发起后端请求进行排序
    			}
    			scope.saveFilterBox = function(callback){
    				
    				var versionKeys = [];
    				
    				
    				angular.forEach(scope.versions,function(it){
    					if(it.selected){
    						versionKeys.push(it)
    					}
    				});
    			
    				if(versionKeys.length>5){
    					scope.validation =true;
    					return ;
    				}else{
    					scope.validation =false;
    				}
    				var d = {
    						versionKeys :versionKeys
    				
    				}
    				FilterVersionService.setFilterData(d);
    				$rootScope.$broadcast("td-screening-box.onChange",d);
    				callback();
    			}
    			scope.cancel = function(){
    				//还原到上次确认操作的数据
    				var fdata = FilterVersionService.getFilterData();
    				if(fdata){
    					
    					angular.forEach(scope.versions, function(it){
							if(fdata.versionKeys && fdata.versionKeys.indexOf(it.value+"")!=-1){
								it.selected = true;
							}else{
								it.selected = false;
							}
    					})
    					
    					
    					

    				
    				}else{
    					angular.forEach(scope.versions, function(it){
									it.selected = false;
    					})
    				}
    			}
		    }
    	}
    }]);
});
