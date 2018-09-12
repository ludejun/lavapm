define(['angularAMD','i18n!app/nls/Root','jquery-scroll'], function (angularAMD,nlsRoot) {
  'use strict';
  angularAMD.controller('AccordionMenuController', ['$scope', '$state','$http','$location', function ($scope, $state,$http,$location) {
	  $scope.nlsRoot = nlsRoot;
	  $scope.toggleMenuLeft = function(node){
		  //console.dir(["node",node]);
		  for(var i=0; i<$scope.menuList.length; i++){
			  if(node.extAttr2 == $scope.menuList[i].extAttr2){
				  $scope.menuList[i].show = !$scope.menuList[i].show; 
			  }else{
				  $scope.menuList[i].show = false; 
			  }
		  }
		  
		  /*if(window.parent && window.parent.iFrameScrollHeight){
			  window.setTimeout(window.parent.iFrameScrollHeight,200);
		  }*/
		  
	  }
	  
	  $scope.searchMenuList = function(){
		  var $menu_scroll = $('#menu-scroll');
		  var $content_mid = $menu_scroll.find(".content_mid");
		  var $scroll_btn = $menu_scroll.find(".scroll_btn");
		  $content_mid.css({"margin-top":"0"});
		  $scroll_btn.css({"top":"0"});
	  }
	  
	  
	  $scope.$on('$stateChangeSuccess', 
			function(event, toState, toParams, fromState, fromParams){
	  		var md = toState.url.split('/')[1];
	  		$scope.curMenuUri = '#'+toState.url;
	  		for(var i=0; i<$scope.menuList.length; i++){
	  			$scope.menuList[i].show = false; 
	  			if(md == $scope.menuList[i].extAttr2){
	  				$scope.menuList[i].show = true;
	  			}
	  		}
	  		
	  		/*if(!$scope.isLoadingMenu){
	  			$scope.isLoadingMenu = true;*/
		  		$scope.scrollMenu();
	  		//}
	  });
	  
	  $scope.scrollMenu = function(){
		  var $menu_left = $('#menu-left');
		  $.jqueryScroll($menu_left.parent(),$menu_left,"v",false,false);
		  
		  /*$menu_left.parent().bind('mouseover',function(){
			  var $bottom_scroll = $menu_left.siblings(".bottom_scroll");
			  $bottom_scroll.removeClass("hide");
		  }).bind('mouseout',function(){
			  var $bottom_scroll = $menu_left.siblings(".bottom_scroll");
			  $bottom_scroll.addClass("hide");
		  });*/
	  }
	  
	  $scope.mouseoverLogout = function(){
		  $scope.isShowLogout = true;
	  }
	  
	  $scope.mouseoutLogout = function(event){
		  $scope.isShowLogout = false;
	  }
	  
	  $scope.IframeOnClick = {
		resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function() {
            this.element = arguments[0];
            this.cb = arguments[1];
            this.hasTracked = false;
        },
        track: function(element, cb) {
            this.iframes.push(new this.Iframe(element, cb));
            if (!this.interval) {
                var _this = this;
                this.interval = setInterval(function() { _this.checkClick(); }, this.resolution);
            }
        },
        destory: function(element) {
            for (var i in this.iframes) {
                if (element == this.iframes[i].element) {
                    this.iframes.pop(this.iframes[i]);
                }
            }
        },
        checkClick: function() {
            if (document.activeElement) {
                var activeElement = document.activeElement;
                for (var i in this.iframes) {
                    if (activeElement === this.iframes[i].element) { // user is in this Iframe
                        if (this.iframes[i].hasTracked == false) {
                            this.iframes[i].cb.apply(window, []);
                            this.iframes[i].hasTracked = true;
                        }
                    } else {
                        this.iframes[i].hasTracked = false;
                    }
                }
            }
        }
	  }; 
	  
	  $scope.toggleLogout = function(){
		  $scope.isShowLogout = !$scope.isShowLogout;
		  if($scope.isShowLogout){
			  $("body").bind("mousedown", $scope.onBodyDown);
			  $scope.IframeOnClick.destory(document.getElementById("extern-pages"));
			  $scope.IframeOnClick.track(document.getElementById("extern-pages"), function() { 
				  $scope.$apply(function (){
					  $scope.isShowLogout = false;
				  });
			  });
		  }
	  }
	  
	  $scope.goToRuleSystem = function(){
		  $scope.isShowLogout = false;
		  $scope.isShowRuleSystem = true;
	  }
	  
	  $scope.onBodyDown = function(event) {
		  $scope.isShowRuleSystem = false;
		  if (!($(event.target).parents("#logout").length > 0 || $(event.target).hasClass("pop-bg") || $(event.target).parents(".pop-box").length > 0)) {
			  $scope.$apply(function (){
				  $scope.isShowLogout = false;
			  });
			  $("body").unbind("mousedown", $scope.onBodyDown);
		  }
	  }
	  
	  $scope.checkOldPasswordValid = function(){
		  $scope.isOldPasswordError = false;
		  $scope.newPasswordIsSame = false;
		  if($scope.changeUser.oldPassword && $scope.changeUser.oldPassword.indexOf(" ") != -1){
			  $scope.oldPasswordErrorText = '密码中不能包含空格字符';
			  $scope.isOldPasswordError = true;
		  }
	  }
	  
	  $scope.checkRepasswordValid = function(){
		  $scope.isOtherError = false; 
		  if($scope.changeUser.repassword != $scope.changeUser.newPassword){
			  $scope.repasswordIsError = true;
		  }else{
			  $scope.repasswordIsError = false;
		  }
		  
		  if($scope.changeUser.repassword && $scope.changeUser.repassword.indexOf(" ") != -1){
			  $scope.otherErrorText = '密码中不能包含空格字符';
			  $scope.isOtherError = true;
		  }
	  }
		
	  $scope.checkNewPasswordValid = function(){
		  $scope.isNewPasswordOtherError = false;
		  $scope.repasswordIsError = false;
		  if($scope.changeUser.oldPassword == $scope.changeUser.newPassword){
			  $scope.newPasswordIsSame = true;
		  }else{
			  $scope.newPasswordIsSame = false;
		  }
		  
		  if($scope.changeUser.newPassword && $scope.changeUser.newPassword.indexOf(" ") != -1){
			  $scope.newPasswordOtherErrorText = '密码中不能包含空格字符';
			  $scope.isNewPasswordOtherError = true;
		  }
	  }
	  
	  $scope.updatePassword =function(callback,formHorizontal){
		  if(!$scope.changeUser.oldPassword){
			  formHorizontal.oldPassword.$dirty = true;
			  return false;
		  }
		  
		  if($scope.isOldPasswordError){
			  return false;
		  }
		  
		  if(!$scope.changeUser.newPassword){
			  formHorizontal.newPassword.$dirty = true;
			  return false;
		  }
		  
		  if( $scope.isNewPasswordOtherError){
			  return false;
		  }
		  
		  if($scope.changeUser.oldPassword == $scope.changeUser.newPassword){
			  $scope.newPasswordIsSame = true;
			  return false;
		  }else{
			  $scope.newPasswordIsSame = false;
		  }
		  
		  if(!$scope.changeUser.repassword){
			  formHorizontal.repassword.$dirty = true;
			  return false;
		  }
		  if($scope.changeUser.repassword != $scope.changeUser.newPassword){
			  $scope.repasswordIsError = true;
			  return false;
		  }
		  
		  if($scope.isOtherError){
			  return false;
		  }
		  
		  $scope.repasswordIsError = false;
		  $scope.isOldPasswordError = false;
		  $scope.isNewPasswordOtherError = false;
		  $scope.isOtherError = false;
		  var oldPassword = $scope.changeUser.oldPassword;//$.encode64($scope.changeUser.oldPassword);
		  var newPassword = $scope.changeUser.newPassword;//$.encode64($scope.changeUser.newPassword);
		  $http({
				method:'post',
				url:'changeUserPassword.do',
				data: {'oldPassword':oldPassword,'newPassword':newPassword},
				config:{
					'Content-Type' : 'application/json'
				}
			})
			.success(function(data) {
				if(data.errMsg){
					if(data.errMsg == '原始密码不正确'){
						$scope.isOldPasswordError = true;
						$scope.oldPasswordErrorText = '原始密码不正确';
					}else{
						$scope.isOtherError = true;
						$scope.otherErrorText = data.errMsg;
					}
					/*$.Pop.alerts(data.errMsg);*/
				}else if(data.msg){
					$scope.changeUser.oldPassword = "";
					$scope.changeUser.newPassword = "";
					$scope.changeUser.repassword = "";
					$.Pop.alerts(data.msg);
					callback.call();
				}
		    })
		    .error(function(data) {
		    	$scope.isOtherError = true;
		    	$scope.otherErrorText = "网络异常";
		    	//$.Pop.alerts("网络异常");
		    });
	  }
	  
	  $scope.showUpdatePasswordLayer = function(){
		  $scope.changeUser = {};
		  $scope.repasswordIsError = false;
		  $scope.newPasswordIsSame = false;
		  $scope.isOldPasswordError = false;
		  $scope.isOtherError = false;
		  $scope.isNewPasswordOtherError = false;
	  }
	  
	  $scope.initMenuLeft = function(){
		  $scope.isMutilApp = false;
		  $scope.hasTenantFlag = false;
		  var $mainFrame  = $('#main-frame', parent.document);
		  if($mainFrame.length > 0){
			  var appNum = $mainFrame.attr("appNum");
			  if(appNum && appNum > 1){
				  $scope.isMutilApp = true;
			  }
			  var hasTenantFlag = $mainFrame.attr("hasTenantFlag");
			  if(hasTenantFlag == 'true'){
				  $scope.hasTenantFlag = true;
			  }
		  }
	  }
	  
	  $scope.keeplive = function(errorCount){
			if(errorCount > 3){
				return;
			}
			$http({
				method:'get',
				url:'dmpWebKeepLive',
				data: {},
				config:{
					'Content-Type' : 'application/json'
				}
			}).success(function(data) {
				errorCount = 0;
		    }).error(function(data) {
		    	errorCount++;
		    });
			setTimeout(function(){
				$scope.keeplive(errorCount);
			},1000*60);
	  }
	  
	  $scope.initPageSetKey = function(){
		  $scope.pageSetKey = {
			  loginIndexLogo:'dmp.theme.login.logo',
			  loginText:'dmp.theme.login.text',
  			  loginCopyright:'dmp.theme.copy.right.text',
  			  loginBackground:'dmp.theme.login.background',
  			  productLogo:'dmp.theme.product.logo',
  			  appNavLogo:'dmp.theme.app.nav.logo',
  			  appMenuLogo:'dmp.theme.app.menu.logo',
		  };
		  $scope.initAppMenuLogo();
  	  }
	  
	  $scope.initAppMenuLogo = function(){
		  $scope.appMenuLogo = "/enterprise/images/app/common/logo2.png";
		  var windowObj = window.parent || window;
	  	  if(windowObj.appConfig && windowObj.appConfig[$scope.pageSetKey.appMenuLogo]){
	  		  $scope.appMenuLogo = windowObj.appConfig[$scope.pageSetKey.appMenuLogo];
	  	  }
	  }
	  
	  $scope.init = function(){
		  $scope.initPageSetKey();
		  
		  $scope.appVersion = angular.copy(appConfig.appVersion);
		  $scope.initMenuLeft();
		  $scope.keeplive(0);
		  $scope.menuList = angular.copy(appConfig.menuList);
		  $scope.curMenuUri = "";
		  $scope.searchMenuKeyword = "";
		  
		  $scope.accountName = appConfig.user.name;
		  $scope.accountEmail = appConfig.user.email;
	  }
	  $scope.init();
	  
  }]);

  angularAMD.directive('accordionMenu', function ($window) {
    return {
      restrict: 'A',
      controller: 'AccordionMenuController',
      templateUrl: 'html/common/accordion.html?v='+appConfig.appVersion,
      link: function(scope, elem, attrs) {
    	  var $win = $($window);
          scope.getWindowDimensions = function () {
        	  var $elem = $(elem);
        	  var $logo = $elem.find(".logo");
        	  var $search = $elem.find(".search");
        	  var $logout = $elem.find(".logout");
              return {
                  'h': $win.height(),
                  'w': $win.width(),
                  'logoHg':$logo.height(),
                  'searchHg':$search.height(),
                  'logoutHg':$logout.height()
              };
          };
          scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
              scope.calCulateMenuHeight = function(){
            	  var height = newValue.h - newValue.logoHg-newValue.searchHg-newValue.logoutHg - 21;
            	  return {
                      'height': height + 'px',
                  };
        	  }
          }, true);

          $win.bind('resize', function () {
              scope.$apply();
          });
	  }
    };
  });
});
