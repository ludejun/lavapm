package com.enterprise.common.web;

import org.apache.log4j.Logger;
import lavapm.enterprise.dmp.core.entity.tag.TagCategory;
import lavapm.enterprise.dmp.core.page.tag.TagCategoryPage;
import lavapm.enterprise.dmp.core.service.tag.TagCategoryService;
import td.enterprise.dmp.common.ApplicationContextManager;

public class InitDmpSystemDataService
{
    private static final Logger logger = Logger.getLogger(InitDmpSystemDataService.class);
    
    public static void initSystemData() throws Exception {
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        TagCategoryService tagCategoryService = ApplicationContextManager.getBean(TagCategoryService.class);
        TagCategoryPage page = new TagCategoryPage();
        page.setParentId(Integer.valueOf(-1));
        page.setTenantId(tenantId);
        TagCategory tagCategory = tagCategoryService.queryBySingle(page);
        if (tagCategory == null) {
            logger.info("初始化租户[" + tenantId + "]标签分类父节点");
            tagCategory = new TagCategory();
            tagCategory.setName("标签分类");
            tagCategory.setDescription("标签分类");
            tagCategory.setCreateBy("dmpadmin");
            tagCategory.setCreator("dmpadmin");
            tagCategory.setTenantId(tenantId);
            tagCategory.setParentId(-1);
            tagCategoryService.insert(tagCategory);
        }
    }
}
