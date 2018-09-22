package com.lavapm.tenant.control;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lavapm.tenant.bean.BEAN;
import com.lavapm.tenant.bean.CustomEventDictionary;
import com.lavapm.tenant.control.frame.CustomEventDictionaryFrame;
import com.lavapm.tenant.dao.ResourceDao;
import com.lavapm.tenant.dao.UserDao;
import com.lavapm.tenant.entity.App;
import com.lavapm.tenant.entity.Resource;
import com.lavapm.tenant.entity.ResourceType;
import com.lavapm.tenant.entity.ResourceTypePage;
import com.lavapm.tenant.entity.Role;
import com.lavapm.tenant.entity.RoleResource;
import com.lavapm.tenant.entity.RoleUser;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.tool.Msg;
import com.lavapm.tenant.tool.ParameterBean;
import com.lavapm.tenant.tool.Pinyin4jUtil;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.util.UserInfoUtil;
import java.io.IOException;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("resourceControl")
public class ResourceControl {
	private static final Logger logger = LoggerFactory.getLogger(ResourceControl.class);

	@Autowired
	private ResourceDao resourceDao;

	@Autowired
	private UserDao userDao;

	private ObjectMapper mapper;

	public ResourceControl() {
	}

	public Map<String, Object> queryTreeList(Map<String, Object> params) {
		boolean flg = true;
		List<RoleResource> checked = null;
		if ((params.get("rids") != null) && (!"".equals(params.get("rids")))) {
			checked = resourceDao.getRoleResourceTree(params);
		}
		Map<String, Object> map = new HashMap();
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Resource> resources = new ArrayList();
		List<Resource> list;
		Resource root;
		if (!"28".equals(params.get("resourceTypeRid") + "")) {
			List<String> resourceTypes = resourceDao.getResourceType(params);
			for (String type : resourceTypes) {
				params.put("resourceTypeRid", type);
				list = resourceDao.findList(params);
				if ((checked != null) && (checked.size() > 0)) {
					flg = false;
					getRoleResourceTree(list, checked);
				}

				root = (list != null) && (list.size() > 0) ? (Resource) list.get(0) : null;
				if ((list != null) && (list.size() > 0) && (root != null)) {
					for (Resource temp : list) {
						findParentChildren(temp, list);

						if (temp.getRid().equals(root.getRid())) {
							resources.add(temp);
						}
					}
				}
			}
		} else {
			list = resourceDao.findList(params);
			if ((checked != null) && (checked.size() > 0)) {
				flg = false;
				getRoleResourceTree(list, checked);
			}

			root = (list != null) && (list.size() > 0) ? (Resource) list.get(0) : null;
			if ((list != null) && (list.size() > 0) && (root != null)) {
				for (Resource temp : list) {
					findParentChildren(temp, list);

					if (temp.getRid().equals(root.getRid())) {
						resources.add(temp);
					}
				}
			}
		}

		map.put("list", resources);
		map.put("flg", Boolean.valueOf(flg));
		return map;
	}

	public Map<String, Object> queryProductList(Map<String, Object> params) {
		boolean flg = true;
		List<RoleResource> checked = null;
		if ((params.get("rids") != null) && (!"".equals(params.get("rids")))) {
			checked = resourceDao.getRoleResourceTree(params);
		}
		Map<String, Object> map = new HashMap();
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Resource> resources = new ArrayList();

		List<Resource> list = resourceDao.findList(params);
		if ((checked != null) && (checked.size() > 0)) {
			flg = false;
			getRoleResourceTree(list, checked);
		}

		Resource root = (list != null) && (list.size() > 0) ? (Resource) list.get(0) : null;
		if ((list != null) && (list.size() > 0) && (root != null)) {
			for (Resource temp : list) {
				findParentChildren(temp, list);

				if (temp.getRid().equals(root.getRid())) {
					resources.add(temp);
				}
			}
		}

		map.put("list", resources);
		map.put("flg", Boolean.valueOf(flg));
		return map;
	}

