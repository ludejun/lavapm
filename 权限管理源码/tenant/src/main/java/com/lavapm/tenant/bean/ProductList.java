package com.lavapm.tenant.bean;

public class ProductList {
  private int sumnewuser;
  private int ndnewuser;
  private int ndactiveuser;
  private int odnewuser;
  private int odactiveuser;
  private int productid;
  private int platformid;
  private int productype;
  private String productname;
  private String sequencenumber;
  
  public ProductList() {}
  
  public int getSumnewuser() { return sumnewuser; }
  
  public void setSumnewuser(int sumnewuser) {
    this.sumnewuser = sumnewuser;
  }
  
  public int getNdnewuser() { return ndnewuser; }
  
  public void setNdnewuser(int ndnewuser) {
    this.ndnewuser = ndnewuser;
  }
  
  public int getNdactiveuser() { return ndactiveuser; }
  
  public void setNdactiveuser(int ndactiveuser) {
    this.ndactiveuser = ndactiveuser;
  }
  
  public int getOdnewuser() { return odnewuser; }
  
  public void setOdnewuser(int odnewuser) {
    this.odnewuser = odnewuser;
  }
  
  public int getOdactiveuser() { return odactiveuser; }
  
  public void setOdactiveuser(int odactiveuser) {
    this.odactiveuser = odactiveuser;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public int getPlatformid() { return platformid; }
  
  public void setPlatformid(int platformid) {
    this.platformid = platformid;
  }
  
  public int getProductype() { return productype; }
  
  public void setProductype(int productype) {
    this.productype = productype;
  }
  
  public String getProductname() { return productname; }
  
  public void setProductname(String productname) {
    this.productname = productname;
  }
  
  public String getSequencenumber() { return sequencenumber; }
  
  public void setSequencenumber(String sequencenumber) {
    this.sequencenumber = sequencenumber;
  }
}
