define(['angularAMD','jquery-scroll'], function (angularAMD) {
  'use strict';
  angularAMD.controller('AccordionMenuController', ['$scope', '$state', function ($scope, $state) {
	  
	  
	  $scope.menuList = angular.copy(appConfig.menuList);
	  $scope.menu=$scope.menuList ;
	  $scope.curMenuUri = "";
	  $scope.showAccordMenu=true;
	  $scope.searchMenuKeyword = "";
	  
	 $scope.title="搜索";
  	$scope.getCurrFocus= function(callback){
  			$scope.title="";
  	}
  	$scope.bluFocus=function(callback){
  		if($scope.searchMenuKeyword==null||$scope.searchMenuKeyword==""){
  			$scope.title="搜索";
  		}
  		
  	}
  	 $scope.menuusermanage=false;
  	 $scope.menutempletmanage=false;
  	$scope.initMenuToFirst = function(){
		 var isGoFirstMenu = true;
		 var locationHash = location.hash;
		  if($scope.menuList && $scope.menuList.length > 0 && $scope.menuList[0].childrens.length > 0){
			  for(var i = 0;i<$scope.menuList.length;i++){
				  var childrens = $scope.menuList[i].childrens;
				  for(var j = 0;j < childrens.length;j++){
					 if(locationHash && childrens[j] && childrens[j].resourceUri && locationHash.indexOf(childrens[j].resourceUri) != -1){
						  isGoFirstMenu = false;
						  if(childrens[j].resourceUri == "#/nativepage/usermanage"){
							  $scope.menuusermanage=true;
						  }else if(childrens[j].resourceUri == "#/nativepage/templetmanage"){
							  $scope.menutempletmanage=true;
						  }
						  break;
					 }
				  }
				  if(!isGoFirstMenu){
					  break;
				  }
			  }
			  if(isGoFirstMenu){
				  location.hash = $scope.menuList[0].childrens[0].resourceUri;
			  }
		  }
	  }

  	
	$scope.initMenu = function(){
		 var isGoFirstMenu = true;
		 var locationHash = location.hash;
		  if($scope.menuList && $scope.menuList.length > 0 && $scope.menuList[0].childrens.length > 0){
			  for(var i = 0;i<$scope.menuList.length;i++){
				  var childrens = $scope.menuList[i].childrens;
				  for(var j = 0;j < childrens.length;j++){
						  isGoFirstMenu = false;
						  if(childrens[j].resourceUri == "#/nativepage/usermanage"){
							  $scope.menuusermanage=true;
						  }else if(childrens[j].resourceUri == "#/nativepage/templetmanage"){
							  $scope.menutempletmanage=true;
						  }
				  }
			  }
		  }
	  }
	  
	  
	  $scope.convertState = function(state){
			if(state.split("/").length > 3){
				state = state.substring(0,state.lastIndexOf("/"));
			}
			var convertedState = convertStateConfig[state];
			if(convertedState){
				return convertedState;
			}
			return state;
		};
	  
	  $scope.toggleMenuLeft = function(node){
		  for(var i=0; i<$scope.menu.length; i++){
			  if(node.extAttr2 == $scope.menu[i].extAttr2){
				  $scope.menu[i].show = !$scope.menu[i].show; 
			  }else{
				  $scope.menu[i].show = false; 
			  }
		  }
		  
		  if(window.parent && window.parent.iFrameScrollHeight){
			  window.setTimeout(window.parent.iFrameScrollHeight,200);
		  }
	  }
	  
	  $scope.searchMenuList = function(){
		  
	  }
	  
	  $scope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){
	  		var md = toState.url.split('/')[1];
	  		var curMenuUri = $scope.convertState(toState.url);
	  		$scope.curMenuUri = '#'+curMenuUri;
	  		for(var i=0; i<$scope.menuList.length; i++){
	  			$scope.menuList[i].show = false; 
	  			if(md == $scope.menuList[i].extAttr2){
	  				$scope.menuList[i].show = true; 
	  				$scope.menu = $scope.menuList[i].childrens;
	  				for (var int = 0; int < $scope.menu.length; int++) {
	  					$scope.menu[int].show =true;
					}
	  			}
	  		}
	  		
	  		
  			setTimeout(function(){
  				$scope.scrollMenu();
  			},200);
	  		
	  		/*if(window.parent && window.parent.iFrameScrollHeight){
				  window.setTimeout(window.parent.iFrameScrollHeight,200);
	  		}*/
	  		
	  		
	  	});
	  
	  $scope.scrollMenu = function(){
		  var $menu_left = $('#menu-left');
		  var $bottom_scroll = $menu_left.siblings(".bottom_scroll");
		  if($bottom_scroll.length >= 0){
			  return false;
		  }
		  $.jqueryScroll($menu_left.parent(),$menu_left,"v",false,true);
		  
		  $menu_left.parent().bind('mouseover',function(){
			  
			  $bottom_scroll.removeClass("hide");
		  }).bind('mouseout',function(){
			  /*var $bottom_scroll = $menu_left.siblings(".bottom_scroll");
			  $bottom_scroll.addClass("hide");*/
		  });
	  }
	  
	  $scope.initMenuToFirst();
	  $scope.initMenu();
	  
  }]);

  angularAMD.directive('accordionMenu', function () {
    return {
      restrict: 'A',
      controller: 'AccordionMenuController',
      templateUrl: 'js/app/directive/template/accordion.html'
    };
  });
});
