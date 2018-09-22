package com.lavapm.tenant.bean.search;

import java.sql.Timestamp;

public class EventSearch { private int developerid;
  private int productid;
  private int platformid;
  private String platforms;
  private int platformtype;
  private String version;
  private int startTime;
  private int endTime;
  private Timestamp stpstarttime;
  private Timestamp stpendtime;
  public EventSearch() {}
  private String eventname = "";
  

  public int getDeveloperid() { return developerid; }
  
  private long eventnum;
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(int platformid) { this.platformid = platformid; }
  
  public String getPlatforms() {
    return platforms;
  }
  
  public void setPlatforms(String platforms) { this.platforms = platforms; }
  
  public int getPlatformtype() {
    return platformtype;
  }
  
  public void setPlatformtype(int platformtype) { this.platformtype = platformtype; }
  
  public String getVersion() {
    return version;
  }
  
  public void setVersion(String version) { this.version = version; }
  
  public int getStartTime() {
    return startTime;
  }
  
  public void setStartTime(int startTime) { this.startTime = startTime; }
  
  public int getEndTime() {
    return endTime;
  }
  
  public void setEndTime(int endTime) { this.endTime = endTime; }
  
  public Timestamp getStpstarttime() {
    return stpstarttime;
  }
  
  public void setStpstarttime(Timestamp stpstarttime) { this.stpstarttime = stpstarttime; }
  
  public Timestamp getStpendtime() {
    return stpendtime;
  }
  
  public void setStpendtime(Timestamp stpendtime) { this.stpendtime = stpendtime; }
  
  public String getEventname() {
    return eventname;
  }
  
  public void setEventname(String eventname) { this.eventname = eventname; }
  
  public long getEventnum() {
    return eventnum;
  }
  
  public void setEventnum(long eventnum) { this.eventnum = eventnum; }
}
