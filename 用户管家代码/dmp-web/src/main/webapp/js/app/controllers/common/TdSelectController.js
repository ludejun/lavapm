define(['angularAMD', 'app'], function (angularAMD) {
  'use strict';
  angularAMD.controller('TdSelectController', ['$scope','$rootScope', '$state','$http', function ($scope,$rootScope, $state,$http) {
	  $scope.selectTree = [];
	  $scope.isShowSelectList = false;
	  
	  $scope.toggleShowSelectList = function(){
		  if(document.all){
			  window.event.cancelBubble = true;
  	 	  }else{
  	 		  event.stopPropagation(); 
  	 	  }
		  $scope.isShowSelectList = !$scope.isShowSelectList;
		  
		  if($scope.isShowSelectList){
			  if(window.parent && window.parent.iFrameScrollHeight){
				  window.setTimeout(window.parent.iFrameScrollHeight,200);
			  } 
		  }else{
			  if(window.parent && window.parent.iFrameHeight){
				  window.setTimeout(window.parent.iFrameHeight,200);
			  }
		  }
	  }
	  
	  $scope.toggelShowChildren = function(tc){
		  tc.isShowChildren = !tc.isShowChildren;
		  if(document.all){
			  window.event.cancelBubble = true;
  	 	  }else{
  	 		  event.stopPropagation(); 
  	 	  }
	  }
	  
	  $scope.selectItemName = function(tc){
		  $scope.selectSearchObject.selectLabel = tc.name;
		  $scope.isShowSelectList = false;
		  $scope.selectCallback(tc);
	  }
	  
	  $scope.clickSelectList = function(){
		  if(document.all){
			  window.event.cancelBubble = true;
  	 	  }else{
  	 		  event.stopPropagation(); 
  	 	  }
	  }
	  
	  $scope.filterSelectVals = function(){
		  $scope.selectSearchObject.keyword = $scope.selectSearchObject.keyword || "";
		  for(var i = 0; i < $scope.selectTree.length;i++){
				if($scope.selectTree[i].name.indexOf($scope.selectSearchObject.keyword) != -1){
					$scope.selectTree[i].isShow = true;
					for(var j = 0;j < $scope.selectTree[i].children.length;j++){
						$scope.selectTree[i].children[j].isShow = true;
						$scope.selectTree[i].isShow = true;
						$scope.selectTree[i].isShowChildren = true;
					}
				}else{
					$scope.selectTree[i].isShow = false;
					for(var j = 0;j < $scope.selectTree[i].children.length;j++){
						if($scope.selectTree[i].children[j].name.indexOf($scope.selectSearchObject.keyword) != -1){
							$scope.selectTree[i].children[j].isShow = true;
							$scope.selectTree[i].isShow = true;
							$scope.selectTree[i].isShowChildren = true;
						}else{
							$scope.selectTree[i].children[j].isShow = false;
						}
						
					}
				}
			}
			$scope.checkIsNoTagCategory();
			
			if(window.parent && window.parent.iFrameScrollHeight){
				window.setTimeout(window.parent.iFrameScrollHeight,200);
			} 
		};
		
		$scope.clearSelectSearchObjectKey = function(){
			$scope.selectSearchObject.keyword = "";
			$scope.filterSelectVals();
		}
		
		$scope.checkIsNoTagCategory = function(){
			$scope.hasNoSelectDatas = true;
			for(var i = 0; i < $scope.selectTree.length;i++){
				if($scope.selectTree[i].isShow){
					$scope.hasNoSelectDatas = false;
					break;
				}
				for(var j = 0;j < $scope.selectTree[i].children.length;j++){
					if($scope.selectTree[i].children[j].isShow){
						$scope.hasNoSelectDatas = false;
						break;
					}
				}
			}
		}
		
  }]);

  angularAMD.directive('tdSelect', function () {
    return {
      restrict: 'A',
      controller: 'TdSelectController',
      templateUrl: 'html/common/select.html'
    };
  });
});
