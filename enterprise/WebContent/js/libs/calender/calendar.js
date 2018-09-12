(function ($) {
    var util = window.TD.base.util;
    var Calendar = window.TD.ui.Calendar;
    var defaults = {
            contrast: "normal", // normal(正常) disable(禁用对比) none（隐藏对比功能）
            language: "zh_CN",//en_US 日历语言(暂不支持)
            contrastType: "preMonth",//custom/preYear 对比类型 (上月/上年/自定义)
            calendar: {
                format: "yyyy/MM/dd"
            },
            dateType: "week",//day / month 选择类型（日/月/周）
            calendarType: 'normal',//contrast  显示类型（正常/对比）
            disable: {
                first: "2015/8/5",
                last: "2016/1/15",
                special: ["2016/1/10"]
            }
        },
        meConfig = {
            contrastType: {
                custom: {
                    fn: function (date) {
                        return date
                    },
                    name: '自定义'
                },
                preMonth: {
                    fn: function (date) {
                        var oldDate = new Date(date),
                            year = oldDate.getFullYear(),
                            oldM = oldDate.getMonth(),
                            oldDay = oldDate.getDate();
                        if (oldDay != 1) {
                            oldDay = util.MonthHasDay(year, oldM);
                            oldDate.setDate(oldDay);
                            oldDate.setMonth(oldM - 1);
                        } else {
                            oldDate.setMonth(oldM - 1);
                        }
                        return oldDate

                    },
                    name: '上一月'
                },
                preYear: {
                    fn: function (date) {
                        var oldDate = new Date(date),
                            oldY = oldDate.getFullYear();
                        oldDate.setFullYear(oldY - 1);
                        return oldDate;
                    },
                    name: '上一年'

                },
                preWeek: {
                    fn: function (date) {
                        var oldDate = new Date(date);
                        oldDate = TD.base.util.calculationTime(oldDate, -6);
                        return oldDate;
                    },
                    name: '上周'
                }
            },
            dataType: [
                {
                    "type": "day",
                    "name": '日',
                    "show": true
                },
                // {
                //     "type" : "week",
                //     "name" : '周',
                //     "show" : false
                // },
                {
                    "type": "month",
                    "name": '月',
                    "show": true
                }]
        },
        RenderDom, Operation;
    //DOM拼接
    RenderDom = {
        creatFrame: function (o) {
            var o = o,
                toolBar = this.creatToolBar(o),
                operationBar = this.creatOperationBar(o),
                html = '<div class="DatePicke">' + toolBar + '<div class="DatePicke_content"></div>' + operationBar + '</div>';
            return html;
        },
        /**
         * 创建工具栏
         * @param o
         * @returns {string}
         */
        creatToolBar: function (o) {
            var html = '<div class="DatePicke_tool">' +//时期：
                '<p class="DatePicke_tool_bar"><label>' + util.language(o.language, "date") + '：</label><em class="date_icon date_icon_red"></em><input data-type="DatePicke_text" readonly="true" type="text" />';
            if (o.shortcut) {
                var styles = '';
                // if(o.dateType && o.dateType !== "day"){//暂时全部显示
                //     styles = 'style="display:none"'
                // }
                html += '<span class="DatePicke_tool_shortcut" data-type="DatePicke_shortcut" ' + styles + '>';
                for (var i = 0, l = o.shortcut.length; i < l; i++) {
                    var type = "_ToolsDay",
                        name = util.language(o.language, "day"),//"天",
                        date = o.shortcut[i],
                        isShow = true,
                        isAble,
                        dateType = typeof( date ) === "object" ? date.name : date;
                    if (typeof( date ) == "object" && !date.show) {
                        isShow = false;
                    }
                    isAble = isShow ? "" : "disable";//判断是不是不可点击
                    switch (dateType) {
                        case "Yesterday" :
                            type = "Yesterday" + type;
                            name = "昨天";
                            break;
                        case "Today" :
                            type = "Today" + type;
                            name = "今天";
                            break;
                        case "All" :
                            type = "All" + type;
                            name = util.language(o.language, "all");//"全部";
                            break;
                        default :
                            type = dateType + type;
                            name = dateType + name;
                            break;
                    }
                    html += '<a href="javascript:void(0)" class="' + isAble + '" data-type="' + type + '">' + name + '</a>';
                }
                html += "</span>";
            }
            if (o.dateType) {
                html += '<span class="DatePicke_tools_datetype">';
                for (var x = 0; x < meConfig.dataType.length; x++) {
                    var className = '';
                    var typeShow = '';
                    var data = meConfig.dataType[x];
                    if (data.type === o.dateType.name || o.dateType === data.type) {
                        className = 'choose';
                    }
                    if (o.dateType && typeof( o.dateType ) !== "string"
                        && ( $.inArray(data.type, o.dateType.disable) > -1 )
                    ) {
                        typeShow = 'disable';
                    } else {
                        typeShow = '';
                    }
                    html += '<a href="javascript:void(0)" data-type="DatePicke_tools_datetype" class="' + className + ' ' + typeShow + '" data-name="' + meConfig.dataType[x].type + '">' + util.language(o.language, meConfig.dataType[x].type) + '</a>';
                }
                html += '</span>'
            }


            if (o.contrast) {
                html += '<p class="DatePicke_contarst" ><label>' + util.language(o.language, "ContrastDate") + '：</label><em class="date_icon"></em><input disabled data-type="DatePicke_contarst_text" type="text" />';
                if (o.contrastType) {
                    html += '<span>';
                    for (var x in meConfig.contrastType) {
                        var className = '';
                        if (x === o.contrastType) {
                            className = 'class="choose"';
                        }
                        html += '<a href="javascript:void(0)" ' + className + ' data-type="DatePicke_tools_contarst" data-name="' + x + '">' + util.language(o.language, x) + '</a>';
                    }
                    html += '</span>'
                }
                html += '</p>';
            }
            html += '</div>';
            return html;
        },
        /**
         * 创建操作栏
         * @param o
         * @returns {string}
         */
        creatOperationBar: function (o) {
            var html = '<div class="DatePicke_operation">';
            /*
             * o.contrast => normal 正常
             * o.contrast => disable 不可选
             * o.contrast => none活着其他标识没有
             */
            if (o.contrast === "normal") {
                html += '<p class="DatePicke_operation_l"><input type="checkbox" data-type="DatePicke_contrast_box" /><label>' + util.language(o.language, "ContrastDate") + '</label></p>';//对比日期
            } else if (o.contrast === "disable") {
                html += '<p class="DatePicke_operation_l TD_Compare_disable"><input disabled type="checkbox" data-type="DatePicke_contrast_box" /><label>' + util.language(o.language, "ContrastDate") + '</label></p>';//对比日期
            }
            html += '<p class="DatePicke_operation_r"><a href="javascript:void(0)" class="DatePicke_confirm" data-type="DatePicke_confirm">' + util.language(o.language, "Confirm") + '</a><a href="javascript:void(0)" class="DatePicke_cancel" data-type="DatePicke_cancel">' + util.language(o.language, "Cancel") + '</a></p></div> ';
            return html;
        },
        /**
         * 更新修改工具层样式
         * @param example
         */
        updateToolsDom: function (example) {
            var example = example,
                $html = example.$html,
                con = example.o;
            if (!con.date) {
                $html.find('[data-type="DatePicke_text"]').val("");
            }
            // if(con.dateType === "day"){
            //     $html.find('[data-type="DatePicke_shortcut"]').show();
            // }else{
            //     $html.find('[data-type="DatePicke_shortcut"]').hide();
            // }
            Operation.setInputDate($html.find("[data-type='DatePicke_text']"), con.calendar.date);
            if (con.contrastDate && con.contrastDate.start) {
                Operation.setInputDate($html.find("[data-type='DatePicke_contarst_text']"), con.contrastDate);
            } else {
                $html.find('[data-type="DatePicke_contarst_text"]').val("");
            }
            if (con.calendarType == "contrast") {
                $html.find(".DatePicke_contarst").show();
                $html.find('[data-type="DatePicke_contrast_box"]').prop("checked", true);
            } else {
                $html.find(".DatePicke_contarst").hide();
                $html.find('[data-type="DatePicke_contrast_box"]').prop("checked", false);
            }
        },
        /**
         * 设置日历位置
         * @param example
         */
        datePickePosition: function (example) {
            example.$html.css("position", "absolute");
            var $target = example.o.$traget,
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
    };
    //初始化，绑定事件，操作逻辑
    Operation = {
        init: function (myThis) {
            var example = $.extend(false, {}, myThis),
                con = example.o,
                _this = this,
                $body = $("body");

            //触发事件绑定
            $(myThis.o.$traget).on("click", function () {
                if (!example.$html) {//第一次实例化
                    example.$html = $(RenderDom.creatFrame(con));
                    _this.createCalendar(example);
                    //RenderDom.updateToolsDom(example);
                    _this.toolsEventBind(example, myThis);//绑定所有工具事件
                    $("body").append(example.$html);
                    RenderDom.datePickePosition(example);
                } else {
                    //每次重新渲染清除上次日历
                    example.calendar = null;
                    example.contrastCalendar = null;
                    example.o.calendar = $.extend(true, myThis.o.calendar);//继承初始日历设置
                    //设置渲染什么类型日历
                    example.o.calendarType = myThis.o.calendarType;
                    example.o.dateType = myThis.o.dateType;
                    example.o.contrastDate = $.extend(true, {}, myThis.o.contrastDate);
                    _this.createCalendar(example);
                    RenderDom.datePickePosition(example);
                    $(example.$html).show();
                }
                return false;
            });
            //body事件绑定
            $body.on("click", function () {
                $(".DatePicke_cancel").trigger("click");
            })
        },
        /**
         * 创建日历
         * @param example
         */
        createCalendar: function (example) {
            var con = $.extend({}, example.o),
                $target = example.$html.find(".DatePicke_content");
            if (example.calendar) {
                con.calendar.date = example.calendar.o.date;
                //初始化验证日期的合法性必须保证开始结束时间和限制时间都存在
                if (example.o.calendar.date && example.o.calendar.disable) {
                    if (example.o.calendar.date.start < example.o.calendar.disable.first) {
                        example.o.calendar.date.start = example.o.calendar.disable.first;
                    }
                    if (example.o.calendar.date.end > example.o.calendar.disable.last) {
                        example.o.calendar.date.end = example.o.calendar.disable.last;
                    }
                }
            }
            example.calendar = null;
            example.contrastCalendar = null;
            if (con.calendarType === "contrast") {//有对比日历
                $target.html('<div class="DatePicke_contrast_one"></div><div class="DatePicke_contrast_tow"></div>');

                var contrastCalendarOneTraget = $target.find(".DatePicke_contrast_one"),
                    contrastCalendarTowTraget = $target.find(".DatePicke_contrast_tow"),
                    oneOptions = $.extend({number: 1}, con.calendar, {
                        preNextMonthButton: false
                    }),
                    towOptions = $.extend(true, {}, oneOptions, {disable: false});
                if (example.o.contrastDate && example.o.contrastDate.start) {
                    towOptions.date = example.o.contrastDate;
                } else {
                    if (towOptions.date) {
                        towOptions.date = {
                            start: util.formatDate(meConfig.contrastType[example.o.contrastType].fn(towOptions.date.start), example.o.calendar.format),
                            end: util.formatDate(meConfig.contrastType[example.o.contrastType].fn(towOptions.date.end), example.o.calendar.format)
                        };
                    }
                    example.o.contrastDate = towOptions.date;
                }
                if (example.o.contrastType !== "custom") {
                    towOptions.dayOperationStatus = false;
                }
                example.calendar = new Calendar(contrastCalendarOneTraget, oneOptions);
                example.contrastCalendar = new Calendar(contrastCalendarTowTraget, towOptions);
            } else {
                $target.html('<div class="DatePicke_wrappper_content"></div>');
                var $wrapperContent = $target.find(".DatePicke_wrappper_content");
                example.calendar = new Calendar($wrapperContent, con.calendar);
            }

            RenderDom.updateToolsDom(example);
            this.calendarEventBind(example)
        },
        /**
         * 工具层事件绑定
         * @param example
         * @param myThis
         */
        toolsEventBind: function (example, myThis) {
            var _this = this;
            $(example.$html).on("click", function (e) {
                var $target = $(e.target),
                    $this = $(this),
                    type = $target.attr("data-type");
                switch (type) {
                    case "DatePicke_contrast_box" :
                        var checked = $target.prop("checked");
                        if (checked) {
                            example.o.calendarType = "contrast";
                        } else {
                            example.o.calendarType = "normal";
                        }
                        //RenderDom.updateToolsDom(example);
                        _this.createCalendar(example);
                        break;
                    case "DatePicke_tools_datetype" :

                        //设置是否可点击
                        if ($target.hasClass("disable")) return false;

                        $target.addClass("choose").siblings().removeClass("choose");
                        var name = $target.attr("data-name");
                        if ($(".DatePicke_tool_shortcut")) {
                            $(".DatePicke_tool_shortcut a").removeClass("choose");
                        }
                        if (example.o.dateType !== name) {
                            example.o.dateType = name;
                            //每次选择日期类型清空所有所选日期
                            // example.o.date = null;
                            // example.o.contrastDate = null;
                            // example.calendar.o.date = null;
                            // if(example.contrastCalendar){
                            //     example.contrastCalendar.o.date = null;
                            // }
                        }
                        //$(myThis).trigger("DatePickeToolsDatetype",[example]);
                        //example.$html.find("[data-type='DatePicke_contarst_text']").val("");
                        //_this.createCalendar(example);
                        break;
                    case "DatePicke_tools_contarst"://切换对比方法
                        $target.addClass("choose").siblings().removeClass("choose");
                        var name = $target.attr("data-name");
                        if (example.o.contrastType !== name) {
                            example.o.contrastType = name;
                            var target = example.$html.find(".DatePicke_contrast_tow"),
                                options = example.contrastCalendar.o;
                            if (name !== "custom") {
                                options.dayOperationStatus = false;
                            } else {
                                options.dayOperationStatus = true;
                            }
                            if (example.calendar.o.date) {//设置对比时段
                                var start = meConfig.contrastType[name].fn(example.calendar.o.date.start);
                                options.date = {
                                    start: util.formatDate(start, example.o.calendar.format),
                                    end: util.formatDate(util.calculationTime(start, example.calendar.o.dateArr.length - 1), example.o.calendar.format)
                                }
                            } else {
                                options.date = null;
                            }
                            example.contrastDate = options.date;
                            target.html("");
                            example.contrastCalendar = new Calendar(target, options);
                            _this.setInputDate(example.$html.find("[data-type='DatePicke_contarst_text']"), options.date);
                        }
                        //_this.createCalendar(example);
                        break;
                    case "DatePicke_confirm" ://确定
                        var msg = {
                            dateType: ( typeof( example.o.dateType ) === "string" ? example.o.dateType : example.o.dateType.name ),
                            date: null
                        };
                        if (example.calendar.o.date) {
                            msg.date = {
                                start: util.formatDate(example.calendar.o.date.start, example.o.calendar.format),
                                end: util.formatDate(example.calendar.o.date.end, example.o.calendar.format)
                            };
                        }
                        ;
                        myThis.o.date = msg.date;
                        myThis.o.contrastDate = null;
                        myThis.o.calendarType = example.o.calendarType;
                        myThis.o.dateType = example.o.dateType;
                        myThis.o.calendar.date = msg.date;
                        if (example.contrastCalendar) {
                            if (example.contrastCalendar.o.date) {
                                msg.contrastDate = {
                                    start: util.formatDate(example.contrastCalendar.o.date.start, example.o.calendar.format),
                                    end: util.formatDate(example.contrastCalendar.o.date.end, example.o.calendar.format)
                                };
                            } else {
                                msg.contrastDate = null;
                            }

                            myThis.o.contrastDate = msg.contrastDate;
                        }
                        $(this).hide();
                        $(myThis).trigger("confirm", [msg]);
                        break;
                    case "DatePicke_cancel" ://取消
                        $this.hide();
                        break;
                    default:
                        if (type) {
                            var typeIndex = type.indexOf("_ToolsDay");//快捷选择日期
                            if (typeIndex > -1) {

                                //如果当前索引是disable的话就是不可点击
                                if ($target.hasClass("disable")) {
                                    return false;
                                }

                                $target.addClass("choose").siblings().removeClass("choose");
                                var types = type.substring(0, typeIndex),
                                    dayNum = parseInt(types);
                                if (isNaN(dayNum)) {
                                    switch (types) {
                                        case "Yesterday" :
                                            dayNum = -1;
                                            break;
                                        case "Today" :
                                            dayNum = 0;
                                            break;
                                        default:
                                            dayNum = "All";
                                            break;
                                    }
                                    // //设置按钮状态

                                    if (typeof( example.o.dateType ) === "string") {
                                        example.o.dateType = "day";
                                    } else {
                                        example.o.dateType.name = "day";
                                    }
                                }
                                //添加逻辑判断，当是日期的时候自动转化成日选择
                                $this.find("[data-type='DatePicke_tools_datetype']").each(function () {
                                    var $me = $(this),
                                        index = $me.index();
                                    if (index === 0) {
                                        $me.addClass("choose");
                                    } else {
                                        $me.removeClass("choose");
                                    }
                                })
                                if (types == "Yesterday" || types == "Today") {
                                    _this.toolsSetDate(example, dayNum, true);

                                } else {
                                    _this.toolsSetDate(example, dayNum, false);
                                }


                            }
                        }
                        break;
                }
                e.stopPropagation();
            });
        },
        /**
         * 设置input时间
         * @param example
         * @param num
         */
        toolsSetDate: function (example, num, isOneDay) {

            var date = new Date(),
                setDate = {},
                _this = this;

            //如果存在disable的时候以disable时间计算
            if (example.o.calendar.disable) {
                //开始disable的时间判断不能出现在有效的时间范围
                if (date.getTime() > new Date(example.o.calendar.disable.last).getTime()) {
                    date = new Date(example.o.calendar.disable.last);
                }
            }
            if (isOneDay) {//单日
                setDate.start = util.calculationTime(date, num);
                setDate.end = util.calculationTime(date, num);
            } else {
                if (typeof num === "number") {
                    if (num > 1) {
                        setDate.start = util.calculationTime(date, -(num - 1));
                        setDate.end = date;
                    } else {
                        setDate.start = util.calculationTime(date, -(num - 1));
                        setDate.end = setDate.start;
                    }
                } else {

                    setDate.start = example.o.disable.first;
                    setDate.end = example.o.disable.last;


                }

            }

            //如果存在disable的时候以disable时间计算
            if (example.o.calendar.disable) {

                //开始disable的时间判断不能出现在有效的时间范围
                if (new Date(setDate.start).getTime() < new Date(example.o.calendar.disable.first).getTime()) {
                    setDate.start = new Date(example.o.calendar.disable.first);
                }
                //结束disable的时间判断不能出现在有效的时间范围
                if (new Date(setDate.end).getTime() > new Date(example.o.calendar.disable.last).getTime()) {
                    setDate.end = new Date(example.o.calendar.disable.last);
                }
            }

            setDate.start = util.formatDate(setDate.start, example.o.calendar.format);
            setDate.end = util.formatDate(setDate.end, example.o.calendar.format);
            example.calendar.setDate(setDate, function (e) {
                if (e.status === "success") {
                    if (example.contrastCalendar) {

                        var date = _this.relationContrast(example, setDate, example.contrastCalendar.o.date);
                        example.contrastCalendar.setDate(date, function (data) {
                            _this.setInputDate(example.$html.find("[data-type='DatePicke_contarst_text']"), data.date);
                        });
                    }
                    _this.setInputDate(example.$html.find("[data-type='DatePicke_text']"), setDate);
                }
            });
        },
        /**
         * 日历点击回调事件
         * @param example
         */
        calendarEventBind: function (example) {
            var _this = this;
            if (example.contrastCalendar) {//对比日历回调
                $(example.contrastCalendar).on("selectDay", function (e, msg) {
                    if (msg.status === "success") {
                        var date = msg.date;
                        if (example.calendar.o.dateArr.length > 1) {
                            date = {
                                start: msg.date.start,
                                end: util.calculationTime(date.start, example.calendar.o.dateArr.length - 1)
                            };
                        } else {
                            date = {
                                start: msg.selected,
                                end: msg.selected
                            }
                        }

                        example.contrastCalendar.setDate(date, function (data) {
                            _this.setInputDate(example.$html.find("[data-type='DatePicke_contarst_text']"), data.date);
                        });
                    }
                });
            }
            $(example.calendar).on("selectDay", function (e, msg) {
                if (msg.status === "success") {
                    /*if(example.o.dateType !== 'day'){//周月选择判断逻辑
                     var dateObj = msg.date,
                     selectedDate = new Date(msg.selected);
                     if(example.o.dateType === 'month'){
                     var y = selectedDate.getFullYear(),
                     m = selectedDate.getMonth() + 1,
                     start = util.formatDate(y + "/" + m,example.o.calendar.format),
                     end = util.formatDate(y + "/" + m + "/" + util.MonthHasDay(y, m),example.o.calendar.format);
                     dateObj = {
                     start : start,
                     end : end
                     };
                     }else{
                     var w = util.isWeeks(selectedDate),
                     end = util.formatDate(util.calculationTime(selectedDate,7-w),example.o.calendar.format),
                     start = util.formatDate(util.calculationTime(end,-6),example.o.calendar.format)
                     dateObj = {
                     start : start,
                     end : end
                     };
                     }
                     example.calendar.setDate(dateObj,function(msg){
                     if(example.contrastCalendar){
                     var date = _this.relationContrast(example,msg.date,example.contrastCalendar.o.date);

                     example.contrastCalendar.setDate(date,function(data){
                     _this.setInputDate(example.$html.find("[data-type='DatePicke_contarst_text']"), data.date);
                     });
                     }
                     _this.setInputDate(example.$html.find("[data-type='DatePicke_text']"), msg.date);
                     });

                     }else{*/
                    if (example.contrastCalendar) {
                        var date = _this.relationContrast(example, msg.date, example.contrastCalendar.o.date);
                        example.contrastCalendar.setDate(date, function (data) {
                            _this.setInputDate(example.$html.find("[data-type='DatePicke_contarst_text']"), data.date);
                        });
                    }
                    _this.setInputDate(example.$html.find("[data-type='DatePicke_text']"), msg.date);
                    //}
                }
            });
        },
        /**
         * 关联对比日期
         * @param example
         * @param date
         * @param conDate
         * @returns {*}
         */
        relationContrast: function (example, date, conDate) {
            var oldDate,
                type = example.o.contrastType;
            if (conDate && conDate.start && type == 'custom') {//只有有对比时段并且是自定义对比时才使用上次对比时间
                oldDate = {
                    start: conDate.start,
                    end: util.calculationTime(conDate.start, example.calendar.o.dateArr.length - 1)
                }
            } else {
                var start = meConfig.contrastType[example.o.contrastType].fn(date.start);
                oldDate = {
                    start: start,
                    end: util.calculationTime(start, example.calendar.o.dateArr.length - 1)
                }
            }
            return oldDate
        },

        setInputDate: function (traget, date) {
            if (date && date.start) {
                traget.val(date.start + " - " + date.end);
            }

        }
    };

    var TD_DatePicke = function (traget, options) {
        this.o = $.extend(true, {$traget: $(traget)}, defaults, options);
        Operation.init(this);

    };
    /*TD_DatePicke.prototype = {
     ReloadDate : function( options ){
     Operation.createCalendar(options);
     }
     };*/


    window.TD = window.TD || {};
    window.TD.ui = window.TD.ui || {};
    window.TD.ui.TD_DatePicke = TD_DatePicke;
})(jQuery);