require.config({
  //baseUrl: 'http://dmp.lavapm.cn:8088http://dmp.lavapm.cn:8088/enterprise/js/',  
  waitSeconds: 0,
  // alias libraries paths.  Must set 'angular'
  paths: {
	'i18n' : 'http://dmp.lavapm.cn:8088/enterprise/js/libs/i18n',
	'common-libs' : 'http://dmp.lavapm.cn:8088/enterprise/js/libs/common-libs',
	'jquery': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/jquery/jquery-1.12.3.min',
	'jquery-scroll': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/jquery-scroll/jquery-scroll',
	'table-freeze': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/table-freeze/table-freeze',
	'util':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/util',
	'week':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/week',
    'month':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/month',
    'calendar_base':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/calendar_base',
    'calendar':"http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/calendar.min",
    'day_week_month':"http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/day_week_month",
    'TdCalendar':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/TdCalendar/TdCalendar',
    'tdDateCondition':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/TdCalendar/TdDateCondition',
    'tdWeekMonthPicke':'http://dmp.lavapm.cn:8088/enterprise/js/libs/calender/TdCalendar/TdWeekMonthPicke',
    
	//'bootstrap-datepicker' : 'http://dmp.lavapm.cn:8088/enterprise/js/libs/bootstrap-datepicker/bootstrap-datepicker',
    'angular': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular/angular.min',
    'angular-route': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-route/angular-route',    
    'angularAMD': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angularAMD/angularAMD',
    //'angular-locale_zh' : 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-locale/angular-locale_zh',
    'ngload': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angularAMD/ngload',
    'angular-ui-bootstrap': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-ui/angular-bootstrap/ui-bootstrap-tpls.min',
    //'angular-ui-router': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-ui/angular-ui-router/angular-ui-router.min',
   // 'angular-strap': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-strap/angular-strap.min',
   // 'angular-strap-tpl': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-strap/angular-strap.tpl.min',
    //'angular-animate': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/angular-animate/angular-animate.min',
    'ngDraggable': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/ngDraggable/ngDraggable',
    'ngDraggableDialog': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/ngDraggable/ngDraggableDialogDirective',
    'restangular': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/restangular/restangular',
    'underscore': "http://dmp.lavapm.cn:8088/enterprise/js/libs/restangular/underscore",
    'lodash': "http://dmp.lavapm.cn:8088/enterprise/js/libs/restangular/lodash.min",
    'ng-table': "http://dmp.lavapm.cn:8088/enterprise/js/libs/ng-table/ng-table",
    'highcharts': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/highcharts/highcharts.v4.2.5',
    'highcharts-more': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/highcharts/highcharts-more',
    'funnel': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/highcharts/funnel',
    'jquery.ztree.core-3.5': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/zTreeJS/jquery.ztree.core-3.5',
    'jquery.ztree.excheck-3.5': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/zTreeJS/jquery.ztree.excheck-3.5',
    'jquery.ztree.exedit-3.5': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/zTreeJS/jquery.ztree.exedit-3.5',
    'echarts': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/echarts/echarts-all',
    'mint': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/echarts/theme/mint',
    'customUtilJS': 'http://dmp.lavapm.cn:8088/enterprise/js/customUtilJS'
  },
  
  map: {
      '*': {
          'css': 'http://dmp.lavapm.cn:8088/enterprise/js/libs/require-css/css.min.js'
      }
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
	'angular' : {
		deps: [
		    //'css!http://dmp.lavapm.cn:8088/enterprise/css/libs/bootstrap/bootstrap.min',
		    //'css!http://dmp.lavapm.cn:8088/enterprise/css/libs/angular-motion/angular-motion.min',
		    //'css!http://dmp.lavapm.cn:8088/enterprise/css/libs/ui-tree/angular-ui-tree',
		    'css!http://dmp.lavapm.cn:8088/enterprise/css/libs/angular-strap/angular-strap.min',
		    'css!http://dmp.lavapm.cn:8088/enterprise/css/app/common/main.css',
		    'css!../css/app/common/main'
		],
		exports: 'angular'
	},
	'common-libs': [ 'angular' ],
	'jquery' : ['angular'],
	'jquery-scroll':['jquery'],
	'table-freeze':['jquery'],
	'util':{
		deps: [
            'jquery',
		    'css!http://dmp.lavapm.cn:8088/enterprise/css/app/calender/calender'
		]
	},
    'week':['jquery','util'],
    'month':['jquery','util'],
    'day_week_month':['jquery','util'],
    'calendar_base':['jquery','util'],
    'calendar':['jquery','util'],
    'tdDateCondition':['jquery','util'],
    'tdWeekMonthPicke':['jquery','util'],
	//'bootstrap-datepicker':['jquery'],
    'angular-route': [ 'angular' ],
    'angularAMD': [ 'angular' ],
    //'angular-locale_zh':['angular'],
    'ngload': [ 'angularAMD' ],
    'angular-ui-bootstrap': [ 'angular' ],
    //'angular-ui-router': [ 'angular' ],
    'restangular': ['angular', 'underscore'],
    //'angular-animate': ['angular'],
    'ngDraggable':['angular'],
    'ngDraggableDialog':['angular'],
    //'angular-strap': ['angular', 'angular-animate'],
    //'angular-strap-tpl': ['angular-strap'],
    'ng-table':{
    	deps: [
    	    'angular',
    	    'table-freeze',
   		    'css!http://dmp.lavapm.cn:8088/enterprise/css/libs/ng-table/ng-table',
   		    'css!http://dmp.lavapm.cn:8088/enterprise/css/app/ng-table/ng-table'
   		]
    },
    'highcharts': [ 'jquery' ],
    'highcharts-more':['highcharts'],
    'funnel': ['highcharts'],
    'jquery.ztree.core-3.5': [ 'jquery' ],
    'jquery.ztree.excheck-3.5': [ 'jquery.ztree.core-3.5' ],
    'jquery.ztree.exedit-3.5': [ 'jquery.ztree.excheck-3.5' ],
    'echarts': [ 'jquery' ],
    'mint' : ['jquery'],
    'customUtilJS': [ 'jquery' ]
  },

  // kick start application
  deps: ['app']
});

require.config({
	config: {
	      //Set the config for the i18n
	      //module ID
	      i18n: {
	          locale: 'zh'//TODO: use appConfig.language
	      }
	  }
	
});
