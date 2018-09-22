<%--

    Licensed to Jasig under one or more contributor license
    agreements. See the NOTICE file distributed with this work
    for additional information regarding copyright ownership.
    Jasig licenses this file to you under the Apache License,
    Version 2.0 (the "License"); you may not use this file
    except in compliance with the License.  You may obtain a
    copy of the License at the following location:

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

--%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ page session="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<spring:theme code="mobile.custom.css.file" var="mobileCss" text="" />
<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="com.lavapm.vo.User"%>
<%@page import="javax.servlet.jsp.PageContext"%>
<%@page
	import="com.lavapm.service.SessionIdCacheService"%>
<%@page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="com.lavapm.util.CasConfig"%>
<%@page import="java.util.Properties"%>
<% 	String url = request.getScheme()+"://"+ request.getServerName()+request.getRequestURI()+"?"+request.getQueryString(); %>
<% 	String resourceUrl = url.toLowerCase() ;
   	String css = "" ;
   	if(resourceUrl.indexOf("dmp") > -1){
	   css = "dmp_login" ;
   	}
	String logo = "css/images/LavaPm.png";
	String text = "";
	String copyright = "© 2017 Lava Performance Marketing 津ICP备18003962号";
	String background = "";
   	List<Map<String, Object>> themes = (List<Map<String, Object>>)session.getAttribute("themes");
   	for (int i = 0; i < themes.size(); i++) {
		Map<String, Object> theme = themes.get(i);
		if ("dmp.theme.login.logo".equals(theme.get("code"))) {
			logo = String.valueOf(theme.get("value"));
		}
		if ("dmp.theme.login.text".equals(theme.get("code"))) {
			text = String.valueOf(theme.get("value"));
		}
		if ("dmp.theme.copy.right.text".equals(theme.get("code"))) {
			copyright = String.valueOf(theme.get("value"));
		}
		if ("dmp.theme.login.background".equals(theme.get("code"))) {
			background =  "background : #eef0f3 url('" + String.valueOf(theme.get("value")) + "') no-repeat top center;background-size: cover;";
		}
	}
%>
<!--  
<c:if test="${not pageContext.request.secure}">
<div id="msg" class="errors">
    <h2>Non-secure Connection</h2>
    <p>You are currently accessing CAS over a non-secure connection.  Single Sign On WILL NOT WORK.  In order to have single sign on work, you MUST log in over HTTPS.</p>
</div>
</c:if>
-->

<!doctype html>
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录平台</title>
<style type="text/css">
<!--
body {
	font-size: 12px;
	margin: 0;
	padding: 0;
	color: #5b626b;
	font-family: "Microsoft YaHei", tahoma, arial, sans-serif !important;
}
-->
</style>
<link rel="shortcut icon" type="image/x-icon" href="css/images/corner-maik.png" media="screen" />
<link type="text/css" rel="stylesheet" href="/sso/css/login.css" />
	<script type="text/javascript"
		src="<c:url value="/js_dcds/jquery-1.9.1.min.js" />"></script>
