define(['angularAMD', 'app'], function (angularAMD) {
  'use strict';
  angularAMD.controller('SearchController', ['$scope', function ($scope) {
	  $scope.clearSearchValue = function(){
		  $scope.searchValue = "";
		  $scope.search();
	  }
	  
	  var windowObj = window.parent || window;
	  $(windowObj).bind('resize', function () {
		  if($scope.calNgTableBody){
			  $scope.calNgTableBody(); 
		  }
	  });
	  
	  $scope.switchMoreSearch = function(){
		  $scope.isShowMoreSearch = !$scope.isShowMoreSearch;
		  $scope.resetMoreSearchCondition();
		  
		  if($scope.calNgTableBody){
			  window.setTimeout(function(){
				  $scope.calNgTableBody(); 
			  },50);
		  }
		  
		  if(window.parent && window.parent.iFrameHeight){
			  window.setTimeout(window.parent.iFrameHeight,200);
		  }
	  }
	  
	  $scope.keydownSearchValue = function(event){
		  var e = event || window.event || arguments.callee.caller.arguments[0];          
		  if(e && e.keyCode==13){
			  $scope.search();
          }
	  }
	  
	  $scope.focusSearchValue = function(){
		  $scope.placeholder = "";
	  }
	  
	  $scope.blurSearchValue = function(){
		  $scope.placeholder = "请输入关键字";
	  }
	  
	  $scope.initSearch = function(){
		  $scope.searchValue = "";
		  $scope.placeholder = "请输入关键字";
	  }
	  $scope.initSearch();
	  
  }]);

  angularAMD.directive('search', function () {
      return {
        restrict: 'A',
        controller: 'SearchController',
        templateUrl: 'html/common/search.html'
      };
   });
   
});
    
