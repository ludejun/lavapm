package com.lavapm.tenant.bean;

import java.util.Date;

public class PartnerAccount {
  private int partnerid;
  private int productid;
  private int platformid;
  private String partnername;
  private String displayname;
  private String loginname;
  private String passwd;
  private Date lastlogintime;
  private int isforbid;
  private String reporturl;
  private String channelstr;
  private String lastlogintimeStr;
  
  public PartnerAccount() {}
  
  public String getLastlogintimeStr() { if (lastlogintime == null)
      return "";
    java.text.SimpleDateFormat simpleDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd kk : mm");
    
    return simpleDateFormat.format(lastlogintime);
  }
  
  public int getPartnerid() {
    return partnerid;
  }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
  }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public String getPartnername() {
    return partnername;
  }
  
  public void setPartnername(String partnername) {
    this.partnername = partnername;
  }
  
  public String getDisplayname() {
    return displayname;
  }
  
  public void setDisplayname(String displayname) {
    this.displayname = displayname;
  }
  
  public String getLoginname() {
    return loginname;
  }
  
  public void setLoginname(String loginname) {
    this.loginname = loginname;
  }
  
  public String getPasswd() {
    return passwd;
  }
  
  public void setPasswd(String passwd) {
    this.passwd = passwd;
  }
  
  public int getIsforbid() {
    return isforbid;
  }
  
  public void setIsforbid(int isforbid) {
    this.isforbid = isforbid;
  }
  
  public String getReporturl() {
    return reporturl;
  }
  
  public void setReporturl(String reporturl) {
    this.reporturl = reporturl;
  }
  
  public String getChannelstr() {
    return channelstr;
  }
  
  public void setChannelstr(String channelstr) {
    this.channelstr = channelstr;
  }
  
  public Date getLastlogintime() {
    return lastlogintime;
  }
  
  public void setLastlogintime(Date lastlogintime) {
    this.lastlogintime = lastlogintime;
  }
  
  public void setLastlogintimeStr(String lastlogintimeStr) {
    this.lastlogintimeStr = lastlogintimeStr;
  }
  
  public String toString()
  {
    return "PartnerAccount [partnerid=" + partnerid + ", productid=" + productid + ", platformid=" + platformid + ", partnername=" + partnername + ", displayname=" + displayname + ", loginname=" + loginname + ", passwd=" + passwd + ", lastlogintime=" + lastlogintime + ", isforbid=" + isforbid + ", reporturl=" + reporturl + ", channelstr=" + channelstr + ", lastlogintimeStr=" + lastlogintimeStr + "]";
  }
}
