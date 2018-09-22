package com.lavapm.tenant.bean;

public class JailbrokenRatio {
  private int newuser;
  private int activeuser;
  
  public JailbrokenRatio() {}
  
  public int getNewuser() { return newuser; }
  
  public void setNewuser(int newuser) {
    this.newuser = newuser;
  }
  
  public int getActiveuser() { return activeuser; }
  
  public void setActiveuser(int activeuser) {
    this.activeuser = activeuser;
  }
  
  public int getCrackeduser() { return crackeduser; }
  
  public void setCrackeduser(int crackeduser) {
    this.crackeduser = crackeduser;
  }
  
  public String getAppversion() { return appversion; }
  

  public void setAppversion(String appversion) { this.appversion = appversion; }
  
  private int crackeduser;
  private String appversion;
  public String toString() { return "JailbrokenRatio [appversion=" + appversion + ", newuser=" + newuser + ", activeuser=" + activeuser + ", crackeduser=" + crackeduser + "]"; }
}
