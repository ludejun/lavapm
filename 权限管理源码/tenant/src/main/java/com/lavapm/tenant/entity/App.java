package com.lavapm.tenant.entity;

import java.util.Date;









public class App
{
  private Integer rid;
  private String appCode;
  private String appName;
  private String appDesc;
  private String appToken;
  private String appRolePrefix;
  private String extAttr1;
  private String extAttr2;
  private String extAttr3;
  private Integer status;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  
  public App() {}
  
  public Integer getRid()
  {
    return rid;
  }
  
  public void setRid(Integer rid) {
    this.rid = rid;
  }
  
  public String getAppCode() {
    return appCode;
  }
  
  public void setAppCode(String appCode) {
    this.appCode = appCode;
  }
  
  public String getAppName() {
    return appName;
  }
  
  public void setAppName(String appName) {
    this.appName = appName;
  }
  
  public String getAppDesc() {
    return appDesc;
  }
  
  public void setAppDesc(String appDesc) {
    this.appDesc = appDesc;
  }
  
  public String getAppToken() {
    return appToken;
  }
  
  public void setAppToken(String appToken) {
    this.appToken = appToken;
  }
  
  public String getAppRolePrefix() {
    return appRolePrefix;
  }
  
  public void setAppRolePrefix(String appRolePrefix) {
    this.appRolePrefix = appRolePrefix;
  }
  
  public String getExtAttr1() {
    return extAttr1;
  }
  
  public void setExtAttr1(String extAttr1) {
    this.extAttr1 = extAttr1;
  }
  
  public String getExtAttr2() {
    return extAttr2;
  }
  
  public void setExtAttr2(String extAttr2) {
    this.extAttr2 = extAttr2;
  }
  
  public String getExtAttr3() {
    return extAttr3;
  }
  
  public void setExtAttr3(String extAttr3) {
    this.extAttr3 = extAttr3;
  }
  
  public Integer getStatus() {
    return status;
  }
  
  public void setStatus(Integer status) {
    this.status = status;
  }
  
  public Date getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }
  
  public Date getUpdateTime() {
    return updateTime;
  }
  
  public void setUpdateTime(Date updateTime) {
    this.updateTime = updateTime;
  }
  
  public String getOpUmid() {
    return opUmid;
  }
  
  public void setOpUmid(String opUmid) {
    this.opUmid = opUmid;
  }
}
