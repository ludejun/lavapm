package com.dmp.core.controller.crowd;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enterprise.common.web.CrowdIconUtil;
import com.enterprise.common.web.UserInfoUtil;
import com.lavapm.query.DmpQuery;
import com.tendcloud.enterprise.um.umic.entity.User;

import td.enterprise.console.core.entity.admin.CalcObject;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.AzkabanRestService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.azkaban.AzkabanBizObjectTypeEnum;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.CSVUtil;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;
import lavapm.enterprise.dmp.core.entity.crowd.Crowd;
import lavapm.enterprise.dmp.core.page.crowd.CrowdPage;
import lavapm.enterprise.dmp.core.service.crowd.CrowdHelperService;
import lavapm.enterprise.dmp.core.service.crowd.CrowdService;
import td.enterprise.dmp.lang.Condition;
import td.enterprise.dmp.meta.entity.cube.Cube;
import td.enterprise.dmp.meta.entity.cube.Dimension;
import td.enterprise.dmp.meta.entity.logic.MetaIndicatorRelationship;
import td.enterprise.dmp.meta.entity.report.ReportCube;
import td.enterprise.dmp.meta.page.logic.MetaIndicatorRelationshipPage;
import td.enterprise.dmp.meta.service.cube.CubeService;
import td.enterprise.dmp.meta.service.cube.DimensionService;
import td.enterprise.dmp.meta.service.logic.MetaIndicatorRelationshipService;
import td.enterprise.dmp.meta.service.report.ReportCubeService;
import td.enterprise.dmp.meta.util.CubeUtils;

@Controller
@RequestMapping({ "/crowd" })
public class CrowdController extends BaseController
{
    public static final Logger logger = Logger.getLogger(CrowdController.class);
    @Autowired
    private CrowdService crowdService;
    @Autowired
    private CrowdHelperService crowdHelperService;
    @Autowired
    private CubeService cubeService;
    @Autowired
    private MetaIndicatorRelationshipService metaIndicatorRelationshipService;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private ReportCubeService reportCubeService;
    @Autowired
    private DimensionService dimensionService;
    
