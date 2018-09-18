    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
        <meta charset="utf-8">
        <title>index.html</title>
        <link rel="stylesheet" href="/market/assets/css/admin.css">
        </head>
        <body>
        <div class="contents">
        <div class="con-box" style="overflow-y: auto;overflow-x: hidden;">

        <div class="header">
       <!--  <div class="header-logo">
        <a href="#/index"></a>
        </div> -->
        <ul class="header-option">
        <li>
        <!-- <span class="green"></span> -->
        <a href="#/manage" class='headerOptionAccount'>账户管理</a>
        </li>
        <li class="header-selected">
        <!-- <span class="green green-selected"></span> -->
        <a href="#/index" class='headerOptionManger'>服务管理</a>
        </li>
        </ul>
        <!--<div class="header-me">-->
        <!--<i class="header-head"></i>-->
        <!--<span class="header-name">******</span>-->
        <!--<i class="header-out"></i>-->
        <!--</div>-->
        </div>
        <!--后台公共面包屑-->
        <div id="adminNav"></div>

        <div class="app-loading" id="app-loading">
        <div class="loadEffect">
        <div class="spinner">
        <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
        </div>
        </div>
        </div>
        </div>

        <div id='appAlert' class='animated fadeInDownBig'>
        <i></i>
        <span id='appAlertContent'>提示</span>
        </div>

        <div id="app">
        <div id="AdminIndex">

        <div class="data-serve">
        <div class="data-serve-tile">
        <!--<h2>数据服务列表</h2>-->
        <div class="add-server"><a href="#/add/new">+ 添加服务</a></div>


        <div class='server-search'>
        <span class='adminIndexDownLoad' title='下载全部数据'></span>
        <input class='server-search-ipt' type="text" placeholder='请输入要搜索的数据服务名称'>
        <span class='server-search-btn'>搜索</span>
        </div>

        <span class="issue">创建日期 :</span>
        <div class="data-time">
        <i class='data-time-now'>全部</i>
        <i class="data-arrow"></i>
        <ul class="data-time-list">
        <li value="1">最近7天</li>
        <li value="2">最近30天</li>
        <li value="3">最近90天</li>
        <li>全部</li>
        </ul>
        </div>


        <span class="issue">状态 :</span>
        <div class="data-time2">
        <i class='data-time-now2'>全部</i>
        <i class="data-arrow2"></i>
        <ul class="data-time-list2">
        <li value="1">已发布</li>
        <!--<li value="2">调试中</li>-->
        <li value="3">下线</li>
        <li value="4">未发布</li>
        <li value="5">全部</li>
        </ul>
        </div>

        </div>


        <div class="data-server-table">
        <!-- <div class="data-server-table"> -->
        <ul class="data-server-header">
        <li>序号</li>
        <li>数据服务名称</li>
        <li>类型</li>
        <li>提供商</li>
        <li>状态</li>
        <li>创建时间</li>
        <li>上架时间</li>
        <li>调用账号数/次数</li>
        <li>有效访问/超限访问</li>
        <li>操作</li>
        </ul>
        <div id="AdminListView">

        </div>

        <!-- </div> -->

        <div class="data-server-page">
        <div class="td-ui-page" id="AdminListViewPage">

        </div>
        </div>
        </div>

        </div>

        </div>

        <div id="AdminAdd">
        <!--<div class="serve-add">-->
        <!--<div class="serve-add-header">-->
        <!--<a href="#">服务管理</a>-->
        <!--<span>></span>-->
        <!--<a href="#">服务添加</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="serve-container">-->
        <!--<div class="serve-cont">-->
        <!--<h3>服务信息</h3>-->
        <!--<div class="serve-cont-msg-input padding-top">-->
        <!--<span>名称</span>-->
        <!--<input type="text">-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span>ID</span>-->
        <!--<input type="text">-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input serve-cont-define-input">-->
        <!--<span class="left pad-5px">类型</span>-->
        <!--<div class="serve-define-url left">-->
        <!--<span>用户查询</span>-->
        <!--<select>-->
        <!--<option>用户查询</option>-->
        <!--<option>位置服务</option>-->
        <!--<option>用户查询</option>-->
        <!--<option>位置服务</option>-->
        <!--</select>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left">供应商</span>-->
        <!--<input type="text">-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left intro-margin">简介描述</span>-->
        <!--<textarea name="简介描述" id=""></textarea>-->
        <!--</div>-->
        <!--<h3 class="serve-icon-define">服务定义</h3>-->
        <!--<div class="serve-cont-msg-input serve-cont-define-input padding-top">-->
        <!--<span>URL地址</span>-->
        <!--<input type="text">-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input serve-cont-define-input">-->
        <!--<span class="left pad-5px">请求地址</span>-->
        <!--<div class="serve-define-url left">-->
        <!--<span>请选择</span>-->
        <!--<ul>-->
        <!--<li>xxxx</li>-->
        <!--<li>xxxx</li>-->
        <!--<li>xxxx</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left">供应商</span>-->
        <!--<input type="text">-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left">请求参数</span>-->
        <!--<div class="serve-para left">-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left">返回参数</span>-->
        <!--<div class="serve-para left">-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
        <!--</div>-->
        <!--<div class="serve-cont-msg-input">-->
        <!--<span class="left">实例</span>-->
        <!--<div class="serve-para left">-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--<ul>-->
        <!--<li>={appkey}</li>-->
        <!--<li>String</li>-->
        <!--<li>产品的唯一标示；</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--<div class="clear"></div>-->
        <!--</div>-->
        <!--<div class="serve-manage-footer">-->
        <!--<button class="btn-blue">发布</button>-->
        <!--<button>预览</button>-->
        <!--<button>服务测试</button>-->
        <!--<button>保存</button>-->
        <!--<button>取消</button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        </div>
        <div id="AdminManage">
        <!--<div class="serve-add">-->
        <!--<div class="serve-add-header">-->
        <!--<a href="#/manage">账户管理</a>-->
        <!--<span id="Account">-->
        <!--<span>></span>-->
        <!--<a href="#/index">账户列表</a>-->
        <!--</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="account-list">
        <div class="account-list-search right">
        <!--<form action="">-->
        <input class="acc-search-ipt" type="text" placeholder="请输入关键词（企业名称/邮箱/人名）"><input class="acc-sub-ipt"
        type="button" value="搜索">
        <!--</form>-->
        </div>
        <div class="account-add-id left">
        <span>+ 添加账号</span>
        </div>
        </div>
        <div class="account-list-ul">
        <ul class="data-server-header">
        <li>序号</li>
        <li>用户名</li>
        <li>联系人</li>
        <li>企业名称</li>
        <li>联系电话</li>
        <li>注册时间</li>
        <li>开通服务数量</li>
        </ul>
        <div id="AccountList">

        </div>
        </div>
        <div class="data-server-page">
        <div class="td-ui-page" id="AdminCountViewPage">

        </div>
        </div>

        <!--<div class='data-server-win'>-->

        <!--</div>-->
        </div>
        <div id="OneAccountDetail">
        <!--menu-->
        <!-- <div class="header-nav header">
        <div class="header-nav-h2" id="OneAccountDetailh2" >
        </div>
        </div> -->
        <!--menu end-->
        <!--content-->
        <div class="account-apps content clearfix">
        <!--left-->
        <div class="account-left">
        <div id="AccountDetailInfor">

        </div>
        </div>
        <!--left end-->
        <!--right-->
        <div class="account-right">
        <div class="right-head">
        <i class="about"></i>
        <h2>关于</h2>
        </div>
        <ul class="right-li">
        <li>邮箱:</li>
        <li>联系方式:</li>
        <li>公司名称:</li>
        <li>联系人:</li>
        </ul>
        <ul class="right-list" id="AccountDetailBaseInfor">
        </ul>
        </div>
        <!--right end-->
        </div>
        <!--content end-->
        </div>
        <div id="OneServiceDetail">
        <!--menu-->
        <!-- <div class="header-nav header">
        <div class="header-nav-h2" id="OneSevericeDetailh2">
        </div>
        </div> -->
        <!--menu end-->
        <!--content-->
        <div class="account-apps content clearfix">
        <!--left-->
        <div class="account-left">
        <div id="ServiceDetailInfor">

        </div>
        </div>
        <!--left end-->
        <!--right-->
        <div class="account-right">
        <div class="right-head">
        <i class="about"></i>
        <h2>关于</h2>
        </div>
        <ul class="right-li">
        <li>邮箱:</li>
        <li>联系方式:</li>
        <li>公司名称:</li>
        <li>联系人:</li>
        </ul>
        <ul class="right-list right-li" id="DetailBaseInfor">
        </ul>
        </div>
        <!--right end-->
        </div>
        <!--content end-->
        </div>
        <div id="PageDetail">
        <!--menu-->
        <!--menu end-->
        <!--content-->
        <div class="apps content clearfix">
        <!--left-->
        <div class="page-left page-common">
        <div class="left-top" id="DetailTabsList">

        </div>
        <div id="DetailInfor">

        </div>
        </div>
        <!--left end-->
        <!--right-->
        <div class="page-right page-common">
        <div class="right-head statis">
        <i class="about"></i>
        <h2>关于</h2>
        </div>
        <div class="clearfix">
        <ul class="right-li right-li-l">
        <li>类别</li>
        <li>供应商</li>
        <li>发布日期</li>
        <li>状态</li>
        <li>价格</li>
        </ul>
        <ul class="right-list right-li right-li-r" id="ServiceDetailBaseInfor">
        </ul>
        </div>
        <div class="buy" id="BuyAndUse">
        <!-- <a id="BuyDialog" class="buy-button"><i class="cart"></i>购买</a>
        <a id="UserDialog" class="use-button"><i class="play"></i>调用演示</a> -->
        </div>
        </div>
        <!--right end-->
        </div>
        <!--content end-->
        </div>
        <!-- <div id="Popup"></div> -->
        <div id="userSearchPage">
        <div class="data-serve">
        <div class="account-list userHeader">
        <!--<div class="left" id="userPos">-->
        <!--<h2><span>...</span>服务用户查询列表</h2>-->
        <!--</div>-->
        <div class="account-list-search right" id="userFilter">
        <input class="acc-search-ipt" type="text" placeholder="请输入关键词（企业名称/联系人/账号/手机号）"><input class="acc-sub-ipt"
        type="button" value="搜索">
        <i class="searchClose" id="searchAll">X</i>
        </div>
        </div>

        <div class="data-server-table">
        <div class="data-server-table data-server-table2">
        <ul class="data-server-header">
        <li>序号</li>
        <li>企业名称</li>
        <li>联系人</li>
        <li>账号</li>
        <li>手机号</li>
        <li>开通时间</li>
        <li>有效期</li>
        <li>授权量</li>
        <li style="text-align:left">服务状态</li>
        </ul>
        <div id="userListView">

        </div>

        </div>

        <div class="data-server-page">
        <div class="td-ui-page" id="userListViewPage">

        </div>
        </div>
        </div>
        </div>

        </div>

        </div>

        </div>
        </div>


        <script type="text/javascript" src="/market/assets/js/lib/config.js"></script>
        <script type="text/javascript">
        window.TD = window.TD || {};
        window.TD.vHosts = td.websiteUrl;
        window.TD.token = '';
        window.TD.vFrom = "2";
        </script>
        <script type="text/javascript" src="/market/assets/js/lib/jquery.js"></script>
        <script type="text/javascript" src="/market/assets/js/lib/arttemplate.js"></script>
        <script type="text/javascript" src="/market/assets/js/lib/sea.js"></script>
        <script type="text/javascript" src="/market/assets/js/lib/echarts.js"></script>
        <script type="text/javascript" src="/market/assets/js/admin/admin.js"></script>
        </body>
        </html>
