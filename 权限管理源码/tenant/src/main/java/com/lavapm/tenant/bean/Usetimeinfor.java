package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Usetimeinfor {
  private int developerid;
  private int productid;
  private int platformid;
  private int usetimelevel;
  private int timeflag;
  private Timestamp time;
  
  public Usetimeinfor() {}
  
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
  
  public int getUsetimelevel() { return usetimelevel; }
  
  public void setUsetimelevel(int usetimelevel) {
    this.usetimelevel = usetimelevel;
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
