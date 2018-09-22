define(['app','angularAMD','app/service/ConditionService'], function (app,angularAMD) {
    'use strict';
    angularAMD.factory('DataRangeService', [ '$rootScope','ConditionService', 
      function($rootScope,ConditionService) {
		return {
			getDateRange : function() {
				if(appConfig.UserCondition && appConfig.UserCondition.DateFilter){
        			return  appConfig.UserCondition.DateFilter.range;
        		}
        		return undefined;
			},
			setDateRange : function(d,noBroadcast) {
				if(d){
					var se = d.split("~");
					if(se.length==2){
						if(!appConfig.UserCondition)
		        			appConfig.UserCondition = {};
						if(!appConfig.UserCondition.DateFilter)
							appConfig.UserCondition.DateFilter = {};
						angular.extend(appConfig.UserCondition.DateFilter, {
							startDate : se[0],
							endDate : se[1],
							range : d
						});
		        		ConditionService.setSessionAttribute("UserCondition", appConfig.UserCondition);
						if(!noBroadcast){
							ConditionService.setDateFilterData({
								startDate : se[0],
								endDate : se[1],
								range : d
							});
						}
					}
				}
			}
		};
	}]);
    angularAMD.directive('tdDateCondition',['DataRangeService','$timeout','$state', function(DataRangeService,$timeout,$state) {
    	return {
    		restrict : 'EA',
    		scope:{
    			dateRange : "=",
    			conditionType : "="  // 此参数决定页面是否根据时间控件初始化页面，如果值为“main”则代表根据时间控件初始化页面，否则不是
    		},
    		templateUrl : "js/app/directive/template/td-date-condition.html",
    		link: function(scope, elem, attrs) {
    			var sign = "到";
    			//工具
    			scope.getDataStr = function(day,month,year) {
    				var dd = new Date(); 
    				dd.setDate(dd.getDate()+(day?day:0));
    				dd.setMonth(dd.getMonth()+(month?month:0));
    				dd.setFullYear(dd.getFullYear()+(year?year:0));
    				return scope.simpleFormat(dd); 
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
    				scope.minDate = scope.simpleFormat(d);
    				scope.maxDate = scope.getDataStr();
    			}
    			scope.changeDate = function(day,month,year){
    				var startData=scope.getDataStr(day,month,year);
    				var endData=scope.getDataStr(0,0,0);
    				if(startData == endData || day == -1){
    					scope.setDateRange(startData);
    				}else{
    					scope.setDateRange(startData,endData);
    				}
    			}
    			scope.showCalendar =function(){
    				setTimeout(function() {
    					scope.calendar = new TD.ui.Calendar("#calendar",{
        					number:2,//多日历
        					intervals:true,//时段选择
        					date:{start : scope.start,end : scope.end},
        					disable : {
        			            first : scope.minDate,
        			            last : scope.maxDate,
        			        },
        					dayOperationStatus : true,
        					format : "yyyy-MM-dd",//日期格式
        					uiStyle:"TD_",//样式,
        					language : "zh_CN",//语言
        					preNextMonthButton : {
        						pre : true,
        						next : true
        					}
        				})
    					$(scope.calendar).on("selectDay",function(e,msg){
    						scope.start = msg.date.start;
    						scope.end = msg.date.end;
    						$(".displayTime").val(scope.start + sign + scope.end);
        				})
    				}, 100);
    			}
    			scope.changeDateRange = function(){
    				var s = angular.copy(scope.start);
    				var e = angular.copy(scope.end);
    				if(s && e){
	    				var sd = scope.simpleFormat(new Date(s));
	    				var ed = scope.simpleFormat(new Date(e));
    					scope.setDateRange(sd,ed);
    				}
    			}
    			scope.getFirstAndLastMonthDay = function(year,month){  
	               var   firstdate = year + '-' + month + '-01';
	               var  day = new Date(year,month,0); 
	               var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期  
	               
	               return firstdate+"~"+lastdate;
	            };
    			scope.monthChange = function(month){
    				var monthStr = "01";
    				var year  = month.addition;
    				if((month.key+"").length == 1){
    					monthStr = "0" + month.key;
    				}else{
    					monthStr = month.key+"";
    				}
    				var range = scope.getFirstAndLastMonthDay(year, monthStr);
    				var dates = range.split("~");
    				scope.setDateRange(dates[0],dates[1]);
    			};
    			//获取两个日期的月份差
    			scope.getMonthInterval = function(d1,d2){
    				var dateStr1 = scope.simpleFormat(d1);
    				var dateStr2 = scope.simpleFormat(d2);
    				dateStr1 = dateStr1.split('-');
    				dateStr1 = parseInt(dateStr1[0]) * 12 + parseInt(dateStr1[1]);
    				dateStr2 = dateStr2.split('-');
    				dateStr2 = parseInt(dateStr2[0]) * 12 + parseInt(dateStr2[1]);
    				return Math.abs(dateStr1 - dateStr2);
    			};
    			//月份下来框
    			scope.setMonthSelect = function(){
    				var d = new Date();
    				var y = d.getFullYear();
    				var m = d.getMonth()+1;
    				if(appConfig.ProductOption && appConfig.ProductOption.registertime){
    					var rd = new Date(appConfig.ProductOption.registertime);
    					var rty = rd.getFullYear();
    					var monthInterval = scope.getMonthInterval(d,rd);
    					if(monthInterval>11){
    						monthInterval = 11;
    					}
    					var selectV = [{key:"month",value:"月份"}];
    					for(var i=0; i<=monthInterval; i++){
    						if(m==0){
    							y--;
    							m=12;
    							selectV.push({
    								key : m,
    								addition : y,
    								value : y+"年"+m+'月'
    							});
    							m--;
    						}else{
    							selectV.push({
    								key : m,
    								addition : y,
    								value : y+"年"+m+'月'
    							});
    							m--;
    						}
    						if(rty > y){
    							break;
    						}
    					}
    					scope.selectMonthData = selectV;
    					scope.currentMonth  = selectV[0];
    				}
    			}
    			//约束时间必须小于等于产品注册时间
    			scope.dateLimit = function(dateRange){
    				var dates = dateRange.split("~");
    				var sd = dates[0];
    				var ed = dates[1];
    				var td = new Date();
    				td = scope.simpleFormat(td);
    				if(appConfig.ProductOption && appConfig.ProductOption.registertime){
    					var rd = new Date(appConfig.ProductOption.registertime);
    					rd = scope.simpleFormat(rd);
    					if(td<rd){   //防止系统时间不正确
    						td = rd; 
    					} 
    					if(sd < rd){
    						sd = rd;
    					}
    					if(ed > td){
    						ed = td;
    					}
    					if(sd > ed){
    						ed = sd;
    					}
    					return sd + "~" + ed;
    				}else{
    					return dateRange;
    				}
    			}
    			scope.setDateRange = function(a,b,noBroadcast){
    				var displayValue = "";
    				if(a && b){
            			displayValue =a+"~"+b;
    				}else if(a){
    					displayValue =a+"~"+a;
    				}else{
    					var startData=scope.getDataStr(0,-1);
    					var endData=scope.getDataStr();
        				displayValue =startData+"~"+endData;
    				}
    				scope.displayValue = scope.dateLimit(displayValue);
    				scope.start = scope.displayValue.split("~")[0];
    				scope.end = scope.displayValue.split("~")[1];
    				scope.start_end = scope.start + sign + scope.end;
    				DataRangeService.setDateRange(scope.displayValue,noBroadcast);
    			}
    			//初始化入口
    			scope.setMonthSelect();
    			var range = DataRangeService.getDateRange();
    			var noBroadcast = true;
    			if(scope.conditionType == "main"){
    				noBroadcast = false;
    			}
    			if(range){
    				var dates = range.split("~");
    				if(dates[0] == dates[1]){
    					scope.setDateRange(dates[0],undefined,noBroadcast);
    				}else{
    					scope.setDateRange(dates[0],dates[1],noBroadcast);
    				}
    			}else{
    				scope.setDateRange(undefined,undefined,noBroadcast);
    			}
    			scope.changeStart=function(start){
    				scope.start = start;
    			}
    			scope.changeEnd=function(end){
    				scope.end = end;
    			}
		    }
    	}
    }]);
});
