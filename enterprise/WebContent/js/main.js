initAppConfig();
function initAppConfig(){
	appConfig.authAppMap = {};
	appConfig.appCode = "";
	var locationHash = window.location.hash;
	if(locationHash){
		appConfig.appCode = locationHash.split('/')[0].replace("#", "");
	}

	/*if (appConfig.appCode == '' && appConfig.authAppList[0]) {
		appConfig.appCode = appConfig.authAppList[0].appCode;
	}*/
}

$(document).ready(function() {
	initPageSetKey();
	resetTitleByAppCode();
	var accountName = "";
	var accountEmail = "";
	var errorCount = 0;
	if(appConfig && appConfig.user && appConfig.user.name){
		accountName = appConfig.user.name;
		accountEmail = appConfig.user.email;
	}
	$("#account-name").html(accountName).attr("title",appConfig.user.name);
	$("#account-name2").html(accountName).attr("title",appConfig.user.name);
	$("#account-email").html(accountEmail);
	$.nav.showNav();
	$.product.init();
	//$.menu.showMenu(5000);
	$.loadPage();
	$.calculateConentsHeight();
	keeplive(errorCount);
});

function initPageSetKey(){
	var pageSetKey = {
		loginIndexLogo:'dmp.theme.login.logo',
		loginText:'dmp.theme.login.text',
		loginCopyright:'dmp.theme.copy.right.text',
		loginBackground:'dmp.theme.login.background',
		productLogo:'dmp.theme.product.logo',
		appNavLogo:'dmp.theme.app.nav.logo',
		appMenuLogo:'dmp.theme.app.menu.logo',
	};
	initLoginBackground(pageSetKey);
	initProductLogo(pageSetKey);
	initAppNavLogo(pageSetKey);
}

function initAppNavLogo(pageSetKey){
	var appNavLogo = "/enterprise/images/app/common/logo.png";
	if(appConfig && appConfig[pageSetKey.appNavLogo]){
		appNavLogo = appConfig[pageSetKey.appNavLogo];
	}
	$("#index-page .con-left > .logo").css({
		'background': '#242d56 url("'+appNavLogo+'") no-repeat center',
		"background-size":"auto 50%"
	});
}

function initProductLogo(pageSetKey){
	var productLogo = "/enterprise/images/app/product/logo.png";
	if(appConfig && appConfig[pageSetKey.productLogo]){
		//productLogo = appConfig[pageSetKey.productLogo];
		productLogo = "/enterprise/images/app/product/logov2.png";
	}
	$("#product-page .logo").css({
		'background-image': 'url("'+productLogo+'")',
		"background-size":"cover",
		"width":"15vmin",
		"height":"13vmin"
	});
}

function initLoginBackground(pageSetKey){
	var loginBackground = "/enterprise/images/app/product/bg-list.jpg";
	if(appConfig && appConfig[pageSetKey.loginBackground]){
		//loginBackground = appConfig[pageSetKey.loginBackground];
		loginBackground = "/enterprise/images/app/product/login.jpg";
	}
	$("#body-fixed-width").css({
		'background-image': 'url("'+loginBackground+'")',
		"background-size":"100vw 100vh"
	});
}


function keeplive(errorCount){
	if(errorCount > 3){
		return;
	}
	var param = {
		url : 'keepLive',
		callType : 'get',
		contentType : 'application/json',
		dataType : 'json',
		data :{}
	};
	
	$.callApi(param, function(response) {
		errorCount = 0;
	}, function(XMLHttpRequest, textStatus, errorThrown) {
		errorCount++;
	});
	setTimeout(function(){
		keeplive(errorCount);
	},1000*60);
}

function resetTitleByAppCode(){
	var $title = $("title");
	//$title.html("TalkingData DMP Plus");
	/*if(appConfig && appConfig.appCode){
		if(appConfig.appCode == 'dmp-admin'){
			$title.html("LavaPM 控制台");
		}else if(appConfig.appCode == 'wreport'){
			$title.html("LavaPM 客缘系统");
		}
	}*/
}

function onHashChange(event){
	var newUrl = '#' + appConfig.appCode;
	if(event){
		if(event.newURL){
			newUrl = '#' + appConfig.appCode + event.newURL.split("#")[1];
		}else{
			newUrl = '#' + appConfig.appCode + event.target.document.URL.split("#")[1];
		}
	}
	var oldHash = window.location.hash;
	window.history.replaceState(oldHash, '', newUrl);
}