	public Map<String, Object> findUserList(Map<String, Object> params) {
		boolean flg = true;
		List<RoleResource> checked = null;
		if ((params.get("rids") != null) && (!"".equals(params.get("rids")))) {
			checked = resourceDao.getRoleResourceTree(params);
		}
		Map<String, Object> map = new HashMap();
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Resource> resources = new ArrayList();
		List<String> resourceTypes = resourceDao.getResourceType(params);
		for (String type : resourceTypes) {
			params.put("resourceTypeRid", type);
			List<Resource> list = resourceDao.findUserList(params);
			if ((checked != null) && (checked.size() > 0)) {
				flg = false;
				getRoleResourceTree(list, checked);
			}

			Resource root = (list != null) && (list.size() > 0) ? (Resource) list.get(0) : null;
			if ((list != null) && (list.size() > 0) && (root != null)) {
				for (Resource temp : list) {
					findParentChildren(temp, list);

					if (temp.getRid().equals(root.getRid())) {
						resources.add(temp);
					}
				}
			}
		}
		List<Resource> list;
		Resource root;
		map.put("list", resources);
		map.put("flg", Boolean.valueOf(flg));
		return map;
	}

	public Map<String, Object> queryProductTreeList(Map<String, Object> params) {
		boolean flg = true;
		List<RoleResource> checked = null;
		if ((params.get("rids") != null) && (!"".equals(params.get("rids")))) {
			checked = resourceDao.getRoleResourceTree(params);
		}

		List<Resource> list = resourceDao.getProductManageAllTree(params);
		if ((checked != null) && (checked.size() > 0)) {
			flg = false;
			getRoleResourceTree(list, checked);
		}
		Map<String, Object> map = new HashMap();
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Resource> resources = new ArrayList();
		Resource root;
		if ((list != null) && (list.size() > 0)) {
			params.put("parentResourceRid", Integer.valueOf(0));
			root = resourceDao.getProductManageAllTree(params).size() > 0
					? (Resource) resourceDao.getProductManageAllTree(params).get(0) : null;
			if (root != null) {
				for (Resource temp : list) {
					findParentChildren(temp, list);

					if (temp.getRid().equals(root.getRid())) {
						resources.add(temp);
					}
				}
			}
		}

		map.put("list", resources);
		map.put("flg", Boolean.valueOf(flg));
		return map;
	}

	public List<Resource> getRoleResourceTree(List<Resource> all, List<RoleResource> checked) {
		for (Iterator<Resource> it = all.iterator(); it.hasNext();) {
			Resource roleRes = it.next();
			for (RoleResource roleChecked : checked) {
				if (roleRes.getRid().intValue() == roleChecked.getResourceRid().intValue()) {
					roleRes.setChecked(true);
				}
			}
		}
		Resource roleRes;
		return all;
	}

	private void findParentChildren(Resource root, List<Resource> list) {
		List<Resource> results = new ArrayList();
		for (Resource temp : list) {
			if (temp.getParentResourceRid().equals(root.getRid())) {
				results.add(temp);
			}
		}
		root.setChildren(results);
	}

	public Map<String, Object> c_save(Tenant tenant, Map<String, Object> params) {
		String opUser = UserInfoUtil.getUser().getUmid();
		String tids = params.get("tids") + "";
		String rids = params.get("rids") + "";

		Templetmanage templetmanage = new Templetmanage();

		if (isTempletNameExist(params)) {
			return Msg.getFailureMessage("妯℃澘鍚嶇О宸插瓨鍦�");
		}
		templetmanage.setT_name(params.get("roleName") + "");
		templetmanage.setT_desc(params.get("roleDesc") != null ? params.get("roleDesc") + "" : "");
		templetmanage.setOp_umid(opUser);
		templetmanage.setTenantId(tenant.getRid().intValue());
		Role role = new Role();
		role.setRoleName(params.get("roleName") + "");
		role.setRoleDesc(params.get("roleDesc") != null ? params.get("roleDesc") + "" : "");
		role.setTenantId(tenant.getRid().intValue());
		role.setOpUmid(params.get("umid") + "");
		List<Integer> listrid = new ArrayList();
		if ((!tids.equals("null")) && (!"".equals(tids))) {
			return c_update(rids, tids, params);
		}
		boolean istrue = true;

		List<Map<String, Object>> _repotresList = (List) params.get("_repotresList");
		String oldappid = "";
		int roleRid = 0;
		for (Map<String, Object> keyValue : _repotresList) {
			if ((keyValue.get("value") != null) && (!"".endsWith(keyValue.get("value") + ""))) {
				istrue = false;
				String key = keyValue.get("key") + "";
				String[] keys = key.split("_");
				role.setAppRid(Integer.valueOf(Integer.parseInt(keys[0])));

				String rolecode = Pinyin4jUtil.getRoleCode(params.get("roleName") + "", tenant.getRid() + "" + keys[0]);
				role.setRoleCode(rolecode);
				if (isRoleCodeExist(role)) {
					return Msg.getFailureMessage("瑙掕壊宸插瓨鍦ㄨ鏇存崲妯℃澘鍚嶇О");
				}
				if (!keys[0].equals(oldappid)) {
					oldappid = keys[0];
					roleRid = resourceDao.insertRole(role);
					listrid.add(Integer.valueOf(roleRid));
				}

				String resourceRids = keyValue.get("value") + "";
				String appRid = keys[0];
				String resourceTypeRid = keys[1];
				saveData(resourceRids, Integer.valueOf(roleRid), appRid, resourceTypeRid, opUser);
			}
		}
		if (istrue) {
			return Msg.getFailureMessage("璇烽�夋嫨閰嶇疆");
		}
		for (Integer rid : listrid) {
			templetmanage.setRid(rid.intValue());
			resourceDao.insertTempletmanage(templetmanage);
		}

		return Msg.getSuccessMessage("妯℃澘娣诲姞鎴愬姛!");
	}

