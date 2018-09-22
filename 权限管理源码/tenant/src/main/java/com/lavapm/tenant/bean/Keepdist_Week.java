package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Keepdist_Week {
  private int developerid;
  private int productid;
  private int platformid;
  private int usernum;
  private String week;
  private Timestamp lasttime;
  
  public Keepdist_Week() {}
  
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
  
  public String getWeek() { return week; }
  
  public void setWeek(String week) {
    this.week = week;
  }
  
  public Timestamp getLasttime() { return lasttime; }
  
  public void setLasttime(Timestamp lasttime) {
    this.lasttime = lasttime;
  }
}
