package com.lavapm.tenant.servlet;

import com.lavapm.tenant.control.ResourceControl;
import com.lavapm.tenant.entity.RoleUser;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.Tenant;
import com.tendcloud.enterprise.um.umic.entity.App;
import com.tendcloud.enterprise.um.umic.entity.User;
import com.tendcloud.enterprise.um.umic.util.UserInfoUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;















@Controller
@RequestMapping({"/resource"})
public class ResourceServlet
{
  @Autowired
  private ResourceControl resourceControl;
  private static final Logger logger = Logger.getLogger(ResourceServlet.class);
  


  public ResourceServlet() {}
  

  @RequestMapping({"/treeList"})
  @ResponseBody
  public Map<String, List<Map<String, Object>>> queryTreeList(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    User opUser = UserInfoUtil.getUser();
    params.put("extAttr5", tenant.getRid());
    params.put("tenantId", tenant.getRid());
    
    params.put("umid", opUser.getUmid());
    params.put("opUmid", opUser.getUmid());
    List<App> authAppList = new ArrayList();
    String rows = "";
    List<Map<String, Object>> rowsList = new ArrayList();
    authAppList = (List)session.getAttribute("authAppList");
    String productType = (String)resourceControl.getProductResourceType(params).get(0);
    for (App app : authAppList) {
      params.remove("parentResourceRid");
      params.put("appRid", app.getRid());
      
      Map<String, Object> resourcemap = new HashMap();
      params.put("resourceTypeRid", Integer.valueOf(1));
      Map<String, Object> map = new HashMap();
      resourcemap = resourceControl.queryTreeList(params);
      map.put("key", app.getRid() + "_1_" + app.getAppCode() + "_MENU");
      map.put("value", resourcemap);
      rowsList.add(map);
      if (("report".equals(app.getAppCode())) && (StringUtils.isNotBlank(productType))) {
        params.remove("parentResourceRid");
        params.put("resourceTypeRid", productType);
        List<RoleUser> adminList = resourceControl.isAdmin(params);
        if (adminList.size() > 0) {
          resourcemap = resourceControl.queryProductTreeList(params);
        } else {
          resourcemap = resourceControl.queryProductList(params);
        }
        Map<String, Object> productmap = new HashMap();
        productmap.put("key", app.getRid() + "_" + productType + "_" + app.getAppCode() + "_productlist");
        productmap.put("value", resourcemap);
        rowsList.add(productmap);
      }
    }
    
    Map<String, List<Map<String, Object>>> rowsMap = new HashMap();
    rowsMap.put("list", rowsList);
    return rowsMap;
  }
  

  @RequestMapping({"/usetreeList"})
  @ResponseBody
  public Map<String, List<Map<String, Object>>> queryUsetreeList(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    User opUser = UserInfoUtil.getUser();
    params.put("extAttr5", tenant.getRid());
    params.put("tenantId", tenant.getRid());
    
    params.put("umid", opUser.getUmid());
    params.put("opUmid", opUser.getUmid());
    List<App> authAppList = new ArrayList();
    String rows = "";
    List<Map<String, Object>> rowsList = new ArrayList();
    authAppList = (List)session.getAttribute("authAppList");
    String productType = (String)resourceControl.getProductResourceType(params).get(0);
    for (App app : authAppList) {
      params.remove("parentResourceRid");
      params.put("appRid", app.getRid());
      
      Map<String, Object> resourcemap = new HashMap();
      params.put("resourceTypeRid", Integer.valueOf(1));
      Map<String, Object> map = new HashMap();
      resourcemap = resourceControl.findUserList(params);
      
      map.put("key", app.getRid() + "_1_" + app.getAppCode() + "_MENU");
      map.put("value", resourcemap);
      rowsList.add(map);
      if (("report".equals(app.getAppCode())) && (StringUtils.isNotBlank(productType))) {
        params.remove("parentResourceRid");
        params.put("resourceTypeRid", productType);
        List<RoleUser> adminList = resourceControl.isAdmin(params);
        resourcemap = resourceControl.queryProductTreeList(params);
        Map<String, Object> productmap = new HashMap();
        productmap.put("key", app.getRid() + "_" + productType + "_" + app.getAppCode() + "_productlist");
        productmap.put("value", resourcemap);
        rowsList.add(productmap);
      }
    }
    
    Map<String, List<Map<String, Object>>> rowsMap = new HashMap();
    rowsMap.put("list", rowsList);
    return rowsMap;
  }
  
  @RequestMapping({"/list"})
  @ResponseBody
  public String list(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    String opUser = UserInfoUtil.getUser().getUmid();
    
    Templetmanage templetmanage = new Templetmanage();
    templetmanage.setTenantId(tenant.getRid().intValue());
    templetmanage.setOp_umid(opUser);
    params.put("tenantId", tenant.getRid());
    params.put("opUmid", opUser);
    String rows = resourceControl.getroleallbydepartmentId(templetmanage, params);
    return rows;
  }
  
  @RequestMapping({"/save"})
  @ResponseBody
  public Map<String, Object> save(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response) throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    User opUser = (User)session.getAttribute("user");
    params.put("umid", opUser.getUmid());
    params.put("tenantId", tenant.getRid());
    

    String resourceRids = params.get("resourceRids") + "";
    return resourceControl.c_save(tenant, params);
  }
  
  @RequestMapping({"/delete"})
  @ResponseBody
  public Map<String, Object> delete(@RequestBody Map<String, Object> params, HttpServletRequest request, HttpServletResponse response)
    throws Exception
  {
    HttpSession session = request.getSession();
    Tenant tenant = (Tenant)session.getAttribute("tenant");
    
    String tids = params.get("tids") + "";
    String rids = params.get("rids") + "";
    return resourceControl.c_delete(rids, tids);
  }
}
