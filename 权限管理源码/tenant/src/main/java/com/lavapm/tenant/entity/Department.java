package com.lavapm.tenant.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;










public class Department
{
  private Integer rid;
  private String deptCode;
  private String deptName;
  private String deptDesc;
  private String parentRid;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  private int tenantId;
  private String parentName;
  
  public Department() {}
  
  private List<Department> children = new ArrayList();
  
  public List<Department> getChildren() {
    return children;
  }
  
  public void setChildren(List<Department> children) {
    this.children = children;
  }
  
  public Integer getRid() { return rid; }
  
  public void setRid(Integer rid) {
    this.rid = rid;
  }
  
  public String getDeptCode() {
    return deptCode;
  }
  
  public void setDeptCode(String deptCode) {
    this.deptCode = deptCode;
  }
  
  public String getDeptName() {
    return deptName;
  }
  
  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }
  
  public String getDeptDesc() {
    return deptDesc;
  }
  
  public void setDeptDesc(String deptDesc) {
    this.deptDesc = deptDesc;
  }
  
  public String getParentRid() {
    return parentRid;
  }
  
  public void setParentRid(String parentRid) { this.parentRid = parentRid; }
  
  public Date getCreateTime() {
    return createTime;
  }
  
  public void setCreateTime(Date createTime) { this.createTime = createTime; }
  
  public Date getUpdateTime() {
    return updateTime;
  }
  
  public void setUpdateTime(Date updateTime) { this.updateTime = updateTime; }
  
  public String getOpUmid() {
    return opUmid;
  }
  
  public void setOpUmid(String opUmid) { this.opUmid = opUmid; }
  


  public int getTenantId()
  {
    return tenantId;
  }
  
  public void setTenantId(int tenantId) {
    this.tenantId = tenantId;
  }
  
  public String getParentName() {
    return parentName;
  }
  
  public void setParentName(String parentName) {
    this.parentName = parentName;
  }
}
