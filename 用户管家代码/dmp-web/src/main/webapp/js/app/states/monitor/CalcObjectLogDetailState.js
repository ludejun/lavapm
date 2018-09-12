define([], function () {
  'use strict';
  return [{
	    state : 'calcObjectLogDetails',
		url : '/monitor/calcObjectLogDetails',
		templateUrl : 'html/monitor/list/CalcObjectLogDetailList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogDetailListController'
	}, {
		state : 'calcObjectLogDetails_new',
		url : '/monitor/calcObjectLogDetails/new',
		templateUrl : 'html/monitor/form/CalcObjectLogDetailForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogDetailListController'
	}, {
		state : 'calcObjectLogDetails_edit',
		url : '/monitor/calcObjectLogDetails/edit/:calcObjectLogDetailId',
		templateUrl : 'html/monitor/form/CalcObjectLogDetailForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogDetailFormController'
	}];
});

