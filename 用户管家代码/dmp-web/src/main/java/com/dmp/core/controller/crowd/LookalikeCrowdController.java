package com.dmp.core.controller.crowd;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
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

import lavapm.enterprise.dmp.core.entity.crowd.LookalikeCrowd;
import lavapm.enterprise.dmp.core.page.crowd.LookalikeCrowdPage;
import lavapm.enterprise.dmp.core.service.crowd.CrowdService;
import lavapm.enterprise.dmp.core.service.crowd.LookalikeCrowdService;
import td.enterprise.console.core.entity.admin.Algorithm;
import td.enterprise.console.core.page.admin.AlgorithmPage;
import td.enterprise.console.core.service.admin.AlgorithmService;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.AzkabanRestService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.azkaban.AzkabanBizObjectTypeEnum;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;

@Controller
@RequestMapping({ "/crowd" })
public class LookalikeCrowdController extends BaseController
{
    public static final Logger logger = Logger.getLogger(LookalikeCrowdController.class);
    @Autowired
    private LookalikeCrowdService lookalikeCrowdService;
    @Autowired
    private CrowdService crowdService;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private AlgorithmService algorithmService;
    
    @RequestMapping(value = { "/lookalikeCrowds" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(LookalikeCrowdPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<LookalikeCrowd> rows = lookalikeCrowdService.queryWithSearchByList(page);
        List<Object> results = CrowdIconUtil.converCrowdIcon(rows, "LOOKALIKE", UserInfoUtil.getTenant().getCaCode());
        Map<String, Object> descMap = CommonUtil.transBean2Map((Object)page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return getGridData(page.getPager().getRowCount(), results);
    }
    
    @RequestMapping(value = { "/lookalikeCrowds" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public LookalikeCrowd create(@RequestBody LookalikeCrowd lookalikeCrowd) throws Exception {
        User user = UserInfoUtil.getUser();
        lookalikeCrowd.setCreateBy(user.getLoginName());
        lookalikeCrowd.setCreator(user.getUserName());
        lookalikeCrowd.setTenantId(UserInfoUtil.getTenant().getCaCode());
        lookalikeCrowdService.checkLookalike(lookalikeCrowd);
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            lookalikeCrowd = lookalikeCrowdService.saveLookalikeCrowd(lookalikeCrowd);
            AzkabanRestService azkabanRestService = AzkabanRestService.getInstance();
            String project = Configuration.getInstance().getConfig("azkaban.etl.project");
            String flow = AzkabanBizObjectTypeEnum.LookalikeCrowd.toString();
            azkabanRestService.startAzkabanFlow(String.valueOf(lookalikeCrowd.getId()), AzkabanBizObjectTypeEnum.LookalikeCrowd.getBizObjectType(), project, flow, lookalikeCrowd.getTenantId());
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
            Map<String, Object> descMap = CommonUtil.transBean2Map((Object)lookalikeCrowd);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), lookalikeCrowd.getId(), AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.create.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return lookalikeCrowd;
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/{lookalikeCrowdId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public LookalikeCrowd find(@PathVariable String lookalikeCrowdId) throws Exception {
        LookalikeCrowd lookalikeCrowd = lookalikeCrowdService.findById(Integer.valueOf(lookalikeCrowdId));
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("name", lookalikeCrowd.getName());
        descMap.put("code", lookalikeCrowd.getCode());
        descMap.put("crowdId", lookalikeCrowd.getCrowdId());
        descMap.put("touchPointType", lookalikeCrowd.getTouchPointType());
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), lookalikeCrowdId, AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return lookalikeCrowd;
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/{lookalikeCrowdId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public LookalikeCrowd update(@RequestBody LookalikeCrowd lookalikeCrowd) throws Exception {
        User user = UserInfoUtil.getUser();
        lookalikeCrowd.setUpdateBy(user.getLoginName());
        lookalikeCrowdService.checkLookalike(lookalikeCrowd);
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            lookalikeCrowd = lookalikeCrowdService.saveLookalikeCrowd(lookalikeCrowd);
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
            Map<String, Object> descMap = CommonUtil.transBean2Map((Object)lookalikeCrowd);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), ((lookalikeCrowd.getId() != null) ? lookalikeCrowd.getId().toString() : ""), AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.update.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return lookalikeCrowd;
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/{lookalikeCrowdId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable Integer lookalikeCrowdId) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        LookalikeCrowd lookalikeCrowd = new LookalikeCrowd();
        try {
            lookalikeCrowd = lookalikeCrowdService.deleteLookalikeCrowd(lookalikeCrowdId, user.getLoginName());
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
            Map<String, Object> descMap = CommonUtil.transBean2Map((Object)lookalikeCrowd);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), ((lookalikeCrowd.getId() != null) ? lookalikeCrowd.getId().toString() : ""), AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.delete.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/{lookalikeCrowdId}/restart" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<Object, Object> restartCalcLookalikeCrowd(@PathVariable Integer lookalikeCrowdId) throws Exception {
        AzkabanRestService azkabanRestService = AzkabanRestService.getInstance();
        String project = Configuration.getInstance().getConfig("azkaban.etl.project");
        String flow = AzkabanBizObjectTypeEnum.LookalikeCrowd.toString();
        LookalikeCrowd lookalikeCrowd = lookalikeCrowdService.selectByPrimaryKey(lookalikeCrowdId);
        Integer calcStatus = lookalikeCrowd.getCalcStatus();
        if (calcStatus == 1) {
            throw new BusinessException("当前相似人群已有计算任务在执行中，请稍后再提交计算任务。");
        }
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            azkabanRestService.startAzkabanFlow(String.valueOf(lookalikeCrowd.getId()), AzkabanBizObjectTypeEnum.LookalikeCrowd.getBizObjectType(), project, flow, lookalikeCrowd.getTenantId());
            lookalikeCrowd.setCalcStatus(0);
            lookalikeCrowdService.updateByPrimaryKeySelective(lookalikeCrowd);
        }
        catch (Exception e) {
            LookalikeCrowdController.logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw e;
        }
        finally {
            Map<String, Object> descMap = CommonUtil.transBean2Map(lookalikeCrowd);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            User user = UserInfoUtil.getUser();
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), ((lookalikeCrowd.getId() != null) ? lookalikeCrowd.getId().toString() : ""), AuditConstant.TargetType.lookalikeCrowd.toString(), AuditConstant.OperationType.restart.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/{status}/lookalikeCrowdCount" }, method = { RequestMethod.GET })
    @ResponseBody
    public Integer queryCountByStatus(@PathVariable String status) throws Exception {
        return lookalikeCrowdService.queryCountByStatus(Integer.valueOf(status));
    }
    
    @RequestMapping(value = { "/lookalikeCrowds/allAlgorithms" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryAllgorithmList(AlgorithmPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        List<String> tenants = new ArrayList<String>();
        tenants.add(UserInfoUtil.getTenant().getCaCode());
        tenants.add("global");
        page.setTenants((String[])tenants.toArray(new String[0]));
        List<Algorithm> rows = algorithmService.queryWithSearchByList(page);
        return (Map<String, Object>)this.getGridData(page.getPager().getRowCount(), (Object)rows);
    }
    
    private LookalikeCrowd saveLookalikeCrowd(LookalikeCrowd lookalikeCrowd) throws Exception {
        User user = UserInfoUtil.getUser();
        if (lookalikeCrowd.getId() == null) {
            lookalikeCrowd.setCreateBy(user.getLoginName());
            lookalikeCrowd.setCreator(user.getUserName());
            lookalikeCrowd.setTenantId(UserInfoUtil.getTenant().getCaCode());
        }
        else {
            lookalikeCrowd.setUpdateBy(user.getLoginName());
        }
        lookalikeCrowdService.saveLookalikeCrowd(lookalikeCrowd);
        return lookalikeCrowd;
    }
}
