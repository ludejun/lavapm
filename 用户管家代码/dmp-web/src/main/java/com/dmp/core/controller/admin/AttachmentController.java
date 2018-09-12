package com.dmp.core.controller.admin;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

import td.enterprise.console.core.entity.admin.Attachment;
import td.enterprise.console.core.page.admin.AttachmentPage;
import td.enterprise.console.core.service.admin.AttachmentService;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.JsonUtils;

@Controller
@RequestMapping({ "/admin" })
public class AttachmentController extends BaseController {
	public static Logger logger = Logger.getLogger(AttachmentController.class);
	@Autowired
	private AttachmentService attachmentService;
	@Autowired
	private AuditLogService auditLogService;

	@RequestMapping(value = { "/attachments" }, method = { RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> query(AttachmentPage page) throws Exception {
		List<Attachment> rows = attachmentService.queryByList(page);
		return getGridData(page.getPager().getRowCount(), rows);
	}

	@RequestMapping(value = { "/attachments" }, method = { RequestMethod.POST })
	@ResponseBody
	public Attachment create(HttpServletRequest request, Attachment attachment) throws Exception {
		User user = UserInfoUtil.getUser();
		attachment.setType(1);
		attachment.setCreator(user.getUserName());
		attachment.setCreateBy(user.getLoginName());
		attachmentService.upload(attachment);
		attachment.setFile((MultipartFile[]) null);
		return attachment;
	}

	@RequestMapping(value = { "/attachments/{attachmentId}" }, method = { RequestMethod.GET })
	@ResponseBody
	public Attachment find(@PathVariable String attachmentId) throws Exception {
		return attachmentService.selectByPrimaryKey((Object) attachmentId);
	}

	@RequestMapping(value = { "/attachments/{attachmentId}" }, method = { RequestMethod.PUT }, consumes = {
			"application/json" })
	@ResponseBody
	public Attachment update(@RequestBody Attachment attachment) throws Exception {
		attachmentService.updateByPrimaryKeySelective(attachment);
		return attachment;
	}

	@RequestMapping(value = { "/attachments/{attachmentId}" }, method = { RequestMethod.DELETE })
	@ResponseBody
	public Map<Object, Object> delete(@PathVariable String attachmentId) throws Exception {
		attachmentService.deleteByPrimaryKey(new Object[] { attachmentId });
		return new HashMap<Object, Object>();
	}

	@SuppressWarnings("deprecation")
	@RequestMapping(value = { "/attachments/{calcObjectId}/download" }, method = { RequestMethod.GET })
	public void download(@PathVariable String calcObjectId, HttpServletRequest request, HttpServletResponse response)throws Exception {
		User user = UserInfoUtil.getUser();
		boolean isSuccess = true;
		String errorMsg = "";
		Attachment attachment = attachmentService.getByCalcId(calcObjectId);
		String path = attachment.getPath();
		File file = new File(path);
		if (!file.exists()) {
			logger.debug("附件path = " + path);
			throw new BusinessException("附件不存在");
		}
		try {
			InputStream ins = new FileInputStream(path);    
            BufferedInputStream bins = new BufferedInputStream(ins);// 放到缓冲流里面    
            OutputStream outs = response.getOutputStream();// 获取文件输出IO流    
            BufferedOutputStream bouts = new BufferedOutputStream(outs);    
            response.setContentType("application/x-download");// 设置response内容的类型    
            response.setHeader("Content-disposition","attachment;filename="+ URLEncoder.encode(attachment.getName(), "GBK"));// 设置头部信息    
            int bytesRead = 0;    
            byte[] buffer = new byte[8192];    
             //开始向网络传输文件流    
            while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {    
               bouts.write(buffer, 0, bytesRead);    
           }
          //这里一定要调用flush()方法
           bouts.flush();    
           ins.close();    
           bins.close();    
           outs.close();    
           bouts.close();
		} catch (Exception e) {
			logger.error("执行异常", e);
			isSuccess = false;
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			errorMsg = sw.toString();
			throw e;
		} finally {
			Map<String, Object> descMap = new HashMap<String, Object>();
			descMap.put("name", attachment.getName());
			descMap.put("calcCode", attachment.getCalcCode());
			descMap.put("calcType", attachment.getCalcType());
			descMap.put("type", attachment.getType());
			descMap.put("path", attachment.getPath());
			descMap.put("description", attachment.getDescription());
			if (!isSuccess) {
				descMap.put("errorMsg", errorMsg);
			}
			auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), attachment.getId().toString(),
					AuditConstant.TargetType.attachment.toString(), AuditConstant.OperationType.download.toString(),
					JsonUtils.objectToJsonStr(descMap), isSuccess);
		}
	}

	public String toUtf8String(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); ++i) {
			final char c = s.charAt(i);
			if (c >= '\0' && c <= 'ÿ') {
				sb.append(c);
			} else {
				byte[] b;
				try {
					b = Character.toString(c).getBytes("utf-8");
				} catch (Exception ex) {
					AttachmentController.logger.error("将文件名中的汉字转为UTF8编码的串时错误，输入的字符串为：" + s);
					b = new byte[0];
				}
				for (int j = 0; j < b.length; ++j) {
					int k = b[j];
					if (k < 0) {
						k += 256;
					}
					sb.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return sb.toString();
	}
}
