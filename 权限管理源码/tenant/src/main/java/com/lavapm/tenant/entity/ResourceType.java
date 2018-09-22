package com.lavapm.tenant.entity;

import java.util.Date;












public class ResourceType
{
  private Integer rid;
  private Integer appRid;
  private String resourceTypeCode;
  private String resourceTypeName;
  private String resourceTypeDesc;
  private Integer status;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  private String editMark;
  private String appName;
  
  public ResourceType() {}
  
  public String getAppName()
  {
    return appName;
  }
  
  public void setAppName(String appName) {
    this.appName = appName;
  }
  
  public Integer getAppRid() {
    return appRid;
  }
  
  public void setAppRid(Integer appRid) {
    this.appRid = appRid;
  }
  
  public String getEditMark() {
    return editMark;
  }
  
  public void setEditMark(String editMark) {
    this.editMark = editMark;
  }
  
  public Integer getRid() {
    return rid;
  }
  
  public void setRid(Integer rid) {
    this.rid = rid;
  }
  
  public String getResourceTypeCode() {
    return resourceTypeCode;
  }
  
  public void setResourceTypeCode(String resourceTypeCode) {
    this.resourceTypeCode = resourceTypeCode;
  }
  
  public String getResourceTypeName() {
    return resourceTypeName;
  }
  
  public void setResourceTypeName(String resourceTypeName) {
    this.resourceTypeName = resourceTypeName;
  }
  
  public String getResourceTypeDesc() {
    return resourceTypeDesc;
  }
  
  public void setResourceTypeDesc(String resourceTypeDesc) {
    this.resourceTypeDesc = resourceTypeDesc;
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
