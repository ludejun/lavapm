define(function( require,exports,module ){
	var UserDialog = null;
	var isDialog = null;
	var tpl = require( '../../tpl/BaseInforDetail' );
	var PopTestTpl = require('../../tpl/PopupTestTpl');
	var servicename = ""; 
	var north = [];
	var northToken = "";
	var northUrl = "";
	var AboutInfor = {
		init : function( data,serviceId ){
			var html = window.template( tpl,data );
			this.serviceId = serviceId;
			servicename = data.headerMap.name;
			$("#DetailTitle").html(servicename);
			$("#ServiceDetailBaseInfor").html( html );
			this.UseEvent();
			// var usehtml = window.template( BuyTestsTpl,data )
			// $("#BuyAndUse").html(usehtml);
		},
		getUseAjax : function(){
			return $.ajax({
				url : window.TD.vHosts + '/admin/getService/' + this.serviceId ,
				data : {
					token : window.TD.token,
					from : window.TD.vFrom,
					// serviceId : this.serviceId
				},
				type : "get",
				dataType : "json"
			})
		},
		UseEvent : function(){
			var self = this;
			if( !UserDialog ){	
				$("body").on("click","#UserDialog",function(){
					self.getUseAjax().promise().done(function(data){
						if(data.status ==200){
							var request = {
								 data : JSON.parse(data.data.request)
							};
							console.log(request.data)
							var html = window.template(PopTestTpl,request);
							UserDialog = new window.TD.ui.Dialog('body',{
							    containHtml : html,
								trigger : "eachchange",//回调事件调用方法
							})		
						}
						northUrl = data.data.northUrl;
						UserDialog.open();
					});
				})	
				// $("body").on("click",".check-return",function(){
				// 	UserDialog.close();
				// });
				// $("body").on("click",".close",function(){
				// 	UserDialog.close();
				// });

				// $("body").on("click",".check-test",function(){
				// 	self.Test().promise().done(function(data){
				// 		if(data.status == 200){	
				// 			northToken =data.data.token;
				// 			console.log("northToken:"+northToken);
				// 			console.log("northUrl:"+northUrl);
				// 			self.Result();

				// 		}
				// 	});
				// })
			}

		},
  //       Test : function(){
 	// 		var value = [];
 	// 		var index = 0;
		// 	$(".Input").each(function(index){
		// 		value[index] = $(this).val();
		// 	});
		
		// 	return $.ajax({
		// 		url : window.TD.vHosts+"/datamarket/callDemo",
		// 		type : "get",
		// 		data : {
  //                   token : window.TD.token,
		// 			from : window.TD.vFrom, 
		// 			APIKey : value[0], 
		// 			APIToken : value[1]
		// 		}
		// 	})
		// },
		// Result : function(){
		// 	// var $Input = $(".Input");
		// 	// var j = 0;
		// 	// var str = '';
		// 	// for(var i=2;i < $Input.length;i++){
		// 	// 	str = str + north[i] + "=" + $Input[i].value + "&";
		// 	// 	j++;
		// 	// }
		// 	// str = Substring(0,str.Length - 1)
		// 	$.ajax({
		// 		url :  window.TD.TestHost + northUrl+"?id=3ee97019a652ba909f8b5d515ebf6dba7&type=tdid",
		// 		type : "get",
		// 		headers: {
  //       			"X-Access-Token": northToken
  //   			},
  //   			success : function( data ){
  //   				$(".test-code").html( JSON.stringify( data ) );
  //   			}				
		// 	})
		// }
	};

	module.exports = AboutInfor;
})

