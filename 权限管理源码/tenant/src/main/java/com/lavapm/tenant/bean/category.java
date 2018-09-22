package com.lavapm.tenant.bean;

public class category {
  private String categoryId;
  private String platform;
  
  public category() {}
  
  public String getCategoryId() { return categoryId; }
  
  public void setCategoryId(String categoryId) {
    this.categoryId = categoryId;
  }
  
  public String getPlatform() { return platform; }
  
  public void setPlatform(String platform) {
    this.platform = platform;
  }
}
