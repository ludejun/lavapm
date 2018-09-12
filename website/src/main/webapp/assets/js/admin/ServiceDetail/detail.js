define(function( require,exports,module ){
	var DetailData = {};
	var URL = window.TD.vHosts;
	var $RenderContent = $("#DetailInfor");

	//introduce
	var IntroduceDetail = require( './IntroduceDetail' );
	//API
	var ApiDetail = require( './ApiDetail' );
	//code
	var CodeDetail = require( './CodeDetail' );
	//status
	var StatusDetail = require( './StatusDetail' );
	//右侧基本信息
	var AboutInfor = require( './AboutInfor' );

	//Tabs显示问题
	var TabsListDeTail = require( '../../tpl/TabsListDetail' );

	//headerTable显示

	var HeaderDropDown = require( './HeaderDropdown' );
	var BuyTestTpl = require('../../tpl/BuyAndTest');

	var DetailPage = {
		//页面入口
		init : function( id ){
			$('#app-loading').show();//loading
			this.renderHtml( id );


			//面包屑导航栏
			console.log('#########');
			// window.pubNav([JSON.parse(window.sessionStorage['navTop']),{name:'服务列表',href:window.location.hash}]);
			//pageEventList
		},
		Tabs : function(){
			var $tabs = $("#LeftTabs");
			var self = this;
			$tabs.on("click","li",function(){
				var me = $(this),
				type = me.attr("data-id");
				me.addClass("left-tab-selected")
				.siblings().removeClass("left-tab-selected");
				self.pageContentLoad( type );
			})
		},
		renderTabs : function( data ){
			data.buy = 1;
			data.hash = 'detail';
			var html = window.template( TabsListDeTail,data );
			$("#DetailTabsList").html( html );
		},
		pageContentLoad : function( type ){
			console.log(type,DetailData.simpleContent)
			switch ( type ){				
				case "introduce" : 
					IntroduceDetail.init( DetailData.simpleContent.desc );
					break;
				case "api" : 
					ApiDetail.init( DetailData.simpleContent );
					break;
				case "code" : 
					CodeDetail.init( DetailData.simpleContent.example );
					break;
				case "status" :
					StatusDetail.init( DetailData.simpleContent.status ); 
					break;
			}
		},
		formateSimpleContent : function( data ){
			DetailData.headerMap = data.headerMap;
			//DetailData.simpleContent = {};
			DetailData.simpleContent = data.simpleContent;
			// for( var i = 0; i < data.simpleContent.length;i++ ){
			// 	var d = data.simpleContent[i];
			// 	DetailData.simpleContent[d.name] = d[d.name];
			// }
		},
		renderHtml : function( id ){
			var token = window.TD.util.Cookie.get('tdppt');
			var self = this;
			$.ajax({
				url : URL + '/admin/myData/' + id,
				type : "get",
				data : {
					token : window.TD.token,
					from : window.TD.vFrom
				},
				success : function( data ){
					if( data.status == 200 ){
						$('#app-loading').hide();
						console.log(data);
						self.formateSimpleContent( data.data );
						//DetailData = data.data;
						self.renderTabs( data.data );
						self.pageContentLoad( 'introduce' );
						AboutInfor.init( DetailData,id );
						self.Tabs();
						HeaderDropDown.init([{ id : 1, name : "111" }]);
						// var usehtml = window.template( BuyTestTpl,data )
						// $("#BuyAndUse").html(usehtml);

					}else{
						$("#DetailTabsList").html( '<div class="empty-data">暂无此服务的数据</div>' );
					}
					//设置面包屑
					window.pubNav([JSON.parse(window.sessionStorage['navTop']),{name:data.data.headerMap.name,href:window.location.hash},{name:'服务详情',href:window.location.hash}]);
				},
				error : function( err ){
					console.warn( err );
					$("#DetailTabsList").html( '<div class="empty-data">暂无此服务的数据</div>' );
				}
			})
		}
	};
	module.exports = DetailPage;
})