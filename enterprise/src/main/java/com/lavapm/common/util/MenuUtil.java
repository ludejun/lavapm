package com.lavapm.common.util;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.tendcloud.enterprise.um.umic.entity.ExtResource;

public class MenuUtil {
	public static Map<String, Object> buildUserAppAuth(List<LinkedHashMap<String, Object>> menuList,
			List<LinkedHashMap<String, Object>> buttonList) throws IllegalAccessException, InvocationTargetException {
		Map<String, Object> userAppAuth = new HashMap();

		List<ExtResource> mList = formateToMenu(menuList);
		for (ExtResource menu : mList) {
			getChildren(menu, mList);
		}
		ExtResource root = getRootMenu(mList);

		List<ExtResource> list2 = new ArrayList();
		for (ExtResource menu : mList) {
			if (menu.getPrid().equals(root.getRid())) {
				list2.add(menu);
			}
		}
		userAppAuth.put("menuList", list2);

		List<String> authList = new ArrayList();
		for (ExtResource menu : mList) {
			String attr = menu.getExtAttr1();
			if (!StringUtils.isBlank(attr)) {
				if (attr.contains(",")) {
					for (String s : attr.split(",")) {
						authList.add(s);
					}
				} else if (!StringUtils.isBlank(attr)) {
					authList.add(attr);
				}
			}
		}
		userAppAuth.put("authList", authList);

		List<ExtResource> buttonsList = formateToMenu(buttonList);
		for (ExtResource button : buttonsList) {
			button.setResourceDesc(button.getResourceUri());
			String attr = button.getExtAttr1();
			if (!StringUtils.isBlank(attr)) {
				if (attr.contains(",")) {
					for (String s : attr.split(",")) {
						authList.add(s);
					}
				} else if (!StringUtils.isBlank(attr)) {
					authList.add(attr);
				}
			}
		}
		userAppAuth.put("buttonList", buttonsList);

		return userAppAuth;
	}

	private static boolean isParrent(List<LinkedHashMap<String, Object>> list, String resourceId) {
		boolean isParent = false;
		int size = resourceId.length();
		for (LinkedHashMap<String, Object> map : list) {
			if ((map.get("resourceCode") != null) && (!map.get("resourceCode").toString().equals("root"))) {
				String resourceId2 = map.get("resourceCode").toString();
				if (resourceId.length() < resourceId2.length()) {
					resourceId2 = resourceId2.substring(0, size);
					if (resourceId.equals(resourceId2)) {
						isParent = true;
						break;
					}
				}
			}
		}
		return isParent;
	}

	private static ExtResource getRootMenu(List<ExtResource> menuList) {
		ExtResource menu = null;
		for (ExtResource temp : menuList) {
			if (temp.getPrid().equals(Integer.valueOf(0))) {
				menu = temp;
			}
		}
		return menu;
	}

	private static void getChildren(ExtResource menu, List<ExtResource> list) {
		List<ExtResource> mList = new ArrayList();
		for (ExtResource temp : list) {
			if (menu.getRid().equals(temp.getPrid())) {
				mList.add(temp);
			}
		}
		menu.setChildrens(mList);
	}

	private static List<ExtResource> formateToMenu(List<LinkedHashMap<String, Object>> list) {
		List<ExtResource> menuList = new ArrayList();
		for (LinkedHashMap<String, Object> linkedHashMap : list) {
			ExtResource menu = new ExtResource();
			menu.setRid((Integer) linkedHashMap.get("rid"));
			menu.setPrid((Integer) linkedHashMap.get("parentResourceRid"));
			menu.setResourceDesc(
					linkedHashMap.get("resourceUri") == null ? null : linkedHashMap.get("resourceUri").toString());
			menu.setResourceId(
					linkedHashMap.get("resourceCode") == null ? null : linkedHashMap.get("resourceCode").toString());
			menu.setResourceLabel(
					linkedHashMap.get("resourceName") == null ? null : linkedHashMap.get("resourceName").toString());
			menu.setAction(
					linkedHashMap.get("resourceName") == null ? null : linkedHashMap.get("resourceName").toString());
			menu.setAppRid((Integer) linkedHashMap.get("appRid"));
			menu.setExtAttr1(linkedHashMap.get("extAttr1") == null ? null : linkedHashMap.get("extAttr1").toString());
			menu.setExtAttr2(linkedHashMap.get("extAttr2") == null ? null : linkedHashMap.get("extAttr2").toString());
			menu.setExtAttr3(linkedHashMap.get("extAttr3") == null ? null : linkedHashMap.get("extAttr3").toString());
			menu.setExtAttr4(linkedHashMap.get("extAttr4") == null ? null : linkedHashMap.get("extAttr4").toString());
			menu.setExtAttr5(linkedHashMap.get("extAttr5") == null ? null : linkedHashMap.get("extAttr5").toString());
			menu.setExtAttr6(linkedHashMap.get("extAttr6") == null ? null : linkedHashMap.get("extAttr6").toString());
			menu.setParentResourceRid((Integer) linkedHashMap.get("parentResourceRid"));
			menu.setResourceCode(
					linkedHashMap.get("resourceCode") == null ? null : linkedHashMap.get("resourceCode").toString());
			menu.setResourceName(
					linkedHashMap.get("resourceName") == null ? null : linkedHashMap.get("resourceName").toString());
			menu.setResourceTypeRid((Integer) linkedHashMap.get("resourceTypeRid"));
			menu.setResourceUri(
					linkedHashMap.get("resourceUri") == null ? null : linkedHashMap.get("resourceUri").toString());
			menu.setParentId(linkedHashMap.get("parentId") == null ? null : linkedHashMap.get("parentId").toString());
			menuList.add(menu);
		}
		return menuList;
	}
}
