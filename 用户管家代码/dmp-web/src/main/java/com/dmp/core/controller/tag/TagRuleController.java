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
import lavapm.enterprise.dmp.core.entity.tag.TagRule;
import lavapm.enterprise.dmp.core.page.tag.TagRulePage;
import lavapm.enterprise.dmp.core.service.tag.TagRuleService;

@Controller
@RequestMapping({ "/tag" })
public class TagRuleController extends BaseController
{
    public static final Logger logger = Logger.getLogger(TagRuleController.class);
    @Autowired
    private TagRuleService tagRuleService;
    
    @RequestMapping(value = { "/tagRules" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(TagRulePage page) throws Exception {
        List<TagRule> rows = tagRuleService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), (Object)rows);
    }
    
    @RequestMapping(value = { "/tagRules" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public TagRule create(@RequestBody TagRule tagRule) throws Exception {
        tagRuleService.insert(tagRule);
        return tagRule;
    }
    
    @RequestMapping(value = { "/tagRules/{tagRuleId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public TagRule find(@PathVariable String tagRuleId) throws Exception {
        return tagRuleService.selectByPrimaryKey(tagRuleId);
    }
    
    @RequestMapping(value = { "/tagRules/{tagRuleId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public TagRule update(@RequestBody TagRule tagRule) throws Exception {
        tagRuleService.updateByPrimaryKeySelective(tagRule);
        return tagRule;
    }
    
    @RequestMapping(value = { "/tagRules/{tagRuleId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String tagRuleId) throws Exception {
        tagRuleService.deleteByPrimaryKey(new Object[] { tagRuleId });
        return new HashMap<Object, Object>();
    }
}
