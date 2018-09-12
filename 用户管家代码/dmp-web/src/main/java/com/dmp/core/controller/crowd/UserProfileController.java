package com.dmp.core.controller.crowd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.console.core.entity.admin.Param;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.entity.EsHitsRecord;
import td.enterprise.dmp.common.entity.EsResult;
import td.enterprise.dmp.common.meta.MetadataConstants;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;
import lavapm.enterprise.dmp.core.entity.crowd.EsCrowdControl;
import lavapm.enterprise.dmp.core.page.crowd.UserLogPage;
import lavapm.enterprise.dmp.core.page.crowd.UserProfilePage;
import lavapm.enterprise.dmp.core.service.crowd.EsCrowdControlService;
import lavapm.enterprise.dmp.core.service.crowd.UserService;
import td.enterprise.dmp.lang.Definition;
import td.enterprise.dmp.lang.Filter;
import td.enterprise.dmp.meta.entity.logic.MetaAttributeGroup;
import td.enterprise.dmp.meta.entity.logic.MetaAttributeGroupRelationship;
import td.enterprise.dmp.meta.service.logic.MetaAttributeGroupRelationshipService;
import td.enterprise.dmp.meta.service.logic.MetaAttributeGroupService;
import lavapm.enterprise.dmp.module.tag.builder.DefinitionBuilder;
import td.enterprise.elasticsearch.ElasticsearchHttpTemplate;
import td.enterprise.hbase.HbaseRepositoryService;

import com.enterprise.common.cache.WebCacheWrapper;
import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/userProfile" })
public class UserProfileController extends BaseController
{
    public static final Logger logger = Logger.getLogger(UserProfileController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private MetaAttributeGroupService metaAttributeGroupService;
    @Autowired
    private MetaAttributeGroupRelationshipService metaAttributeGroupRelationshipService;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private EsCrowdControlService esCrowdControlService;
    private static String PARAM_KEY;
    private static String PARAM_TABLE_CODE_KEY;
    
    /**
     * 用户档案查询列表展示
     * @param definition
     * @param page
     * @return
     * @throws Exception
     */
    @RequestMapping(value = { "/userProfiles" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public Map<String, Object> query(@RequestBody Definition definition, UserProfilePage page) throws Exception {
        page.setSort("update_time");
        page.getPager().setOrderDirection(false);
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        logger.info("查询租户" + tenantId + "用户档案列表查询");
        if (definition == null || definition.getFilter() == null) {
            definition = buildQuickSearchConditions(definition, page, tenantId);
        }
        ElasticsearchHttpTemplate esHttpTemplate = new ElasticsearchHttpTemplate();
        //根据crowid,user_profile_status=0. 未同步，status=0，未生效，查询batchN
        int total  = 0;
        EsCrowdControl esCrowdControl = null;
        if (StringUtils.isNotBlank(page.getCrowdId())) {
        	Integer crowd = Integer.valueOf(page.getCrowdId());
			esCrowdControl = esCrowdControlService.queryOnlineEs(Integer.valueOf(crowd));
		}
		//转义页面点击的查询条件变成ES的sql
        String batchNo = null;
        if (esCrowdControl!=null) {
        	batchNo = esCrowdControl.getBatchNo();
        	logger.info("查询出有效的批次号为："+batchNo);
		}else {
			logger.info("用户档案查询的是所有标签数据");
		}
        String sql = userService.buildUserProfileScript(definition, tenantId, page,batchNo);
        logger.info("UserProfileController 查询sql:" + sql);
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = (Map<String, Object>)CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        descMap.put("definition", definition.toMap());
        descMap.put("sql", sql);
        EsResult esResult = null;
        try {
            esResult = esHttpTemplate.query(sql, false);
        }
        catch (Exception e) {
            logger.error("UserProfileController ES查询异常", e);
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), false);
        }
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), true);
        if (esResult == null) {
            resultMap.put("total", 0);
            resultMap.put("rows", resultList);
            return resultMap;
        }
        //页面数据分页处理
        total = Integer.valueOf(esResult.getHits().getTotal() + "");
        if (total == 0) {
            resultMap.put("total", total);
            resultMap.put("rows", resultList);
            return resultMap;
        }
        if (total > 10000) {
            total = 10000;
        }
        List<EsHitsRecord> esHitsRecords = (List<EsHitsRecord>)esResult.getHits().getHits();
        if (esHitsRecords != null) {
            for (EsHitsRecord esHitsRecord : esHitsRecords) {
                Map<String, Object> map = (Map<String, Object>)esHitsRecord.get_source();
                map.put("_id", esHitsRecord.get_id());
                resultList.add(map);
            }
        }
        else {
            logger.info("no result!");
        }
        
