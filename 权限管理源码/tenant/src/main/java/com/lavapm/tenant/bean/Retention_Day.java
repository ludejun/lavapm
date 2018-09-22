package com.lavapm.tenant.bean;

public class Retention_Day {
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int today;
  private int beforenum;
  private int afternum;
  private int usernum;
  
  public Retention_Day() {}
  
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
  
  public int getToday() { return today; }
  
  public void setToday(int today) {
    this.today = today;
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
