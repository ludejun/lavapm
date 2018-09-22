package com.lavapm.tenant.bean;

import java.util.Date;

public class Milepost {
  private int id;
  private int productid;
  private int platformid;
  private int partnerid;
  private String version;
  private String milepostname;
  private int mileposttype;
  private String remarks;
  private int timeflag;
  private Date time;
  private int isdel;
  private int category;
  
  public Milepost() {}
  
  public int getId() {
    return id;
  }
  
  public void setId(int id) {
    this.id = id;
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
  
  public int getPartnerid() {
    return partnerid;
  }
  
  public void setPartnerid(int partnerid) {
    this.partnerid = partnerid;
  }
  
  public String getVersion() {
    return version;
  }
  
  public void setVersion(String version) {
    this.version = version;
  }
  
  public String getMilepostname() {
    return milepostname;
  }
  
  public void setMilepostname(String milepostname) {
    this.milepostname = milepostname;
  }
  
  public int getMileposttype() {
    return mileposttype;
  }
  
  public void setMileposttype(int mileposttype) {
    this.mileposttype = mileposttype;
  }
  
  public String getRemarks() {
    return remarks;
  }
  
  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }
  
  public int getTimeflag() {
    return timeflag;
  }
  
  public void setTimeflag(int timeflag) {
    this.timeflag = timeflag;
  }
  
  public Date getTime() {
    return time;
  }
  
  public void setTime(Date time) {
    this.time = time;
  }
  
  public int getIsdel() {
    return isdel;
  }
  
  public void setIsdel(int isdel) {
    this.isdel = isdel;
  }
  
  public int getCategory() {
    return category;
  }
  
  public void setCategory(int category) {
    this.category = category;
  }
}