function iFrameHeight(){
	var winHg = $(window).height();
	var ifm = document.getElementById("main-frame");
	try{
		var subWeb = document.frames ? document.frames["main-frame"].document
				: ifm.contentDocument;
		if (ifm != null && subWeb != null) {
			if (winHg > subWeb.body.clientHeight) {
				ifm.height = winHg;
			}else{
				ifm.height = subWeb.body.clientHeight;
			}
		}
		$.calculateConentsHeight();
	}catch(e){console.info(e)}
	
}

function iFrameScrollHeight() {
	var winHg = $(window).height();
	var ifm = document.getElementById("main-frame");
	try{
		var subWeb = document.frames ? document.frames["main-frame"].document
				: ifm.contentDocument;
		if (ifm != null && subWeb != null) {
			if(winHg > subWeb.body.scrollHeight){
				ifm.height = winHg;
			}else{
				ifm.height = subWeb.body.scrollHeight;
			}
		}
		$.calculateConentsHeight();
	}catch(e){console.info(e)}
}

function resetModelDialogStyle(){//重置iframe内弹框的样式
	var scrollTop = document.body.scrollTop;
	var $modal_dialog = $('#main-frame').contents().find('.modal-dialog');
	var top = $modal_dialog.height() / 2 + scrollTop;
	//$modal_dialog.css({"top":top +"px"});
}

window.onscroll = function(e){
	resetModelDialogStyle();
	setTimeout(function(){
		iFrameHeight();
	},200);
}

var scrollFunc = function (e) {  
	e = e || window.event;  
	if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
	    if (e.wheelDelta > 0) { //当滑轮向上滚动时  
	    	resetModelDialogStyle();
	    }  
	    if (e.wheelDelta < 0) { //当滑轮向下滚动时  
	    	resetModelDialogStyle();
	    }  
	} else if (e.detail) {  //Firefox滑轮事件  
	    if (e.detail> 0) { //当滑轮向上滚动时  
	    	resetModelDialogStyle();
	    }  
	    if (e.detail< 0) { //当滑轮向下滚动时  
	    	resetModelDialogStyle();
	    }  
	}  
}  
//给页面绑定滑轮滚动事件  
if (document.addEventListener) {//firefox  
	document.addEventListener('DOMMouseScroll', scrollFunc, false);  
}  
//滚动滑轮触发scrollFunc方法  //ie 谷歌  
window.onmousewheel = document.onmousewheel = scrollFunc;   

$(window).resize(function(){
	//resetMenuScroll();
	iFrameHeight();
	$.calculateConentsHeight();
});

/*function resetMenuScroll(){
	var $menu_left = $('#main-frame').contents().find('#menu-left');
	$.jqueryScroll($menu_left.parent(),$menu_left,"v",true);
}*/

