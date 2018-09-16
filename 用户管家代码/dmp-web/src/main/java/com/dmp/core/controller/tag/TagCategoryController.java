package com.dmp.core.controller.tag;

import java.io.PrintWriter;
import java.io.StringWriter;
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
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.console.core.service.admin.AuditLogService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.constant.AuditConstant;
import td.enterprise.dmp.common.exception.BusinessException;
import td.enterprise.dmp.common.util.JsonUtils;
import lavapm.enterprise.dmp.core.entity.tag.Tag;
import lavapm.enterprise.dmp.core.entity.tag.TagCategory;
import lavapm.enterprise.dmp.core.page.tag.SystemTagPage;
import lavapm.enterprise.dmp.core.page.tag.TagCategoryPage;
import lavapm.enterprise.dmp.core.page.tag.TagPage;
import lavapm.enterprise.dmp.core.service.tag.SystemTagService;
import lavapm.enterprise.dmp.core.service.tag.TagCategoryService;
import lavapm.enterprise.dmp.core.service.tag.TagService;

import com.enterprise.common.web.CrowdIconUtil;
import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/tag" })
public class TagCategoryController extends BaseController
{
    public static final Logger  logger = Logger.getLogger(TagCategoryController.class);
    @Autowired
    private TagCategoryService tagCategoryService;
    @Autowired
    private TagService tagService;
    @Autowired
    private SystemTagService systemTagService;
    @Autowired
    private AuditLogService auditLogService;
    
