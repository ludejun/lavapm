package com.lavapm.tenant.bean;

public class DevelopChangePasswd
{
  private int developerid;
  private String password;
  
  public DevelopChangePasswd(int developerid, String password) {
    this.developerid = developerid;
    this.password = password;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public String getPassword() { return password; }
  
  public void setPassword(String password) {
    this.password = password;
  }
}
