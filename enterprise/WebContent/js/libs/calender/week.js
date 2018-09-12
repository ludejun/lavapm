(function (w) {
    var util = window.TD.base.util;
    var defults = {
            endPreWeek: false,
            tirgger: "click",
            language: "zh_CN"
        },
        meConfig = {
            format: "yyyy/MM/dd"
        };
    var RenderDom = {
        createFrame: function () {
            var html = '<div class="TD_WeekPicke">' +
                '<div class="TD_WeekPicke_header"><i class="TD_WeekPicke_pre" target-type="pre">pre</i><span target-type="TD_WeekPicke_week"></span><i class="TD_WeekPicke_next " target-type="next">next</i></div>' +
                '<ul class="TD_WeekPicke_content" target-type="table"></ul>' +
                    // '<div class="TD_WeekPicke_operation"><a href="javascript:void(0)" target-type="confirm" class="TD_WeekPicke_Confirm">'+util.language(language,"Confirm")+'</a><a href="javascript:void(0)" target-type="cancle" class="TD_WeekPicke_cancle">'+util.language(language,"Cancel")+'</a></div>' +
                '</div>';
            return html;
        },
        renderCon: function (example) {
            var year = example.o.date.substring(0, 4),
                month = example.o.date.substring(5, 7);
            example.$html.find("[target-type='TD_WeekPicke_week']").html(example.o.date);
            example.$html.find("[target-type='table']").html(Operation.renderYear(example, year, month));
        },
        //判断默认选中最近一周
        isNowWeek: function (endTime, nowTime) {

            /*
             * 如果结束时间不存在返回 false
             * nowTime 当前循环的时间段
             * endTime 结束的时间点
             * 后端只返回当前上一周的数据
             * hasTime 储存对比时间
             */
            if (!endTime) return false;

            var hasTime = '';
            var targetDate = new Date(endTime);
            var nowDate = targetDate.getDate();
            var nowYear = targetDate.getFullYear();
            var nowMonth = targetDate.getMonth() + 1;
            var monthHasDay = util.MonthHasDay(nowYear, nowMonth);

            //初始化变量设置
            var weekYear, weekMonth, weekDay
            /*
             * 1: 减法可能跨月 
             * 2: 减法可能跨年
             */
            if (nowDate - 7 > 0) {
                weekYear = nowYear;
                weekMonth = nowMonth;
                weekDay = nowDate - 6;
            } else {

                //判断是否跨年
                if (nowMonth == 1) {
                    weekYear = nowYear - 1;
                    weekMonth = 12;
                } else {
                    weekYear = nowYear;
                    weekMonth = nowMonth - 1;
                }
                weekDay = util.MonthHasDay(weekYear, weekMonth) - ( nowDate - 6 );
            }

            //月日补零操作
            nowMonth = nowMonth < 10 ? ( "0" + nowMonth ) : nowMonth;
            nowDate = nowDate < 10 ? ( "0" + nowDate ) : nowDate;
            weekMonth = weekMonth < 10 ? ( "0" + weekMonth ) : weekMonth;
            weekDay = weekDay < 10 ? ( "0" + weekDay ) : weekDay;

            hasTime = weekYear + '/' + weekMonth + '/' + weekDay + '-' + nowYear + '/' + nowMonth + '/' + nowDate;
            if (hasTime === nowTime) {
                return true;
            } else {
                return false;
            }
        },
        renderWeek: function (example, year, end, i, first, last) {
            var week = util.addZero(i + 1),
                s = util.calculationTime(end, 1),
                obj = {
                    s: util.formatDate(s, meConfig.format),
                    e: util.formatDate(util.calculationTime(s, 6), meConfig.format)
                },
                val = util.formatDate(obj.s, "yyyy/MM/dd") + '-' + util.formatDate(obj.e, "yyyy/MM/dd"),
                classNanme = '',
                str = year + '-' + week;//+Language.init("week"),//周
            strS = util.formatDate(obj.s, "MM-dd"),
                strE = util.formatDate(obj.e, "MM-dd"),
                timeS = new Date(obj.s).getTime()
            timeE = new Date(obj.e).getTime();
            /*
             * 初始化的时候对比默认选中的日期
             * 点击之后对比已经有值的日期
             */
            if (( this.isNowWeek(example.o.disable.last, val) && !example.o.val )
                || example.o.val == val) {
                classNanme = 'choose';
            }
            if (timeS >= first && timeE <= last) {
                obj.html = '<li data-week="' + str + '" target-type= "week" val="' + val + '" class="' + classNanme + '"><span>' + str + '</span><em>' + strS + '~' + strE + '</em></li>';
            } else {
                obj.html = '<li val="' + val + '" class="disable"><span>' + str + '</span><em>' + strS + '~' + strE + '</em></li>';

            }
            return obj;
        }

    };
    var Operation = {
        init: function (myThis) {

            this.reloadHTML(myThis);
            this.eventBuid(myThis);
        },
        reloadHTML: function (myThis) {
            myThis.$html = $(RenderDom.createFrame(myThis.o.language));
            RenderDom.renderCon(myThis);
            $(myThis.$target).append(myThis.$html);
        },
        eventBuid: function (myThis) {
            var _this = this;

            // RenderDom.renderCon(example);
            //点击事件
            /*$(example.$target).on(example.o.tirgger,function(e){
             e.stopPropagation();
             example.o.date = myThis.o.date;
             example.o.val = myThis.o.val;
             // RenderDom.setPosition(example);
             //e.stopPropagation();
             });*/
            $(myThis.$html).on("click", "li,i,a", function (e) {
                var $target = $(this),
                    type = $target.attr("target-type");
                switch (type) {
                    case "week":
                        if ($target.hasClass("choose")) {
                            return;
                        }
                        myThis.o.val = $target.attr("val");
                        myThis.o.week = $target.attr("data-week");
                        $('[target-type= "week"].choose').removeClass("choose");
                        $target.addClass("choose");
                        var msg = {
                            week: myThis.o.week
                            , val: myThis.o.val
                        }
                        $(myThis).trigger("selectWeek", [msg]);
                        break;
                    case "pre":
                        _this.preNextYear(myThis, 'pre');
                        break;
                    case "next":
                        _this.preNextYear(myThis, 'next');
                        break;
                    /*case "confirm":
                     if( example.o.val ){
                     myThis.o.val = example.o.val;
                     var isStoreTime = example.o.val.split('-')[1];
                     myThis.o.date = isStoreTime.substring(0,7);
                     myThis.o.week = example.o.week;
                     $(myThis).trigger("confirm",myThis.o);
                     $(example.$html).hide();
                     }
                     break;
                     case "cancle":
                     $(example.$html).hide();
                     break;*/
                    default:
                        break;
                }
            });
            /*$("body").on("click",function(e){
             var target = $(e.target);
             var parent = target.parent();
             if( !target.hasClass("calen_con_week") && !parent.hasClass("calen_con_week") ){
             $(".TD_WeekPicke").hide();
             }
             })*/
        },
        renderYear: function (example, year, month) {
            var weekNum = this.getNumOfWeeks(year),
                yearStartDay = new Date(year + "/01/01"),
                firstWeek = util.isWeeks(yearStartDay),
                startDay = util.calculationTime(yearStartDay, (8 - firstWeek)),
                start = util.formatDate(util.calculationTime(startDay, -14), meConfig.format),//初始从上周日期开始
                end = util.formatDate(util.calculationTime(startDay, -8), meConfig.format),
                html = '',
                disable = example.o.disable,
                first, last;
            if (disable) {
                first = new Date(disable.first).getTime();
                last = new Date(disable.last).getTime();
            }
            for (var i = 0; i < weekNum; i++) {
                var obj = RenderDom.renderWeek(example, year, end, i, first, last);
                start = obj.s;
                end = obj.e;
                if (end.indexOf(year + "/" + month) >= 0) {
                    html += obj.html;
                }
            }
            return html;
        },
        getNumOfWeeks: function (year) {
            var num = util.LeapPingnian(year) ? 366 : 365,
                week = new Date(year).CNgetDay();
            return Math.ceil((num - week) / 7.0);
        },
        preNextYear: function (example, type) {

            var date = new Date(example.o.date);
            if (type === 'pre') {
                date = util.formatDate(util.getPreMonth(date), "yyyy/MM");
            } else {
                date = util.formatDate(util.getNextMonth(date), "yyyy/MM");
            }
            example.o.date = date;
            RenderDom.renderCon(example);
        }

    };
    var TD_WeekPicke = function (target, options) {
        this.o = $.extend(true, defults, options);
        this.$target = $(target);
        Operation.init(this);
    };
    TD_WeekPicke.prototype = {
        setWeek: function () {

        }
    };

    w.TD = window.TD || {};
    w.TD.ui = window.TD.ui || {};
    w.TD.ui.TD_WeekPicke = TD_WeekPicke;
})(window);