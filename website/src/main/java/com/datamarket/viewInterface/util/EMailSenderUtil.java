package com.datamarket.viewInterface.util;

import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.tenddata.mailbean.Mail;
import com.tenddata.mailclient.MailClient;

public class EMailSenderUtil
{
  public static String url = "http://10.10.32.32:8070";
  public static VelocityEngine velocityEngine = new VelocityEngine();
  private static Log emailLog = LogFactory.getLog("emailLog");
  
  static
  {
    url = MailServiceSingleton.getInstance().getValue("mail.server.url");
    if (StringUtils.isBlank(url)) {
      url = "http://10.10.32.32:8070";
    }
    velocityEngine.addProperty("resource.loader", "class");
    velocityEngine.addProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
  }
  
  MailClient mc = new MailClient();
  
  public int sendMail(String email, String subject, String content, String[] attach)
  {
    Mail mail = new Mail();
    mail.setSendto(email);
    mail.setSubject(subject);
    mail.setContent(content);
    mail.setAttachment(attach);
    mail.setType(2);
    int status = 0;
    emailLog.info("------------------------");
    try
    {
      status = this.mc.send(url, mail);
      emailLog.info("time: " + Util.dateUtil(System.currentTimeMillis()));
      emailLog.info("status : " + status + "        sendTo : " + mail.getSendto() + " subject : " + mail
        .getSubject() + " content : " + mail.getContent());
    }
    catch (Exception e)
    {
      e.printStackTrace();
      emailLog.error("------------------------");
      emailLog.error(e.getMessage());
      emailLog.error("------------------------");
    }
    return status;
  }
  
  public void sendAuthorizeUserEmail(Map<String, Object> model){
	  String content = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, 
      MailServiceSingleton.getInstance().getValue("mail.authorize.template"), "UTF-8", model);
	  sendMail(model.get("email").toString(), MailServiceSingleton.getInstance().getValue("mail.authorize.subject"), content, null);
  }
  
  public void sendBuyServiceEmail(Map<String, Object> model){
	  String content = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, 
      MailServiceSingleton.getInstance().getValue("mail.authorize.template"), "UTF-8", model);
	  sendMail(model.get("email").toString(), MailServiceSingleton.getInstance().getValue("mail.authorize.subject"), content, null);
  }
}
