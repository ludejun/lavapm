define([], function () {
  'use strict';
  return [{
	    state : 'scriptCalcRecords',
		url : '/discovery/scriptCalcRecords',
		templateUrl : 'html/admin/list/ScriptCalcRecordList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/ScriptCalcRecordListController'
	}, {
		state : 'scriptCalcRecords_new',
		url : '/admin/scriptCalcRecords/new',
		templateUrl : 'html/admin/form/ScriptCalcRecordForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/ScriptCalcRecordListController'
	}, {
		state : 'scriptCalcRecords_edit',
		url : '/admin/scriptCalcRecords/edit/:scriptCalcRecordId',
		templateUrl : 'html/admin/form/ScriptCalcRecordForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/ScriptCalcRecordFormController'
	}];
});

