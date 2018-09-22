package com.lavapm.tenant.servlet;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lavapm.tenant.control.DepartmentControl;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.tool.Msg;
import com.lavapm.tenant.tool.Pinyin4jUtil;





























@Controller
@RequestMapping({"/umDepartment"})
public class UmDepartmentServlet
{
  @Autowired
  private DepartmentControl departmentControl;
  
  public UmDepartmentServlet() {}
  
  @RequestMapping({"/treeDepartmentList"})
  @ResponseBody
  public String queryTreeList(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    params.put("tenantId", tenant.getRid() + "");
    String rows = departmentControl.queryTreeList(params);
    return rows;
  }
  
  @RequestMapping({"/insertDepartment"})
  @ResponseBody
  public Map<String, Object> insertDepartment(@RequestBody Map<String, String> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    try
    {
      HttpSession session = request.getSession();
      Tenant tenant = (Tenant)session.getAttribute("tenant");
      params.put("tenantId", tenant.getRid() + "");
      String deptCode = Pinyin4jUtil.getRoleCode((String)params.get("deptName") + "", tenant.getRid() + "");
      params.put("deptCode", deptCode);
      if ((params.get("parentRid") == null) || ("".equals(params.get("parentRid")))) {
        params.put("parentRid", "0");
      }
      departmentControl.insertDepartment(params);
    } catch (Exception e) {
      return Msg.getFailureMessage("添加部门失败!");
    }
    
    return Msg.getSuccessMessage("添加部门成功!");
  }
  
  @RequestMapping({"/updateDepartmentByPrimaryKey"})
  @ResponseBody
  public Map<String, Object> updateDepartmentByPrimaryKey(@RequestBody Map<String, String> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
    try {
      departmentControl.updateDepartmentByPrimaryKey(params);
      departmentControl.editUsers(params);
    } catch (Exception e) {
      return Msg.getFailureMessage("修改部门失败!");
    }
    
    return Msg.getSuccessMessage("修改部门成功!");
  }
  
  @RequestMapping({"/deleteDepartment"})
  @ResponseBody
  public Map<String, Object> deleteDepartment(@RequestBody Map<String, String> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    try {
      HttpSession session = request.getSession();
      Tenant tenant = (Tenant)session.getAttribute("tenant");
      params.put("tenantId", tenant.getRid() + "");
      departmentControl.deleteDepartment(params);
    } catch (Exception e) {
      return Msg.getFailureMessage("删除部门失败!");
    }
    
    return Msg.getSuccessMessage("删除部门成功!");
  }
  
  @RequestMapping({"/editUsers"})
  @ResponseBody
  public Map<String, Object> editUsers(@RequestBody Map<String, String> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    try {
      departmentControl.editUsers(params);
    } catch (Exception e) {
      e.printStackTrace();
      return Msg.getFailureMessage("编辑用户失败!");
    }
    
    return Msg.getSuccessMessage("编辑用户成功!");
  }
}
