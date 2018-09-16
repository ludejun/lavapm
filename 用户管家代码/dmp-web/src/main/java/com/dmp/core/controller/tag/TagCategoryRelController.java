package com.dmp.core.controller.tag;

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

import td.enterprise.dmp.base.web.BaseController;
import lavapm.enterprise.dmp.core.entity.tag.Tag;
import lavapm.enterprise.dmp.core.entity.tag.TagCategoryRel;
import lavapm.enterprise.dmp.core.page.tag.TagCategoryRelPage;
import lavapm.enterprise.dmp.core.service.tag.TagCategoryRelService;
import lavapm.enterprise.dmp.core.service.tag.TagService;

@Controller
@RequestMapping({ "/tag" })
public class TagCategoryRelController extends BaseController
{
    public static final Logger logger = Logger.getLogger(TagCategoryRelController.class);
    @Autowired
    private TagCategoryRelService tagCategoryRelService;
    @Autowired
    private TagService tagService;
    
    @RequestMapping(value = { "/tagCategoryRels" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(TagCategoryRelPage page) throws Exception {
        List<TagCategoryRel> rows = tagCategoryRelService.queryByList(page);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/tagCategoryRels" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public TagCategoryRel create(@RequestBody TagCategoryRel tagCategoryRel) throws Exception {
        tagCategoryRelService.insert(tagCategoryRel);
        return tagCategoryRel;
    }
    
    @RequestMapping(value = { "/tagCategoryRels/{tagCategoryRelId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public TagCategoryRel find(@PathVariable String tagCategoryRelId) throws Exception {
        return tagCategoryRelService.selectByPrimaryKey((Object)tagCategoryRelId);
    }
    
    @RequestMapping(value = { "/tagCategoryRels/{tagCategoryRelId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public TagCategoryRel update(@RequestBody TagCategoryRel tagCategoryRel) throws Exception {
        tagCategoryRelService.updateByPrimaryKeySelective(tagCategoryRel);
        return tagCategoryRel;
    }
    
    @RequestMapping(value = { "/tagCategoryRels/{tagCategoryRelId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String tagCategoryRelId) throws Exception {
        tagCategoryRelService.deleteByPrimaryKey(new Object[] { tagCategoryRelId });
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/tagCategoryRels/queryTagByTagCategoryId/{categoryId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<Tag> queryTagByTagCategoryId(@PathVariable String categoryId) throws Exception {
        List<TagCategoryRel> tagCategoryRelList = tagCategoryRelService.queryByCategoryId(Integer.valueOf(categoryId));
        List<Tag> tags = new ArrayList<Tag>();
        if (tagCategoryRelList != null && tagCategoryRelList.size() > 0) {
            for (TagCategoryRel tagCategoryRel : tagCategoryRelList) {
                Tag tag = tagService.selectByPrimaryKey(tagCategoryRel.getTagId());
                tags.add(tag);
            }
        }
        return tags;
    }
}
