package com.lavapm.tenant.bean;

public class Productype {
  private int productypeid;
  private String typename;
  
  public Productype() {}
  
  public int getProductypeid() { return productypeid; }
  
  public void setProductypeid(int productypeid) {
    this.productypeid = productypeid;
  }
  
  public String getTypename() { return typename; }
  
  public void setTypename(String typename) {
    this.typename = typename;
  }
}
