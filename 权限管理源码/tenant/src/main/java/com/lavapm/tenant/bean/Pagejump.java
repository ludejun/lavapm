package com.lavapm.tenant.bean;

public class Pagejump {
  private int productid;
  private String version;
  private String pagename;
  private String link;
  private int num;
  
  public Pagejump() {}
  
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
  
  public String getLink() { return link; }
  
  public void setLink(String link) {
    this.link = link;
  }
  
  public int getNum() { return num; }
  
  public void setNum(int num) {
    this.num = num;
  }
}
