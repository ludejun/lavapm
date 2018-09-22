define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdBreakCrumb',['$rootScope','BreakCrumbService','$state','$timeout', 
     function($rootScope,BreakCrumbService,$state,$timeout) {
    	return {
    		restrict : 'EA',
    		scope:{
    			data:"=",
    		},
    		templateUrl : "js/app/directive/template/td-break-crumb.html",
    		link: function(scope, elem, attrs) {
    			scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
					  var md = toState.url.split('/')[1];
					  if(!scope.checkSession(md)){
						  //需要重新初始化
						  scope.inited = false;
						  return ;
					  };
					  if(md  == "productlist"){
						  scope.viewConfig = "productlist";
						  scope.cleanDateCondition();
					  }else if(md == "productDetails"){
						  scope.dispalyProudctName = appConfig.ProductOption.currentProductName
						  scope.viewConfig = "fragment";
					  }else if(md == "CreatProduct"|| md.indexOf("ProductInfo")!=-1){
						  scope.viewConfig = "none";
					  }else{
						  scope.viewConfig = "normal";
						  
						  if(appConfig.ProductOption){
							  if(scope.inited == true &&
									  scope.currentProductOptionId == appConfig.ProductOption.currentProductId
									  &&
									  scope.backupCategoryId == appConfig.ProductOption.categoryId){
								  scope.broadcastChange();
							  }else{
								  scope.currentProductOptionId = appConfig.ProductOption.currentProductId
								  scope.initSelect(appConfig.ProductOption);
								  scope.broadcastChange();
							  }
						  }
					  }
				});
    			
    			scope.checkSession = function (url){
    				//服务器重启导致session失效，，导航到页面需要检查
    				if(!appConfig.ProductOption && url != "productlist"){
    					//跳转到首页
    					scope.go("nativepage/summarize");
    					return false ;
    				}
    				return true;
    			}
    			scope.cleanDateCondition = function(){
    				if(appConfig.UserCondition && appConfig.UserCondition.DateFilter){
	        			appConfig.UserCondition.DateFilter=undefined;
    				}
    			}
    			scope.initSelect = function(data){
    				scope.inited = true;
    				var productList = data.productList;  //产品List
    				var plantformList= undefined;   //平台List
    				var categoryList= undefined;   //平台List
    				var selectedProduct = undefined;  //被选中的product
    				var selectedPlantform = undefined;  //被选中的Plantform
    				var selectedcategory = undefined;  //被选中的product
    				var selectedcategoryPlantform = undefined;
    				angular.forEach(productList, function(item){
    					var categorystr="";
    					item.categoryList=new Array();
    					angular.forEach(item.categorynum, function(itemcategory){
    						if(itemcategory==0){
    							item.categoryList.push({
        							platcategory : itemcategory,
        							platcategoryname: "Mobile App",
	    							logoName:'<img src="images/Mobile-APP.png" style="vertical-align:middle;"></img> Mobile App',
        							value : [itemcategory]
        						})	
    						}else if(itemcategory==1){
    							item.categoryList.push({
    								platcategory : 2,
        							platcategoryname: "Mobile H5",
	    							logoName:'<img src="images/mobile-h5.png" style="vertical-align:middle;"></img> Mobile H5',
        							value : [2]
        						})	
    						}else if(itemcategory==2){
    							item.categoryList.push({
    								platcategory : 1,
        							platcategoryname: "PC Web",
	    							logoName:'<img src="images/PCweb.png" style="vertical-align:middle;"></img> PC Web',
        							value : [1]
        						
        						})	
    						}else if(itemcategory==3){
    							item.categoryList.push({
        							platcategory : itemcategory,
        							platcategoryname: "跨屏",
	    							logoName:'<img src="images/crossIcon.png" style="vertical-align:middle;"></img> 跨屏',
        							value : [itemcategory]
        						})	
    						}
    						
        					
    					});
    					categorystr = categorystr.substr(0, categorystr.length-1);
    					//categorystr=eval(categorystr); 
    					//item.categoryList=[categorystr];
    					if(item.productid == data.currentProductId){
    						selectedProduct = item;
    						categoryList = item.categoryList;
    						angular.forEach(item.categoryList, function(it){
    							if(it.platcategory == data.categoryId){
    								selectedcategory = it;
    							}
    						});
    						
    				
    					}
    					
    					angular.forEach(item.categorys, function(item1){
	    					if(item1.platform == 1){
	    						item1.platformList = [{
	    							platform : 1,
	    							platformname: "Andriod",
	    							logoName:'<img src="images/logo_android_min.png" style="vertical-align:middle;"></img> Andriod',
	    							value : ["1"]
	    						}]
	    					}else if(item1.platform == 2){
	    						item1.platformList = [{
	    							platform : 2,
	    							platformname: "iOS",
	    							logoName:'<img src="images/logo_apple_min.png" style="vertical-align:middle;"></img> iOS',
	    							value : ["2"]
	    						}]
	    					}else if(item1.platform == 4){
	    						item1.platformList = [{
	    							platform : 1,
	    							platformname: "WP7",
	    							logoName:'<img src="images/logo_winp_min.png" style="vertical-align:middle;"></img> WP7',
	    							value : ["4"]
	    						}]
	    					}else if(item1.platform == 3){
	    						item1.platformList = [{
	    							platform : 1,
	    							platformname: "Andriod",
	    							logoName:'<img src="images/logo_android_min.png" style="vertical-align:middle;"></img> Andriod',
	    							value : ["1"]
	    							
	    						},{
	    							platform : 2,
	    							platformname: "iOS",
	    							logoName:'<img src="images/logo_apple_min.png" style="vertical-align:middle;"></img> iOS',
	    							value : ["2"]
	    						},{
	    							platform : 3,
	    							platformname: "Andriod+iOS",
	    							value : ["1","2"]
	    						}]
	    					}else if(item1.platform == 7){
	    						item1.platformList = [{
	    							platform : 7,
	    							platformname: "所有平台",
	    							logoName:'<img src="images/logo_all_min.png" style="vertical-align:middle;"></img> 所有平台',
	    							value : ["1","2","4"]
	    						},{
	    							platform : 1,
	    							platformname: "Andriod",
	    							logoName:'<img src="images/logo_android_min.png" style="vertical-align:middle;"></img> Andriod',
	    							value : ["1"]
	    						},{
	    							platform : 2,
	    							platformname: "iOS",
	    							logoName:'<img src="images/logo_apple_min.png" style="vertical-align:middle;"></img> iOS',
	    							value : ["2"]
	    						},{
	    							platform : 4,
	    							platformname: "WP7",
	    							logoName:'<img src="images/logo_winp_min.png" style="vertical-align:middle;"></img> WP7',
	    							value : ["4"]
	    						}]
	    					}
	    					if(item.productid == data.currentProductId && item1.categoryId == data.categoryId){

	    						selectedcategoryPlantform = item1;
	    						plantformList = item1.platformList;
	    						angular.forEach(item1.platformList, function(it){
	    							if(it.platform ==7){
	    								selectedPlantform = it;
	    							}
	    						});
	    						if(!selectedPlantform){
	    							selectedPlantform = item1.platformList[0];
	    						}
	    						/*
	    						selectedcategoryPlantform = item1;
	    						plantformList = item1.platformList;
	    						if(item1.platformList!=null&&item1.platformList.length>3){
    								selectedPlantform = item1.platformList[3];
    							}else if(item1.platformList!=null){
    								selectedPlantform = item1.platformList[1];
    							}
	    						
	    					*/}
	    				});
    				});
    				scope.productList = productList;

    				scope.categoryList = categoryList;
    				scope.currentProduct = selectedProduct;
    				scope.platformlist = selectedcategoryPlantform.platformList;
    				scope.currentPlatForm = selectedPlantform;
    				scope.currentCategory = selectedcategory;
    				scope.iscurrentPlatForm=true;
    				if(scope.currentCategory.platcategory==1||scope.currentCategory.platcategory==3){
    					scope.iscurrentPlatForm=false;
    				}
    				scope.appkey =scope.currentProduct.appkey;
					scope.backupProductId = scope.currentProduct.productid;
					scope.backupPlatFormId = scope.currentPlatForm.platform;
					
					scope.backupCategoryId = scope.currentCategory.platcategory;
					scope.$watch('currentProduct',function(e){
						if(scope.backupProductId != scope.currentProduct.productid){
							var d ={	partnerKeys :[],
    	    						versionKeys :[],
    	    						userSegKeys :[]
	    						};
							appConfig.UserCondition.filterBox=d;
							//重新初始化platform，并不触发platform下拉框对外onchange事件
							var selectedIndx = scope.currentProduct.categoryList.length-1;
							scope.backupPlatFormId = scope.currentProduct.categoryList[0].platform;
							scope.categoryList = scope.currentProduct.categoryList;
							if(scope.categoryList[1]!=null&&scope.categoryList[2]!=null&&scope.categoryList[1].platcategory==1&&scope.categoryList[2].platcategory==2){
								var categorytemp=scope.categoryList[1];
								scope.categoryList[1]=scope.categoryList[2];
								scope.categoryList[2]=categorytemp;
							}
							scope.currentCategory = scope.currentProduct.categoryList[0];
							
							scope.backupProductId = scope.currentProduct.productid;
							scope.appkey =scope.currentProduct.appkey;
							var registerTime = 0;
							if(angular.isString(scope.currentProduct.registertime)){
								var registerDate = scope.currentProduct.registertime.split(" ");
								registerTime = new Date(registerDate[0]).getTime();
							}else{
								registerTime = scope.currentProduct.registertime;
							}
							appConfig.ProductOption.registertime=registerTime;
							appConfig.ProductOption.appkey=scope.appkey;
							appConfig.ProductOption.currentProductId = scope.currentProduct.productid;
							appConfig.ProductOption.categoryId = scope.currentCategory.platcategory;
							scope.iscurrentPlatForm=true;
		    				if(appConfig.ProductOption.categoryId==1 ||scope.currentCategory.platcategory==3){
		    					scope.iscurrentPlatForm=false;
		    				}
		    				var noBroadcast = false;
		    				if(scope.backupCategoryId != scope.currentCategory.platcategory){
		    					scope.backupCategoryId = scope.currentCategory.platcategory;
		    					noBroadcast = true;
		    				}
							angular.forEach(scope.currentProduct.categorys, function(item){
								 if(item.categoryId==scope.backupCategoryId){
									 	var selectedIndx = item.platformList.length-1;
										scope.backupPlatFormId = item.platformList[selectedIndx].platform;
										scope.platformlist = item.platformList;
										angular.forEach(item.platformList, function(it){
			    							if(it.platform ==item.platform){
			    								scope.currentPlatForm = it;
			    							}
			    						});
										appConfig.ProductOption.currentPlatformId = scope.currentPlatForm.platform;
								 }
							});
							scope.broadcastChange(noBroadcast);
							if(noBroadcast){
								scope.switchCategory(scope.backupCategoryId);
							}
						}
	    			});
					scope.$watch('currentCategory',function(e){
	    				if(scope.backupCategoryId != scope.currentCategory.platcategory){
	    					var d ={	partnerKeys :[],
	    	    						versionKeys :[],
	    	    						userSegKeys :[]
    	    						};
	    					appConfig.UserCondition.filterBox=d;
	    					var lastCategoryId = scope.backupCategoryId
							scope.backupCategoryId = scope.currentCategory.platcategory;
							appConfig.ProductOption.categoryId = scope.currentCategory.platcategory;
							scope.iscurrentPlatForm=true;
		    				if(appConfig.ProductOption.categoryId==1 || scope.currentCategory.platcategory==3){
		    					scope.iscurrentPlatForm=false;
		    				}
							angular.forEach(scope.currentProduct.categorys, function(item){
								 if(item.categoryId==scope.backupCategoryId){
									 	var selectedIndx = item.platformList.length-1;
										scope.backupPlatFormId = item.platformList[selectedIndx].platform;
										scope.platformlist = item.platformList;
										angular.forEach(item.platformList, function(it){
			    							if(it.platform ==item.platform && item.categoryId == scope.currentCategory.platcategory){
			    								scope.currentPlatForm = it;
			    							}
			    						});
										appConfig.ProductOption.currentPlatformId = scope.currentPlatForm.platform;
										if((lastCategoryId == 1 || lastCategoryId==2) 
												&& scope.backupCategoryId ==1 || scope.backupCategoryId==2){
											scope.broadcastChange();
										}
								 }
							});
							scope.switchCategory(scope.currentCategory.platcategory);
						}
	    			});
					scope.switchCategory = function(platcategory){
						if(platcategory == 0){
							scope.go("nativepage/summarize");
						}else if(platcategory == 1){
							scope.go("webpage/summarize");
						}else if(platcategory == 2){
							scope.go("webpage/summarize");
						}else if(platcategory == 3){
							scope.go("crosspage/summarize");
						}
					}
	    			scope.$watch('currentPlatForm',function(e){
	    				if(scope.backupPlatFormId != scope.currentPlatForm.platform){
							scope.backupPlatFormId = scope.currentPlatForm.platform;
							appConfig.ProductOption.currentPlatformId = scope.currentPlatForm.platform;
							scope.broadcastChange(); 
						}
	    			}); 
    			};
    				
    			scope.broadcastChange = function(noBroadcast){
    				if(!scope.currentPlatForm || !scope.currentProduct) return;
    				var productid = scope.currentProduct.productid;
    				var platformid = scope.currentPlatForm.value;
    				var platcategory = scope.currentCategory.platcategory;
    				if(productid && platformid){
    					BreakCrumbService.setBreakCrumbData({
        					productid : [].concat(productid+""),
        					platformid : platformid,
        					platcategory:platcategory+"",
        					noBroadcast : noBroadcast,
        					productname:scope.currentProduct.productname
    					})
    				}
    			};
    			
    			scope.go = function(url){
    				$state.go(url);
    			};
    		}
    	}
    }]);
    angularAMD.factory('BreakCrumbService', [ '$rootScope','$http','ConditionService', function($rootScope,$http,ConditionService) {
    	var productData = undefined; 
        return {
        	setBreakCrumbData : function(data){
        		if(!appConfig.UserCondition)
        			appConfig.UserCondition = {};
				if(!appConfig.UserCondition.BreakCrumbData)
					appConfig.UserCondition.BreakCrumbData = {};
        		angular.extend(appConfig.UserCondition.BreakCrumbData, data);
        		ConditionService.setSessionAttribute("UserCondition", appConfig.UserCondition);
        		ConditionService.setSessionAttribute("ProductOption", appConfig.ProductOption);
        		if(!data.noBroadcast){
        			ConditionService.setBreakCrumbData(data);
        		}
        	}
        };
	}]);
});
