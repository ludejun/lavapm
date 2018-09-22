package com.lavapm.tenant.bean;

import java.sql.Timestamp;


public class DeveloperAPI
{
  private String accesskey;
  private int developerid;
  private String name;
  private String company;
  private String department;
  private String post;
  private String telephone;
  private String qq;
  private String usefun;
  private String email;
  private Timestamp inserttime;
  private int currentstatus;
  
  public DeveloperAPI() {}
  
  public String getAccesskey()
  {
    return accesskey;
  }
  
  public void setAccesskey(String accesskey) { this.accesskey = accesskey; }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) { this.name = name; }
  
  public String getCompany() {
    return company;
  }
  
  public void setCompany(String company) { this.company = company; }
  
  public String getDepartment() {
    return department;
  }
  
  public void setDepartment(String department) { this.department = department; }
  
  public String getPost() {
    return post;
  }
  
  public void setPost(String post) { this.post = post; }
  
  public String getTelephone() {
    return telephone;
  }
  
  public void setTelephone(String telephone) { this.telephone = telephone; }
  
  public String getQq() {
    return qq;
  }
  
  public void setQq(String qq) { this.qq = qq; }
  
  public String getUsefun()
  {
    return usefun;
  }
  
  public void setUsefun(String usefun) { this.usefun = usefun; }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) { this.email = email; }
  
  public Timestamp getInserttime()
  {
    return inserttime;
  }
  
  public void setInserttime(Timestamp inserttime) { this.inserttime = inserttime; }
  
  public int getCurrentstatus()
  {
    return currentstatus;
  }
  
  public void setCurrentstatus(int currentstatus) { this.currentstatus = currentstatus; }
  
  public String toString()
  {
    return "DeveloperAPI [" + (accesskey != null ? "accesskey=" + accesskey + ", " : "") + "developerid=" + developerid + ", " + (name != null ? "name=" + name + ", " : "") + (company != null ? "company=" + company + ", " : "") + (department != null ? "department=" + department + ", " : "") + (post != null ? "post=" + post + ", " : "") + (telephone != null ? "telephone=" + telephone + ", " : "") + (qq != null ? "qq=" + qq + ", " : "") + (usefun != null ? "usefun=" + usefun + ", " : "") + (email != null ? "email=" + email + ", " : "") + (inserttime != null ? "inserttime=" + inserttime + ", " : "") + "currentstatus=" + currentstatus + "]";
  }
}
