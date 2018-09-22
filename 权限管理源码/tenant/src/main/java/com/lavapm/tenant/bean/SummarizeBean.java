package com.lavapm.tenant.bean;

public class SummarizeBean {
  private String name;
  private int newuser;
  private int activeuser;
  private String maxnewuser;
  private String maxactiveuser;
  private String avgstartup;
  private float avgusertime;
  private float pactiveuser;
  private float pewuser;
  private int newusertime = -1;
  private int activeusertime = -1;
  
  public SummarizeBean() {}
  
  public String getName() { return name; }
  
  private String avgusetime;
  public void setName(String name) { this.name = name; }
  

  public int getNewuser() { return newuser; }
  
  public void setNewuser(int newuser) {
    this.newuser = newuser;
  }
  
  public int getActiveuser() { return activeuser; }
  
  public void setActiveuser(int activeuser) {
    this.activeuser = activeuser;
  }
  
  public String getAvgstartup() {
    return avgstartup;
  }
  
  public void setAvgstartup(String avgstartup) { this.avgstartup = avgstartup; }
  
  public float getAvgusertime() {
    return avgusertime;
  }
  
  public void setAvgusertime(float avgusertime) { this.avgusertime = avgusertime; }
  
  public float getPactiveuser() {
    return pactiveuser;
  }
  
  public void setPactiveuser(float pactiveuser) { this.pactiveuser = pactiveuser; }
  
  public float getPewuser() {
    return pewuser;
  }
  
  public void setPewuser(float pewuser) { this.pewuser = pewuser; }
  
  public int getNewusertime() {
    return newusertime;
  }
  
  public void setNewusertime(int newusertime) { this.newusertime = newusertime; }
  
  public int getActiveusertime() {
    return activeusertime;
  }
  
  public void setActiveusertime(int activeusertime) { this.activeusertime = activeusertime; }
  
  public String getMaxnewuser() {
    return maxnewuser;
  }
  
  public void setMaxnewuser(String maxnewuser) { this.maxnewuser = maxnewuser; }
  
  public String getMaxactiveuser() {
    return maxactiveuser;
  }
  
  public void setMaxactiveuser(String maxactiveuser) { this.maxactiveuser = maxactiveuser; }
  
  public String getAvgusetime() {
    return avgusetime;
  }
  
  public void setAvgusetime(String avgusetime) { this.avgusetime = avgusetime; }
}
