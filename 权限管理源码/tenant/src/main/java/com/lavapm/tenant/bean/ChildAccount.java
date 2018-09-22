package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class ChildAccount {
  private int childid;
  private String email;
  private String password;
  private int accounttype;
  private Timestamp registertime;
  private String pageid;
  private String productid;
  private int developerid;
  private int isfirst;
  private String salt;
  private String loginname;
  private String roleid;
  
  public ChildAccount() {}
  
  public int getIsfirst() { return isfirst; }
  
  public void setIsfirst(int isfirst) {
    this.isfirst = isfirst;
  }
  
  public int getChildid() { return childid; }
  
  public void setChildid(int childid) {
    this.childid = childid;
  }
  
  public String getEmail() { return email; }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getPassword() { return password; }
  
  public void setPassword(String password) {
    this.password = password;
  }
  
  public int getAccounttype() { return accounttype; }
  
  public void setAccounttype(int accounttype) {
    this.accounttype = accounttype;
  }
  
  public Timestamp getRegistertime() { return registertime; }
  
  public void setRegistertime(Timestamp registertime) {
    this.registertime = registertime;
  }
  
  public String getPageid() { return pageid; }
  
  public void setPageid(String pageid) {
    this.pageid = pageid;
  }
  
  public String getProductid() { return productid; }
  
  public void setProductid(String productid) {
    this.productid = productid;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public String getSalt() { return salt; }
  
  public void setSalt(String salt) {
    this.salt = salt;
  }
  
  public String getLoginname() { return loginname; }
  
  public void setLoginname(String loginname) {
    this.loginname = loginname;
  }
  
  public String getRoleid() { return roleid; }
  
  public void setRoleid(String roleid) {
    this.roleid = roleid;
  }
  
  public String toString()
  {
    return "ChildAccount [childid=" + childid + ", email=" + email + ", password=" + password + ", accounttype=" + accounttype + ", registertime=" + registertime + ", pageid=" + pageid + ", productid=" + productid + ", developerid=" + developerid + ", isfirst=" + isfirst + ", salt=" + salt + ", loginname=" + loginname + ", roleid=" + roleid + "]";
  }
}
