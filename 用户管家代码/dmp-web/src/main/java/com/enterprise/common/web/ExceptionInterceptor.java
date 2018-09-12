package com.enterprise.common.web;

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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import td.enterprise.dmp.common.exception.BusinessException;

public class ExceptionInterceptor extends HandlerInterceptorAdapter
{
    private static final Log log = LogFactory.getLog(ExceptionInterceptor.class);
    
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        if (ex != null) {
            String msg = "";
            String errorCode = "";
            if (ex instanceof NullPointerException) {
                msg = "空指针异常";
            }
            else if (ex instanceof IOException) {
                msg = "文件读写异常";
            }
            else if (ex instanceof BusinessException) {
                msg = MessageHelper.getErrorMessage((BusinessException)ex);
                errorCode = ((BusinessException)ex).getErrorCode();
            }
            else if (ex instanceof DataIntegrityViolationException) {
                msg = "数据处理异常，请联系管理员！";
            }
            else if (ex instanceof RuntimeException) {
                msg = "操作失败，请联系管理员！";
            }
            else {
                msg = "操作失败，请联系管理员！";
            }
            logger(request, handler, ex);
            response.setStatus(503);
            Map<String, Object> result = new HashMap<String, Object>();
            result.put("success", false);
            result.put("msg", msg);
            result.put("errorCode", errorCode);
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                String resultStr = objectMapper.writeValueAsString((Object)result);
                response.setHeader("Pragma", "No-cache");
                response.setHeader("Cache-Control", "no-cache");
                response.setCharacterEncoding("UTF-8");
                response.setContentType("application/json");
                PrintWriter out = response.getWriter();
                out.print(resultStr);
                out.flush();
                out.close();
            }
            catch (Exception e) {
                e.printStackTrace();
                log.error(msg, e);
            }
        }
        else {
            super.afterCompletion(request, response, handler, ex);
        }
    }
    
    private void logger(HttpServletRequest request, Object handler, Exception ex) {
        StringBuffer msg = new StringBuffer();
        msg.append("异常拦截日志");
        msg.append("[uri＝").append(request.getRequestURI()).append("]");
        Enumeration<String> enumer = (Enumeration<String>)request.getParameterNames();
        while (enumer.hasMoreElements()) {
            String name = enumer.nextElement();
            String[] values = request.getParameterValues(name);
            msg.append("[").append(name).append("=");
            if (values != null) {
                int i = 0;
                for (String value : values) {
                    ++i;
                    msg.append(value);
                    if (i < values.length) {
                        msg.append("｜");
                    }
                }
            }
            msg.append("]");
        }
        log.error(msg, ex);
    }
}
