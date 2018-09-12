define(function (require, exports, module) {

    //请求模板
    var tpl = require('../../tpl/AdminAccountDetailTpl');
    var InforTpl = require('../../tpl/AdminBaseInforTpl');
    var AdminAccountTpl = require('../../tpl/AdminAccountTitleTpl');
    var tpl2 = require('../../tpl/AdminAccountDetailTpl2');
    var editAuth = require('../../tpl/editAuth');
    var showNumber = 10;
    var pageClick = 1;

    //授权模板
    var UserDialog, autoComplete, areload = {authReload: false, accountid: '', appkey: ''}, serviceList = {
        source: [],
        searchName: []
    };
    var autoComp = require('../../app/autoComplete');
    require('../../app/datepicker');
    var popupAuthTpl = require('../../tpl/ServiceAuthorization');
    var editAuthTpl = require('../../tpl/editAuthService');

    //end
    var Util = {
        //auth
        authService: function (appkey) {
            var self = this;
            //初始化授权窗口
            if (!UserDialog) {
                var html = window.template(popupAuthTpl, {});
                UserDialog = new window.TD.ui.Dialog('body', {
                    containHtml: html,
                    trigger: "eachchange",//回调事件调用方法
                })
            }

            //fn 搜索
            //appkey 11d5a72da0dc4c15b08083cc9e555220
            //过滤status==1正常运行服务 (服务状态 1:正常运行（已发布） 2：调试中 3：下线 4：未发布)
            var filterSearchData = function (data) {
                data.map(function (item) {
                    if (item.status == 1) {
                        serviceList.source.push(item);
                    }
                })
                serviceList.searchName = serviceList.source.map(function (item) {
                    return item.name;
                })
            };
            //匹配搜索结果
            var filterSearchName = function (name) {
                var datas;
                serviceList.source.some(function (item) {
                    if (item.name === name) {
                        datas = item;
                    }
                })
                return datas;
            };

            // //初始化日期组件
            // var initDatePicker = function (obj, input) {
            //     var dnow = window.TD.util.timeStamp(Date.now() / 1000);
            //     var datePicker = obj.DatePicker({
            //         date: dnow,
            //         calendars: 1,
            //         position: 'left',
            //         mode: 'single',
            //         onSubmit: function (dates) {
            //             console.log('sub:' + dates);
            //             input.val(dates);
            //         }
            //     });
            //     input.on('click', function (e) {
            //         $.fn.DatePickerShow.call(datePicker);
            //     })
            // };

            //编辑服务授权信息
            var editService = function (options) {
                var dateObj = $('#datePicker'), totalInput = $('[name="authToal"]'), dateInput = $('[name="authDate"]'), box = $('#authList');
                //加载日期组件
                if (dateInput.length > 0) {
                    self.initDatePicker(dateObj, dateInput);
                }
                // var formateDate = function (time) {
                //     if (time.indexOf('-') == -1) {
                //         switch (time) {
                //             case '无限制':
                //                 time = -1;
                //                 break;
                //             case '未指定':
                //                 time = -2;
                //                 break;
                //         }
                //         return;
                //     }
                //     console.log((new Date(time).getTime()) / 1000);
                //     //TODO:授权接口后台传入秒数
                //     return ((new Date(time).getTime()) / 1000 + 57599);
                // };
                var clear = function () {
                    var timer = setTimeout(function () {
                        clearTimeout(timer);
                        box.children().hide();
                    }, 1000)
                };
                //限定清除范围
                if (box.find('.empty-data').length > 0) {
                    clear();
                }

                var success = function () {
                    //设置重绘
                    areload.authReload = true;
                    box.html('<div class="success-data">授权成功!</div>');
                    clear();
                };
                $('#saveService').on('click', function () {
                    var total = $.trim(totalInput.val()), date = $.trim(dateInput.val()), reg = /^[0-9]*[1-9][0-9]*$/;
                    if (total == '' || date == '' || !reg.test(total)) {
                        var ttips = totalInput.parent().find('.atips'), dtips = dateInput.parent().find('.atips');
                        $('.authInput').on('click', function (e) {
                            var flag = e.target.getAttribute('name');
                            if (flag == 'authToal') {
                                ttips.hide();
                            } else if (flag == 'authDate') {
                                dtips.hide();
                            }
                        })
                        if (total == '') {
                            ttips.text('请填写配额!').show();
                        }
                        if (!reg.test(total) && total != '') {
                            ttips.text('请填写有效的配额!').show();
                        }
                        if (date == '') {
                            dtips.show();
                        }

                        if(self.DateToUnix(date)< Date.parse(new Date())/1000){
                            console.log("时间选择有误");
                            $('#appAlert').show();
                            $('#appAlertContent').html('截止时间不能小于当前时间！')
                            var timer = setTimeout(function(){
                                $('#appAlert').hide();
                            },3000)

                            $('#datepickShow').css('border','1px solid red')

                        }


                        return;
                    }
                    //新增授权信息
                    $.ajax({
                        url: window.TD.vHosts + '/admin/postQuota',
                        type: "get",
                        data: {
                            appkey: appkey,
                            serviceId: options.serviceId,
                            token: window.TD.token,
                            from: window.TD.vFrom,
                            requests: total,
                            timeallow: self.formateDate(date),
                        },
                        success: function (data) {
                            console.log(data)
                            if (data.status == 200) {
                                success();
                            }else{
                                $('#appAlert').show();
                                $('#appAlertContent').html(data.msg);
                                var timer = setTimeout(function(){
                                    $('#appAlert').hide();
                                },3000)
                            }
                        },
                        error: function () {
                            // alert('编辑服务授权失败');
                            $('#appAlert').show();
                            $('#appAlertContent').html('授权失败!');
                            var timer = setTimeout(function(){
                                $('#appAlert').hide();
                            },3000)
                        }
                    })
                })
                $('#cancleEditService').on('click', function () {
                    box.empty();
                })

            };

            //获取服务授权信息
            var getService = function (options) {
                $.ajax({
                    url: window.TD.vHosts + '/admin/getQuota',
                    type: "get",
                    data: {
                        appkey: appkey,
                        serviceId: options.serviceId,
                        token: window.TD.token,
                        from: window.TD.vFrom
                    },
                    success: function (data) {
                        if (data.status == 200) {
                            console.log(data);
                            var html = window.template(editAuthTpl, data);
                            $('#authList').html(html);
                            //初始化修改事件
                            editService(options);
                        }
                    }
                })
            };

            //处理搜索回掉
            var searchCallback = function (name, index) {
                getService(filterSearchName(name));

            };

            //初始化autoComplete
            var initAutoCom = function (data) {
                if (!autoComplete) {
                    var sinput = document.getElementById('authSearch'), slist = document.getElementById('autoList');
                    var autoComplete = new autoComp(sinput, slist, data, searchCallback);
                    autoComplete.init();
                    //清空搜索值
                    $('.authClose').on('click', function () {
                        sinput.value = '';
                    })
                }

            };

            var search = function () {
                //获取服务列表
                if (!serviceList.source.length) {
                    $.ajax({
                        url: window.TD.vHosts + '/admin/serviceList',
                        type: "get",
                        data: {
                            token: window.TD.token,
                            from: window.TD.vFrom
                        },
                        success: function (data) {
                            if (data.status == 200) {
                                //console.log(data);
                                if (data.data.count !== 0) {
                                    filterSearchData(data.data.table);
                                }
                                console.log(serviceList)
                                initAutoCom(serviceList.searchName);
                            }
                        }
                    })
                } else {
                    initAutoCom(serviceList.searchName);
                }

            };
            //默认打开
            //UserDialog.open(search);

            //fn 触发查询
            $('#editAuth').on('click', function () {
                UserDialog.open(search);
            })

            //授权窗口关闭回掉 fn
            $('body').on('dialogClose', function () {
                if (areload.authReload) {
                    self.init(areload.accountid, areload.appkey);
                    areload.authReload = false;
                }
            })


        },
        //end
        // getHTML: function (list) {
        //     var html = '';
        //     for (var i = 0; i < list.length; i++) {
        //         var value = list[i];
        //         html += '<ul class="statis-table-list table-data">'
        //             + '<li>' + value.topNum + '</li>'
        //             + '<li>' + value.name + '</li>'
        //             + '<li>' + value.access_allow + '</li>'
        //             + '<li>' + value.createtime + '</li>'
        //             + '<li>' + value.timeallow + '</li>'
        //             + '<li>' + value.requests + '</li>'
        //             + '<li>' + value.records + '</li>'
        //             + '<li>' + value.requests_rest + '</li>'
        //             + '<li>' + value.records_rest + '</li>'
        //             + '<li>' + value.accessRequest + '</li>'
        //             + '<li>' + value.successRequest + '</li>'
        //             + '<li>' + value.inputCount + '</li>'
        //             + '<li>' + value.oututCount + '</li></ul>';
        //     }
        //     return html;
        // },
        getLooking: function (data) {
            var html = '';
            for (var i = 0; i < data.table.renderData.length; i++) {
                var value = data.table.renderData[i];
                // console.log(value);
                html += '<a  href= "#/servicedetail/'+data.accountInfo.accountId+'_'+value.serviceid+'/'+encodeURI(value.name) + '"'+'class  = "last-setting-a">查看详情</a> <span class="account-service-edit ">编辑</span>';
            }
            return html;
        },
        createInfor: function (data) {
            var html = window.template(InforTpl, data);
            $("#AccountDetailBaseInfor").html(html);
            html = window.template(AdminAccountTpl, data);
            $("#OneAccountDetailh2").html(html);
        },
        initCreateTop: function (data) {
            for (var i = 0; i < data.table.data.length; i++) {
                data.table.data[i].topNum = i + 1;
            }


        },
        render: function (data) {
            var self = this;
            var pageInit = null;
            data.table = data.table || {};
            data.table.data = data.table.data || [];

            //初始化排行数据
            this.initCreateTop(data);

            console.log(data);
            //默认分割table中的数据
            if (!data.table.data) {
                console.log(3333);
                data.table.renderData = {};
            } else {
                data.table.renderData = data.table.data.slice(0, showNumber);
            }

            //求取数字和
            // var requests_rest =0;//剩余次数总和
            // var success_request = 0;//有效次数总和
            // var access_request = 0;//授权次数总和
            // for(var i =0;i<data.table.data.length;i++){
            //     requests_rest += data.table.data[i].requests_rest;//剩余次数总和
            //     if(data.table.data[i].hasOwnProperty("successRequest")){
            //         success_request += data.table.data[i].successRequest;//有效次数总和
            //     }
            //     access_request += data.table.data[i].requests;//授权次数总和
            //
            //
            // }
            // console.log(success_request);
            var html = window.template(tpl, data);
            $("#AccountDetailInfor").html(html);
            // $('.statis-data-requests-rest').html(requests_rest);
            // $('.statis-data-success-request').html(success_request);
            // $('.statis-data-access-request').html(access_request);

            if (!pageInit) {
                pageInit = new window.TD.ui.CreateTablePage('#AccountPagesCountDetail', {
                    num: showNumber,//一页显示多少条数据
                    all: data.table.data.length,//全部数据
                    current: 'current',
                    pageNumbers: false,//是否显示分页数量
                    prevNextBtn: true,//是否显示上一页下一页
                    splitNum: 3,//默认显示多少条
                    trigger: "eachchange"//回调事件调用方法
                })
                $('#AccountPagesCountDetail').off("eachchange").on("eachchange", function (event, pages) {
                    var pages = pages.page;
                    pageClick = pages;
                    data.table.renderData = data.table.data.slice((pages - 1) * showNumber, pages * showNumber);
                    console.log(data);

                    var userListTpl = window.template(tpl2, data);
                    $("#AccountPageRenderHtml").html(userListTpl);
                    $("#AccountPageLook").html(self.getLooking(data));
                    // var html = window.template(tpl, data);
                    // $("#AccountDetailInfor").html(html);

                })
            }
        },
        init: function (accountid, appkey) {
            var self = this;
            $('#app-loading').show();
            $.ajax({
                url: window.TD.vHosts + '/datamarket/myData',
                type: "get",
                data: {
                    token: window.TD.token,
                    accountId: accountid,
                    from: window.TD.vFrom
                },
                success: function (data) {
                    if (data.status == 200) {
                        console.log(data);
                        $('#app-loading').hide();
                        // data.data.table.renderData = data.data.table.data.slice(0, showNumber);
                        // console.log(data.data);
                        // var html = window.template(tpl, data.data);
                        // $("#AccountDetailInfor").html(html);

                        self.render(data.data);
                        self.createInfor(data.data.accountInfo);
                        self.authService(appkey);
                        areload.accountid = accountid,areload.appkey = appkey;
                        //缓存当前二级树
                        var cnav = {name: data.data.accountInfo.accountName, href: window.location.hash};
                        window.sessionStorage['navSecond'] = JSON.stringify(cnav);
                        window.pubNav([JSON.parse(window.sessionStorage['navTop']), cnav]);

                    }else {
                        $('#app-loading').hide();
                        // alert('警告：' + data.msg);
                        $('#appAlert').show();
                        $('#appAlertContent').html('警告：' + data.msg);
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },2000)
                        $("#AccountDetailInfor").html('<div class="empty-data">暂无此服务的数据</div>');
                    }


                    //服务授权编辑
                    $(document).off('click').on('click', '.account-service-edit', function () {

                        var index = ($(this).index() + 1) / 2 - 1 + (pageClick-1) * 10;
                        console.log(index);
                        var serviceId = data.data.table.data[index].serviceid;
                        var appkey = data.data.table.data[index].appkey;
                        var option = {
                            serviceId: serviceId,
                            appkey: appkey
                        };

                        console.log(data.data.table.data[index].serviceid)
                        // console.log(($(this).index() + 1) / 2 - 1);
                        // var html = window.template(editAuth, data.data.table.data);
                        // $("#OneAccountDetail").html(html);
                        $('#OneAccountDetail').append(editAuth);
                        $('.authHead span').html(data.data.table.data[index].name);
                        // $('[name="authToal"]').attr('placeholder',data.data.table.data[index].requests);
                        $('[name="authToal"]').attr('value', data.data.table.data[index].requests);
                        // $('[name="authDate"]').attr('placeholder',window.TD.util.timeStamp(data.data.table.data[index].timeallow));
                        if (data.data.table.data[index].timeallow == -1) {
                            $('[name="authDate"]').attr('value', "无限制");
                        } else {
                            $('[name="authDate"]').attr('value', window.TD.util.timeStamp(data.data.table.data[index].timeallow));
                        }

                        // console.log(window.TD.util.timeStamp(data.data.table.data[index].timeallow));

                        self.showMask();

                        var dateObj = $('#datePicker'), totalInput = $('[name="authToal"]'), dateInput = $('[name="authDate"]'), box = $('#authList');

                        //加载日期组件
                        if (dateInput.length > 0) {
                            self.initDatePicker(dateObj, dateInput);
                        }

                        $('.authSub').off('click').on('click', '#saveService', function () {

                            console.log('编辑授权');
                            var total = $.trim(totalInput.val()), date = $.trim(dateInput.val()), reg = /^[0-9]*[1-9][0-9]*$/;

                            console.log(date);
                            console.log(total);

                            if (total == '' || date == '' || !reg.test(total)) {
                                var ttips = totalInput.parent().find('.atips'), dtips = dateInput.parent().find('.atips');
                                $('.authInput').on('click', function (e) {
                                    var flag = e.target.getAttribute('name');
                                    if (flag == 'authToal') {
                                        ttips.hide();
                                    } else if (flag == 'authDate') {
                                        dtips.hide();
                                    }
                                })
                                if (total == '') {
                                    ttips.text('请填写配额!').show();
                                }
                                if (!reg.test(total) && total != '') {
                                    ttips.text('请填写有效的配额!').show();
                                }
                                if (date == '') {
                                    dtips.show();
                                }

                                return;
                            }

                            console.log(self.formateDate(date));
                            var timeAlllow = self.formateDate(date);
                            if (!timeAlllow) {
                                timeAlllow = -1;
                            }
                            // self.editService(option,total,date);//发送编辑请求
                            $.ajax({
                                url: window.TD.vHosts + '/admin/putQuota',
                                type: "get",
                                data: {
                                    appkey: option.appkey,
                                    serviceId: option.serviceId,
                                    requests: total,
                                    timeallow: timeAlllow,
                                    // timeallow: self.formateDate(date),
                                    token: window.TD.token,
                                    from: window.TD.vFrom
                                },
                                success: function (data) {
                                    if (data.status == 200) {
                                        console.log(data);
                                        box.html('<div class="success-data">授权服务修改成功!</div>');
                                        var timer = setTimeout(function () {
                                            $('.dialog-content1').remove();//关闭弹层
                                            $('#mask').remove();//隐藏遮罩层
                                            window.location.reload();//重新刷新页面
                                        }, 1500)
                                    } else {
                                        // alert('编辑服务授权失败');
                                        $('#appAlert').show();
                                        $('#appAlertContent').html('编辑服务授权失败');
                                        var timer = setTimeout(function(){
                                            $('#appAlert').hide();
                                        },3000)
                                        $('.dialog-content1').remove();//关闭弹层
                                        $('#mask').remove();//隐藏遮罩层
                                    }
                                },
                                error: function () {
                                    // alert('编辑服务授权失败');
                                    $('#appAlert').show();
                                    $('#appAlertContent').html('编辑服务授权失败');
                                    var timer = setTimeout(function(){
                                        $('#appAlert').hide();
                                    },3000)
                                    $('.dialog-content1').remove();//关闭弹层
                                    $('#mask').remove();//隐藏遮罩层
                                }
                            })

                            return false;
                        })


                        $('.jump-head').off('click').on('click', '.dialog-close', function () {
                            $('.dialog-content1').remove();//关闭弹层
                            // $('#mask').hide();//隐藏遮罩层
                            $('#mask').remove();//隐藏遮罩层
                        })

                        $('body').off('click').on('click', '#cancleEditService', function () {
                            $('.dialog-content1').remove();//关闭弹层
                            // $('#mask').hide();//隐藏遮罩层
                            $('#mask').remove();//隐藏遮罩层
                        })

                        return false;

                    })


                },
                error: function () {
                    $('#app-loading').hide();
                    // alert('警告：获取账户详情失败！');
                    $('#appAlert').show();
                    $('#appAlertContent').html('警告：获取账户详情失败！');
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                    },3000)
                    $("#AccountDetailInfor").html('<div class="empty-data">暂无此服务的数据</div>');
                }

            })

            // $(document).on('click', '.account-service-edit', function () {
            //     console.log(38880);
            //     console.log(data.data.table.data[0].serviceId)
            //     console.log($(this).index());
            //     $('#OneAccountDetail').append(editAuth);
            //     self.showMask();
            //
            //     $('.authSub').on('click',function(){
            //         console.log(567);
            //     })
            //
            //
            //     $('.jump-head').off('click').on('click','.dialog-close',function(){
            //         $('.dialog-content').remove();//关闭弹层
            //         $('#mask').hide();//隐藏遮罩层
            //     })
            //
            //     $('body').off('click').on('click','#cancleEditService',function(){
            //         $('.dialog-content').remove();//关闭弹层
            //         $('#mask').hide();//隐藏遮罩层
            //     })
            //
            // })

        },
        showMask: function () {//点击添加账户弹出遮罩层
            $("#mask").css("height", $(window).height());
            $("#mask").css("width", $(window).width());
            $("#mask").show();

        },
        //修改服务授权信息
        editService: function (option, total, date) {
            var self = this;
            $.ajax({
                url: window.TD.vHosts + '/admin/putQuota',
                type: "get",
                data: {
                    appkey: option.appkey,
                    serviceId: option.serviceId,
                    requests: total,
                    timeallow: self.formateDate(date),
                    token: window.TD.token,
                    from: window.TD.vFrom
                },
                success: function (data) {
                    if (data.status == 200) {
                        console.log(data);
                        // var html = window.template(editAuthTpl, data);
                        // $('#authList').html(html);
                        // //初始化修改事件
                        // editService(options);
                    }
                }
            })
        },
        formateDate: function (time) {
            if (time.indexOf('-') == -1) {
                switch (time) {
                    case '无限制':
                        time = -1;
                        break;
                    case '未指定':
                        time = -2;
                        break;
                }
                return;
            }
            console.log((new Date(time).getTime()) / 1000);
            //TODO:授权接口后台传入秒数
            return ((new Date(time).getTime()) / 1000 + 57599);
        },
        //初始化日期组件
        initDatePicker: function (obj, input) {
            var self = this;
            var dnow = window.TD.util.timeStamp(Date.now() / 1000);
            var datePicker = obj.DatePicker({
                date: dnow,
                calendars: 1,
                position: 'left',
                mode: 'single',
                onSubmit: function (dates) {
                    console.log('sub:' + dates);
                    if(self.DateToUnix(dates)< Date.parse(new Date())/1000){
                        console.log("时间选择有误");
                        $('#appAlert').show();
                        $('#appAlertContent').html('截止时间不能小于当前时间！');
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },3000)

                        $('#datepickShow').css('border','1px solid red');
                        $("#saveService").attr({'disabled':'disabled','title':'日期选择有误！'});
                        $('#saveService').css('cursor', 'not-allowed');

                    }else{
                        $('#datepickShow').css('border','1px solid #eee');
                        $('#saveService').removeAttr('disabled');
                        $('#saveService').removeAttr('title');
                        $('#saveService').css('cursor','pointer');
                    }
                    input.val(dates);

                }
            });
            input.on('click', function (e) {
                $.fn.DatePickerShow.call(datePicker);
            })
        },
        DateToUnix: function(string) {
            var f = string.split(' ', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                    parseInt(d[0], 10) || null,
                    (parseInt(d[1], 10) || 1) - 1,
                    parseInt(d[2], 10) || null,
                    parseInt(t[0], 10) || null,
                    parseInt(t[1], 10) || null,
                    parseInt(t[2], 10) || null
                )).getTime() / 1000;
        }

    };
    module.exports = Util;
})