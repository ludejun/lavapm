package com.lavapm.tenant.control;

import com.lavapm.enterprise.admin.entity.SysEmailSendJobInput;
import com.lavapm.enterprise.admin.entity.SysEmailTemplate;
import com.lavapm.enterprise.common.util.CommonUtil;
import com.lavapm.tenant.control.frame.CustomEventDictionaryFrame;
import com.lavapm.tenant.dao.DepartmentDao;
import com.lavapm.tenant.dao.MailManageDao;
import com.lavapm.tenant.dao.ResourceDao;
import com.lavapm.tenant.dao.UserDao;
import com.lavapm.tenant.entity.Department;
import com.lavapm.tenant.entity.RoleUser;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.tool.Msg;
import com.lavapm.tenant.tool.SecurityUtil;
import com.tendcloud.enterprise.um.umic.util.UserInfoUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
















@Service("userControl")
public class UserControl
{
  private static final Logger logger = LoggerFactory.getLogger(UserControl.class);
  
  @Autowired
  private UserDao userDao;
  
  @Autowired
  private MailManageDao mailManageDao;
  
  @Autowired
  private ResourceDao resourceDao;
  @Autowired
  private DepartmentDao departmentDao;
  
  public UserControl() {}
  
  public String getUserList(Map<String, Object> map)
  {
    map.put("parentRid", map.get("deptRid"));
    List<Department> departmentList = new ArrayList();
    getDepartment(map, departmentList);
    List<RoleUser> adminList = resourceDao.isAdmin(map);
    List<com.lavapm.tenant.entity.User> list = new ArrayList();
    
    list = userDao.getUsersAll(map);
    


    for (Department department : departmentList) {
      map.put("deptRid", department.getRid() + "");
      List<com.lavapm.tenant.entity.User> _list = new ArrayList();
      if (adminList.size() > 0) {
        _list = userDao.getUsersAll(map);
      } else {
        _list = userDao.getUsers(map);
      }
      list.addAll(_list);
    }
    CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
    String info = cedFrame.getUserFrame(list);
    return info;
  }
  
  public String getUserListbyDeptRid(Map<String, Object> map)
  {
    map.put("parentRid", map.get("deptRid"));
    List<Department> departmentList = new ArrayList();
    getDepartment(map, departmentList);
    List<RoleUser> adminList = resourceDao.isAdmin(map);
    List<com.lavapm.tenant.entity.User> list = new ArrayList();
    
    list = userDao.getUsersAll(map);
    


    CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
    String info = cedFrame.getUserFrame(list);
    return info;
  }
  

  public void getDepartment(Map<String, Object> params, List<Department> departmentList)
  {
    String drids = "";
    List<Department> _departmentList = departmentDao.getDepartmentByParentRid(params);
    if ((_departmentList != null) && (_departmentList.size() > 0)) {
      departmentList.addAll(_departmentList);
      for (Department department : _departmentList) {
        params.put("parentRid", department.getRid() + "");
        getDepartment(params, departmentList);
      }
    }
  }
  

  @Transactional(rollbackFor={Throwable.class}, propagation=Propagation.REQUIRED, readOnly=false)
  public Map<String, Object> c_save(Map<String, Object> map, String isShowPwd, String isShowMail, HttpServletRequest request)
    throws Exception
  {
    HttpSession session = request.getSession();
    
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    String opUser = UserInfoUtil.getUser().getUmid();
    map.put("opUmid", opUser);
    map.put("tenantId", tenant.getRid());
    Object rid = map.get("rid");
    String umid = map.get("umid") + "";
    if ((rid == null) || (StringUtils.isBlank(rid.toString())))
    {

      com.lavapm.tenant.entity.User hasUser = findByUmid(umid);
      if (hasUser != null) {
        return Msg.getFailureMessage("UM帐号已存在");
      }
      

      String password = SecurityUtil.getRandomNum();
      String passwordSecret = DigestUtils.md5Hex(password);
      map.put("userPassword", passwordSecret);
      
      int urid = userDao.insert(map);
      map.put("urid", Integer.valueOf(urid));
      userDao.insertDertUser(map);
      

      Map resultMap = new HashMap();
      if ("1".equals(isShowPwd)) {
        resultMap.put("pwd", password);
      }
      if ("1".equals(isShowMail))
      {

        resultMap.put("msg", "密码已经发送至" + umid + "邮箱，请到邮箱中查看密码。");
        saveMailInput(map, password);
      }
      return Msg.getSuccessData(resultMap);
    }
    map.put("updateTime", new Date());
    userDao.updateByPrimaryKeySelective(map);
    return Msg.getSuccessMessage("用户修改成功!");
  }
  

  @Transactional(value="transactionManager", readOnly=false, propagation=Propagation.REQUIRED, rollbackFor={Throwable.class})
  public void saveMailInput(Map<String, Object> map, String password)
  {
    SysEmailTemplate finEmailTemplate = mailManageDao.getMailTemplateByCode("RegistPasswordTemplate");
    SysEmailSendJobInput record = new SysEmailSendJobInput();
    record.setTo(map.get("email") + "");
    record.setCreatetime(new Date());
    record.setMaxretry(Integer.valueOf(3));
    record.setStatus(Integer.valueOf(0));
    record.setRetry(Integer.valueOf(0));
    record.setTitle(finEmailTemplate.getTitle());
    record.setEmailservercode("PasswordEditCode");
    
    Map<String, String> emailVarMap = new HashMap();
    emailVarMap.put("password", password);
    emailVarMap.put("userName", map.get("umid") + "");
    String content = CommonUtil.transformContent(finEmailTemplate.getContent(), emailVarMap);
    
    record.setContent(content);
    
    mailManageDao.insertSysEmailSendJobInput(record);
  }
  