;(function($){ 
	$.extend({
		calculateContentHeight:function(){
			var winHg = $(window).height();
			var $content = $('#main-frame').contents().find('.contents .con-box');
			$content.height(winHg);
		},
		calculateConentsHeight:function(){
			var $enterprise_contents = $("#enterprise-contents");
			var winHg = $(window).height();
			var conHg = winHg;
			$enterprise_contents.css({"min-height":conHg + "px"});
			var docHg = $("#main-frame").attr("height");
			//var navHg = docHg - 130;
			var navHg = winHg - 170;
			$("#nav-bar").css({"max-height":navHg + "px"});
			$("#nav-scroll").css({"height":navHg + "px"});
			$.calculateContentHeight();
			$.nav.scrollMenu();
		},
		changeLocationHash : function(target){
			var $target = $(target);
			var $pop_box = $target.parentsUntil(".pop-box").parent();
			var $pop_bg = $pop_box.siblings(".pop-bg");
			$pop_bg.remove();
			$pop_box.remove();
			var hash = $target.attr("hash");
			if(hash){
				var iframe = document.getElementById("main-frame");
				if(iframe){
					iframe.contentWindow.location.hash = hash;
				} 
			}
		},
		Pop:{
			alerts:function(text,hashSrc){
	            var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-blue">确认</a></div>';
	            this.createDiv(text,btn,'',hashSrc);
	        },
	        confirms:function(text,fn){
	            var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-blue">确认</a><a href="javascript:void(0)" id="cancel" class="btn btn-gray">取消</a></div>';
	            this.createDiv(text,btn,fn);
	        },
	        createDiv:function(text,btn,fn,hashSrc){
	        	var oBg=document.createElement('div');
			    var oDiv=document.createElement('div');
			    oBg.className='pop-bg';
			    oDiv.className="pop-box";
			    
	        	var text = text || '';
	            var windowObj = window.parent || window;
	            var htmlChild =windowObj.document.getElementsByTagName('body')[0];
	            var html = '';
	            if(fn){
	            	html += '<div class="head"><i class="icons-big icons-big-confirm"></i>信息</div>';
	            	html += '<div class="pop-text confirms-text"><div class="text">'+text+'</div>'+btn+'</div>';
	            }else{
	            	html += '<div class="head"><i class="icons-big icons-big-alert"></i>信息</div>';
	            	html += '<div class="pop-text alerts-text"><div class="text">'+text+'</div>'+btn+'</div>';;
	            }
	            
	            oDiv.innerHTML= html;
	            htmlChild.appendChild(oBg);
	            htmlChild.appendChild(oDiv);
	            var oDivW = oDiv.offsetWidth/2;
	            var oDivH = oDiv.offsetHeight/2;
	            var windowH = (htmlChild.offsetHeight || window.outerHeight)/3;
	            //var windowH = htmlChild.offsetHeight/3 === 0 ?400 : htmlChild.offsetHeight/3;
	            var windowW = htmlChild.offsetWidth/2;

	            oDiv.style.left = windowW - oDivW+'px';
	           // oDiv.style.top = windowH - oDivH+'px';  
	            //console.log(oDiv.childNodes[1].childNodes[0]);
	            oDiv.childNodes[1].childNodes[1].childNodes[0].onclick=function(){
	                htmlChild.removeChild(oBg);
	                htmlChild.removeChild(oDiv);
	                if(hashSrc){
	                	if(hashSrc == 'history_back'){//返回历史记录上一页
	                		window.history.back();
	                	}else{//返回指定的url地址
	                		location.hash = hashSrc;
	                	}
	                }
	                if(fn){fn();}
	            };
	            if(fn){
	                oDiv.childNodes[1].childNodes[1].childNodes[1].onclick=function(){
	                    htmlChild.removeChild(oBg);
	                    htmlChild.removeChild(oDiv);
	                };
	            }
	        }

		    
		},
		callApi : function(param, callback, errorback) {
			var defaultCallback = function(response){
				console.dir(['response', response]);
			}
			var defaultErrorback = function(XMLHttpRequest, textStatus, errorThrown) {
				$.Pop.alerts('后端异常，请联系管理员');
			};
			if (param.dataType.toUpperCase() == 'JSONP') {
				$.ajax({
					url : param.url,
					type : param.callType,
					dataType : param.dataType,
					data : param.data,
					contentType : param.contentType || "application/json",
					callback : 'callback',
					jsonp : "callback",
					success : callback || defaultCallback,
					error : errorback || defaultErrorback
				});
			} else {
				$.ajax({
					url : param.url,
					type : param.callType,
					dataType : param.dataType,
					data : param.data,
					contentType : param.contentType || "application/json",
					success : callback || defaultCallback,
					error : errorback || defaultErrorback
				});
				
			}
		},
		callUploadApi : function(param, callback, errorback){//ajax上传图片
			var defaultCallback = function(response){
				console.dir(['response', response]);
			}
			var defaultErrorback = function(XMLHttpRequest, textStatus, errorThrown) {
				$.Pop.alerts('后端异常，请联系管理员');
			};
			
		    var data = new FormData();
		    $.each(param.$obj[0].files, function(i, file) {
		        data.append('upload_file', file);
		    });

			$.ajax({
		        url:param.url,
		        type:'POST',
		        data:data,
		        cache: false,
		        contentType: false,    //不可缺
		        processData: false,    //不可缺
		        success : callback || defaultCallback,
				error : errorback || defaultErrorback
		    });
		},
		getTodayDatetime : function(){//获取当前时间无格式时分秒
			var todayStr = '';
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if(month < 10){
				month = '0' + month;
			}
			if(day < 10){
				day = '0' + day;
			}
			if(hour < 10){
				hour = '0' + hour;
			}
			if(minute < 10){
				minute = '0' + minute;
			}
			if(second < 10){
				second = '0' + second;
			}
			todayStr = year.toString() + month.toString() + day.toString() + hour.toString() + minute.toString() + second.toString();
			return todayStr;
		},
		uploadLogo:function(btn){
			var $btn = $(btn);
			var $obj = $("#select-logo");
			var val  = $obj.val();
			if(!val){
				$.Pop.alerts("请选择png格式的图片后再上传。");
				return false;
			}
			var param = {
				url : 'uploadLogo',
				$obj : $obj
			};
			$btn.attr("disabled",true).html("上传中");
			$.callUploadApi(param, function(response) {
				response = JSON.parse(response);
				$btn.attr("disabled",false).html("确认上传");
				if(response.success){
					this.hideDialog('change-logo-dialog');
					$obj.val("");
					$obj.siblings("input[type='text']").val("");
					$.Pop.alerts(response.msg);
					var time = $.getTodayDatetime();
					$("#logo").find("img").attr({"src":"images/common/logo.png?v="+time});
				}else{
					$.Pop.alerts(response.msg);
				}
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				$btn.attr("disabled",false).html("重新上传");
				$.Pop.alerts("网络异常，图片上传失败。");
			});
		},
		logoutApp:function(appCode, isLastApp) {
			var that = this;
			var param = {
				url : appConfig.authAppMap[appCode].extAttr2 + '/logout',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : {}
			};
			$.callApi(param, function(response) {
				//console.dir([ "Info", response ]);
				if(isLastApp){
					that.logoutOneUI();
				}
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				//console.dir([ "Error", errorThrown ]);
				if(isLastApp){
					that.logoutOneUI();
				}
			});
		},
		logoutOneUI:function(){
			var param = {
				url : 'logout',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : {}
			};
			
			$.callApi(param, function(response) {
				document.cookie="TDA3_CASTGC=00;domain=."+document.domain+";expires="+(new Date().toGMTString())+";path=/sso/"; 
				document.cookie="JSESSIONID=00;expires="+(new Date().toGMTString())+";path=/enterprise";
				appConfig.authAppMap = {};
				var authAppList = appConfig.authAppList;
				var authAppListLength = 0;
				if(authAppList && authAppList.length > 0){
					authAppListLength = authAppList.length;
					for (var i = 0; i < authAppListLength; i++) {
						var p=authAppList[i].appCode
						console.dir("-------"+p);
						if(p != "DMP"){
							// 异步清除dsp缓存
							if(p == "DSP"){
								$.ajax({
								    url: './dsp/#/logout',
								    type: 'get',
							        data:'',
								    async:true,
									success: function(data) {
										console.dir("dsp退出成功");
									}
								});
							}
							document.cookie="JSESSIONID=00;expires="+(new Date().toGMTString())+";path=/"+p;
						}else{
							document.cookie="JSESSIONID=00;expires="+(new Date().toGMTString())+";path=/dmp-web";
						}
						
					}
				}
				//刷新页面
				window.location.href = response.loginUrl;
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				console.dir([ "Error", errorThrown ]);
			});
		},
		logout:function(btn) {
			this.logoutOneUI();
			/*var that = this;
			var len = 0;
			for ( var p in appConfig.authAppMap) {
				len++;
			}
			if(len == 0){
				that.logoutOneUI();
			}else{
				var i = 0;
				for ( var p in appConfig.authAppMap) {
					i++;
					if(i == len){
						that.logoutApp(p,true);
					}else{
						that.logoutApp(p,false);
					}
				}
			}*/
		},
		checkPassword:function(target){
			var $target = $(target);
			var val = $target.val();
			if(val){
				if(val.length < 6 || val.length > 32){
					$target.addClass("input-error").siblings(".form-error-msg").show().html("密码长度为6-32个字符");
				}else{
					if(val.indexOf(" ") == -1){
						$target.removeClass("input-error").siblings(".form-error-msg").hide();
						
						if($target.attr("id") == 'newPassword'){
							var $oldPassword = $("#oldPassword");
							var oldPassword = $oldPassword.val();
							if(val == oldPassword){
								$target.addClass("input-error").siblings(".form-error-msg").show().html("新密码不能与原始密码相同");
							}else{
								$target.removeClass("input-error").siblings(".form-error-msg").hide();
							}
						}else if($target.attr("id") == 'repassword'){
							var $newPassword = $("#newPassword");
							var newPassword = $newPassword.val();
							if(val != newPassword){
								$target.addClass("input-error").siblings(".form-error-msg").show().html("两次密码不一致");
							}else{
								$target.removeClass("input-error").siblings(".form-error-msg").hide();
							}
						}
					}else{
						$target.addClass("input-error").siblings(".form-error-msg").show().html("密码中不能包含空格字符");
					}
				}
			}else{
				$target.addClass("input-error").siblings(".form-error-msg").show().html("密码长度为6-32个字符");
			}
		},
		updatePassword:function(btn) {
			var $btn = $(btn);
			var $oldPassword = $("#oldPassword"), $newPassword = $("#newPassword"), $repassword = $("#repassword"), 
			oldPassword = $oldPassword.val(), newPassword = $newPassword.val(), repassword = $repassword.val();

			if (!oldPassword || oldPassword.length < 6 || oldPassword.length > 32) {
				$oldPassword.addClass("input-error").siblings(".form-error-msg").show().html("密码长度为6-32个字符");
				return false;
			}else if(oldPassword.indexOf(" ") != -1){
				$oldPassword.addClass("input-error").siblings(".form-error-msg").show().html("密码中不能包含空格字符");
				return false;
			}else{
				$oldPassword.removeClass("input-error").siblings(".form-error-msg").hide();
			}
			
			if (!newPassword || newPassword.length < 6 || newPassword.length > 32) {
				$newPassword.addClass("input-error").siblings(".form-error-msg").show().html("密码长度为6-32个字符");
				return false;
			}else if(newPassword.indexOf(" ") != -1){
				$newPassword.addClass("input-error").siblings(".form-error-msg").show().html("密码中不能包含空格字符");
				return false;
			}else if(oldPassword == newPassword){
				$newPassword.addClass("input-error").siblings(".form-error-msg").show().html("新密码不能与原始密码相同");
				return false;
			}else{
				$newPassword.removeClass("input-error").siblings(".form-error-msg").hide();
			}
			
			if (!repassword || repassword.length < 6 || repassword.length > 32) {
				$repassword.addClass("input-error").siblings(".form-error-msg").show().html("密码长度为6-32个字符");
				return false;
			}else if(repassword.indexOf(" ") != -1){
				$repassword.addClass("input-error").siblings(".form-error-msg").show().html("密码中不能包含空格字符");
				return false;
			}else if (repassword !== newPassword) {
				$repassword.addClass("input-error").siblings(".form-error-msg").show().html("两次密码不一致");
				return false;
			}else{
				$repassword.removeClass("input-error").siblings(".form-error-msg").hide();
			}

			var param = {
				url : 'changeUserPassword',
				callType : 'post',
				contentType : 'application/json',
				dataType : 'json',
				data : JSON.stringify({
					'oldPassword' : oldPassword,
					'newPassword' : newPassword
				})
			};
			
			$btn.attr("disabled",true).html("请求中");
			$.callApi(param, function(response) {
				$btn.attr("disabled",false).html("保存");
				if (response.errMsg) {
					if(response.errMsg == '原始密码不正确'){
						$oldPassword.siblings(".form-error-msg").show().html(response.errMsg);
					}else{
						$repassword.siblings(".form-error-msg").show().html(response.errMsg);
					}
					//$.Pop.alerts(response.errMsg);
				} else if (response.msg) {
					//$.Pop.alerts(response.msg);
					$.Pop.alerts("您的账户密码已修改成功");
					//$.logout();
					$.hideDialog('change-user-password-dialog');
					$oldPassword.val("");
					$newPassword.val("");
					$repassword.val("");
				}
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				$btn.attr("disabled",false).html("保存");
				//$.Pop.alerts("网络异常。");
				$repassword.siblings(".form-error-msg").show().html("网络异常");
			});
		},
		showDialog:function(dialogId) {
			/*var changePwdFlag = appConfig.changePwdFlag;
			if(changePwdFlag && changePwdFlag == 'no'){
				$.Pop.alerts("演示环境不允许修改登录密码， 如有需要请联系管理员！");
				return false;
			}*/
			var $dialog = $("#" + dialogId);
			$dialog.show().siblings(".modal").hide();
		},
		hideDialog:function(dialogId) {
			if(dialogId == "change-user-password-dialog"){
				$("#oldPassword").val("").removeClass("input-error").siblings(".form-error-msg").hide();
				$("#newPassword").val("").removeClass("input-error").siblings(".form-error-msg").hide();
				$("#repassword").val("").removeClass("input-error").siblings(".form-error-msg").hide();
			}
			var $dialog = $("#" + dialogId);
			$dialog.hide();
		},
		loadPage:function(url) {
			var $body_fixed_width = $("#body-fixed-width");
			var $product_page = $("#product-page");
			var $index_page = $("#index-page");
			$body_fixed_width.removeClass("bg-list").attr("style","");
			$product_page.addClass("hide");
			$index_page.removeClass("hide");
			
			$("#main-frame").attr("src", "");
			url = url || "";
			if (appConfig.appCode) {
				if(!url){
					var locationHash = window.location.hash;
					if(locationHash && locationHash.indexOf(appConfig.appCode) != -1){
						var appHash = locationHash.replace("#" + appConfig.appCode, "");
						if(appConfig.authAppMap[appConfig.appCode] && appConfig.authAppMap[appConfig.appCode].extAttr2){
							if(appHash){
								if(appHash.indexOf("#") != -1){
									url = appConfig.authAppMap[appConfig.appCode].extAttr2 + '/'+appHash;
								}else{
									url = appConfig.authAppMap[appConfig.appCode].extAttr2 + "/#"+ appHash;
								}
							}else{
								url = appConfig.authAppMap[appConfig.appCode].extAttr2;
							}
						}else{
							url = '/'+appConfig.appCode;
						}
					}else{
						if(appConfig.authAppMap[appConfig.appCode] && appConfig.authAppMap[appConfig.appCode].extAttr2){
							url = appConfig.authAppMap[appConfig.appCode].extAttr2;
						}else{
							url = '/'+appConfig.appCode;
						}
					}
				}
				//dsp
				if(url.indexOf("dsp") != -1){
					url = url+appConfig.user.umid;
				}
				$("#main-frame").attr("src", url);
				
				$.layerLoading.show();
				$("#main-frame").load(function() { 
					$.layerLoading.hide();
					iFrameHeight();
					$.calculateConentsHeight();
				});
				
				if(appConfig.appCode == 'tenant'){
					$("#index-page .logout").addClass("active");
				}else{
					$("#index-page .logout").removeClass("active");
				}
			}else{
				$body_fixed_width.addClass("bg-list");
				initPageSetKey();
				$product_page.removeClass("hide");
				$index_page.addClass("hide");
			}
		},
		selectImage:function(obj){
			var $obj = $(obj);
			var thisVal = $obj.val();
			$obj.siblings("input").val(thisVal);
		},
		product:{
			getContractEndDate:function(){
				var contractEndDate = '';
				if(appConfig && appConfig.tenant && appConfig.tenant.contractEndDate){
					contractEndDate = appConfig.tenant.contractEndDate;
				}
				return contractEndDate;
			},
			formatDate:function(d,sign){
		    	var date = ""; 
		    	sign = sign || '-';
		    	if(d){
			    	var myDate = new Date(d);
			    	var fullYear = myDate.getFullYear();
			    	var month = myDate.getMonth()+1; 
			    	var day = myDate.getDate(); 
			    	var hours = myDate.getHours();       //获取当前小时数(0-23)
			    	var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
			    	var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
			    	//myDate.getMilliseconds();    //获取当前毫秒数(0-999)
			    	if(sign == undefined){
			    		sign = '';
			    	}
			    	if(month < 10){
			    		month = '0' + month;
			    	}
			    	if(day < 10){
			    		day = '0' + day;
			    	}
			    	if(hours < 10){
			    		hours = '0' + hours;
			    	}
			    	if(minutes < 10){
			    		minutes = '0' + minutes;
			    	}
			    	if(seconds < 10){
			    		seconds = '0' + seconds;
			    	}
			    	date = fullYear + sign + month + sign + day;
			    	//date = date + ' ' + hours + ':' + minutes + ':' + seconds;
		    	}
		    	return date;
		    },
			init:function(){
				var hasTenantFlag=false;
				appConfig.authAppMap = {};
				var authAppList = appConfig.authAppList;
				var html = "";
				var authAppListLength = 0;
				var appCode = "";
				var imgMap = {
					"DataMarket":"market",
					"DMP":"DMP",
					"BWS":"BWS",
					"DSP":"DSP",
					"REPORT":"REPORT",
					"SocialListening":"SocialListening"
				}
				if(authAppList && authAppList.length > 0){
					authAppListLength = authAppList.length;
					var contractEndDate = $.product.getContractEndDate();
					contractEndDate = $.product.formatDate(contractEndDate,'.');
					for (var i = 0; i < authAppListLength; i++) {
						if("tenant"!=authAppList[i].appCode){
							appConfig.authAppMap[authAppList[i].appCode] = authAppList[i];
							html += '<dl class="dl-product-v2" appCode="'+authAppList[i].appCode+'">';
							html += '<dt class="dt-product-v2 icon-product-'+authAppList[i].appCode+'"><i class="'+imgMap[authAppList[i].appCode]+'"/></dt>';
							html += '<dd class="dd-product-v2">'+authAppList[i].extAttr1+'</dd>';	
							html += '<div class="product-explain-v2 product-explain">';    
							html += '<p>'+authAppList[i].appDesc+'</p>';   
							html += '<div class="service-period">';
							/*if(contractEndDate){
								html += '<span class="service-label">服务期至：</span>';        
								html += '<span class="icon-period"></span>';        	
								html += '<span>'+contractEndDate+'</span>';
							}*/
							html += '<a href="#'+authAppList[i].appCode+'" class="fr" appCode="'+authAppList[i].appCode+'">Enter<i></i></a>';        
							html += '</div>';    
							html += '</div>';
							html += '<a href="#'+authAppList[i].appCode+'" class="product-link" appCode="'+authAppList[i].appCode+'"></a>';   
							html += '</dl>';
							appCode = authAppList[i].appCode;
						}else{
							hasTenantFlag = true;
						}
					}
					if(hasTenantFlag){
						$("#productListTenant").show();
					}
					
					$("#product-list-content").html(html);
					$.product.bindEvents();
					var appNum = hasTenantFlag ? authAppListLength - 1 : authAppListLength;
					
					$("#main-frame").attr("appNum", appNum).attr("hasTenantFlag", hasTenantFlag);
					if(appNum == 1){
						$.product.goIndexPage(appCode);
						var $enterprise_contents = $("#enterprise-contents");
						var $con_left = $enterprise_contents.find(".con-left");
						var $con_right = $enterprise_contents.find(".con-right");
						$con_left.addClass("hide");
						$con_right.css({"padding-left":"0"});
					}
				}
			},
			bindEvents:function() {
				var $product_list_content = $("#product-list-content");
				$product_list_content.find(".product-link").bind('click', function() {
					var $product_link = $(this);
					var appCode = $product_link.attr("appCode");
					$.product.goIndexPage(appCode);
				});
			},
			//计算并设置首页滚动条位置
			calculIndexPageScroll:function(){
				var $nav_bar = $("#nav-bar");
				var $content_mid = $nav_bar.find(".content_mid");
				var $activeLi = $content_mid.find(".li.active");
				var handle_c = $nav_bar.parent().find(".scroll_btn");
				var hg = $content_mid.height();
				var allLength = $content_mid.children().length;
				var activePos = $activeLi.prevAll().length;
				
				var scrollBtnHeight = handle_c.height();
				var scollcount = scrollBtnHeight / (hg / allLength);
				
				var showCount = Math.ceil($nav_bar.height()/(hg / allLength));
				if(allLength-showCount >= activePos){
					var handleTop = $nav_bar.height() / allLength * activePos;
					var top = hg / allLength * activePos;
				}else{
					var lackCount = Math.abs(allLength - showCount - activePos);
					var handleTop = $nav_bar.height() / allLength * (allLength-showCount);
					var top = hg / allLength * (activePos-lackCount);
				}
				
				handle_c.css("top", handleTop);
				$content_mid.css("margin-top", -top);
			},
			goIndexPage:function(appCode,url){
				var $body_fixed_width = $("#body-fixed-width");
				var $product_page = $("#product-page");
				var $index_page = $("#index-page");
				
				$body_fixed_width.removeClass("bg-list").attr("style","");
				$product_page.addClass("hide");
				$index_page.removeClass("hide");
				appConfig.appCode = appCode;
				resetTitleByAppCode();
				$.nav.changeStatus();
				$.loadPage(url);
				$.product.calculIndexPageScroll();
			},
			goToProductList:function(){
				var $body_fixed_width = $("#body-fixed-width");
				var $product_page = $("#product-page");
				var $index_page = $("#index-page");
				
				$body_fixed_width.addClass("bg-list");
				initPageSetKey();
				$product_page.removeClass("hide");
				$index_page.addClass("hide");
				resetTitleByAppCode();
				$("#main-frame").attr("src","");
				window.location.hash = "";
			},
			goToRuleSystem:function(){
				$("#index-page .logout").addClass("active");
				$.product.goIndexPage('tenant','/tenant');
				$("#dropdown-ul").addClass("hide");
			}
		},
		nav:{
			changeStatus:function(){
				$("#index-page .logout").removeClass("active");
				$("#nav-bar .li").removeClass("active");
				$("#nav-bar .li").each(function(){
					var $li = $(this);
					var appCode = $li.attr("appCode");
					if(appCode == appConfig.appCode){
						$li.addClass("active").siblings().removeClass("active");
						return false;
					}
				});
			},
			showNav:function() {
				var hashTenant = false;
				appConfig.authAppMap = {};
				var authAppList = appConfig.authAppList;
				console.log(111111, appConfig, authAppList);
				var html = '<div class="content_mid">';
				for (var i = 0; i < authAppList.length; i++) {
					if("tenant" != authAppList[i].appCode){
						appConfig.authAppMap[authAppList[i].appCode] = authAppList[i];
						if (appConfig.appCode == authAppList[i].appCode) {
							html += '<div appUrl="'+authAppList[i].extAttr2+'" appCode="'+authAppList[i].appCode+'" class="active li">';
						} else {
							html += '<div appUrl="'+authAppList[i].extAttr2+'" appCode="'+authAppList[i].appCode+'" class="li">';
						}
						html += '<a href="#' + authAppList[i].appCode +'">';
						html += '<div class="nav-img">';
						html += '<i class="icons-nav icon-nav-'+authAppList[i].appCode+'"></i>';
						html += '<i class="i-a"></i>';
						html += '</div>';
						html += '<div class="nav-name">' + authAppList[i].extAttr1 + '</div>';
						html += '</a>';
						html += '</div>';
					}else{
						hashTenant = true;
					}
				}
				html += '</div>';
				$("#nav-bar").html(html);
				$.nav.bindEvents();
				$.nav.showButtonList();
				if(hashTenant){
					$(".rule").show();
				}
				
			},
			scrollMenu:function(){
				var $nav_bar = $('#nav-bar');
				$.jqueryScroll($nav_bar.parent(),$nav_bar,"v",true,false);
			  
				/*$nav_bar.parent().bind('mouseover',function(){
					var $bottom_scroll = $nav_bar.siblings(".bottom_scroll");
					$bottom_scroll.removeClass("hide");
				}).bind('mouseout',function(){
					var $bottom_scroll = $nav_bar.siblings(".bottom_scroll");
					$bottom_scroll.addClass("hide");
				});*/
			},
			bindEvents:function() {
				var $nav_bar = $("#nav-bar");
				$nav_bar.find(".li").bind('click', function() {
					var $li = $(this);
					/*if($li.hasClass("active")){
						return false;
					}*/
					$li.addClass("active").siblings().removeClass("active");
					var appCode = $li.attr("appCode");
					appConfig.appCode = appCode;
					var appUrl = $li.attr("appUrl");
					$.loadPage(appUrl);
				}).bind('mouseenter', function() {
					var $li = $(this);
					var $nav_name = $li.find(".nav-name");
					var scrollTop = $("body").scrollTop();
					var top = $li.find("a").offset().top - scrollTop;
					var nav_name = $nav_name.html();
					var $app_tip = $("#enterprise-contents .app-tip");
					$app_tip.html(nav_name).show().css({"top":top+'px'});
				}).bind('mouseleave', function() {
					var $app_tip = $("#enterprise-contents .app-tip");
					$app_tip.hide();
				});
			},
			showButtonList:function(){//控制菜单按钮权限
				//var $logout = $("#logout");
				var buttonList = appConfig.buttonList ? appConfig.buttonList : [];
				var html = "";
				if(buttonList && buttonList.length > 0){
					for (var i = 0; i < buttonList.length; i++) {
						if(buttonList[i].resourceId == '100') {//修改密码
							html += '<a href="javascript:;" onclick="$.showDialog(\'change-user-password-dialog\');">修改密码</a>';
							html += '<span class="line"></span>';
						}else if(buttonList[i].resourceId == '101'){//更换LOGO
							html += '<a href="javascript:;" onclick="$.showDialog(\'change-logo-dialog\');">更换LOGO</a>';
							html += '<span class="line"></span>';
						}
					}
				}
				//$logout.before(html);
			},
			mouseenterDropdown:function(target){
				var $target = $(target);
				var $dropdown_ul = $target.find(".dropdown-ul");
				$dropdown_ul.removeClass("hide");
			},
			mouseleaveDropdown:function(target){
				var $target = $(target);
				var $dropdown_ul = $target.find(".dropdown-ul");
				$dropdown_ul.addClass("hide");
			},
			showHideDropdown:function(target){
				var that = this;
				var $target = $(target);
				var $arrow = $target.find(".arrow");
				var $dropdown_ul = $target.siblings(".dropdown-ul");
				if($dropdown_ul.hasClass("hide")){
					$dropdown_ul.removeClass("hide");
					$arrow.addClass("arrow-top");
				}
				that.onBodyDown();
			},
			onBodyDown : function() {
				$("#layer-fixed").removeClass('hide');
				$("#layer-fixed").bind('click',function(){
					$("#layer-fixed").addClass('hide');
					$("#dropdown-ul").addClass("hide");
					$("#dropdown-ul2").addClass("hide");
					$("#dropdown .arrow").removeClass("arrow-top");
					$("#layer-fixed").unbind('click');
				});
			}
			
		},
		layerLoading:{
			show:function(){
				this._createLoadingHtml();
			},
			hide:function(){
				if(window.parent){
					$('#layer-loading', parent.document).remove(); 
				}else{
					$("#layer-loading").remove();
				}
			},
			_createLoadingHtml:function(){
				var html = '<div class="layer-loading" id="layer-loading">';
				html += '<div class="loading-bg"></div>';
				html += '<div class="loading-con"></div>';
				html += '</div>';
				
				var windowObj = window.parent || window;
	            var htmlChild =windowObj.document.getElementsByTagName('body')[0];
	            if($(htmlChild).find("#layer-loading").length == 0){
	            	$(htmlChild).append(html);
	            }
			}
		}
		
	}); 
})(jQuery);

/*window.onhashchange = function(arguments){  
	var windowHash = window.location.hash;
	console.dir([appConfig.appCode,windowHash]);
	$.changeIframeHash("main-frame");
}  */
