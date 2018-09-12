define([], function () {
  'use strict';
  return [{
	    state : 'schedulerTaskLogs',
		url : '/monitor/schedulerTaskLogs',
		templateUrl : 'html/monitor/list/SchedulerTaskLogList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskLogListController',
		ncyBreadcrumb: {
		    label: '调度日志',
		    parent: 'monitor'
		}
	}, {
		state : 'schedulerTaskLogs_new',
		url : '/monitor/schedulerTaskLogs/new',
		templateUrl : 'html/monitor/form/SchedulerTaskLogForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskLogListController',
		ncyBreadcrumb: {
		    label: '添加调度日志',
		    parent: 'schedulerTaskLogs'
		}
	}, {
		state : 'schedulerTaskLogs_edit',
		url : '/monitor/schedulerTaskLogs/edit/:schedulerTaskLogId',
		templateUrl : 'html/monitor/form/SchedulerTaskLogForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskLogFormController',
		ncyBreadcrumb: {
		    label: '编辑调度日志',
		    parent: 'schedulerTaskLogs'
		}
	}, {
		state : 'schedulerTaskLogs_view',
		url : '/monitor/schedulerTaskLogs/view/:schedulerTaskLogId/sourcePage/:sourcePage',
		templateUrl : 'html/monitor/view/SchedulerTaskLogView.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskLogViewController',
		ncyBreadcrumb: {
		    label: '调度日志详情',
		    parent: 'schedulerTaskLogs'
		}
	}];
});

