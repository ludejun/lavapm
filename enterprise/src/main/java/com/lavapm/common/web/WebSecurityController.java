package com.lavapm.common.web;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;

import com.lavapm.common.constant.DmpThemeEnum;
import com.tendcloud.enterprise.um.umic.entity.App;
import com.tendcloud.enterprise.um.umic.entity.DmpTheme;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.rmi.SecurityService;
import com.tendcloud.enterprise.um.umic.rmi.UmRmiServiceFactory;

@Controller
public class WebSecurityController {
	@Resource(name = "sysConfig")
	private Properties properties;
	private static final Logger logger = Logger.getLogger(WebSecurityController.class);

	@RequestMapping({ "/" })
	public ModelAndView mainPage(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		ModelAndView mv = new ModelAndView("index");
		HttpSession session = request.getSession();

		Map<String, Object> appConfig = new HashMap();
		appConfig.put("user", session.getAttribute("user"));
		appConfig.put("tenant", session.getAttribute("tenant"));
		appConfig.put("accreditUser", session.getAttribute("accreditUser"));
		appConfig.put("menuList", session.getAttribute("menuList"));
		appConfig.put("buttonList", session.getAttribute("UserACL"));
		appConfig.put("authList", session.getAttribute("authList"));
		String changePwdFlag = this.properties.getProperty("changePwdFlag");
		appConfig.put("changePwdFlag", changePwdFlag);

		SecurityService securityService = UmRmiServiceFactory.getSecurityService();

		String[] themeCodes = { DmpThemeEnum.LOGIN_LOGO.themeCode(), DmpThemeEnum.LOGIN_TEXT.themeCode(),
				DmpThemeEnum.COPY_RIGHT_TEXT.themeCode(), DmpThemeEnum.LOGIN_BACKGROUND.themeCode(),
				DmpThemeEnum.PRODUCT_LOGO.themeCode(), DmpThemeEnum.NAV_LOGO.themeCode(),
				DmpThemeEnum.MENU_LOGO.themeCode() };

		partTheme(appConfig, securityService, themeCodes, "");

		User user = (User) request.getSession().getAttribute("user");
		List<App> authAppList = new ArrayList();
		try {
			List<App> allAuthAppList = securityService.getAppByUmId(user.getUmid());
			for (App app : allAuthAppList) {
				if (app.getExtAttr3().equals("1")) {
					authAppList.add(app);
				}
			}
			appConfig.put("authAppList", authAppList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("用户APP列表初始化失败！", e);
		}
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String json = objectMapper.writeValueAsString(appConfig);

			mv.addObject("appConfig", json);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("APP配置初始化失败！", e);
		}
		return mv;
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

	@RequestMapping({ "/changeUserPassword" })
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

	@RequestMapping({ "/uploadLogo" })
	@ResponseBody
	public Map<String, Object> uploadLogo(HttpServletRequest request) throws Exception {
		logger.info("更新LOGO图标......");
		String msg = "";
		String webPath = request.getSession().getServletContext().getRealPath("");

		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		List<?> items = upload.parseRequest(request);
		Iterator iter = items.iterator();
		while (iter.hasNext()) {
			FileItem item = (FileItem) iter.next();
			String fieldName = item.getFieldName();
			String fileName = item.getName();
			String contentType = item.getContentType();
			boolean isInMemory = item.isInMemory();
			long sizeInBytes = item.getSize();
			String logoPath = webPath + "\\images\\app\\common\\logo.png";
			if (!item.isFormField()) {
				logger.info("logoPath == " + logoPath);
				File uploadedFile = new File(logoPath);
				item.write(uploadedFile);
				if (item != null) {
					item.delete();
				}
				msg = "LOGO更新成功！";
			}
		}
		Map<String, Object> resultMap = new HashMap();
		if (!StringUtils.isEmpty(msg)) {
			resultMap.put("success", Boolean.valueOf(true));
			resultMap.put("msg", msg);
		} else {
			resultMap.put("success", Boolean.valueOf(false));
			resultMap.put("msg", "LOGO更新失败！");
		}
		return resultMap;
	}

	@RequestMapping({ "/keepLive" })
	@ResponseBody
	public Map<String, Object> keepLive(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap();
		HttpSession session = request.getSession();
		if (session != null) {
			resultMap.put("success", Boolean.valueOf(true));
			resultMap.put("msg", "enterprise keppLive success");
		} else {
			logger.info("enterprise keppLive fail");
			resultMap.put("success", Boolean.valueOf(false));
			resultMap.put("msg", "enterprise keppLive fail");
		}
		return resultMap;
	}

	private Map<String, Object> partTheme(Map<String, Object> appConfig, SecurityService securityService,
			String[] themeCodes, String resourcePath) {
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
		String ssoServerName = (String) webApplicationContext.getBean("serverName");

		String basePath = ssoServerName + "/theme/";

		List<DmpTheme> dmpThemes = securityService.loadDmpTheme("", themeCodes);
		if ((dmpThemes != null) && (dmpThemes.size() > 0)) {
			for (DmpTheme dmpTheme : dmpThemes) {
				appConfig.put(dmpTheme.getCode(), dmpTheme.getValue());
			}
		}
		return appConfig;
	}
}
