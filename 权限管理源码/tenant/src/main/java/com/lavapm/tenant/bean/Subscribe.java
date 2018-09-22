package com.lavapm.tenant.bean;


public class Subscribe
{
  private int developerid;
  private int productid;
  private String platformid;
  private String email;
  private String infotype;
  private String subscribetype;
  
  public Subscribe(int developerid, int productid, String platformid, String email, String infotype, String subscribetype)
  {
    this.developerid = developerid;
    this.productid = productid;
    this.platformid = platformid;
    this.email = email;
    this.infotype = infotype;
    this.subscribetype = subscribetype;
  }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public String getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(String platformid) { this.platformid = platformid; }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) { this.email = email; }
  
  public String getInfotype()
  {
    return infotype;
  }
  
  public void setInfotype(String infotype) {
    this.infotype = infotype;
  }
  
  public String getSubscribetype() {
    return subscribetype;
  }
  
  public void setSubscribetype(String subscribetype) {
    this.subscribetype = subscribetype;
  }
}
