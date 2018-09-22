package com.lavapm.enterprise.admin.entity;

import java.util.Date;








































public class SysEmailTemplate
{
  private Long beginIndex;
  private Long rows;
  private String systemcode;
  private String systemName;
  private String title;
  private Long id;
  private String code;
  private String content;
  private Date mtime;
  private Date ctime;
  
  public SysEmailTemplate() {}
  
  public Long getId()
  {
    return id;
  }
  







  public void setId(Long id)
  {
    this.id = id;
  }
  







  public String getCode()
  {
    return code;
  }
  







  public void setCode(String code)
  {
    this.code = code;
  }
  







  public String getContent()
  {
    return content;
  }
  







  public void setContent(String content)
  {
    this.content = content;
  }
  







  public Date getMtime()
  {
    return mtime;
  }
  







  public void setMtime(Date mtime)
  {
    this.mtime = mtime;
  }
  







  public Date getCtime()
  {
    return ctime;
  }
  







  public void setCtime(Date ctime)
  {
    this.ctime = ctime;
  }
  
  public Long getBeginIndex() {
    return beginIndex;
  }
  
  public void setBeginIndex(Long beginIndex) {
    this.beginIndex = beginIndex;
  }
  
  public Long getRows() {
    return rows;
  }
  
  public void setRows(Long rows) {
    this.rows = rows;
  }
  
  public String getSystemcode() {
    return systemcode;
  }
  
  public void setSystemcode(String systemcode) {
    this.systemcode = systemcode;
  }
  
  public String getSystemName() {
    return systemName;
  }
  
  public void setSystemName(String systemName) {
    this.systemName = systemName;
  }
  
  public String getTitle() {
    return title;
  }
  
  public void setTitle(String title) {
    this.title = title;
  }
}
