define(function( require,exports,module ){
	var tpl = require( '../tpl/BaseInforDetail' );
	var PopTestTpl = require('../tpl/PopupTestTpl');
	var PopBuyTpl = require('../tpl/PopupBuyTpl');
	var DosageDetail = require( './DosageDetail' );
	var UserDialog = true;  //调用演示弹层
	var isDialog = null;    //购买弹层
	var ArgumentStr = "";   //调用演示请求url字符串
	var northToken = "";    //保存换取的token 用于调用演示
	var northUrl = "";      //调用演示的url中
	var AuldNorthUrl = "";  //用于存放一开始获取的northurl
	var servicename = "";   //用于购买服务时提交
	var Id = "";            //服务的ID
	var IsTest = false;     //是否进行过调用演示
	var ReplaceArgument = false; //是否替换参数
	var ServiceMethod = "";  //请求方式
	var mark = [];
	var AboutInfor = {
		// index : 0,
		init : function( data,serviceId ){
			var html = window.template( tpl,data );
			this.serviceId = serviceId;
			Id = serviceId;
			servicename = data.headerMap.name;
			if(data.simpleContent.api.api.method){
				ServiceMethod = data.simpleContent.api.api.method.trim();
			} 
			$("#HeaderTitle").html(servicename);  //左上服务标题
			$("#DetailBaseInfor").html( html );
			this.BuyerEvent(data); //点击购买 
			this.SubmitBuy();	   //提交购买
			this.UseEvent();
		},
		getUseAjax : function(){
			return $.ajax({
				url : window.TD.vHosts + '/datamarket/getService/' + this.serviceId ,
				data : {
					token : window.TD.token,
					from : window.TD.vFrom, 
				},
				type : "get",
				dataType : "json"
			})
		},   
		UseEvent : function(){
			var self = this;
			var $test = $("#CheckTest");
			if( UserDialog ){	
				$("#BuyAndUse").off("click").on("click","#UserDialog",function(){
					self.getUseAjax().promise().done(function(data){
						if(data.status ==200 && data.data){
							var request = {};
							if(data.data.request && data.data.request.trim()){
								request = {
								 	data : JSON.parse(data.data.request),
								 	method : ServiceMethod
								};
							}else{
								request = {};
							}
							// console.log(request);
							var html = window.template(PopTestTpl,request);
							UserDialog = new window.TD.ui.Dialog('body',{
							    containHtml : html,
								trigger : "eachchange",//回调事件调用方法
							})	
							northUrl = data.data.northUrl;  //打开弹层 获取northUrl
							AuldNorthUrl = data.data.northUrl;
							UserDialog.open();  
							self.TokenAndKey();             //key和token放在文本框
							self.InputBlur();               //内容提示
						}else if( data.status === 200 || ( !data.data || !data.data.request ) ){
							// alert( data.msg )
							$('#appAlert').show();
							$('#appAlertContent').html("警告："+data.msg);
							var timer = setTimeout(function(){
								$('#appAlert').hide();
							},2000)
						}else{
							$('#appAlert').show();
							$('#appAlertContent').html("警告："+data.msg);
							var timer = setTimeout(function(){
								$('#appAlert').hide();
							},2000)
						}
						self.CheckButton();
					}).fail(function (err) {
						console.warn(err);
						// self.renderListView();
						$('#appAlert').show();
						$('#appAlertContent').html("警告："+err.msg);
						var timer = setTimeout(function(){
							$('#appAlert').hide();
						},2000)
					});
					return false;
				})
			}	
		},
		BuyerEvent : function(data){
			if( !isDialog ){
				var html = window.template(PopBuyTpl,data);
				isDialog = new window.TD.ui.Dialog('body',{
			        containHtml : html,
					trigger : "eachchange"//回调事件调用方法
				})	
			}
			$("#PageDetail").on("click","#BuyDialog",function(){
			    isDialog.open();
		    })
		    $(document).on("click",".close-buy",function(){
		    	isDialog.close();	    	
		    })
		    $(document).on("click",".check-back",function(){
		    	isDialog.close();		    	
		    })
		},
		CheckButton : function(){
			var self =this;
			var $testArgument = $(".Input");
			var $ArgumentInput = $(".ArgumentInput");
			$(".clearfix").off("click").on("click",".check-return",function(){
				UserDialog.close();
				self.Refresh();
			})
			$(".jump-head").off("click").on("click",".close",function(){
				UserDialog.close();
				self.Refresh();
			})
			$(document).off("click").on("click","#CheckTest",function(){
				northUrl = AuldNorthUrl;
				$(".test-loading").css("display","block");
				self.Test().promise().done(function(data){
					if(data.status == 200){
						$(".test-loading").css("display","none");
						var version = "";
						northToken = data.data.token;
						if(northUrl.indexOf("{") >= 0){
							self.TakePlace(northUrl);
						}
						if(ServiceMethod == "get" || ServiceMethod == "Get" || ServiceMethod == "GET"){
							ArgumentStr = self.AddStr(mark);
							self.Result();
						}else{
							ArgumentStr = $(".PostArgument").val();
							// if(JSON.parse($(".PostArgument").val())){
								self.Result();
							// }else{
							// 	$(".test-loading").css("display","none");
							// 	alert("请输入正确的Json格式");
							// }
						}	
					}else{
						$(".test-loading").css("display","none");
						// alert("警告："+data.msg);
						$('#appAlert').show();
						$('#appAlertContent').html("警告："+data.msg);
						var timer = setTimeout(function(){
							$('#appAlert').hide();
						},2000)
					}
				}).fail(function(err){
					console.warn( err );
					$(".test-loading").css("display","none");
					$('#appAlert').show();
					$('#appAlertContent').html("警告："+err.msg);
					var timer = setTimeout(function(){
						$('#appAlert').hide();
					},2000)
				})
			})
		},
		SubmitBuy : function(){
			var self = this;
			$("body").off("click").on("click",".check-submit",function(){
				$.ajax({
					url : window.TD.vHosts+"/datamarket/sendEmail",
					type : "post",  
					data : {
	                    token : window.TD.token,
						service : servicename
					},
					success : function(data){
						if(data.status == 200){
							var html = '您的购买需求已提交,1天内会有客服人员与您联系.<br>请保持电话通畅!<br><br><button class="check-back">返回</button>';
							$(".buy-words-tip").html(html)
						}else{
							var html = '购买失败!<br><br><button class="check-back">返回</button>';
							$(".buy-words-tip").html(html)
						}
					}
				})
			 })
		},
		Ergodic:function(element,test){
			var j = 1;
			for(var i =0;i<element.length;i++){
				if(element[i].value == ""){
					j=0;
					break;
				}
			}
			if(j==0){
				test.attr('disabled',"true").addClass("disabled").removeClass("check-test");
			}else{
				test.removeAttr("disabled").addClass("check-test").removeClass("disabled");
			}
		},
		InputBlur : function(){
			var $necessary = $(".necessary");
			var $test = $("#CheckTest");
			var self = this;
			$necessary.focus(function(){ 
				if($(this).val()==""){
					$(this).css("border","2px red solid");
				}else{
					$(this).css("border","1px #e8e8e8 solid");
				}
				self.Ergodic($necessary,$test);
			})
			$necessary.blur(function(){ 
				if($(this).val()==""){
					$(this).css("border","2px red solid");
				}else{
					$(this).css("border","1px #e8e8e8 solid");
				}
				self.Ergodic($necessary,$test);
			})
			$necessary.keyup(function(){
				self.Ergodic($necessary,$test);
			})
		},
        Test : function(){
 			var value = [];
 			var index = 0;
			$(".ArgumentInput").each(function(index){
				value[index] = $.trim($(this).val());
			});	
			return $.ajax({
				url : window.TD.vHosts+"/datamarket/callDemo",
				type : "get",
				data : {
                    token : window.TD.token,
					from : window.TD.vFrom, 
					APIKey : $.trim(value[0]), 
					APIToken : $.trim(value[1])
				}
			})
		},
		Result : function(){
			var self = this;
			if(ServiceMethod == "get" || ServiceMethod == "Get" || ServiceMethod == "GET"){
				$.ajax({
					url :  window.TD.TestHost + northUrl + ArgumentStr,
					type : "get",
					timeout: 30000,
					headers: {
	        			"X-Access-Token": northToken
	    			},
	    			success :self.AjaxSuccess,
	    			error : self.AjaxError,
	    			complete : function(XMLHttpRequest,status){
	    				if(status == 'timeout'){
	    					Result.abort();
	    					// alert("请求超时");
							$('#appAlert').show();
							$('#appAlertContent').html("请求超时");
							var timer = setTimeout(function(){
								$('#appAlert').hide();
							},2000)
	    					$(".test-loading").css("display","none");
	    				}
	    			}				
				})
			}else{
				$.ajax({
					url :  window.TD.TestHost + northUrl ,
					type : "post",
					timeout: 30000,
					headers: {
	        			"X-Access-Token": northToken
	    			},
	    			contentType: 'application/json',
	    			dataType:'json',
	    			data: ArgumentStr,
	    			success : self.AjaxSuccess,
	    			error : self.AjaxError,
	    			complete : function(XMLHttpRequest,status){
	    				if(status == 'timeout'){
	    					Result.abort();
	    					// alert("请求超时");
                            $('#appAlert').show();
                            $('#appAlertContent').html("请求超时");
                            var timer = setTimeout(function(){
                                $('#appAlert').hide();
                            },2000)
	    					$(".test-loading").css("display","none");
	    				}
	    			}				
				})
			}			
		},
		AddStr : function(mark){
			var value = [];
			var key = [];
			var str = "?";
			$(".Input").each(function(index,item){
				if(mark.indexOf(index) < 0){
					if($(this).val().length > 0){
						value.push($.trim($(this).val()));
						key.push($.trim($(".Argument")[index].innerHTML));
					}
				}		
			})

			for(var i=0;i<value.length;i++){
				if( i+1 ==value.length ){
					// console.log($.trim(key[i]));
					str = str + $.trim(key[i]) + "=" + $.trim(value[i]);
				}else{
					// console.log($.trim(key[i]));
					str = str + $.trim(key[i]) + "=" + $.trim(value[i]) + "&";
				}	
			} 
			if(str.length == 1){
				str = "";
			}
			return str;
		},
		format : function(){
		    var theString = arguments[0];
		    for (var i = 1; i < arguments.length; i += 2) {
		        var regEx = new RegExp("\\{" + arguments[i] + "\\}", "gm");
		        theString = theString.replace(regEx, arguments[i + 1]);
		    }
		    return theString;
		},
		TokenAndKey : function(){
			$.ajax({
				url :  window.TD.vHosts + "/datamarket/account",
				type : "get",
				data :{
					token : window.TD.token,
					from : window.TD.vFrom
				},
    			success : function( data ){
    				$(".ArgumentInput")[0].value = data.data.appList[0].appKey;
    				$(".ArgumentInput")[1].value = data.data.appList[0].secToken;
    				if($(".necessary").length ==2){
    					$("#CheckTest").removeAttr("disabled").addClass("check-test").removeClass("disabled");
    				}
    			}
			})
		},
		Refresh : function(){
			if(IsTest == true){
				 window.location.reload()
			}
		},
		TakePlace : function(){
			var self =this;
			var $InputArgument = $(".Argument");
			var start = -1;
			var end = -1;
			for(var i = 0;i<AuldNorthUrl.length;i++){
				if(AuldNorthUrl.charAt(i)=="{"){ 
					start = i;
				}
				if(AuldNorthUrl.charAt(i)=="}"){
					end = i;
				}
				if(end > start && i == end){
					version = AuldNorthUrl.substring(start+1,end);
					console.log(version);
					// console.log(northUrl); 
					for(var j=0;j<$InputArgument.length;j++){
						if($InputArgument[j].innerHTML == version){
							northUrl = this.format(northUrl,version,$.trim($(".Input")[j].value));
							mark.push(j)
							break;
						}
					}
				}
			}			
		},
		AjaxSuccess : function( data ){
			IsTest = true;
			$("#TestResult").html("<div>" + JSON.stringify( data,null,"\t" ) + "</div>"); 
			$(".test-loading").css("display","none");
			$(".dialog-content").css("margin-bottom",$(".jump").offset().top + "px");
		},
		AjaxError : function(XMLHttpRequest){
			console.log(XMLHttpRequest);
			$(".test-loading").css("display","none");
			console.log(JSON.parse(XMLHttpRequest.responseText));
			var msg = JSON.parse(XMLHttpRequest.responseText);
			if(XMLHttpRequest.status == 400){
				$("#TestResult").html("请求错误!");
			}
			if(XMLHttpRequest.status == 401){
				$("#TestResult").html("认证失败!");
			}
			if(XMLHttpRequest.status == 403){
				$("#TestResult").html("暂无权限!");
			}
			if(XMLHttpRequest.status == 404){
				$("#TestResult").html("请求错误地址!");
			}
			if(XMLHttpRequest.status == 405){
				$("#TestResult").html("提交了不支持的方法!");
			}
			if(XMLHttpRequest.status == 406){
				$("#TestResult").html("提交了不支持的请求格式!");
			}
			if(XMLHttpRequest.status == 410){
				$("#TestResult").html("服务接口升级,不再支持!");
			}
			if(XMLHttpRequest.status == 430){
				// $("#TestResult").html("超过配额!");
				if(msg.msg == 'NO_QUOTA_CONFIG'){
					$("#TestResult").html("没有授权设置!");
				}else if(msg.msg == 'QUOTA_EXCEED'){
					$("#TestResult").html("调用次数用尽!");
				}else if(msg.msg == 'TIME_EXCEED'){
					$("#TestResult").html("超出授权调用时间!");
				}
			}
			if(XMLHttpRequest.status == 500){
				$("#TestResult").html("服务器异常!");
			}
			if(XMLHttpRequest.status == 503){
				$("#TestResult").html("服务器暂时不可用!");
			}

		}
	};
	module.exports = AboutInfor;
})

