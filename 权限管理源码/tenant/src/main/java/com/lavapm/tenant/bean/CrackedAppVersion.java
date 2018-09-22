package com.lavapm.tenant.bean;

public class CrackedAppVersion { private String appversion;
  private int newuser;
  private int crackeduser;
  private float versioncracked;
  
  public CrackedAppVersion() {}
  
  public String getAppversion() { return appversion; }
  
  public void setAppversion(String appversion) {
    this.appversion = appversion;
  }
  
  public int getNewuser() { return newuser; }
  
  public void setNewuser(int newuser) {
    this.newuser = newuser;
  }
  
  public int getCrackeduser() { return crackeduser; }
  
  public void setCrackeduser(int crackeduser) {
    this.crackeduser = crackeduser;
  }
  
  public float getVersioncracked() { return versioncracked; }
  
  public void setVersioncracked(float versioncracked) {
    this.versioncracked = versioncracked;
  }
}
