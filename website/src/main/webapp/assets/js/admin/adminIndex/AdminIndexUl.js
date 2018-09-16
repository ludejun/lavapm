define(function (require, exports, module) {
    require('../../lib/FileSaver');
    var CommonData = {};//从后台获取数据
    var tpl = require("../../tpl/AdminIndexUl");
    var changeStoreConfirm = require('../../tpl/AdminConfirmChangestate');
    var AppLoading = $("#app-loading");//loading状态
    var iNow = 10;
    var Util = {
        init: function () {

            var pageInit = null;
            var self = this;

            $('#app-loading').show();
            //点击切换搜索选项(最近一周...)
            $('.data-time-list').children('li').bind('click', function () {
                // console.log($(this));
                var html = $(this).html();//获取文字信息
                var historyType = $(this).val();
                console.log(historyType);
                console.log(html);
                $('.data-time-now').html(html);
                var statusHtml = $('.data-time-now2').html(),
                    statusData = {};
                if(statusHtml == '已发布'){
                    statusData = {
                        keywords: 1,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: historyType,
                        data: self.FilterData(statusData)
                    };
                }else if(statusHtml == '下线'){
                    statusData = {
                        keywords: 3,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: historyType,
                        data: self.FilterData(statusData)
                    };
                }else if(statusHtml == '未发布'){
                    statusData = {
                        keywords: 4,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: historyType,
                        data: self.FilterData(statusData)
                    };
                }else{
                    var data = {
                        keywords: historyType,
                        data: CommonData.table
                    };
                }
                if(self.filterDataDate(data).length){
                    CommonData.renderData = self.filterDataDate(data).slice(0, iNow);
                    $('.data-server-page').html('<div class="td-ui-page" id="AdminListViewPage"></div>');
                }else{
                    CommonData.renderData = self.filterDataDate(data).slice(0, iNow);
                    $('.data-server-page').html('<div class="empty-data">暂无此服务的数据</div>');
                }
                console.log(self.filterDataDate(data));
                console.log(CommonData);
                self.renderListView(CommonData);
                self.renderPage(self.filterDataDate(data));
                // $.ajax({
                //     url: window.TD.vHosts + '/admin/serviceList',
                //     type: "get",
                //     data: {
                //         token: window.TD.token,//util.Cookie.get("tdppt"),
                //         keyWord: '',
                //         historyType: historyType,
                //         from: window.TD.vFrom
                //     }
                // }).done(function (data) {
                //     $('#app-loading').hide();
                //     console.log(data);
                //     CommonData = data.data;//从后台获取到的数据
                //     console.log(CommonData);
                //     // console.log(CommonData.table);
                //     CommonData.renderData = CommonData.table.slice(0, iNow);
                //     var html = window.template(tpl, CommonData);
                //     console.log(CommonData);
                //     $("#AdminListView").html(html);
                //     self.renderPage(CommonData.table);
                //
                //
                // }).fail(function (res) {
                //     $('#app-loading').hide();
                //     console.log(res);
                // })

            });

            self.searchState();//按照状态进行搜索
            self.changeStore();//切换上下线状态

            self.searchServerNameData();//按照数据服务名称进行搜索


            //显示页面内容
            self.serviceListShow();
            $(".headerOptionManger").off('click').on('click', function () {
                console.log('点击重新加载显示页面内容');
                self.serviceListShow();
                $('.data-time-now2').text("全部");
                $('.data-time-now').text("全部");

            })

        },
        renderPage: function (data) {
            var pageInit = null;
            var self = this;
            if (!pageInit) {
                pageInit = new window.TD.ui.CreateTablePage('#AdminListViewPage', {
                    num: iNow,//showNumber,//一页显示多少条数据
                    all: data.length,//table.count,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 10,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                });
                // console.log(pageInit._o_.num);

                $('#AdminListViewPage').off("eachchange").on("eachchange", function (event, pages) {
                    var pages = pages.page;
                    // console.log(page);
                    console.log(pages);
                    CommonData.renderData = data.slice((pages - 1) * iNow, pages * iNow);
                    self.renderListView(CommonData);

                })
            }
        },
        getAjax: function (option) {
            return $.ajax({
                url: window.TD.vHosts + '/admin/serviceList',
                type: "get",
                data: {
                    token: window.TD.token,//util.Cookie.get("tdppt"),
                    keyWord: '',
                    historyType: "",
                    from: window.TD.vFrom
                }
            })
        },
        renderListView: function (data) {
            var html = window.template(tpl, data);
            $("#AdminListView").html(html);
        },
        changeState: function (status, index) {
            var self = this;
            var serviceId = CommonData.table[index - 1].serviceId;
            // var serviceId = CommonData.renderData[CommonData.renderData.length / 10].serviceId;
            console.log(serviceId);
            // console.log(CommonData.renderData.length / 10);
            $.ajax({
                type: 'get',
                url: window.TD.vHosts + '/admin/changeStatus',
                data: {
                    token: window.TD.token,//util.Cookie.get("tdppt"),
                    from: window.TD.vFrom,
                    serviceId: serviceId,
                    status: status
                }
            }).done(function (data) {
                $('#app-loading').hide();
                if(data.status == 200){
                    // alert('success!');
                    $('#appAlert').show();
                    $('#appAlertContent').html('success!')
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                        window.location.reload();
                    },2000)
                    console.log(data);
                    // CommonData = data.data;//从后台获取到的数据
                    // console.log(CommonData);
                    // // console.log(CommonData.table);
                    // CommonData.renderData = CommonData.table.slice(0, iNow);
                    // self.renderListView(CommonData);
                    // self.renderPage(CommonData.table, CommonData.table);
                }else{
                    // alert('error!');
                    $('#appAlert').show();
                    $('#appAlertContent').html('error!')
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                    },2000)
                }

            }).fail(function (res) {
                console.log(res);
                $('#appAlert').show();
                $('#appAlertContent').html(res);
                var timer = setTimeout(function(){
                    $('#appAlert').hide();
                },2000)
            });
            // window.location.reload();
            return false;
        },
        searchState: function () {//点击关键词进行搜索
            var self = this;
            $('.data-time-list2').children('li').bind('click', function (e) {
                e.preventDefault();
                var html = $(this).html();//获取文字信息
                var val = $(this).val();
                console.log(val);
                // console.log(html);
                $('.data-time-now2').html(html);
                var statusHtml = $('.data-time-now').html(),
                    statusData = {};
                if(statusHtml == '最近7天'){
                    statusData = {
                        keywords: 1,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: val,
                        data: self.filterDataDate(statusData)
                    };
                }else if(statusHtml == '最近30天'){
                    statusData = {
                        keywords: 2,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: val,
                        data: self.filterDataDate(statusData)
                    };
                }else if(statusHtml == '最近90天'){
                    statusData = {
                        keywords: 3,
                        data: CommonData.table
                    };
                    var data = {
                        keywords: val,
                        data: self.filterDataDate(statusData)
                    };
                }else{
                    var data = {
                        keywords: val,
                        data: CommonData.table
                    };
                }

                if(self.FilterData(data).length){
                    CommonData.renderData = self.FilterData(data).slice(0, iNow);
                    $('.data-server-page').html('<div class="td-ui-page" id="AdminListViewPage"></div>');
                }else{
                    CommonData.renderData = self.FilterData(data).slice(0, iNow);
                    $('.data-server-page').html('<div class="empty-data">暂无此服务的数据</div>');
                }

                console.log(self.FilterData(data));
                console.log(CommonData);
                self.renderListView(CommonData);
                self.renderPage(self.FilterData(data));

            });
        },
        searchServerNameData: function () {//根据数据服务名称进行搜索
            var self = this;
            var storeList = {
                types: [],
                owners: [],
                baseLists: [],
                lists: []
            };
            $(".server-search-btn").off('click').on("click", function (e) {
                var val = $(".server-search-ipt").val();//获取搜索的关键词
                e.preventDefault();
                console.log(val);
                var data = {
                    keywords: val,
                    data: CommonData.table
                };

                console.log(self.searchServerName(data));
                CommonData.renderData = self.searchServerName(data).slice(0, iNow);
                self.renderListView(CommonData);
                self.renderPage(self.searchServerName(data));
                $('.data-time-now2').text("全部");
                $('.data-time-now').text("全部");
                // }


            })

            $(".server-search-ipt").off('keyup').on("keyup", function (e) {
                // if (e.keyCode == 13) {
                    var val = $(".server-search-ipt").val();//获取搜索的关键词
                    // if(val == ''){
                    //     alert('请输入搜索关键词');
                    // }else{
                    console.log(val);
                    var data = {
                        keywords: val,
                        data: CommonData.table
                    };

                    console.log(data);
                    console.log(self.searchServerName(data));
                    CommonData.renderData = self.searchServerName(data).slice(0, iNow);
                    self.renderListView(CommonData);
                    self.renderPage(self.searchServerName(data));
                   $('.data-time-now2').text("全部");
                   $('.data-time-now').text("全部");
                // }

                // }
            })


        },
        FilterData: function (key) {//搜索规则
            //全部
            var arr = [];
            for (var i = 0; i < key.data.length; i++) {
                var d = key.data[i];
                // console.log(d);
                //
                if (key.keywords !== "" && d.status == key.keywords) {
                    arr.push(d);
                } else if (key.keywords !== "" && key.keywords == '5') {
                    arr = key.data;
                }

            }
            console.log(arr);
            if(key.keywords == '4'){

                //按创建时间排序
                var flag = true;
                var len = arr.length;
                for (var i = 0; i < len - 1; i++) {
                    flag = true;
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (arr[j].createDate < arr[j + 1].createDate) {
                            var temp = arr[j+1];
                            arr[j+1] = arr[j];
                            arr[j] = temp;
                            flag = false;
                        }
                    }
                    if (flag) {
                        break;
                    }
                }

            }

            return arr;
        },
        filterDataDate: function (key) {
            //全部
            var arr = [];
            var timestampNow = Date.parse( new Date()),
                d = [],
                dateNeed = 0;
            console.log(timestampNow);
            if(key.keywords == 1){
                dateNeed = timestampNow/1000 - 7 * 86400;
            }else if(key.keywords == 2){
                dateNeed = timestampNow/1000 - 30 * 86400;
            }else if(key.keywords == 3){
                dateNeed = timestampNow/1000 - 90 * 86400;
            }
            for (var i = 0; i < key.data.length; i++) {
                d = key.data[i];
                //
                if (key.keywords !== "" && d.createDate >= dateNeed) {
                    arr.push(d);
                } else if (key.keywords == "") {
                    arr = CommonData.table;
                }

            }
            return arr;
            console.log(arr);
        },
        searchServerName: function (key) {//根据数据服务名称进行搜索

            var type = key.keywords ? "keywords" : ( key.type ? key.type : "" );
            //全部
            var arr = [];
            if (type == "") {
                return key.data;
            } else {
                for (var i = 0; i < key.data.length; i++) {
                    var d = key.data[i];
                    //联系人
                    if (!d.hasOwnProperty("name")) {

                    } else if (key.keywords !== " " && d.name.toLowerCase().indexOf(key.keywords.toLowerCase().trim()) != -1) {
                        arr.push(d);
                    }

                }
                console.log(arr);
                return arr;
            }
        },
        changeStore: function () {//切换发布状态
            var self = this;
            //发布信息
            $('#AdminListView').off('click').on("click", ".onStore", function () {
                // console.log(7777);
                var index = parseInt($(this).parent().siblings("li:first-child").text());//当前数组索引值
                console.log(index);

                $('#AdminIndex').append(changeStoreConfirm);//将提示窗放入到页面中
                $('.stronger').text('发布');
                self.showMask();//遮罩层
                $(document).off('click').on("click",'.check-submit',function(){
                    self.changeState("30", index); //发送切换状态请求
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                    // window.location.reload();
                });

                $(document).on("click",".close-buy",function(){
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                })
                $(document).on("click",".check-back",function(){
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                })

            });

            //下架服务
            $('body').off('click').on("click", ".offStore", function () {
                var index = parseInt($(this).parent().siblings("li:first-child").text());//当前数组索引值
                console.log(index);
                // console.log(555);
                $('#AdminIndex').append(changeStoreConfirm);
                $('.stronger').text('下线');
                self.showMask();//遮罩层
                $(document).off('click').on("click",'.check-submit',function(){
                    self.changeState("50", index);
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                });

                $(document).on("click",".close-buy",function(){
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                })
                $(document).on("click",".check-back",function(){
                    $('#dialog-content').remove();//关闭弹层
                    $("#mask").remove();//隐藏遮罩层
                })

            });
        },
        serviceListShow: function () {//显示添加服务页面内容
            var self = this;
            self.getAjax({}).promise().done(function (data) {
                console.log(data.status);
                AppLoading.hide();//隐藏loading
                if (data.status === 200) {
                    console.log(333);
                    CommonData = data.data;//从后台获取到的数据
                    console.log(CommonData);

                    $('.adminIndexDownLoad').off('click').on('click',function(){
                        // 下载文件
                        var content = JSON.stringify(data);
                        var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
                        saveAs(blob, "file.txt");//saveAs(blob,filename)
                        return false;
                    })



                    CommonData.renderData = CommonData.table.slice(0, iNow);
                    self.renderListView(CommonData);//显示列表模板
                    self.renderPage(CommonData.table, CommonData.table);//显示页码

                    //面包屑导航栏
                    console.log('#########');
                    window.pubNav([JSON.parse(window.sessionStorage['navTop']), {
                        name: '服务列表',
                        href: window.location.hash
                    }]);
                }else{
                    $('#AdminListViewPage').html('<div class="empty-data">暂无此服务的数据</div>');
                }
            }).fail(function (err) {
                // console.log(1);
                AppLoading.hide();//隐藏loading
                // alert('警告：请求出错！');
                $('#AdminListViewPage').html('<div class="empty-data">暂无此服务的数据</div>');
                console.warn(err);
            });
        },
        showMask: function () {//点击添加账户弹出遮罩层
            $("#mask").css("height", $(window).height());
            $("#mask").css("width", $(window).width());
            $("#mask").show();
        }
    };
    module.exports = Util;
});



