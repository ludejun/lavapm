package com.lavapm.tenant.tool;

import java.util.Properties;
import javax.mail.BodyPart;
import javax.mail.Message.RecipientType;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class SendMail {
	public SendMail() {
	}

	public static int OK = 1;
	public static int ERROR_SENDFAIL = 0;
	public static int ERROR_MIME = -1;
	public static int ERROR_SUBJECT = -2;
	public static int ERROR_BODY = -3;
	public static int ERROR_TO = -4;
	public static int ERROR_FROM = -5;
	public static int ERROR_CONFIG = -6;
	private MimeMessage mimeMsg;
	private Session session;
	private Properties props;

	private boolean needAuth = false;

	private String username = "";
	private String password = "";

	private Multipart mp;

	private static final SendMail Instance = new SendMail();

	public static SendMail getInstance() {
		return Instance;
	}

	private void setSmtpHost(String hostName) {
		CreatLog.setInfo("SendMail", "setSmtpHost", "设置系统属性：mail.smtp.host = " + hostName);
		if (props == null) {
			props = System.getProperties();
		}
		props.put("mail.smtp.host", hostName);
	}

	private boolean createMimeMessage() {
		try {
			CreatLog.setInfo("SendMail", "createMimeMessage", "准备获取邮件会话对象！");
			session = Session.getDefaultInstance(props, null);
		} catch (Exception e) {
			CreatLog.setDebug("SendMail", "createMimeMessage", "获取邮件会话对象时发生错误！" + e);
			return false;
		}

		CreatLog.setInfo("SendMail", "createMimeMessage", "准备创建MIME邮件对象！");
		try {
			mimeMsg = new MimeMessage(session);
			mp = new MimeMultipart();

			return true;
		} catch (Exception e) {
			CreatLog.setDebug("SendMail", "createMimeMessage", "创建MIME邮件对象失败！" + e);
		}
		return false;
	}

	private void setNeedAuth(boolean need) {
		CreatLog.setInfo("SendMail", "setNeedAuth", "设置smtp身份认证：mail.smtp.auth = " + need);
		if (props == null) {
			props = System.getProperties();
		}
		if (need) {
			props.put("mail.smtp.auth", "true");
		} else {
			props.put("mail.smtp.auth", "false");
		}
	}

	private void setNamePass(String name, String pass) {
		username = name;
		password = pass;
	}

	private boolean setSubject(String mailSubject) {
		CreatLog.setInfo("SendMail", "setSubject", "设置邮件主题！");
		try {
			mimeMsg.setSubject(mailSubject, "UTF-8");
			return true;
		} catch (Exception e) {
			CreatLog.setDebug("SendMail", "setSubject", "设置邮件主题发生错误！");
		}
		return false;
	}

	private boolean setBody(String mailBody) {
		try {
			BodyPart bp = new MimeBodyPart();
			bp.setContent("" + mailBody, "text/html;charset=GB2312");
			mp.addBodyPart(bp);

			return true;
		} catch (Exception e) {
			CreatLog.setDebug("SendMail", "setBody", "设置邮件正文时发生错误！" + e);
		}
		return false;
	}

	private boolean setFrom(String from) {
		CreatLog.setInfo("SendMail", "setFrom", "设置发信人！");
		try {
			mimeMsg.setFrom(new InternetAddress(from));
			return true;
		} catch (Exception e) {
		}
		return false;
	}

	private boolean setTo(String to) {
		if (to == null)
			return false;
		try {
			mimeMsg.setRecipients(RecipientType.TO, InternetAddress.parse(to));

			return true;
		} catch (Exception e) {
		}
		return false;
	}

	private int sendout() {
		try {
			mimeMsg.setContent(mp);
			mimeMsg.saveChanges();

			Session mailSession = Session.getInstance(props, null);
			Transport transport = mailSession.getTransport("smtp");
			transport.connect((String) props.get("mail.smtp.host"), username, password);

			transport.sendMessage(mimeMsg, mimeMsg.getRecipients(RecipientType.TO));

			CreatLog.setInfo("SendMail", "sendout", "发送邮件成功！");
			transport.close();

			return OK;
		} catch (Exception e) {
			CreatLog.setDebug("SendMail", "sendout", "邮件发送失败！" + e);
		}
		return ERROR_SENDFAIL;
	}
}
