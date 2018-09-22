package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Chanelinfor {
  private int developerid;
  private int productid;
  private int platformid;
  private int chanel;
  private String chanelname;
  private int dnewuser;
  private int sumnewuser;
  private int dactiveuser;
  private int sumactiveuser;
  private int timeflag;
  private Timestamp time;
  
  public Chanelinfor() {}
  
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
  
  public int getChanel() { return chanel; }
  
  public void setChanel(int chanel) {
    this.chanel = chanel;
  }
  
  public String getChanelname() { return chanelname; }
  
  public void setChanelname(String chanelname) {
    this.chanelname = chanelname;
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
}
