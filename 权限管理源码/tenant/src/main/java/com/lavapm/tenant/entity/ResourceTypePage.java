package com.lavapm.tenant.entity;

import java.util.Date;
import java.util.List;

import com.lavapm.tenant.tool.BasePage;










public class ResourceTypePage
  extends BasePage
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
  private List<Integer> appList;
  private String withUm;
  
  public ResourceTypePage() {}
  
  public String getWithUm()
  {
    return withUm;
  }
  
  public void setWithUm(String withUm) {
    this.withUm = withUm;
  }
  
  public Integer getAppRid() {
    return appRid;
  }
  
  public void setAppRid(Integer appRid) {
    this.appRid = appRid;
  }
  
  public List<Integer> getAppList() {
    return appList;
  }
  
  public void setAppList(List<Integer> appList) {
    this.appList = appList;
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