        resultMap.put("total", total);
        resultMap.put("rows", resultList);
        return resultMap;
    }
    
    @RequestMapping(value = { "/userProfiles/{id}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> findByUserId(@PathVariable String id) throws Exception {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        ElasticsearchHttpTemplate esHttpTemplate = new ElasticsearchHttpTemplate();
        String sql = "select * from user_profile where _id = '" + id + "'";
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("id", id);
        descMap.put("sql", sql);
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr(descMap), true);
        List<EsHitsRecord> esHitsRecords = (List<EsHitsRecord>)esHttpTemplate.query(sql).getHits().getHits();
        if (esHitsRecords == null || esHitsRecords.size() == 0) {
            return resultMap;
        }
        resultMap = (Map<String, Object>)esHitsRecords.get(0).get_source();
        resultMap.put("capitalInfo", capitalInfoMap());
        resultMap.put("creditInfo", creditInfoMap());
        return resultMap;
    }
    
    @RequestMapping(value = { "/userProfiles/{id}/reprot/{reportId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map queryReport(@PathVariable String id, @PathVariable String reportId) {
        return null;
    }
    
    @RequestMapping(value = { "/userProfiles/userLogs" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryUserBehaviorDatas(UserLogPage page) throws Exception {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        String sql = userService.buildUserBehaviorScript(UserInfoUtil.getTenant().getCaCode(), page);
        logger.info("查询sql:" + sql);
        User user = UserInfoUtil.getUser();
        Map<String, Object> descMap = (Map<String, Object>)CommonUtil.transBean2Map(page);
        descMap.remove("pager");
        descMap.put("sql", sql);
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr(descMap), true);
        ElasticsearchHttpTemplate esHttpTemplate = new ElasticsearchHttpTemplate();
        EsResult esResult = esHttpTemplate.query(sql, true);
        int total = Integer.valueOf(esResult.getHits().getTotal() + "");
        if (total == 0) {
            resultMap.put("total", total);
            resultMap.put("rows", resultList);
            return resultMap;
        }
        List<EsHitsRecord> esHitsRecords = (List<EsHitsRecord>)esResult.getHits().getHits();
        if (esHitsRecords != null) {
            for (EsHitsRecord esHitsRecord : esHitsRecords) {
                Map<String, Object> map = (Map<String, Object>)esHitsRecord.get_source();
                map.put("_id", esHitsRecord.get_id());
                map.put("behavior_summary", buildBehaviorSummary(map));
                resultList.add(map);
            }
        }
        else {
            logger.info("no result!");
        }
        resultMap.put("total", total);
        resultMap.put("rows", resultList);
        return resultMap;
    }
    
    @RequestMapping(value = { "/userProfiles/userLogs/behaviorData" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public List<Map<String, String>> queryBehaviorDetail(@RequestBody Map<String, String> map) throws Exception {
        List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
        String behaviorType = map.get("behaviorType");
        String rowKey = map.get("rowKey");
        String attributeGroupType = "user_profile";
        String attributeGroupCode = "log_timeline_detail";
        String accountIdType = "account_id";
        String objectCode = getObjectCodeByBehaviorType(behaviorType);
        if (StringUtils.isBlank(objectCode)) {
            User user = UserInfoUtil.getUser();
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("behaviorType", behaviorType);
            descMap.put("rowKey", rowKey);
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr((Object)descMap), true);
            return resultList;
        }
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        List<MetaAttributeGroupRelationship> metaAttributeGroupRelationshipList = metaAttributeGroupRelationshipService.queryListByRelShip(tenantId, attributeGroupType, attributeGroupCode, accountIdType, objectCode);
        String tableName = "user_log";
        HbaseRepositoryService hbaseService = new HbaseRepositoryService();
        Map<String, String> row = (Map<String, String>)hbaseService.findByRowKey(tableName, rowKey);
        if (metaAttributeGroupRelationshipList != null && row != null) {
            String behaviorAttributeData = row.get("behavior_attribute_data");
            if (StringUtils.isNotBlank(behaviorAttributeData)) {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, String> bhMap = (Map<String, String>)objectMapper.readValue(behaviorAttributeData, (Class)Map.class);
                for (MetaAttributeGroupRelationship ship : metaAttributeGroupRelationshipList) {
                    Map<String, String> itemMap = new HashMap<String, String>();
                    String attrCode = ship.getAttributeCode();
                    String attrName = ship.getAttributeName();
                    String itemValue = bhMap.get(attrCode);
                    if (!StringUtils.isBlank(itemValue)) {
                        if ("null".equals(itemValue)) {
                            continue;
                        }
                        itemMap.put("name", attrName);
                        itemMap.put("value", itemValue);
                        resultList.add(itemMap);
                    }
                }
            }
        }
        User user2 = UserInfoUtil.getUser();
        Map<String, Object> descMap2 = new HashMap<String, Object>();
        descMap2.put("behaviorType", behaviorType);
        descMap2.put("rowKey", rowKey);
        auditLogService.addAuditLog(user2.getUserName(), user2.getLoginName(), null, AuditConstant.TargetType.userProfile.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr((Object)descMap2), true);
        return resultList;
    }
    
    private String buildBehaviorSummary(Map<String, Object> map) {
    	Map behaviorAttributeDataMap = (Map)map.get("behavior_attribute_data");
        String behaviorSummary = "";
        String behaviorType = (String)map.get("behavior_type");
        if ("fpd_market_trade".equals(behaviorType)) {
            behaviorSummary = "购买" + behaviorAttributeDataMap.get("buy_product") + behaviorAttributeDataMap.get("buy_number") + "个";
        }
        else if ("mac_log".equals(behaviorType)) {
            behaviorSummary = "访问店铺" + behaviorAttributeDataMap.get("project_place_name");
        }
        else if ("custom_event".equals(behaviorType)) {
            behaviorSummary = "触发事件" + behaviorAttributeDataMap.get("event_label");
        }
        else if ("exception".equals(behaviorType)) {
            behaviorSummary = "发生异常" + behaviorAttributeDataMap.get("error_short_hashcode");
        }
        else if ("fpd_moneybox_trade".equals(behaviorType)) {
            behaviorSummary = "购买" + behaviorAttributeDataMap.get("trade_product") + behaviorAttributeDataMap.get("trade_number") + "个";
        }
        else if ("push_log".equals(behaviorType)) {
            behaviorSummary = "投放活动" + behaviorAttributeDataMap.get("message_name");
        }
        else if ("push_touch_action_log".equals(behaviorType)) {
            behaviorSummary = "触达应用" + behaviorAttributeDataMap.get("app_name");
        }
        else if ("push_click_action_log".equals(behaviorType)) {
            behaviorSummary = "用户点击推送消息";
        }
        else if ("activity".equals(behaviorType)) {
            behaviorSummary = "访问页面" + behaviorAttributeDataMap.get("activity_name");
        }
        else if ("push_enterapp_action_log".equals(behaviorType)) {
            behaviorSummary = "进入应用" + behaviorAttributeDataMap.get("app_name");
        }
        behaviorSummary = behaviorSummary.replaceAll("null", "");
        return behaviorSummary;
    }
    
    private String getObjectCodeByBehaviorType(String behaviorType) {
        String objectType = "";
        if ("fpd_market_trade".equals(behaviorType)) {
            objectType = "fpd_market_trade";
        }
        else if ("mac_log".equals(behaviorType)) {
            objectType = "cs_accountid_mac_log";
        }
        else if ("custom_event".equals(behaviorType)) {
            objectType = "cross_screen_event_log";
        }
        else if ("exception".equals(behaviorType)) {
            objectType = "cross_screen_error_log";
        }
        else if ("fpd_moneybox_trade".equals(behaviorType)) {
            objectType = "fpd_moneybox_trade";
        }
        else if ("push_log".equals(behaviorType)) {
            objectType = "cs_accountid_push_log";
        }
        else if ("push_touch_action_log".equals(behaviorType)) {
            objectType = "cs_accountid_push_touch_log";
        }
        else if ("push_click_action_log".equals(behaviorType)) {
            objectType = "cs_accountid_push_click_log";
        }
        else if ("activity".equals(behaviorType)) {
            objectType = "cross_screen_activity_log";
        }
        else if ("push_enterapp_action_log".equals(behaviorType)) {
            objectType = "cs_accountid_push_ea_log";
        }
        return objectType;
    }
    
    private Definition buildQuickSearchConditions(Definition definition, UserProfilePage page, String tenantId) {
        logger.info("buildQuickSearchConditions : tenantId " + tenantId);
        String q = page.getQ();
        if (StringUtils.isBlank(q)) {
            return definition;
        }
        logger.info("buildQuickSearchConditions : q " + q);
        MetaAttributeGroup metaAttributeGroupCond = new MetaAttributeGroup();
        metaAttributeGroupCond.setTenantId(tenantId);
        metaAttributeGroupCond.setCode("quick_search");
        metaAttributeGroupCond.setType("user_profile");
        MetaAttributeGroup metaAttributeGroup = metaAttributeGroupService.queryCollectionByList(metaAttributeGroupCond);
        if (metaAttributeGroup == null) {
            return definition;
        }
        List<MetaAttributeGroupRelationship> metaAttrGpRels = (List<MetaAttributeGroupRelationship>)metaAttributeGroup.getMetaAttributeGroupRelationship();
        DefinitionBuilder db = new DefinitionBuilder();
        int conditionNum = 0;
        List<String> conditionArray = new ArrayList<String>(metaAttrGpRels.size());
        for (MetaAttributeGroupRelationship metaAttributeGroupRelationship : metaAttrGpRels) {
            ++conditionNum;
            String condition = "condition" + conditionNum;
            conditionArray.add(condition);
            db.setIndice(condition, db.buildIndice(metaAttributeGroup.getAccountIdTypeCode(), MetadataConstants.MetaCrowdModelConstants.META_STATIC_ATTRIBUTE_COLLECTION, metaAttributeGroupRelationship.getObjectCode()));
            db.setQuery(condition, db.buildMustQuery(db.buildTermQualifier(metaAttributeGroupRelationship.getAttributeCode(), db.buildLikeOperatorValue((Object)new String[] { q }))));
        }
        Filter orFilter = db.buildOrFilter(conditionArray.toArray());
        db.setFilter(orFilter);
        definition = db.toDefinition();
        return definition;
    }
    
    private Map capitalInfoMap() throws Exception {
        String str = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[772403,207134,65733,60947,19286,16274,12507]}";
        String str2 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[87349,128540,11062,10111,19086,846979,297087]}";
        String str3 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[55267,126495,11876,10170,12079,607297,96498]}";
        String str4 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[25272,138226,18816,16485,16674,508657,294901]}";
        String str5 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[103783,91699,11265,18668,13205,681807,165171]}";
        String str6 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[109143,54175,12276,14838,18907,1279355,88975]}";
        String str7 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[41800,138143,15769,12249,16612,1368367,300071]}";
        String str8 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[30419,130658,18629,13976,10862,971412,209844]}";
        String str9 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[88677,117567,12323,11780,12293,811302,125858]}";
        String str10 = "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[118344,63689,16827,13493,13079,652667,278998]}";
        String[] strArray = { "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[60947,65733,16274,12507,19286,772403,207134]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[87349,128540,11062,10111,19086,846979,297087]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[55267,126495,11876,10170,12079,607297,96498]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[25272,138226,18816,16485,16674,508657,294901]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[103783,91699,11265,18668,13205,681807,165171]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[109143,54175,12276,14838,18907,1279355,88975]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[41800,138143,15769,12249,16612,1368367,300071]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[30419,130658,18629,13976,10862,971412,209844]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[88677,117567,12323,11780,12293,811302,125858]}", "{\"displayNameList\":[\"活期\",\"定期\",\"理财\",\"基金\",\"保险\",\"房产\",\"汽车\"],\"valueList\":[118344,63689,16827,13493,13079,652667,278998]}" };
        return (Map)JsonUtils.jsonToObject(str, Map.class);
    }
    
    private Map creditInfoMap() throws Exception {
        String str = "{\"series\":[{\"name\":\"信用信息\",\"data\":[13000,9000,30000,25000,27000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}";
        String str2 = "{\"series\":[{\"name\":\"信用信息\",\"data\":[56000,48000,36000,9000,39000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}";
        String str3 = "{\"series\":[{\"name\":\"信用信息\",\"data\":[22000,59000,25000,27000,44000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}";
        String str4 = "{\"series\":[{\"name\":\"信用信息\",\"data\":[43000,19000,60000,35000,17000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}";
        String str5 = "{\"series\":[{\"name\":\"信用信息\",\"data\":[43000,39000,50000,32000,32000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}";
        String[] strArray = { "{\"series\":[{\"name\":\"信用信息\",\"data\":[13000,9000,30000,25000,27000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}", "{\"series\":[{\"name\":\"信用信息\",\"data\":[56000,48000,36000,9000,39000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}", "{\"series\":[{\"name\":\"信用信息\",\"data\":[22000,59000,25000,27000,44000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}", "{\"series\":[{\"name\":\"信用信息\",\"data\":[43000,19000,60000,35000,17000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}", "{\"series\":[{\"name\":\"信用信息\",\"data\":[43000,39000,50000,32000,32000],\"pointPlacement\":\"on\"}],\"categories\":[\"身份特质\",\"履约能力\",\"信用历史\",\"人脉关系\",\"行为偏好\"]}" };
        return (Map)JsonUtils.jsonToObject(str, Map.class);
    }
    
    @RequestMapping(value = { "/detail/products" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryDetail(@RequestParam(required = false) String userId) throws Exception {
        String rowKey = userId + ",";
        Param param = (Param)WebCacheWrapper.getValue("systemParamCache", UserProfileController.PARAM_KEY);
        ObjectMapper om = new ObjectMapper();
        Map<String, Object> paramMap = (Map<String, Object>)om.readValue(param.getParamValue(), (TypeReference)new TypeReference<Map<String, Object>>() {});
        String tableName = (String)paramMap.get(PARAM_TABLE_CODE_KEY);
        HbaseRepositoryService hbaseService = new HbaseRepositoryService();
        List<Map<String, String>> row = (List<Map<String, String>>)hbaseService.findByPrefixFilter(tableName, rowKey);
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("total", row.size());
        descMap.put("data", row);
        return descMap;
    }
    
    @RequestMapping(value = { "/query/{paramName}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryTheadParam(@PathVariable String paramName) throws Exception {
        Object o = WebCacheWrapper.getValue("systemParamCache", paramName);
        Map<String, Object> descMap = new HashMap<String, Object>();
        if (o != null) {
            descMap.put(paramName, o);
        }
        return descMap;
    }
    
    static {
        UserProfileController.PARAM_KEY = "dmp.tmp.userProfile.thead";
        UserProfileController.PARAM_TABLE_CODE_KEY = "table_code";
    }
}
