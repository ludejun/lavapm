package com.lavapm.tenant.bean;

public class PartnerStat {
  private int developerid;
  private int productid;
  private int platformid;
  private int partnerid;
  private String partnername;
  private int todaynewuser;
  private int todayactiveuser;
  private int yesterdaynewuser;
  private int yesterdayactiveuser;
  private int newuser;
  private int activeuser;
  private int startup;
  private int usetime;
  private int allnewuser;
  private int timeflag;
  private int mintimeflag;
  
  public PartnerStat() {}
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) { this.developerid = developerid; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public int getPartnerid() { return partnerid; }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
  }
  
  public String getPartnername() { return partnername; }
  
  public void setPartnername(String partnername) {
    this.partnername = partnername;
  }
  
  public void setPlatformid(int platformid) { this.platformid = platformid; }
  
  public int getTodaynewuser() {
    return todaynewuser;
  }
  
  public void setTodaynewuser(int todaynewuser) { this.todaynewuser = todaynewuser; }
  
  public int getTodayactiveuser() {
    return todayactiveuser;
  }
  
  public void setTodayactiveuser(int todayactiveuser) { this.todayactiveuser = todayactiveuser; }
  
  public int getYesterdaynewuser() {
    return yesterdaynewuser;
  }
  
  public void setYesterdaynewuser(int yesterdaynewuser) { this.yesterdaynewuser = yesterdaynewuser; }
  
  public int getYesterdayactiveuser() {
    return yesterdayactiveuser;
  }
  
  public void setYesterdayactiveuser(int yesterdayactiveuser) { this.yesterdayactiveuser = yesterdayactiveuser; }
  
  public int getNewuser() {
    return newuser;
  }
  
  public void setNewuser(int newuser) { this.newuser = newuser; }
  
  public int getAllnewuser() {
    return allnewuser;
  }
  
  public void setAllnewuser(int allnewuser) { this.allnewuser = allnewuser; }
  
  public int getActiveuser() {
    return activeuser;
  }
  
  public void setActiveuser(int activeuser) { this.activeuser = activeuser; }
  
  public int getUsetime() {
    return usetime;
  }
  
  public void setUsetime(int usetime) { this.usetime = usetime; }
  
  public int getTimeflag() {
    return timeflag;
  }
  
  public void setTimeflag(int timeflag) { this.timeflag = timeflag; }
  
  public int getMintimeflag() {
    return mintimeflag;
  }
  
  public void setMintimeflag(int mintimeflag) { this.mintimeflag = mintimeflag; }
  
  public int getStartup() {
    return startup;
  }
  
  public void setStartup(int startup) { this.startup = startup; }
}
