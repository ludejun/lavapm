package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class Product {
  private int productid;
  private String sequencenumber;
  private int developerid;
  private int platform;
  private int productype;
  private String productname;
  private String productmemo;
  private Timestamp registertime;
  private int isdeleted;
  private String platformname;
  private String productypename;
  private int iscompensate;
  private String domain;
  private Integer category;
  
  public Product() {}
  
  public String getDomain() { return domain; }
  
  public void setDomain(String domain) {
    this.domain = domain;
  }
  
  public Integer getCategory() { return category; }
  
  public void setCategory(Integer category) {
    this.category = category;
  }
  
  public int getIsdeleted() { return isdeleted; }
  
  public void setIsdeleted(int isdeleted) {
    this.isdeleted = isdeleted;
  }
  
  public String getPlatformname() { return platformname; }
  
  public void setPlatformname(String platformname) {
    this.platformname = platformname;
  }
  
  public int getProductid() { return productid; }
  
  public void setProductid(int productid) {
    this.productid = productid;
  }
  
  public String getSequencenumber() { return sequencenumber; }
  
  public void setSequencenumber(String sequencenumber) {
    this.sequencenumber = sequencenumber;
  }
  
  public int getDeveloperid() { return developerid; }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
  
  public int getPlatform() { return platform; }
  
  public void setPlatform(int platform) {
    this.platform = platform;
  }
  
  public int getProductype() { return productype; }
  
  public void setProductype(int productype) {
    this.productype = productype;
  }
  
  public String getProductname() { return productname; }
  
  public void setProductname(String productname) {
    this.productname = productname;
  }
  
  public String getProductmemo() {
    return productmemo;
  }
  
  public void setProductmemo(String productmemo) { this.productmemo = productmemo; }
  
  public Timestamp getRegistertime() {
    return registertime;
  }
  
  public void setRegistertime(Timestamp registertime) { this.registertime = registertime; }
  
  public String getProductypename() {
    return productypename;
  }
  
  public void setProductypename(String productypename) { this.productypename = productypename; }
  
  public int getIscompensate() {
    return iscompensate;
  }
  
  public void setIscompensate(int iscompensate) { this.iscompensate = iscompensate; }
}
