define(['app','angularAMD','app/filter/DateStrSubstringmin15'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdSelectPanl',['$rootScope','ConditionService','$state','$timeout', 
        function($rootScope,$state,$timeout) {
    	return {
    		 require: '?ngModel',
    		restrict : 'EA',
    		transclude : true,
    		scope :{
    			tdChange: "&",
        		syndata : "&",
        		options : "="
    		},
    		templateUrl : "js/app/directive/template/td-select-panl.html",
    		link : function($scope, element, attr, ngModel){
    			var select = $(element).find(".td-select1");
    			var ul = $(element).find(".searchPane");
    			var flag = false;
    			ngModel.$render = function() {
    				var modelValue = angular.isObject(ngModel.$viewValue) ? ngModel.$viewValue.value : ngModel.$viewValue;
    				$scope.val = (modelValue || '');
	            };
	            $scope.showSearching = function(){
	            	if(select && select.width){
	            		ul.attr("style","min-width:"+select.width()+"px");
	            	}
	            	if(!flag){
	            		$(select.find("ul")).show();
	            		$(select.find("div")).show();
	            		flag=true;
	            	}else{
	            		$(select.find("ul")).hide();
	            		$(select.find("div")).hide();
	            		flag=false;
	            	}
	            	
	    			$("body").unbind("mousedown", $scope.onBodyDown);
	            	$("body").bind("mousedown", $scope.onBodyDown);
	            }
	            $scope.onChange = function(val){
	            	$scope.searching = false;
//	            	$scope.showSearching();
	            	if(angular.isFunction($scope.syndata)){
	            		$scope.syndata()(val);
	            	}
	            };
	            $scope.seletedItem = function(key,value,obj){
	            	$scope.val = value;
	            	if(angular.isFunction($scope.tdChange)){
	            		$scope.tdChange()(key,value,obj);
	            	}
	            	$(select.find("ul")).hide();
	            	$(select.find("div")).hide();
	            	flag=false;
	            };
	            $scope.hideMenu = function() {
	            	$(select.find("ul")).hide();
	            	$(select.find("div")).hide();
            		flag=false;
	    			
	    		}
	    		$scope.onBodyDown = function(event) {
	    			var $target = $(event.target);
	    			if (!(select.find("div").find("input").attr("ng-model") == $target.attr("ng-model") 
	    					|| "opt in options" == $target.attr("ng-repeat")
	    					|| "showSearching();" == $target.attr("ng-click")
	    					|| "p-abs" == $target.attr("class")
	    					|| "lyphicon glyphicon-search p-abs" == $target.attr("class")
	    					|| "searchPane mt-i40" == $target.attr("class")
	    					|| select.find("div").find("input").attr("ng-model") == $target.parent().find("input").attr("ng-model"))) {
    					$scope.hideMenu();
	    			}
	    		}
    		}
    	}
    }]);
});
