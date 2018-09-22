package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Exceptionlist { private int id;
  private int developerid;
  private int productid;
  private int platformid;
  private String version;
  private String errorname;
  private String errormessage;
  private int errornum;
  private int isrestore;
  private Timestamp lasttime;
  private String hashcode;
  
  public Exceptionlist() {}
  
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
  
  public String getVersion() { return version; }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getErrorname() { return errorname; }
  
  public void setErrorname(String errorname) {
    this.errorname = errorname;
  }
  
  public String getErrormessage() { return errormessage; }
  
  public void setErrormessage(String errormessage) {
    this.errormessage = errormessage;
  }
  
  public int getErrornum() { return errornum; }
  
  public void setErrornum(int errornum) {
    this.errornum = errornum;
  }
  
  public int getIsrestore() { return isrestore; }
  
  public void setIsrestore(int isrestore) {
    this.isrestore = isrestore;
  }
  
  public Timestamp getLasttime() { return lasttime; }
  
  public void setLasttime(Timestamp lasttime) {
    this.lasttime = lasttime;
  }
  
  public String getHashcode() { return hashcode; }
  
  public void setHashcode(String hashcode) {
    this.hashcode = hashcode;
  }
}
