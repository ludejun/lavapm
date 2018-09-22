package com.lavapm.tenant.bean;

public class Retention_Month {
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int month;
  private int beforenum;
  private int afternum;
  private int usernum;
  
  public Retention_Month() {}
  
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
  
  public int getMonth() { return month; }
  
  public void setMonth(int month) {
    this.month = month;
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
