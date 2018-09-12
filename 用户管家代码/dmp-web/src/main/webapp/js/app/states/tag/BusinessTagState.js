define([], function () {
  'use strict';
  return [{
	    state : 'businessTags',
		url : '/tag/businessTags',
		templateUrl : 'html/tag/list/BusinessTagList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/BusinessTagListController'
		
	}, {
		state : 'businessTags_new',
		url : '/tag/businessTags/new',
		templateUrl : 'html/tag/form/BusinessTagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/BusinessTagFormController'
		
	}, {
		state : 'businessTags_edit',
		url : '/tag/businessTags/edit/:tagId',
		templateUrl : 'html/tag/form/BusinessTagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/BusinessTagFormController'
		
	}];
});

