define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.factory('DataRangeServiceThird', [ '$rootScope', function($rootScope) {
		var dateRange = undefined;
		return {
			getDateRange : function() {
				return dateRange;
			},
			setDateRange : function(d) {
				if(d){
					var se = d.split("~");
					var fu = d.split("-");
					if(fu.length >1){
						dateRange = d;
						$rootScope.$broadcast('td-third-date-condition.onChange', {
							startDate : se[0],
							endDate : se[1],
							range : d
						});
					}else{
						$rootScope.$broadcast('td-third-date-condition.onChange', {
							range : d
						});
					}
				}
			}
		};
	}]);
    angularAMD.directive('tdThirdDateCondition',['DataRangeServiceThird','$timeout', function(DataRangeServiceThird,$timeout) {
    	return {
    		restrict : 'EA',
    		scope:{
    			dateRange:"=",
    		},
    		templateUrl : "js/app/directive/template/td-third-date-condition.html",
    		link: function(scope, elem, attrs) {
    			scope.$watch('dateRange', function(){
    				if(scope.dateRange){
    					scope.setDateRange();
    				}
    			});
    			scope.changeDate = function(day,month,year){
    				var aa = scope.dateRange;
    				    aa=aa.split("_");
    				var dateArr = aa[0].split("~");
    				for(var i = 0; i < dateArr.length; i++){
    					dateArr[i] = scope.getDataStr(dateArr[i],day,month);
    				}
    				var startData=dateArr[0];
    				var endData=dateArr[1];
    					scope.setDateRange(startData,endData);
    			}
    			scope.showCalendar =function(){
    				setTimeout(function() {
    					scope.calendar = new TD.ui.Calendar("#calendar",{
        					number:1,//多日历
        					intervals:false,//时段选择
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
    						scope.fromDate = msg.selected;
        				})
    				}, 100);
    			}
    			scope.changeDateRange = function(){
    				var s = angular.copy(scope.fromDate);
    				if(s){
    					var aa = scope.dateRange;
    					var dateArr = aa.split("~");
    					if(dateArr.length>1 ){
    						
    						var startData=dateArr[0];
    	    				var endData=dateArr[1];
    	    				if(endData.indexOf("_")>=0){
    	    					endData = endData.split("_")[0];
    	    				}
    	    				// 拆分年月日
    	    				var newStartData = new Date(startData);
    	    				var newEndData = new Date(endData);
    	    				var day = (newEndData - newStartData)/1000/3600/24;
    	    				
    	    				 var e = scope.getDataStr(s,day);
    	    				 s = scope.getDataStr(s)
    	    				 scope.start=s;
    	    				 scope.end =e;
    	    				 scope.setDateRange(s,e);
    					}else{
    						s = scope.getDataStr(s)
    						scope.setDateRange(s);
    					}
    				}
    			};
    			//工具
    			scope.getDataStr = function(date,day,month,year) {
    				var dd = new Date(date); 
    				dd.setDate(dd.getDate()+(day?day:0));
    				dd.setMonth(dd.getMonth()+(month?month:0));
    				dd.setFullYear(dd.getFullYear()+(year?year:0));
    				var y = dd.getFullYear(); 
    				var m = dd.getMonth()+1;
    				var d = dd.getDate(); 
    				if((m+"").length == 1){
    					m  = "0" + m;
    				}
    				var d = dd.getDate(); 
    				if((d+"").length == 1){
    					d = "0" + d;
    				}
    				return y+"-"+m+"-"+d; 
    			}
    			//月份下来框
    			scope.setMonthSelect = function(){
    				var d = new Date();
    				var m = d.getMonth()+1;
    				var selectV = [];
    				for(var i=1; i<=12; i++){
    					if(m==0){
    						m=12;
    						selectV.push({
        						key:m,
        						value:m+'月'
    						});
    						m--;
    					}else{
    						selectV.push({
        						key:m,
        						value:m+'月'
    						});
    						m--;
    					}
    				}
    				scope.selectMonthData = selectV;
    				scope.currentMonth  = selectV[0];
    				
    			}
    			scope.getFLdate = function(){
    				var date_ = new Date();
    				var year = date_.getFullYear();
    				var month = date_.getMonth() + 1;
    				var firstdate = year + '-' + month + '-01'
    				var day = new Date(year,month,0);
    				var lastdate = year + '-' + month + '-' + day.getDate();
    				return firstdate+"~"+lastdate;
    			}
    			scope.setDateRange = function(a,b){
    				if(a && b){
    					if(a == b){
    						scope.displayValueThird =a;
    					}else{
    						scope.displayValueThird =a+"~"+b;
    					}
    					DataRangeServiceThird.setDateRange(a+"~"+b);
    				}else if(a){
    					scope.displayValueThird =a;
    					DataRangeServiceThird.setDateRange(a);
    				}else{
    					scope.start=null;
    					scope.end=null;
        				scope.displayValueThird ="请选择日期";
        				DataRangeServiceThird.setDateRange(scope.displayValueThird);
    				}
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
        				scope.minDate = scope.simpleFormat(d);
        				scope.maxDate = scope.simpleFormat(new Date());
        			}
    			}
		    }
    	}
    }]);
});
