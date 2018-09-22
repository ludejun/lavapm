package com.lavapm.tenant.bean;

public class Pageinfor { private int productid;
  private String version;
  private String pagename;
  private int viewnum;
  private int averagestay;
  private int jumpnum;
  private int exitnum;
  private int allviewnum;
  private int allaveragestay;
  
  public Pageinfor() {}
  
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
  
  public int getViewnum() { return viewnum; }
  
  public void setViewnum(int viewnum) {
    this.viewnum = viewnum;
  }
  
  public int getAveragestay() { return averagestay; }
  
  public void setAveragestay(int averagestay) {
    this.averagestay = averagestay;
  }
  
  public int getJumpnum() { return jumpnum; }
  
  public void setJumpnum(int jumpnum) {
    this.jumpnum = jumpnum;
  }
  
  public int getExitnum() {
    return exitnum;
  }
  
  public void setExitnum(int exitnum) { this.exitnum = exitnum; }
  
  public int getAllviewnum() {
    return allviewnum;
  }
  
  public void setAllviewnum(int allviewnum) { this.allviewnum = allviewnum; }
  
  public int getAllaveragestay() {
    return allaveragestay;
  }
  
  public void setAllaveragestay(int allaveragestay) { this.allaveragestay = allaveragestay; }
}
