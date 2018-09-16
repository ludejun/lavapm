define([], function () {
  'use strict';
  return [{
	    state : 'tag',
		url : '/tag',
		templateUrl : 'html/tag/list/TagList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagListController'
		
	}, {
	    state : 'tags',
		url : '/tag/tags',
		templateUrl : 'html/tag/list/TagList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagListController'
		
	}, {
		state : 'tags_new',
		url : '/tag/tags/new',
		templateUrl : 'html/tag/form/TagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagFormController'
		
	}, {
		state : 'tags_edit',
		url : '/tag/tags/edit/:tagId',
		templateUrl : 'html/tag/form/TagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagFormController'
		
	}];
});

