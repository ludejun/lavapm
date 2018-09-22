package com.lavapm.tenant.dao;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.lavapm.enterprise.admin.entity.SysEmailSendJobInput;
import com.lavapm.enterprise.admin.entity.SysEmailTemplate;
import com.lavapm.tenant.tool.CreatLog;

import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;









@Service("sysEmailSendJobInputDao")
public class MailManageDao
{
  public MailManageDao() {}
  
  @Autowired
  private SqlMapClient sqlMapClient = null;
  

  private static final Logger logger = LoggerFactory.getLogger(MailManageDao.class);
  
  public void insertSysEmailSendJobInput(SysEmailSendJobInput record) {
    if (sqlMapClient != null) {
      try {
        sqlMapClient.insert("insertSysEmailSendJobInput", record);
      } catch (SQLException e) {
        e.printStackTrace();
        CreatLog.setError("UserDao", "insertuser", "添加数据错误：" + e.getMessage());
      }
    } else {
      CreatLog.setError("UserDao", "insertuser", "没有获取到连接");
    }
  }
  
  public SysEmailTemplate getMailTemplateByCode(String code)
  {
    List<SysEmailTemplate> list = null;
    if (sqlMapClient != null) {
      try {
        list = sqlMapClient.queryForList("getMailTemplateByCode", code);
      } catch (SQLException e) {
        e.printStackTrace();
        logger.error("query error!" + e);
      }
    } else {
      logger.error("query error!");
    }
    
    return (list != null) && (list.size() > 0) ? (SysEmailTemplate)list.get(0) : null;
  }
}
