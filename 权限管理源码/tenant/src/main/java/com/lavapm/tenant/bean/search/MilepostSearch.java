package com.lavapm.tenant.bean.search;


public class MilepostSearch
{
  private int id;
  
  private int productid;
  
  private String platformid;
  
  private String milepostname;
  
  private String remarks;
  int timeflag;
  private int mileposttype;
  private Integer category;
  
  public MilepostSearch() {}
  
  public int getId()
  {
    return id;
  }
  
  public void setId(int id) { this.id = id; }
  
  public String getMilepostname() {
    return milepostname;
  }
  
  public void setMilepostname(String milepostname) { this.milepostname = milepostname; }
  
  public String getRemarks() {
    return remarks;
  }
  
  public void setRemarks(String remarks) { this.remarks = remarks; }
  
  public int getTimeflag() {
    return timeflag;
  }
  
  public void setTimeflag(int timeflag) { this.timeflag = timeflag; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public String getPlatformid()
  {
    return platformid;
  }
  
  public void setPlatformid(String platformid) { this.platformid = platformid; }
  
  public int getMileposttype() {
    return mileposttype;
  }
  
  public void setMileposttype(int mileposttype) { this.mileposttype = mileposttype; }
  
  public Integer getCategory() {
    return category;
  }
  
  public void setCategory(Integer category) { this.category = category; }
}
