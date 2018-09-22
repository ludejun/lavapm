package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Daydata {
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int productype;
  private int partnerid;
  private int dnewuser;
  private int sumnewuser;
  private int dactiveuser;
  private int sumactiveuser;
  private int dusetime;
  private int sumusetime;
  private int dstartup;
  private int sumstartup;
  private int timeflag;
  private Timestamp time;
  private String davgusetime;
  private String sumusetimestr;
  
  public Daydata() {}
  
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
  
  public int getDusetime() { return dusetime; }
  
  public void setDusetime(int dusetime) {
    this.dusetime = dusetime;
  }
  
  public int getSumusetime() { return sumusetime; }
  
  public void setSumusetime(int sumusetime) {
    this.sumusetime = sumusetime;
  }
  
  public int getDstartup() { return dstartup; }
  
  public void setDstartup(int dstartup) {
    this.dstartup = dstartup;
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
  
  public String getDavgusetime() { return davgusetime; }
  
  public void setDavgusetime(String davgusetime) {
    this.davgusetime = davgusetime;
  }
  
  public String getSumusetimestr() { return sumusetimestr; }
  
  public void setSumusetimestr(String sumusetimestr) {
    this.sumusetimestr = sumusetimestr;
  }
}
