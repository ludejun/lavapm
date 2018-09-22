package com.lavapm.tenant.bean.search;

public class EarliestRetistertimeSearch {
  private int developerid;
  private Integer category;
  
  public EarliestRetistertimeSearch() {}
  
  public Integer getCategory() { return category; }
  
  public void setCategory(Integer category)
  {
    this.category = category;
  }
  
  public int getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(int developerid) {
    this.developerid = developerid;
  }
}
