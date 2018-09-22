package com.lavapm.tenant.bean.search;

import java.sql.Timestamp;



public class ExceptionSearch
{
  private int developerid;
  private int productid;
  private int platformid;
  private String platforms;
  private int platformtype;
  private String version;
  private int startTime;
  
  public ExceptionSearch() {}
  
  public int getId()
  {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  private int endTime;
  public int getIsrestore() { return isrestore; }
  
  private Timestamp stpstarttime;
  public void setIsrestore(int isrestore) { this.isrestore = isrestore; }
  
  private Timestamp stpendtime;
  public String getMobile() { return mobile; }
  
  private String exceptionname;
  public void setMobile(String mobile) { this.mobile = mobile; }
  
  private String mobile;
  public int getDeveloperid() { return developerid; }
  private int isrestore;
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  private int id;
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getPlatforms() { return platforms; }
  
  public void setPlatforms(String platforms) {
    this.platforms = platforms;
  }
  
  public int getPlatformtype() { return platformtype; }
  
  public void setPlatformtype(int platformtype) {
    this.platformtype = platformtype;
  }
  
  public String getVersion() { return version; }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public int getStartTime() { return startTime; }
  
  public void setStartTime(int startTime) {
    this.startTime = startTime;
  }
  
  public int getEndTime() { return endTime; }
  
  public void setEndTime(int endTime) {
    this.endTime = endTime;
  }
  
  public Timestamp getStpstarttime() { return stpstarttime; }
  
  public void setStpstarttime(Timestamp stpstarttime) {
    this.stpstarttime = stpstarttime;
  }
  
  public Timestamp getStpendtime() { return stpendtime; }
  
  public void setStpendtime(Timestamp stpendtime) {
    this.stpendtime = stpendtime;
  }
  
  public String getExceptionname() { return exceptionname; }
  
  public void setExceptionname(String exceptionname) {
    this.exceptionname = exceptionname;
  }
}
