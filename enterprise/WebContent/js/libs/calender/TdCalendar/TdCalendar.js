define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdCalendar',['$timeout', function($timeout) {
    	return {
    		restrict : 'EA',
    		scope:{
    			dateRange:"=",
    			maxDate:"=",
    			minDate:"=",
    			tdChange: "&",
    		},
    		templateUrl : "/enterprise/js/libs/calender/TdCalendar/template/td-calendar.html",
    		link: function(scope, elem, attrs) {
    			scope.showCalendar =function(){
    				setTimeout(function() {
    					scope.calendar = new TD.ui.Calendar("#calendar",{
        					number:2,//多日历
        					intervals:true,//时段选择
        					date:{start : scope.start,end : scope.end},
        					dayOperationStatus : true,
        					format : "yyyy-MM-dd",//日期格式
        					uiStyle:"TD_",//样式,
        					language : "zh_CN",//语言
        					disable : {
        						first : scope.minDate,
        			            last : scope.maxDate,
        			        },
        					preNextMonthButton : {
        						pre : true,
        						next : true
        					}
        				})
    					$(scope.calendar).on("selectDay",function(e,msg){
    						scope.selectedDate = msg.selected;
    						scope.start = msg.selected;
    						scope.end = msg.selected;
        				})
    				}, 100);
    			}
    			scope.setDateRange = function(selectedDate){
 	            	if(angular.isFunction(scope.tdChange)){
 	            		scope.tdChange()(selectedDate);
 	            	}
 	            };
    			scope.changeDateRange = function(){
    				var s = angular.copy(scope.selectedDate);
    				if(s){
    					scope.setDateRange(s);
    				}
    			};
    			scope.simpleFormat = function(date){
    				var y = date.getFullYear(); 
    				var m = date.getMonth()+1;
    				if((m+"").length == 1){
    					m  = "0" + m;
    				}
    				var d = date.getDate(); 
    				if((d+"").length == 1){
    					d = "0" + d;
    				}
    				return y+"-"+m+"-"+d;
    			};
    			if(appConfig.ProductOption && appConfig.ProductOption.registertime){
    				var d = new Date(appConfig.ProductOption.registertime);
    				d.setDate(d.getDate()-1);
    				if(!scope.minDate){
    					scope.minDate = scope.simpleFormat(d);
    				}
    				if(!scope.maxDate){
    					scope.maxDate = scope.simpleFormat(new Date());
    				}
    			}
    			if(scope.dateRange){
    				scope.selectedDate = angular.copy(scope.dateRange); 
    				scope.start = angular.copy(scope.dateRange); 
    				scope.end = angular.copy(scope.dateRange); 
    			}
    			scope.$watch('minDate', function(){
    				if(scope.minDate){
    					scope.minDate = scope.minDate;
    				}
    			});
    			scope.$watch('maxDate', function(){
    				if(scope.maxDate){
    					scope.maxDate = scope.maxDate;
    				}
    			});
		    }
    	}
    }]);
});
