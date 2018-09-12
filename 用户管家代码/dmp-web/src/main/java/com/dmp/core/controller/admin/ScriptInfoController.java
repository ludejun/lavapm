package com.dmp.core.controller.admin;

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

import td.enterprise.console.core.entity.admin.ScriptInfo;
import td.enterprise.console.core.page.admin.ScriptInfoPage;
import td.enterprise.console.core.service.admin.ScriptInfoService;
import td.enterprise.dmp.base.web.BaseController;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/admin" })
public class ScriptInfoController extends BaseController
{
    public static final Logger logger = Logger.getLogger(ScriptInfoController.class);
    @Autowired
    private ScriptInfoService scriptInfoService;
    
    @RequestMapping(value = { "/scriptInfos" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(ScriptInfoPage page) throws Exception {
        List<ScriptInfo> rows = scriptInfoService.queryByList(page);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/scriptInfos" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public ScriptInfo create(@RequestBody ScriptInfo scriptInfo) throws Exception {
        logger.info("===============保存脚本===============");
        User user = UserInfoUtil.getUser();
        scriptInfo.setCreator(user.getUserName());
        scriptInfo.setCreateBy(user.getLoginName());
        scriptInfoService.insert(scriptInfo);
        return scriptInfo;
    }
    
    @RequestMapping(value = { "/scriptInfos/{scriptInfoId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public ScriptInfo find(@PathVariable String scriptInfoId) throws Exception {
        return scriptInfoService.selectByPrimaryKey(scriptInfoId);
    }
    
    @RequestMapping(value = { "/scriptInfos/{scriptInfoId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public ScriptInfo update(@RequestBody ScriptInfo scriptInfo) throws Exception {
        User user = UserInfoUtil.getUser();
        scriptInfo.setUpdateBy(user.getLoginName());
        scriptInfoService.updateByPrimaryKeySelective(scriptInfo);
        return scriptInfo;
    }
    
    @RequestMapping(value = { "/scriptInfos/{scriptInfoId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String scriptInfoId) throws Exception {
        scriptInfoService.deleteByPrimaryKey(new Object[] { scriptInfoId });
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/scriptInfos/{type}/scriptInfoList" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<ScriptInfo> queryCriptInfoByType(@PathVariable String type) {
        ScriptInfo scriptInfoForQ = new ScriptInfo();
        scriptInfoForQ.setType(type);
        return scriptInfoService.queryByScriptInfo(scriptInfoForQ);
    }
    
    @RequestMapping(value = { "/scriptInfos/all" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<ScriptInfo> queryAllScriptInfo() throws Exception {
        ScriptInfoPage scriptInfoPage = new ScriptInfoPage();
        scriptInfoPage.getPager().setPageEnabled(false);
        return scriptInfoService.queryByList(scriptInfoPage);
    }
}
