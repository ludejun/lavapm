package com.lavapm.tenant.bean.search;

import java.sql.Timestamp;

public class PartnerSearch {
  private int developerid;
  private int productid;
  private int platformid;
  private String platforms;
  private int productype;
  private int partnerid;
  private Timestamp stpstarttime;
  private Timestamp stpendtime;
  private int startTime;
  private int endTime;
  private int todayTime;
  private int yesterdayTime;
  private String loginname;
  private String category;
  
  public PartnerSearch() {}
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid)
  {
    this.developerid = developerid;
  }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getPlatforms() {
    return platforms;
  }
  
  public void setPlatforms(String platforms) {
    this.platforms = platforms;
  }
  
  public int getProductype() {
    return productype;
  }
  
  public void setProductype(int productype) {
    this.productype = productype;
  }
  
  public int getPartnerid() {
    return partnerid;
  }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
  }
  
  public int getStartTime() {
    return startTime;
  }
  
  public void setStartTime(int startTime) {
    this.startTime = startTime;
  }
  
  public int getEndTime() {
    return endTime;
  }
  
  public void setEndTime(int endTime) {
    this.endTime = endTime;
  }
  
  public int getTodayTime() {
    return todayTime;
  }
  
  public void setTodayTime(int todayTime) {
    this.todayTime = todayTime;
  }
  
  public int getYesterdayTime() {
    return yesterdayTime;
  }
  
  public void setYesterdayTime(int yesterdayTime) {
    this.yesterdayTime = yesterdayTime;
  }
  
  public String getLoginname() {
    return loginname;
  }
  
  public void setLoginname(String loginname) {
    this.loginname = loginname;
  }
  
  public Timestamp getStpstarttime() {
    return stpstarttime;
  }
  
  public void setStpstarttime(Timestamp stpstarttime) {
    this.stpstarttime = stpstarttime;
  }
  
  public Timestamp getStpendtime() {
    return stpendtime;
  }
  
  public void setStpendtime(Timestamp stpendtime) {
    this.stpendtime = stpendtime;
  }
  
  public String getCategory() {
    return category;
  }
  
  public void setCategory(String category) {
    this.category = category;
  }
}
