package com.dmp.core.controller.monitor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.console.core.entity.monitor.CalcObjectLog;
import td.enterprise.console.core.page.monitor.CalcObjectLogPage;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.CalcObjectLogService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/monitor" })
public class CalcObjectLogController extends BaseController
{
    public static final Logger logger = Logger.getLogger(CalcObjectLogController.class);
    @Autowired
    private CalcObjectLogService calcObjectLogService;
    @Autowired
    private AuditLogService auditLogService;
    
    @RequestMapping(value = { "/calcObjectLogs" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(CalcObjectLogPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        List<CalcObjectLog> rows = calcObjectLogService.queryWithSchedulerTaskByList(page);
        Map<String, Object> descMap = CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.calcObjectLog.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/calcObjectLogs" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public CalcObjectLog create(@RequestBody CalcObjectLog calcObjectLog) throws Exception {
        calcObjectLogService.insert(calcObjectLog);
        return calcObjectLog;
    }
    
    @RequestMapping(value = { "/calcObjectLogs/{calcObjectLogId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public CalcObjectLog find(@PathVariable String calcObjectLogId) throws Exception {
        return calcObjectLogService.selectByPrimaryKey(calcObjectLogId);
    }
    
    @RequestMapping(value = { "/calcObjectLogs/{calcObjectLogId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public CalcObjectLog update(@RequestBody CalcObjectLog calcObjectLog) throws Exception {
        calcObjectLogService.updateByPrimaryKeySelective(calcObjectLog);
        return calcObjectLog;
    }
    
    @RequestMapping(value = { "/calcObjectLogs/{calcObjectLogId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String calcObjectLogId) throws Exception {
        calcObjectLogService.deleteByPrimaryKey(new Object[] {calcObjectLogId});
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/calcObjectLogs/groupByExecutorId" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryWithGroupByExecutorId(CalcObjectLogPage page) throws Exception {
        Map<String, Object> map = calcObjectLogService.queryWithGroupByExecutorId(page.getSchedulerTaskLogId(), UserInfoUtil.getTenant().getCaCode());
        return map;
    }
    
    @RequestMapping(value = { "/calcObjectLogs/{calcObjectLogId}/tenantId" }, method = { RequestMethod.GET })
    @ResponseBody
    public CalcObjectLog findWithTenantId(@PathVariable String calcObjectLogId) throws Exception {
        CalcObjectLog calcObjectLog = calcObjectLogService.findWithIdAndTenantId(Integer.valueOf(calcObjectLogId), String.valueOf(UserInfoUtil.getTenant().getCaCode()));
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("calcObjectLogId", calcObjectLogId);
        descMap.put("tenantId", UserInfoUtil.getTenant().getCaCode());
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), calcObjectLog.getId(), AuditConstant.TargetType.calcObjectLog.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return calcObjectLog;
    }
    
    @RequestMapping(value = { "/calcObjectLogs/objectType/{objectType}" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<CalcObjectLog> queryDistinctName(@PathVariable String objectType) throws Exception {
        if (StringUtils.isNotBlank(objectType) && "default".equals(objectType)) {
            objectType = null;
        }
        return calcObjectLogService.queryDistinctName(UserInfoUtil.getTenant().getCaCode(), objectType);
    }
}
