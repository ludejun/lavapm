define([], function () {
  'use strict';
  return [{
	    state : 'crowd_relation',
		url : '/crowd/crowds/:crowdId/relation',
		templateUrl : 'html/crowd/list/CrowdRelation.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdRelationController',
		ncyBreadcrumb: {
		    label: '人群关联: {{crowdName}}',
		    parent: 'crowd'
		}
	}];
});

