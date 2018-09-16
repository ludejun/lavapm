define([], function () {
  'use strict';
  return [{
	    state : 'calcObjects',
		url : '/admin/calcObjects',
		templateUrl : 'html/admin/list/CalcObjectList.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/CalcObjectListController'
	}, {
		state : 'calcObjects_new',
		url : '/admin/calcObjects/new',
		templateUrl : 'html/admin/form/CalcObjectForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/CalcObjectFormController'
	}, {
		state : 'calcObjects_edit',
		url : '/admin/calcObjects/edit/:calcObjectId',
		templateUrl : 'html/admin/form/CalcObjectForm.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/admin/CalcObjectFormController'
	}];
});