	public Map<String, Object> c_update(String rids, String tids, Map<String, Object> params) {
		Resource page = new Resource();

		page.setRids(rids);

		resourceDao.deleteRoleResourceTree(page);
		String opUser = UserInfoUtil.getUser().getUmid();
		String type = params.get("type") + "";
		if (!type.equals("0")) {
			opUser = "";
		}
		Templetmanage templetmanage = new Templetmanage();
		if (isTempletNameExist(params)) {
			return Msg.getFailureMessage("妯℃澘鍚嶇О宸插瓨鍦�");
		}
		templetmanage.setT_name(params.get("roleName") + "");
		templetmanage.setT_desc(params.get("roleDesc") + "");
		if (type.equals("0")) {
			templetmanage.setOp_umid(opUser);
		}
		templetmanage.setTenantId(Integer.parseInt(params.get("tenantId") + ""));

		List<RoleUser> roleUserlist = new ArrayList();
		List<Integer> listrid = new ArrayList();
		roleUserlist = resourceDao.getRoleUser(params);
		resourceDao.deleteRoleUserByRids(page);
		boolean istrue = true;

		List<Map<String, Object>> _repotresList = (List) params.get("_repotresList");
		int roleRid = 0;
		for (Map<String, Object> keyValue : _repotresList) {
			istrue = false;
			String key = keyValue.get("key") + "";
			String[] keys = key.split("_");
			params.put("appRid", keys[0]);
			Role role = resourceDao.getRolebyAppRidRoleRids(params);

			if ((role != null) && (role.getRid().intValue() != roleRid) && (keyValue.get("value") != null)
					&& (!"".endsWith(keyValue.get("value") + ""))) {
				roleRid = role.getRid().intValue();
				listrid.add(Integer.valueOf(roleRid));
			} else if ((role == null) && (keyValue.get("value") != null)
					&& (!"".endsWith(keyValue.get("value") + ""))) {
				roleRid = saveRole(params, keys[0]);
				listrid.add(Integer.valueOf(roleRid));
			} else if ((role != null)
					&& ((keyValue.get("value") == null) || ("".endsWith(keyValue.get("value") + "")))) {
				resourceDao.deleteByPrimaryKey(role.getRid());
				resourceDao.deleteTempletmanageByAppid(role.getRid());
			}
			if (roleRid != 0) {
				String resourceRids = keyValue.get("value") + "";
				String appRid = keys[0];
				String resourceTypeRid = keys[1];
				saveData(resourceRids, Integer.valueOf(roleRid), appRid, resourceTypeRid, opUser);
			}
		}

		if (istrue) {
			return Msg.getFailureMessage("璇烽�夋嫨閰嶇疆");
		}
		for (Iterator<Integer> it = listrid.iterator(); it.hasNext();) {
			Integer rid = it.next();
			templetmanage.setRid(rid.intValue());
			templetmanage.setTids(tids);
			params.put("roleId", rid);
			params.put("tids", tids);
			List<Templetmanage> listtem = resourceDao.getTempletmanageByRoleId(params);
			if ((listtem != null) && (listtem.size() > 0)) {
				resourceDao.updateTempletmanageByTids(templetmanage);
			} else {
				resourceDao.insertTempletmanage(templetmanage);
			}

			for (RoleUser _user : roleUserlist) {
				RoleUser r = new RoleUser();
				r.setRoleRid(rid);
				r.setUserRid(_user.getUserRid() + "");
				r.setIsGrantable(Integer.valueOf(0));
				r.setCreateTime(new Date());
				if (type.equals("0")) {
					r.setGrantedBy(opUser);
				}
				userDao.insertRoleUser(r);
			}
		}
		Integer rid;
		return Msg.getSuccessMessage("妯℃澘淇敼鎴愬姛!");
	}

