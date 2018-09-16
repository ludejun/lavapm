define([], function () {
  'use strict';
  return [/*{
	    state : 'crowd_portrait',
		url : '/crowd/crowds/:crowdId/portrait',
		templateUrl : 'html/crowd/list/CrowdPortrait.html',
		controllerUrl : 'app/controllers/crowd/CrowdPortraitController',
		ncyBreadcrumb: {
		    label: '构建人群画像: {{crowdName}}',
		    parent: 'crowd'
		}
	},*/
	{
	    state : 'crowd_portrait',
		url : '/crowd/crowds/:crowdId/portrait',
		templateUrl : 'html/crowd/list/CrowdPortraitOp.html?v=' + appConfig.appVersion,
		controllerUrl : 'app/controllers/crowd/CrowdPortraitOpController',
		ncyBreadcrumb: {
		    label: '构建人群画像: {{crowdName}}',
		    parent: 'crowd'
		}
	},
	
	/*{
	    state : 'lookalikeCrowd_portrait',
		url : '/crowd/lookalikeCrowds/:lookalikeCrowdId/portrait',
		templateUrl : 'html/crowd/list/CrowdPortraitOp.html',
		controllerUrl : 'app/controllers/crowd/CrowdPortraitOpController',
		ncyBreadcrumb: {
		    label: '相似人群画像: {{lookalikeCrowdName}}',
		    parent: 'crowd'
		}
	},*/
	/*{
	    state : 'tag_portrait',
		url : '/tag/tags/:tagId/portrait',
		templateUrl : 'html/crowd/list/CrowdPortrait.html',
		controllerUrl : 'app/controllers/crowd/CrowdPortraitController',
		ncyBreadcrumb: {
		    label: '标签画像: {{tagName}}',
		    parent: 'crowd'
		}
	}*/];
});

