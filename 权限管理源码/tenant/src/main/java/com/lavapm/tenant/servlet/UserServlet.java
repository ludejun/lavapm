package com.lavapm.tenant.servlet;

import com.lavapm.tenant.control.UserControl;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.tool.Msg;
import com.tendcloud.enterprise.um.umic.annotation.DataOperateLog;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.util.UserInfoUtil;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;















@Controller
@RequestMapping({"/user"})
public class UserServlet
{
  private static final Logger logger = Logger.getLogger(UserServlet.class);
  @Autowired
  private UserControl userControl;
  
  public UserServlet() {}
  
  @RequestMapping({"/list"})
  @ResponseBody
  public String list(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception { HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    String opUser = UserInfoUtil.getUser().getUmid();
    params.put("tenantId", tenant.getRid() + "");
    params.put("developerid", tenant.getRid() + "");
    params.put("opUmid", opUser);
    String rows = userControl.getUserList(params);
    return rows;
  }
  
  @RequestMapping({"/listUser"})
  @ResponseBody
  public String listUser(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    String opUser = UserInfoUtil.getUser().getUmid();
    params.put("tenantId", tenant.getRid() + "");
    params.put("developerid", tenant.getRid() + "");
    params.put("opUmid", opUser);
    String rows = userControl.getUserListbyDeptRid(params);
    return rows;
  }
  
  @RequestMapping({"/save"})
  @ResponseBody
  public Map<String, Object> save(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    String isMail = params.get("isMail") + "";
    String isShowPwd = params.get("isShowPwd") + "";
    params.put("email", params.get("umid"));
    return userControl.c_save(params, isShowPwd, isMail, request);
  }
  
  @RequestMapping({"/changeStatus"})
  @ResponseBody
  @DataOperateLog(target="用户启用禁用")
  public Map<String, Object> changeStatus(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    try
    {
      String umid = params.get("umid") + "";
      return userControl.c_changeStatus(umid);
    } catch (Exception e) {
      logger.error("用户启用或禁用失败", e); }
    return Msg.getFailureMessage("用户启用或禁用失败");
  }
  
  @RequestMapping({"/resetPwd"})
  @ResponseBody
  @DataOperateLog(target="重置密码")
  public Map<String, Object> resetPwd(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    try
    {
      String isMail = params.get("isMail") + "";
      String isShowPwd = params.get("isShowPwd") + "";
      String umid = params.get("umid") + "";
      return userControl.resetPwd(isMail, isShowPwd, umid);
    } catch (Exception e) {}
    return Msg.getFailureMessage("重置密码失败!");
  }
  
  @RequestMapping(value={"/saveData"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
  @ResponseBody
  @DataOperateLog(target="角色用户关系维护")
  public Map<String, Object> saveData(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    String roleRids = params.get("rids") + "";
    String appRid = params.get("appRid") + "";
    String userRid = params.get("umid") + "";
    HttpSession session = request.getSession();
    
    try
    {
      userControl.saveData(roleRids, appRid, userRid);
    }
    catch (Exception e) {
      logger.error(e);
      return Msg.getFailureMessage("角色资源修改异常");
    }
    return Msg.getSuccessMessage("角色资源修改成功!");
  }
  
  @RequestMapping({"/getRoleUserList"})
  @ResponseBody
  public String getRoleUserList(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    String opUser = UserInfoUtil.getUser().getUmid();
    params.put("developerid", tenant.getRid() + "");
    params.put("opUmid", opUser);
    String rows = userControl.getRoleUserList1(params);
    return rows;
  }
  
  @RequestMapping({"/deleteUserRole"})
  @ResponseBody
  @DataOperateLog(target="删除userRole")
  public Map<String, Object> deleteUserRole(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
    try {
      userControl.deleteUserRole(params);
    } catch (Exception e) {
      return Msg.getFailureMessage("角色用户关系删除失败!");
    }
    return Msg.getSuccessMessage("角色用户关系删除成功!");
  }
  
  @RequestMapping({"/deleteUser"})
  @ResponseBody
  @DataOperateLog(target="删除deleteUser")
  public Map<String, Object> deleteUser(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception {
    try {
      userControl.deleteUser(params);
    } catch (Exception e) {
      return Msg.getFailureMessage("角色用户关系删除失败!");
    }
    return Msg.getSuccessMessage("角色用户关系删除成功!");
  }
}
