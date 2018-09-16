function kpi() {
    this._url = location.protocol+'//'+location.host;//database
    this._captchar = this._url + '/um/getSecurityCode.dox';
    this._sid = $.cookie('sid');
	this._cookieDomain = ".24money.com";
	if(this._url.indexOf("wanlitong.com") > -1){
		this._cookieDomain = ".wanlitong.com";
	}
	this._default = "/portal/";
}

kpi.prototype.login = function (usernameId,passwordId,scodeId,scodeImgId, form) {
	username = encodeURIComponent($("#" + usernameId).val()),
	password = encodeURIComponent($("#" + passwordId).val()),
	scode = encodeURIComponent($("#" + scodeId).val());
	var self = this;
    $.getJSON(this._url + "/um/login.jsonx?userName=" + username + "&password=" + password +  "&securityCode=" + scode + "&callback=?",
			  function(data){
				// 登录成功
				if (data.result == 0) {
					$.cookie('sid',data.sessionId, {path:"/", domain:self._cookieDomain});
					//jQuery.post("/cas/login",{"username":"test","password":"123456",lt:$(form)[0].lt.value,execution:$(form)[0].execution.value,_eventId:$(form)[0]._eventId.value},function(data){document.write(data);});					
					var fm2 = document.forms["fm2"];
					fm2.username.value = $(form)[0].username.value;
					fm2.password.value = $(form)[0].password.value;
					fm2.lt.value = $(form)[0].lt.value;
					fm2.execution.value = $(form)[0].execution.value;
					fm2._eventId.value = $(form)[0]._eventId.value;
    				fm2.submit();
				} else {
					// 登录失败提示信息
					alert(data.message);
					$("#" + scodeImgId).attr("src", self._captchar + "?" + Math.random());
					$("#" + scodeId).val("");
					if(data.message == "验证码输入错误"){
						$("#" + scodeImgId).focus();
					}
				}
			});
};
/** 退出 */
kpi.prototype.logout = function () {
    if (confirm("您确认要退出吗")) {
		var hostname = location.hostname.toLowerCase(),
				domain = "";
		if(hostname.indexOf("24money.com") > -1){
			domain = ".24money.com";
		}
		if(hostname.indexOf("wanlitong.com") > -1){
			domain = ".wanlitong.com";
		}
        $.cookie('sid', null, {path:"/", domain:domain});
        location='login.html';
    }
};