define(['app','angularAMD','app/filter/interceptURL'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdMenu',['$rootScope','ConditionService','$state','$timeout', 
        function($rootScope,$state,$timeout) {
    	return {
    		restrict : 'EA',
    		transclude : true,
    		templateUrl : "js/app/directive/template/td-menu.html",
    		link : function($scope){
    			$scope.convertStateConfig = {
    				"/nativepage/User_Country":"/nativepage/User_Area",
    				"/nativepage/pixelInfo":"/nativepage/userDeviceType",
    				"/nativepage/userOs":"/nativepage/userDeviceType",
    				"/nativepage/User_Channel":"/nativepage/IspinInfo",
    				"/nativepage/userErrorDetail":"/nativepage/userError",
    				"/nativepage/userKindOfError":"/nativepage/userError",
    				"/nativepage/UserKeepInfo1":"/nativepage/UserKeepInfo",
    				"/nativepage/userKeepFunnel":"/nativepage/keepLoseDistribute",
    				"/nativepage/customDetailed":"/nativepage/customEvent",
    				"/webpage/User_Country":"/webpage/User_Area",
    				"/webpage/userOs":"/webpage/pixelInfo",
    				"/webpage/customDetailed":"/webpage/customEvent",
    				"/crosspage/User_Country":"/crosspage/User_Area",
    				"/crosspage/UserKeepInfo1":"/crosspage/UserKeepInfo",
    				"/crosspage/userKeepFunnel":"/crosspage/keepLoseDistribute",
    				"/crosspage/analysisTrend":"/crosspage/userDistribution",
    				"/crosspage/customDetailed":"/crosspage/customEvent",
    				"/nativepage/VersionInfoList":"/nativepage/VersionInfo",
    				"/nativepage/partnerDataDetail":"/nativepage/partnerData",
    				"/nativepage/FirstDayKeepInfo":"/nativepage/UserKeepInfo",
    				"/crosspage/FirstDayKeepInfo":"/crosspage/UserKeepInfo",
    				"/crosspage/customFunnel":"/crosspage/customFunnelSummarize",
    				"/nativepage/customFunnel":"/nativepage/customFunnelSummarize",
    				"/webpage/customFunnel":"/webpage/customFunnelSummarize"
    				
    			};
    			$scope.convertState = function(state){
    				if(state.split("/").length > 3){
						state = state.substring(0,state.lastIndexOf("/"));
    				}
    				var convertedState = $scope.convertStateConfig[state];
    				if(convertedState){
    					return convertedState;
    				}
    				return state;
    			};
    			$scope.toggle = function(menu,m,type,everTrue){
    				angular.forEach(menu, function(d){
    					var loopChild = true;
    					if(d.resourceId == m.resourceId){
    						if(everTrue){
    							d[type] = true;
    						}else{
    							d[type] = !d[type];
    						}
    						loopChild = false;
    					}else{
    						d[type] = false;
    					}
    					if(d.childrens.length>0 && loopChild){
    						$scope.toggle(d.childrens,m,type,everTrue);
    					}
    				});
    			};
    			$scope.selectMenuByState = function(menu, stateUrl){
    				for(var i=0; i<menu.length; i++){
    					menu[i].show = false;
    					stateUrl = $scope.convertState(stateUrl);
						if(menu[i].resourceUri == "#"+stateUrl){
							$scope.toggle(menu,menu[i],"show",true);
						}
    					for(var j=0;j<menu[i].childrens.length;j++){
    						var m = menu[i].childrens[j];
    						var resourceUri = m.resourceUri.split("?")[0];
    						if(resourceUri == "#"+stateUrl){
    							$scope.toggle(menu,menu[i],"show",true);
    							$scope.toggle(menu,m,"selected",true);
    						}
    					}
    				}
    			};
    			$scope.$on('$stateChangeSuccess', 
  					  function(event, toState, toParams, fromState, fromParams){
    			  if(toState.state == "productDetails"){
    				  $scope.showAccordMenu = false;
    			  }
  				  var module = toState.url.split('/')[1];		  
  				  for(var i=0; i<$scope.menuList.length; i++){
  					  if(module == $scope.menuList[i].extAttr2){
  						  $scope.menu = $scope.menuList[i].childrens;
  						  $scope.menuList[i].active = 'active';
  						  if($scope.menuList[i].extAttr4 == "hideAccordionMenu"){
  							  $scope.showAccordMenu = false;
  						  }else{
  							  $scope.showAccordMenu = true;
  							  $scope.selectMenuByState($scope.menu, toState.url);
  						  }
  					  } else {
  						  $scope.menuList[i].active = '';
  					  }
  				  }
  			  });
    		}
    	}
    }]);
});
