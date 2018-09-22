package com.lavapm.tenant.bean.search;

public class VersionSearch { private int productid;
  private String platformid;
  private String platforms;
  private String versionname;
  private Integer hideversion;
  
  public VersionSearch() {}
  
  public Integer getHideversion() { return hideversion; }
  
  public void setHideversion(Integer hideversion) {
    this.hideversion = hideversion;
  }
  
  public String getPlatformid() { return platformid; }
  
  public void setPlatformid(String platformid) {
    this.platformid = platformid;
  }
  
  public String getVersionname() { return versionname; }
  
  public void setVersionname(String versionname) {
    this.versionname = versionname;
  }
  
  public String getPlatforms() { return platforms; }
  
  public void setPlatforms(String platforms) {
    this.platforms = platforms;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
}