    @RequestMapping(value = { "/crowds" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(CrowdPage page) throws Exception {
        User user = UserInfoUtil.getUser();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setCreateBy(user.getLoginName());
//        }
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setStatus(2);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<Crowd> rows = crowdService.queryWithSearchByList(page);
        List<Object> results = CrowdIconUtil.converCrowdIcon(rows, "CROWD", UserInfoUtil.getTenant().getCaCode());
        Map<String, Object> descMap = (Map<String, Object>)CommonUtil.transBean2Map((Object)page);
        descMap.remove("pager");
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.crowd.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return getGridData(page.getPager().getRowCount(), results);
    }
    
    @RequestMapping(value = { "/crowds/validCrowdList" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Crowd> queryAllCrowdWithTenantId(@RequestParam(required = false) String touchPointType) throws Exception {
        User user = UserInfoUtil.getUser();
        return crowdService.queryAllCrowdWithTenantId(2, UserInfoUtil.getTenant().getCaCode(), touchPointType, user.getLoginName());
    }
    
    @RequestMapping(value = { "/crowds/{crowdId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Crowd find(@PathVariable String crowdId) throws Exception {
        return crowdService.selectByPrimaryKey(crowdId);
    }
    
    /***
     * 人群画像
     * @param crowdId
     * @param groupCode
     * @param attributeCode
     * @param attributeId
     * @param viewType
     * @param isChangeNullValueFilter
     * @param tagRuleId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = { "/crowds/{crowdId}/groupCode/{groupCode}/attributeId/{attributeId}/attributeCode/{attributeCode}/portrait" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> portrait(@PathVariable Integer crowdId, @PathVariable String groupCode, @PathVariable String attributeCode, @PathVariable Integer attributeId, @RequestParam Integer viewType, @RequestParam Boolean isChangeNullValueFilter, @RequestParam Integer tagRuleId) throws Exception {
        DmpQuery dq = DmpQuery.getInstance();
        logger.info("人群画像查询");
        return dq.queryCrowdPortrait(crowdId, "crowd_portrait", groupCode, attributeCode, attributeId, viewType, isChangeNullValueFilter, tagRuleId);
//      return dq.queryNewCrowdPortrait(crowdId, attributeCode);

    }
    
    @RequestMapping(value = { "/crowds/{crowdId}/groupCode/{groupCode}/attributeId/{attributeId}/attributeCode/{attributeCode}/city/{cityLevel}/portrait" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> portraitForCity(@PathVariable Integer crowdId, @PathVariable String groupCode, @PathVariable String attributeCode, @PathVariable Integer attributeId, @PathVariable String cityLevel, @RequestParam Integer viewType) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            DmpQuery dq = DmpQuery.getInstance();
            String attributeCodePortrait = attributeCode + "#split#" + cityLevel + "#split#portrait";
            Map<String, Object> crowdPortraitCity = dq.queryCrowdPortraitForCity(crowdId, "crowd_portrait", groupCode, attributeCodePortrait, attributeId, viewType, cityLevel);
            String attributeCodeScale = attributeCode + "#split#scale";
            int allCity = dq.queryCrowdScaleForCity(crowdId, attributeCodeScale);
            result = buildCrowdPortraitForCity(allCity, crowdPortraitCity);
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
            Crowd crowd = crowdService.selectByPrimaryKey((Object)crowdId);
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("crowdId", crowdId);
            descMap.put("crowdName", crowd.getName());
            descMap.put("groupCode", groupCode);
            descMap.put("attributeCode", attributeCode);
            descMap.put("attributeId", attributeId);
            descMap.put("cityLevel", cityLevel);
            descMap.put("viewType", viewType);
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), crowdId.toString(), AuditConstant.TargetType.crowdPortrait.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return result;
    }
    
    @RequestMapping(value = { "/crowds/{crowdId}/scale" }, method = { RequestMethod.GET })
    @ResponseBody
    public Crowd findCrowdWithScale(@PathVariable Integer crowdId) throws Exception {
        Crowd crowd = crowdService.selectByPrimaryKey(crowdId);
//        DmpQuery dq = DmpQuery.getInstance();
//        Integer scale = dq.queryCrowdScale(crowdId);
//        crowd.setScale(scale);
//        CrowdIconUtil.converCrowdIconForBig(crowd);
        crowd.setScale(0);
        crowd.setCrowdIcon(null);
        return crowd;
    }
    
    @RequestMapping(value = { "/crowds/{crowdId}/export/{exportWay}/exportWay" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> exportCrowd(@PathVariable Integer crowdId, @PathVariable String exportWay, @RequestBody List<Map<String, String>> exportConfigs) throws Exception {
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        final CalcObject calcObject = new CalcObject();
		final Crowd crowd = crowdService.selectByPrimaryKey(crowdId);
		final String exportWayF = exportWay;
		final List<Map<String, String>> exportConfigsF = exportConfigs;
		final String email = user.getEmail();
		try {
			calcObject.setCreator(user.getUserName());
			calcObject.setCreateBy(user.getLoginName());
			calcObject.setAttr3(exportWay);
			new Thread() {
				public void run() {
					try {
						crowdHelperService.exportCrowd(calcObject, crowd, exportWayF, exportConfigsF, email);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

			}.start();
//            String project = Configuration.getInstance().getConfig("azkaban.etl.project");
//            AzkabanRestService.getInstance().startAzkabanFlow(String.valueOf(calcObject.getId()), AzkabanBizObjectTypeEnum.CrowdExport.getBizObjectType(), project, AzkabanBizObjectTypeEnum.CrowdExport.toString(), String.valueOf(UserInfoUtil.getTenant().getCaCode()));
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
            descMap.put("crowdName", crowd.getName());
            descMap.put("exportColumn", exportConfigs);
            descMap.put("email", user.getEmail());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), crowdId.toString(), AuditConstant.TargetType.crowd.toString(), AuditConstant.OperationType.export.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return getSuccessMessage("人群导出已发起");
    }
    
    @RequestMapping(value = { "/crowds/downloadCrowdFile" }, method = { RequestMethod.GET })
    public void downloadCrowdFile(Integer crowdId, String exportType, HttpServletResponse resp) throws Exception {
        List<Map> userList = null;
        CSVUtil csvUtil = new CSVUtil();
        String fileName = "人群信息导出.csv";
        resp.setContentType("application/x-msdownload");
        resp.setHeader("Content-disposition", "attachment; filename=" + new String(fileName.getBytes("utf-8"), "ISO8859-1"));
        OutputStream os = resp.getOutputStream();
        csvUtil.write(os, userList, exportType.split(","));
    }
    
//    @RequestMapping(value = { "/crowds/{crowdId}/crowdAnalysis" }, method = { RequestMethod.POST }, consumes = { "application/json" })
//    @ResponseBody
//    public Object crowdAnalysis(@PathVariable final Integer crowdId, @RequestBody final List<Condition> conditions, @RequestParam final Integer viewType, @RequestParam final String timeRangeType) throws Exception {
//        Crowd crowd = crowdService.selectByPrimaryKey((Object)crowdId);
//        DmpQuery dq = DmpQuery.getInstance();
//        User user = UserInfoUtil.getUser();
//        Map<String, Object> descMap = new HashMap<String, Object>();
//        descMap.put("crowdId", crowdId);
//        descMap.put("conditions", conditions);
//        descMap.put("viewType", viewType);
//        descMap.put("timeRangeType", timeRangeType);
//        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), crowdId, AuditConstant.TargetType.crowdAnalysis.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), true);
//        Object report = dq.queryReport(conditions, crowd.getTenantId(), crowd.getTouchPointType(), viewType, timeRangeType);
//        return report;
//    }
    
    @RequestMapping(value = { "/crowds/indicators" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<MetaIndicatorRelationship> getIndicatorList(MetaIndicatorRelationshipPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setPageEnabled(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        return metaIndicatorRelationshipService.queryByList(page);
    }
    
    @RequestMapping(value = { "/crowds/dimensionEnumValues" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Map<String, String>> queryDimensionEnumValues(@RequestParam("cubeName") String cubeName, @RequestParam("dimensionName") String dimensionName) throws Exception {
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        Cube cube = cubeService.getByIndicatorCode(cubeName, UserInfoUtil.getTenant().getCaCode());
        if (cube == null) {
            ReportCube reportCube = reportCubeService.getByIndicatorCode(cubeName, UserInfoUtil.getTenant().getCaCode());
            if (null == reportCube) {
                throw new BusinessException("当前指标未查询到对应cube信息");
            }
            cube = new Cube();
            cube.setName(reportCube.getCubeCode());
            cube.setDescription(reportCube.getCubeDesc());
            cube.setTenantId(reportCube.getTenantId());
            cube.setId(reportCube.getCubeId());
        }
        List<String> dimensionEnumValues = CubeUtils.queryEnumValue(cube.getName(), dimensionName);
        if (dimensionEnumValues != null && dimensionEnumValues.size() > 0) {
            for (String dimensionEnumValue : dimensionEnumValues) {
                Map<String, String> vMap = new HashMap<String, String>();
                vMap.put("key", dimensionEnumValue);
                vMap.put("value", dimensionEnumValue);
                list.add(vMap);
            }
        }
        return list;
    }
    
    @RequestMapping(value = { "/crowds/cube/{cubeId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Cube getCubeByIndication(@PathVariable Integer cubeId) throws Exception {
        Cube cube = cubeService.selectByPrimaryKey(cubeId);
        if (null != cube) {
            cube = buildCube(cubeService.buildByCubeName(cube.getName(), cube.getDomainId()));
            return cube;
        }
        ReportCube reportCube = reportCubeService.selectByPrimaryKey(cubeId);
        if (null == reportCube) {
            return null;
        }
        cube = reportCubeService.buildCube(reportCube);
        return cube;
    }
    
    private Cube buildCube(Cube cube) {
        if (cube == null) {
            return cube;
        }
        List<Dimension> dimensions = cube.getDimensions();
        List<Dimension> filterDimensions = dimensionService.filterDimension(dimensions);
        cube.setDimensions(filterDimensions);
        return cube;
    }
    
    private Map<String, Object> buildCrowdPortraitForCity(int allCity, Map<String, Object> dataMap) {
        List<String> keys = (List<String>) dataMap.get("keys");
        List<String> categories = (List<String>) dataMap.get("categories");
        List<Map<String, Object>> series = (List<Map<String, Object>>) dataMap.get("series");
        List<Integer> values = (List<Integer>) series.get(0).get("data");
        String name = (String) series.get(0).get("name");
        List<String> keysUI = new ArrayList<String>();
        List<String> displayKeysUI = new ArrayList<String>();
        List<Integer> valuesUI = new ArrayList<Integer>();
        List<String> otherKeysUI = new ArrayList<String>();
        String cityPercent = "0%";
        int peoplesWithTop10 = 0;
        int otherValue = 0;
        if (categories != null && categories.size() > 0) {
            for (int i = 0; i < categories.size(); ++i) {
                String key = keys.get(i);
                int value = values.get(i);
                String displayKey = categories.get(i);
                if (value != 0) {
                    if (!"国外".equals(displayKey)) {
                        if (keysUI.size() < 10 && !"\\N".equals(key)) {
                            keysUI.add(key);
                            displayKeysUI.add(displayKey);
                            valuesUI.add(value);
                        }
                        else {
                            otherKeysUI.add(key);
                            otherValue += value;
                        }
                        peoplesWithTop10 += value;
                    }
                }
            }
        }
        if (otherValue > 0) {
            keys.add("其它");
            displayKeysUI.add("其它");
            valuesUI.add(otherValue);
        }
        if (allCity != 0) {
            double divideResult = peoplesWithTop10 / allCity * 100.0;
            BigDecimal bd = new BigDecimal(divideResult).setScale(1, 1);
            cityPercent = bd.doubleValue() + "%";
        }
        List<Map<String, Object>> seriesUI = new ArrayList<Map<String, Object>>();
        Map<String, Object> sery = new HashMap<String, Object>();
        sery.put("name", name);
        sery.put("data", valuesUI);
        seriesUI.add(sery);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("keys", keysUI);
        result.put("categories", displayKeysUI);
        result.put("series", seriesUI);
        result.put("cityPercent", cityPercent);
        return result;
    }
}
