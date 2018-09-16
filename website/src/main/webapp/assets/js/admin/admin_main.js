define(function (require, exports, module) {
    //业务通用功能
    require('../app/app');
    //初始化设置artTemplate模板是否渲染HTML
    window.template.config('escape', false);
    window.template.config('compress', false);
    //首页
    var PageIndexEvent = require('./adminIndex/AdminIndexUl');
    var AddPageEvent = require('./adminAdd/adminAdd');
    var AdminManageEvent = require('./adminIndex/accountList');
    //单个用户管理
    var OneManageAccountEvent = require('./adminAccountManage/adminAccountManage');

    var adminServiceManageEvent = require('./adminServiceManage/adminServiceManage');
    //用户详情
    var ServiceDetailEvent = require('./ServiceDetail/detail');
    //用户查询
    var UserSearch = require('./adminServiceManage/userSearch');
    //面包屑模板
    var navList = require('../tpl/AdminHeaderNav');
    window.TD.navTop = {name: '', href: ''};
    window.TD.id = "";
    window.TD.token = window.TD.util.Cookie.get("tdppt");


    // $('iframe').height = $(document).clientHeight;

    // function setIframeHeight(iframe) {
    //     if (iframe) {
    //         var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
    //         if (iframeWin.document.body) {
    //             iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
    //         }
    //     }
    // };
    // function iFrameHeight() {
    //     var winHg = $(window).height();
    //     var ifm = $("main-frame",window.parent.document);
    //     var subWeb = document.frames ? document.frames["main-frame"].document
    //         : ifm.contentDocument;
    //     if (ifm != null && subWeb != null) {
    //         if (winHg > subWeb.body.clientHeight) {
    //             ifm.height = winHg;
    //         } else {
    //             ifm.height = subWeb.body.clientHeight;
    //         }
    //     }
    // }
    //
    // $(window).load(function () {
    //     console.log($("main-frame"));
    //     iFrameHeight();
    // });

    // if(window.parent && window.parent.iFrameHeight){
    //     window.setTimeout(window.parent.iFrameHeight,500);
    // }
    //处理路由显示隐藏
    var RouterDisplay = function (id) {
        console.log(id);
        //维护路由页面id
        var routerArr = ["#AdminIndex", "#AdminAdd", "#AdminManage", "#OneAccountDetail", "#OneServiceDetail", "#PageDetail", "#userSearchPage"];
        var selNav = function (flag) {
            if (flag) {
                $('.header-option>li:nth-child(1)').addClass('header-selected');
                $('.header-option>li:nth-child(1)>span:first-child').addClass('green-selected');
                $('.header-option>li:nth-child(2)').removeClass('header-selected');
                $('.header-option>li:nth-child(2)>span:first-child').removeClass('green-selected');
                $("#Account").hide();
            } else {
                $('.header-option>li:nth-child(1)').removeClass('header-selected');
                $('.header-option>li:nth-child(1)>span:first-child').removeClass('green-selected');
                $('.header-option>li:nth-child(2)').addClass('header-selected');
                $('.header-option>li:nth-child(2)>span:first-child').addClass('green-selected');
                $("#Account").show();
            }
        }
        if (id == '#AdminManage') {
            window.sessionStorage['navTop'] = JSON.stringify({name: '账户管理', href: '#manage'});
            selNav(true)
        } else if (id == '#AdminIndex') {
            window.sessionStorage['navTop'] = JSON.stringify({name: '服务管理', href: '#index'});
            selNav(false)
        } else {
            //二级路由变更刷新后恢复顶部菜单状态
            if (window.sessionStorage['navTop']) {
                var snav = JSON.parse(window.sessionStorage['navTop']);
                if (snav.href == '#manage') {
                    selNav(true)
                } else if (snav.href == '#index') {
                    selNav(false)
                }
            }

        }
        for (var i = 0; i < routerArr.length; i++) {
            var data = routerArr[i];
            if (data === id) {
                $(id).show();
            } else {
                $(data).hide();
            }
        }
    };
    // AdminAddUser.init();


    //处理全局URL
    //首页
    var indexPage = function () {
        PageIndexEvent.init();
        RouterDisplay("#AdminIndex");
    };
    // 服务添加页面
    var AddPage = function (id) {
        AddPageEvent.init(id);
        RouterDisplay("#AdminAdd");
    };
    //账户管理
    var AddManage = function () {
        AdminManageEvent.init();
        RouterDisplay("#AdminManage");
        console.log("这是账户管理页面");
    };
    //单个用户管理
    var ManageAccount = function (id, appkey) {

        OneManageAccountEvent.init(id, appkey);
        RouterDisplay("#OneAccountDetail");
    };
    //单个用户服务管理
    var ManageService = function (id) {
        window.TD.id = id;
        adminServiceManageEvent.init(id);
        RouterDisplay("#OneServiceDetail");
    };
    //服务详情
    var ServiceDetail = function (id, name) {
        ServiceDetailEvent.init(id, name);
        RouterDisplay('#PageDetail');
    }
    //用户查询
    var UserSearchl = function (id, name) {
        UserSearch.init(id, name);
        RouterDisplay('#userSearchPage');
    }
    var PageDetail = function (id) {
        ServiceDetailEvent.init(id);
        RouterDisplay('#PageDetail');
    }
    //配置路由及模块初始化fn
    indexPage();
    var routes = {
        '/index': indexPage,
        '/add': {
            '/:id': AddPage
        },
        '/manage': AddManage,
        '/accountdetail': {
            "/:id/:appkey": ManageAccount
        },
        '/servicedetail': {
            "/:id/:name": ManageService
        },
        '/detail': {
            "/:id": ServiceDetail
        },
        '/usersearch': {
            "/:id/:name": UserSearchl

        }
    };
    var router = Router(routes);
    // console.log(routes);
    router.init();

    //全局ajax事件劫持
    //token失效跳回登录页面
    $(document).ajaxStart(function () {
        // $('#app-loading').show();
    }).ajaxStop(function () {

    }).ajaxComplete(function (event, xhr, settings) {
        $('#app-loading').hide();
        var rd = JSON.parse(xhr.responseText);
        // if (rd.status === 403) {
        //     window.TD.util.Cookie.set('market_tdppt', '', {exp: -1, domain: window.location.hostname})
        //     window.location.href = "login.html#/index";
        // }
        // $('#app-loading').hide();
    }).ajaxError(function () {
        $('#app-loading').hide();
    });

    //面包屑导航sub事件
    //parameter@data constructor:{data:[{name:'wm',href:window.location.hash}]} | session:navTop,navSecond
    $(window).on('navchange', function (e, data) {
        console.log(data)
        var html = window.template(navList, data);
        $('#adminNav').html(html);
    })
    //pub
    //parameter@navs:array
    window.pubNav = function (navs) {
        $(window).trigger('navchange', {data: navs});
    }

    //处理404页面的存在问题
    var goHistoryURL = function () {
        var baseURL = window.TD.util.parseHash();
        var isHasHash = {
            status: false,
            target: ''
        };
        for (var i in routes) {
            if (i.indexOf(baseURL[1]) > -1) {
                isHasHash.status = true;
                isHasHash.target = baseURL[1];
                break;
            }
        }
        var isFunction = $.type(routes['/' + isHasHash.target]) == "function";

        return isHasHash.status && isFunction && !baseURL[2] || ( !isFunction && isHasHash.target !== '' && baseURL[2] );
    };
    // $(window).on("hashchange", function () {
    //     var status = goHistoryURL();
    //     if (!status) {
    //         window.location.hash = "#/index";
    //     }
    // });
    // if (!goHistoryURL()) {
    //     window.location.hash = "#/index";
    // }

});