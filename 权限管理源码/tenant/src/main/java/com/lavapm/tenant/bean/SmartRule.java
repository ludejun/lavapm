package com.lavapm.tenant.bean;

import java.sql.Timestamp;

public class SmartRule {
  private int id;
  private String rule_name;
  
  public SmartRule() {}
  
  public int getId() { return id; }
  
  public void setId(int id) {
    this.id = id;
  }
  
  public String getRule_name() { return rule_name; }
  

  public void setRule_name(String rule_name) { this.rule_name = rule_name; }
  
  private int deleted;
  private Timestamp update_time;
  public Timestamp getUpdate_time() { return update_time; }
  
  public void setUpdate_time(Timestamp update_time) {
    this.update_time = update_time;
  }
  
  public int getDeleted() { return deleted; }
  
  public void setDeleted(int deleted) {
    this.deleted = deleted;
  }
}
