package com.lavapm.common.web;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tendcloud.enterprise.um.umic.entity.AccreditUser;
import com.tendcloud.enterprise.um.umic.entity.Tenant;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.rmi.UmRmiServiceFactory;

public class UserInfoUtil {
	private static HttpSession getSession() {
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
				.getSession();

		return session;
	}

	public static void setUser(User user) {
	}

	public static User getUser() {
		User user = (User) getSession().getAttribute("user");
		return user;
	}

	public static Tenant getTenant() throws Exception {
		Tenant tenant = (Tenant) getSession().getAttribute("tenant");
		return tenant;
	}

	public static void main(String[] args) throws Exception {
		Tenant q = new Tenant();
		List<Tenant> tenantList = UmRmiServiceFactory.getSecurityService().queryAllTenants(q);
		ObjectMapper objectMapper = new ObjectMapper();
		for (Tenant tenant : tenantList) {
			System.out.println(objectMapper.writeValueAsString(tenant));
		}
	}

	public static AccreditUser getAccreditUser() {
		return (AccreditUser) getSession().getAttribute("accreditUser");
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
