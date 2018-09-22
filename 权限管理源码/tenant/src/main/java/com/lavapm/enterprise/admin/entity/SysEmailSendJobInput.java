package com.lavapm.enterprise.admin.entity;

import java.util.Date;

















































































public class SysEmailSendJobInput
{
  private Long id;
  private String emailservercode;
  private String to;
  private String title;
  private String content;
  private String cc;
  private Integer status;
  private String bcc;
  private Integer retry;
  private Integer maxretry;
  private Date createtime;
  
  public SysEmailSendJobInput() {}
  
  public Long getId()
  {
    return id;
  }
  







  public void setId(Long id)
  {
    this.id = id;
  }
  







  public String getEmailservercode()
  {
    return emailservercode;
  }
  







  public void setEmailservercode(String emailservercode)
  {
    this.emailservercode = emailservercode;
  }
  







  public String getTo()
  {
    return to;
  }
  







  public void setTo(String to)
  {
    this.to = to;
  }
  







  public String getTitle()
  {
    return title;
  }
  







  public void setTitle(String title)
  {
    this.title = title;
  }
  







  public String getContent()
  {
    return content;
  }
  







  public void setContent(String content)
  {
    this.content = content;
  }
  







  public String getCc()
  {
    return cc;
  }
  







  public void setCc(String cc)
  {
    this.cc = cc;
  }
  







  public Integer getStatus()
  {
    return status;
  }
  







  public void setStatus(Integer status)
  {
    this.status = status;
  }
  







  public String getBcc()
  {
    return bcc;
  }
  







  public void setBcc(String bcc)
  {
    this.bcc = bcc;
  }
  







  public Integer getRetry()
  {
    return retry;
  }
  







  public void setRetry(Integer retry)
  {
    this.retry = retry;
  }
  







  public Integer getMaxretry()
  {
    return maxretry;
  }
  







  public void setMaxretry(Integer maxretry)
  {
    this.maxretry = maxretry;
  }
  







  public Date getCreatetime()
  {
    return createtime;
  }
  







  public void setCreatetime(Date createtime)
  {
    this.createtime = createtime;
  }
}
