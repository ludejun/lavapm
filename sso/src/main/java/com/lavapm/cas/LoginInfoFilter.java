package com.lavapm.cas;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class LoginInfoFilter extends OncePerRequestFilter {
	private static final String QUERY_SQL = "SELECT id,title,content FROM SYS_INFO WHERE start_date <= now() and end_date >= now() ";
	private static final String THEME_QUERY_SQL = "SELECT * FROM `UM_DMPTHEME`";
	private static final Logger logger = LoggerFactory.getLogger(LoginInfoFilter.class);

	protected void doFilterInternal(HttpServletRequest arg0, HttpServletResponse arg1, FilterChain arg2)
			throws ServletException, IOException {
		List<Map<String, Object>> infos = new ArrayList();
		List<Map<String, Object>> themes = new ArrayList();
		try {
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());

			JdbcTemplate jdbcTemplate = (JdbcTemplate) context.getBean("jdbcTemplate", JdbcTemplate.class);
			infos = jdbcTemplate.queryForList(
					"SELECT id,title,content FROM SYS_INFO WHERE start_date <= now() and end_date >= now() ");
			themes = jdbcTemplate.queryForList("SELECT * FROM `UM_DMPTHEME`");
		} catch (Exception e) {
			logger.info("================== " + e.getMessage());
		}
		arg0.getSession().setAttribute("infos", infos);
		arg0.getSession().setAttribute("themes", themes);
		arg2.doFilter(arg0, arg1);
	}
}
