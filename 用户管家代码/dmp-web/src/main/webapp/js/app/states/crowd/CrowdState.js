define([], function () {
  'use strict';
  return [{
	    state : 'crowd',
		url : '/crowd',
		templateUrl : 'html/crowd/list/CrowdList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdListController',
		ncyBreadcrumb: {
		    label: '人群管理'
		}
	},{
	    state : 'crowd_portrait',
		url : '/crowd/crowds/:crowdId/portrait/:parentHash',
		templateUrl : 'html/crowd/list/CrowdPortraitOp.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdPortraitOpController',
		ncyBreadcrumb: {
		    label: '构建人群画像: {{crowdName}}',
		    parent: 'crowd'
		}
	},{
	    state : 'crowds_export',
		url : '/crowd/crowds/export/:crowdId/sourcePage/:sourcePage',
		templateUrl : 'html/crowd/list/CrowdExport.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdExportController',
		ncyBreadcrumb: {
		    label: '人群导出'
		}
	}, {
	    state : 'crowds',
		url : '/crowd/crowds',
		templateUrl : 'html/crowd/list/CrowdList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdListController',
		ncyBreadcrumb: {
		    label: '标签人群',
		    parent: 'crowd'
		}
	}, {
		state : 'crowds_new',
		url : '/crowd/crowds/new',
		templateUrl : 'html/crowd/form/CrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdFormController',
		ncyBreadcrumb: {
		    label: '添加标签人群',
		    parent: 'crowd'
		}
	}, {
		state : 'crowds_edit',
		url : '/crowd/crowds/edit/:crowdId',
		templateUrl : 'html/crowd/form/CrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdFormController',
		ncyBreadcrumb: {
		    label: '编辑标签人群',
		    parent: 'crowd'
		}
	}];
});

