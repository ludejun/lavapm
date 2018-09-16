define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdWeekMonthPicke',['$timeout','$state', function($timeout,$state) {
    	return {
    		restrict : 'EA',
    		scope:{
    			fastSelectDays : "=",
    			fastDayEnd:"=",
    			formatDateNumber:"=",
    			startDate:"=",
    			endDate:"=",
    			tdChange: "&"
    		},
    		templateUrl : "/enterprise/js/libs/calender/TdCalendar/template/td-week_month-picke.html",
    		link: function(scope, elem, attrs) {
    			scope.newDate = function(str) {
    				if(str){
    					if(str.indexOf("/") != -1){
    						str = str.split('/'); 
    					}else if(str.indexOf("-") != -1){
    						str = str.split('-'); 
    					}
    				}
    				var date = new Date();
    				date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
    				date.setUTCHours(0, 0, 0, 0); 
    				return date; 
    			} 
    			
    			scope.datetime_to_unix = function(datetime){
    				var timestamp = Date.parse(scope.newDate(datetime));
    				return timestamp;
    			}
    			
    			scope.datetime_to_number = function(datetime){
    				var dateNum = '';
    				if(datetime){
    					var dateAttr = datetime.split("/");
    					if(dateAttr[0] && dateAttr[1] && dateAttr[2]){
    						dateNum = dateAttr[0].toString() + dateAttr[1].toString() + dateAttr[2].toString();
    					}
    				}
    				return dateNum;
    			}
    			
    			
    			scope.showCalendar =function(){
    				if(window.parent && window.parent.iFrameScrollHeight){
						window.setTimeout(window.parent.iFrameScrollHeight,200);
					}
    			}
    			
    			scope.getTodayDate = function(){
    				var today = '';
    				var myDate = new Date();
    				var fullYear = myDate.getFullYear();
    				var month = myDate.getMonth() + 1;  
    				var date = myDate.getDate();
    				if(month < 10){
    					month = '0'+month;
    				}
    				if(date < 10){
    					date = '0'+date;
    				}
    				today = fullYear + '/' + month +'/'+date;
    				return today;
    			}
    			
    			scope.changeDateValues = function(msg){
    				var response = {
    					start:'',
    					end:'',
    					type : ''
    				};
    				if(msg && msg.type && msg.date){
    					if(msg.type == 'day'){
    						response = {
		    					start:msg.date.start,
		    					end:msg.date.end,
		    					type : 'day'
		    				};
    					}else if(msg.type == 'month'){//date
    						var date = "";
    						var day = "";
    						var attr;
    						if(msg.date){
    							if(msg.date.indexOf("/") != -1){
    								attr = msg.date.split("/");
    								if(attr[2]){
    									day = attr[2];
    								}else{
    									day = "01";
    								}
    								date = attr[0] + "/"+attr[1]+"/"+day;
    								
    								var dateEndLong = Date.parse(date, 'yyyy/MM/dd');
    								dateEndLong += 86400000 * 29;
    								
    								var month = attr[1];
    								if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
    									dateEndLong += 86400000;
    								}else if (month == '02') {
    									
    									if (parseInt(attr[0]) % 4 == 0) {
    										dateEndLong -= 86400000 * 1;
										}else {
											dateEndLong -= 86400000 * 2;
										}
    								}
    								
    								var dateEnd = new Date(dateEndLong).Format('yyyy/MM/dd');
    								response = {
				    					start:date,
				    					end:dateEnd,
				    					type : 'month'
				    				};
    							}
    						}
    						
    					}
    				}
    				return response;
    			}
    			
    			scope.getMonth = function(today){
    				var month = "";
    				var attr;
    				if(today){
    					if(today.indexOf("/") != -1){
        					attr = today.split("/");
        				}else if(today.indexOf("-") != -1){
        					attr = today.split("-");
        				}
        				month = attr[0] +'/'+ attr[1];
    				}
    				return month;
    			}
    			
    			scope.formatDateStr = function(d) {
    				var formatStr = ""; 
    				if(d){
    					var sign = '/';
    			    	var myDate = new Date(parseFloat(d));
    			    	var fullYear = myDate.getFullYear();
    			    	var month = myDate.getMonth()+1; 
    			    	var date = myDate.getDate(); 
    			    	var hours = myDate.getHours();       //获取当前小时数(0-23)
    			    	var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    			    	var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
    			    	//myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    			    	if(sign == undefined){
    			    		sign = '';
    			    	}
    			    	if(month < 10){
    			    		month = '0' + month;
    			    	}
    			    	if(date < 10){
    			    		date = '0' + date;
    			    	}
    			    	if(hours < 10){
    			    		hours = '0' + hours;
    			    	}
    			    	if(minutes < 10){
    			    		minutes = '0' + minutes;
    			    	}
    			    	if(seconds < 10){
    			    		seconds = '0' + seconds;
    			    	}
    			    	formatStr = fullYear + sign + month + sign + date;
    			    	//formatStr = formatStr + ' ' + hours + ':' + minutes + ':' + seconds;
    				}
    				return formatStr;
    			}
    			
    			scope.formatDate = function(date){
    				var formatDate = "";
    				if(date){
    					date = date.toString();
						if(date.indexOf("/") != -1){
							formatDate = date;
    					}else if(date.indexOf("-") != -1){
    						var attr = date.split("-");
    						formatDate = attr[0]+"/"+attr[1]+"/"+attr[2];
    					}else{
    						formatDate =scope.formatDateStr(date);
    					}
    				}
    				return formatDate;
    			}
    			
    			scope.initCalendarValues = function(){
    				if(scope.startDate && scope.endDate){
    					var start = scope.formatDate(scope.startDate);
    					var end = scope.formatDate(scope.endDate);
    					scope.responeDate = {
	    					start : start,
	    	    			end : end,
	    	    			displayValue:scope.formatDateLine(start,'-')+"~"+scope.formatDateLine(end,'-')
	    				};
    				}
    			}
    			
    			scope.formatDateLine = function(date,sign){
    				var fDate = date;
    				if(date){
    					if(date.indexOf("/") != -1){
    						var attr = date.split("/");
    						fDate = attr[0] + sign + attr[1] + sign + attr[2];
    					}
    				}
    				return fDate;
    			}
    			
    			scope.initDateWeekMonthPicke = function(){
    				scope.initCalendarValues();
    				var $elem = $(elem);
    				$elem.find(".DatePicke").remove();
    				
    				var today = scope.getTodayDate();
    				var month = scope.getMonth(today);
    				
    				var calendar = new TD.ui.TD_Day_week_monthPicke($elem,{
    					dayOperationStatus : false,
				    	type : "day",
						number:1
				    	,dayCalendar : {
				    		date:{//当前选中日期
								start : scope.responeDate.start
								,end : scope.responeDate.end
							},
							dayOperationStatus : false
				    	}
				    	,weekCalendar : {
				    		date:  "2015/09" //显示哪个月的周
				    		,val : "2015/09/07-2015/09/13"//设置当前选中的周
				    	}

				    	,monthCalendar : {
				    		date : month//当前选中月
				    	}
				    	,disable : {
				            frist : "",
				            last : today
				        },
				        fastSelectDays:scope.fastSelectDays,
				        fastDayEnd:scope.fastDayEnd || 0
				    },true);
    				
    				$(calendar).on("confirm",function(e,msg){
    			    	//console.dir([e,msg])
    					var response = scope.changeDateValues(msg);
    					if(response && response.start && response.end){
    						scope.$apply(function (){
        						
        						scope.responeDate = {
    		    					start : response.start,
    		    	    			end : response.end,
    		    	    			displayValue:scope.formatDateLine(response.start,'-')+"~"+scope.formatDateLine(response.end,'-')
    		    				};
            			    	if(angular.isFunction(scope.tdChange)){
                					var start = response.start;
                					var end = response.end;
                					if(scope.formatDateNumber){
                						start = scope.datetime_to_number(response.start);
                    					end = scope.datetime_to_number(response.end);
                					}else{
                						start = scope.datetime_to_unix(response.start);
                    					end = scope.datetime_to_unix(response.end);
                					}
             	            		scope.tdChange()(start,end,msg.type);
             	            	}
            			    });
    					}
    			    })
    			}
    			
    			scope.$watch('startDate', function(){
    				scope.initDateWeekMonthPicke();
    			});
    			
    			scope.init = function(){
    				scope.responeDate = {
    					start : "",
    	    			end : "",
    	    			displayValue:""
    				};
    				scope.initDateWeekMonthPicke();
    			}
    			
    			scope.init();
		    }
    	}
    }]);
});
