package com.dmp.core.controller.tag;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enterprise.common.web.CrowdIconUtil;
import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

import lavapm.enterprise.dmp.core.entity.tag.SystemTag;
import lavapm.enterprise.dmp.core.page.tag.SystemTagPage;
import lavapm.enterprise.dmp.core.service.tag.SystemTagService;
import td.enterprise.console.core.entity.admin.ScriptInfo;
import td.enterprise.console.core.page.admin.ScriptInfoPage;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.admin.ScriptInfoService;
import td.enterprise.console.core.service.monitor.AzkabanRestService;
import td.enterprise.dmp.base.constant.ExceptionCodeEnum;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.azkaban.AzkabanBizObjectTypeEnum;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;
import td.enterprise.dmp.meta.entity.phy.DataSource;
import td.enterprise.dmp.meta.page.phy.DataSourcePage;
import td.enterprise.dmp.meta.service.phy.DataSourceService;

@Controller
@RequestMapping({ "/tag" })
public class SystemTagController extends BaseController
{
    public static final Logger logger = Logger.getLogger(SystemTagController.class);
    @Autowired
    private SystemTagService systemTagService;
    @Autowired
    private ScriptInfoService scriptInfoService;
    @Autowired
    private DataSourceService dataSourceService;
    @Autowired
    private AuditLogService auditLogService;
    
