package com.lavapm.tenant.bean;

public class MailBean { public MailBean() {}
  
  private String Subject = "";
  

  private String From = "";
  

  private String To = "";
  

  private String Body = "";
  
  public String getBody() {
    return Body;
  }
  
  public void setBody(String body) {
    Body = body;
  }
  
  public String getFrom() {
    return From;
  }
  
  public void setFrom(String from) {
    From = from;
  }
  
  public String getSubject() {
    return Subject;
  }
  
  public void setSubject(String subject) {
    Subject = subject;
  }
  
  public String getTo() {
    return To;
  }
  
  public void setTo(String to) {
    To = to;
  }
}
