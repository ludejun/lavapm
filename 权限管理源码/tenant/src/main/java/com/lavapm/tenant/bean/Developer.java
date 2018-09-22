package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Developer {
  private int developerid;
  private String email;
  private String password;
  private String salt;
  private String name;
  private String contact;
  private String telephone;
  private String qq;
  private String companyname;
  private String logininfor;
  private int groupid;
  private Timestamp registertime;
  private Timestamp earlistregistertime;
  private int productcount;
  private int isactivate;
  private Timestamp loseefficacytime;
  private String loginname;
  
  public Developer() {}
  
  public Timestamp getEarlistregistertime() {
    return earlistregistertime;
  }
  
  public void setEarlistregistertime(Timestamp earlistregistertime) { this.earlistregistertime = earlistregistertime; }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) { this.email = email; }
  
  public String getPassword() {
    return password;
  }
  
  public void setPassword(String password) { this.password = password; }
  
  public String getContact()
  {
    return contact;
  }
  
  public void setContact(String contact) { this.contact = contact; }
  
  public String getSalt() {
    return salt;
  }
  
  public void setSalt(String salt) { this.salt = salt; }
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) { this.name = name; }
  
  public String getTelephone() {
    return telephone;
  }
  
  public void setTelephone(String telephone) { this.telephone = telephone; }
  
  public String getQq()
  {
    return qq;
  }
  
  public void setQq(String qq) { this.qq = qq; }
  
  public String getCompanyname() {
    return companyname;
  }
  
  public void setCompanyname(String companyname) { this.companyname = companyname; }
  
  public String getLogininfor() {
    return logininfor;
  }
  
  public void setLogininfor(String logininfor) { this.logininfor = logininfor; }
  
  public Timestamp getRegistertime() {
    return registertime;
  }
  
  public void setRegistertime(Timestamp registertime) { this.registertime = registertime; }
  
  public int getProductcount() {
    return productcount;
  }
  
  public void setProductcount(int productcount) { this.productcount = productcount; }
  
  public int getIsactivate() {
    return isactivate;
  }
  
  public void setIsactivate(int isactivate) { this.isactivate = isactivate; }
  
  public Timestamp getLoseefficacytime() {
    return loseefficacytime;
  }
  
  public void setLoseefficacytime(Timestamp loseefficacytime) { this.loseefficacytime = loseefficacytime; }
  
  public int getGroupid() {
    return groupid;
  }
  
  public void setGroupid(int groupid) { this.groupid = groupid; }
  
  public String getLoginname() {
    return loginname;
  }
  
  public void setLoginname(String loginname) { this.loginname = loginname; }
  
  public Developer clone() {
    Developer deve = new Developer();
    deve.setDeveloperid(getDeveloperid());
    deve.setEmail(getEmail());
    deve.setPassword(getPassword());
    deve.setSalt(getSalt());
    deve.setName(getName());
    deve.setContact(getContact());
    deve.setCompanyname(getCompanyname());
    deve.setGroupid(getGroupid());
    deve.setLogininfor(getLogininfor());
    deve.setTelephone(getTelephone());
    deve.setQq(getQq());
    deve.setRegistertime(getRegistertime());
    return deve;
  }
}
