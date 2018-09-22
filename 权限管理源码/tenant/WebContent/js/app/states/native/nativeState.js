define([], function () {
  'use strict';
  return [
	{//
	    state: 'nativepage/usermanage',
	    url: '/nativepage/usermanage',
	    templateUrl: 'js/app/module/nativepage/usermanage/template/usermanage.html',
	    controllerUrl: 'app/module/nativepage/usermanage/usermanage'
	},
	{//
	    state: 'nativepage/templetmanage',
	    url: '/nativepage/templetmanage',
	    templateUrl: 'js/app/module/nativepage/templetmanage/template/templetmanage.html',
	    controllerUrl: 'app/module/nativepage/templetmanage/templetmanage'
	},
	{//渠道数据
	    state: 'nativepage/productmanage',
	    url: '/nativepage/productmanage',
	    templateUrl: 'js/app/module/nativepage/productmanage/template/productmanage.html',
	    controllerUrl: 'app/module/nativepage/productmanage/productmanage'
	},
	{///nativepage/customDetailed/:eventIdtid:rule.tid, tname:role.t_name,tdesc:role.t_desc
	    state: 'nativepage/createTempletmanage',
	    url: '/nativepage/createTempletmanage',
	    templateUrl: 'js/app/module/nativepage/templetmanage/template/createTempletmanage.html',
	    controllerUrl: 'app/module/nativepage/templetmanage/createTempletmanage'
	},
	{//
	    state: 'nativepage/userrolemanage',
	    url: '/nativepage/userrolemanage/:umid/:userName/:email/:title',
	    templateUrl: 'js/app/module/nativepage/usermanage/template/userrolemanage.html',
	    controllerUrl: 'app/module/nativepage/usermanage/userrolemanage'
	},
	{///nativepage/customDetailed/:eventIdtid:rule.tid, tname:role.t_name,tdesc:role.t_desc
	    state: 'nativepage/viewTempletmanage',
	    url: '/nativepage/viewTempletmanage/:tids/:rids/:tname/:tdesc/:onupdate/:returnAddress/:umid/:userName/:email/:title',
	    templateUrl: 'js/app/module/nativepage/templetmanage/template/viewTempletmanage.html',
	    controllerUrl: 'app/module/nativepage/templetmanage/viewTempletmanage'
	},{///nativepage/customDetailed/:eventIdtid:rule.tid, tname:role.t_name,tdesc:role.t_desc
	    state: 'nativepage/userViewTempletmanage',
	    url: '/nativepage/userViewTempletmanage/:tids/:rids/:tname/:tdesc/:onupdate/:returnAddress/:umid/:userName/:email/:title',
	    templateUrl: 'js/app/module/nativepage/templetmanage/template/userViewTempletmanage.html',
	    controllerUrl: 'app/module/nativepage/templetmanage/userViewTempletmanage'
	}, {
		//服务接口调用日志
		state : 'serviceInterfaceCallLogs',
		url : '/admin/serviceInterfaceCallLogs',
		templateUrl : 'js/app/module/externalpage/template/externPages.html',
		controllerUrl : 'app/module/externalpage/ExternPagesController'
	},
	{
	    state : 'nativepage/eventCloudCtrl',
		url : '/nativepage/eventCloudCtrl',
		templateUrl : 'js/app/module/externalpage/template/externPages.html',
		controllerUrl : 'app/module/externalpage/ExternPagesController'
	}, {
		//App白名单
		state : 'appWhiteLists',
		url : '/admin/appWhiteLists',
		templateUrl : 'js/app/module/externalpage/template/externPages.html',
		controllerUrl : 'app/module/externalpage/ExternPagesController'
	}, {
		//调度日志
		state : 'schedulerTaskLogs_ep',
		url : '/monitor/schedulerTaskLogs',
		templateUrl : 'js/app/module/externalpage/template/externPages.html',
		controllerUrl : 'app/module/externalpage/ExternPagesController'
	}, {
		//计算日志
		state : 'calcObjectLogs_ep',
		url : '/monitor/calcObjectLogs',
		templateUrl : 'js/app/module/externalpage/template/externPages.html',
		controllerUrl : 'app/module/externalpage/ExternPagesController'
	}
	];
});

