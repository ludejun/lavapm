define([], function () {
  'use strict';
  return [{
	    state : 'lookalikeCrowds',
		url : '/crowd/lookalikeCrowds',
		templateUrl : 'html/crowd/list/LookalikeCrowdList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/LookalikeCrowdListController',
		ncyBreadcrumb: {
		    label: '相似人群',
		    parent: 'crowd'
		}
	}, {
		state : 'lookalikeCrowds_new',
		url : '/crowd/lookalikeCrowds/new',
		templateUrl : 'html/crowd/form/LookalikeCrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/LookalikeCrowdFormController',
		ncyBreadcrumb: {
		    label: '添加相似人群',
		    parent: 'crowd'
		}
	},{
	    state : 'lookalike_crowds_export',
		url : '/crowd/lookalikeCrowds/export/:lookalikeCrowdId',
		templateUrl : 'html/crowd/list/CrowdExport.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdExportController',
		ncyBreadcrumb: {
		    label: '相似人群导出'
		}
	}, {
		state : 'lookalikeCrowds_edit',
		url : '/crowd/lookalikeCrowds/edit/:lookalikeCrowdId',
		templateUrl : 'html/crowd/form/LookalikeCrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/LookalikeCrowdFormController',
		ncyBreadcrumb: {
			label: '{{lookalikeCrowdName}}',
		    parent: 'crowd'
		}
	},{
	    state : 'lookalikeCalcRecords',
		url : '/crowd/lookalikeCrowds/lookalikeCalcRecord/:lookalikeCrowdId/:lookalikeCrowdName/lookalikeCalcRecords',
		templateUrl : 'html/crowd/list/LookalikeCalcRecordList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/LookalikeCalcRecordListController',
		ncyBreadcrumb: {
		    label: '任务列表',
		    parent: 'lookalikeCrowds'
		}
	}];
});

