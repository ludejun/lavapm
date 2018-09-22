package com.lavapm.tenant.bean.search;

public class PieInfoSearch
{
  private int developerid;
  private int productid;
  private int platformid;
  
  public PieInfoSearch() {}
  
  public String getOrderbyflag() {
    return orderbyflag;
  }
  
  public void setOrderbyflag(String orderbyflag) { this.orderbyflag = orderbyflag; }
  
  private String platforms;
  public int getDeveloperid() { return developerid; }
  
  private int startTime;
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(int platformid) { this.platformid = platformid; }
  

  public String getPlatforms() { return platforms; }
  private int endTime;
  
  public void setPlatforms(String platforms) { this.platforms = platforms; }
  

  public int getStartTime() { return startTime; }
  
  private String orderbyflag;
  public void setStartTime(int startTime) { this.startTime = startTime; }
  
  public int getEndTime() {
    return endTime;
  }
  
  public void setEndTime(int endTime) { this.endTime = endTime; }
}
