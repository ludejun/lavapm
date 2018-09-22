package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Partner {
  private Integer productid;
  private Integer partnerid;
  private Integer platformid;
  private String partnername;
  private String partneruser;
  private String partnerpassword;
  private Integer developerid;
  private Timestamp registertime;
  private Timestamp lastlogin;
  private Integer isuser;
  private Integer groupid;
  private Integer isdisplay;
  private String displayname;
  private Integer iscreate;
  private String channelstr;
  
  public Partner() {}
  
  public String getChannelstr() { return channelstr; }
  
  public void setChannelstr(String channelstr)
  {
    this.channelstr = channelstr;
  }
  
  public Integer getIscreate() {
    return iscreate;
  }
  
  public void setIscreate(Integer iscreate) {
    this.iscreate = iscreate;
  }
  
  public Integer getProductid() {
    return productid;
  }
  
  public void setProductid(Integer productid) {
    this.productid = productid;
  }
  
  public Integer getPartnerid() {
    return partnerid;
  }
  
  public void setPartnerid(Integer partnerid) {
    this.partnerid = partnerid;
  }
  
  public Integer getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(Integer platformid) {
    this.platformid = platformid;
  }
  
  public String getPartnername() {
    return partnername;
  }
  
  public void setPartnername(String partnername) {
    this.partnername = partnername;
  }
  
  public String getPartneruser() {
    return partneruser;
  }
  
  public void setPartneruser(String partneruser) {
    this.partneruser = partneruser;
  }
  
  public String getPartnerpassword() {
    return partnerpassword;
  }
  
  public void setPartnerpassword(String partnerpassword) {
    this.partnerpassword = partnerpassword;
  }
  
  public Integer getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(Integer developerid) {
    this.developerid = developerid;
  }
  
  public Timestamp getRegistertime() {
    return registertime;
  }
  
  public void setRegistertime(Timestamp registertime) {
    this.registertime = registertime;
  }
  
  public Timestamp getLastlogin() {
    return lastlogin;
  }
  
  public void setLastlogin(Timestamp lastlogin) {
    this.lastlogin = lastlogin;
  }
  
  public Integer getIsuser() {
    return isuser;
  }
  
  public void setIsuser(Integer isuser) {
    this.isuser = isuser;
  }
  
  public Integer getIsdisplay() {
    return isdisplay;
  }
  
  public void setIsdisplay(Integer isdisplay) {
    this.isdisplay = isdisplay;
  }
  
  public String getDisplayname() {
    return displayname;
  }
  
  public void setDisplayname(String displayname) {
    this.displayname = displayname;
  }
  
  public Integer getGroupid() {
    return groupid;
  }
  
  public void setGroupid(Integer groupid) {
    this.groupid = groupid;
  }
  
  public String toString()
  {
    return "Partner [productid=" + productid + ", partnerid=" + partnerid + ", platformid=" + platformid + ", partnername=" + partnername + ", partneruser=" + partneruser + ", partnerpassword=" + partnerpassword + ", developerid=" + developerid + ", registertime=" + registertime + ", lastlogin=" + lastlogin + ", isuser=" + isuser + ", groupid=" + groupid + ", isdisplay=" + isdisplay + ", displayname=" + displayname + ", iscreate=" + iscreate + ", channelstr=" + channelstr + "]";
  }
}
