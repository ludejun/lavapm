package com.lavapm.tenant.bean.search;

public class PageInfoSearch { private int developerid;
  private int productid;
  private int platformid;
  private String platforms;
  private String version;
  private String pagename;
  
  public PageInfoSearch() {}
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getPlatforms() { return platforms; }
  
  public void setPlatforms(String platforms) {
    this.platforms = platforms;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public String getVersion() { return version; }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getPagename() { return pagename; }
  
  public void setPagename(String pagename) {
    this.pagename = pagename;
  }
}
