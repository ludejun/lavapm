package com.dmp.core.controller.tag;

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
import lavapm.enterprise.dmp.core.entity.tag.TagRuleRel;
import lavapm.enterprise.dmp.core.page.tag.TagRuleRelPage;
import lavapm.enterprise.dmp.core.service.tag.TagRuleRelService;

@Controller
@RequestMapping({ "/tag" })
public class TagRuleRelController extends BaseController
{
    public static final Logger logger = Logger.getLogger(TagRuleRelController.class);
    @Autowired
    private TagRuleRelService tagRuleRelService;
    
    @RequestMapping(value = { "/tagRuleRels" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(TagRuleRelPage page) throws Exception {
        List<TagRuleRel> rows = tagRuleRelService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/tagRuleRels" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public TagRuleRel create(@RequestBody TagRuleRel tagRuleRel) throws Exception {
        tagRuleRelService.insert(tagRuleRel);
        return tagRuleRel;
    }
    
    @RequestMapping(value = { "/tagRuleRels/{tagRuleRelId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public TagRuleRel find(@PathVariable String tagRuleRelId) throws Exception {
        return tagRuleRelService.selectByPrimaryKey(tagRuleRelId);
    }
    
    @RequestMapping(value = { "/tagRuleRels/{tagRuleRelId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public TagRuleRel update(@RequestBody TagRuleRel tagRuleRel) throws Exception {
        tagRuleRelService.updateByPrimaryKeySelective(tagRuleRel);
        return tagRuleRel;
    }
    
    @RequestMapping(value = { "/tagRuleRels/{tagRuleRelId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String tagRuleRelId) throws Exception {
        tagRuleRelService.deleteByPrimaryKey(new Object[] { tagRuleRelId });
        return new HashMap<Object, Object>();
    }
}
