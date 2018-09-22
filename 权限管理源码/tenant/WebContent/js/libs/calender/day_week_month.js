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
            var lan = opt.language
                ;
            var html = '<div class="DatePicke" style="display: none;">'
                + '<div class="DatePicke_tool">'
                + '<span class="DatePicke_tools_datetype">'
                + '<a href="javascript:void(0)" data-type="day" ' + (opt.type == 'day' ? 'class="choolse"' : '') + '>近期</a>'
                    //+ '<a href="javascript:void(0)" data-type="week" ' + (opt.type == 'week' ? 'class="choolse"' : '') + '>周度</a>'
                + '<a href="javascript:void(0)" data-type="month" ' + (opt.type == 'month' ? 'class="choolse"' : '') + '>月度</a></span>'
                + '<span class="DatePicke_tool_shortcut">'
                + '<a href="javascript:void(0)" data-type="6" class="">近7天</a>'
                + '<a href="javascript:void(0)" data-type="29" class="">近30天</a>'
                + '<a href="javascript:void(0)" data-type="89" class="">近90天</a>'
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
        , datePickePosition: function (example) {
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
            $html.css({
                right: "1px",
                top: oT + "px"
            });
        }
    }
    Operation = {
        init: function (myThis) {
            var example = $.extend(false, {}, myThis);
            example.$html = ReloadDom.init(example.o);
            $("body").append(example.$html);
            this.reloadCalendar(example);
            this.eventBind(example, myThis);
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
                    break;
            }
            $target.show();
        }
        , reloadDay: function (example, target) {

            if (!example.dayCalendar) {
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
        , eventBind: function (example, myThis) {
            var _this = this;
            $(example.o.$target).on("click", function (e) {
                _this.reloadCalendar(example);
                $(example.$html).show();
                ReloadDom.datePickePosition(example);
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
                    }
                }


            });
            $(example.$html).on("click", ".DatePicke_tools_datetype a", function (e) {
                var $target = $(e.target)
                    , type = $target.data("type")
                    ;
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
                } else {
                    example.o = $.extend(true, {}, myThis.o);
                    $(example.$html).hide();
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
            var endDate = TD.base.util.formatDate(new Date(), example.o.format)
                , date = {
                start: TD.base.util.calculationTime(endDate, -num)
                , end: endDate
            };
            example.dayCalendar.setDate(date, function (e) {
                if (e.status == "success") {
                    example.o.dayCalendar.date = $.extend(true, {}, e.date);
                }
            });

        }
    };
    var TD_Day_week_monthPicke = function (target, opt) {
        this.o = $.extend(true, {
            $target: $(target)
        }, defaults, opt);

        var disable = $.extend(true, {}, this.o.disable);
        this.o.dayCalendar.disable = this.o.dayCalendar.disable || disable;
        this.o.weekCalendar.disable = this.o.weekCalendar.disable || disable;
        this.o.monthCalendar.disable = this.o.monthCalendar.disable || disable;

        Operation.init(this);
    };
    w.TD = window.TD || {};
    w.TD.ui = window.TD.ui || {};
    w.TD.ui.TD_Day_week_monthPicke = TD_Day_week_monthPicke;
})(window);