package com.lavapm.tenant.bean;

public class Retention_Week { private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int starttime;
  private int endtime;
  private int beforenum;
  private int afternum;
  private int usernum;
  
  public Retention_Week() {}
  
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
  
  public int getStarttime() { return starttime; }
  
  public void setStarttime(int starttime) {
    this.starttime = starttime;
  }
  
  public int getEndtime() { return endtime; }
  
  public void setEndtime(int endtime) {
    this.endtime = endtime;
  }
  
  public int getBeforenum() { return beforenum; }
  
  public void setBeforenum(int beforenum) {
    this.beforenum = beforenum;
  }
  
  public int getAfternum() { return afternum; }
  
  public void setAfternum(int afternum) {
    this.afternum = afternum;
  }
  
  public int getUsernum() { return usernum; }
  
  public void setUsernum(int usernum) {
    this.usernum = usernum;
  }
}
