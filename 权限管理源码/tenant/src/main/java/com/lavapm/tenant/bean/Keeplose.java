package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Keeplose {
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int usernum;
  private int inittime;
  private int dvalue;
  private Timestamp lasttime;
  
  public Keeplose() {}
  
  public int getId() { return id; }
  
  public void setId(int id) {
    this.id = id;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public int getUsernum() { return usernum; }
  
  public void setUsernum(int usernum) {
    this.usernum = usernum;
  }
  
  public int getInittime() { return inittime; }
  
  public void setInittime(int inittime) {
    this.inittime = inittime;
  }
  
  public int getDvalue() { return dvalue; }
  
  public void setDvalue(int dvalue) {
    this.dvalue = dvalue;
  }
  
  public Timestamp getLasttime() { return lasttime; }
  
  public void setLasttime(Timestamp lasttime) {
    this.lasttime = lasttime;
  }
}
