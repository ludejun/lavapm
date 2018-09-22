package com.lavapm.tenant.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.lavapm.tenant.bean.BEAN;
import com.lavapm.tenant.bean.CustomEventClearInfo;
import com.lavapm.tenant.bean.CustomEventDictionary;
import com.lavapm.tenant.entity.App;
import com.lavapm.tenant.entity.Resource;
import com.lavapm.tenant.entity.ResourceType;
import com.lavapm.tenant.entity.ResourceTypePage;
import com.lavapm.tenant.entity.Role;
import com.lavapm.tenant.entity.RoleResource;
import com.lavapm.tenant.entity.RoleUser;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.User;
import com.lavapm.tenant.tool.CreatLog;
import com.lavapm.tenant.tool.ParameterBean;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;











@Service("resourceDao")
public class ResourceDao
{
  @Autowired
  private SqlMapClient sqlMapClient = null;
  

  private static final Logger logger = LoggerFactory.getLogger(ResourceDao.class);
  


  public ResourceDao() {}
  


  public List<CustomEventDictionary> getCustomEventDictionary(ParameterBean parameterBean)
  {
    List<CustomEventDictionary> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("selectCustomEventDictionary", parameterBean);
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "getCustomEventDictionary", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getCustomEventDictionary", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  









  public List<Map<String, String>> getAllCustomEventList(Map<String, String> parameter)
  {
    List<Map<String, String>> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("SelectAllCustomEventList", parameter);
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "SelectAllCustomEventList", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "SelectAllCustomEventList", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  





  public List<Map<String, Object>> getIsforbidEvents(Map<String, Object> parameter)
  {
    List<Map<String, Object>> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("SelectIsforbidEvents", parameter);
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "getIsforbidEvents", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getIsforbidEvents", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  





  public List<CustomEventDictionary> getStoped(ParameterBean parameterBean)
  {
    List<CustomEventDictionary> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("selectStoped", parameterBean);
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "getStoped", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getStoped", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  




  public String editDisplayName(BEAN bean)
  {
    String str = "fail";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("editCustomEventDisplayName", bean);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "editCustomEventDisplayName", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "editCustomEventDisplayName", "没有获取到连接");
    }
    return str;
  }
  



  public String forbid(CustomEventDictionary customeventdictionary)
  {
    String str = "";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("forbid", customeventdictionary);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "forbid", "读取数据错误：" + e.getMessage());
        str = "fail";
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "forbid", "没有获取到连接");
      str = "fail";
    }
    return str;
  }
  




  public String clearCustomEvent(CustomEventDictionary customeventdictionary)
  {
    String str = "";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("clearCustomEvent", customeventdictionary);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "clearCustomEvent", "读取数据错误：" + e.getMessage());
        str = "fail";
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "clearCustomEvent", "没有获取到连接");
      str = "fail";
    }
    
    return str;
  }
  




  public String updateClearSuccess(ParameterBean parameter)
  {
    String str = "";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("updateClearSuccess", parameter);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "updateClearSuccess", "读取数据错误：" + e.getMessage());
        str = "fail";
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "updatePrepareForClear", "没有获取到连接");
      str = "fail";
    }
    
    return str;
  }
  




  public String isStop(CustomEventDictionary customeventdictionary)
  {
    String str = "fail";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("isStop", customeventdictionary);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "isStop", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "isStop", "没有获取到连接");
    }
    return str;
  }
  




  public String insertCustomEventClearInfo(CustomEventClearInfo customeventclearinfo)
  {
    String str = "fail";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.insert("insertCustomEventClearInfo", customeventclearinfo);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "insertCustomEventClearInfo", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "insertCustomEventClearInfo", "没有获取到连接");
    }
    
    return str;
  }
  




  public CustomEventDictionary selectEventPlatformById(int id)
  {
    CustomEventDictionary ced = null;
    
    if (sqlMapClient != null) {
      try {
        ced = (CustomEventDictionary)sqlMapClient.queryForObject("selectEventPlatformById", Integer.valueOf(id));
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "selectEventPlatformById", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "selectEventPlatformById", "没有获取到连接");
    }
    return ced;
  }
  





  public int getProductid(String appkey, int platformid)
    throws IOException, SQLException
  {
    Map<String, Object> paramMap = new HashMap();
    paramMap.put("appkey", appkey);
    paramMap.put("platformid", Integer.valueOf(platformid));
    Integer pid = (Integer)sqlMapClient.queryForObject("getProductid", paramMap);
    if (pid == null) {
      logger.error("query error!");
    }
    return pid.intValue();
  }
  
  public List<String> dynamicList(int productid, int platformid)
  {
    Map<String, Object> map = new HashMap();
    map.put("productid", Integer.valueOf(productid));
    map.put("platformid", Integer.valueOf(platformid));
    List<String> listString = new ArrayList();
    try {
      listString = sqlMapClient.queryForList("selectDynamicList", map);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
    return listString;
  }
  















  public List<Resource> getProductManageAll(Map<String, Object> params)
  {
    List<Resource> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("getProductManageAll", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getCustomEventDictionary", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  


  public List<Resource> getProductManageAllByumid(Map<String, Object> params)
  {
    List<Resource> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("getProductManageAllByumid", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getCustomEventDictionary", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  


  public List<Resource> getProductManageAllTree(Map<String, Object> params)
  {
    List<Resource> customeventdictionaryList = null;
    if (sqlMapClient != null) {
      try {
        customeventdictionaryList = sqlMapClient.queryForList("getProductManageAllTree", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "getCustomEventDictionary", "没有获取到连接");
    }
    
    return customeventdictionaryList;
  }
  




  public void insertRule(String rule_name, String remarks, String appkey)
  {
    Map<String, Object> paramMap = new HashMap();
    paramMap.put("appkey", appkey);
    paramMap.put("rule_name", rule_name);
    paramMap.put("remarks", remarks);
    try {
      sqlMapClient.insert("insertRule", paramMap);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  



  public void updateRule(int id, String rule_name, String remarks, String appkey)
    throws IOException
  {
    Map<String, Object> paramMap = new HashMap();
    paramMap.put("id", Integer.valueOf(id));
    paramMap.put("rule_name", rule_name);
    paramMap.put("remarks", remarks);
    paramMap.put("appkey", appkey);
    try {
      sqlMapClient.insert("updateRule", paramMap);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  
  public void deletedRule(int id, String appkey)
    throws IOException
  {
    Map<String, Object> paramMap = new HashMap();
    paramMap.put("id", Integer.valueOf(id));
    paramMap.put("appkey", appkey);
    try {
      sqlMapClient.insert("deletedRule", paramMap);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  






  public List<Resource> findByAppRidResourceTypeIdResourceCode(Map<String, Object> query)
  {
    List<Resource> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findByAppRidResourceTypeIdResourceCode", query);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public int insertResource(Resource entity) {
    int i = 0;
    try {
      i = ((Integer)sqlMapClient.insert("insertResource", entity)).intValue();
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
    return i;
  }
  


  public Resource selectByPrimaryKey(Integer rid)
  {
    List<Resource> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("selectByPrimaryKey", rid);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return (Resource)list.get(0);
  }
  

  public List<Resource> findList(Map<String, Object> params)
  {
    List<Resource> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findList", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<Resource> findUserList(Map<String, Object> params)
  {
    List<Resource> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findUserList", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  


  public List<String> getResourceType(Map<String, Object> params)
  {
    List<String> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getResourceType", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<String> getProductResourceType(Map<String, Object> params)
  {
    List<String> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getProductResourceType", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  


  public List<String> getUserResourceType(Map<String, Object> params)
  {
    List<String> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getUserResourceType", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  



  public List<App> getApp(Map<String, Object> map)
  {
    List<App> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getApp", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<App> getAppAdminByUmid(Map<String, Object> map)
  {
    List<App> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getAppAdminByUmid", map);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<ResourceType> findResourceTypeList(ResourceTypePage page)
  {
    List<ResourceType> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findResourceTypeList", page);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public void updateByPrimaryKeySelective(Resource resource)
  {
    try {
      sqlMapClient.insert("updateByPrimaryKeySelectiveresource", resource);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  
  public void deleteByPrimaryKey(Integer rid)
  {
    try
    {
      sqlMapClient.delete("deleteByPrimaryKey", rid);
    } catch (SQLException e) {
      logger.error("delete error!" + e);
    }
  }
  
  public List<Role> getroleallbydepartmentId(Role role)
  {
    List<Role> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getroleallbydepartmentId", role);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public int hasAppRid(Map param)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = ((Integer)sqlMapClient.queryForObject("hasAppRid", param)).intValue();
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public int queryNotRidRoleCodeCount(Role entity)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = ((Integer)sqlMapClient.queryForObject("queryNotRidRoleCodeCount", entity)).intValue();
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public int queryRoleByCount(Role entity)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = ((Integer)sqlMapClient.queryForObject("queryRoleByCount", entity)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public int insertRole(Role entity)
  {
    int num = 0;
    try {
      num = ((Integer)sqlMapClient.insert("insertRole", entity)).intValue();
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
    return num;
  }
  

  public void updateByRolePrimaryKey(Role entity)
  {
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("updateByRolePrimaryKey", entity);
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "forbid", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "forbid", "没有获取到连接");
    }
  }
  
  public void deleteBySelective(Map<String, Object> param)
  {
    try {
      sqlMapClient.insert("deleteBySelective", param);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  
  public void insertresourceRole(RoleResource roleResource)
  {
    try
    {
      sqlMapClient.insert("insertresourceRole", roleResource);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  

  public List<RoleResource> getRoleResourceTree(Map<String, Object> params)
  {
    List<RoleResource> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRoleResourceTree", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  


  public void deleteUserByRoleRid(Object id) {}
  


  public void deleteResourceByRoleRid(Object id) {}
  

  public void deleteRoleByPrimaryKey(Integer rid)
  {
    try
    {
      sqlMapClient.insert("deleteRoleByPrimaryKey", rid);
    } catch (SQLException e) {
      e.printStackTrace();
      logger.error("query error!" + e);
    }
  }
  

  public List<Role> selectRoleByPrimaryKey(int parseInt)
  {
    List<Role> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("selectByPrimaryKey1", Integer.valueOf(parseInt));
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public void insertTempletmanage(Templetmanage templetmanage)
  {
    try
    {
      sqlMapClient.insert("insertTempletmanage", templetmanage);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  



  public List<Templetmanage> getroleallbydepartmentId(Templetmanage templetmanage)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("gettempletmanageallbydepartmentId", templetmanage);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  

  public List<Templetmanage> getroleallbydepartmentIdAll(Templetmanage templetmanage)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getroleallbydepartmentIdAll", templetmanage);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  

  public List<Templetmanage> getTempletmanageBydepartmentIdUid(Map<String, Object> map)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getTempletmanageBydepartmentIdUid", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<Templetmanage> getTempletmanageByTids(Resource page)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getTempletmanageByTids", page);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<Templetmanage> getTempletmanageByRoleId(Map<String, Object> map)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getTempletmanageByRoleId", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  

  public void deleteRoleResourceTree(Resource page)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.delete("deleteRoleResourceTree", page);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
  }
  


  public void deleteRoleUserByRids(Resource page)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.delete("deleteRoleUserByRids", page);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
  }
  




  public void deleteTempletmanageByTids(String tids)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.delete("deleteTempletmanageByTids", tids);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
  }
  





  public List<User> getUsers(Map<String, String> map)
  {
    List<User> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getUsers", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<RoleUser> getRoleUser(Map<String, Object> map) {
    List<RoleUser> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRoleUser", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list != null ? list : new ArrayList();
  }
  
  public Role getRolebyUmid(Map<String, Object> params)
  {
    List<Role> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRolebyUmid", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list != null ? (Role)list.get(0) : new Role();
  }
  
  public List<Role> getRolebyUmidAdmin(Map<String, Object> params) {
    List<Role> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRolebyUmidAdmin", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list != null ? list : new ArrayList();
  }
  

  public int isTempletNameExist(Map<String, Object> params)
  {
    int list = 0;
    if (sqlMapClient != null) {
      try {
        list = ((Integer)sqlMapClient.queryForObject("isTempletNameExist", params)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<RoleUser> isAdmin(Map<String, Object> map)
  {
    List<RoleUser> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("isAdmin", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list != null ? list : new ArrayList();
  }
  
  public void updateTempletmanageByTids(Templetmanage templetmanage2) {
    String str = "fail";
    
    if (sqlMapClient != null) {
      try {
        sqlMapClient.update("updateTempletmanageByTids", templetmanage2);
        str = "succ";
      } catch (SQLException e) {
        CreatLog.setError("CustomeventDictionaryDao", "editCustomEventDisplayName", "读取数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("CustomeventDictionaryDao", "editCustomEventDisplayName", "没有获取到连接");
    }
  }
  
  public Role getRolebyAppRidRoleRids(Map<String, Object> params)
  {
    List<Role> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRolebyAppRidRoleRids", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return (list != null) && (list.size() > 0) ? (Role)list.get(0) : null;
  }
  
  public void deleteRoleByAppid(Map<String, Object> params) {
    if (sqlMapClient != null) {
      try {
        sqlMapClient.delete("deleteRoleByAppid", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("deleteRoleByAppid error!");
    }
  }
  
  public void deleteRoleUserByAppid(Map<String, Object> params)
  {
    if (sqlMapClient != null) {
      try {
        sqlMapClient.delete("deleteRoleUserByAppid", params);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("deleteRoleByAppid error!");
    }
  }
  
  public void deleteTempletmanageByAppid(Integer rid)
  {
    if (sqlMapClient != null) {
      try {
        sqlMapClient.delete("deleteTempletmanageByAppid", rid);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("deleteRoleByAppid error!");
    }
  }
}
