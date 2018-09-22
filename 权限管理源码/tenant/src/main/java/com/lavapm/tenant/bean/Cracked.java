package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Cracked { private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private String appversion;
  private int newuser;
  private int crackeduser;
  private int timeflag;
  private Timestamp time;
  
  public Cracked() {}
  
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
  
  public String getAppversion() { return appversion; }
  
  public void setAppversion(String appversion) {
    this.appversion = appversion;
  }
  
  public int getNewuser() { return newuser; }
  
  public void setNewuser(int newuser) {
    this.newuser = newuser;
  }
  
  public int getCrackeduser() { return crackeduser; }
  
  public void setCrackeduser(int crackeduser) {
    this.crackeduser = crackeduser;
  }
  
  public int getTimeflag() { return timeflag; }
  
  public void setTimeflag(int timeflag) {
    this.timeflag = timeflag;
  }
  
  public Timestamp getTime() { return time; }
  
  public void setTime(Timestamp time) {
    this.time = time;
  }
}
