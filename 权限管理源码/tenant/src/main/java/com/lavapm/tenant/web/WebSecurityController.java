package com.lavapm.tenant.web;

import com.lavapm.tenant.dao.TenantDao;
import com.lavapm.tenant.db.UserBean;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.tool.SpringContextUtil;
import com.tendcloud.enterprise.um.umic.entity.App;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.rmi.SecurityService;
import com.tendcloud.enterprise.um.umic.rmi.UmRmiServiceFactory;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebSecurityController {
	private static final Logger logger = Logger.getLogger(WebSecurityController.class);
	public static final String SECURITY_CODE = "securityCode";
	@Autowired
	private TenantDao tenantDao;
	public static String dcdsuserurl;

	public WebSecurityController() {
	}

	@RequestMapping({ "/keepLive" })
	@ResponseBody
	public Map<Object, Object> keepLive(HttpServletRequest request, HttpServletResponse response) {
		return new HashMap();
	}

	@RequestMapping({ "/logout" })
	@ResponseBody
	public Map<String, String> logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		WebApplicationContext applicationContext = WebApplicationContextUtils
				.getWebApplicationContext(request.getSession().getServletContext());
		String url = applicationContext.getBean("serverName") == null ? ""
				: applicationContext.getBean("serverName").toString();
		String casServerLogoutUrl = applicationContext.getBean("casServerLogoutUrl").toString();
		String casServerLoginUrl = applicationContext.getBean("casServerLoginUrl").toString();
		String r = casServerLogoutUrl + "?service=" + URLEncoder.encode(new StringBuilder().append(casServerLoginUrl)
				.append("?service=").append(url).append(request.getContextPath()).append("/").toString(), "UTF8");
		request.getSession().invalidate();
		Map<String, String> resultMap = new HashMap();
		resultMap.put("loginUrl", r);
		return resultMap;
	}

	@RequestMapping({ "/showUser.do" })
	public void showUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Date nowTime = new Date();
		String showUserUrl = dcdsuserurl + nowTime.getTime();
		response.sendRedirect(showUserUrl);
	}

	@RequestMapping({ "/" })
	public ModelAndView mainPage(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		ModelAndView mv = new ModelAndView("index");
		HttpSession session = request.getSession();
		Map<String, Object> appConfig = new HashMap();

		User user = (User) session.getAttribute("user");
		Tenant tenant = new Tenant();
		tenant.setRid(user.getTenantId());
		Map<String, Object> map = new HashMap();
		map.put("tenantId", user.getTenantId());
//		tenant = (Tenant) tenantDao.getTenant(map).get(0);
		// 本地运行
		tenant.setRid(2);
		tenant.setCa_code("lavapm");
		tenant.setCa_name("lavapm");
		tenant.setCa_short_name("lavapm");
		tenant.setPhone("13044152664");
		tenant.setAdmin_name("王静波");
		tenant.setAdmin_email("nike@lavapm.com");
		tenant.setStatus(0);
		
		session.setAttribute("requestUri", request.getRequestURI());
		session.setAttribute("tenant", tenant);
		appConfig.put("Developer", tenant);
		appConfig.put("requestUri", request.getContextPath() + "/");
		appConfig.put("user", session.getAttribute("user"));
		String projectUrl = (String) ((Properties) SpringContextUtil.getBean("sysConfig", Properties.class))
				.get("projectUrl");
		appConfig.put("projectUrl", projectUrl);
		appConfig.put("accreditUser", session.getAttribute("accreditUser"));
		appConfig.put("menuList", session.getAttribute("menuList"));
		appConfig.put("buttonList", session.getAttribute("UserACL"));
		appConfig.put("authList", session.getAttribute("authList"));
		appConfig.put("ProductOption", session.getAttribute("ProductOption"));

		appConfig.put("UserCondition", session.getAttribute("UserCondition"));
		SecurityService securityService = UmRmiServiceFactory.getSecurityService();
		List<App> authAppList = new ArrayList();
		try {
			List<App> allAuthAppList = securityService.getAppByUmId(user.getUmid());
			for (App app : allAuthAppList) {
				if (app.getExtAttr3().equals("1")) {
					authAppList.add(app);
				}
			}
			appConfig.put("authAppList", authAppList);
			session.setAttribute("authAppList", authAppList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("用户APP列表初始化失败！", e);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String json = objectMapper.writeValueAsString(appConfig);
			logger.info(json);
			mv.addObject("appConfig", json);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("APP配置初始化失败！", e);
		}

		return mv;
	}

	@RequestMapping({ "/changeUserPassword.do" })
	@ResponseBody
	public Map<String, Object> changeUserPassword(@RequestBody UserBean userBean, HttpServletRequest request) {
		Map<String, Object> result = new HashMap();
		SecurityService securityService = UmRmiServiceFactory.getSecurityService();
		User user = (User) request.getSession().getAttribute("user");
		try {
			securityService.changeUserPassword(user.getLoginName(), userBean.getOldPassword(),
					userBean.getNewPassword());
			result.put("msg", "修改密码成功");
		} catch (Exception e) {
			logger.error("修改密码异常", e);
			result.put("errMsg", e.getMessage());
		}
		return result;
	}
}
