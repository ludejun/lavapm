package com.lavapm.tenant.bean;

import java.sql.Timestamp;



public class CustomEventDictionary
{
  private int id;
  private int productid;
  private int platformid;
  private String eventid;
  private String displayname;
  private Timestamp registertime;
  
  public CustomEventDictionary() {}
  
  public int getId()
  {
    return id;
  }
  
  public int getType() { return type; }
  
  public void setType(int type) {
    this.type = type;
  }
  
  public void setId(int id) { this.id = id; }
  
  public int getProductid() {
    return productid;
  }
  
  public void setProductid(int productid) { this.productid = productid; }
  
  public int getPlatformid() {
    return platformid;
  }
  
  public void setPlatformid(int platformid) { this.platformid = platformid; }
  
  public String getEventid() {
    return eventid;
  }
  
  public void setEventid(String eventid) { this.eventid = eventid; }
  
  public String getDisplayname() {
    return displayname;
  }
  
  public void setDisplayname(String displayname) { this.displayname = displayname; }
  
  public Timestamp getRegistertime() {
    return registertime;
  }
  
  public void setRegistertime(Timestamp registertime) { this.registertime = registertime; }
  
  public int getIsforbid() {
    return isforbid;
  }
  
  public void setIsforbid(int isforbid) { this.isforbid = isforbid; }
  
  public Long getCleartime() {
    return cleartime;
  }
  
  public void setCleartime(Long cleartime) { this.cleartime = cleartime; }
  
  public int getStop() {
    return stop;
  }
  
  public void setStop(int stop) { this.stop = stop; }
  
  public Long getStoptime() {
    return stoptime;
  }
  
  public void setStoptime(Long stoptime) { this.stoptime = stoptime; }
  
  public int getPrepareForClear()
  {
    return prepareForClear;
  }
  
  public void setPrepareForClear(int prepareForClear) { this.prepareForClear = prepareForClear; }
  
  public String toString()
  {
    return "CustomEventDictionary [id=" + id + ", productid=" + productid + ", platformid=" + platformid + ", eventid=" + eventid + ", displayname=" + displayname + ", registertime=" + registertime + ", isforbid=" + isforbid + ", cleartime=" + cleartime + ", stop=" + stop + ", stoptime=" + stoptime + ", type=" + type + "]";
  }
  
  private int isforbid;
  private Long cleartime;
  private int prepareForClear;
  
  public int getCategory() {
    return category;
  }
  
  public void setCategory(int category) { this.category = category; }
  
  private int stop;
  private Long stoptime;
  private int category;
  private int type;
}
