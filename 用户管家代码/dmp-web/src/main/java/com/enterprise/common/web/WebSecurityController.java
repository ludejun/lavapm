package com.enterprise.common.web;

import org.springframework.stereotype.*;
import org.apache.log4j.*;
import org.springframework.web.context.support.*;
import java.net.*;
import org.springframework.web.context.*;
import java.io.*;
import org.springframework.ui.*;
import org.springframework.web.servlet.*;
import td.enterprise.dmp.common.config.*;
import td.enterprise.dmp.common.constant.*;
import org.codehaus.jackson.map.*;
import javax.servlet.http.*;
import com.tendcloud.enterprise.um.umic.rmi.*;
import org.springframework.web.bind.annotation.*;
import com.tendcloud.enterprise.um.umic.entity.*;
import java.util.*;

@Controller
public class WebSecurityController
{
    private static final Logger logger = Logger.getLogger(WebSecurityController.class);
    public static final String SECURITY_CODE = "securityCode";
    private static final String APP_VERSION = System.currentTimeMillis() + "";
    public static String dcdsuserurl;
    
    @RequestMapping({ "/keepLive" })
    @ResponseBody
    public Map<Object, Object> keepLive(HttpServletRequest request, HttpServletResponse response) {
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping({ "/logout" })
    @ResponseBody
    public Map<String, String> logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        WebApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
        String url = (applicationContext.getBean("serverName") == null) ? "" : applicationContext.getBean("serverName").toString();
        String casServerLogoutUrl = applicationContext.getBean("casServerLogoutUrl").toString();
        String casServerLoginUrl = applicationContext.getBean("casServerLoginUrl").toString();
        String r = casServerLogoutUrl + "?service=" + URLEncoder.encode(casServerLoginUrl + "?service=" + url + request.getContextPath() + "/", "UTF8");
        request.getSession().invalidate();
        Map<String, String> resultMap = new HashMap<String, String>();
        resultMap.put("loginUrl", r);
        return resultMap;
    }
    
    @RequestMapping({ "/showUser.do" })
    public void showUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Date nowTime = new Date();
        String showUserUrl = WebSecurityController.dcdsuserurl + nowTime.getTime();
        response.sendRedirect(showUserUrl);
    }
    
    @RequestMapping({ "/" })
    public ModelAndView mainPage(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        ModelAndView mv = new ModelAndView("index");
        HttpSession session = request.getSession();
//        Configuration conf = Configuration.getInstance();
        Map<String, Object> appConfig = new HashMap<String, Object>();
        appConfig.put("user", session.getAttribute("user"));
        appConfig.put("accreditUser", session.getAttribute("accreditUser"));
        appConfig.put("menuList", session.getAttribute("menuList"));
        appConfig.put("buttonList", session.getAttribute("UserACL"));
        appConfig.put("authList", session.getAttribute("authList"));
        appConfig.put("appVersion", WebSecurityController.APP_VERSION);
//        appConfig.put("dmpTenantEnable", conf.getConfig("dmp.tenant.enable"));
//        appConfig.put("dmpDefaultTenantId", conf.getConfig("dmp.tenant.defaultTenantId"));
//        appConfig.put("dmpDataTagDefineMaxTimeRange", conf.getConfig("dmp.data.tagdefine.max.timerange"));
//        appConfig.put("dmpDataUserProfileXaxTimerRnge", conf.getConfig("dmp.data.userprofile.max.timerange"));
//        appConfig.put("crowdportraitLocationConfig", conf.getConfig("dmp.metadata.crowdPortrait.location.config"));
//        String resourcePath = conf.getConfig(ParamConstants.DmpThemeEnum.RESOURCE_PATH.themeCode());
        SecurityService securityService = UmRmiServiceFactory.getSecurityService();
        String[] themeCodes = { ParamConstants.DmpThemeEnum.LOGIN_LOGO.themeCode(), ParamConstants.DmpThemeEnum.LOGIN_TEXT.themeCode(), ParamConstants.DmpThemeEnum.COPY_RIGHT_TEXT.themeCode(), ParamConstants.DmpThemeEnum.LOGIN_BACKGROUND.themeCode(), ParamConstants.DmpThemeEnum.PRODUCT_LOGO.themeCode(), ParamConstants.DmpThemeEnum.NAV_LOGO.themeCode(), ParamConstants.DmpThemeEnum.MENU_LOGO.themeCode() };
//        partTheme(appConfig, securityService, themeCodes, resourcePath);
        partTheme(appConfig, securityService, themeCodes, "");
        try {
            Map<String, String> pluginMap = new HashMap<String, String>();
//            pluginMap.put("analyticsVersion", conf.getConfig("dmp.plugin.analytics.version"));
            appConfig.put("pluginMap", pluginMap);
            Map<String, String> urlMap = new HashMap<String, String>();
//            urlMap.put("batchmanagerUrl", conf.getConfig("batchmanager.server.url"));
//            urlMap.put("batchmanagerUser", conf.getConfig("batchmanager.server.username"));
//            urlMap.put("batchmanagerPassword", conf.getConfig("batchmanager.server.passwd"));
            appConfig.put("urlMap", urlMap);
        }
        catch (Exception e) {
            e.printStackTrace();
            logger.error("模块链接初始化失败！", e);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(appConfig);
            mv.addObject("appConfig", json);
        }
        catch (Exception e2) {
            e2.printStackTrace();
            logger.error("APP配置初始化失败！", e2);
        }
        try {
            InitDmpSystemDataService.initSystemData();
        }
        catch (Exception e2) {
            e2.printStackTrace();
            logger.error("租户首次登陆后，系统数据的初始化异常", e2);
        }
        return mv;
    }
    
    @RequestMapping({ "/changeUserPassword.do" })
    @ResponseBody
    public Map<String, Object> changeUserPassword(@RequestBody UserBean userBean, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        SecurityService securityService = UmRmiServiceFactory.getSecurityService();
        User user = (User)request.getSession().getAttribute("user");
        try {
            securityService.changeUserPassword(user.getLoginName(), userBean.getOldPassword(), userBean.getNewPassword());
            result.put("msg", "修改密码成功");
        }
        catch (Exception e) {
            logger.error("修改密码异常", e);
            result.put("errMsg", e.getMessage());
        }
        return result;
    }
    
    @RequestMapping({ "/dmpWebKeepLive" })
    @ResponseBody
    public Map<String, Object> keepLive(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        HttpSession session = request.getSession();
        if (session != null) {
            resultMap.put("success", true);
            resultMap.put("msg", "dmp-web keppLive success");
        }
        else {
            WebSecurityController.logger.info("dmp-web keppLive fail");
            resultMap.put("success", false);
            resultMap.put("msg", "dmp-web keppLive fail");
        }
        return resultMap;
    }
    
    private Map<String, Object> partTheme(Map<String, Object> appConfig, SecurityService securityService, String[] themeCodes, String resourcePath) {
        List<DmpTheme> dmpThemes = securityService.loadDmpTheme("", themeCodes);
        if (dmpThemes != null && dmpThemes.size() > 0) {
            for (DmpTheme dmpTheme : dmpThemes) {
                appConfig.put(dmpTheme.getCode(), dmpTheme.getValue());
            }
        }
        return appConfig;
    }
}
