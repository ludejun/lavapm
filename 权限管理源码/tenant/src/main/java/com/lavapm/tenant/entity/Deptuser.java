package com.lavapm.tenant.entity;

import java.util.Date;












public class Deptuser
{
  private int rid;
  private int deptRid;
  private int userRid;
  private int userOrder;
  private Date createTime;
  private Date updateTime;
  private String opUmid;
  
  public Deptuser() {}
  
  public int getRid()
  {
    return rid;
  }
  
  public void setRid(int rid) {
    this.rid = rid;
  }
  
  public int getDeptRid() {
    return deptRid;
  }
  
  public void setDeptRid(int deptRid) {
    this.deptRid = deptRid;
  }
  
  public int getUserRid() {
    return userRid;
  }
  
  public void setUserRid(int userRid) {
    this.userRid = userRid;
  }
  
  public int getUserOrder() {
    return userOrder;
  }
  
  public void setUserOrder(int userOrder) {
    this.userOrder = userOrder;
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