    @RequestMapping(value = { "/systemTags" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(SystemTagPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<SystemTag> rows = systemTagService.queryWithSearchByList(page);
        List<Object> results = CrowdIconUtil.converCrowdIcon(rows, "SYSTEM_TAG", UserInfoUtil.getTenant().getCaCode());
        Map<String, Object> descMap =CommonUtil.transBean2Map((Object)page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
        return getGridData(page.getPager().getRowCount(), (Object)results);
    }
    
    @RequestMapping(value = { "/systemTags" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public SystemTag create(@RequestBody SystemTag systemTag) throws Exception {
        User user = UserInfoUtil.getUser();
        systemTag.setCreator(user.getUserName());
        systemTag.setCreateBy(user.getLoginName());
        systemTag.setTenantId(UserInfoUtil.getTenant().getCaCode());
        boolean isRepead = checkSystemTagName(systemTag);
        if (isRepead) {
            throw new BusinessException("系统标签名称已存在，请修改", ExceptionCodeEnum.SUBMIT_CHECK_NAME.errorCode());
        }
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            systemTagService.insertWithSystemTag(systemTag);
            AzkabanRestService azkabanRestService = AzkabanRestService.getInstance();
            String project = Configuration.getInstance().getConfig("azkaban.etl.project");
            String flow = AzkabanBizObjectTypeEnum.SystemTag.toString();
            azkabanRestService.startAzkabanFlow(String.valueOf(systemTag.getId()), AzkabanBizObjectTypeEnum.SystemTag.getBizObjectType(), project, flow, systemTag.getTenantId());
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
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", systemTag.getName());
            descMap.put("description", systemTag.getDescription());
            descMap.put("scriptInfoId", systemTag.getScriptInfoId());
            descMap.put("code", systemTag.getCode());
            descMap.put("scriptParam", systemTag.getScriptParam());
            descMap.put("touchPointType", systemTag.getTouchPointType());
            descMap.put("crowdId", systemTag.getCrowdId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), systemTag.getId(), AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.create.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return systemTag;
    }
    
    @RequestMapping(value = { "/systemTags/{systemTagId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public SystemTag find(@PathVariable String systemTagId) throws Exception {
        SystemTag systemTag = systemTagService.selectByPrimaryKey(systemTagId);
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("name", systemTag.getName());
        descMap.put("description", systemTag.getDescription());
        descMap.put("scriptInfoId", systemTag.getScriptInfoId());
        descMap.put("code", systemTag.getCode());
        descMap.put("scriptParam", systemTag.getScriptParam());
        descMap.put("touchPointType", systemTag.getTouchPointType());
        descMap.put("crowdId", systemTag.getCrowdId());
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), systemTag.getId().toString(), AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return systemTag;
    }
    
    @RequestMapping(value = { "/systemTags/{systemTagId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public SystemTag update(@RequestBody SystemTag systemTag) throws Exception {
        User user = UserInfoUtil.getUser();
        systemTag.setUpdateBy(user.getLoginName());
        systemTag.setTenantId(UserInfoUtil.getTenant().getCaCode());
        systemTag.setUpdateTime(new Date());
        boolean isRepead = checkSystemTagName(systemTag);
        if (isRepead) {
            throw new BusinessException("系统标签名称已存在，请修改", ExceptionCodeEnum.SUBMIT_CHECK_NAME.errorCode());
        }
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            systemTagService.updateSystemTag(systemTag);
        }
        catch (Exception e) {
            logger.error("执行异常",e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw new BusinessException(e);
        }
        finally {
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", systemTag.getName());
            descMap.put("description", systemTag.getDescription());
            descMap.put("scriptInfoId", systemTag.getScriptInfoId());
            descMap.put("code", systemTag.getCode());
            descMap.put("scriptParam", systemTag.getScriptParam());
            descMap.put("touchPointType", systemTag.getTouchPointType());
            descMap.put("crowdId", systemTag.getCrowdId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), systemTag.getId().toString(), AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.update.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return systemTag;
    }
    
    @RequestMapping(value = { "/systemTags/{systemTagId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable final Integer systemTagId) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        SystemTag systemTag = systemTagService.selectByPrimaryKey(systemTagId);
        try {
            systemTagService.deleteSystemTag(systemTagId, user.getLoginName());
        }
        catch (Exception e) {
            logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw new BusinessException(e);
        }
        finally {
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", systemTag.getName());
            descMap.put("description", systemTag.getDescription());
            descMap.put("scriptInfoId", systemTag.getScriptInfoId());
            descMap.put("code", systemTag.getCode());
            descMap.put("scriptParam", systemTag.getScriptParam());
            descMap.put("touchPointType", systemTag.getTouchPointType());
            descMap.put("crowdId", systemTag.getCrowdId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(),systemTag.getId().toString(), AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.delete.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/systemTags/{systemTagId}/restart" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<Object, Object> restartCalcSystemTag(@PathVariable final Integer systemTagId) throws Exception {
        AzkabanRestService azkabanRestService = AzkabanRestService.getInstance();
        String project = Configuration.getInstance().getConfig("azkaban.etl.project");
        String flow = AzkabanBizObjectTypeEnum.SystemTag.toString();
        SystemTag systemTag = systemTagService.selectByPrimaryKey(systemTagId);
        Integer calcStatus = systemTag.getCalcStatus();
        if (calcStatus == 1) {
            throw new BusinessException("当前相似人群已有计算任务在执行中，请稍后再提交计算任务。");
        }
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            azkabanRestService.startAzkabanFlow(String.valueOf(systemTag.getId()), AzkabanBizObjectTypeEnum.SystemTag.getBizObjectType(), project, flow, systemTag.getTenantId());
            systemTag.setCalcStatus(0);
            systemTagService.updateByPrimaryKeySelective(systemTag);
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
            User user = UserInfoUtil.getUser();
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", systemTag.getName());
            descMap.put("description", systemTag.getDescription());
            descMap.put("scriptInfoId", systemTag.getScriptInfoId());
            descMap.put("code", systemTag.getCode());
            descMap.put("scriptParam", systemTag.getScriptParam());
            descMap.put("touchPointType", systemTag.getTouchPointType());
            descMap.put("crowdId", systemTag.getCrowdId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), systemTag.getId().toString(), AuditConstant.TargetType.systemTag.toString(), AuditConstant.OperationType.restart.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/systemTags/scriptInfos" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryScriptInfosByScriptInfo(ScriptInfoPage page) throws Exception {
        page.setOrder("create_time");
        page.getPager().setPageEnabled(false);
        List<ScriptInfo> rows = scriptInfoService.queryByList(page);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/systemTags/DataSources" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryDataSourcesByDataSource(DataSourcePage page) throws Exception {
        page.setOrder("create_time");
        page.getPager().setPageEnabled(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<DataSource> rows = dataSourceService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    private boolean checkSystemTagName(SystemTag systemTag) {
        boolean isRepead = false;
        SystemTag systemTagTemp = new SystemTag();
        systemTagTemp.setTenantId(systemTag.getTenantId());
        systemTagTemp.setName(systemTag.getName());
        List<SystemTag> systemTagList = systemTagService.queryBySystemTag(systemTagTemp);
        if (systemTag.getId() == null) {
            if (systemTagList != null && systemTagList.size() > 0) {
                isRepead = true;
            }
        }
        else if (systemTagList != null && systemTagList.size() > 0) {
            for (SystemTag rSystemTag : systemTagList) {
                if (0 != systemTag.getId().compareTo(rSystemTag.getId())) {
                    isRepead = true;
                }
            }
        }
        return isRepead;
    }
}
