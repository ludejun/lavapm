package com.lavapm.tenant.bean;

import java.io.Serializable;

public class BEAN implements Serializable {
  private static final long serialVersionUID = 4490344851771132987L;
  private String string1;
  private String string2;
  private Integer int1;
  private Integer int2;
  
  public Integer getInt1() {
    return int1;
  }
  
  public void setInt1(Integer int1) {
    this.int1 = int1;
  }
  
  public Integer getInt2() {
    return int2;
  }
  
  public void setInt2(Integer int2) {
    this.int2 = int2;
  }
  
  public static long getSerialversionuid() {
    return 4490344851771132987L;
  }
  
  public String getString1() {
    return string1;
  }
  
  public void setString1(String string1) {
    this.string1 = string1;
  }
  
  public String getString2() {
    return string2;
  }
  
  public void setString2(String string2) {
    this.string2 = string2;
  }
  
  public String toString()
  {
    return "BEAN [string1=" + string1 + ", string2=" + string2 + "]";
  }
  
  public BEAN(String string1, String string2)
  {
    this.string1 = string1;
    this.string2 = string2;
  }
  

  public BEAN() {}
  
  public BEAN(String string1, Integer int1)
  {
    this.string1 = string1;
    this.int1 = int1;
  }
  
  public BEAN(Integer int1, String string1)
  {
    this.string1 = string1;
    this.int1 = int1;
  }
}
