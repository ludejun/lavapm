define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdFilterPanel',['ConditionService', function(ConditionService) {
    	return {
    		restrict : 'EA',
    		transclude : true,
    		scope:{
    			title:"@panelTitle",
    			inner : "@panelInner",
    			sortCondition : "=",
    		},
    		templateUrl : "js/app/directive/template/td-filter-panel.html",
    		link: function(scope, elem, attrs) {
    			scope.selectPartners = [];
    			scope.selectVersions = [];
    			scope.selectUserSegs = [];
    			scope.$on("td-panel-filter-condition.onChange", function(
    					event, data) {
    				if(data.data){
    					scope.selectPartners = data.data.selectPartners;
    					scope.selectVersions = data.data.selectVersions;
    					scope.selectUserSegs = data.data.selectUserSegs;
    				}
    			});
    			scope.clear=function(){
    				scope.selectPartners = [];
        			scope.selectVersions = [];
        			scope.selectUserSegs = [];
    				appConfig.UserCondition.filterBox=[];
    				var data = {
        					partnerKeys : [],
        					versionKeys :[],
        					userSegKeys : [],
        					selectPartners:[],
        					selectVersions:[],
        					selectUserSegs:[],
    				}
    				if(!appConfig.UserCondition)
            			appConfig.UserCondition = {};
            		if(!appConfig.UserCondition.filterBox)
            			appConfig.UserCondition.filterBox = {};
            		if(true||!CommonUtils.equalsObj(appConfig.UserCondition.filterBox,data)){
            			angular.extend(appConfig.UserCondition.filterBox, data);
                		ConditionService.setSessionAttribute("UserCondition", appConfig.UserCondition);
                		ConditionService.setFilterBoxData(data);
            		}
    			}
    			scope.init=function(){
    				var filterdata = {};
        			if(appConfig.UserCondition!=null){
        				angular.copy(appConfig.UserCondition.filterBox,filterdata);
        			}
    				if(appConfig.UserCondition.filterBox!=null){
    					scope.selectPartners = angular.copy(appConfig.UserCondition.filterBox.selectPartners)
    					scope.selectVersions = angular.copy(appConfig.UserCondition.filterBox.selectVersions)
    					scope.selectUserSegs = angular.copy(appConfig.UserCondition.filterBox.selectUserSegs)
    				}
    			}
    			scope.init();
    		}
    	}
    }]);
});
