package com.lavapm.enterprise.admin.entity;

import java.io.Serializable;
import java.util.Date;




























































public class SysParam
  implements Serializable
{
  private static final long serialVersionUID = 1L;
  private Long rows;
  private Long page;
  private Long beginIndex;
  private String systemName;
  private Long id;
  private String paramkey;
  private String paramvalue;
  private String description;
  private String pw;
  private String systemcode;
  private Date mtime;
  private Date ctime;
  
  public SysParam() {}
  
  public Long getId()
  {
    return id;
  }
  







  public void setId(Long id)
  {
    this.id = id;
  }
  







  public String getParamkey()
  {
    return paramkey;
  }
  







  public void setParamkey(String paramkey)
  {
    this.paramkey = paramkey;
  }
  







  public String getParamvalue()
  {
    return paramvalue;
  }
  







  public void setParamvalue(String paramvalue)
  {
    this.paramvalue = paramvalue;
  }
  







  public String getDescription()
  {
    return description;
  }
  







  public void setDescription(String description)
  {
    this.description = description;
  }
  







  public String getPw()
  {
    return pw;
  }
  







  public void setPw(String pw)
  {
    this.pw = pw;
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
  
  public Long getRows() {
    return rows;
  }
  
  public void setRows(Long rows) {
    this.rows = rows;
  }
  
  public Long getPage() {
    return page;
  }
  
  public void setPage(Long page) {
    this.page = page;
  }
  
  public Long getBeginIndex() {
    if (((beginIndex == null) || (beginIndex.longValue() <= 0L)) && (page != null) && (rows != null)) {
      beginIndex = Long.valueOf((page.longValue() - 1L) * rows.longValue());
    }
    return beginIndex;
  }
  
  public void setBeginIndex(Long beginIndex) {
    this.beginIndex = beginIndex;
  }
}
