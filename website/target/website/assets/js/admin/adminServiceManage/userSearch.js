/**
 * Created by lamph on 2016/8/31.
 */
define(function (require, exports, module) {
    var listTpl = require("../../tpl/AdminUserSearchList");
    var tableData = {
        source: [],//原始数据
        data: [],//列表数据源
        list: [],//分页显示数据集合
        viewnum: 10
    }, tableInit;
    var Util = {
        init: function (id, sername) {
            var self = this;
            $('#userListViewPage').empty();
            //$('#userPos h2 span').text(decodeURI(sername));
            self.getListData(id).done(function (data) {
                if (data.status === 200) {
                    tableData.source = tableData.data = data.data.table;
                    tableData.list = data.data.table.slice(0, tableData.viewnum);
                    self.renderListView(tableData);
                    self.renderPage();
                    self.listSearch();
                }

            })
            //发布nav-event
            // setTimeout(function(){
            //     $(window).trigger('navchange',{data:[JSON.parse(window.sessionStorage['navTop']),{name:decodeURI(sername),href:window.location.hash}]});
            // })
           setTimeout(function () {
               window.pubNav([JSON.parse(window.sessionStorage['navTop']),{name:decodeURI(sername),href:window.location.hash},{name:'用户查询',href:window.location.hash}]);
           })
        },
        //模糊匹配数据源
        filterSource: function (val) {
            var filterData = [], sval = $.trim(val.toLowerCase());
            if (tableData.source.length) {
                tableData.source.map(function (item) {
                    for (var key in item) {
                        if (key == 'companyName' || key == 'contact' || key == 'email' || key == 'tel') {
                            if (item[key + ''].toString().toLowerCase().indexOf(sval) != -1) {
                                filterData.push(item);
                                break;
                            }
                        }
                    }
                })
                return filterData;
            }
        },
        //搜索
        listSearch: function () {
            var self = this;
            var inputpar = $('#userFilter'), inputval = inputpar.children('input[type="text"]'), inputsub = inputpar.children('input[type="button"]');
            inputsub.on('click', function () {
                var val = inputval.val();
                if (val != '') {
                    var data = self.filterSource(val);
                    if (data.length > 0) {
                        //更新数据源及分页组件,重绘列表
                        self.updatePage(data, {
                            all: data.length,

                        })

                    } else {
                        // alert('没有符合条件的数据！')
                        $('#appAlert').show();
                        $('#appAlertContent').html("没有符合条件的数据！");
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },2000)
                    }
                }
            })
            //恢复默认列表
            $('#searchAll').on('click', function () {
                inputval.val('');
                if (tableData.source.length != tableData.data.length) {
                    self.updatePage(tableData.source, {
                        all: tableData.source.length,

                    })
                }
            })

        },
        //更新page组件
        updatePage: function (data, options) {
            if (tableInit) {
                tableData.data = data;
                tableData.list = data.slice(0, tableData.viewnum);
                this.renderListView(tableData);
                tableInit.update(options);
            }
        },
        //初始化分页组件
        renderPage: function () {
            var tableInit = null;
            var self = this;
            if (!tableInit) {
                tableInit = new window.TD.ui.CreateTablePage('#userListViewPage', {
                    num: tableData.viewnum,//一页显示多少条数据
                    all: tableData.data.length,//table.count,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 10,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                });

                $('#userListViewPage').off("eachchange").on("eachchange", function (event, pages) {
                    var pages = pages.page;
                    //console.log(pages);
                    tableData.list = tableData.data.slice((pages - 1) * tableData.viewnum, pages * tableData.viewnum);
                    self.renderListView(tableData);

                })
                //console.log(tableInit)
            }
        },
        //获取列表数据源
        getListData: function (id) {
            return $.ajax({
                url: window.TD.vHosts + '/admin/singleService/' + id,
                type: "get",
                data: {
                    token: window.TD.token,
                    from: window.TD.vFrom,
                }
            })
        },
        //渲染模板片段
        renderListView: function (data) {
            var html = window.template(listTpl, data);
            $("#userListView").html(html);


            // window.pubNav([JSON.parse(window.sessionStorage['navTop']),JSON.parse(window.sessionStorage['navSecond']),{name:'用户查询',href:window.location.hash}]);
        }
    };
    module.exports = Util;
});




