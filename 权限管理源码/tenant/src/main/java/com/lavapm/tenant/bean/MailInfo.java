package com.lavapm.tenant.bean;

public class MailInfo
{
  private int id;
  private int fromtype;
  private int developerid;
  private int productid;
  
  public MailInfo() {}
  
  public int getId() {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  private String platformid;
  private String email;
  
  public int getFromtype() { return fromtype; }
  
  public void setFromtype(int fromtype) {
    this.fromtype = fromtype;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getProductid() { return productid; }
  

  public void setProductid(int productid) { this.productid = productid; }
  
  private String infotype;
  private String subscribetype;
  public String getPlatformid() { return platformid; }
  
  public void setPlatformid(String platformid) {
    this.platformid = platformid;
  }
  
  public String getEmail() { return email; }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getInfotype() { return infotype; }
  
  public void setInfotype(String infotype) {
    this.infotype = infotype;
  }
  
  public String getSubscribetype() { return subscribetype; }
  
  public void setSubscribetype(String subscribetype) {
    this.subscribetype = subscribetype;
  }
}
