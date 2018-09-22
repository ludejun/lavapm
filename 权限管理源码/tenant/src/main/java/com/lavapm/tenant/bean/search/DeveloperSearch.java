package com.lavapm.tenant.bean.search;

public class DeveloperSearch { private int childid;
  private int developerid;
  private int roletype;
  private String email;
  private String name;
  private String password;
  
  public DeveloperSearch() {}
  
  public int getChildid() { return childid; }
  
  public void setChildid(int childid)
  {
    this.childid = childid;
  }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public int getRoletype()
  {
    return roletype;
  }
  
  public void setRoletype(int roletype) {
    this.roletype = roletype;
  }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) { this.email = email; }
  
  public String getName()
  {
    return name;
  }
  
  public void setName(String name) { this.name = name; }
  
  public String getPassword() {
    return password;
  }
  
  public void setPassword(String password) { this.password = password; }
}
