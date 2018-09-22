package com.lavapm.tenant.bean;

public class ExceptionInfo { private int developerid;
  private int productid;
  private int platformid;
  private String version;
  private int errornum;
  private int startupnum;
  private int errordevnum;
  private int startupusernum;
  
  public ExceptionInfo() {}
  
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
  
  public int getErrornum() { return errornum; }
  
  public void setErrornum(int errornum) {
    this.errornum = errornum;
  }
  
  public int getStartupnum() { return startupnum; }
  
  public void setStartupnum(int startupnum) {
    this.startupnum = startupnum;
  }
  
  public int getErrordevnum() { return errordevnum; }
  
  public void setErrordevnum(int errordevnum) {
    this.errordevnum = errordevnum;
  }
  
  public int getStartupusernum() { return startupusernum; }
  
  public void setStartupusernum(int startupusernum) {
    this.startupusernum = startupusernum;
  }
}
