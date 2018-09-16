package com.dmp.core.controller.tag;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enterprise.common.cache.WebCacheWrapper;
import com.enterprise.common.web.CrowdIconUtil;
import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

import lavapm.enterprise.dmp.core.entity.tag.Tag;
import lavapm.enterprise.dmp.core.page.tag.TagPage;
import lavapm.enterprise.dmp.core.service.tag.AsynchronousService;
import lavapm.enterprise.dmp.core.service.tag.TagService;
import lavapm.enterprise.dmp.module.tag.parser.DefinitionParser;
import td.enterprise.console.core.entity.monitor.CalcObjectLog;
import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.console.core.service.monitor.AzkabanRestService;
import td.enterprise.console.core.service.monitor.CalcObjectLogService;
import td.enterprise.dmp.base.constant.ExceptionCodeEnum;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.azkaban.AzkabanBizObjectTypeEnum;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.meta.MetadataConstants;
import td.enterprise.dmp.common.util.CommonUtil;
import td.enterprise.dmp.common.util.JsonUtils;
import td.enterprise.dmp.common.util.MapUtils;
import td.enterprise.dmp.lang.Definition;
import td.enterprise.dmp.meta.entity.logic.MetaObject;
import td.enterprise.dmp.meta.service.LogicModelService;
import td.enterprise.dmp.meta.service.logic.BizAttributeValueMetaService;

@Controller
@RequestMapping({ "/tag" })
public class TagController extends BaseController {
	public static final Logger logger = Logger.getLogger(TagController.class);
	@Autowired
	private TagService tagService;
	@Autowired
	private BizAttributeValueMetaService bizAttributeValueMetaService;
	@Autowired
	private CalcObjectLogService calcObjectLogService;
	@Autowired
	private AuditLogService auditLogService;
	@Autowired
	private LogicModelService logicModelService;
	@Autowired
	private AsynchronousService synchronousService;
	private static final String ATTRIBUTE_ENUM_VALUE_SEPARATOR = "#split#";
	private static final Map<String, String> RELATION_MAP = new HashMap<>();

