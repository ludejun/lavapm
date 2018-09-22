package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Hourdata {
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int productype;
  private int partnerid;
  private int hnewuser;
  private int sumnewuser;
  private int hactiveuser;
  private int sumactiveuser;
  private int husetime;
  private int sumusetime;
  private int hstartup;
  private int sumstartup;
  private int timeflag;
  private Timestamp time;
  
  public Hourdata() {}
  
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
  
  public int getProductype() { return productype; }
  
  public void setProductype(int productype) {
    this.productype = productype;
  }
  
  public int getPartnerid() { return partnerid; }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
  }
  
  public int getHnewuser() { return hnewuser; }
  
  public void setHnewuser(int hnewuser) {
    this.hnewuser = hnewuser;
  }
  
  public int getSumnewuser() { return sumnewuser; }
  
  public void setSumnewuser(int sumnewuser) {
    this.sumnewuser = sumnewuser;
  }
  
  public int getHactiveuser() { return hactiveuser; }
  
  public void setHactiveuser(int hactiveuser) {
    this.hactiveuser = hactiveuser;
  }
  
  public int getSumactiveuser() { return sumactiveuser; }
  
  public void setSumactiveuser(int sumactiveuser) {
    this.sumactiveuser = sumactiveuser;
  }
  
  public int getHusetime() { return husetime; }
  
  public void setHusetime(int husetime) {
    this.husetime = husetime;
  }
  
  public int getSumusetime() { return sumusetime; }
  
  public void setSumusetime(int sumusetime) {
    this.sumusetime = sumusetime;
  }
  
  public int getHstartup() { return hstartup; }
  
  public void setHstartup(int hstartup) {
    this.hstartup = hstartup;
  }
  
  public int getSumstartup() { return sumstartup; }
  
  public void setSumstartup(int sumstartup) {
    this.sumstartup = sumstartup;
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
