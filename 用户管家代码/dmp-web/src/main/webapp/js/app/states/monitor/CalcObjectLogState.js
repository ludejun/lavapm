define([], function () {
  'use strict';
  return [{
	    state : 'calcObjectLogs',
		url : '/monitor/calcObjectLogs',
		templateUrl : 'html/monitor/list/CalcObjectLogList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogListController',
		ncyBreadcrumb: {
		    label: '计算日志',
		    parent: 'monitor'
		}
	}, {
		state : 'calcObjectLogs_new',
		url : '/monitor/calcObjectLogs/new',
		templateUrl : 'html/monitor/form/CalcObjectLogForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogListController',
		ncyBreadcrumb: {
		    label: '新建计算日志',
		    parent: 'calcObjectLogs'
		}
	}, {
		state : 'calcObjectLogs_edit',
		url : '/monitor/calcObjectLogs/edit/:calcObjectLogId',
		templateUrl : 'html/monitor/form/CalcObjectLogForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogFormController',
		ncyBreadcrumb: {
		    label: '编辑计算日志',
		    parent: 'calcObjectLogs'
		}
	}, {
		state : 'calcObjectLogs_view',
		url : '/monitor/calcObjectLogs/view/:calcObjectLogId/sourcePage/:sourcePage',
		templateUrl : 'html/monitor/view/CalcObjectLogView.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/CalcObjectLogViewController',
		ncyBreadcrumb: {
		    label: '计算日志详情',
		    parent: 'calcObjectLogs'
		}
	}];
});