  private com.lavapm.tenant.entity.User findByUmid(String umid) {
    return userDao.findByUmid(umid);
  }
  
  @Transactional(rollbackFor={Throwable.class}, propagation=Propagation.REQUIRED, readOnly=false)
  public Map<String, Object> c_changeStatus(String umid)
    throws Exception
  {
    com.lavapm.tenant.entity.User user = userDao.findByUmid(umid);
    







    Map<String, Object> map = new HashMap();
    map.put("rid", user.getRid());
    if (user.getStatus().intValue() == 1) {
      map.put("status", Integer.valueOf(0));
    } else {
      map.put("status", Integer.valueOf(1));
    }
    map.put("updateTime", new Date());
    userDao.updateByPrimaryKeySelective(map);
    
    return Msg.getSuccessMessage("更新UM帐号成功!");
  }
  
  @Transactional(rollbackFor={Throwable.class}, readOnly=false, propagation=Propagation.REQUIRED)
  public Map<String, Object> resetPwd(String isMail, String isShowPwd, String umId)
    throws Exception
  {
    com.lavapm.tenant.entity.User u = userDao.findByUmid(umId);
    String email = u.getEmail();
    
    String newPassword = SecurityUtil.getRandomNum();
    
    Map<String, Object> map = new HashMap();
    com.lavapm.tenant.entity.User user = new com.lavapm.tenant.entity.User();
    user.setRid(u.getRid());
    map.put("rid", u.getRid());
    user.setUserPassword(DigestUtils.md5Hex(newPassword));
    map.put("userPassword", DigestUtils.md5Hex(newPassword));
    user.setUpdateTime(new Date());
    map.put("updateTime", new Date());
    userDao.updateByPrimaryKeySelective(map);
    
    if ("1".equals(isMail))
    {
      SysEmailTemplate sysEmailTemplate = mailManageDao.getMailTemplateByCode("PasswordEditCodeTemplate");
      
      SysEmailSendJobInput record = new SysEmailSendJobInput();
      Map<String, String> emailVarMap = new HashMap();
      emailVarMap.put("password", newPassword);
      emailVarMap.put("userName", umId);
      String emailTitle = CommonUtil.transformContent(sysEmailTemplate.getTitle(), emailVarMap);
      
      record.setTitle(emailTitle);
      String content = CommonUtil.transformContent(sysEmailTemplate.getContent(), emailVarMap);
      
      record.setContent(content);
      record.setEmailservercode("PasswordEditCode");
      record.setTo(email);
      record.setCreatetime(new Date());
      record.setMaxretry(Integer.valueOf(3));
      record.setStatus(Integer.valueOf(1));
      record.setRetry(Integer.valueOf(0));
      mailManageDao.insertSysEmailSendJobInput(record);
    }
    








    return Msg.getSuccessMessage("新密码已经发送至" + u.getUmid() + "邮箱，请到邮箱中查看新密码。");
  }
  
  @Transactional(rollbackFor={Throwable.class}, readOnly=false, propagation=Propagation.REQUIRED)
  public void saveData(String roleRids, String appRid, String userRid) {
    String opUser = UserInfoUtil.getUser().getUmid();
    
    Map<String, Object> param = new HashMap();
    param.put("rids", roleRids);
    param.put("umid", userRid);
    userDao.deleteRoleUser(param);
    
    String[] roleRidsArrs = roleRids.split("_");
    for (String _roleRids : roleRidsArrs) {
      String[] roleRidsArr = _roleRids.split(",");
      for (String roleRid : roleRidsArr) {
        if (!StringUtils.isEmpty(roleRid)) {
          RoleUser r = new RoleUser();
          r.setRoleRid(Integer.valueOf(Integer.parseInt(roleRid)));
          r.setUserRid(userRid);
          r.setIsGrantable(Integer.valueOf(0));
          r.setCreateTime(new Date());
          r.setGrantedBy(opUser);
          userDao.insertRoleUser(r);
        }
      }
    }
  }
  
  public String getRoleUserList1(Map<String, Object> m)
  {
    List<RoleUser> adminList = resourceDao.isAdmin(m);
    if (adminList.size() > 0) {
      m.put("isAdmin", Integer.valueOf(1));
    } else {
      m.put("isAdmin", Integer.valueOf(2));
    }
    List<Templetmanage> list = userDao.getRoleUserList(m);
    List<Templetmanage> alllist = new ArrayList();
    Map<String, Templetmanage> map = new HashMap();
    for (Templetmanage templetmanage2 : list) {
      String rids = "";
      String tids = "";
      for (Templetmanage templetmanage3 : list) {
        if ((templetmanage2.getT_name().equals(templetmanage3.getT_name())) && (templetmanage2.getTenantId() == templetmanage3.getTenantId()))
        {
          rids = rids + templetmanage3.getRid() + ",";
          tids = tids + templetmanage3.getTid() + ",";
        }
      }
      rids = rids != "" ? rids.substring(0, rids.lastIndexOf(",")) : "";
      tids = tids != "" ? tids.substring(0, tids.lastIndexOf(",")) : "";
      templetmanage2.setRids(rids);
      templetmanage2.setTids(tids);
      map.put(tids, templetmanage2);
    }
    
    for (Map.Entry<String, Templetmanage> entry : map.entrySet()) {
      Templetmanage t = (Templetmanage)entry.getValue();
      alllist.add(t);
    }
    CustomEventDictionaryFrame cedFrame = new CustomEventDictionaryFrame();
    String info = cedFrame.getTempletmanageFrame(alllist);
    return info;
  }
  



  public void deleteUserRole(Map m)
  {
    userDao.deleteRoleUser(m);
  }
  
  public void deleteUser(Map<String, Object> params) {
    userDao.deleteUser(params);
  }
}
