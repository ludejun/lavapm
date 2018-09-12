define([], function () {
  'use strict';
  return [{
	    state : 'systemTags',
		url : '/tag/systemTags',
		templateUrl : 'html/tag/list/SystemTagList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/SystemTagListController',
		ncyBreadcrumb: {
		    label: '系统标签',
		    parent: 'tag'
		}
	}, {
		state : 'systemTags_new',
		url : '/tag/systemTags/new',
		templateUrl : 'html/tag/form/SystemTagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/SystemTagFormController',
		ncyBreadcrumb: {
		    label: '添加系统标签',
		    parent: 'tag'
		}
	}, {
		state : 'systemTags_edit',
		url : '/tag/systemTags/edit/:systemTagId',
		templateUrl : 'html/tag/form/SystemTagForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/SystemTagFormController',
		ncyBreadcrumb: {
		    label: '编辑系统标签',
		    parent: 'tag'
		}
	}];
});

