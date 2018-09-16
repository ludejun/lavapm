define(function (require, exports, module) {

    require('../../lib/FileSaver');
    //请求模板
    var tpl = require('../../tpl/AdminServiceDetailTpl');
    // var tpl2 = require( '../../tpl/AdminServiceDetailTpl2' );
    var InforTpl = require('../../tpl/AdminBaseInforTpl');
    //echarts基础模板
    var echartsBase = require('../../app/echartsBase');
    var SevericeAccountTpl = require('../../tpl/OneSevericeTitle');
    var inner = "最近7天";
    var showNumber = 10;
    var commonData = {};
    // var historyType = '7';
    var serveid = "";
    var time = "";
    var Util = {
        getHTML: function (list) {
            var html = '';
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                html += '<ul class="statis-table-list table-data">'
                    + '<li>' + value.topNum + '</li>'
                    + '<li>' + window.TD.util.timeStamp(value.strDate) + '</li>' +
                    '<li>' + value.accessRequest + '</li>'
                    + '<li>' + value.validRequest + '</li>'
                    + '<li>' + value.inputCount + '</li>'
                    + '<li>' + value.oututCount + '</li></ul>';
            }
            return html;
        },
        initCreateTop: function () {
            for (var i = 0; i < commonData.table.data.length; i++) {
                commonData.table.data[i].topNum = i + 1;
            }
        },
        createInfor: function (data) {
            var html = window.template(InforTpl, data);
            $("#DetailBaseInfor").html(html);
            html2 = window.template(SevericeAccountTpl, data);
            $("#OneSevericeDetailh2").html(html2);
        },
        renderEcharts: function (list) {
            list = list.statistics.table.data.reverse();
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
                if (_d.strDate) {
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
                    html += '<li class="icon"><span class="contain-l l"><i style="border:' + d.color + ' solid 2px;"></i>' + d.seriesName + '</span>';
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
        render: function (data) {
            var self = this;
            var pageInit = null;
            //初始化排行数据
            this.initCreateTop();
            //默认分割table中的数据
            console.log(commonData.table.data);
            commonData.table.renderData = commonData.table.data.slice(0, showNumber);

            var html = window.template(tpl, commonData);
            $("#ServiceDetailInfor").html(html);

            $('.downLoadAdminServiceData').off('click').on('click',function(){
                // 下载文件
                var content = JSON.stringify(commonData);
                var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "file.txt");//saveAs(blob,filename)
                return false;
            });



            if (!pageInit) {
                pageInit = new window.TD.ui.CreateTablePage('#PagesCountDetail', {
                    num: showNumber,//一页显示多少条数据
                    all: commonData.table.data.length,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 3,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                })


                $('#PagesCountDetail').off("eachchange").on("eachchange", function (event, pages) {
                    var revereData = commonData.table.data;
                    var pages = pages.page;
                    commonData.table.renderData = revereData.reverse().slice((pages - 1) * showNumber, pages * showNumber);
                    commonData.table.data = commonData.table.data.reverse();
                    // var html2 = window.template( tpl2,commonData );
                    $("#PageRenderHtml").html(self.getHTML(commonData.table.renderData));
                    // $("#PageRenderHtml").html(html2 );
                })
                console.log(commonData.table.renderData);
            }
        },
        renderDown: function () {
            self = this;
            var $SevericeArrow = $("#SevericeArrow");
            var $SevericeDown = $("#SevericeDown");
            var $DosageDate = $("#DosageDate");
            $SevericeArrow.mouseover(function () {
                $SevericeDown.show();
            }).mouseleave(function () {
                $SevericeDown.hide();
            })
            $SevericeDown.on("click", ".mydata-table-list", function () {
                $SevericeDown.hide();
                innertime = this.innerHTML;
                console.log(innertime);
                $("#DosageDate").html(innertime);
                inner = this.innerHTML;
                $("#DosageDate").html(inner);
                // historyType = this.value;
                self.ajax(window.TD.id,this.value);
            })
        },
        init: function (serviceid) {
            var self = this;
            var historyType = '7';
            self.ajax(serviceid,historyType);
        },
        ajax:function(serviceid,date){
            var self = this;
            $('#app-loading').show();
            serviceid = serviceid.split('_');
            $.ajax({
                url: window.TD.vHosts + '/admin/myData/' + serviceid[1],
                type: "get",
                data: {
                    token: window.TD.token,
                    accountId: serviceid[0],
                    from: window.TD.vFrom,
                    beforeDays: date
                },
                success: function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        $('#app-loading').hide();

                        commonData = data.data.simpleContent.statistics.statistics;
                        self.render(commonData);
                        self.createInfor(data.data.accountInfo);
                        //初始化echarts
                        self.renderEcharts(data.data.simpleContent.statistics);
                        $("#DosageDate").html(inner);
                        self.renderDown();
                        if(date == 7){
                            $("#DosageDate").html("最近7天");
                        }

                        //设置面包屑
                        window.pubNav([JSON.parse(window.sessionStorage['navTop']), JSON.parse(window.sessionStorage['navSecond']), {
                            name: data.data.headerMap.name,
                            href: window.location.hash
                        }]);


                    }
                }
            })
        }

    };

    module.exports = Util;
})