package com.lavapm.tenant.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.lavapm.tenant.entity.RoleUser;
import com.lavapm.tenant.entity.Templetmanage;
import com.lavapm.tenant.entity.Tenant;
import com.lavapm.tenant.entity.User;
import com.lavapm.tenant.tool.CreatLog;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;








@Service("tenantDao")
public class TenantDao
{
  @Autowired
  private SqlMapClient sqlMapClient;
  private static final Logger logger = LoggerFactory.getLogger(TenantDao.class);
  
  public TenantDao() {}
  
  public List<Tenant> getTenant(Map<String, Object> map) { 
	List<Tenant> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getTenant", map);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public void updateByPrimaryKeySelective(Map<String, Object> map)
  {
    try {
      sqlMapClient.update("updateUserByPrimaryKeySelective", map);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  
  public int insert(Map<String, Object> map)
  {
    int str = 0;
    if (sqlMapClient != null) {
      try {
        str = ((Integer)sqlMapClient.insert("insertuser", map)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        CreatLog.setError("UserDao", "insertuser", "添加数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("UserDao", "insertuser", "没有获取到连接");
    }
    
    return str;
  }
  
  public int insertDertUser(Map<String, Object> map) {
    int str = 0;
    if (sqlMapClient != null) {
      try {
        str = ((Integer)sqlMapClient.insert("insertDertUser", map)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        CreatLog.setError("UserDao", "insertDertUser", "添加数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("UserDao", "insertDertUser", "没有获取到连接");
    }
    
    return str;
  }
  
  public User findByUmid(String umid)
  {
    List<User> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findByUmid", umid);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return (list != null) && (list.size() > 0) ? (User)list.get(0) : null;
  }
  
  public void insertRoleUser(RoleUser r)
  {
    int str = 0;
    if (sqlMapClient != null) {
      try {
        str = ((Integer)sqlMapClient.insert("insertRoleUser", r)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        CreatLog.setError("UserDao", "insertuser", "添加数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("UserDao", "insertuser", "没有获取到连接");
    }
  }
  

  public void deleteRoleUser(Map<String, Object> param)
  {
    try
    {
      sqlMapClient.delete("deleteRoleUser", param);
    } catch (SQLException e) {
      logger.error("delete error!" + e);
    }
  }
  
  public List<Templetmanage> getRoleUserList(Map m)
  {
    List<Templetmanage> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getRoleUserList", m);
      } catch (SQLException e) {
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list != null ? list : new ArrayList();
  }
  
  public void deleteUser(Map<String, Object> param)
  {
    try {
      sqlMapClient.delete("deleteUser", param);
    } catch (SQLException e) {
      logger.error("delete error!" + e);
    }
  }
}
