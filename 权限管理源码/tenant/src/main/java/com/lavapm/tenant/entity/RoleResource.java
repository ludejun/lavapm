package com.lavapm.tenant.entity;

import java.util.Date;











public class RoleResource
{
  private Integer rid;
  private Integer roleRid;
  private Integer resourceRid;
  private Date createTime;
  private String opUmid;
  private Integer appRid;
  private Integer resourceTypeRid;
  private String resourceName;
  private Integer parentResourceRid;
  private boolean checked;
  
  public RoleResource() {}
  
  public Integer getRid()
  {
    return rid;
  }
  
  public void setRid(Integer rid) {
    this.rid = rid;
  }
  
  public Integer getRoleRid() {
    return roleRid;
  }
  
  public void setRoleRid(Integer roleRid) {
    this.roleRid = roleRid;
  }
  
  public Integer getResourceRid() {
    return resourceRid;
  }
  
  public void setResourceRid(Integer resourceRid) {
    this.resourceRid = resourceRid;
  }
  
  public Date getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }
  
  public String getOpUmid() {
    return opUmid;
  }
  
  public void setOpUmid(String opUmid) {
    this.opUmid = opUmid;
  }
  
  public String getResourceName() {
    return resourceName;
  }
  
  public void setResourceName(String resourceName) {
    this.resourceName = resourceName;
  }
  
  public Integer getParentResourceRid() {
    return parentResourceRid;
  }
  
  public void setParentResourceRid(Integer parentResourceRid) {
    this.parentResourceRid = parentResourceRid;
  }
  
  public Integer getAppRid() {
    return appRid;
  }
  
  public void setAppRid(Integer appRid) {
    this.appRid = appRid;
  }
  
  public Integer getResourceTypeRid() {
    return resourceTypeRid;
  }
  
  public void setResourceTypeRid(Integer resourceTypeRid) {
    this.resourceTypeRid = resourceTypeRid;
  }
  
  public boolean isChecked() {
    return checked;
  }
  
  public void setChecked(boolean checked) {
    this.checked = checked;
  }
}
