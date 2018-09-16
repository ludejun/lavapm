define(function( require,exports,module ){
	//业务通用功能
	require( '../app/app' );
	//初始化设置artTemplate模板是否渲染HTML
	window.template.config('escape',false);
	window.template.config('compress',false);
	//首页
	var PageIndexEvent = require( '../index/index' );

	//详情页
	var PageDetailEvent = require( '../detail/detail' );

	//mydata页面
	var PageMydataEvent = require( '../mydata/mydata' );

	//loading tpl
	var _HOSTNAME = window.location.hostname,_COOKIE = window.TD.util.Cookie;
	window.loading = require('../tpl/loading');

	var header = function( head ){
		var $nav = $(".header-option .tab");
		if( head ){
			$nav.eq(0).addClass("header-selected").siblings().removeClass("header-selected");
		}else{
			$nav.eq(1).addClass("header-selected").siblings().removeClass("header-selected");
		}
	}
	//处理全局URL
	var indexPage = function(){
		window.TD.Hash = "index";
		PageIndexEvent.init();
		console.log('page-index');
		header( true );
	};
	var detailPage = function( id ){
		PageDetailEvent.init(id);
		console.log( 'page-detail-id:' + id )
		header( true );	
	}
	var MydataPage = function(){
		window.TD.Hash = "mydata";
		PageMydataEvent.init();
		console.log( 'mydata' )
		header( false );
	};
	var routes = {
		'/index' : indexPage,
		'/mydata' : MydataPage,
		'/detail' : {
			'/:detailId' : detailPage
		}
	}
	var router = Router( routes );
	router.init();

	//全局ajax事件劫持
	//token失效跳回登录页面
	//判定登陆状态
	// var isLogin = function () {
	// 	var td = _COOKIE.get("tdppt");
	// 	var mk_td = _COOKIE.get("market_tdppt");
	// 	if(!td) {
	// 		window.location.href = "login.html#/index";
	// 	}
	// }();

	$(document).ajaxStart(function () {
		// $('#app-loading').show();
	}).ajaxStop(function () {

	}).ajaxComplete(function (event, xhr, settings) {
		$(".app-loading").hide()
		// var rd = JSON.parse(xhr.responseText);
		// if (rd.status === 403) {
		// 	_COOKIE.set('tdppt', '', {exp: -1, domain: _HOSTNAME});
		// 	_COOKIE.set('token', '', {exp: -1, domain: _HOSTNAME});
		// 	window.sessionStorage.clear();
		// 	window.location.href = "login.html#/index";
		// }
		// $('#app-loading').hide();
	});


	//处理404页面的存在问题
	var goHistoryURL = function(){
		var baseURL = window.TD.util.parseHash();
		var isHasHash = {
			status : false,
			target : ''
		};
		for( var i in routes ){
			if( i.indexOf( baseURL[1] ) > -1 ){
				isHasHash.status = true;
				isHasHash.target = baseURL[1];
				break;
			}
		}
		return isHasHash.status || isHasHash.target !== '' && !baseURL[2];
	};
	$(window).on("hashchange",function(){
		var status = goHistoryURL();
		if( !status ){
			window.location.hash = "#/index";
		}
	})
	if( !goHistoryURL() ){
		window.location.hash = "#/index";
	}	
})