package com.dmp.core.controller.monitor;

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

import td.enterprise.console.core.entity.monitor.SubCalcObjectLog;
import td.enterprise.console.core.page.monitor.SubCalcObjectLogPage;
import td.enterprise.console.core.service.monitor.SubCalcObjectLogService;
import td.enterprise.dmp.base.page.BasePage;
import td.enterprise.dmp.base.web.BaseController;

@Controller
@RequestMapping({ "/monitor" })
public class SubCalcObjectLogController extends BaseController
{
    public static final Logger logger = Logger.getLogger(SubCalcObjectLogController.class);
    @Autowired
    private SubCalcObjectLogService subCalcObjectLogService;
    
    @RequestMapping(value = { "/subCalcObjectLogs" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(SubCalcObjectLogPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        List<SubCalcObjectLog> rows = subCalcObjectLogService.queryByList((BasePage)page);
        return getGridData(page.getPager().getRowCount(), (Object)rows);
    }
    
    @RequestMapping(value = { "/subCalcObjectLogs" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public SubCalcObjectLog create(@RequestBody SubCalcObjectLog subCalcObjectLog) throws Exception {
        subCalcObjectLogService.insert(subCalcObjectLog);
        return subCalcObjectLog;
    }
    
    @RequestMapping(value = { "/subCalcObjectLogs/{subCalcObjectLogId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public SubCalcObjectLog find(@PathVariable String subCalcObjectLogId) throws Exception {
        return subCalcObjectLogService.selectByPrimaryKey(subCalcObjectLogId);
    }
    
    @RequestMapping(value = { "/subCalcObjectLogs/{subCalcObjectLogId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public SubCalcObjectLog update(@RequestBody SubCalcObjectLog subCalcObjectLog) throws Exception {
        subCalcObjectLogService.updateByPrimaryKeySelective(subCalcObjectLog);
        return subCalcObjectLog;
    }
    
    @RequestMapping(value = { "/subCalcObjectLogs/{subCalcObjectLogId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String subCalcObjectLogId) throws Exception {
        subCalcObjectLogService.deleteByPrimaryKey(new Object[] { subCalcObjectLogId });
        return new HashMap<Object, Object>();
    }
}
