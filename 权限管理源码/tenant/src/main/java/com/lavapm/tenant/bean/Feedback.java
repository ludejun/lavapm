package com.lavapm.tenant.bean;

import java.sql.Timestamp;




public class Feedback
{
  private int id;
  private int developerid;
  private String email;
  private int productid;
  private String productname;
  private int productnum;
  private String pagename;
  private String feedbackinfo;
  private Timestamp time;
  
  public Feedback() {}
  
  public Feedback(int developerid, String email, int productid, String productname, int productnum, String pagename, String feedbackinfo, Timestamp time)
  {
    this.developerid = developerid;
    this.email = email;
    this.productid = productid;
    this.productname = productname;
    this.productnum = productnum;
    this.pagename = pagename;
    this.feedbackinfo = feedbackinfo;
    this.time = time;
  }
  
  public int getId() { return id; }
  
  public void setId(int id) {
    this.id = id;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public String getEmail() { return email; }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public String getProductname() { return productname; }
  
  public void setProductname(String productname) {
    this.productname = productname;
  }
  
  public int getProductnum() { return productnum; }
  
  public void setProductnum(int productnum) {
    this.productnum = productnum;
  }
  
  public String getPagename() {
    return pagename;
  }
  
  public void setPagename(String pagename) { this.pagename = pagename; }
  
  public String getFeedbackinfo() {
    return feedbackinfo;
  }
  
  public void setFeedbackinfo(String feedbackinfo) { this.feedbackinfo = feedbackinfo; }
  
  public Timestamp getTime() {
    return time;
  }
  
  public void setTime(Timestamp time) { this.time = time; }
}
