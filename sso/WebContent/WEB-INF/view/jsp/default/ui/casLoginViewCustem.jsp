<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.lavapm.vo.User"%>
<%@page import="com.lavapm.service.SessionIdCacheService"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!doctype html>
<html>
<head>
<jsp:directive.include file="inc/head.html" />
<title>LAVAPM SSO</title>
<style type="text/css">
	@import url(css_dcds/login.css);
.button a {
	font-size: large;
	padding-left: 40px;
	line-height: 50px;
	text-decoration: underline;
}
</style>
</head>
<body>
	<jsp:directive.include file="inc/header.jsp" />
	<section id="content" class="login">	
		<section class="left">
			<div class="icon"></div>
		</section>	
		<form name="fm2" id="fm2" style="display: none;" method="post"> 
			<input type="hidden" name="username">
			<input type="hidden" name="password">
			<input type="hidden" name="lt">
			<input type="hidden" name="execution">
			<input type="hidden" name="_eventId">
		</form>	
		<form:form method="post" id="fm1" cssClass="fm-v clearfix" commandName="${commandName}" htmlEscape="true">
			<ul>
				<li>
					<h2>登录<span>/ Login</span></h2>
				</li>
				<li class="username">
					<label for="username"></label>
					<form:input cssClass="required" required="required" placeholder="用户名" cssErrorClass="error" id="username" size="25" tabindex="1" accesskey="${userNameAccessKey}" path="username" autocomplete="false" htmlEscape="true" />
				</li>
				<li class="password">
					<label for="password"></label>
					<form:password cssClass="required" required="required" placeholder="密码" cssErrorClass="error" id="password" size="25" tabindex="2" path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />				
				</li>
				<li class="code">
					<label for="scode"></label>
					<input type="text" class="ime-off" id="scode" maxlength="4" required="required"  autocomplete="off" placeholder="验证码[看不清？点击图片刷新]" tabindex="3"/>
					<img id="captchar" />
				</li>
				<li class="button">
					<form:errors path="*" id="msg" cssClass="errors" element="div" />
                    <div class="row btn-row">
						<input type="hidden" name="lt" value="${loginTicket}" />
						<input type="hidden" name="execution" value="${flowExecutionKey}" />
						<input type="hidden" name="_eventId" value="submit" />
						<a href="http://um.dev.datacenter.wlt.com:8280/um/resetPwd.html">重置密码</a><a href="http://um.dev.datacenter.wlt.com:8280/um/updatePwd.html">修改密码</a>
                        <input name="submit" accesskey="l" value="" tabindex="4" type="submit" />
                    </div>
				</li>
			</ul>
		</form:form>
		<!–[if lt IE 9]> 
		<script type="text/javascript"> 
			void function(window, $){
				$("#username, #password, #scode").focus(function(){
					$(this).addClass("focus");
				}).blur(function(){
					var val = $.trim(this.value); 
					if(val == ''){
						$(this).removeClass("focus");
					}
				});
			}(this, jQuery) ;
		</script>
		<![endif]–>
		<script type="text/javascript">
			void function(window, $){
				$("#username").focus(); 
				$(document.forms["fm1"]).submit(function(){
					window._kpi.login("username","password","scode","captchar",this);
					return false;
				});
				$("#captchar").attr("src", window._kpi._captchar + "?" + Math.random())
				  .click(function(){
					this.src = window._kpi._captchar + "?" + Math.random();
				  });
			}(this, jQuery);
		</script>
	</section> 	
	<jsp:directive.include file="inc/footer.jsp" />
</body>
</html>
<%final String queryString = request.getQueryString() == null ? "" : request.getQueryString().replaceAll("&locale=([A-Za-z][A-Za-z]_)?[A-Za-z][A-Za-z]|^locale=([A-Za-z][A-Za-z]_)?[A-Za-z][A-Za-z]", "");%>
<%
	// custom
	if(request.getParameter("username")==null){
		String sessionId = "";
		int ix = -1;
		if((ix=queryString.indexOf("sessionId%3D"))!=-1){
			try{
				sessionId = queryString.substring(ix+12, ix+12+36);
			} catch(Exception e){
				// do nothing
			}
		}else{// 处理Cookie,先登录corekpi，再访问jee应用时的处理
			Cookie[] cookies = request.getCookies();
			if(cookies!=null && cookies.length>0){
				for(Cookie cookie : cookies){
					if("sid".equalsIgnoreCase(cookie.getName()) && StringUtils.isNotBlank(cookie.getValue()) ){
						sessionId = cookie.getValue().trim();
					}
				}
			}
		}
		if(sessionId!=null&&sessionId.trim().length()==36){
			ApplicationContext a = WebApplicationContextUtils.getWebApplicationContext(application);
			SessionIdCacheService sessionIdCacheService = (SessionIdCacheService)a.getBean("sessionIdCacheService");
			try{
				User user = sessionIdCacheService.getUserBySessionId(sessionId);
				if(user!=null){
					//boolean sessionIdSubmit = session.getAttribute("sessionIdSubmit")==null?false:(Boolean)session.getAttribute("sessionIdSubmit");
					StringBuffer script = new StringBuffer("<script>\n");
					script.append("var form = document.getElementById(\"fm1\");\n");
					script.append("var form2 = document.getElementById(\"fm2\");\n");
					script.append("form2.username.value = \"").append(user.getLoginName()).append("\";\n");
					script.append("form2.password.value = \"").append(sessionId).append("\";\n");
					script.append("form2.lt.value = form.lt.value;\n");
					script.append("form2.execution.value = form.execution.value;\n");
					script.append("form2._eventId.value = form._eventId.value;\n");
					script.append("form2.submit();\n");		
					script.append("</script>");
					out.println(script.toString());
				}
			} catch(Exception e){
				// do nothing
			}
		}
	}
%>

