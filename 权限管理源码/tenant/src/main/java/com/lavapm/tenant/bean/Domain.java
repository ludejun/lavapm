package com.lavapm.tenant.bean;

public class Domain { private Long sumnewuser;
  private float avgnewuser;
  private Float yactiveuser;
  private float sumactiveuser;
  private long sumstartup;
  private float avgstartup;
  private long sumusetime;
  private int developerid;
  private int productid;
  private int platformid;
  private int mintimeflag;
  
  public Domain() {}
  
  public Long getSumnewuser() { return sumnewuser; }
  
  public void setSumnewuser(Long sumnewuser) {
    this.sumnewuser = sumnewuser;
  }
  
  public Float getYactiveuser() { return yactiveuser; }
  
  public void setYactiveuser(Float yactiveuser) {
    this.yactiveuser = yactiveuser;
  }
  
  public float getAvgnewuser() { return avgnewuser; }
  
  public void setAvgnewuser(float avgnewuser) {
    this.avgnewuser = avgnewuser;
  }
  
  public float getSumactiveuser() {
    return sumactiveuser;
  }
  
  public void setSumactiveuser(float sumactiveuser) { this.sumactiveuser = sumactiveuser; }
  
  public long getSumstartup() {
    return sumstartup;
  }
  
  public void setSumstartup(long sumstartup) { this.sumstartup = sumstartup; }
  
  public float getAvgstartup() {
    return avgstartup;
  }
  
  public void setAvgstartup(float avgstartup) { this.avgstartup = avgstartup; }
  
  public long getSumusetime()
  {
    return sumusetime;
  }
  
  public void setSumusetime(long sumusetime) { this.sumusetime = sumusetime; }
  
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
  
  public void setPlatformid(int platformid) { this.platformid = platformid; }
  
  public int getMintimeflag() {
    return mintimeflag;
  }
  
  public void setMintimeflag(int mintimeflag) { this.mintimeflag = mintimeflag; }
}
