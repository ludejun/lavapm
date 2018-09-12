define(['angularAMD', 'app'], function (angularAMD) {
  'use strict';
  angularAMD.controller('NavMenuController', ['$scope','$rootScope', '$state','$http', function ($scope,$rootScope, $state,$http) {
	  $rootScope.standAlone = !(window.parent && window.parent.onHashChange);
	  
	  $scope.menuList = angular.copy(appConfig.menuList);
	  $scope.user = angular.copy(appConfig.user);
	  $scope.urlMap = angular.copy(appConfig.urlMap);
	  $scope.changeUser = {};
	  //修改密码
	  $scope.updatePassword =function(callback){
		  if(!$scope.changeUser.oldPassword){
			  $.Pop.alerts("请输入原始密码");
			  return ;
		  }
		  if(!$scope.changeUser.newPassword){
			  $.Pop.alerts("请输入新密码");
			  return ;
		  }
		  if(!$scope.changeUser.repassword){
			  $.Pop.alerts("请输入确认密码");
			  return ;
		  }
		  if($scope.changeUser.repassword !== $scope.changeUser.newPassword){
			  $.Pop.alerts("新密码与确认密码不一致");
			  return ;
		  }
		  $http({
				method:'post',
				url:'changeUserPassword.do',
				data: {'oldPassword':$scope.changeUser.oldPassword,'newPassword':$scope.changeUser.newPassword},
				config:{
					'Content-Type' : 'application/json'
				}
			})
			.success(function(data) {
				if(data.errMsg){
					$.Pop.alerts(data.errMsg);
				}else if(data.msg){
					$scope.changeUser.oldPassword = "";
					$scope.changeUser.newPassword = "";
					$scope.changeUser.repassword = "";
					$.Pop.alerts(data.msg);
					callback.call();
				}
		    })
		    .error(function(data) {
		    	$.Pop.alerts("网络异常");
		    });
	  }
	  
	  $scope.logout = function(){		  
		  $http({
			  method : 'get',
			  	url : 'logout',
			  		data : {},
					config : {}
				}).success(function(data) {
					if(data && data.loginUrl){
						window.location.href = data.loginUrl;
					}
					
					
		  }).error(function(data) {
			  $.Pop.alerts("退出异常");
		  });
	  }
	  
	  $scope.$on('$stateChangeSuccess', 
			  function(event, toState, toParams, fromState, fromParams){
		  var module = toState.url.split('/')[1];		  
		  for(var i=0; i<$scope.menuList.length; i++){
			  if(module == $scope.menuList[i].extAttr2){
				  $scope.menuList[i].active = 'active';
			  } else {
				  $scope.menuList[i].active = '';
			  }
		  }
	  });
  }]);

  angularAMD.directive('navMenu', function () {
    return {
      restrict: 'A',
      controller: 'NavMenuController',
      templateUrl: 'html/common/nav.html'
    };
  });
});
