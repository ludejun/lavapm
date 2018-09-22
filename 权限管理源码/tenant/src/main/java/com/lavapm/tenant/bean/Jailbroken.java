package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Jailbroken
{
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int newuser;
  
  public Jailbroken() {}
  
  public int getId()
  {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  private int activeuser;
  public int getDeveloperid() { return developerid; }
  
  private String mobile;
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  private int jailbroken;
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public int getNewuser() { return newuser; }
  private int timeflag;
  
  public void setNewuser(int newuser) { this.newuser = newuser; }
  
  private Timestamp time;
  public int getActiveuser() { return activeuser; }
  
  public void setActiveuser(int activeuser) {
    this.activeuser = activeuser;
  }
  
  public String getMobile() { return mobile; }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public int getJailbroken() { return jailbroken; }
  
  public void setJailbroken(int jailbroken) {
    this.jailbroken = jailbroken;
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
