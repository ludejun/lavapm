package com.lavapm.tenant.entity;

import java.util.Date;












public class User
{
  private Integer rid;
  private String umid;
  private String userName;
  private String userPassword;
  private String userDesc;
  private String gender;
  private Date birthday;
  private String email;
  private String telphone;
  private String mobile;
  private String title;
  private Integer departmentId;
  private String departmentName;
  private Integer status;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  private String deptName;
  private String companyname;
  private Integer tenantId;
  private String puserName;
  
  public User() {}
  
  public Integer getRid()
  {
    return rid;
  }
  
  public void setRid(Integer rid) {
    this.rid = rid;
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
  
  public String getUserPassword() {
    return userPassword;
  }
  
  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }
  
  public String getUserDesc() {
    return userDesc;
  }
  
  public void setUserDesc(String userDesc) {
    this.userDesc = userDesc;
  }
  
  public String getGender() {
    return gender;
  }
  
  public void setGender(String gender) {
    this.gender = gender;
  }
  
  public Date getBirthday() {
    return birthday;
  }
  
  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) {
    this.email = email;
  }
  
  public String getTelphone() {
    return telphone;
  }
  
  public void setTelphone(String telphone) {
    this.telphone = telphone;
  }
  
  public String getMobile() {
    return mobile;
  }
  
  public void setMobile(String mobile) {
    this.mobile = mobile;
  }
  
  public String getTitle() {
    return title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
  
  public Integer getDepartmentId() {
    return departmentId;
  }
  
  public void setDepartmentId(Integer departmentId) {
    this.departmentId = departmentId;
  }
  
  public String getDepartmentName() {
    return departmentName;
  }
  
  public void setDepartmentName(String departmentName) {
    this.departmentName = departmentName;
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
  

  public String getCompanyname()
  {
    return companyname;
  }
  
  public void setCompanyname(String companyname) {
    this.companyname = companyname;
  }
  
  public Integer getTenantId() {
    return tenantId;
  }
  
  public void setTenantId(Integer tenantId) {
    this.tenantId = tenantId;
  }
  
  public String getDeptName() {
    return deptName;
  }
  
  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }
  
  public String getPuserName() {
    return puserName;
  }
  
  public void setPuserName(String puserName) {
    this.puserName = puserName;
  }
}
