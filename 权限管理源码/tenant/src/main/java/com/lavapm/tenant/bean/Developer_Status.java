package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Developer_Status { int developerid;
  int groupid;
  Timestamp registertime;
  Timestamp createproducttime;
  Timestamp issueproducttime;
  int status;
  
  public Developer_Status() {}
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getGroupid() { return groupid; }
  
  public void setGroupid(int groupid) {
    this.groupid = groupid;
  }
  
  public Timestamp getRegistertime() { return registertime; }
  
  public void setRegistertime(Timestamp registertime) {
    this.registertime = registertime;
  }
  
  public Timestamp getCreateproducttime() { return createproducttime; }
  
  public void setCreateproducttime(Timestamp createproducttime) {
    this.createproducttime = createproducttime;
  }
  
  public Timestamp getIssueproducttime() { return issueproducttime; }
  
  public void setIssueproducttime(Timestamp issueproducttime) {
    this.issueproducttime = issueproducttime;
  }
  
  public int getStatus() { return status; }
  
  public void setStatus(int status) {
    this.status = status;
  }
}
