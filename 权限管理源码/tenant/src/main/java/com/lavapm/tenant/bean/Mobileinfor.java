package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Mobileinfor { private int developerid;
  private int productid;
  private int platformid;
  private int mobile;
  private String mobilename;
  private int dnewuser;
  private int sumnewuser;
  private int dactiveuser;
  private int sumactiveuser;
  private int timeflag;
  private Timestamp time;
  private float sumnewuseravg;
  
  public Mobileinfor() {}
  
  public float getSumnewuseravg() { return sumnewuseravg; }
  
  public void setSumnewuseravg(float sumnewuseravg) {
    this.sumnewuseravg = sumnewuseravg;
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
  
  public int getMobile() { return mobile; }
  
  public void setMobile(int mobile) {
    this.mobile = mobile;
  }
  
  public int getDnewuser() { return dnewuser; }
  
  public void setDnewuser(int dnewuser) {
    this.dnewuser = dnewuser;
  }
  
  public int getSumnewuser() { return sumnewuser; }
  
  public void setSumnewuser(int sumnewuser) {
    this.sumnewuser = sumnewuser;
  }
  
  public int getDactiveuser() { return dactiveuser; }
  
  public void setDactiveuser(int dactiveuser) {
    this.dactiveuser = dactiveuser;
  }
  
  public int getSumactiveuser() { return sumactiveuser; }
  
  public void setSumactiveuser(int sumactiveuser) {
    this.sumactiveuser = sumactiveuser;
  }
  
  public int getTimeflag() { return timeflag; }
  
  public void setTimeflag(int timeflag) {
    this.timeflag = timeflag;
  }
  
  public Timestamp getTime() { return time; }
  
  public void setTime(Timestamp time) {
    this.time = time;
  }
  
  public String getMobilename() { return mobilename; }
  
  public void setMobilename(String mobilename) {
    this.mobilename = mobilename;
  }
}
