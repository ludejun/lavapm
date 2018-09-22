var FormartUtils = {
	dateFormat : function(data) {// 20151010 --> 10/10
		if(data.length == 8){
			var m = data.substring(4,6);
			if(m.substring(0,1)==0){
				m = m.substring(1,m.length);
			}
			return m+"/"+data.substring(6,8);
		}
	},
	seToMinFormat : function(date) {// 100 --> 01:40
		date = parseInt(date);
		var hour=0;
		var minutes=0;
		var second=date;
	    if(date >= 60) {
	    	minutes = parseInt(date/60);
	        second = parseInt(date%60);
	            if(minutes >= 60) {
            	hour = parseInt(minutes/60);
	            minutes = parseInt(minutes%60);
	            }
	    }
        if(minutes<10){
        	minutes = "0" + minutes;
        }
        if(second<10){
        	second = "0" + second;
        }
        if(hour>0){
        	if(hour<10){
        		hour = "0" + hour;
        	}
        	return hour+":"+minutes+":"+second;
        }else{
        	return minutes+":"+second;
        }
	},
	seToSignFormat : function(date) {// 100 --> 01:40
	
        	return date+"%";
        
	},
	strArrToNum :function(strArr){// ["1"] -->[1]
		for(var i =0;i<strArr.length;i++){
			strArr[i]=Number(strArr[i]);
		}
		return strArr;
	},
	specialStrArrToNumArr :function(strArr){// [{"jsonid":"0","text":[],"y":"230"}] -->[230]
		for(var i =0;i<strArr.length;i++){
			strArr[i]=Number(strArr[i].y);
		}
		return strArr;
	},
	strArrsToNum :function(strArrs){// [["1"]] -->[[1]]
		for(var i =0;i<strArrs.length;i++){
			for(var j =0;j<strArrs[i].length;j++){
				if(!isNaN(strArrs[i][j])){
					strArrs[i][j] = Number(strArrs[i][j]);
    			}
			}
		}
		return strArrs;
	},
	strArrsToNumNotOne :function(strArrs){// [["1"]] -->[[1]]
		for(var i =0;i<strArrs.length;i++){
			for(var j =0;j<strArrs[i].length;j++){
				if(!isNaN(strArrs[i][j])  && j!=1){
					strArrs[i][j] = Number(strArrs[i][j]);
				}
			}
		}
		return strArrs;
	},
	specialStrArrToNum :function(strArrs){// [["1^0.1"]] -->[[1,0.1]]
		for(var i =0;i<strArrs.length;i++){
			for(var j=strArrs[i].length-1;j>0;j--){
				if(strArrs[i][j]!=null&&strArrs[i][j].indexOf("^")>=0){
					var strArr = strArrs[i][j].split("^");
					strArrs[i].splice(j,1,strArr[0],strArr[1]);
				}
			}
		}
		strArrs = FormartUtils.strArrsToNum(strArrs);
		return strArrs;
	},
	dataToPercent : function(data){
		return data+"%";
	},
	IsBigThanZero : function(strArr){
		var flag =true;
		for(var i =0;i<strArr.length;i++){
			if(strArr[i]>0){
				flag =false;
			}
		}
		return flag;
	},
	getDateStr : function(date){
		date  +="";
		var y = date.substring(0,4);
		var m = date.substring(4,6);
		var d = date.substring(6,8);
		return y+"-"+m+"-"+d; 
	},
	hourFormat : function(date){
		date +="";
		if(date.length<2){
			date = "0"+date;
		}
		return date+":00~"+date+":59";
	},
	getDateCondition:function(day,month,year,date){
		var dd = date?new Date(date):new Date();
		dd.setDate(dd.getDate()+(day?day:0));
		dd.setMonth(dd.getMonth()+(month?month:0));
		dd.setFullYear(dd.getFullYear()+(year?year:0));
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;
		if((m+"").length == 1){
			m  = "0" + m;
		}
		var d = dd.getDate(); 
		if((d+"").length == 1){
			d = "0" + d;
		}
		return y+"-"+m+"-"+d; 
	},
	LengthLimit:function(x){
		return '<div class="t-o-e wd110" title="'+x+'">'+x+'</div>';
	},
	platformFormat:function(pagename){
		var split=pagename.split(",");
		if(split.length>1){
			if(split[1] == "1"){
				split[1] = "logo_android_min";
			}else if(split[1] == "2"){
				split[1] = "logo_apple_min";
			}else if(split[1] == "4"){
				split[1] = "logo_winp_min";
			}
			var img = '<img style="vertical-align:middle;height: 20px;" src="images/'+split[1]+'.png" class="fl">';
			return '<div class="clrfix wd130">'+img+'<div class="t-o-e wd100 fl ml-5" title="'+split[0]+'">'+split[0]+'</div></div>';
		}else{
			return '<div class="t-o-e wd100 fl ml-5" title="'+split[0]+'">'+split[0]+'</div>';
		}
	},
	eventFormat:function(pagename){
		var split=pagename.split(",");
		if(split.length>1 && split[1] == "1"){
			if(split[1] == "1"){
				split[1] = "Flexible";
			}
			var img = '<img style="vertical-align:middle;height: 20px;" src="images/'+split[1]+'.png" class="fl">';
			return '<div class="clrfix wd130">'+img+'<div class="t-o-e wd100 fl ml-10" title="'+split[0]+'">'+split[0]+'</div></div>';
		}else{
			return '<div class="t-o-e wd100 fl pl-5" title="'+split[0]+'">'+split[0]+'</div>';
		}
	},
	D_valueFormat:function(oneDate,twoDate){
		var _oneDate = new Date(Number(oneDate.substring(0,4)),Number(oneDate.substring(4,6)-1),Number(oneDate.substring(6,8)));
		var _twoDate = new Date(Number(twoDate.substring(0,4)),Number(twoDate.substring(4,6)-1),Number(twoDate.substring(6,8)));
		return parseInt((_oneDate - _twoDate) / 1000 / 60 / 60 /24);
	},
	longToDateStr :function(long){
		Date.prototype.format = function(f){
		    var o ={
		        "M+" : this.getMonth()+1, //month
		        "d+" : this.getDate(),    //day
		        "h+" : this.getHours(),   //hour
		        "m+" : this.getMinutes(), //minute
		        "s+" : this.getSeconds(), //second
		        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		        "S" : this.getMilliseconds() //millisecond
		    }
		    if(/(y+)/.test(f))f=f.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		    for(var k in o)
		        if(new RegExp("("+ k +")").test(f))f = f.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));return f
		};
		var d =  new Date(long);
		return d.format('yyyy-MM-dd hh:mm:ss');
	},
	longToDateStrymd :function(long){
		Date.prototype.format = function(f){
		    var o ={
		        "M+" : this.getMonth()+1, //month
		        "d+" : this.getDate(),    //day
		        "h+" : this.getHours(),   //hour
		        "m+" : this.getMinutes(), //minute
		        "s+" : this.getSeconds(), //second
		        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		        "S" : this.getMilliseconds() //millisecond
		    }
		    if(/(y+)/.test(f))f=f.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		    for(var k in o)
		        if(new RegExp("("+ k +")").test(f))f = f.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));return f
		};
		var d =  new Date(long);
		return d.format('yyyy-MM-dd');
	},
	formatPercent :function(data){
		data+="";
		var split=data.split(".");
		if(split.length<2){
			return data+".00";
		}
		if(split[1].length==1){
			return data+"0";
		}else{
			return data;
		}
	},
	formatPercentPer :function(data){
		data+="";
		var split=data.split(".");
		if(split.length<2){
			return data+".00%";
		}
		if(split[1].length==1){
			return data+"0%";
		}else{
			return data+"%";
		}
	},
	initHeight :function(){
		if(window.parent && window.parent.iFrameHeight){
			window.setTimeout(window.parent.iFrameHeight,200);
		}
	},
	numFormat :function(data){
		data+="";
		var split=data.split(".");
		if(split.length<2){
			return data+".00";
		}
		if(split[1].length==1){
			return data+"0";
		}else{
			return data;
		}
	},
	HighChartDateFormat :function(date) {
		var sign = ".";
		if(date.length == 8){
			var y = date.substring(0,4);
			var m = date.substring(4,6);
			var d = date.substring(6,8);
			return y + sign + m + sign + d;
		}
		return date;
	},
	HighChartPlatformForamt :function(name) {
		if(name.indexOf(",")>0){
			var na="";
			if(name.split(",")[1]==1){
				na+="Andriod";
			}else if(name.split(",")[1]==2){
				na+="iOS";
			}else{
				na+="WP7";
			}
			return name.split(",")[0]+"("+na+")";
		}
		return name;
	},
	ExportFormat :function(category) {
		if("0"==category){
			return "nativepage";
	    }else if ("3"==category){
	    	return "crosspage";
	    }else{
	    	return "webpage";
	    }
	}
}





