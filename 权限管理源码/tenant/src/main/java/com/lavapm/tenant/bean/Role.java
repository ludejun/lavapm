package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Role
{
  private int roleid;
  private String rolename;
  private int roletype;
  private String pageid;
  private Timestamp createtime;
  
  public Role() {}
  
  public int getRoleid()
  {
    return roleid;
  }
  
  public void setRoleid(int roleid) {
    this.roleid = roleid;
  }
  
  public String getRolename() {
    return rolename;
  }
  
  public void setRolename(String rolename) {
    this.rolename = rolename;
  }
  
  public int getRoletype() {
    return roletype;
  }
  
  public void setRoletype(int roletype) {
    this.roletype = roletype;
  }
  
  public String getPageid() {
    return pageid;
  }
  
  public void setPageid(String pageid) {
    this.pageid = pageid;
  }
  
  public Timestamp getCreatetime() {
    return createtime;
  }
  
  public void setCreatetime(Timestamp createtime) {
    this.createtime = createtime;
  }
}