	public int saveRole(Map<String, Object> params, String apprid) {
		Role role = new Role();
		role.setRoleName(params.get("roleName") + "");
		role.setRoleDesc(params.get("roleDesc") + "");
		role.setTenantId(Integer.parseInt(params.get("tenantId") + ""));
		role.setOpUmid(params.get("umid") + "");
		role.setAppRid(Integer.valueOf(Integer.parseInt(apprid)));
		String rolecode = Pinyin4jUtil.getRoleCode(params.get("roleName") + "",
				params.get("tenantId") + "" + "" + apprid);
		role.setRoleCode(rolecode);
		int roleRid = resourceDao.insertRole(role);
		return roleRid;
	}

	private boolean isTempletNameExist(Map<String, Object> params) {
		int count = resourceDao.isTempletNameExist(params);
		if (count > 0) {
			return true;
		}
		return false;
	}

	public void saveData(String resourceRids, Integer roleRid, String appRid, String resourceTypeRid, String opUmid) {
		Map<String, Object> param = new HashMap();
		param.put("roleRid", roleRid);
		param.put("appRid", appRid);
		param.put("resourceTypeRid", resourceTypeRid);

		String[] resourceRidArr = resourceRids.split("_");
		for (String resourceRid : resourceRidArr) {
			if (!StringUtils.isEmpty(resourceRid)) {
				RoleResource r = new RoleResource();
				r.setRoleRid(roleRid);
				r.setResourceRid(Integer.valueOf(Integer.parseInt(resourceRid)));
				r.setCreateTime(new Date());
				if ((opUmid != null) && (!"".equals(opUmid))) {
					r.setOpUmid(opUmid);
				}
				resourceDao.insertresourceRole(r);
			}
		}
	}

	public boolean isRoleCodeExist(Role entity) {
		int count = resourceDao.queryRoleByCount(entity);
		if (count > 0) {
			return true;
		}
		return false;
	}

	public boolean isRoleCodeExistWhenUpdate(Role entity) {
		int count = resourceDao.queryNotRidRoleCodeCount(entity);
		if (count > 0) {
			return true;
		}
		return false;
	}

	public boolean hasAppRid(String umid, Integer appRid) {
		Map param = new HashMap();
		param.put("umid", umid);
		param.put("appRid", appRid);
		int count = resourceDao.hasAppRid(param);
		if (count > 0) {
			return true;
		}
		return false;
	}

