define(function (require, exports, module) {
    var CommonData = {};
    var AppLoading = $("#app-loading");//loading状态
    var tpl = require("../../tpl/AccountList");
    // var adminAddusers = require("./adminAddUser");
    var adminAdduser2 = require('../../tpl/adminAdduser');
    var FilterData = require('./searchData');
    // var adminAdduser = require('../../tpl/adminAdduser');
    var iNum = 10;

    var Util = {
        init: function () {
            $('#adminAddUserContainer2').remove();//关闭添加账户弹层

            var self = this;
            AppLoading.show();//显示loading
            $('.account-add-id').off('click').on('click', function () {
                console.log("添加账户弹窗");
                // console.log(window.TD.vHosts);
                $('#AdminManage').append(adminAdduser2);

                self.addminAdduser();
                self.showMask();
                return false;
            });

            self.searchEvent();
            //将ajax请求返回数据放在promise对象上
            //显示页面内容
            self.accountListShow();
            $(".headerOptionAccount").off('click').on('click', function () {
                console.log('点击重新加载显示页面内容');
                self.accountListShow();
                $(".acc-search-ipt").val('');
            })


        },
        renderPage: function (data) {
            var pageInit = null;
            var self = this;
            if (!pageInit) {
                pageInit = new window.TD.ui.CreateTablePage('#AdminCountViewPage', {
                    num: iNum,//showNumber,//一页显示多少条数据
                    all: data.length,//table.count,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 10,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                });
                // console.log(pageInit._o_);
                // console.log(CommonData.page.count);

                $('#AdminCountViewPage').off("eachchange").on("eachchange", function (event, pages) {
                    var pages = pages.page;
                    CommonData.renderData = data.slice((pages - 1) * iNum, pages * iNum);
                    self.renderListView(CommonData);
                    // $("#AdminListView").html( self.getHTML( CommonData.table.renderData ) );
                })
            }
        },

        getAjax: function (options) {//ajax请求方法
            return $.ajax({
                type: 'get',
                url: window.TD.vHosts + '/admin/getUserList',
                data: {
                    token: window.TD.token,
                    keyWord: '',
                    historyType: '0',
                    from: window.TD.vFrom
                }
            })
        },
        renderListView: function (data) {

            var html = window.template(tpl, data);
            $("#AccountList").html(html);

        },

        addminAdduser: function () {
            var self = this;
            //QQ 规律 4,10位 数字 不能以0开头的数字
            var regQQ = /^[1-9]\d{3,9}$/;
            //手机号的规律 11位
            var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[078]|18[0-9])\d{8}$/;
            //邮箱 duan@aa.com
            var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            self.check($("#adminAddUserIp1"), regEmail);//校验邮箱
            self.check($("#adminAddUserIp4"), regMobile);//校验手机号
            console.log($("#adminAddUserIp5").val());
            if ($("#adminAddUserIp5").val()) {
                self.check($("#adminAddUserIp5"), regQQ);//校验qq
            }


            // self.confirmAdminAddUser();
            $(document).ready(function () {

                var flag2 = false;
                $('body').off('click').on('click', "#addUserConfirm", function () {
                    if ($("#addUserEmail").hasClass('wrong') || $("#addUserTel").hasClass('wrong') || $("#addUserQq").hasClass('wrong')) {
                        flag2 = true;
                    } else {
                        flag2 = false;
                    }
                    console.log(flag2);

                    var data2 = $('#adminAddUserContainer').serialize();
                    console.log(data2);
                    if ($("#adminAddUserIp5").val() == '') {
                        console.log(data2.slice(0, -4));
                        data2 = data2.slice(0, -4);
                    }
                    var token = "token=" + window.TD.token + "&" + "from=" + window.TD.vFrom + "&";
                    // console.log(token);
                    var data3 = token + data2.toString();
                    console.log(data3);
                    console.log(self.confirmData());
                    if (self.confirmData() || flag2) {
                        // alert('请填写正确参数');
                        $('#appAlert').show();
                        $('#appAlertContent').html('请填写正确参数!')
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },2000)
                    } else {
                        $.ajax({
                            type: "GET",
                            url: window.TD.vHosts + '/admin/regist',
                            data: data3,// 要提交的表单数据
                            beforeSend: function () {
                                // 禁用按钮防止重复提交
                                $("#addUserConfirm").attr({disabled: "disabled"});
                            },
                            success: function (msg) {
                                console.log(msg);
                                if (msg.status == 200) {
                                    $('#app-loading').hide();
                                    // alert("添加账户成功");
                                    $('#appAlert').show();
                                    $('#appAlertContent').html('添加账户成功!')
                                    var timer = setTimeout(function(){
                                        $('#appAlert').hide();
                                    },2000)

                                    $('#adminAddUserContainer2').remove();//关闭弹层
                                    $("#mask").remove();
                                    window.location.reload();
                                } else {
                                    // alert("添加账户失败：" + msg.msg);
                                    $('#appAlert').show();
                                    $('#appAlertContent').html("添加账户失败：" + msg.msg)
                                    var timer = setTimeout(function(){
                                        $('#appAlert').hide();
                                    },2000)
                                }
                                return false;
                            },
                            complete: function () {
                                //完成后移除
                                $("#addUserConfirm").removeAttr("disabled");
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    }
                });
            });

            $("body").on('click', "#addUserCancel", function () {
                // console.log(1);
                $('#adminAddUserContainer2').remove();//关闭弹层
                // $("#mask").hide();//隐藏遮罩层
                $("#mask").remove();//移除遮罩层
                console.log(1);
                return false;
            });

        },
        searchEvent: function () {//根据时间进行搜索
            var self = this;
            var storeList = {
                types: [],
                owners: [],
                baseLists: [],
                lists: []
            };
            $(".acc-sub-ipt").off('click').on("click", function (e) {
                var val = $(".acc-search-ipt").val();//获取搜索的关键词
                // if(val == ''){
                //     alert('请输入搜索关键词');
                // }else{
                e.preventDefault();
                console.log(val);
                var data = {
                    keywords: val,
                    data: CommonData.userList
                };

                console.log(data);
                console.log(self.FilterData(data));
                CommonData.renderData = self.FilterData(data).slice(0, iNum);
                self.renderListView(CommonData);
                self.renderPage(self.FilterData(data));
                // }


            })

            $(".acc-search-ipt").off('keyup').on("keyup", function (e) {
                // e.preventDefault();
                var val = $(".acc-search-ipt").val();//获取搜索的关键词
                // if(val == ''){
                //     alert('请输入搜索关键词');
                // }else{
                console.log(val);
                var data = {
                    keywords: val,
                    data: CommonData.userList
                };

                console.log(data);
                console.log(self.FilterData(data));
                CommonData.renderData = self.FilterData(data).slice(0, iNum);
                self.renderListView(CommonData);
                self.renderPage(self.FilterData(data));
                // }

            })


        },
        showMask: function () {//点击添加账户弹出遮罩层
            $("#mask").css("height", $(window).height());
            $("#mask").css("width", $(window).width());
            $("#mask").show();

        },
        FilterData: function (key) {//得到搜索结果的函数(搜索联系人、账户、企业名称)

            var type = key.keywords ? "keywords" : ( key.type ? key.type : "" );
            //全部
            var arr = [];
            if (type == "") {
                return key.data;
            } else {
                for (var i = 0; i < key.data.length; i++) {
                    var d = key.data[i];
                    //联系人
                    if (!d.hasOwnProperty("contacts")) {

                    } else if (key.keywords !== " " && d.contacts.toLowerCase().indexOf(key.keywords.toLowerCase().trim()) != -1) {
                        arr.push(d);
                    }else if (!d.hasOwnProperty("accountName")) {

                    } else if (key.keywords !== " " && d.accountName.toLowerCase().indexOf(key.keywords.toLowerCase().trim()) != -1) {
                        arr.push(d);
                    }else if (!d.hasOwnProperty("compName")) {

                    } else if (key.keywords !== " " && d.compName.toLowerCase().indexOf(key.keywords.toLowerCase().trim()) != -1) {
                        arr.push(d);
                    }
                }
                console.log(arr);
                return arr;
            }


        },
        accountListShow: function () {//显示账户管理页面内容
            var self = this;
            self.getAjax({}).promise().done(function (data) {
                $('#app-loading').hide();
                if (data.status == 200) {
                    CommonData = data.data;
                    console.log(data);

                    CommonData.renderData = CommonData.userList.slice(0, iNum);
                    console.log(CommonData.renderData);
                    // console.log(getLocalTime(CommonData.renderData.createDate.parseInt()));
                    self.renderListView(CommonData);//显示表单数据
                    self.renderPage(CommonData.userList);//显示页码

                    //面包屑导航栏
                    console.log('#########');
                    window.pubNav([JSON.parse(window.sessionStorage['navTop']), {
                        name: '账户列表',
                        href: window.location.hash
                    }])
                }else{
                    $('#AdminCountViewPage').html('<div class="empty-data">暂无此服务的数据</div>');
                }
            }).fail(function (err) {
                $('#app-loading').hide();
                // alert('警告：请求出错！');
                $('#AdminCountViewPage').html('<div class="empty-data">暂无此服务的数据</div>');
                console.warn(err);//打印错误信息
            });
        },
        confirmData: function () {//确认添加账号页面需要填写信息是否填写完整
            var flag = false;
            if ($("#adminAddUserIp1").val() == '') {
                flag = true;
                $("#adminAddUserIp1").css('border', '1px solid red');
            }
            if ($("#adminAddUserIp2").val() == '') {
                flag = true;
                $("#adminAddUserIp2").css('border', '1px solid red');
            }
            if ($("#adminAddUserIp3").val() == '') {
                flag = true;
                $("#adminAddUserIp3").css('border', '1px solid red');
            }

            if ($("#adminAddUserIp4").val() == '') {
                flag = true;
                $("#adminAddUserIp4").css('border', '1px solid red');
            }

            if ($("#adminAddUserIp6").val() == '') {
                flag = true;
                $("#adminAddUserIp6").css('border', '1px solid red');
            }

            if ($("#adminAddUserIp7").val() == '') {
                flag = true;
                $("#adminAddUserIp7").css('border', '1px solid red');
            }
            return flag;
        },
        check: function (inp, regEx) {//前端校验填写的邮箱、电话、qq格式是否正确


            inp.blur(function () {
                console.log(1);
                if (regEx.test(inp.val())) {
                    this.nextSibling.innerHTML = "输入正确";
                    this.nextSibling.className = "right";
                } else {
                    this.nextSibling.innerHTML = "输入错误";
                    this.nextSibling.className = "wrong";
                }
            })
        }
    }
    module.exports = Util;
});