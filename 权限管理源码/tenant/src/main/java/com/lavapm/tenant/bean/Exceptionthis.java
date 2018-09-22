package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Exceptionthis { private int developerid;
  private int productid;
  private int platformid;
  private String version;
  private String osversion;
  private String mobile;
  private String errorname;
  private String errormessage;
  private Timestamp time;
  private String hashcode;
  
  public Exceptionthis() {}
  
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
  
  public String getVersion() { return version; }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getOsversion() { return osversion; }
  
  public void setOsversion(String osversion) {
    this.osversion = osversion;
  }
  
  public String getMobile() { return mobile; }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public String getErrorname() { return errorname; }
  
  public void setErrorname(String errorname) {
    this.errorname = errorname;
  }
  
  public String getErrormessage() { return errormessage; }
  
  public void setErrormessage(String errormessage) {
    this.errormessage = errormessage;
  }
  
  public Timestamp getTime() { return time; }
  
  public void setTime(Timestamp time) {
    this.time = time;
  }
  
  public String getHashcode() { return hashcode; }
  
  public void setHashcode(String hashcode) {
    this.hashcode = hashcode;
  }
}
