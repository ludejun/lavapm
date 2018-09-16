define(function (require, exports, module) {

    //请求模板
    var tpl = require('../tpl/DosageDetailTpl');
    //echarts基础模板
    var echartsBase = require('../app/echartsBase');
    var showNumber = 10;
    var innertime = "";
    var AjaxData = {};
    var Util = {
        getHTML: function (list) {
            var html = '';
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                html += '<ul class="statis-table-list table-data">'
                    + '<li>' + value.topNum + '</li>'
                    + '<li>' + window.TD.util.timeStamp(value.strDate) + '</li>'
                    + '<li>' + value.accessRequest + '</li>'
                    + '<li>' + value.validRequest + '</li>'
                    + '<li>' + value.inputCount + '</li>'
                    + '<li>' + value.oututCount + '</li></ul>';
            }
            return html;
        },
        initCreateTop: function (data) {
            data.table = data.table ? data.table : {};
            data.table.data = data.table.data ? data.table.data : [];
            for (var i = 0; i < data.table.data.length; i++) {
                data.table.data[i].topNum = i + 1;
            }
        },
        renderEcharts: function (list) {
            var self = this;
            var _options = $.extend(true, {}, echartsBase);
            var xAxis = [];
            var series = {
                0: [],//accessRequest
                1: [],//successRequest
                2: [],//inputCount
                3: []//oututCount
            };
            var dataColor = ["#349eff", "#00cc99", "#977df3", "#ed6a2a"];
            var legend = ["调用次数", "有效次数"];
            for (var i = 0; i < list.length; i++) {
                var _d = list[i];
                // console.log(_d);
                if (_d.strDate) {
                    // series[0] = [];
                    // series[1] = [];
                    // series[2] = [];
                    // series[3] = [];
                    xAxis.push(window.TD.util.timeStamp(_d.strDate));
                    series[0].push(_d.accessRequest);
                    series[1].push(_d.validRequest);
                    series[2].push(_d.inputCount);
                    series[3].push(_d.oututCount);
                }
            }
            //添加X周数据显示
            _options.xAxis.push({
                type: 'category',
                splitLine: false,
                //坐标轴线处理结果
                axisLine: {
                    lineStyle: {
                        color: "#dcdfe4",
                        opacity: 0
                    }
                },
                //坐标轴刻度
                axisTick: {
                    show: false
                },
                data: xAxis
            })
            //tootip数据格式
            _options.tooltip.formatter = function (data, seriesIndex) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    html += '<ul class="echarts-tip-list echarts-tip-list-no">';
                    html += '<li class="icon"><span class="contain-l l"><i style="border:' + d.color + ' solid 2px;"></i>' + d.name + '</span>';
                    html += '<span class="contain-r r">' + ( d.data || 0 ) + '</span></li>'
                    html += '</ul>';
                }
                return html;
            };
            //格式化所有状态数据
            for (var i = 0; i < legend.length; i++) {
                var dd = legend[i];
                //右上角显示
                _options.legend.data.push({
                    icon: 'rect',
                    name: legend[i],
                    borderColor: dataColor[i]
                });
                //图标信息数据
                _options.series.push({
                    name: dd,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: dataColor[i]
                        }
                    },
                    data: (series[i] || [0])
                })
            }
            //初始化echarts
            var myChart = window.echarts.init($("#DetailEcharts").get(0));
            myChart.setOption(_options);
        },
        renderDown: function (id) {
            var self = this;
            var $DosageArrow = $("#DosageArrow");
            var $DosageHeaderDown = $("#DosageHeaderDown");
            var $DosageDate = $("#DosageDate");
            $DosageArrow.mouseover(function () {
                $DosageHeaderDown.show();
            }).mouseleave(function () {
                $DosageHeaderDown.hide();
            })
            $DosageHeaderDown.on("click", ".mydata-table-list", function () {
                $DosageHeaderDown.hide();
                window.TD.Time = this.value;
                self.getTimeAjax(id);
                innertime = this.innerHTML;
                $("#DosageDate").html(innertime);
            })
        },
        getTimeAjax: function (id) {
            var token = window.TD.util.Cookie.get('tdppt');
            var self = this;
            console.log(window.TD.Time);
            $.ajax({
                url: window.TD.vHosts + '/datamarket/myData/' + id,
                type: "get",
                data: {
                    token: window.TD.token,
                    from: window.TD.vFrom,
                    beforeDays: window.TD.Time
                },
                success: function (data) {
                    if (data.status == 200) {
                        data.data.simpleContent.statistics.statistics.table.order = self.ReverseArray(data.data.simpleContent.statistics.statistics.table.data);
                        self.init(data.data.simpleContent.statistics, id);
                        $("#DosageDate").html(innertime);
                    }
                },
                error: function (err) {
                    console.warn(err);
                }
            })
        },
        TimeStamp: function (time) {
            return new Date(parseInt(time) * 1000).toLocaleString().substr(0, time.length - 1);
        },
        ReverseArray : function(arr){
            var ReArr = [];
            for(var i=arr.length-1;i>-1;i--){
                ReArr.push(arr[i]);
            }
            return ReArr;
        },
        init: function (data, id) {
            window.TD.Time = 7;
            var self = this;
            var pageInit = null;
            AjaxData = data;
            data = data.statistics;
            //初始化排行数据
            this.initCreateTop(data);
            //默认分割table中的数据
            data.table.renderData = data.table.data.slice(0, showNumber);
            var html = window.template(tpl, data);
            $("#DetailInfor").html(html);
            this.renderDown(id);
            this.Download();
            //初始化echarts
            if (data.table.data.length > 0) {
                self.renderEcharts(data.table.order);
            }
            if (!pageInit) {
                pageInit = new window.TD.ui.CreateTablePage('#PagesCountDetail', {
                    num: showNumber,//一页显示多少条数据
                    all: data.table.data.length,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 3,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                })
                $('#PagesCountDetail').off("eachchange").on("eachchange", function (event, pages) {
                    var pages = pages.page;
                    data.table.renderData = data.table.data.slice((pages - 1) * showNumber, pages * showNumber);
                    $("#PageRenderHtml").html(self.getHTML(data.table.renderData));
                })
            }
        },
        Download : function(){
            $("#DetailInfor").off('click').on("click","#DetailData",function(){
                var content = JSON.stringify(AjaxData.statistics.table.data);
                var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "file.txt");//SaveAs(blob,filename)
                return false;
            })
        }
    };
    module.exports = Util;
})