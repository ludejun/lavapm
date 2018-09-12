define(function( require,exports,module ){
	var DetailData = {};
	var URL = window.TD.vHosts;
	var $App = $("#app");
	var promise = require("../index/pageAjax");
	//主体模板
	var PageDetailTpl = require( '../tpl/PageDetailTpl' );
	//introduce
	var IntroduceDetail = require( './IntroduceDetail' );
	//API
	var ApiDetail = require( './ApiDetail' );
	//code
	var CodeDetail = require( './CodeDetail' );
	//status 
	var StatusDetail = require( './StatusDetail' );
	//dosage
	var DosageDetail = require( './DosageDetail' );
	//右侧基本信息
	var AboutInfor = require( './AboutInfor' );
	//Tabs显示问题
	var TabsListDeTail = require( '../tpl/TabsListDetail' );
	//headerTable显示
	var HeaderDropDown = require( './HeaderDropdown' );
	window.TD.Time = 7;
	var BuyTestTpl = require('../tpl/BuyAndTest');
	var $AppLoading = $(".app-loading");
	var severId = "";
	var DetailPage = {
		//页面入口
		init : function(id,hash){
			severId = id;
			var html = window.template( PageDetailTpl,{} );
			$App.html( html );
			promise({});
			this.$RenderContent = $("#DetailInfor");
			this.renderHtml( id );
			$AppLoading.show();
		},
		Tabs : function(){
			var $tabs = $("#LeftTabs");
			var self = this;
			$tabs.on("click","li",function(){
				var me = $(this),
				type = me.attr("data-id");
				me.addClass("left-tab-selected")
				.siblings().removeClass("left-tab-selected");
				self.pageContentLoad( type , severId);
			})
		},
		renderTabs : function( data ){
			// var buy = data.buy;
			console.log(data);
			var html = window.template( TabsListDeTail,data );
			$("#DetailTabsList").html( html );
		},
		pageContentLoad : function( type ,severId ){
			console.log(type,DetailData.simpleContent)
			switch ( type ){				
				case "introduce" : 
					IntroduceDetail.init( DetailData.simpleContent.desc );
					// AboutInfor.index = 0;
					break;
				case "api" : 
					ApiDetail.init( DetailData.simpleContent );
					// AboutInfor.index = 1;
					break;
				case "status" :
					StatusDetail.init( DetailData.simpleContent.status ); 
					// AboutInfor.index = 2;
					break;					
				case "dosage" : 
					DosageDetail.init( DetailData.simpleContent.statistics,severId );
					break;
			}
		},
		formateSimpleContent : function( data ){
			var self =this;
			DetailData.headerMap = data.headerMap;
			DetailData.simpleContent = data.simpleContent;
			if(data.buy == 1){
				DetailData.simpleContent.statistics.statistics.table.order = self.ReverseArray(data.simpleContent.statistics.statistics.table.data);
			}
		},
		renderHtml : function( id ){
			var token = window.TD.util.Cookie.get('tdppt');
			var self = this;
			$.ajax({
				url : URL + '/datamarket/myData/' + id,
				type : "get",
				data : {
					token : window.TD.token,
					from : window.TD.vFrom,
					beforeDays : window.TD.Time
				},
				success : function( data ){
					if( data.status == 200 ){
						$AppLoading.hide();
						data.data.hash = window.TD.Hash;
						self.formateSimpleContent( data.data );
						self.renderTabs( data.data );
						if(window.TD.Hash == "index"){
							self.pageContentLoad( 'introduce' );
							IntroduceDetail.init( DetailData.simpleContent.desc );
						}else{
							self.pageContentLoad( 'dosage' );
							DosageDetail.init( DetailData.simpleContent.statistics,severId );
						}
						AboutInfor.init( DetailData,id );
						$("#HeaderTitle").html( DetailData.headerMap.name);
						self.Tabs();
						HeaderDropDown.init([{ id : 1, name : "111" }]);
						var usehtml = window.template( BuyTestTpl,data )
						$("#BuyAndUse").html(usehtml);
						if(data.data.buy == 1){
							$(".triangle").css("display","inline-block");					
						}else{
							$(".triangle").css("display","none");
							$("#HeaderDetailDropDown").css("display","none");
						}
					}
				},
				error : function( err ){
					console.warn( err );
				}
			})
		},
		ReverseArray : function(arr){
			var ReArr = [];
			for(var i=arr.length-1;i>-1;i--){
				ReArr.push(arr[i]);
			}
			return ReArr;
		}
	};
	module.exports = DetailPage;
})