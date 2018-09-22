package com.lavapm.tenant.entity;

import java.util.Date;







public class Tenant
{
  private Integer rid;
  private String ca_code;
  private String ca_name;
  private String ca_short_name;
  private String phone;
  private String fax;
  private String admin_name;
  private String admin_email;
  private Integer status;
  private Date contract_start_date;
  private Date contract_end_date;
  private Date create_time;
  private Date update_time;
  private String op_umid;
  
  public Tenant() {}
  
  public Integer getRid()
  {
    return rid;
  }
  
  public void setRid(Integer rid) { this.rid = rid; }
  
  public String getCa_code() {
    return ca_code;
  }
  
  public void setCa_code(String ca_code) { this.ca_code = ca_code; }
  
  public String getCa_name() {
    return ca_name;
  }
  
  public void setCa_name(String ca_name) { this.ca_name = ca_name; }
  
  public String getCa_short_name() {
    return ca_short_name;
  }
  
  public void setCa_short_name(String ca_short_name) { this.ca_short_name = ca_short_name; }
  
  public String getPhone() {
    return phone;
  }
  
  public void setPhone(String phone) { this.phone = phone; }
  
  public String getFax() {
    return fax;
  }
  
  public void setFax(String fax) { this.fax = fax; }
  
  public String getAdmin_name() {
    return admin_name;
  }
  
  public void setAdmin_name(String admin_name) { this.admin_name = admin_name; }
  
  public String getAdmin_email() {
    return admin_email;
  }
  
  public void setAdmin_email(String admin_email) { this.admin_email = admin_email; }
  
  public Integer getStatus() {
    return status;
  }
  
  public void setStatus(Integer status) { this.status = status; }
  
  public Date getContract_start_date() {
    return contract_start_date;
  }
  
  public void setContract_start_date(Date contract_start_date) { this.contract_start_date = contract_start_date; }
  
  public Date getContract_end_date() {
    return contract_end_date;
  }
  
  public void setContract_end_date(Date contract_end_date) { this.contract_end_date = contract_end_date; }
  
  public Date getCreate_time() {
    return create_time;
  }
  
  public void setCreate_time(Date create_time) { this.create_time = create_time; }
  
  public Date getUpdate_time() {
    return update_time;
  }
  
  public void setUpdate_time(Date update_time) { this.update_time = update_time; }
  
  public String getOp_umid() {
    return op_umid;
  }
  
  public void setOp_umid(String op_umid) { this.op_umid = op_umid; }
}
