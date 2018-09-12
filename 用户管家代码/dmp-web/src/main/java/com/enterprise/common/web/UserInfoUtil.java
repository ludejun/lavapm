package com.enterprise.common.web;

import javax.servlet.http.*;
import org.springframework.web.context.request.*;
import com.tendcloud.enterprise.um.umic.entity.*;

public class UserInfoUtil
{
    private static HttpSession getSession() {
        final HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
        return session;
    }
    
    public static void setUser(User user) {
    }
    
    public static User getUser() {
        User user = (User)getSession().getAttribute("user");
        return user;
    }
    
    public static Tenant getTenant() throws Exception {
        final Tenant tenant = (Tenant)getSession().getAttribute("tenant");
        return tenant;
    }
    
    public static AccreditUser getAccreditUser() {
        return (AccreditUser)getSession().getAttribute("accreditUser");
    }
    
    public static String getLoginName() {
        String loginName = "";
        User user = getUser();
        if (user != null) {
            loginName = user.getLoginName();
        }
        return loginName;
    }
    
    public static String getCNName() {
        String name = "";
        User user = getUser();
        if (user != null) {
            name = user.getName();
        }
        return name;
    }
    
    public static String getUserName() {
        String name = "";
        User user = getUser();
        if (user != null) {
            name = user.getUserName();
        }
        return name;
    }
}
