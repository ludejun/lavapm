define([], function () {
  'use strict';
  return [{
	    state : 'tagCategories',
		url : '/tag/tagCategories',
		templateUrl : 'html/tag/list/TagCategoryList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCategoryListController',
		ncyBreadcrumb: {
		    label: '标签分类',
		    parent: 'tag'
		}
	}, {
		state : 'tagCategories_new',
		url : '/tag/tagCategories/new',
		templateUrl : 'html/tag/form/TagCategoryForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCategoryFormController',
		ncyBreadcrumb: {
		    label: '添加分类',
		    parent: 'tag'
		}
	}, {
		state : 'tagCategories_edit',
		url : '/tag/tagCategories/edit/:tagCategoryId',
		templateUrl : 'html/tag/form/TagCategoryForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCategoryFormController',
		ncyBreadcrumb: {
		    label: '编辑分类',
		    parent: 'tag'
		}
	}];
});

