package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Keepuser {
  private int developerid;
  private int productid;
  private int platformid;
  private int usernum;
  private int timeflag;
  private Timestamp lasttime;
  
  public Keepuser() {}
  
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
  
  public int getTimeflag() { return timeflag; }
  
  public void setTimeflag(int timeflag) {
    this.timeflag = timeflag;
  }
  
  public Timestamp getLasttime() { return lasttime; }
  
  public void setLasttime(Timestamp lasttime) {
    this.lasttime = lasttime;
  }
}
