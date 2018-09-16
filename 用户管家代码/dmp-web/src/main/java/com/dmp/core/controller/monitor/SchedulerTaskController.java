package com.dmp.core.controller.monitor;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
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

import td.enterprise.console.core.entity.monitor.SchedulerTask;
import td.enterprise.console.core.page.monitor.SchedulerTaskPage;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.SchedulerTaskService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/monitor" })
public class SchedulerTaskController extends BaseController
{
    public static final Logger logger = Logger.getLogger(SchedulerTaskController.class);
    @Autowired
    private SchedulerTaskService schedulerTaskService;
    @Autowired
    private AuditLogService auditLogService;
    
    @RequestMapping(value = { "/schedulerTasks" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(SchedulerTaskPage page) throws Exception {
        List<String> tenants = (List<String>)page.getTenants();
        if (!StringUtils.isBlank(page.getTenantId())) {
            tenants.add(page.getTenantId());
        }
        else {
            tenants.add(UserInfoUtil.getTenant().getCaCode());
            tenants.add("global");
        }
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        List<SchedulerTask> rows = schedulerTaskService.queryByListWithMaxVersion(page);
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap =CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.schedulerTask.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/schedulerTasks" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public SchedulerTask create(@RequestBody SchedulerTask schedulerTask) throws Exception {
        schedulerTaskService.insert(schedulerTask);
        return schedulerTask;
    }
    
    @RequestMapping(value = { "/schedulerTasks/{schedulerTaskId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public SchedulerTask find(@PathVariable String schedulerTaskId) throws Exception {
        return schedulerTaskService.selectByPrimaryKey((Object)schedulerTaskId);
    }
    
    @RequestMapping(value = { "/schedulerTasks/{schedulerTaskId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public SchedulerTask update(@RequestBody SchedulerTask schedulerTask) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            schedulerTaskService.updateByPrimaryKeySelective(schedulerTask);
        }
        catch (Exception e) {
            SchedulerTaskController.logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw e;
        }
        finally {
            Map<String, Object> descMap = CommonUtil.transBean2Map(schedulerTask);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), schedulerTask.getId(), AuditConstant.TargetType.schedulerTask.toString(), AuditConstant.OperationType.update.toString(), JsonUtils.objectToJsonStr((Object)descMap), isSuccess);
        }
        return schedulerTask;
    }
    
    @RequestMapping(value = { "/schedulerTasks/{schedulerTaskId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String schedulerTaskId) throws Exception {
        schedulerTaskService.deleteByPrimaryKey(new Object[] {schedulerTaskId});
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/schedulerTasks/{schedulerTaskId}/action/{action}" }, method = { RequestMethod.GET })
    @ResponseBody
    public SchedulerTask updateSchedulerTaskStatus(@PathVariable String schedulerTaskId, @PathVariable String action) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        SchedulerTask schedulerTask =schedulerTaskService.selectByPrimaryKey((Object)schedulerTaskId);
        try {
            schedulerTask = schedulerTaskService.updateSchedulerTaskStatus(schedulerTaskId, action);
        }
        catch (Exception e) {
            SchedulerTaskController.logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw e;
        }
        finally {
            Map<String, Object> descMap = CommonUtil.transBean2Map(schedulerTask);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(),schedulerTask.getId(), AuditConstant.TargetType.schedulerTask.toString(), AuditConstant.OperationType.update.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return schedulerTask;
    }
    
    @RequestMapping(value = { "/schedulerTasks/dropDown/schedulerTasksName" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, String>> dropDownSchedulerTasks() throws Exception {
        List<String> tenants = new ArrayList<String>();
        tenants.add(UserInfoUtil.getTenant().getCaCode());
        tenants.add("global");
        Map<String, Object> dropDownCondition = new HashMap<String, Object>();
        dropDownCondition.put("tenants", tenants);
        List<Map<String, String>> rows = schedulerTaskService.dropDownSchedulerTasks(dropDownCondition);
        return rows;
    }
}
