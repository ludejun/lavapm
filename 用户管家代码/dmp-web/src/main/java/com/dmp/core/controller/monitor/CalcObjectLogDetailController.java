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

import td.enterprise.console.core.entity.monitor.CalcObjectLogDetail;
import td.enterprise.console.core.page.monitor.CalcObjectLogDetailPage;
import td.enterprise.console.core.service.monitor.CalcObjectLogDetailService;
import td.enterprise.dmp.base.page.BasePage;
import td.enterprise.dmp.base.web.BaseController;

@Controller
@RequestMapping({ "/monitor" })
public class CalcObjectLogDetailController extends BaseController
{
    public static final Logger logger = Logger.getLogger(CalcObjectLogDetailController.class);
    @Autowired
    private CalcObjectLogDetailService calcObjectLogDetailService;
    
    @RequestMapping(value = { "/calcObjectLogDetails" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(CalcObjectLogDetailPage page) throws Exception {
        List<CalcObjectLogDetail> rows = calcObjectLogDetailService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/calcObjectLogDetails" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public CalcObjectLogDetail create(@RequestBody CalcObjectLogDetail calcObjectLogDetail) throws Exception {
        calcObjectLogDetailService.insert(calcObjectLogDetail);
        return calcObjectLogDetail;
    }
    
    @RequestMapping(value = { "/calcObjectLogDetails/{calcObjectLogDetailId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public CalcObjectLogDetail find(@PathVariable String calcObjectLogDetailId) throws Exception {
        return calcObjectLogDetailService.selectByPrimaryKey(calcObjectLogDetailId);
    }
    
    @RequestMapping(value = { "/calcObjectLogDetails/{calcObjectLogDetailId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public CalcObjectLogDetail update(@RequestBody CalcObjectLogDetail calcObjectLogDetail) throws Exception {
        calcObjectLogDetailService.updateByPrimaryKeySelective(calcObjectLogDetail);
        return calcObjectLogDetail;
    }
    
    @RequestMapping(value = { "/calcObjectLogDetails/{calcObjectLogDetailId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String calcObjectLogDetailId) throws Exception {
        calcObjectLogDetailService.deleteByPrimaryKey(new Object[] {calcObjectLogDetailId});
        return new HashMap<Object, Object>();
    }
}