</head>
<body class="report_login" onkeydown="keyLogin();" style="<%=background%>">

	<div class="login-panel" id="login">
		<form:form method="post" id="fm1" class="login-form"
			commandName="${commandName}" htmlEscape="true">
			<form:errors path="*" id="msg" style="display:none" element="div" >
				<% 
				 boolean result = pageContext.getAttribute("messages") == null ? false :true;
				 pageContext.setAttribute("isError", result);
				%>
			</form:errors>
			
			<table  width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td align="left" valign="bottom" class="top_img_td">
						<img src="<%=logo%>" class="lavapm_png">
					</td>
				</tr>
				<c:if test="${isError}">
				<tr>
					<td align="left" valign="bottom" class="error">
						<div class="errorInfo" style="display: none;">
							<form:errors path="*" id="msg" element="div" class="info">
								<% 
								 boolean result = pageContext.getAttribute("messages") == null ? false :true;
								 pageContext.setAttribute("isError", result);
								%>
							</form:errors>
						</div>
					</td>
				</tr>
				<tr>
					<td align="left" valign="bottom" class="mid_username">
						<c:if test="${not empty sessionScope.openIdLocalId}">
							<strong>${sessionScope.openIdLocalId}</strong>
							<input type="hidden" id="username" name="username" value="${sessionScope.openIdLocalId}" />
						</c:if> 
						<input class="form-user" id="username" name="username" placeholder="username" type="text" accesskey="${userNameAccessKey}"  htmlEscape="true" autocomplete="false" onkeyup="setStyle();GetPwdAndChk();" onfocus="setStyle();GetPwdAndChk();" style="border: solid 1px;border-color:#f55848;"/>
						<span class="nickx nick_error" onclick="clearUserPwd();"></span>
					</td>
				</tr>
				<tr>
					<td align="left" valign="bottom" class="mid_password">
						<%-- <form:password cssClass="form-pass err_input" id="password" placeholder="password" path="password" accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off"  style="border: solid 1px;border-color:#f55848;"/> --%>
						<input class="form-pass" id="password_show" placeholder="password" type="text" autocomplete="off" accesskey="${userNameAccessKey}" onkeyup="changePassWord();" style="border: solid 1px;border-color:#f55848;"/>
						<input class="form-pass" id="password" name="password" placeholder="password" type="text" autocomplete="off" style="display:none;"/>
					</td>
				</tr>
				</c:if>
				<c:if test="${!isError}">
				<tr>
					<td align="left" valign="bottom" class="error">
						<div class="errorInfo" style="display: none;" >
							<div id="msg" class="info"></div>
						</div>
					</td>
				</tr>
				<tr>
					<td align="left" valign="bottom" class="mid_username">
						<c:if test="${not empty sessionScope.openIdLocalId}">
							<strong>${sessionScope.openIdLocalId}</strong>
							<input type="hidden" id="username" name="username" value="${sessionScope.openIdLocalId}" />
						</c:if> 
						<%-- <form:input cssClass="form-user" id="username" placeholder="username" accesskey="${userNameAccessKey}" path="username" autocomplete="false" htmlEscape="true"  onkeyup="setStyle();" onfocus="setStyle();"/> --%>
						<input class="form-user" id="username" name="username" placeholder="username" type="text" accesskey="${userNameAccessKey}"  htmlEscape="true" autocomplete="false" onkeyup="setStyle();GetPwdAndChk();" onfocus="setStyle();GetPwdAndChk();"/>
						<span class="nickx" onclick="clearUserPwd();"></span>
					</td>
				</tr>
				<tr>
					<td align="left" valign="bottom" class="mid_password">
						<input class="form-pass" id="password_show" placeholder="password" type="text" autocomplete="off" accesskey="${userNameAccessKey}" onkeyup="changePassWord();"/>
						<input class="form-pass" id="password" name="password" placeholder="password" type="text" autocomplete="off" style="display:none;"/>
						<%-- <form:password cssClass="form-pass" id="password" placeholder="password" path="password" accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" style="display:none;"/> --%>
					</td>
				</tr>
				</c:if>
				<tr>
					<td class="remeberme">
						<span class="radiochecked active">
							<div class="radiocheck-circle" onclick="changeRememberStatus();">
								<span  class="radiocheck-inner-circle"/>
								<input type="checkbox" name="rememberStatus" value="1" class="radioclass" />
							</div>
							<font style="margin-left:10px;">Remember Me</font>
						</span>
						<%-- <%
							Properties casConfig = CasConfig.get();
							String updatePwdSite = casConfig.getProperty("um.site.updatePwd");
						%>
						<a href="<%=updatePwdSite%>">忘记密码？</a> --%>
					</td>
				</tr>
				<tr>
					<input type="hidden" id="timecc" name="timecc"/>
					<input type="hidden" name="lt" value="${loginTicket}" />
					<input type="hidden" name="execution" value="${flowExecutionKey}" /> 
					<input type="hidden" name="_eventId" value="submit" />
					<td align="left">
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
							<%-- <%
									Properties casConfig = CasConfig.get();
										String updatePwdSite = casConfig
												.getProperty("um.site.updatePwd");
								%>
								<td width="50%" align="left">
									<input type="hidden"
									name="lt" value="${loginTicket}" /> <input type="hidden"
									name="execution" value="${flowExecutionKey}" /> <input
									type="hidden" name="_eventId" value="submit" /> <a
									href="<%=updatePwdSite%>" />修改密码</td> --%>
								<td align="left" valign="bottom" class="base_submit">
									<input style="transform:translateY(-18px)" name="button" type="button" class="submit" id="button" value="LogIn" onclick="formSubmit();"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</form:form>
		<div class="copy-right" title="<%=copyright%>"><%=copyright%></div>
	</div>
    <c:if test="${isError ne true}">
		<c:forEach var="info" items="${sessionScope.infos}" varStatus="status">
		<div id="pop" style="display: none;"> 
			<div id="popHead">
			  <a id="popClose" title="关闭">关闭</a>
			  <h2>${info.title }</h2>
			</div>
			<div id="popContent">
			<p class="poptips">${info.content }</p>
			<script type="text/javascript">
		    (function($){
		    	  $('#pop').slideDown(1000);
		    	  $("#popClose").click(function(){
		      		  $('#pop').slideUp(800);
		      		});
		      })(jQuery);
	   		 </script>
			</div>
		</div>
	</c:forEach>
	</c:if>

	<script type="text/javascript" src="<c:url value="/js/cas.js" />"></script>
	<script type="text/javascript">
		//radio 切换
		function changeRememberStatus(){
			//$(".radiochecked").hasClass("active")? $(".radiochecked").removeClass("active"):$(".radiochecked").addClass("active");
			$(".radioclass").val() == 0?$(".radioclass").val(1):$(".radioclass").val(0);
			if($(".radiochecked").hasClass("active")){
				$(".radiochecked").removeClass("active");
				$(".radiocheck-inner-circle").css("background","transparent");
			}else{
				$(".radiochecked").addClass("active");
				$(".radiocheck-inner-circle").css("background","#13b4ff");
			}
		}
		// 修改密码
		function changePassWord(){
			var password_show = $("#password_show").val();
			var len = password_show.length;
			var password = $("#password").val();
			if(password_show.trim().replace(/●/g, "").length == len){
				password = password_show.trim();
			}else if(password.length>len){
				password = password.substring(0,password_show.trim().length);
			}else{
				password += password_show.replace(/●/g, "");
			}
			$("#password").val(password);
			var _passwordShow = "";
			for (var int = 0; int < len; int++) {
				_passwordShow+= "●";
			}
			$("#password_show").val(_passwordShow);
		}
		//切换清除样式
		function setStyle(){
			if (((navigator.userAgent.indexOf('MSIE') >= 0) 
				    && (navigator.userAgent.indexOf('Opera') < 0)) ||navigator.userAgent.indexOf('Trident') >=0){
				    return;
			}
			var username = $("#username").val()
			if(''!=username.trim()){
				$(".nickx").show();
			}else{
				$(".nickx").hide();
			}
		}
		//清除功能
		function clearUserPwd(){
			$("#username").val("");
			$("#password").val("");
			$("#password_show").val("");
			$(".nickx").hide();
		}
		//登录前检查
		function checkUsernameAndPassword(){
			var username = $("#username").val();
			if('' == username.trim()){
				$("#username").val('');
				$(".info").html("Please input username!");
				return false;
			}
			$("#username").val(username.trim());
			var password = $("#password").val();
			if('' == password.trim()){
				$("#password").val('');
				$("#password_show").val('');
				$(".info").html("Please input password!");
				return false;
			}
			$("#password").val(password.trim());
			$("#password_show").val($("#password_show").val().trim());
			return true;
		};
		//登录
		function formSubmit(){
			if(!checkUsernameAndPassword()){
				$(".errorInfo").show();
				$(".form-user").css("box-shadow","none");
				$(".form-pass").css("box-shadow","none");
				return false;
			}else{
				$(".errorInfo").hide();
				$(".form-user").css("box-shadow","0 0 3px #13b4ff;");
				$(".form-pass").css("box-shadow","0 0 3px #13b4ff;");
			}
			$("#button").val("Logging...");
			$("#button").addClass("logining");
			SetPwdAndChk();
			$(".login-form").submit();
		}
		function keyLogin(){
			if (event.keyCode==13)  //回车键的键值为13
				formSubmit();
		}
		window.onload=function onLoginLoaded() { GetLastUser();}
		//获取最后一次登录的
		function GetLastUser() {
			var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
			var usr = GetCookie(id);
			if (usr != null) {
				$("#username").val(usr);
				setStyle();
			} 
			GetPwdAndChk();
		}
		//插入登录人
		function SetLastUser(usr) {
			var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
			var expdate = new Date();
			//当前时间加上两周的时间
			expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
			SetCookie(id, usr, expdate);
		}
		//用户名失去焦点时调用该方法
		function GetPwdAndChk() {
			if($(".info").html()==''){
				var usr = $("#username").val();
				var pwd = GetCookie(usr.trim());
				if (pwd != null) {
					$("#password").val(pwd);
					var passwordShow = "";
					for (var int = 0; int < pwd.length; int++) {
						passwordShow+= "●";
					}
					$("#password_show").val(passwordShow);
					$(".radiochecked").addClass("active");
					$(".radioclass").val(1);
				} else {
					$("#password").val('');
					$("#password_show").val('');
					$(".radiochecked").removeClass("active");
					$(".radioclass").val(0);
				}
			}
		}
		//取Cookie的值
		function GetCookie(name) {
			var arg = name+"=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			while (i < clen) {
				var j = i + alen;
				if (document.cookie.substring(i, j) == arg) 
					return getCookieVal(j);
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0) break;
			}
			return null;
		}
		//插入Cookie的值
		function SetCookie(name, value, expires) {
			var argv = SetCookie.arguments;
			var argc = SetCookie.arguments.length;
			var expires = (argc > 2) ? argv[2] : null;
			var path = (argc > 3) ? argv[3] : null;
			var domain = (argc > 4) ? argv[4] : null;
			var secure = (argc > 5) ? argv[5] : false;
			document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
		}
		function ResetCookie() {
			var usr = $("#username").val();
			var expdate = new Date();
			SetCookie(usr, null, expdate);
		}
		function getCookieVal(offset) {
			var endstr = document.cookie.indexOf(";", offset);
			if (endstr == -1) endstr = document.cookie.length;
			return unescape(document.cookie.substring(offset, endstr));
		}
		//点击登录时触发客户端事件
		function SetPwdAndChk() {
			//取用户名
			var usr = $("#username").val();
			//将最后一个用户信息写入到Cookie
			SetLastUser(usr);
			//如果记住密码选项被选中
			if($(".radioclass").val() == 1) {
				//取密码值
				var pwd = $("#password").val();
				if(pwd.trim()!=''){
					var expdate = new Date();
					expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
					//将用户名和密码写入到Cookie
					SetCookie(usr, pwd, expdate);
				}
			}else {
				//如果没有选中记住密码,则立即过期
				ResetCookie();
			}
		}
		
	</script>
	<script type="text/javascript">
		var mrd=Math.random();
		var doc = document.getElementById("timecc");
		doc.value=mrd;
		var errormsg = $(".info").html();
		if(errormsg && errormsg.split("<br>").length>1){
			errormsg.split("<br>")[0].indexOf("用户")>0?$(".info").html(errormsg.split("<br>")[0]):$(".info").html(errormsg.split("<br>")[1]);
		}
		if(errormsg!=''){
			$(".errorInfo").show();
			$(".form-user").css("box-shadow","none");
			$(".form-pass").css("box-shadow","none");
		}
	</script>
<%-- 	<c:if test="${isError}">
	<div class="form-error"> </div>
	</c:if> --%>
</body>
</html>
