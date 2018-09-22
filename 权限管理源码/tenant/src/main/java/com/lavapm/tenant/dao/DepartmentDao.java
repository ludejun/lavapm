package com.lavapm.tenant.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.lavapm.tenant.entity.Department;
import com.lavapm.tenant.entity.Deptuser;
import com.lavapm.tenant.tool.CreatLog;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;










@Service("departmentDao")
public class DepartmentDao
{
  @Autowired
  private SqlMapClient sqlMapClient = null;
  

  private static final Logger logger = LoggerFactory.getLogger(DepartmentDao.class);
  
  public DepartmentDao() {}
  
  public List<Department> findDepartmentDaoList(Map<String, Object> params) {
    List<Department> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findDepartmentDaoList", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  
  public List<Department> getDepartmentByParentRid(Map<String, Object> params) {
    List<Department> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getDepartmentByParentRid", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  



  public void deleteDepartment(Map<String, Object> param)
  {
    try
    {
      sqlMapClient.delete("deleteDepartment", param);
    } catch (SQLException e) {
      logger.error("delete error!" + e);
    }
  }
  
  public void deleteDeptuser(Map<String, Object> param) {
    try {
      sqlMapClient.delete("deleteDeptuser", param);
    } catch (SQLException e) {
      logger.error("delete error!" + e);
    }
  }
  

  public int insertDepartment(Map<String, Object> param)
  {
    int str = 0;
    if (sqlMapClient != null) {
      try {
        str = ((Integer)sqlMapClient.insert("insertDepartment", param)).intValue();
      } catch (SQLException e) {
        e.printStackTrace();
        CreatLog.setError("UserDao", "insertuser", "添加数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("UserDao", "insertuser", "没有获取到连接");
    }
    
    return str;
  }
  
  public void updateDepartmentByPrimaryKey(Map<String, Object> map)
  {
    try {
      sqlMapClient.update("updateDepartmentByPrimaryKey", map);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
  
  public List<Deptuser> findDeptuserByDeptrid(Map<String, String> params) {
    List<Deptuser> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("findDeptuserByDeptrid", params);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return list;
  }
  

  public void editUsers(Map<String, String> params)
  {
    try
    {
      sqlMapClient.update("editUsers", params);
    } catch (SQLException e) {
      logger.error("query error!" + e);
    }
  }
}
