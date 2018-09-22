package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Activeuserstate
{
  private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private int productype;
  
  public Activeuserstate() {}
  
  public int getId()
  {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  private int sevenactive;
  public int getDeveloperid() { return developerid; }
  
  private int thractive;
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  private long sumnewuser;
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public int getProductype() { return productype; }
  private int timeflag;
  
  public void setProductype(int productype) { this.productype = productype; }
  
  private Timestamp time;
  public int getSevenactive() { return sevenactive; }
  
  public void setSevenactive(int sevenactive) {
    this.sevenactive = sevenactive;
  }
  
  public int getThractive() { return thractive; }
  
  public void setThractive(int thractive) {
    this.thractive = thractive;
  }
  
  public long getSumnewuser() { return sumnewuser; }
  
  public void setSumnewuser(long sumnewuser) {
    this.sumnewuser = sumnewuser;
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
