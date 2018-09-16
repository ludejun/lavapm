define([], function () {
  'use strict';
  return [{
	    state : 'monitor',
		url : '/monitor',
		templateUrl : 'html/monitor/list/SchedulerTaskList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskListController',
		ncyBreadcrumb: {
		    label: '调度任务'
		}
	},
	{
	    state : 'schedulerTasks',
		url : '/monitor/schedulerTasks',
		templateUrl : 'html/monitor/list/SchedulerTaskList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskListController',
		ncyBreadcrumb: {
		    label: '调度任务',
		    parent: 'monitor'
		}
	}, {
		state : 'schedulerTasks_new',
		url : '/monitor/schedulerTasks/new',
		templateUrl : 'html/monitor/form/SchedulerTaskForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskListController'
	}, {
		state : 'schedulerTasks_edit',
		url : '/monitor/schedulerTasks/edit/:schedulerTaskId',
		templateUrl : 'html/monitor/form/SchedulerTaskForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/monitor/SchedulerTaskFormController'
	}];
});

