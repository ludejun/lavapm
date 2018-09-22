package com.lavapm.tenant.bean.search;

public class JailbrokenCrackedSearch { private int developerid;
  private int productid;
  private int platformid;
  private String mobile;
  private String mobiles;
  private int jailbroken;
  private int startTime;
  private int endTime;
  private String appversion;
  
  public JailbrokenCrackedSearch() {}
  
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
  
  public String getMobile() { return mobile; }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public int getJailbroken() { return jailbroken; }
  
  public void setJailbroken(int jailbroken) {
    this.jailbroken = jailbroken;
  }
  
  public int getStartTime() { return startTime; }
  
  public void setStartTime(int startTime) {
    this.startTime = startTime;
  }
  
  public int getEndTime() { return endTime; }
  
  public void setEndTime(int endTime) {
    this.endTime = endTime;
  }
  
  public String getMobiles() { return mobiles; }
  
  public void setMobiles(String mobiles) {
    this.mobiles = mobiles;
  }
  
  public String getAppversion() { return appversion; }
  
  public void setAppversion(String appversion) {
    this.appversion = appversion;
  }
  
  public String toString() {
    return "JailbrokenCrackedSearch [developerid=" + developerid + ", productid=" + productid + ", platformid=" + platformid + ", mobile=" + mobile + ", mobiles=" + mobiles + ", jailbroken=" + jailbroken + ", startTime=" + startTime + ", endTime=" + endTime + ", appversion=" + appversion + "]";
  }
}
