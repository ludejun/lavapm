package com.dmp.core.controller.monitor;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

import td.enterprise.console.core.entity.monitor.SchedulerTask;
import td.enterprise.console.core.entity.monitor.SchedulerTaskLog;
import td.enterprise.console.core.page.monitor.SchedulerTaskLogPage;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.SchedulerTaskLogService;
import td.enterprise.console.core.service.monitor.SchedulerTaskService;
import td.enterprise.dmp.base.constant.ExceptionCodeEnum;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.ApplicationContextManager;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.inf.ICalcObjectHandleOp;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;

@Controller
@RequestMapping({ "/monitor" })
public class SchedulerTaskLogController extends BaseController
{
    public static final Logger logger = Logger.getLogger(SchedulerTaskLogController.class);
    @Autowired
    private SchedulerTaskLogService schedulerTaskLogService;
    @Autowired
    private SchedulerTaskService schedulerTaskService;
    @Autowired
    private AuditLogService auditLogService;
    
    @RequestMapping(value = { "/schedulerTaskLogs" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(SchedulerTaskLogPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        List<SchedulerTaskLog> rows = schedulerTaskLogService.queryWithSearchByList(page);
        Map<String, Object> descMap = CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.schedulerTaskLog.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public SchedulerTaskLog create(@RequestBody SchedulerTaskLog schedulerTaskLog) throws Exception {
        schedulerTaskLogService.insert(schedulerTaskLog);
        return schedulerTaskLog;
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs/{schedulerTaskLogId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public SchedulerTaskLog find(@PathVariable String schedulerTaskLogId) throws Exception {
        return schedulerTaskLogService.selectByPrimaryKey(schedulerTaskLogId);
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs/{schedulerTaskLogId}/tenantId" }, method = { RequestMethod.GET })
    @ResponseBody
    public SchedulerTaskLog findWithTenantId(@PathVariable final String schedulerTaskLogId) throws Exception {
        SchedulerTaskLog schedulerTaskLog = schedulerTaskLogService.findWithTenantId(Integer.valueOf(schedulerTaskLogId), UserInfoUtil.getTenant().getCaCode());
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("schedulerTaskLogId", schedulerTaskLogId);
        descMap.put("tenantId", UserInfoUtil.getTenant().getCaCode());
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), schedulerTaskLog.getId(), AuditConstant.TargetType.schedulerTaskLog.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return schedulerTaskLog;
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs/{schedulerTaskLogId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public SchedulerTaskLog update(@RequestBody SchedulerTaskLog schedulerTaskLog) throws Exception {
        schedulerTaskLogService.updateByPrimaryKeySelective(schedulerTaskLog);
        return schedulerTaskLog;
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs/{schedulerTaskLogId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String schedulerTaskLogId) throws Exception {
        schedulerTaskLogService.deleteByPrimaryKey(new Object[] { schedulerTaskLogId });
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/schedulerTaskLogs/{schedulerTaskLogId}/action/{action}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> updateSchedulerTaskLogStatus(@PathVariable String schedulerTaskLogId, @PathVariable String action) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        SchedulerTaskLog schedulerTaskLog = schedulerTaskLogService.selectByPrimaryKey((Object)schedulerTaskLogId);
        if (StringUtils.isNotBlank(action) && "retry".equals(action)) {
            SchedulerTask schedulerTask = schedulerTaskService.selectByPrimaryKey(schedulerTaskLog.getTaskId());
            if (schedulerTask == null) {
                return getFailureMessage("调度任务不存在，不能重试");
            }
            if (schedulerTask.getStatus() == 0) {
                throw new BusinessException("调度任务\"" + schedulerTask.getName() + "\"已被禁用，不能发起重试，请联系管理员启用任务再重试", ExceptionCodeEnum.AZKABAN_TASK_EFFECTIVE.errorCode());
            }
            String inputParam = schedulerTaskLog.getInputParam();
            if (StringUtils.isBlank(inputParam)) {
                return getFailureMessage("计算参数不能为空");
            }
            ObjectMapper mp = new ObjectMapper();
            Map<String, String> calcMap = mp.readValue(inputParam,Map.class);
            String bizObjectId = calcMap.get("bizObjectId");
            String bizObjectType = calcMap.get("bizObjectType");
            ICalcObjectHandleOp handle = (ICalcObjectHandleOp)ApplicationContextManager.getBean(bizObjectType + "Service");
            boolean isDelete = handle.checkCalcObjectIsDelete(bizObjectId);
            if (isDelete) {
                return getFailureMessage("计算对象" + bizObjectType + "已删除，不能重试");
            }
            boolean isRunning = schedulerTaskLogService.checkSchedulerTaskIsRunning(schedulerTaskLog);
            if (isRunning) {
                return getFailureMessage("当前对象已有计算中的任务，请稍后重试");
            }
        }
        schedulerTaskLog = schedulerTaskLogService.updateSchedulerTaskLogStatus(schedulerTaskLog, action);
        String execId = String.valueOf(schedulerTaskLog.getAzkabanExecutorId());
        try {
            if (StringUtils.isNotBlank(action) && "stop".equals(action)) {
                schedulerTaskLogService.cancelAzkabanFlowByExecid(execId);
            }
            else {
                if (!StringUtils.isNotBlank(action) || !"retry".equals(action)) {
                    throw new BusinessException("操作类型不支持 " + action);
                }
                schedulerTaskLogService.restartAzkabanFlowByExecid(execId, schedulerTaskLog);
            }
        }
        catch (Exception e) {
            logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw e;
        }
        finally {
            Map<String, Object> descMap = CommonUtil.transBean2Map(schedulerTaskLog);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), schedulerTaskLog.getId(), AuditConstant.TargetType.schedulerTaskLog.toString(), action, JsonUtils.objectToJsonStr((Object)descMap), isSuccess);
        }
        return getSuccessMessage("stop".equals(action) ? "终止操作成功" : "重试操作成功");
    }
}
