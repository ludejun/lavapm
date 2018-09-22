package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Customevent { private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private String version;
  private String eventname;
  private String eventlabel;
  private long eventnum;
  private int usernum;
  private int timeflag;
  private Timestamp time;
  private String displayname;
  
  public Customevent() {}
  
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
  
  public String getVersion() { return version; }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getEventname() { return eventname; }
  
  public void setEventname(String eventname) {
    this.eventname = eventname;
  }
  
  public String getEventlabel() { return eventlabel; }
  
  public void setEventlabel(String eventlabel) {
    this.eventlabel = eventlabel;
  }
  
  public long getEventnum() { return eventnum; }
  
  public void setEventnum(long eventnum) {
    this.eventnum = eventnum;
  }
  
  public int getUsernum() { return usernum; }
  
  public void setUsernum(int usernum) {
    this.usernum = usernum;
  }
  
  public int getTimeflag() { return timeflag; }
  
  public void setTimeflag(int timeflag) {
    this.timeflag = timeflag;
  }
  
  public Timestamp getTime() { return time; }
  
  public void setTime(Timestamp time) {
    this.time = time;
  }
  
  public String getDisplayname() { return displayname; }
  
  public void setDisplayname(String displayname) {
    this.displayname = displayname;
  }
}
