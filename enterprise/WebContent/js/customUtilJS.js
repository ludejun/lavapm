;(function($){ 
	$.extend({ 
		logoutApp:function(appCode, callback) {
			var windowObj = window.parent || window;
			var param = {
				url : windowObj.appConfig.authAppMap[appCode].extAttr2 + '/logout',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : {}
			};
			$.callApi(param, function(response) {
				console.dir([ "Info", response ]);
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				console.dir([ "Error", errorThrown ]);
			});
		},
		logout:function(btn) {
			var windowObj = window.parent || window;
			var pathname = windowObj.location.pathname;
			
			for ( var p in windowObj.appConfig.authAppMap) {
				this.logoutApp(p);
			}
			
			//处理sso加入的url后缀
			pathname = pathname.split(";")[0];
			
			var host = 'http://' + windowObj.location.host + pathname;

			var param = {
				url : host+'logout',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : {}
			};
			
			$.callApi(param, function(response) {
				//刷新页面
				windowObj.location.href = response.loginUrl;
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				console.dir([ "Error", errorThrown ]);
			});
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
		copyObjAttributeToNewObj:function(copyObj,obj){//复制一个对象的属性值，更新另一个对象的属性值
			for(var c in copyObj){ 
				var name = c; 
				var value = copyObj[c]; 
				obj[name] = value; 
			}
			return obj;
		},
		createDownloadIframe:function(params){
			var $downloadIframe = $("#downloadIframe");
			if ($downloadIframe.length == 0) {
				$downloadIframe = $('<iframe id="downloadIframe" style="display:none"></iframe>').appendTo("body");
			} 
			$downloadIframe.attr("src",params.url);
		},
		calculateTimes : function(startTime,finishTime){//计算时间间隔
			var timesStr = "";
			//alert(finishTime);
			if(finishTime == ""){
				finishTime =  new Date().getTime();
				return timesStr;
			}
			
			var times = finishTime - startTime;
			//计算出相差天数
			var days=Math.floor(times/(24*3600*1000));
			
			//计算出小时数
			var leave1=times%(24*3600*1000);    //计算天数后剩余的毫秒数
			var hours=Math.floor(leave1/(3600*1000));
			
			//计算相差分钟数
			var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
			var minutes=Math.floor(leave2/(60*1000));
			
			//计算相差秒数
			var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
			var seconds=Math.round(leave3/1000);
			
			if(days != 0){
				timesStr = days+"天"+hours+"时"+minutes+"分"+seconds+"秒";
			}else if(hours != 0){
				timesStr = hours+"时"+minutes+"分"+seconds+"秒";
			}else if(minutes != 0){
				timesStr = minutes+"分"+seconds+"秒";
			}else{
				timesStr = seconds+"秒";
			}
			//timesStr = times / 1000 + 's';
			return timesStr;
		},
		urlPara :function (v,myUrl){
			var url = myUrl || decodeURI(window.location.href);
			if (url.indexOf(v) != -1){
				var start = url.indexOf(v)+v.length;
				var end = url.indexOf('&',start) == -1 ? url.length : url.indexOf('&',start);
				return url.substring(start,end);
			} else { return '';}
		},
		checkNumberIsInteger:function(val){//验证数字是否正整数
			var isInt = false;
			var reg = /^\d+$/;
			if(reg.test(val)){
				isInt = true;
			}
			return isInt;
		},
		isNullObj:function(obj){
		    for(var i in obj){
		        if(obj.hasOwnProperty(i)){
		            return false;
		        }
		    }
		    return true;
		},
		fomatNumDecimal:function(x,pos){     
			pos = pos || 1;
			var f = parseFloat(x);  
            if (isNaN(f)) {  
                return "";  
            }
            var f = Math.round(x*Math.pow(10, pos))/Math.pow(10, pos); 
            //var f = Math.round(x*10)/10;  
            var s = f.toString();  
            var rs = s.indexOf('.');  
            if (rs < 0) {  
                rs = s.length;  
                s += '.';  
            }  
            while (s.length <= rs + pos) {  
                s += '0';  
            }  
            return s;  
		},
		formatNumThousand:function(num){
			if($.trim(num)==""){
				return "";
			}
			if(isNaN(num)){
				return "";
			}
			num = num+"";
			if(/^.*\..*$/.test(num)){
				var pointIndex =num.lastIndexOf(".");
				var intPart = num.substring(0,pointIndex);
				var pointPart =num.substring(pointIndex+1,num.length);
				intPart = intPart +"";
				var re =/(-?\d+)(\d{3})/;
				while(re.test(intPart)){
					intPart =intPart.replace(re,"$1,$2");
				}
				num = intPart+"."+pointPart;
			}else{
				num = num +"";
				var re =/(-?\d+)(\d{3})/;
				while(re.test(num)){
		          num =num.replace(re,"$1,$2");
		       }
		   }
		   return num;
		},
		
		help_float :function() {
			var $tip_box = $(".tip-box");
			$tip_box.bind('mouseover',function(){
				var $this = $(this);
				var $tip_con = $this.find(".tip-con");
				var $des = $tip_con.find(".des");
				$tip_con.show();
				var desWidth = $des.width();
				var tipConWidth = desWidth + 20;
				var boxHg = $tip_con.height();
				var top = boxHg + 33;
				var boxWidth = ($tip_con.width() + 10) / 2;
				$tip_con.css({"top":"-" +top +"px","margin-left":"-"+boxWidth+"px","width":tipConWidth});
				
			}).bind('mouseout',function(){
				var $this = $(this);
				var $tip_con = $this.find(".tip-con");
				var boxHg = $tip_con.height();
				var top = boxHg + 33;
				$tip_con.hide().css({"top":"-" +top +"px"});
			});
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

window.onresize=function(event){  
	if(window.parent && window.parent.iFrameScrollHeight){
		window.setTimeout(window.parent.iFrameScrollHeight,200);
	}
}

function callApi(param,url,callType,dataType,callback){
	if(dataType.toUpperCase() == 'JSONP'){
		$.ajax({
			url:url,
			type:callType,
			async:true,
			cache:true,
			dataType:dataType,
			callback:'callback',
			jsonp:"callback",
			//jsonpCallback:'abc',
			data:param,
			timeout:60000,
			success:function(response){callback(response);},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				var obj = JSON.parse(XMLHttpRequest.responseText);
				if(obj && obj.msg){
					$.Pop.alerts(obj.msg);
				}else{
					$.Pop.alerts('网络不给力，请稍后再试');
				}
			}
		});	
	}else{
		$.ajax({
			url:url,
			type:callType,
			async:true,
			cache:true,
			dataType:dataType,
			data:param,
			timeout:60000,
			success:function(response){callback(response);},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				var obj = JSON.parse(XMLHttpRequest.responseText);
				if(obj && obj.msg){
					$.Pop.alerts(obj.msg);
				}else{
					$.Pop.alerts('网络不给力，请稍后再试');
				}
			}
		});	
	}
	
}

function calculateContentHeight(){
	var winHg = $(window).height();
	var $content = $("#content");
	$content.parent(".con-box").height(winHg);
}


function iFrameExternPageHeight(){
	var winHg = $(window).height();
	var ifm = document.getElementById("extern-pages");
	var subWeb = document.frames ? document.frames["extern-pages"].document
			: ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		if (winHg > subWeb.body.clientHeight) {
			ifm.height = winHg;
		}else{
			ifm.height = subWeb.body.clientHeight;
		}
	}
}

function iFrameExternPageScrollHeight() {
	var winHg = $(window).height();
	var ifm = document.getElementById("extern-pages");
	var subWeb = document.frames ? document.frames["extern-pages"].document
			: ifm.contentDocument;
	if (ifm != null && subWeb != null) {
		if(winHg > subWeb.body.scrollHeight){
			ifm.height = winHg;
		}else{
			ifm.height = subWeb.body.scrollHeight;
		}
	}
}