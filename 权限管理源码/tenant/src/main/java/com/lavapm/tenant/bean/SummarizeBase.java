package com.lavapm.tenant.bean;

public class SummarizeBase {
  private int allnewser;
  private String allstartup;
  private float yactiveuser;
  private float ysactiveuser;
  private float ytactiveuser;
  
  public SummarizeBase() {}
  private float silentuser;
  private float pyactiveuser;
  
  public int getAllnewser() {
    return allnewser;
  }
  
  public void setAllnewser(int allnewser) { this.allnewser = allnewser; }
  
  private float pysactiveuser;
  
  public String getAllstartup() { return allstartup; }
  
  public void setAllstartup(String allstartup) {
    this.allstartup = allstartup;
  }
  
  public float getYactiveuser() { return yactiveuser; }
  private float pytactiveuser;
  
  public void setYactiveuser(float yactiveuser) { this.yactiveuser = yactiveuser; }
  

  public float getYsactiveuser() { return ysactiveuser; }
  
  private float psilentuser;
  public void setYsactiveuser(float ysactiveuser) { this.ysactiveuser = ysactiveuser; }
  
  public float getYtactiveuser() {
    return ytactiveuser;
  }
  
  public void setYtactiveuser(float ytactiveuser) { this.ytactiveuser = ytactiveuser; }
  
  public float getSilentuser() {
    return silentuser;
  }
  
  public void setSilentuser(float silentuser) { this.silentuser = silentuser; }
  
  public float getPyactiveuser() {
    return pyactiveuser;
  }
  
  public void setPyactiveuser(float pyactiveuser) { this.pyactiveuser = pyactiveuser; }
  
  public float getPysactiveuser() {
    return pysactiveuser;
  }
  
  public void setPysactiveuser(float pysactiveuser) { this.pysactiveuser = pysactiveuser; }
  
  public float getPytactiveuser() {
    return pytactiveuser;
  }
  
  public void setPytactiveuser(float pytactiveuser) { this.pytactiveuser = pytactiveuser; }
  
  public float getPsilentuser() {
    return psilentuser;
  }
  
  public void setPsilentuser(float psilentuser) { this.psilentuser = psilentuser; }
}
