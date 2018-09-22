define(['app','angularAMD','app/filter/DateStrSubstringmin10','app/filter/platformFilter'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdSelectVersionmin',['$rootScope','ConditionService','$state','$timeout', 
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
    		templateUrl : "js/app/directive/template/td-select-versionmin.html",
    		link : function($scope, element, attr, ngModel){
    			var select = $(element).find(".td-select");
    			var ul = $(element).find(".searchPane");
    			var flag = false;
    			ngModel.$render = function() {
    				var modelValue = angular.isObject(ngModel.$viewValue) ? ngModel.$viewValue.value : ngModel.$viewValue;
    				var modelimg = angular.isObject(ngModel.$viewValue) ? ngModel.$viewValue.img : ngModel.$viewValue;
    				$scope.val = (modelValue || '');
    				if(modelimg && modelimg!=''){
    					$scope.img = (modelimg || '');
    				}
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
	            	if(!val){
	            		val="";
	            	}
//	            	$scope.searching = false;
//	            	$scope.showSearching();
	            	if(angular.isFunction($scope.syndata)){
	            		$scope.syndata()(val);
	            	}
	            };
	            $scope.onBlur =function(){
	            	setTimeout(function(){
	            		$scope.$apply(function(){
	            			$scope.searching = false;
	            			$scope.issearching=false;
	            		})
	            	},200)
	            };
	            $scope.seletedItem = function(key,value,obj){
//	            	ngModel.$setViewValue(key);
            		$scope.val = value;
            		$scope.img = obj.img;
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
	    					|| "{'pl-20':img==1}" == $target.attr("ng-class")
	    					|| "opt in options" == $target.attr("ng-repeat")
	    					|| "showSearching();" == $target.attr("ng-click")
	    					|| "p-abs" == $target.attr("class")
	    					|| "searchPane mt-i30" == $target.attr("class")
	    					|| select.find("div").find("input").attr("ng-model") == $target.parent().find("input").attr("ng-model"))) {
    					$scope.hideMenu();
	    			}
	    		}
    		}
    	}
    }]);
});
