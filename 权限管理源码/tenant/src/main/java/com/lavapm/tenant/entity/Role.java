package com.lavapm.tenant.entity;

import com.tendcloud.enterprise.um.umic.entity.BaseEntity;
import java.io.Serializable;
import java.util.Date;










public class Role
  extends BaseEntity
  implements Serializable
{
  private static final long serialVersionUID = 1L;
  private Integer rid;
  private Integer appRid;
  private String roleCode;
  private String roleName;
  private String roleDesc;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  private Integer isGrantable;
  private String userRid;
  private int tenantId;
  private String appName;
  private boolean checked;
  
  public Role() {}
  
  public String getUserRid()
  {
    return userRid;
  }
  
  public void setUserRid(String userRid) {
    this.userRid = userRid;
  }
  
  public Integer getIsGrantable() {
    return isGrantable;
  }
  
  public void setIsGrantable(Integer isGrantable) {
    this.isGrantable = isGrantable;
  }
  


  public Integer getRid()
  {
    return rid;
  }
  
  public void setRid(Integer rid) {
    this.rid = rid;
  }
  
  public Integer getAppRid() {
    return appRid;
  }
  
  public void setAppRid(Integer appRid) {
    this.appRid = appRid;
  }
  
  public String getRoleCode() {
    return roleCode;
  }
  
  public void setRoleCode(String roleCode) {
    this.roleCode = roleCode;
  }
  
  public String getRoleName() {
    return roleName;
  }
  
  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }
  
  public String getRoleDesc() {
    return roleDesc;
  }
  
  public void setRoleDesc(String roleDesc) {
    this.roleDesc = roleDesc;
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
  
  public String getAppName() {
    return appName;
  }
  
  public void setAppName(String appName) {
    this.appName = appName;
  }
  
  public boolean isChecked() {
    return checked;
  }
  
  public void setChecked(boolean checked) {
    this.checked = checked;
  }
  
  public int getTenantId()
  {
    return tenantId;
  }
  
  public void setTenantId(int tenantId) {
    this.tenantId = tenantId;
  }
  
  public static long getSerialversionuid()
  {
    return 1L;
  }
}
