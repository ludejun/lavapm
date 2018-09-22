package com.lavapm.tenant.entity;

import java.util.List;
import java.util.Map;







public class ExportRole
  extends Role
{
  private static final long serialVersionUID = 1L;
  private String appCode;
  private String appName;
  private List<Map<String, Object>> resources;
  
  public ExportRole() {}
  
  public String getAppCode()
  {
    return appCode;
  }
  
  public void setAppCode(String appCode) {
    this.appCode = appCode;
  }
  
  public String getAppName() {
    return appName;
  }
  
  public void setAppName(String appName) {
    this.appName = appName;
  }
  
  public List<Map<String, Object>> getResources() {
    return resources;
  }
  
  public void setResources(List<Map<String, Object>> resources) {
    this.resources = resources;
  }
}
