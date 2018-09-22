package com.lavapm.tenant.bean.search;

import java.sql.Timestamp;


public class HourDaySearch
{
  private int id;
  private int fromtype;
  private int developerid;
  private int productid;
  private int platformid;
  private String platforms;
  private int platformtype;
  private int productype;
  
  public HourDaySearch() {}
  private int partnerid;
  private int startTime;
  private int endTime;
  
  public int getId()
  {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  private Timestamp stpstarttime;
  
  public int getFromtype() { return fromtype; }
  private Timestamp stpendtime;
  
  public void setFromtype(int fromtype) { this.fromtype = fromtype; }
  private int sevenstartTime;
  
  public int getDeveloperid() { return developerid; }
  private int sevenendTime;
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  private Timestamp sevenstpstarttime;
  
  public int getProductid() { return productid; }
  

  public void setProductid(int productid) { this.productid = productid; }
  
  private Timestamp sevenstpendtime;
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public int getProductype() { return productype; }
  
  public void setProductype(int productype) {
    this.productype = productype;
  }
  
  public int getPartnerid() { return partnerid; }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
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
  
  public String getPlatforms() { return platforms; }
  
  public void setPlatforms(String platforms) {
    this.platforms = platforms;
  }
  
  public int getPlatformtype() { return platformtype; }
  
  public void setPlatformtype(int platformtype) {
    this.platformtype = platformtype;
  }
  
  public int getSevenstartTime() { return sevenstartTime; }
  
  public void setSevenstartTime(int sevenstartTime) {
    this.sevenstartTime = sevenstartTime;
  }
  
  public int getSevenendTime() { return sevenendTime; }
  
  public void setSevenendTime(int sevenendTime) {
    this.sevenendTime = sevenendTime;
  }
  
  public Timestamp getSevenstpstarttime() { return sevenstpstarttime; }
  
  public void setSevenstpstarttime(Timestamp sevenstpstarttime) {
    this.sevenstpstarttime = sevenstpstarttime;
  }
  
  public Timestamp getSevenstpendtime() { return sevenstpendtime; }
  
  public void setSevenstpendtime(Timestamp sevenstpendtime) {
    this.sevenstpendtime = sevenstpendtime;
  }
}