	public Map<String, Object> c_delete(String rids, String tids) {
		User opUser = UserInfoUtil.getUser();
		String[] id = rids.split(",");
		try {
			Resource page = new Resource();

			page.setRids(rids);

			resourceDao.deleteRoleResourceTree(page);

			resourceDao.deleteRoleUserByRids(page);

			for (String string : id) {
				resourceDao.deleteRoleByPrimaryKey(Integer.valueOf(Integer.parseInt(string)));
			}

			resourceDao.deleteTempletmanageByTids(tids);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return Msg.getSuccessMessage("瑙掕壊鍒犻櫎鎴愬姛!");
	}

	public void deleteRoleAndRelative(Object[] ids) throws Exception {
		if ((ids == null) || (ids.length < 1)) {
			return;
		}
		for (Object id : ids) {

			resourceDao.deleteUserByRoleRid(id);

			resourceDao.deleteResourceByRoleRid(id);

			resourceDao.deleteRoleByPrimaryKey(Integer.valueOf(Integer.parseInt(id + "")));
		}
	}

	public String getroleallbydepartmentId(Role role) {
		List<Role> list = resourceDao.getroleallbydepartmentId(role);
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		String info = cedFrame.getRoleFrame(list);
		return info;
	}

	public String getroleallbydepartmentId(Templetmanage templetmanage, Map<String, Object> params) {
		List<RoleUser> adminList = resourceDao.isAdmin(params);
		List<Templetmanage> list = new ArrayList();
		if (adminList.size() > 0) {
			list = resourceDao.getroleallbydepartmentIdAll(templetmanage);
		} else {
			list = resourceDao.getroleallbydepartmentId(templetmanage);
		}
		List<Templetmanage> alllist = new ArrayList();
		LinkedHashMap<String, Templetmanage> map = new LinkedHashMap();
		for (Templetmanage templetmanage2 : list) {
			String rids = "";
			String tids = "";
			int type = 0;
			for (Templetmanage templetmanage3 : list) {
				if ((templetmanage2.getT_name().equals(templetmanage3.getT_name()))
						&& (templetmanage2.getTenantId() == templetmanage3.getTenantId())) {

					if (templetmanage3.getType() != 0) {
						type = 2;
					}
					rids = rids + templetmanage3.getRid() + ",";
					tids = tids + templetmanage3.getTid() + ",";
				}
			}
			rids = rids != "" ? rids.substring(0, rids.lastIndexOf(",")) : "";
			tids = tids != "" ? tids.substring(0, tids.lastIndexOf(",")) : "";
			templetmanage2.setRids(rids);
			templetmanage2.setTids(tids);
			templetmanage2.setType(type);
			map.put(tids, templetmanage2);
		}

		for (Map.Entry<String, Templetmanage> entry : map.entrySet()) {
			Templetmanage t = (Templetmanage) entry.getValue();
			alllist.add(t);
		}
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		String info = cedFrame.getTempletmanageFrame(alllist);
		return info;
	}

	public String getCustomEventDictionary(HttpServletRequest request, Map<String, String> params) {
		String info = "";

		String productid = (String) params.get("productid");

		ParameterBean parameterBean = new ParameterBean();

		parameterBean.setEventid((String) params.get("eventid"));
		parameterBean.setDisplayname((String) params.get("displayname"));
		parameterBean.setIsforbid((String) params.get("isforbid"));
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		parameterBean.setProductID(Integer.parseInt(productid));

		List<CustomEventDictionary> cedList = resourceDao.getCustomEventDictionary(parameterBean);

		info = cedFrame.getCustomEventDictionaryFrame(cedList);

		return info;
	}

	public String getStopedEvent(HttpServletRequest request, Map<String, String> params) {
		String info = "";

		String productid = (String) params.get("productid");

		ParameterBean parameterBean = new ParameterBean();
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		parameterBean.setProductID(Integer.parseInt(productid));

		List<CustomEventDictionary> cedList = resourceDao.getStoped(parameterBean);
		info = cedFrame.getStopedEventFrame(cedList);

		return info;
	}

	public String editDisplayName(HttpServletRequest request, Map<String, String> params) {
		String info = "";

		BEAN bean = new BEAN();
		String displayname = (String) params.get("displayname");

		String productid = (String) params.get("productid");
		String eventid = (String) params.get("eventid");
		bean.setInt1(Integer.valueOf(Integer.parseInt(productid)));
		bean.setString1(displayname);
		bean.setString2(eventid);
		info = resourceDao.editDisplayName(bean);
		return info.equals("succ") ? String.valueOf(1) : String.valueOf(0);
	}

	public String forbid(HttpServletRequest request, Map<String, String> params) {
		String info = "";

		CustomEventDictionary ced = new CustomEventDictionary();

		String productid = (String) params.get("productid");
		String eventid = (String) params.get("eventid");
		String isforbid = (String) params.get("isforbid");

		ced.setProductid(Integer.parseInt(productid));
		ced.setIsforbid(Integer.parseInt(isforbid));
		ced.setEventid(eventid);
		info = resourceDao.forbid(ced);
		return info.equals("succ") ? String.valueOf(1) : String.valueOf(0);
	}

	public String isStop(HttpServletRequest request, Map<String, String> params) {
		String info = "";

		CustomEventDictionary ced = new CustomEventDictionary();
		String id = (String) params.get("eventid");
		String stop = (String) params.get("stop");
		String productid = (String) params.get("productid");

		ced.setEventid(id);
		ced.setProductid(Integer.parseInt(productid));
		ced.setStop(Integer.parseInt(stop));
		if ("0".equals(stop)) {
			ced.setStoptime(null);
		} else {
			ced.setStoptime(Long.valueOf(new Date().getTime() / 1000L));
		}
		info = resourceDao.isStop(ced);

		return "succ".equals(info) ? "1" : "0";
	}

	private static Long DateToInt(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHH");
		long time = Integer.parseInt(sdf.format(date));
		return Long.valueOf(time);
	}

	public static void main(String[] args) {
		System.out.println(DateToInt(new Date()));
	}

	private ObjectNode read2ObjectNode(String json) {
		try {
			mapper = new ObjectMapper();
			return (ObjectNode) mapper.readValue(json, ObjectNode.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private ArrayNode read2ArrayNode(String json) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return (ArrayNode) mapper.readValue(json, ArrayNode.class);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public String getProductManageAll(HttpServletRequest request, Map<String, Object> params) {
		String info = "";

		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Resource> cedList = new ArrayList();
		List<RoleUser> adminList = resourceDao.isAdmin(params);
		if (adminList.size() > 0) {
			cedList = resourceDao.getProductManageAll(params);
		} else {
			cedList = resourceDao.getProductManageAllByumid(params);
		}
		info = cedFrame.getRuleFrame(cedList);
		return info;
	}

	public List<RoleUser> isAdmin(Map<String, Object> params) {
		return resourceDao.isAdmin(params);
	}

	public void createRule(HttpServletRequest request, Map<String, String> params) {
		String rule_name = (String) params.get("rule_name");
		String remarks = (String) params.get("remarks");
		String appkey = (String) params.get("appkey");
		try {
			resourceDao.insertRule(rule_name, remarks, appkey);
		} catch (Throwable e) {
			logger.error("娣诲姞瑙勫垯鎶ラ敊锛�" + e);
		}
	}

	public Map<String, Object> getSuccessMessage() {
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("succes", Boolean.valueOf(true));
		return resultMap;
	}

	public Map<String, Object> getFailureMessage(String msg) {
		Map<String, Object> resultMap = new HashMap();
		resultMap.put("fial", Boolean.valueOf(false));
		resultMap.put("msg", msg);
		return resultMap;
	}

	public List<App> getAppAdminByUmid(String umid) {
		List<App> apps = null;
		Map<String, Object> map = new HashMap();
		if (umid.equals("system")) {
			map.put("status", Integer.valueOf(0));
			apps = resourceDao.getApp(map);
		} else {
			map.put("umId", umid);
			map.put("status", Integer.valueOf(0));
			apps = resourceDao.getAppAdminByUmid(map);
		}
		return apps;
	}

	public List<ResourceType> getResourceTypeByApprid(ResourceTypePage page) {
		List<Integer> list = new ArrayList();
		list.add(page.getAppRid());
		page.setAppList(list);
		return resourceDao.findResourceTypeList(page);
	}

	public List<ResourceType> findResourceTypeList(ResourceTypePage page, User user) {
		List<Integer> list = null;
		if (page.getAppRid() != null) {
			return getResourceTypeByApprid(page);
		}
		List<App> appList = null;
		Map<String, Object> map = new HashMap();
		if (user.getUmid().equals("system")) {
			map.put("status", Integer.valueOf(0));
			appList = resourceDao.getApp(map);
		} else {
			map.put("umId", user.getUmid());
			map.put("status", Integer.valueOf(0));
			appList = resourceDao.getAppAdminByUmid(map);
		}

		if ((appList != null) && (appList.size() > 0)) {
			list = new ArrayList();
			for (App app : appList) {
				list.add(app.getRid());
			}
			page.setAppList(list);
			return resourceDao.findResourceTypeList(page);
		}
		return null;
	}

	public List<String> getProductResourceType(Map<String, Object> params) {
		return resourceDao.getProductResourceType(params) != null ? resourceDao.getProductResourceType(params)
				: new ArrayList();
	}
}
