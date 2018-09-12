define([], function () {
  'use strict';
  return [{
	    state : 'tag_journals_list',
		url : '/tag/journals/list',
		templateUrl : 'html/tag/list/TagJournalList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagJournalListController'
	},{
	    state : 'tag_journals',
		url : '/tag/tags/list/:tagId/tagCalcRecords/:tagCalcRecordId',
		templateUrl : 'html/tag/list/TagJournalList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/tag/TagJournalListController',
		ncyBreadcrumb: {
		    label: '任务细节：{{tagName}}',
		    parent: 'tagCalcRecords'
		}
	}];
});

