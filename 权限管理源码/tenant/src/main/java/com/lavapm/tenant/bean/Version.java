package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Version {
  private String platformid;
  private Integer productid;
  private String version;
  private String versionname;
  private Timestamp time;
  private String sdkversion;
  private Integer hideversion;
  private String linkaddress;
  private String increasedfunctionality;
  private String repairproblems;
  private String developmentguide;
  
  public Version() {}
  
  public String getIncreasedfunctionality() {
    return increasedfunctionality;
  }
  
  public void setIncreasedfunctionality(String increasedfunctionality) {
    this.increasedfunctionality = increasedfunctionality;
  }
  
  public String getRepairproblems() {
    return repairproblems;
  }
  
  public void setRepairproblems(String repairproblems) {
    this.repairproblems = repairproblems;
  }
  
  public String getDevelopmentguide() {
    return developmentguide;
  }
  
  public void setDevelopmentguide(String developmentguide) {
    this.developmentguide = developmentguide;
  }
  
  public String getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(String platformid) {
    this.platformid = platformid;
  }
  
  public Integer getProductid() {
    return productid;
  }
  
  public void setProductid(Integer productid) {
    this.productid = productid;
  }
  
  public String getLinkaddress() {
    return linkaddress;
  }
  
  public void setLinkaddress(String linkaddress) {
    this.linkaddress = linkaddress;
  }
  
  public String getVersion() {
    return version;
  }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getVersionname() {
    return versionname;
  }
  
  public void setVersionname(String versionname) {
    this.versionname = versionname;
  }
  
  public Integer getHideversion() {
    return hideversion;
  }
  
  public void setHideversion(Integer hideversion) {
    this.hideversion = hideversion;
  }
  
  public Timestamp getTime() {
    return time;
  }
  
  public void setTime(Timestamp time) {
    this.time = time;
  }
  
  public String getSdkversion() {
    return sdkversion;
  }
  
  public void setSdkversion(String sdkversion) {
    this.sdkversion = sdkversion;
  }
}
