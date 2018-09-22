package com.lavapm.tenant.bean;

public class ActiveCodeChange {
  private Integer activecodeid;
  private Integer usedTime;
  private Integer developerid;
  private Integer isLiving;
  
  public ActiveCodeChange() {}
  
  public Integer getActivecodeid() { return activecodeid; }
  
  public void setActivecodeid(Integer activecodeid)
  {
    this.activecodeid = activecodeid;
  }
  
  public Integer getUsedTime() {
    return usedTime;
  }
  
  public void setUsedTime(Integer usedTime) {
    this.usedTime = usedTime;
  }
  
  public Integer getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(Integer developerid) {
    this.developerid = developerid;
  }
  
  public Integer getIsLiving() {
    return isLiving;
  }
  
  public void setIsLiving(Integer isLiving) {
    this.isLiving = isLiving;
  }
}
