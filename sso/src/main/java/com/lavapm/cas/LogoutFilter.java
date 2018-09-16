package com.lavapm.cas;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lavapm.service.SessionIdCacheService;

public class LogoutFilter extends OncePerRequestFilter {
	protected void doFilterInternal(HttpServletRequest arg0, HttpServletResponse arg1, FilterChain arg2)
			throws ServletException, IOException {
		Cookie[] cs = arg0.getCookies();
		for (Cookie c : cs) {
			String name = c.getName();
			if ("sid".equalsIgnoreCase(name)) {
				ApplicationContext a = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
				if ((a == null) || (a.getBean("sessionIdCacheService") == null)) {
					break;
				}
				SessionIdCacheService sessionIdCacheService = (SessionIdCacheService) a
						.getBean("sessionIdCacheService");
				String sid = c.getValue();
				sessionIdCacheService.removeUserBySessionId(sid);

				break;
			}
		}
		arg2.doFilter(arg0, arg1);
	}
}
