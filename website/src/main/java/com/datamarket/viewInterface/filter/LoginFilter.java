package com.datamarket.viewInterface.filter;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.slf4j.Logger;

import com.datamarket.viewInterface.util.LogWriter;
import com.datamarket.viewInterface.util.serviceUtil;
import com.tendcloud.enterprise.um.umic.entity.Role;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.rmi.UmRmiServiceFactory;

public class LoginFilter implements Filter {
	private static Logger logger = LogWriter.getErrorLog();;
	private static final int COOKIE_EXPIRE = 604800;
	private static final String COOKIE_TOKEN = "tdppt";
	private static final String COOKIE_FROM = "from";
	private static final String USER_KEY = "user";
	private static final String APP_CODE = serviceUtil.getInstance().getValue("app.code");
	private static final String APP_ADMIN_ROLE = "dm_admin";
	private static final String APP_ADMIN_FROM = "2";
	private static final String APP_ADMIN_PORTAL = serviceUtil.getInstance().getValue("app.admin.portal");
	private static final String APP_USER_ROLE = "dm_user";
	private static final String APP_USER_PORTAL = serviceUtil.getInstance().getValue("app.user.portal");
	private static final String APP_DOMAIN = serviceUtil.getInstance().getValue("app.domain");
	private static final String APP_USER_FROM = "1";

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpSession session = httpServletRequest.getSession();

		User user = (User) session.getAttribute("user");
		if ((user == null) || (StringUtils.isEmpty(user.getUserDesc()))) {
			logger.info("1.无账号步骤开始--------------------");
			Principal principal = httpServletRequest.getUserPrincipal();
			if ((principal instanceof AttributePrincipal)) {
				AttributePrincipal p = (AttributePrincipal) principal;
				String umid = String.valueOf(p.getAttributes().get("umid"));
				logger.info("2.lavapm登录账号----------：" + umid);
				try {
					user = UmRmiServiceFactory.getSecurityService().getUserByUmId(umid);

					List<Role> roles = UmRmiServiceFactory.getSecurityService().getRolesByUmid(user.getUmid(),
							APP_CODE);

					String from = null;
					String portal = null;
					for (Role role : roles) {
						logger.info("3.账号角色--------------------" + role.getRoleCode());
						if ("dm_admin".equals(role.getRoleCode())) {
							portal = APP_ADMIN_PORTAL;
							from = "2";
							user.setUserDesc("dm_admin");
							break;
						}
						if ("dm_user".equals(role.getRoleCode())) {
							portal = APP_USER_PORTAL;
							from = "1";
							user.setUserDesc("dm_user");
							break;
						}
					}
					logger.info("4.账号来源--------------------" + from);
					if (StringUtils.isNotEmpty(from)) {
						session.setAttribute("user", user);
						httpServletResponse.addCookie(createCookie("tdppt", umid, 604800, APP_DOMAIN));
						httpServletResponse.addCookie(createCookie("from", from, 604800, APP_DOMAIN));
						logger.info("5.账号来源返回--------------------" + portal);
						logger.info("6.账号url--------------------" + httpServletRequest.getRequestURI());
						httpServletRequest.getRequestDispatcher(portal).forward(request, response);
						return;
					}
				} catch (Throwable e) {
					logger.error("", e);
					throw new RuntimeException("", e);
				}
			}
		} else {
			logger.info("1.有账号步骤开始--------------------");
			logger.info("2.账号url--------------------" + httpServletRequest.getRequestURI());
			if ((httpServletRequest.getRequestURI().equals("/market"))
					|| (httpServletRequest.getRequestURI().equals("/market/"))
					|| (httpServletRequest.getRequestURI().startsWith("/market;"))
					|| (httpServletRequest.getRequestURI().startsWith("/market?"))) {
				String url = user.getUserDesc().equals("dm_admin") ? APP_ADMIN_PORTAL : APP_USER_PORTAL;
				httpServletRequest.getRequestDispatcher(url).forward(request, response);
				return;
			}
		}
		logger.info("1.账号url--------------------" + httpServletRequest.getRequestURI());
		filterChain.doFilter(request, response);
	}

	public void init(FilterConfig arg0) throws ServletException {
		
	}

	private Cookie createCookie(String name, String value, int expire, String domain) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		cookie.setMaxAge(expire);
		cookie.setDomain(domain);
		return cookie;
	}
}
