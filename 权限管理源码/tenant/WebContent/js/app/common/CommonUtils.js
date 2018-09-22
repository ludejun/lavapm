var CommonUtils = {
	equalsObj : function( x, y ) {
        if ( x === y ) {
            return true;
        }
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
            return false;
        }
        if ( x.constructor !== y.constructor ) {
            return false;
        }
        for ( var p in x ) {
            if ( x.hasOwnProperty( p ) ) {
                if ( ! y.hasOwnProperty( p ) ) {
                    return false;
                }
                if ( x[ p ] === y[ p ] ) {
                    continue;
                }
                if ( typeof( x[ p ] ) !== "object" ) {
                    return false;
                }
                if ( ! CommonUtils.equalsObj( x[ p ],  y[ p ] ) ) {
                    return false;
                }
            }
        }
        for ( p in y ) {
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
                return false;
            }
        }
        return true;
	}
}

//提示框
var Pop=function(){
    var oBg=document.createElement('div');
    var oDiv=document.createElement('div');
    
    oBg.className='pop-bg';
    oDiv.className="pop-box";
    
    var createDiv = function(text,btn,fn){
        var text = text || '';
            var windowObj =window.parent || window; 
            var htmlChild =windowObj.document.getElementsByTagName('html')[0];
            var html = '<div class="head">消息</div>';
            if(fn){
            	html += '<div class="pop-text confirms-text"><div class="text">'+text+'</div>'+btn+'</div>';
            }else{
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
           
            //oDiv.style.top = windowH - oDivH+'px';  
            //console.log(oDiv.childNodes[1].childNodes[0]);
            oDiv.childNodes[1].childNodes[1].childNodes[0].onclick=function(){
                htmlChild.removeChild(oBg);
                htmlChild.removeChild(oDiv);
                if(fn){fn();}
            };
      
            if(fn){
                oDiv.childNodes[1].childNodes[1].childNodes[1].onclick=function(){
                    htmlChild.removeChild(oBg);
                    htmlChild.removeChild(oDiv);
                };
            }
    };

    var createExportDiv = function(text,btn,category,$elem){
    	var scrollTop = window.parent.document.body.scrollTop;
        var text = text || '';
            var windowObj = window; 
            var htmlChild =windowObj.document.getElementsByTagName('html')[0];
            var html = '<div class="head">消息</div>';
            var isExport =  text.indexOf("导出任务创建成功") > -1 ? true :false;
            var categoryurl;
            if("0"==category){
            	categoryurl="nativepage";
            }else if ("3"==category){
            	categoryurl="crosspage";
            }else{
            	categoryurl="webpage";
            }
            if(isExport){
            	var atext='<a id="dialog" href="#/'+categoryurl+'/excelExport" onclick=function(){window.parent.onHashChange;htmlChild.removeChild(this);}>分析工具-数据下载</a>';
            	text=text.substring(0,13)+atext+"页面"+text.substring(19,text.length-1)+"。";
            }
        	html += '<div class="pop-text alerts-text"><div class="text">'+text+'</div>'+btn+'</div>';
        	if($elem){
        		$elem.after(html);
        	}else{
        		oDiv.innerHTML= html;
        	}
            
            htmlChild.appendChild(oBg);
            htmlChild.appendChild(oDiv);
            var oDivW = oDiv.offsetWidth/2;
            var oDivH = oDiv.offsetHeight/2;
            var windowH = (htmlChild.offsetHeight || window.outerHeight)/3;
            //var windowH = htmlChild.offsetHeight/3 === 0 ?400 : htmlChild.offsetHeight/3;
            var windowW = htmlChild.offsetWidth/2;

            oDiv.style.left = windowW - oDivW+'px';
            if(scrollTop<=oDivH){
            	scrollTop=oDivH;
            }
            if(scrollTop>800){
            	oDiv.style.top = (scrollTop-550)>550?(scrollTop-550):550+'px'; 
            }else if(scrollTop>(oDivH/2+400)){
            	oDiv.style.top = (scrollTop-(oDivH/2))+200+'px'; 
            }else if(oDivH<100){
            	oDiv.style.top = 200+'px'; 
            }else{
            	oDiv.style.top =550+'px';
            }
       	 	
           /* if(scrollTop>(oDivH+20)&&scrollTop<(oDivH*5)){
            	 oDiv.style.top = (scrollTop-oDivH)+'px'; 
            }else if(scrollTop>(oDivH*5)&&scrollTop<(oDivH*6)){
            	oDiv.style.top = (scrollTop-(oDivH+150))+'px';
            }else if(scrollTop>(oDivH*6)){
            	 oDiv.style.top = (scrollTop-(oDivH+300))+'px'; 
            }else{
            	  oDiv.style.top = (scrollTop+70)+'px'; 
            }*/
          
           // oDiv.style.top = windowH - oDivH+'px';  
            //console.log(oDiv.childNodes[1].childNodes[0]);
            oDiv.childNodes[1].childNodes[1].childNodes[0].onclick=function(){
                htmlChild.removeChild(oBg);
                htmlChild.removeChild(oDiv);
            };
            if(isExport){
            	oDiv.childNodes[1].childNodes[0].childNodes[1].onclick=function(){
            		htmlChild.removeChild(oBg);
            		htmlChild.removeChild(oDiv);
            	};
            }
    };

    var obj = {
       alerts:function(text,category,$elem){
           var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-info btn-sm">确认</a></div>';
           if(category){
        	   createExportDiv(text,btn,category,$elem);
           }else{
        	   createDiv(text,btn);
           }
        },
        confirms:function(text,fn){
            var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-info btn-sm">确认</a><a href="javascript:void(0)" id="cancel" class="btn btn-default btn-sm ml-10">取消</a></div>';
            createDiv(text,btn,fn);
        }
    };
    return obj;
}();


//提示框
var Pop1=function(){
    var oBg=document.createElement('div');
    var oDiv=document.createElement('div');
    
    oBg.className='pop-bg';
    oDiv.className="pop-box";
    
    var createDiv = function(text,btn,fn){
        var text = text || '';
            var windowObj =window.parent || window; 
            var htmlChild =windowObj.document.getElementsByTagName('html')[0];
            var html = '<div class="head">上传失败</div>';
            if(fn){
            	html += '<div class="pop-text confirms-text"><div class="text" style="word-wrap: break-word;width: 98%;max-height: 300px;">'+text+'</div>'+btn+'</div>';
            }else{
            	html += '<div class="pop-text alerts-text"><div class="text" style="word-wrap: break-word;width: 98%;max-height: 300px;">'+text+'</div>'+btn+'</div>';;
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
           
            //oDiv.style.top = windowH - oDivH+'px';  
            //console.log(oDiv.childNodes[1].childNodes[0]);
            oDiv.childNodes[1].childNodes[1].childNodes[0].onclick=function(){
                htmlChild.removeChild(oBg);
                htmlChild.removeChild(oDiv);
                if(fn){fn();}
            };
      
            if(fn){
                oDiv.childNodes[1].childNodes[1].childNodes[1].onclick=function(){
                    htmlChild.removeChild(oBg);
                    htmlChild.removeChild(oDiv);
                };
            }
    };

    var createExportDiv = function(text,btn,category,$elem){
    	var scrollTop = window.parent.document.body.scrollTop;
        var text = text || '';
            var windowObj = window; 
            var htmlChild =windowObj.document.getElementsByTagName('html')[0];
            var html = '<div class="head">消息</div>';
            var isExport =  text.indexOf("导出任务创建成功") > -1 ? true :false;
            var categoryurl;
            if("0"==category){
            	categoryurl="nativepage";
            }else if ("3"==category){
            	categoryurl="crosspage";
            }else{
            	categoryurl="webpage";
            }
            if(isExport){
            	var atext='<a id="dialog" href="#/'+categoryurl+'/excelExport" onclick=function(){window.parent.onHashChange;htmlChild.removeChild(this);}>分析工具-数据下载</a>';
            	text=text.substring(0,13)+atext+"页面"+text.substring(19,text.length-1)+"。";
            }
        	html += '<div class="pop-text alerts-text"><div class="text">'+text+'</div>'+btn+'</div>';
        	if($elem){
        		$elem.after(html);
        	}else{
        		oDiv.innerHTML= html;
        	}
            
            htmlChild.appendChild(oBg);
            htmlChild.appendChild(oDiv);
            var oDivW = oDiv.offsetWidth/2;
            var oDivH = oDiv.offsetHeight/2;
            var windowH = (htmlChild.offsetHeight || window.outerHeight)/3;
            //var windowH = htmlChild.offsetHeight/3 === 0 ?400 : htmlChild.offsetHeight/3;
            var windowW = htmlChild.offsetWidth/2;

            oDiv.style.left = windowW - oDivW+'px';
            if(scrollTop<=oDivH){
            	scrollTop=oDivH;
            }
            if(scrollTop>800){
            	oDiv.style.top = (scrollTop-550)>550?(scrollTop-550):550+'px'; 
            }else if(scrollTop>(oDivH/2+400)){
            	oDiv.style.top = (scrollTop-(oDivH/2))+200+'px'; 
            }else if(oDivH<100){
            	oDiv.style.top = 200+'px'; 
            }else{
            	oDiv.style.top =550+'px';
            }
       	 	
           /* if(scrollTop>(oDivH+20)&&scrollTop<(oDivH*5)){
            	 oDiv.style.top = (scrollTop-oDivH)+'px'; 
            }else if(scrollTop>(oDivH*5)&&scrollTop<(oDivH*6)){
            	oDiv.style.top = (scrollTop-(oDivH+150))+'px';
            }else if(scrollTop>(oDivH*6)){
            	 oDiv.style.top = (scrollTop-(oDivH+300))+'px'; 
            }else{
            	  oDiv.style.top = (scrollTop+70)+'px'; 
            }*/
          
           // oDiv.style.top = windowH - oDivH+'px';  
            //console.log(oDiv.childNodes[1].childNodes[0]);
            oDiv.childNodes[1].childNodes[1].childNodes[0].onclick=function(){
                htmlChild.removeChild(oBg);
                htmlChild.removeChild(oDiv);
            };
            if(isExport){
            	oDiv.childNodes[1].childNodes[0].childNodes[1].onclick=function(){
            		htmlChild.removeChild(oBg);
            		htmlChild.removeChild(oDiv);
            	};
            }
    };

    var obj = {
       alerts:function(text,category,$elem){
           var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-info btn-sm">确认</a></div>';
           if(category){
        	   createExportDiv(text,btn,category,$elem);
           }else{
        	   createDiv(text,btn);
           }
        },
        confirms:function(text,fn){
            var btn ='<div class="btn-box"><a href="javascript:void(0)" id="confirms" class="btn btn-info btn-sm">确认</a><a href="javascript:void(0)" id="cancel" class="btn btn-default btn-sm ml-10">取消</a></div>';
            createDiv(text,btn,fn);
        }
    };
    return obj;
}();

function iFrameHeightM() {
	var winHg = $(window).height() - $("#header").height() - 5;
	var ifm = document.getElementById("extern-pages");
	if(ifm){
		var subWeb = document.frames ? document.frames["extern-pages"].document
				: ifm.contentDocument;
		if (subWeb) {
			//if (winHg > subWeb.body.clientHeight) {
			//	ifm.height = winHg;
			//}else{
				ifm.height = subWeb.body.clientHeight;
			//s}
		}
	}
	
	if(window.parent && window.parent.iFrameHeight){
		window.setTimeout(window.parent.iFrameHeight,200);
	}
	
}

function iFrameScrollHeightM() {
	var winHg = $(window).height() - $("#header").height() - 5;
	var ifm = document.getElementById("extern-pages");
	
	if(ifm){
		var subWeb = document.frames ? document.frames["extern-pages"].document
				: ifm.contentDocument;
		if (subWeb) {
			if(winHg > subWeb.body.scrollHeight){
				ifm.height = winHg;
			}else{
				ifm.height = subWeb.body.scrollHeight;
			}
		}
	}
	
	if(window.parent && window.parent.iFrameScrollHeight){
		window.setTimeout(window.parent.iFrameScrollHeight,200);
	}
}
function formatHeight(){
	if(window.parent && window.parent.iFrameHeight){
		window.setTimeout(window.parent.iFrameHeight,200);
	}
	if(window.parent && window.parent.iFrameScrollHeight){
		window.setTimeout(window.parent.iFrameScrollHeight,200);
	}
}
function initIFrameHeight(){
	if(window.parent && window.parent.iFrameHeight){
	 window.setTimeout(window.parent.iFrameHeight,200);
	}
}

function summdialogStyle(){
/*	setTimeout(function() {
		$(".downlaod").remove();
	}, 5000);*/
};

var convertStateConfig = {
		"/nativepage/User_Country":"/nativepage/User_Area",
		"/nativepage/pixelInfo":"/nativepage/userDeviceType",
		"/nativepage/userOs":"/nativepage/userDeviceType",
		"/nativepage/User_Channel":"/nativepage/IspinInfo",
		"/nativepage/userErrorDetail":"/nativepage/userError",
		"/nativepage/userKindOfError":"/nativepage/userError",
		"/nativepage/UserKeepInfo1":"/nativepage/UserKeepInfo",
		"/nativepage/userKeepFunnel":"/nativepage/keepLoseDistribute",
		"/nativepage/customDetailed":"/nativepage/customEvent",
		"/nativepage/VersionInfoList":"/nativepage/VersionInfo",
		"/nativepage/partnerDataDetail":"/nativepage/partnerData",
		"/nativepage/FirstDayKeepInfo":"/nativepage/UserKeepInfo",
		"/nativepage/customFunnel":"/nativepage/customFunnelSummarize",
		"/nativepage/customFunnel_new":"/nativepage/customFunnelSummarize",
		"/nativepage/customFunnel_edit":"/nativepage/customFunnelSummarize",
		"/nativepage/eventManager":"/nativepage/versionManager",
		"/nativepage/SmartEventManager":"/nativepage/versionManager",
		"/nativepage/channelManagement":"/nativepage/versionManager",
		"/nativepage/pageinfoManager":"/nativepage/versionManager",
		"/nativepage/ProductEdit":"/nativepage/versionManager",
		"/nativepage/PathAnalyze":"/nativepage/PageInfo",
		"/webpage/User_Country":"/webpage/User_Area",
		"/webpage/userOs":"/webpage/pixelInfo",
		"/webpage/customDetailed":"/webpage/customEvent",
		"/webpage/customFunnel":"/webpage/customFunnelSummarize",
		"/webpage/customFunnel_new":"/webpage/customFunnelSummarize",
		"/webpage/customFunnel_edit":"/webpage/customFunnelSummarize",
		"/webpage/channelManagement":"/webpage/eventManager",
		"/webpage/pageinfoManager":"/nativepage/eventManager",
		"/webpage/ProductEdit":"/nativepage/eventManager",
		"/webpage/PathAnalyze":"/webpage/PageInfo",
		"/crosspage/User_Country":"/crosspage/User_Area",
		"/crosspage/UserKeepInfo1":"/crosspage/UserKeepInfo",
		"/crosspage/userKeepFunnel":"/crosspage/keepLoseDistribute",
		"/crosspage/analysisTrend":"/crosspage/userDistribution",
		"/crosspage/customDetailed":"/crosspage/customEvent",
		"/crosspage/FirstDayKeepInfo":"/crosspage/UserKeepInfo",
		"/crosspage/customFunnel":"/crosspage/customFunnelSummarize",
		"/crosspage/customFunnel_new":"/crosspage/customFunnelSummarize",
		"/crosspage/customFunnel_edit":"/crosspage/customFunnelSummarize",
		"/crosspage/ProductEdit":"/crosspage/eventManager",
	};	

function convertState (state){
	if(state.split("/").length > 3){
		state = state.substring(0,state.lastIndexOf("/"));
	}
	var convertedState = convertStateConfig[state];
	if(convertedState){
		return convertedState;
	}
	return state;
};

function getExportName(url){
	url = '#'+convertState(url);
	var menuCode =url.split("/")[1];
	var menuList = appConfig.menuList;
	var menus = [];
	for (var i = 0; i < menuList.length; i++) {
		if(menuCode == menuList[i].extAttr2){
			menus = menuList[i].childrens;
			break;
		}
	}
	for (var i = 0; i < menus.length; i++) {
		if(menus[i].childrens.length>0){
			for (var int = 0; int < menus[i].childrens.length; int++) {
				if(url==menus[i].childrens[int].resourceUri){
					return menus[i].resourceName;
				}
			}
			
		}
	}
	return '';
}


