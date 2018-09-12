;;(function (w) {
    var util = window.TD.base.util;
    var defaults = {
            //date : "2015/10",
            //disable : {
            //    frist : "2014/01",
            //    last : "2016/11"
            //},
            trigger: "click",
            number: 2,
            language: "zh_CN",
            preNextMonthButton: {
                pre: true,
                next: true
            }
        },
        meConfing = {},
        RenderDom, Operation;
    RenderDom = {
        createFrame: function () {
            var html = '<div class="TD_MonthPicke_Frame"><div class="TD_MonthPicke_Frame_Content"></div></div>';
            return html;
        },
        createMonthPicke: function (con, options) {
            var header = this.header(con, options),
                list = this.monthList(con, options);
            var html = '<div class="TD_MonthPicke">' + header + '<ul class="TD_MonthPicke_MonthList">' + list + '</ul></div>';
            return html;
        },
        header: function (con, options) {
            var html = '<div class="TD_MonthPicke_header">';
            if (!options.preNextBtn || options.preNextBtn.pre) {//是否需要显示上一月按钮
                html += '<i target-type="TD_MonthPicke_pre" class="TD_MonthPicke_pre">pre</i>';
            }
            html += options.year
            if (!options.preNextBtn || options.preNextBtn.next) {//是否需要显示上一月按钮
                html += '<i target-type="TD_MonthPicke_next" class="TD_MonthPicke_next">next</i>';
            }
            return html + '</div>';
        },
        monthList: function (con, options) {
            var html = '';
            for (var i = 1; i < 13; i++) {
                var m = util.addZero(i),
                    date = options.year + "/" + m + "/01";
                html += '<li><span target-type="TD_MonthPicke_month" data-type="' + date + '" class="TD_MonthPicke_month ' + this.statusClass(con, date) + '">' + m + '</span></li>';
            }
            return html;
        },
        statusClass: function (con, date) {
            var time = new Date(date).getTime(),
                className = '';
            if (con.disable) {
                var disbF = new Date(con.disable.frist).getTime(),
                    disbL = new Date(con.disable.last).getTime();
                if (disbF > time || disbL < time) {
                    className = 'disable';
                    return className;
                }
            }
            if (con.date) {
                var selected = new Date(con.date).getTime();
                if (time === selected) {
                    className = 'chooes';
                    return className;
                }
            }
            return className
        }
    };
    Operation = {
        init: function (myThis) {
            myThis.yearArr = [];

            this.reloadHTML(myThis);
            this.eventBind(myThis);
        },
        reloadHTML: function (myThis) {
            myThis.$html = $(RenderDom.createFrame());
            this.renderMonthPicke(myThis);
            $(myThis.o.$target).append(myThis.$html);
        },
        renderMonthPicke: function (example) {
            if (example.o.date.length >= 7) {
                example.o.date = example.o.date;
            }
            var startYear = example.o.date ? new Date(example.o.date).getFullYear() : new Date().getFullYear(),
                number = example.o.number,
                arrLen = example.yearArr.length,
                html = '';
            if (arrLen > 0) {
                number = arrLen;
                startYear = example.yearArr[0];
            }
            for (var i = 0; i < number; i++) {
                var year = startYear + i;
                if (arrLen == 0) {
                    example.yearArr.push(year);
                }
                var options = {
                    year: year
                };
                if (!example.o.preNextMonthButton) {
                    options.preNextBtn = $.extend(true, defaults.preNextMonthButton);
                } else {
                    var btn = example.o.preNextMonthButton[i + 1];
                    if (btn) {
                        options.preNextBtn = $.extend(true, {}, defaults.preNextMonthButton, btn);
                    } else {
                        options.preNextBtn = $.extend(true, {}, example.o.preNextMonthButton);
                    }
                }
                html += RenderDom.createMonthPicke(example.o, options);
            }
            example.$html.find(".TD_MonthPicke_Frame_Content").html($(html));
        },
        eventBind: function (example) {
            var _this = this;
            $(example.$html).on("click", function (e) {
                var $target = $(e.target),
                    type = $target.attr("target-type");
                switch (type) {
                    case "TD_MonthPicke_pre" ://上一月
                        _this.preYear(example);
                        break;
                    case  "TD_MonthPicke_next" ://下一月
                        _this.nextYear(example);
                        break;
                    case "TD_MonthPicke_month" :
                        var hashClass = $target.attr("class");
                        if (hashClass.indexOf("disable") <= 0) {
                            example.o.date = $target.attr("data-type");
                            _this.renderMonthPicke(example);
                            var msg = example.o.date;
                            $(example).trigger("selectMonth", [msg])
                        }
                        break;
                    /*case "TD_MonthPicke_confirm" :
                     myThis.o.date = example.o.date;
                     $(this).hide();
                     var msg = {
                     date : example.o.date
                     }
                     $(myThis).trigger("confirm",[msg]);
                     break;
                     case "TD_MonthPicke_cancle" :
                     $(this).hide();
                     example.o.date = myThis.o.date;
                     _this.renderMonthPicke(example);
                     break;*/
                    default :
                        break;
                }
                e.stopPropagation();
            });
        },
        preYear: function (example) {
            var l = example.yearArr.length,
                pYaer = example.yearArr[0] + 1;
            if (l > 1) {
                for (var i = 0; i < l; i++) {
                    example.yearArr[i] = example.yearArr[i] - 1
                }
            } else {
                example.yearArr = [pYaer]
            }
            this.renderMonthPicke(example);
        },
        /**
         * 下一月
         * 维护当前实例的日历显示数组 calendarMonths
         * @param example
         */
        nextYear: function (example) {
            var l = example.yearArr.length,
                nYaer = example.yearArr[0] + 1;
            if (l > 1) {
                for (var i = 0; i < l; i++) {
                    example.yearArr[i] = example.yearArr[i] + 1
                }
            } else {
                example.yearArr = [nYaer]
            }
            this.renderMonthPicke(example);
        }
    };
    var TD_MonthPicke = function (target, options) {
        this.o = $.extend(true, {
            $target: $(target)
        }, defaults, options);
        Operation.init(this);
    };
    w.TD = window.TD || {};
    w.TD.ui = window.TD.ui || {};
    w.TD.ui.TD_MonthPicke = TD_MonthPicke;
})(window);