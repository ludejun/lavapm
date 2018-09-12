package com.dmp.core.controller.admin;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

import td.enterprise.console.core.entity.admin.Attachment;
import td.enterprise.console.core.entity.admin.CalcObject;
import td.enterprise.console.core.page.admin.CalcObjectPage;
import td.enterprise.console.core.service.admin.AttachmentService;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.admin.CalcObjectService;
import td.enterprise.console.core.service.monitor.AzkabanRestService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.azkaban.AzkabanBizObjectTypeEnum;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;

@Controller
@RequestMapping({ "/admin" })
public class CalcObjectController extends BaseController
{
    public static final Logger logger = Logger.getLogger(CalcObjectController.class);
    public static final String[] CALC_OBJECT_CODES = new String[] { "crowdExport" };
    @Autowired
    private CalcObjectService calcObjectService;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
	private AttachmentService attachmentService;
    
    @RequestMapping(value = { "/calcObjects" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(CalcObjectPage page) throws Exception {
        List<CalcObject> rows = calcObjectService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/calcObjects" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public CalcObject create(@RequestBody CalcObject calcObject) throws Exception {
        calcObjectService.insert(calcObject);
        return calcObject;
    }
    
    @RequestMapping(value = { "/calcObjects/{calcObjectId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public CalcObject find(@PathVariable String calcObjectId) throws Exception {
        return calcObjectService.selectByPrimaryKey(calcObjectId);
    }
    
    @RequestMapping(value = { "/calcObjects/{calcObjectId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public CalcObject update(@RequestBody CalcObject calcObject) throws Exception {
        calcObjectService.updateByPrimaryKeySelective(calcObject);
        return calcObject;
    }
    
    @RequestMapping(value = { "/calcObjects/{calcObjectId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String calcObjectId) throws Exception {
        calcObjectService.deleteByPrimaryKey(new Object[] {calcObjectId});
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/calcObjects/exportCalcRecord" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryExportCalcRecord(CalcObjectPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        page.setCodes(CalcObjectController.CALC_OBJECT_CODES);
        List<CalcObject> rows = calcObjectService.queryExportCalcRecordByList(page);
        Map<String, Object> descMap = CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.calcObject.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/calcObjects/{calcObjectId}/restartCompute" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> restartCompute(@PathVariable String calcObjectId,HttpServletResponse response) throws Exception {
        CalcObject calcObject = calcObjectService.selectByPrimaryKey(calcObjectId);
        Integer calcStatus = calcObject.getCalcStatus();
        if (calcStatus == 1) {
            throw new BusinessException("计算对象已有计算任务在执行中，请稍后再提交计算任务。");
        }
        if (calcStatus == -4) {
            throw new BusinessException("计算对象已重新计算，请稍后再提交计算任务。");
        }
        
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
		}catch (Exception e) {
			logger.error("restartCompute error :",e);
		}
        User user = UserInfoUtil.getUser();
        calcObject.setStatus(2);
        calcObject.setCalcStatus(2);
        calcObject.setUpdateBy(user.getLoginName());
        calcObject.setUpdateTime(new Date());
        calcObjectService.updateByPrimaryKeySelective(calcObject);
        Map<String, Object> descMap = CommonUtil.transBean2Map(calcObject);
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), calcObject.getId(), AuditConstant.TargetType.calcObject.toString(), AuditConstant.OperationType.restart.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return getSuccessMessage("计算任务已发起");
    }
    
}
