require.config({
  //baseUrl: 'https://dmp.lavapm.comhttps://dmp.lavapm.com/enterprise/js/',  
  waitSeconds: 0,
  // alias libraries paths.  Must set 'angular'
  paths: {
	'i18n' : 'https://dmp.lavapm.com/enterprise/js/libs/i18n',
	'common-libs' : 'https://dmp.lavapm.com/enterprise/js/libs/common-libs',
	'jquery': 'https://dmp.lavapm.com/enterprise/js/libs/jquery/jquery-1.12.3.min',
	'jquery-scroll': 'https://dmp.lavapm.com/enterprise/js/libs/jquery-scroll/jquery-scroll',
	'table-freeze': 'https://dmp.lavapm.com/enterprise/js/libs/table-freeze/table-freeze',
	'util':'https://dmp.lavapm.com/enterprise/js/libs/calender/util',
	'week':'https://dmp.lavapm.com/enterprise/js/libs/calender/week',
    'month':'https://dmp.lavapm.com/enterprise/js/libs/calender/month',
    'calendar_base':'https://dmp.lavapm.com/enterprise/js/libs/calender/calendar_base',
    'calendar':"https://dmp.lavapm.com/enterprise/js/libs/calender/calendar.min",
    'day_week_month':"https://dmp.lavapm.com/enterprise/js/libs/calender/day_week_month",
    'TdCalendar':'https://dmp.lavapm.com/enterprise/js/libs/calender/TdCalendar/TdCalendar',
    'tdDateCondition':'https://dmp.lavapm.com/enterprise/js/libs/calender/TdCalendar/TdDateCondition',
    'tdWeekMonthPicke':'https://dmp.lavapm.com/enterprise/js/libs/calender/TdCalendar/TdWeekMonthPicke',
    
	//'bootstrap-datepicker' : 'https://dmp.lavapm.com/enterprise/js/libs/bootstrap-datepicker/bootstrap-datepicker',
    'angular': 'https://dmp.lavapm.com/enterprise/js/libs/angular/angular.min',
    'angular-route': 'https://dmp.lavapm.com/enterprise/js/libs/angular-route/angular-route',    
    'angularAMD': 'https://dmp.lavapm.com/enterprise/js/libs/angularAMD/angularAMD',
    //'angular-locale_zh' : 'https://dmp.lavapm.com/enterprise/js/libs/angular-locale/angular-locale_zh',
    'ngload': 'https://dmp.lavapm.com/enterprise/js/libs/angularAMD/ngload',
    'angular-ui-bootstrap': 'https://dmp.lavapm.com/enterprise/js/libs/angular-ui/angular-bootstrap/ui-bootstrap-tpls.min',
    //'angular-ui-router': 'https://dmp.lavapm.com/enterprise/js/libs/angular-ui/angular-ui-router/angular-ui-router.min',
   // 'angular-strap': 'https://dmp.lavapm.com/enterprise/js/libs/angular-strap/angular-strap.min',
   // 'angular-strap-tpl': 'https://dmp.lavapm.com/enterprise/js/libs/angular-strap/angular-strap.tpl.min',
    //'angular-animate': 'https://dmp.lavapm.com/enterprise/js/libs/angular-animate/angular-animate.min',
    'ngDraggable': 'https://dmp.lavapm.com/enterprise/js/libs/ngDraggable/ngDraggable',
    'ngDraggableDialog': 'https://dmp.lavapm.com/enterprise/js/libs/ngDraggable/ngDraggableDialogDirective',
    'restangular': 'https://dmp.lavapm.com/enterprise/js/libs/restangular/restangular',
    'underscore': "https://dmp.lavapm.com/enterprise/js/libs/restangular/underscore",
    'lodash': "https://dmp.lavapm.com/enterprise/js/libs/restangular/lodash.min",
    'ng-table': "https://dmp.lavapm.com/enterprise/js/libs/ng-table/ng-table",
    'highcharts': 'https://dmp.lavapm.com/enterprise/js/libs/highcharts/highcharts.v4.2.5',
    'highcharts-more': 'https://dmp.lavapm.com/enterprise/js/libs/highcharts/highcharts-more',
    'funnel': 'https://dmp.lavapm.com/enterprise/js/libs/highcharts/funnel',
    'jquery.ztree.core-3.5': 'https://dmp.lavapm.com/enterprise/js/libs/zTreeJS/jquery.ztree.core-3.5',
    'jquery.ztree.excheck-3.5': 'https://dmp.lavapm.com/enterprise/js/libs/zTreeJS/jquery.ztree.excheck-3.5',
    'jquery.ztree.exedit-3.5': 'https://dmp.lavapm.com/enterprise/js/libs/zTreeJS/jquery.ztree.exedit-3.5',
    'echarts': 'https://dmp.lavapm.com/enterprise/js/libs/echarts/echarts-all',
    'mint': 'https://dmp.lavapm.com/enterprise/js/libs/echarts/theme/mint',
    'customUtilJS': 'https://dmp.lavapm.com/enterprise/js/customUtilJS'
  },
  
  map: {
      '*': {
          'css': 'https://dmp.lavapm.com/enterprise/js/libs/require-css/css.min.js'
      }
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
	'angular' : {
		deps: [
		    //'css!https://dmp.lavapm.com/enterprise/css/libs/bootstrap/bootstrap.min',
		    //'css!https://dmp.lavapm.com/enterprise/css/libs/angular-motion/angular-motion.min',
		    //'css!https://dmp.lavapm.com/enterprise/css/libs/ui-tree/angular-ui-tree',
		    'css!https://dmp.lavapm.com/enterprise/css/libs/angular-strap/angular-strap.min',
		    'css!https://dmp.lavapm.com/enterprise/css/app/common/main.css',
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
		    'css!https://dmp.lavapm.com/enterprise/css/app/calender/calender'
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
   		    'css!https://dmp.lavapm.com/enterprise/css/libs/ng-table/ng-table',
   		    'css!https://dmp.lavapm.com/enterprise/css/app/ng-table/ng-table'
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
