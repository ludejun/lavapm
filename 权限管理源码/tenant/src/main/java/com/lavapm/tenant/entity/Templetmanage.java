package com.lavapm.tenant.entity;

import java.util.Date;









public class Templetmanage
{
  private int tid;
  private int rid;
  private String t_name;
  private int tenantId;
  private String t_desc;
  private Date create_time;
  private Date update_time;
  private String op_umid;
  private String rids;
  private String tids;
  private String userName;
  private int type;
  private int isupdate;
  
  public Templetmanage() {}
  
  public int getTid()
  {
    return tid;
  }
  
  public void setTid(int tid) { this.tid = tid; }
  
  public String getT_name() {
    return t_name;
  }
  
  public void setT_name(String t_name) { this.t_name = t_name; }
  
  public int getTenantId()
  {
    return tenantId;
  }
  
  public void setTenantId(int tenantId) { this.tenantId = tenantId; }
  
  public String getT_desc()
  {
    return t_desc;
  }
  
  public void setT_desc(String t_desc) { this.t_desc = t_desc; }
  
  public Date getCreate_time() {
    return create_time;
  }
  
  public void setCreate_time(Date create_time) { this.create_time = create_time; }
  
  public Date getUpdate_time() {
    return update_time;
  }
  
  public void setUpdate_time(Date update_time) { this.update_time = update_time; }
  
  public String getOp_umid() {
    return op_umid;
  }
  
  public void setOp_umid(String op_umid) { this.op_umid = op_umid; }
  
  public int getRid() {
    return rid;
  }
  
  public void setRid(int rid) { this.rid = rid; }
  
  public String getRids() {
    return rids;
  }
  
  public void setRids(String rids) { this.rids = rids; }
  
  public String getTids() {
    return tids;
  }
  
  public void setTids(String tids) { this.tids = tids; }
  
  public String getUserName() {
    return userName;
  }
  
  public void setUserName(String userName) { this.userName = userName; }
  
  public int getType() {
    return type;
  }
  
  public void setType(int type) { this.type = type; }
  
  public int getIsupdate() {
    return isupdate;
  }
  
  public void setIsupdate(int isupdate) { this.isupdate = isupdate; }
}
