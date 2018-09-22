package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Startinfor { private int developerid;
  private int productid;
  private int platformid;
  private int startlevel;
  private int timeflag;
  private Timestamp time;
  
  public Startinfor() {}
  
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
  
  public int getStartlevel() { return startlevel; }
  
  public void setStartlevel(int startlevel) {
    this.startlevel = startlevel;
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
