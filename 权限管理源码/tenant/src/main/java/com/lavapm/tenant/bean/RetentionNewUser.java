package com.lavapm.tenant.bean;

public class RetentionNewUser {
  private int dnewuser;
  
  public RetentionNewUser() {}
  
  public int getDnewuser() { return dnewuser; }
  
  public void setDnewuser(int dnewuser) {
    this.dnewuser = dnewuser;
  }
  
  public int getBeforenum() { return beforenum; }
  
  public void setBeforenum(int beforenum) {
    this.beforenum = beforenum;
  }
  
  public int getToday() { return today; }
  
  public void setToday(int today) {
    this.today = today;
  }
  
  private int beforenum;
  private int today;
}
