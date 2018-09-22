package com.lavapm.tenant.bean;

public class Exceptionos { private int developerid;
  private int productid;
  private int platformid;
  private String version;
  private String osversion;
  private String errorname;
  private String errormessage;
  private int errornum;
  private String hashcode;
  
  public Exceptionos() {}
  
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
  
  public String getHashcode() { return hashcode; }
  
  public void setHashcode(String hashcode) {
    this.hashcode = hashcode;
  }
}
