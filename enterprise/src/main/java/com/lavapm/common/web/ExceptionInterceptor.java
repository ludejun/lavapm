package com.lavapm.common.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.tendcloud.enterprise.um.umic.rmi.BusinessException;

public class ExceptionInterceptor extends HandlerInterceptorAdapter {
	private static final Log log = LogFactory.getLog(ExceptionInterceptor.class);

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		if (ex != null) {
			String msg = "";
			if ((ex instanceof NullPointerException)) {
				msg = "��ָ���쳣";
			} else if ((ex instanceof IOException)) {
				msg = "�ļ���д�쳣";
			} else if ((ex instanceof BusinessException)) {
				msg = ex.toString();
			} else if ((ex instanceof RuntimeException)) {
				msg = ex.getMessage();
			} else {
				msg = ex.toString();
			}
			logger(request, handler, ex);

			response.setStatus(503);
			Map<String, Object> result = new HashMap();
			result.put("success", Boolean.valueOf(false));
			result.put("msg", msg);
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				String resultStr = objectMapper.writeValueAsString(result);

				response.setHeader("Pragma", "No-cache");
				response.setHeader("Cache-Control", "no-cache");

				response.setContentType("application/json");

				PrintWriter out = response.getWriter();
				out.print(resultStr);
				out.flush();
				out.close();
			} catch (Exception e) {
				e.printStackTrace();
				log.error(msg, e);
			}
		} else {
			super.afterCompletion(request, response, handler, ex);
		}
	}

	private void logger(HttpServletRequest request, Object handler, Exception ex) {
		StringBuffer msg = new StringBuffer();
		msg.append("�쳣������־");
		msg.append("[uri��").append(request.getRequestURI()).append("]");
		Enumeration<String> enumer = request.getParameterNames();
		while (enumer.hasMoreElements()) {
			String name = (String) enumer.nextElement();
			String[] values = request.getParameterValues(name);
			msg.append("[").append(name).append("=");
			if (values != null) {
				int i = 0;
				for (String value : values) {
					i++;
					msg.append(value);
					if (i < values.length) {
						msg.append("��");
					}
				}
			}
			msg.append("]");
		}
		log.error(msg, ex);
	}
}
