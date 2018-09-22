package com.lavapm.tenant.db;

import com.ibatis.sqlmap.client.SqlMapClient;

public class DataSource {
  private static SqlMapClient sqlEnterpriseMapClient;
  
  public DataSource() {}
  
  public static SqlMapClient getSqlEnterpriseMapClient() { return sqlEnterpriseMapClient; }
  
  public static void setSqlEnterpriseMapClient(SqlMapClient sqlEnterpriseMapClient)
  {
    sqlEnterpriseMapClient = sqlEnterpriseMapClient;
  }
}
