package com.lavapm.tenant.entity;

import java.util.Date;











public class RoleUser
{
  private Integer rid;
  private Integer roleRid;
  private String userRid;
  private Integer isGrantable;
  private String grantedBy;
  private Date createTime;
  private String umid;
  private String userName;
  private String departmentName;
  private String title;
  private String appName;
  private String appCode;
  private String roleName;
  private String roleCode;
  
  public RoleUser() {}
  
  public String getAppName()
  {
    return appName;
  }
  
  public void setAppName(String appName) {
    this.appName = appName;
  }
  
  public String getAppCode() {
    return appCode;
  }
  
  public void setAppCode(String appCode) {
    this.appCode = appCode;
  }
  
  public String getRoleName() {
    return roleName;
  }
  
  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }
  
  public String getRoleCode() {
    return roleCode;
  }
  
  public void setRoleCode(String roleCode) {
    this.roleCode = roleCode;
  }
  
  public Integer getRid() {
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
  
  public String getUserRid() {
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
  
  public String getGrantedBy() {
    return grantedBy;
  }
  
  public void setGrantedBy(String grantedBy) {
    this.grantedBy = grantedBy;
  }
  
  public Date getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Date createTime) {
    this.createTime = createTime;
  }
  
  public String getUmid() {
    return umid;
  }
  
  public void setUmid(String umid) {
    this.umid = umid;
  }
  
  public String getUserName() {
    return userName;
  }
  
  public void setUserName(String userName) {
    this.userName = userName;
  }
  
  public String getDepartmentName() {
    return departmentName;
  }
  
  public void setDepartmentName(String departmentName) {
    this.departmentName = departmentName;
  }
  
  public String getTitle() {
    return title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
}
