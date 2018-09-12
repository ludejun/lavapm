define([], function () {
  'use strict';
  return [{
	    state : 'potentialCrowds',
		url : '/crowd/potentialCrowds',
		templateUrl : 'html/crowd/list/PotentialCrowdList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/PotentialCrowdListController',
		ncyBreadcrumb: {
		    label: '潜在人群',
		    parent: 'crowd'
		}
	}, {
		state : 'potentialCrowds_new',
		url : '/crowd/potentialCrowds/new',
		templateUrl : 'html/crowd/form/PotentialCrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/PotentialCrowdFormController',
		ncyBreadcrumb: {
		    label: '添加潜在人群',
		    parent: 'potentialCrowds'
		}
	}, {
		state : 'potentialCrowds_edit',
		url : '/crowd/potentialCrowds/edit/:potentialCrowdId',
		templateUrl : 'html/crowd/form/PotentialCrowdForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/PotentialCrowdFormController',
		ncyBreadcrumb: {
		    label: '编辑潜在人群',
		    parent: 'potentialCrowds'
		}
	},{
	    state : 'potentialCrowdCalcRecords',
		url : '/crowd/potentialCrowds/potentialCrowdCalcRecord/:potentialCrowdId/:potentialCrowdName/potentialCrowdCalcRecords',
		templateUrl : 'html/crowd/list/PotentialCrowdCalcRecordList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/PotentialCrowdCalcRecordListController',
		ncyBreadcrumb: {
		    label: '任务列表',
		    parent: 'potentialCrowds'
		}
	}];
});