	/**
	 * 标签列表查询
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = { "/tags" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> query(TagPage page) throws Exception {
		User user = UserInfoUtil.getUser();
		String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
		if ((StringUtils.isNotBlank(privacy)) && (privacy.equals("1"))) {
			page.setCreateBy(user.getLoginName());
		}
		page.setSort("t.create_time");
		page.getPager().setOrderDirection(false);
		page.setTenantId(UserInfoUtil.getTenant().getCaCode());
		List<Tag> rows = this.tagService.queryByListWithEffective(page);
		Map<String, Object> descMap = CommonUtil.transBean2Map(page);
		descMap.remove("pager");
		auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null,AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.query.toString(),JsonUtils.objectToJsonStr(descMap), true);
		return getGridData(page.getPager().getRowCount(), rows);
	}

	/**
	 * 新建标签
	 * 
	 * @param tag
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = { "/tags" }, method = {org.springframework.web.bind.annotation.RequestMethod.POST }, consumes = { "application/json" })
	@ResponseBody
	public Tag create(@RequestBody Tag tag) throws Exception {
		logger.info("添加标签入参tag：" + JsonUtils.objectToJsonStr(tag));
		User user = UserInfoUtil.getUser();
		boolean isSuccess = true;
		String errorMsg = "";
		tag.setCreator(user.getUserName());
		tag.setCreateBy(user.getLoginName());
		tag.setTenantId(UserInfoUtil.getTenant().getCaCode());

		logger.info("=============标签保存校验标签名重复性==============");
		boolean isRepead = checkTagName(tag);
		if (isRepead) {
			throw new BusinessException("标签名称已存在，请修改", ExceptionCodeEnum.SUBMIT_CHECK_NAME.errorCode());
		}
		logger.info("=============标签保存==============");
		try {
			if ((tag.getDescription() != null) && (StringUtils.isNotBlank(tag.getDescription()))) {
				String descript = rebuildDescript(tag.getDescription());
				logger.info("tag Description:" + tag.getDescription() + "descript:" + descript);
				tag.setDescription(descript);
			}
			if (tag.getType().equals("TC")) {
				tag = tagService.saveBuinessTag(tag);
			} else {
				tag = tagService.saveTag(tag);
			}
			//解析页面标签查询条件，拼接sql
			logger.info("tag ExpressionDefine:" + tag.getExpressionDefine());
			String querySql = tagService.filterLabel(tag.getExpressionDefine(),tag.getTenantId());
			String showColumns = tagService.findColumn(tag.getExpressionDefine(),tag.getTenantId());
			//异步方法调用计算接口入参：TenantId crowd_id database table where条件
			tag.setQuerySql(querySql);
			tag.setShowColumns(showColumns);
			logger.info("create 异步方法调用spark接口 querySql:"+querySql+" showColumns:"+showColumns);
			synchronousService.asynchronousCalculate(tag);
		} catch (Exception e) {
			logger.error("执行异常", e);
			isSuccess = false;
		} finally {
			Map<String, Object> descMap = new HashMap<String, Object>();
			descMap.put("name", tag.getName());
			descMap.put("definition", tag.getDefinition());
			descMap.put("script", tag.getScript());
			descMap.put("code", tag.getCode());
			descMap.put("crowdId", tag.getCrowdId());
			descMap.put("touchPointType", tag.getTouchPointType());
			if (!isSuccess) {
				descMap.put("errorMsg", errorMsg);
			}
			auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tag.getId(),AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.create.toString(),JsonUtils.objectToJsonStr(descMap), isSuccess);
		}
		return tag;
	}
	
	/**
	 * 更改标签
	 * @param tag
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = { "/tags/{tagId}" }, method = {	org.springframework.web.bind.annotation.RequestMethod.PUT }, consumes = { "application/json" })
	@ResponseBody
	public Tag update(@RequestBody Tag tag) throws Exception {
		User user = UserInfoUtil.getUser();
		logger.info("=============标签更新校验标签名重复性==============");
		boolean isRepead = checkTagName(tag);
		if (isRepead) {
			throw new BusinessException("标签名称已存在，请修改", ExceptionCodeEnum.SUBMIT_CHECK_NAME.errorCode());
		}
		boolean isSameAccountType = checkAccountType(tag);
		if (isSameAccountType) {
			throw new BusinessException("标签人群类型不能变更，请修改");
		}
		tag.setUpdateBy(user.getLoginName());
		logger.info("=============更新标签==============");
		boolean isSuccess = true;
		String errorMsg = "";
		try {
			if((tag.getDescription() != null) && (StringUtils.isNotBlank(tag.getDescription()))) {
				String descript = rebuildDescript(tag.getDescription());
				tag.setDescription(descript);
			}

			if(tag.getType().equals("TC")) {
				tag = tagService.updateBuinessTag(tag);
			} else {
				tag = tagService.updateTag(tag);
			}
			String querySql = tagService.filterLabel(tag.getExpressionDefine(),tag.getTenantId());
			String showColumns = tagService.findColumn(tag.getExpressionDefine(),tag.getTenantId());
			tag.setQuerySql(querySql);
			tag.setShowColumns(showColumns);
			logger.info("update 异步方法调用spark接口 querySql:"+querySql+" showColumns:"+showColumns);
			synchronousService.asynchronousCalculate(tag);
		} catch (Exception e) {
			logger.error("执行异常", e);
			isSuccess = false;
			StringWriter sw = new StringWriter();
			PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			errorMsg = sw.toString();
			throw new BusinessException(e);
		} finally {
			Map<String, Object> descMap = new HashMap<String, Object>();
			descMap.put("name", tag.getName());
			descMap.put("definition", tag.getDefinition());
			descMap.put("script", tag.getScript());
			descMap.put("code", tag.getCode());
			descMap.put("crowdId", tag.getCrowdId());
			descMap.put("touchPointType", tag.getTouchPointType());
			if (!isSuccess) {
				descMap.put("errorMsg", errorMsg);
			}
			auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tag.getId().toString(),AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.update.toString(),JsonUtils.objectToJsonStr(descMap), isSuccess);
		}
		return tag;
	}


	@RequestMapping(value = { "/tags/tagWithTagCategory" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> queryTagListWithTagCategoryId(TagPage page) throws Exception {
		User user = UserInfoUtil.getUser();
		String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
		if ((StringUtils.isNotBlank(privacy)) && (privacy.equals("1"))) {
			page.setCreateBy(user.getLoginName());
		}
		page.setSort("create_time");
		page.getPager().setOrderDirection(false);
		page.setTenantId(UserInfoUtil.getTenant().getCaCode());
		List<Tag> rows = tagService.queryTagListWithTagCategoryId(page);
		List<Object> results = CrowdIconUtil.converCrowdIcon(rows, "TAG", UserInfoUtil.getTenant().getCaCode());

		Map<String, Object> descMap = CommonUtil.transBean2Map(page);
		descMap.remove("pager");
		auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null,AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.query.toString(),JsonUtils.objectToJsonStr(descMap), true);
		return getGridData(page.getPager().getRowCount(), results);
	}
	
	public String rebuildDescript(String descript) throws Exception {
		descript = transDate(descript);
		List<Map<String, Object>> attributes = getAttributes();
		if (null != attributes) {
			for (Map<String, Object> map : attributes) {
				Map<String, Object> metaAttributeMap = (HashMap) map.get("metaAttribute");
				String key = "";
				String value = "";
				for (Map.Entry<String, Object> entry : metaAttributeMap.entrySet()) {
					if ("attributeCode".equals(entry.getKey())) {
						key = (String) entry.getValue();
					}
					if ("attributeName".equals(entry.getKey())) {
						value = (String) entry.getValue();
					}
				}
				descript = descript.replace("{" + key + "}", value);
			}
		}
		for (Map.Entry<String, String> entry : RELATION_MAP.entrySet()) {
			descript = descript.replace("{" + (String) entry.getKey() + "}", (CharSequence) entry.getValue());
		}
		return descript;
	}

	public String transDate(String description) {
		while ((description.contains("{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),"))
				|| (description.contains("{update_time}{lte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),1)<br>"))) {
			String day = "";
			for (int i = 1; i <= 10; i++) {
				String dayTmpm = description.substring(
						description.indexOf("{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),")
								+ "{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),".length()
								+ (i - 1),
						description.indexOf("{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),")
								+ "{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),".length()
								+ i);
				if (dayTmpm.equals(")")) {
					break;
				}
				day = day + dayTmpm;
			}
			description = description.replace("{update_time}{gte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd')," + day + ')',"近{day}日".replace("{day}", day)).replace("{update_time}{lte}date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'),1)<br>", "");
		}
		return description;
	}

	public List<Map<String, Object>> getAttributes() throws Exception {	HashMap<String, Object> uiModel = (HashMap) WebCacheWrapper.getValue("metadataUI",UserInfoUtil.getTenant().getCaCode());

		Map<String, Object> cloneUiModel = MapUtils.cloneMap(uiModel);

		Map<String, Object> metaCrowdModel = (Map) cloneUiModel.get(MetadataConstants.MetaUiConstants.CROWD_MODEL);
		Map<String, Object> metaAttributeGroupMap = (Map) metaCrowdModel.get(MetadataConstants.MetaUiConstants.META_ATTRIBUTE_GROUP_MAP);

		Map<String, Object> uiMetaAttributeGroupMap = new HashMap<String, Object>();
		List<Map<String, Object>> metaAttributeGroupRelationships = null;
		for (Map.Entry<String, Object> entry : metaAttributeGroupMap.entrySet()) {
			String key = (String) entry.getKey();
			if (key.contains("tag_visible")) {
				Map<String, Object> metaAttributeGroupMapValue = (Map) entry.getValue();
				uiMetaAttributeGroupMap.put(entry.getKey(), entry.getValue());
				metaAttributeGroupRelationships = (List) metaAttributeGroupMapValue.get("metaAttributeGroupRelationships");
			}
		}
		return metaAttributeGroupRelationships;
	}


	@RequestMapping(value = { "/tags/restart" }, method = {org.springframework.web.bind.annotation.RequestMethod.POST }, consumes = { "application/json" })
	@ResponseBody
	public Tag restartCompute(@RequestBody Tag tag) throws Exception {
		User user = UserInfoUtil.getUser();

		logger.info("=============标签更新校验标签名重复性==============");
		boolean isRepead = checkTagName(tag);
		if (isRepead) {
			throw new BusinessException("标签名称已存在，请修改", ExceptionCodeEnum.SUBMIT_CHECK_NAME.errorCode());
		}
		boolean isSameAccountType = checkAccountType(tag);
		if (isSameAccountType) {
			throw new BusinessException("标签人群类型不能变更，请修改");
		}
		Tag oTag = tagService.selectByPrimaryKey(tag.getId());
		if (oTag.getCalcStatus().intValue() == 1) {
			throw new BusinessException("标签正在计算中，不能发起重新计算");
		}
		boolean isSuccess = true;
		String errorMsg = "";
		if (tag.getType().equals("TC")) {
			tag = tagService.saveBuinessTag(tag);
		}
		try {
			if((tag.getDescription() != null) && (StringUtils.isNotBlank(tag.getDescription()))) {
				String descript = rebuildDescript(tag.getDescription());
				tag.setDescription(descript);
			}

			if(tag.getType().equals("TC")) {
				tag = tagService.updateBuinessTag(tag);
			} else {
				tag = tagService.updateTag(tag);
			}
			String querySql = tagService.filterLabel(tag.getExpressionDefine(),tag.getTenantId());
			String showColumns = tagService.findColumn(tag.getExpressionDefine(),tag.getTenantId());
			tag.setQuerySql(querySql);
			tag.setShowColumns(showColumns);
			logger.info("restart 重新计算异步方法调用spark接口 querySql:"+querySql+" showColumns:"+showColumns);
			synchronousService.asynchronousCalculate(tag);
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
			descMap.put("name", tag.getName());
			descMap.put("definition", tag.getDefinition());
			descMap.put("script", tag.getScript());
			descMap.put("code", tag.getCode());
			descMap.put("crowdId", tag.getCrowdId());
			descMap.put("touchPointType", tag.getTouchPointType());
			if (!isSuccess) {
				descMap.put("errorMsg", errorMsg);
			}
			auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tag.getId().toString(),
					AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.restart.toString(),
					JsonUtils.objectToJsonStr(descMap), isSuccess);
		}
		return tag;
	}

	@RequestMapping(value = { "/tags/{tagId}" }, method = {org.springframework.web.bind.annotation.RequestMethod.DELETE })
	@ResponseBody
	public Map<Object, Object> delete(@PathVariable String tagId) throws Exception {
		User user = UserInfoUtil.getUser();
		boolean isSuccess = true;
		String errorMsg = "";
		Tag tag = tagService.selectByPrimaryKey(tagId);
		try {
			tag = tagService.deleteTagWithRule(Integer.valueOf(tagId), user.getLoginName(),UserInfoUtil.getTenant().getCaCode());
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
			descMap.put("name", tag.getName());
			descMap.put("definition", tag.getDefinition());
			descMap.put("script", tag.getScript());
			descMap.put("code", tag.getCode());
			descMap.put("crowdId", tag.getCrowdId());
			descMap.put("touchPointType", tag.getTouchPointType());
			if (!isSuccess) {
				descMap.put("errorMsg", errorMsg);
			}
			this.auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tag.getId().toString(),
					AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.delete.toString(),
					JsonUtils.objectToJsonStr(descMap), isSuccess);
		}
		return new HashMap<Object, Object>();
	}

	@RequestMapping(value = { "/tags/{tagId}" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Tag find(@PathVariable String tagId) throws Exception {
		Tag tag = tagService.findTag(Integer.valueOf(tagId));
		User user = UserInfoUtil.getUser();
		Map<String, Object> descMap = new HashMap<String, Object>();
		descMap.put("name", tag.getName());
		descMap.put("definition", tag.getDefinition());
		descMap.put("script", tag.getScript());
		descMap.put("code", tag.getCode());
		descMap.put("crowdId", tag.getCrowdId());
		descMap.put("touchPointType", tag.getTouchPointType());
		auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tag.getId().toString(),
				AuditConstant.TargetType.tag.toString(), AuditConstant.OperationType.find.toString(),
				JsonUtils.objectToJsonStr(descMap), true);

		return tag;
	}

	@RequestMapping(value = { "/tags/effectTag" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> queryWithEffectTag(TagPage page) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Tag> rows = tagService.queryByStatus(Integer.valueOf(2));
		resultMap.put("rows", rows);
		return resultMap;
	}

	@RequestMapping(value = { "/metadata/{groupType}" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> queryTagMetadata(@PathVariable String groupType) throws Exception {
		String tenantId = UserInfoUtil.getTenant().getCaCode();

		HashMap<String, Object> uiModel = (HashMap) WebCacheWrapper.getValue("metadataUI",UserInfoUtil.getTenant().getCaCode());

		Map<String, Object> cloneUiModel = MapUtils.cloneMap(uiModel);
		Map<String, Object> metaCrowdModel = (Map) cloneUiModel.get(MetadataConstants.MetaUiConstants.CROWD_MODEL);
		Map<String, Object> metaAttributeGroupMap = (Map) metaCrowdModel.get(MetadataConstants.MetaUiConstants.META_ATTRIBUTE_GROUP_MAP);
		Map<String, Object> uiMetaAttributeGroupMap = new HashMap<String, Object>();

		Set<String> metaObjectCodeSet = new HashSet<String>();
		for (Map.Entry<String, Object> entry : metaAttributeGroupMap.entrySet()) {
			String key = (String) entry.getKey();
			if (key.contains(groupType)) {
				Map<String, Object> metaAttributeGroupMapValue = (Map) entry.getValue();
				uiMetaAttributeGroupMap.put(entry.getKey(), entry.getValue());

				List<Map<String, Object>> metaAttributeGroupRelationships = (List) metaAttributeGroupMapValue.get("metaAttributeGroupRelationships");
				if (groupType.equalsIgnoreCase("crowd_portrait")) {
					Map<String, String> objectCodeMap = new HashMap<String, String>();
					for (Map<String, Object> map : metaAttributeGroupRelationships) {
						objectCodeMap.put(map.get("objectCode").toString(), null);
					}
					for (String objectCode : objectCodeMap.keySet()) {
						MetaObject metaObject = this.logicModelService.queryMetaObjectByObjectCode(objectCode,tenantId);
						String accountIdAttributeCode = metaObject.getAccountIdAttributeCode();
						objectCodeMap.put(objectCode, accountIdAttributeCode);
					}
					List<Map<String, Object>> removeMetaAttrList = new ArrayList<Map<String, Object>>();
					for (Map<String, Object> map : metaAttributeGroupRelationships) {
						String objectCode = map.get("objectCode").toString();
						String attributeCode = map.get("attributeCode").toString();
						if (attributeCode.equals(objectCodeMap.get(objectCode))) {
							removeMetaAttrList.add(map);
						}
					}
					for (Map<String, Object> map : removeMetaAttrList) {
						metaAttributeGroupRelationships.remove(map);
					}
				}
				for (Map<String, Object> metaAttributeGroupRelationshipMap : metaAttributeGroupRelationships) {
					metaObjectCodeSet.add(metaAttributeGroupRelationshipMap.get("objectCode").toString());
				}
			}
		}
		Map<String, Object> metaAccountUiMap = new HashMap<String, Object>();

		Map<String, Object> metaAccountMap = (Map) metaCrowdModel.get(MetadataConstants.MetaUiConstants.META_ACCOUNT_MAP);

		String metaAccountMapGroupType = "";
		for (Map.Entry<String, Object> metaAccountEntry : metaAccountMap.entrySet()) {
			String objectCode = (String) metaAccountEntry.getKey();
			Map<String, Object> metaAccountObject = (Map) metaAccountEntry.getValue();
			if (metaAccountObject.get("groupType") != null) {
				metaAccountMapGroupType = metaAccountObject.get("groupType").toString();
				if (metaAccountMapGroupType.contains(groupType)) {
					Map<String, Object> cloneMetaAccountObject = MapUtils.cloneMap(metaAccountObject);
					if (groupType.equalsIgnoreCase("tag_visible")) {
						List<Map<String, Object>> metaBehaviors = (List) cloneMetaAccountObject.get(MetadataConstants.MetaUiConstants.META_BEHAVIORS);
						if ((metaBehaviors != null) && (metaBehaviors.size() > 0)) {
							Iterator<Map<String, Object>> it = metaBehaviors.iterator();
							while (it.hasNext()) {
								Map<String, Object> metaBehaviorMap = (Map) it.next();
								if (!metaObjectCodeSet.contains(metaBehaviorMap.get("objectCode").toString())) {
									it.remove();
								}
							}
						}
					}
					metaAccountUiMap.put(objectCode, cloneMetaAccountObject);
				}
			}
		}
		metaCrowdModel.put(MetadataConstants.MetaUiConstants.META_ACCOUNT_MAP, metaAccountUiMap);
		metaCrowdModel.put(MetadataConstants.MetaUiConstants.META_ATTRIBUTE_GROUP_MAP, uiMetaAttributeGroupMap);

		return cloneUiModel;
	}

	@RequestMapping(value = { "/metadata/enum/{metaObjectCode}/{attributeCode}/{accountIdType}" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> queryEnums(@PathVariable String metaObjectCode, @PathVariable String attributeCode,@PathVariable String accountIdType, String q, String key) throws Exception {
		logger.debug("q : " + q);
		logger.debug("key : " + key);
		List<Map<String, String>> valueList = new ArrayList<Map<String, String>>();
		Set<Map<String, String>> valueSet = new HashSet<Map<String, String>>();
		if (StringUtils.isNotBlank(key)) {
			valueList = this.bizAttributeValueMetaService.queryBizAttribuetByKeys(key, accountIdType, metaObjectCode,attributeCode, UserInfoUtil.getTenant().getCaCode());
		}
		String attributeKey = metaObjectCode + ATTRIBUTE_ENUM_VALUE_SEPARATOR + attributeCode + ATTRIBUTE_ENUM_VALUE_SEPARATOR + accountIdType + ATTRIBUTE_ENUM_VALUE_SEPARATOR + UserInfoUtil.getTenant().getCaCode();

		Map<String, Object> resultMap = tagService.queryEnums(attributeKey, q);

		valueList.addAll((Collection) resultMap.get("rows"));

		valueSet.addAll(valueList);

		resultMap.put("rows", valueSet);
		resultMap.put("total", Integer.valueOf(valueSet.size()));

		return resultMap;
	}

	@RequestMapping(value = { "/testjson" }, method = {org.springframework.web.bind.annotation.RequestMethod.POST }, consumes = { "application/json" })
	@ResponseBody
	public Map<String, Object> testTagJson(@RequestBody Definition definition) throws Exception {
		logger.debug("receive definition : " + JsonUtils.objectToJsonStr(definition));
		Map<String, Object> returnMap = new HashMap<String, Object>();

		DefinitionParser definitionParser = new DefinitionParser(definition, UserInfoUtil.getTenant().getCaCode());

		returnMap.put("isValid", Boolean.valueOf(definitionParser.isValid()));
		returnMap.put("buildTagScript", definitionParser.buildTagScript());
		returnMap.put("buildTagRule", definitionParser.buildTagRuleWithoutPersistence());

		return returnMap;
	}

	@RequestMapping(value = { "/tags/withoutTagCategory" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public List<Tag> queryWithoutTagCategory() throws Exception {
		String tenantId = UserInfoUtil.getTenant().getCaCode();
		return tagService.queryWithoutTagCategoryByList(tenantId,new Integer[] { Integer.valueOf(1), Integer.valueOf(2) });
	}

	@RequestMapping(value = {"/tags/bizObjectTableName/{bizObjectTableName}/bizObjectId/{bizObjectId}/objectCode/{objectCode}/clacObjectLog" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public CalcObjectLog getCalcObjectLogId(@PathVariable String bizObjectTableName, @PathVariable Integer bizObjectId,@PathVariable String objectCode) throws Exception {
		String tenantId = UserInfoUtil.getTenant().getCaCode();
		CalcObjectLog calcObjectLog = this.calcObjectLogService.queryByBizObject(bizObjectTableName, bizObjectId,objectCode, tenantId);

		User user = UserInfoUtil.getUser();
		Map<String, Object> descMap = new HashMap<String, Object>();
		descMap.put("bizObjectTableName", bizObjectTableName);
		descMap.put("bizObjectId", bizObjectId);
		descMap.put("objectCode", objectCode);
		descMap.put("tenantId", tenantId);

		auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null,
				AuditConstant.TargetType.calcObjectLog.toString(), AuditConstant.OperationType.find.toString(),
				JsonUtils.objectToJsonStr(descMap), true);
		if (calcObjectLog == null) {
			throw new BusinessException("暂无计算对象日志");
		}
		return calcObjectLog;
	}

	private boolean checkTagName(Tag tag) {
		boolean isRepead = false;
		List<Tag> tagList = this.tagService.queryWithNameAndTenantIdAndStatuss(tag.getName(), tag.getTenantId(),new Integer[] { Integer.valueOf(2), Integer.valueOf(1) });
		if (tag.getId() == null) {
			if ((tagList != null) && (tagList.size() > 0)) {
				isRepead = true;
			}
		} else {
			for (Tag rTag : tagList) {
				if (0 != tag.getId().compareTo(rTag.getId())) {
					isRepead = true;
				}
			}
		}
		return isRepead;
	}

	private boolean checkAccountType(Tag tag) throws Exception {
		boolean isSameAccountType = false;

		Tag tempTag = tagService.selectByPrimaryKey(tag.getId());
		if (!tempTag.getTouchPointType().equals(tag.getTouchPointType())) {
			isSameAccountType = true;
		}
		return isSameAccountType;
	}

	@RequestMapping(value = { "tags/fastQuery" }, method = {org.springframework.web.bind.annotation.RequestMethod.GET })
	@ResponseBody
	public Map<String, Object> fastQueryTag(TagPage page) throws Exception {
		User user = UserInfoUtil.getUser();
	
		String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
		if ((StringUtils.isNotBlank(privacy)) && (privacy.equals("1"))) {
			page.setCreateBy(user.getLoginName());
		}
		if (StringUtils.isNotBlank(page.getTagIds())) {
			String[] tagIdList = page.getTagIds().split(",");
			page.setTagIdList(tagIdList);
		}
		page.setSort("create_time");
		page.getPager().setOrderDirection(false);
		page.setTenantId(UserInfoUtil.getTenant().getCaCode());
		List<Tag> rows = tagService.fastQueryByList(page);
	
		return getGridData(tagService.queryByCount(page), rows);
	}

}
