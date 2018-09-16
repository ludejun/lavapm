define([], function () {
  'use strict';
  return [{
	    state : 'user',
		url : '/user',
		templateUrl : 'html/user/list/UserProfileList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileListController'
		
	}, {
	    state : 'userProfiles',
		url : '/user/userProfiles',
		templateUrl : 'html/user/list/UserProfileList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileListController'
		
	}
  	, {
	    state : 'userProfiles_crowdId',
		url : '/user/userProfiles/:crowdId/:parentHash',
		templateUrl : 'html/user/list/UserProfileList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileListController'
		
	}, {
		state : 'userProfiles_new',
		url : '/user/userProfiles/new',
		templateUrl : 'html/user/form/UserProfileForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileFormController'
		
	}, {
		state : 'userProfiles_edit',
		url : '/user/userProfiles/edit/:userProfileId',
		templateUrl : 'html/user/form/UserProfileForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileFormController'
	}, {
		state : 'userProfiles_view',
		url : '/user/userProfiles/view/:userProfileId/crowdId/:crowdId',
		templateUrl : 'html/user/view/UserProfileView.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/user/UserProfileViewController'
	}];
});

