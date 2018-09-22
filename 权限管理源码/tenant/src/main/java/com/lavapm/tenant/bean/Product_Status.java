package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Product_Status
{
  int productid;
  int groupid;
  int developerid;
  int platformid;
  Timestamp registertime;
  
  public Product_Status() {}
  
  public int getProductid()
  {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  int testtime;
  public int getGroupid() { return groupid; }
  
  int issuetime;
  public void setGroupid(int groupid) { this.groupid = groupid; }
  
  int losttime;
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public Timestamp getRegistertime() { return registertime; }
  String lostreason;
  
  public void setRegistertime(Timestamp registertime) { this.registertime = registertime; }
  
  int status;
  public int getTesttime() { return testtime; }
  
  public void setTesttime(int testtime) {
    this.testtime = testtime;
  }
  
  public int getIssuetime() { return issuetime; }
  
  public void setIssuetime(int issuetime) {
    this.issuetime = issuetime;
  }
  
  public int getLosttime() { return losttime; }
  
  public void setLosttime(int losttime) {
    this.losttime = losttime;
  }
  
  public String getLostreason() { return lostreason; }
  
  public void setLostreason(String lostreason) {
    this.lostreason = lostreason;
  }
  
  public int getStatus() { return status; }
  
  public void setStatus(int status) {
    this.status = status;
  }
}
