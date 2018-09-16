(function (w) {
    var defaults = {
        type: "day" //"day"/"week"/"month"
        , dayCalendar: {
            dayOperationStatus: false
        }
        , monthCalendar: {
            preNextMonthButton: {
                "1": {
                    next: false
                },
                "2": {
                    pre: false
                }
            }
        }
        , format: "yyyy/MM/dd"
        , language: "zh_CN"
    }, ReloadDom, Operation;
    ReloadDom = {
        init: function (opt) {
        	var fastSelectDaysDefault = [{
				key:'6',
				label:'近7天'
			},{
				key:'29',
				label:'近30日'
			},
			{
				key:'89',
				label:'近90日'
			}];
        	var fastSelectDays = [];
        	if(opt.fastSelectDays && opt.fastSelectDays.length > 0){
        		fastSelectDays = opt.fastSelectDays;
        	}else{
        		fastSelectDays = fastSelectDaysDefault;
        	}
        	
        	var fastDaysHtml = '';
        	for(var i = 0;i<fastSelectDays.length;i++){
        		fastDaysHtml += '<a href="javascript:;" data-type="'+fastSelectDays[i].key+'" class="">'+fastSelectDays[i].label+'</a>';
        	}
        	
            var lan = opt.language;
                ;
            var html = '<div class="DatePicke" style="display: none;">'
                + '<div class="DatePicke_tool">'
                + '<span class="DatePicke_tools_datetype">'
                + '<a href="javascript:void(0)" data-type="day" ' + (opt.type == 'day' ? 'class="choolse"' : '') + '>近期</a>'
                    //+ '<a href="javascript:void(0)" data-type="week" ' + (opt.type == 'week' ? 'class="choolse"' : '') + '>周度</a>'
                + '<a href="javascript:void(0)" data-type="month" ' + (opt.type == 'month' ? 'class="choolse"' : '') + '>月度</a></span>'
                + '<span class="date-picke-label">'
                + '<i class="glyphicon glyphicon-calendar"> </i>'
                + '<b class="display-time"></b>'
                + '</span>'
                + '<span class="DatePicke_tool_shortcut">'
                + fastDaysHtml
                + '</span></div>'
                + '<div class="DatePicke_content">'
                + '<div data-type="day_con"></div>'
                + '<div data-type="week_con"></div>'
                + '<div data-type="month_con"></div>'
                + '</div>'
                + '<div class="DatePicke_operation">'
                + '<a href="javascript:void(0)" data-type="confirm" class="TD_WeekPicke_Confirm">' + TD.base.util.language(lan, "Confirm") + '</a>'
                + '<a href="javascript:void(0)" data-type="cancle" class="TD_WeekPicke_cancle">' + TD.base.util.language(lan, "Cancel") + '</a></div><div>';
            return $(html);
        }
        /**
         * 设置日历位置
         * @param example
         */
        , datePickePosition: function (example,isInner) {
            example.$html.css("position", "absolute");
            var $target = example.o.$target,
                $html = example.$html,
                top = $target.offset().top,
                left = $target.offset().left,
                wW = $(document).width(),
                wH = $(document).height(),
                tW = $target.innerWidth(),
                tH = $target.innerHeight(),
                oW = $html.innerWidth(),
                oH = $html.innerHeight(),
                oL, oT;
            if (wW - left >= oW) {
                oL = left;
            } else {
                oL = left + tW - oW;
            }
            if (wH - (top + tH) >= oH) {
                oT = top + tH;
            } else {
                oT = top - oH;
            }
            if(isInner){
            	if (wW - left >= oW) {
	            	$html.css({
	                    left: "0px",
	                    top: tH + "px"
	                });
            	}else{
            		$html.css({
	                    right:"0px",
	                    top: tH + "px"
	                });
            	}
            	
            }else{
            	$html.css({
                    right: "0px",
                    top: oT + "px"
                });
            }
        }
    }
    Operation = {
        init: function (myThis,isInner) {
            var example = $.extend(false, {}, myThis);
            example.$html = ReloadDom.init(example.o);
            if(isInner){
            	var $target = example.o.$target;
            	$target.append(example.$html);
            }else{
            	$("body").append(example.$html);
            }
            this.reloadCalendar(example);
            this.eventBind(example, myThis,isInner);
        }
        , reloadCalendar: function (example) {
            var $conTarget = $(example.$html).find(".DatePicke_content")
                , $shortcut = $(example.$html).find(".DatePicke_tool_shortcut")
                , $target = $conTarget.find("[data-type='day_con']")
                ;
            $conTarget.children("div").hide();
            switch (example.o.type) {
                case "week" :
                    $shortcut.hide();
                    $target = $conTarget.find("[data-type='week_con']");
                    this.reloadWeek(example, $target);
                    break;
                case "month":
                    $shortcut.hide();
                    $target = $conTarget.find("[data-type='month_con']");
                    this.reloadMonth(example, $target);
                    break;
                default :
                    $shortcut.show();
                    this.reloadDay(example, $target);
                    /*var type = '';
                    if($shortcut.find(".choolse").length > 0){
                    	type = $shortcut.find(".choolse").attr("data-type");
                    }else{
                    	$shortcut.children().eq(0).addClass("choolse");
                    	type = $shortcut.children().eq(0).attr("data-type");
                    }
                    this.setDayDate(example, type);*/
                    
                    if(example.o && example.o.dayCalendar && example.o.dayCalendar.date && example.o.dayCalendar.date.start && example.o.dayCalendar.date.end){
                    	var html = this.formatDateLine(example.o.dayCalendar.date.start,'-')+"~"+this.formatDateLine(example.o.dayCalendar.date.end,'-');
                        $(example.$html).find(".display-time").html(html);
                    }
                    break;
            }
            $target.show();
        },
        formatDateLine : function(date,sign){
			var fDate = date;
			if(date){
				if(date.indexOf("/") != -1){
					var attr = date.split("/");
					fDate = attr[0] + sign + attr[1] + sign + attr[2];
				}
			}
			return fDate;
		}
        , reloadDay: function (example, target) {

            if (!example.dayCalendar) {
            	console.dir([example.o.dayCalendar]);
                example.dayCalendar = new TD.ui.Calendar(target, example.o.dayCalendar);
            }
        }
        , reloadWeek: function (example, target) {
            if (!example.weekCalendar) {
                example.weekCalendar = new TD.ui.TD_WeekPicke(target, example.o.weekCalendar);
                $(example.weekCalendar).on("selectWeek", function (e, msg) {
                    example.o.weekCalendar.date = msg.week;
                    example.o.weekCalendar.val = msg.val;
                });
            }


        }
        , reloadMonth: function (example, target) {
            if (!example.monthCalendar) {
                example.monthCalendar = new TD.ui.TD_MonthPicke(target, example.o.monthCalendar);
                $(example.monthCalendar).on("selectMonth", function (e, msg) {
                    example.o.monthCalendar.date = msg;
                })
            }
        }
        , eventBind: function (example, myThis,isInner) {
            var _this = this;
            $(example.o.$target).on("click", function (e) {
                _this.reloadCalendar(example);
                $(example.$html).show();
                ReloadDom.datePickePosition(example,isInner);
                e.stopPropagation();
            });
            $("body").on("click", function (e) {
                var dom = e.target;
                while ((!$(dom).hasClass("DatePicke")) && dom != document.body) {
                    if (dom == document.body || dom.parentNode == null) {
                        break;
                    }

                    dom = dom.parentNode;
                }
                //TD_Calendar
                if (!$(dom).hasClass("TD_Calendar")) {
                    if (dom == document.body || (!$(dom).hasClass("DatePicke"))) {
                        $(example.$html).hide();
                        $(example.$html).parent().siblings(".calendar-tools").addClass("hide");
                    }
                }


            });
            $(example.$html).on("click", ".DatePicke_tools_datetype a", function (e) {
                var $target = $(e.target)
                    , type = $target.data("type")
                    ;
                if(type == 'day'){
                	$(example.$html).find(".date-picke-label").show();
                }else{
                	$(example.$html).find(".date-picke-label").hide();
                }
                example.o.type = type;
                $target.addClass("choolse").siblings().removeClass("choolse");
                ;
                _this.reloadCalendar(example);

                e.stopPropagation();
            });
            $(example.$html).on("click", ".DatePicke_tool_shortcut a", function (e) {
                var $target = $(e.target)
                    , type = $target.data("type")
                    ;
                $target.addClass("choolse").siblings().removeClass("choolse");
                _this.setDayDate(example, type);

                e.stopPropagation();
            });
            $(example.$html).on("click", ".DatePicke_operation a", function (e) {
                var $target = $(e.target)
                    , type = $target.data("type")
                    , msg = {
                        type: example.o.type
                    }
                    ;
                if (type == "confirm") {
                    switch (msg.type) {
                        case "week":
                            msg.date = example.o.weekCalendar.date;
                            msg.val = example.o.weekCalendar.val;
                            break;
                        case "month":
                            msg.date = example.o.monthCalendar.date;
                            break;
                        default:
                            msg.date = $.extend(true, {}, example.o.dayCalendar.date);
                            break;
                    }

                    myThis.o = $.extend(true, {}, example.o);
                    $(myThis).trigger("confirm", [msg]);
                    $(example.$html).hide();
                    $(example.$html).parent().siblings(".calendar-tools").addClass("hide");
                } else {
                    example.o = $.extend(true, {}, myThis.o);
                    $(example.$html).hide();
                    $(example.$html).parent().siblings(".calendar-tools").addClass("hide");
                }

                e.stopPropagation();
            });

        }
        , setWeekDate: function (example, date) {
            example.o.calendar.date = $.extend(true, {}, e.date);
        }
        , setMonthDate: function (example, date) {
            example.o.calendar.date = $.extend(true, {}, e.date);
        }
        , setDayDate: function (example, num) {
        	var _this = this;
        	var addDayCount = 0;
        	if(example.o && example.o.fastDayEnd != null && example.o.fastDayEnd != undefined){
        		addDayCount = example.o.fastDayEnd;
        	}
        	var endDate = TD.base.util.getDateStr(addDayCount), 
        		date = {
        			start: TD.base.util.calculationTime(endDate, -num), 
        			end: endDate
        		};
            /*var endDate = TD.base.util.formatDate(new Date(), example.o.format)
                , date = {
                start: TD.base.util.calculationTime(endDate, -num)
                , end: endDate
            };*/
            example.dayCalendar.setDate(date, function (e) {
                if (e.status == "success") {
                    example.o.dayCalendar.date = $.extend(true, {}, e.date);
                    var html = _this.formatDateLine(e.date.start,'-')+"~"+_this.formatDateLine(e.date.end,'-');
                    $(example.$html).find(".display-time").html(html);
                }
            });

        }
    };
    var TD_Day_week_monthPicke = function (target, opt,isInner) {
        this.o = $.extend(true, {
            $target: $(target)
        }, defaults, opt);

        var disable = $.extend(true, {}, this.o.disable);
        this.o.dayCalendar.disable = this.o.dayCalendar.disable || disable;
        this.o.weekCalendar.disable = this.o.weekCalendar.disable || disable;
        this.o.monthCalendar.disable = this.o.monthCalendar.disable || disable;

        Operation.init(this,isInner);
    };
    w.TD = window.TD || {};
    w.TD.ui = window.TD.ui || {};
    w.TD.ui.TD_Day_week_monthPicke = TD_Day_week_monthPicke;
})(window);