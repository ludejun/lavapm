package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class CustomEventClearInfo {
  private int developerid;
  private int developertype;
  private int productid;
  
  public CustomEventClearInfo() {}
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  private int platformid;
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getEventname() { return eventname; }
  
  public void setEventname(String eventname) {
    this.eventname = eventname;
  }
  
  public Timestamp getCleartime() { return cleartime; }
  

  public void setCleartime(Timestamp cleartime) { this.cleartime = cleartime; }
  private String eventname;
  
  public int getDevelopertype() { return developertype; }
  
  private Timestamp cleartime;
  public void setDevelopertype(int developertype) { this.developertype = developertype; }
}
