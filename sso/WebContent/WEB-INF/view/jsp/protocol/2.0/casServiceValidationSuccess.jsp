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
<%@page import="java.util.Map"%>
<%@page import="org.jasig.cas.authentication.Authentication"%>
<%@page import="java.util.List"%>
<%@page import="org.jasig.cas.validation.ImmutableAssertionImpl"%>
<%@page import="com.lavapm.vo.User"%>
<%@page import="com.lavapm.util.CodeUtils"%>
<%@page import="com.lavapm.service.SessionIdCacheService"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page pageEncoding="UTF-8"%>
<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
	<cas:authenticationSuccess>
		<cas:user>${fn:escapeXml(assertion.chainedAuthentications[fn:length(assertion.chainedAuthentications)-1].principal.id)}</cas:user>
		
<c:if test="${fn:length(assertion.chainedAuthentications[fn:length(assertion.chainedAuthentications)-1].principal.attributes) > 0}">
	<cas:attributes>
		<c:forEach var="attr" items="${assertion.chainedAuthentications[fn:length(assertion.chainedAuthentications)-1].principal.attributes}">
			<c:choose>
				<c:when test="${attr.key=='sessionId2'}">
					<%  // Generate and cache sessionId,2013/3/28 by ZhouGuoping
						ApplicationContext a = WebApplicationContextUtils.getWebApplicationContext(application);
						SessionIdCacheService sessionIdCacheService = (SessionIdCacheService)a.getBean("sessionIdCacheService");
						String sessionId = CodeUtils.getUUID();
						ImmutableAssertionImpl j = (ImmutableAssertionImpl)request.getAttribute("assertion");
						List<Authentication> la = j.getChainedAuthentications();
						Authentication au = la.get(la.size()-1);
						Map<String,Object> map = au.getPrincipal().getAttributes();						
						User user = new User();						
						user.setUid(map.get("recordID")==null?"-1":map.get("recordID").toString());
						user.setLoginName(map.get("umid").toString());
						user.setName(map.get("userName")==null?user.getLoginName():map.get("userName").toString());
						user.setEmail(map.get("email")==null?"":map.get("email").toString());
						sessionIdCacheService.cacheUserBySessionId(sessionId, user);
					%>
					<cas:${fn:escapeXml(attr.key)}><%= sessionId%></cas:${fn:escapeXml(attr.key)}>
					<%
					    if(map.get("recordID")==null){
					%>
					<cas:recordID><%= user.getUid()%></cas:recordID>
					<%
					    }
					%>
				</c:when>
				<c:otherwise>
					<cas:${fn:escapeXml(attr.key)}>${fn:escapeXml(attr.value)}</cas:${fn:escapeXml(attr.key)}>
				</c:otherwise>
			</c:choose>		
		</c:forEach>
	</cas:attributes>
</c:if>	
<c:if test="${not empty pgtIou}">
		<cas:proxyGrantingTicket>${pgtIou}</cas:proxyGrantingTicket>
</c:if>
<c:if test="${fn:length(assertion.chainedAuthentications) > 1}">
		<cas:proxies>
<c:forEach var="proxy" items="${assertion.chainedAuthentications}" varStatus="loopStatus" begin="0" end="${fn:length(assertion.chainedAuthentications)-2}" step="1">
			<cas:proxy>${fn:escapeXml(proxy.principal.id)}</cas:proxy>
</c:forEach>
		</cas:proxies>
</c:if>
	</cas:authenticationSuccess>
</cas:serviceResponse>
