package com.lavapm.tenant.bean;

public class Platform {
  private int platformid;
  private String platformname;
  
  public Platform() {}
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getPlatformname() { return platformname; }
  
  public void setPlatformname(String platformname) {
    this.platformname = platformname;
  }
}
