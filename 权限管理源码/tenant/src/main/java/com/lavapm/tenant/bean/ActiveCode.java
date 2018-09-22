package com.lavapm.tenant.bean;

public class ActiveCode {
  private Integer activecodeid;
  private String code;
  private Integer createTime;
  private Integer usedTime;
  private Integer isLiving;
  private Integer developerid;
  
  public ActiveCode() {}
  
  public Integer getActivecodeid() {
    return activecodeid;
  }
  
  public void setActivecodeid(Integer activecodeid) {
    this.activecodeid = activecodeid;
  }
  
  public String getCode() {
    return code;
  }
  
  public void setCode(String code) {
    this.code = code;
  }
  
  public Integer getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Integer createTime) {
    this.createTime = createTime;
  }
  
  public Integer getUsedTime() {
    return usedTime;
  }
  
  public void setUsedTime(Integer usedTime) {
    this.usedTime = usedTime;
  }
  
  public Integer getIsLiving() {
    return isLiving;
  }
  
  public void setIsLiving(Integer isLiving) {
    this.isLiving = isLiving;
  }
  
  public Integer getDeveloperid() {
    return developerid;
  }
  
  public void setDeveloperid(Integer developerid) {
    this.developerid = developerid;
  }
}
