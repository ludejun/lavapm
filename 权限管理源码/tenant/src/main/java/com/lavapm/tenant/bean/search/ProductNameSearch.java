package com.lavapm.tenant.bean.search;

public class ProductNameSearch
{
  private int developerid;
  private String productname;
  
  public ProductNameSearch(int developerid, String productname) {
    this.developerid = developerid;
    this.productname = productname;
  }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public String getProductname() {
    return productname;
  }
  
  public void setProductname(String productname) { this.productname = productname; }
}
