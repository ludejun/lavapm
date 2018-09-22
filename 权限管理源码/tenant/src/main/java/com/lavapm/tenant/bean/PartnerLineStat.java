package com.lavapm.tenant.bean;

import java.util.List;

public class PartnerLineStat { private String name;
  private List<Integer> data;
  private List<Integer> data1;
  private List<Integer> data2;
  private List<Integer> data0;
  private int pointInterval;
  private long pointStart;
  
  public PartnerLineStat() {}
  
  public List<Integer> getData1() { return data1; }
  
  public void setData1(List<Integer> data1)
  {
    this.data1 = data1;
  }
  
  public List<Integer> getData2() {
    return data2;
  }
  
  public void setData2(List<Integer> data2) {
    this.data2 = data2;
  }
  
  public String getName() {
    return name;
  }
  
  public void setName(String name) {
    this.name = name;
  }
  
  public List<Integer> getData() {
    return data;
  }
  
  public void setData(List<Integer> data) {
    this.data = data;
  }
  
  public int getPointInterval() {
    return pointInterval;
  }
  
  public void setPointInterval(int pointInterval) {
    this.pointInterval = pointInterval;
  }
  
  public long getPointStart() {
    return pointStart;
  }
  
  public void setPointStart(long pointStart) {
    this.pointStart = pointStart;
  }
  
  public List<Integer> getData3() {
    return data0;
  }
  
  public void setData0(List<Integer> data0) {
    this.data0 = data0;
  }
}
