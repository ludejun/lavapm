package com.enterprise.common.web;

import org.springframework.stereotype.*;
import javax.servlet.http.*;
import java.io.*;
import javax.servlet.*;

@Component
public class SimpleCORSFilter implements Filter
{
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        final HttpServletResponse response = (HttpServletResponse)res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        chain.doFilter(req, res);
    }
    
    public void init(final FilterConfig filterConfig) {
    }
    
    public void destroy() {
    }
}