    /*
     * 添加基础标签
     */
    @RequestMapping(value = { "/tagCategories" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(TagCategoryPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<TagCategory> rows = tagCategoryService.queryByList(page);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/tagCategories" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public TagCategory create(@RequestBody TagCategory tagCategory) throws Exception {
        User user = UserInfoUtil.getUser();
        tagCategory.setCreateBy(user.getLoginName());
        tagCategory.setCreator(user.getUserName());
        tagCategory.setTenantId(UserInfoUtil.getTenant().getCaCode());
        boolean isRepead = checkTagCategoryName(tagCategory);
        if (isRepead) {
            TagCategory parentTagCategory = tagCategoryService.selectByPrimaryKey(tagCategory.getParentId());
            throw new BusinessException("'" + parentTagCategory.getName() + "'下已经存在子分类'" + tagCategory.getName() + "'，请修改");
        }
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            tagCategoryService.insert(tagCategory);
        }
        catch (Exception e) {
            TagCategoryController.logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw new BusinessException(e);
        }
        finally {
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", tagCategory.getName());
            descMap.put("description", tagCategory.getDescription());
            descMap.put("parentId", tagCategory.getParentId());
            descMap.put("code", tagCategory.getCode());
            descMap.put("tenantId", tagCategory.getTenantId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tagCategory.getId(), AuditConstant.TargetType.tagCategory.toString(), AuditConstant.OperationType.create.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return tagCategory;
    }
    
    @RequestMapping(value = { "/tagCategories/{tagCategoryId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public TagCategory find(@PathVariable String tagCategoryId) throws Exception {
        return tagCategoryService.selectByPrimaryKey(tagCategoryId);
    }
    
    @RequestMapping(value = { "/tagCategories/updateTagCategories" }, method = { RequestMethod.POST })
    @ResponseBody
    public TagCategory update(TagCategory tagCategory) throws Exception {
        TagCategory tagCategoryOld = tagCategoryService.selectByPrimaryKey(tagCategory.getId());
        tagCategory.setTenantId(tagCategoryOld.getTenantId());
        boolean isRepead = checkTagCategoryName(tagCategory);
        if (isRepead) {
            TagCategory parentTagCategory = tagCategoryService.selectByPrimaryKey(tagCategory.getParentId());
            throw new BusinessException("'" + parentTagCategory.getName() + "'下已经存在子分类'" + tagCategory.getName() + "'，请修改");
        }
        User user = UserInfoUtil.getUser();
        boolean isSuccess = true;
        String errorMsg = "";
        try {
            tagCategory.setUpdateBy(user.getLoginName());
            tagCategoryService.updateByPrimaryKeySelective(tagCategory);
        }
        catch (Exception e) {
            TagCategoryController.logger.error("执行异常", e);
            isSuccess = false;
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            errorMsg = sw.toString();
            throw e;
        }
        finally {
            Map<String, Object> descMap = new HashMap<String, Object>();
            descMap.put("name", tagCategory.getName());
            descMap.put("description", tagCategory.getDescription());
            descMap.put("parentId", tagCategory.getParentId());
            descMap.put("code", tagCategory.getCode());
            descMap.put("tenantId", tagCategory.getTenantId());
            if (!isSuccess) {
                descMap.put("errorMsg", errorMsg);
            }
            auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tagCategory.getId(), AuditConstant.TargetType.tagCategory.toString(), AuditConstant.OperationType.update.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        }
        return tagCategory;
    }
    
    @RequestMapping(value = { "/tagCategories/delTagCategories/{tagCategoryId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> delete(@PathVariable Integer tagCategoryId) throws Exception {
        User user = UserInfoUtil.getUser();
        String msg = tagCategoryService.deleteTagCategoryWithRel(tagCategoryId, UserInfoUtil.getTenant().getCaCode(), user.getUserName(), user.getLoginName());
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("tagCategoryId", tagCategoryId);
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tagCategoryId, AuditConstant.TargetType.tagCategory.toString(), AuditConstant.OperationType.delete.toString(), JsonUtils.objectToJsonStr(descMap), true);
        if (!StringUtils.isEmpty(msg)) {
            return getFailureMessage(msg);
        }
        return getSuccessMessage(msg);
    }
    
    @RequestMapping(value = { "/tagCategories/tree" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<TagCategory> getTagCategoryTree() throws Exception {
        User user = UserInfoUtil.getUser();
        TagCategoryPage page = new TagCategoryPage();
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.getPager().setPageEnabled(false);
        List<TagCategory> tagCategoryList = tagCategoryService.getTagCategoryTree(page, user.getLoginName());
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("tenantId", UserInfoUtil.getTenant().getCaCode());
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), null, AuditConstant.TargetType.tagCategory.toString(), AuditConstant.OperationType.query.toString(), JsonUtils.objectToJsonStr(descMap), true);
        return tagCategoryList;
    }
    
    @RequestMapping(value = { "/tagCategories/firstLevelTagCategories/tree" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<TagCategory> queryFirstLevelTagCategories() throws Exception {
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        return tagCategoryService.queryFirstLevelTagCategories(tenantId, 1);
    }
    
    @RequestMapping(value = { "/tagCategories/{tagCategoryId}/tags" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryTags(@PathVariable Integer tagCategoryId, TagPage page) throws Exception {
        User user = UserInfoUtil.getUser();
        TagCategory tagCategory = tagCategoryService.selectByPrimaryKey(tagCategoryId);
        page.setSort("t.create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        SystemTagPage systemTagPage = new SystemTagPage();
//        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            page.setEqualsCreateBy(user.getLoginName());
            page.setCreateBy(user.getLoginName());
            systemTagPage.setCreateBy(user.getLoginName());
//        }
        Object rows = new ArrayList();
        if (tagCategory != null && tagCategory.getParentId() == -1) {
            rows = tagService.queryTagUnionAllSystemTagByList(page);
            rows = CrowdIconUtil.converCrowdIcon(rows, "TAG", UserInfoUtil.getTenant().getCaCode());
        }
        else if (tagCategory != null && "systemtag".equals(tagCategory.getCode())) {
            systemTagPage.setPage(page.getPage());
            systemTagPage.setRows(page.getRows());
            systemTagPage.setName(page.getName());
            systemTagPage.setTouchPointType(page.getTouchPointType());
            systemTagPage.setTenantId(UserInfoUtil.getTenant().getCaCode());
            systemTagPage.setStatus(page.getStatus());
            systemTagPage.setCreator(page.getCreator());
            systemTagPage.setQ(page.getQ());
            rows = this.systemTagService.queryWithSearchByList(systemTagPage);
            rows = CrowdIconUtil.converCrowdIcon(rows, "SYSTEM_TAG", UserInfoUtil.getTenant().getCaCode());
            page.getPager().setRowCount(systemTagPage.getPager().getRowCount());
        }
        else {
            rows = tagService.queryListByCategory(page);
            rows = CrowdIconUtil.converCrowdIcon(rows, "TAG", UserInfoUtil.getTenant().getCaCode());
        }
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/tagCategories/{tagCategoryId}/tagCategoryWithoutTags" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Tag> queryWithoutTags(@PathVariable Integer tagCategoryId) throws Exception {
        TagCategory tagCategory = tagCategoryService.selectByPrimaryKey(tagCategoryId);
        String tenantId = tagCategory.getTenantId();
        return tagService.queryTagCategoryWithouTags(tagCategoryId, tenantId);
    }
    
    @RequestMapping(value = { "/tagCategories/addTagWithTagCategory" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public void addTagWithTagCategory(@RequestBody Map<String, Object> map) throws Exception {
    	Integer tagCategoryId = (Integer)map.get("tagCategoryId");
        if (tagCategoryId == null) {
            throw new BusinessException("标签分类为空，不能添加标签");
        }
        Object tags = map.get("tags");
        ObjectMapper objectMapper = new ObjectMapper();
        String tagStr = objectMapper.writeValueAsString(tags);
        List<Map<String, Object>> list = objectMapper.readValue(tagStr, new TypeReference<List<Map<String, Object>>>(){});
        tagCategoryService.addTagWithTagCategory(tagCategoryId, list, UserInfoUtil.getTenant().getCaCode());
    }
    
    @RequestMapping(value = { "/tagCategories/removeTagWithTagCategory" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public String removeTagWithTagCategory(@RequestBody Map<String, Object> map) throws Exception {
        return tagCategoryService.removeTagWithTagCategory(map);
    }
    
    @RequestMapping(value = { "/tagCategories/{tagCategoryId}/tagCategoryInfo/{relType}/relType" }, method = { RequestMethod.GET })
    @ResponseBody
    public TagCategory findTagCategoryInfo(@PathVariable Integer tagCategoryId, @PathVariable Integer relType) throws Exception {
        User user = UserInfoUtil.getUser();
        String createBy = user.getLoginName();
        TagCategory tagCategory = tagCategoryService.selectByPrimaryKey(tagCategoryId);
        TagCategory tagCategoryForQ = new TagCategory();
        tagCategoryForQ.setParentId(tagCategoryId);
        tagCategoryForQ.setTenantId(UserInfoUtil.getTenant().getCaCode());
        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
//        if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            tagCategoryForQ.setCreateBy(createBy);
//        }
        int childrenTagCategoryCount = tagCategoryService.queryByTagCategory(tagCategoryForQ).size();
        int tagCount = 0;
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        if (tagCategory.getParentId() == -1) {
            TagPage page = new TagPage();
            page.getPager().setPageEnabled(false);
            page.setTenantId(UserInfoUtil.getTenant().getCaCode());
//            if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
                page.setCreateBy(user.getLoginName());
                page.setEqualsCreateBy(user.getLoginName());
//            }
            tagCount = tagService.queryTagUnionAllSystemTagByCount(page);
        }
        else if ("systemtag".equals(tagCategory.getCode())) {
            if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
                tagCount = systemTagService.querySystemTagCount(tenantId, createBy, new Integer[] { 1, 2 });
            }
            else {
                tagCount = systemTagService.querySystemTagCount(tenantId, null, new Integer[] { 1, 2 });
            }
        }
        else if (StringUtils.isNotBlank(privacy) && privacy.equals("1")) {
            tagCount = tagCategoryService.queryTagCount(tagCategoryId, tenantId, createBy, new Integer[] { 1, 2 });
        }
        else {
            tagCount = tagCategoryService.queryTagCount(tagCategoryId, tenantId, null, new Integer[] { 1, 2 });
        }
        tagCategory.setChildrenTagCategoryCount(childrenTagCategoryCount);
        tagCategory.setTagCount(tagCount);
        return tagCategory;
    }
    
    @RequestMapping(value = { "/tagCategories/{tagCategoryId}/tagCategoryPie" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> buildTagCategoryPie(@PathVariable Integer tagCategoryId) throws Exception {
        User user = UserInfoUtil.getUser();
        String createBy = user.getLoginName();
        String privacy = Configuration.getInstance().getConfig("dmp.dataSecurity.ownerPrivacy");
        if (!StringUtils.isNotBlank(privacy) || !privacy.equals("1")) {
            createBy = null;
        }
        Map<String, Object> tagCategoryPieMap = tagCategoryService.buildTagCategoryPie(tagCategoryId, UserInfoUtil.getTenant().getCaCode(), createBy);
        boolean isSuccess = true;
        Map<String, Object> descMap = new HashMap<String, Object>();
        descMap.put("tagCategoryId", tagCategoryId);
        auditLogService.addAuditLog(user.getUserName(), user.getLoginName(), tagCategoryId, AuditConstant.TargetType.tagCategory.toString(), AuditConstant.OperationType.find.toString(), JsonUtils.objectToJsonStr(descMap), isSuccess);
        return tagCategoryPieMap;
    }
    
    private boolean checkTagCategoryName(TagCategory tagCategory) throws Exception {
        boolean isRepead = false;
        TagCategory tagCategoryForQ = new TagCategory();
        tagCategoryForQ.setTenantId(tagCategory.getTenantId());
        tagCategoryForQ.setParentId(tagCategory.getParentId());
        tagCategoryForQ.setName(tagCategory.getName());
        List<TagCategory> tagCategoryList = tagCategoryService.queryByTagCategory(tagCategoryForQ);
        if (tagCategory.getId() == null) {
            if (tagCategoryList != null && tagCategoryList.size() > 0) {
                isRepead = true;
            }
        }
        else if (tagCategoryList != null && tagCategoryList.size() > 0) {
            for (TagCategory rTagCategory : tagCategoryList) {
                if (0 != tagCategory.getId().compareTo(rTagCategory.getId())) {
                    isRepead = true;
                }
            }
        }
        return isRepead;
    }
}
