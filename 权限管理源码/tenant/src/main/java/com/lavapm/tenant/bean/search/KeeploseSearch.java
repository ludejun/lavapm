package com.lavapm.tenant.bean.search;

import java.sql.Timestamp;

public class KeeploseSearch { private int developerid;
  private int productid;
  private int platformid;
  private int startTime;
  private int endTime;
  private int ystartTime;
  private int yendTime;
  private Timestamp stpstarttime;
  private Timestamp stpendtime;
  private String platforms;
  private int platformtype;
  private String dvalue;
  private java.util.List<Integer> dvalueList;
  private java.util.List<String> dvalueName;
  private int searchType;
  
  public KeeploseSearch() {}
  
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
  
  public int getStartTime() { return startTime; }
  
  public void setStartTime(int startTime) {
    this.startTime = startTime;
  }
  
  public int getEndTime() { return endTime; }
  
  public void setEndTime(int endTime) {
    this.endTime = endTime;
  }
  
  public int getYstartTime() {
    return ystartTime;
  }
  
  public void setYstartTime(int ystartTime) { this.ystartTime = ystartTime; }
  
  public int getYendTime() {
    return yendTime;
  }
  
  public void setYendTime(int yendTime) { this.yendTime = yendTime; }
  
  public Timestamp getStpstarttime() {
    return stpstarttime;
  }
  
  public void setStpstarttime(Timestamp stpstarttime) { this.stpstarttime = stpstarttime; }
  
  public Timestamp getStpendtime() {
    return stpendtime;
  }
  
  public void setStpendtime(Timestamp stpendtime) { this.stpendtime = stpendtime; }
  
  public String getPlatforms() {
    return platforms;
  }
  
  public void setPlatforms(String platforms) { this.platforms = platforms; }
  
  public int getPlatformtype() {
    return platformtype;
  }
  
  public void setPlatformtype(int platformtype) { this.platformtype = platformtype; }
  
  public String getDvalue() {
    return dvalue;
  }
  
  public void setDvalue(String dvalue) { this.dvalue = dvalue; }
  
  public java.util.List<Integer> getDvalueList()
  {
    return dvalueList;
  }
  
  public void setDvalueList(java.util.List<Integer> dvalueList) { this.dvalueList = dvalueList; }
  
  public java.util.List<String> getDvalueName() {
    return dvalueName;
  }
  
  public void setDvalueName(java.util.List<String> dvalueName) { this.dvalueName = dvalueName; }
  
  public int getSearchType() {
    return searchType;
  }
  
  public void setSearchType(int searchType) { this.searchType = searchType; }
}
