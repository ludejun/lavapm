package com.lavapm.tenant.entity;

import java.util.Date;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lavapm.tenant.tool.JacksonCustomDateSerializer;















public class ExportRoleUser
  extends RoleUser
{
  private String umid;
  private String userName;
  private String userPassword;
  private String userDesc;
  private String gender;
  @JsonSerialize(using=JacksonCustomDateSerializer.class)
  private Date birthday;
  private String email;
  private String telphone;
  private String mobile;
  private String title;
  private String tenantId;
  private String departmentName;
  private int status;
  private String updateTime;
  private String opUmid;
  
  public ExportRoleUser() {}
  
  public String getUmid()
  {
    return umid;
  }
  
  public void setUmid(String umid) { this.umid = umid; }
  
  public String getUserName() {
    return userName;
  }
  
  public void setUserName(String userName) { this.userName = userName; }
  
  public String getUserPassword() {
    return userPassword;
  }
  
  public void setUserPassword(String userPassword) { this.userPassword = userPassword; }
  
  public String getUserDesc() {
    return userDesc;
  }
  
  public void setUserDesc(String userDesc) { this.userDesc = userDesc; }
  
  public String getGender() {
    return gender;
  }
  
  public void setGender(String gender) { this.gender = gender; }
  
  public Date getBirthday() {
    return birthday;
  }
  
  public void setBirthday(Date birthday) { this.birthday = birthday; }
  
  public String getEmail() {
    return email;
  }
  
  public void setEmail(String email) { this.email = email; }
  
  public String getTelphone() {
    return telphone;
  }
  
  public void setTelphone(String telphone) { this.telphone = telphone; }
  
  public String getMobile() {
    return mobile;
  }
  
  public void setMobile(String mobile) { this.mobile = mobile; }
  
  public String getTitle() {
    return title;
  }
  
  public void setTitle(String title) { this.title = title; }
  

  public String getTenantId()
  {
    return tenantId;
  }
  
  public void setTenantId(String tenantId) { this.tenantId = tenantId; }
  
  public String getDepartmentName() {
    return departmentName;
  }
  
  public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
  
  public int getStatus() {
    return status;
  }
  
  public void setStatus(int status) { this.status = status; }
  
  public String getUpdateTime() {
    return updateTime;
  }
  
  public void setUpdateTime(String updateTime) { this.updateTime = updateTime; }
  
  public String getOpUmid() {
    return opUmid;
  }
  
  public void setOpUmid(String opUmid) { this.opUmid = opUmid; }
}
