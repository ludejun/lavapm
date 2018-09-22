package com.lavapm.tenant.bean.search;

public class ProductSearch {
  private int developerid;
  private String productname;
  private int ntimeflag;
  private int otimeflag;
  private int platform;
  private String platforms;
  private int productid;
  private int category;
  
  public ProductSearch() {}
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public String getProductname() {
    return productname;
  }
  
  public void setProductname(String productname) { this.productname = productname; }
  
  public int getNtimeflag() {
    return ntimeflag;
  }
  
  public void setNtimeflag(int ntimeflag) { this.ntimeflag = ntimeflag; }
  
  public int getOtimeflag() {
    return otimeflag;
  }
  
  public void setOtimeflag(int otimeflag) { this.otimeflag = otimeflag; }
  
  public int getPlatform() {
    return platform;
  }
  
  public void setPlatform(int platform) { this.platform = platform; }
  
  public String getPlatforms() {
    return platforms;
  }
  
  public void setPlatforms(String platforms) { this.platforms = platforms; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public int getCategory() {
    return category;
  }
  
  public void setCategory(int category) { this.category = category; }
}
