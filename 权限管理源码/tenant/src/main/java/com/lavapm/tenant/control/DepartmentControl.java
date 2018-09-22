package com.lavapm.tenant.control;

import com.lavapm.tenant.control.frame.CustomEventDictionaryFrame;
import com.lavapm.tenant.dao.DepartmentDao;
import com.lavapm.tenant.dao.UserDao;
import com.lavapm.tenant.entity.Department;
import com.lavapm.tenant.entity.Resource;
import com.lavapm.tenant.entity.RoleResource;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.util.UserInfoUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("departmentControl")
public class DepartmentControl {
	private static final Logger logger = LoggerFactory.getLogger(DepartmentControl.class);

	@Autowired
	private DepartmentDao departmentDao;

	@Autowired
	private UserDao userDao;

	public DepartmentControl() {
	}

	public String queryTreeList(Map<String, Object> params) {
		List<Department> list = departmentDao.findDepartmentDaoList(params);
		CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
		List<Department> resources = new ArrayList();
		Department root;
		if ((list != null) && (list.size() > 0)) {
			params.put("parentRid", "0");
			if (departmentDao.findDepartmentDaoList(params).size() > 0) {
				root = (Department) departmentDao.findDepartmentDaoList(params).get(0);
				for (Department temp : list) {
					findParentChildren(temp, list);

					if (temp.getRid().equals(root.getRid())) {
						resources.add(temp);
					}
				}
			}
		}

		String info = cedFrame.getDepartmentFrame(resources);
		return info;
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

	private void findParentChildren(Department root, List<Department> list) {
		List<Department> results = new ArrayList();
		for (Department temp : list) {
			if (temp.getParentRid().equals(root.getRid() + "")) {
				results.add(temp);
			}
		}
		root.setChildren(results);
	}

	public void updateDepartmentByPrimaryKey(Map m) {
		departmentDao.updateDepartmentByPrimaryKey(m);
	}

	public void insertDepartment(Map m) {
		String opUser = UserInfoUtil.getUser().getUmid();
		m.put("opUmid", opUser);
		int id = departmentDao.insertDepartment(m);
		m.put("deptrid", id + "");
		editUsers(m);
	}

	public void deleteDepartment(Map m) {
		deleteDepartmentChildren(m.get("rid") + "", m.get("tenantId") + "", m.get("roorid") + "");
		departmentDao.deleteDeptuser(m);
		departmentDao.deleteDepartment(m);
	}

	private void deleteDepartmentChildren(String rid, String tenantId, String roorid) {
		Map<String, Object> m = new HashMap();
		m.put("parentRid", rid);
		m.put("tenantId", tenantId);
		List<Department> list = departmentDao.findDepartmentDaoList(m);
		m.remove("parentRid");
		if ((list == null) || (list.size() < 1)) {
			return;
		}

		for (Department department : list) {
			Map param = new HashMap();
			param.put("rid", department.getRid());
			param.put("roorid", roorid);

			departmentDao.deleteDeptuser(param);
			param.put("rid", department.getRid());
			departmentDao.deleteDepartment(param);
			deleteDepartmentChildren(department.getRid() + "", tenantId, roorid);
		}
	}

	public void editUsers(Map<String, String> params) {
		String qdurids = (String) params.get("qdurids");
		if ((qdurids != null) && (!"".equals(qdurids))) {
			String deptrid = (String) params.get("deptrid");
			departmentDao.editUsers(params);
		}
		String qxurids = (String) params.get("qxurids");
		if ((qxurids != null) && (!"".equals(qxurids))) {
			String rootdeptrid = (String) params.get("rootdeptrid");
			params.put("qdurids", qxurids);
			params.put("deptrid", rootdeptrid);
			departmentDao.editUsers(params);
		}
	}
}
