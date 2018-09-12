define([], function () {
  'use strict';
  return [/*{
	    state : 'tagCalcRecords/list',
		url : '/tag/tagCalcRecords/list',
		templateUrl : 'html/tag/list/TagCalcRecordList.html',
		controllerUrl : 'app/controllers/tag/TagCalcRecordListController'
	}
  	,*/{
	    state : 'tagCalcRecords',
		url : '/tag/tags/:tagId/tagCalcRecords',
		templateUrl : 'html/tag/list/TagCalcRecordList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCalcRecordListController',
		ncyBreadcrumb: {
		    label: '任务列表',
		    parent: 'tags_edit'
		}
	}
  	, {
		state : 'tagCalcRecords_new',
		url : '/tag/tagCalcRecords/new',
		templateUrl : 'html/tag/form/TagCalcRecordForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCalcRecordListController'
	}, {
		state : 'tagCalcRecords_edit',
		url : '/tag/tagCalcRecords/edit/:tagCalcRecordId',
		templateUrl : 'html/tag/form/TagCalcRecordForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagCalcRecordFormController'
	}, {
		state : 'tagCalcRecords_journal',
		url : '/tag/tags/:tagId/tagCalcRecords/:tagCalcRecordId',
		templateUrl : 'html/tag/list/TagJournalList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagJournalListController',
		ncyBreadcrumb: {
		    label: '任务({{tagCalcRecordId}})明细',
		    parent: 'tagCalcRecords'
		}
	}];
});

