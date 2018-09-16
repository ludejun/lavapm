package com.dmp.core.controller.crowd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.dmp.base.page.BasePage;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.exception.BusinessException;
import lavapm.enterprise.dmp.core.entity.campaign.DspLaunch;
import lavapm.enterprise.dmp.core.entity.crowd.PotentialCrowd;
import lavapm.enterprise.dmp.core.page.crowd.PotentialCrowdPage;
import lavapm.enterprise.dmp.core.service.campaign.DspLaunchService;
import lavapm.enterprise.dmp.core.service.crowd.PotentialCrowdService;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/crowd" })
public class PotentialCrowdController extends BaseController
{
    public static final Logger logger = Logger.getLogger(PotentialCrowdController.class);
    @Autowired
    private PotentialCrowdService potentialCrowdService;
    @Autowired
    private DspLaunchService dspLaunchService;
    
    @RequestMapping(value = { "/potentialCrowds" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(PotentialCrowdPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<PotentialCrowd> rows = potentialCrowdService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), rows);
    }
    
    @RequestMapping(value = { "/potentialCrowds" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public PotentialCrowd create(@RequestBody PotentialCrowd potentialCrowd) throws Exception {
        User user = UserInfoUtil.getUser();
        potentialCrowd.setCreateBy(user.getLoginName());
        potentialCrowd.setCreator(user.getUserName());
        potentialCrowd.setTenantId(UserInfoUtil.getTenant().getCaCode());
        logger.info("=============Step1：潜客人群名称重复性验证=============");
        boolean isRepead = checkPotentialCrowdName(potentialCrowd);
        if (isRepead) {
            throw new BusinessException("潜客名称已存在，请修改");
        }
        PotentialCrowdController.logger.info("=============Step2：保存潜客人群=============");
        potentialCrowdService.insertWithRecord(potentialCrowd);
        return potentialCrowd;
    }
    
    @RequestMapping(value = { "/potentialCrowds/{potentialCrowdId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public PotentialCrowd find(@PathVariable String potentialCrowdId) throws Exception {
        return potentialCrowdService.selectByPrimaryKey(potentialCrowdId);
    }
    
    @RequestMapping(value = { "/potentialCrowds/{potentialCrowdId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public PotentialCrowd update(@RequestBody PotentialCrowd potentialCrowd) throws Exception {
        logger.info("=============Step1：潜客人群名称重复性验证=============");
        boolean isRepead = checkPotentialCrowdName(potentialCrowd);
        if (isRepead) {
            throw new BusinessException("潜客名称已存在，请修改");
        }
        logger.info("=============Step2：更新潜客人群=============");
        User user = UserInfoUtil.getUser();
        potentialCrowd.setUpdateBy(user.getLoginName());
        potentialCrowdService.updateWithSeedCrowd(potentialCrowd);
        return potentialCrowd;
    }
    
    private boolean checkPotentialCrowdName(PotentialCrowd potentialCrowd) throws Exception {
        boolean isRepead = false;
        PotentialCrowdPage potentialCrowdPage = new PotentialCrowdPage();
        potentialCrowdPage.setName(potentialCrowd.getName());
        potentialCrowdPage.getPager().setPageEnabled(false);
        potentialCrowdPage.setTenantId(potentialCrowd.getTenantId());
        List<PotentialCrowd> potentialCrowdList = potentialCrowdService.queryByList((BasePage)potentialCrowdPage);
        if (potentialCrowd.getId() == null) {
            if (potentialCrowdList != null && potentialCrowdList.size() > 0) {
                isRepead = true;
            }
        }
        else if (potentialCrowdList != null && potentialCrowdList.size() > 0) {
            for (PotentialCrowd potentialCrowdTemp : potentialCrowdList) {
                if (0 != potentialCrowd.getId().compareTo(potentialCrowdTemp.getId())) {
                    isRepead = true;
                }
            }
        }
        return isRepead;
    }
    
    @RequestMapping(value = { "/potentialCrowds/{potentialCrowdId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String potentialCrowdId) throws Exception {
        potentialCrowdService.deleteByPrimaryKey(new Object[] { potentialCrowdId });
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/potentialCrowds/{potentialCrowdId}/launchPotentialCrowd" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public PotentialCrowd launchPotentialCrowd(@RequestBody DspLaunch dspLaunch, @PathVariable Integer potentialCrowdId) throws Exception {
        boolean isRepead = checkDspLaunchName(dspLaunch);
        if (isRepead) {
            throw new BusinessException("活动名称已存在，请修改");
        }
        if (StringUtils.isBlank(dspLaunch.getDspChannel())) {
            PotentialCrowdController.logger.error((Object)"未选择需求方平台！");
            throw new BusinessException("dsp.launch.exception.unselected.channel");
        }
        PotentialCrowd potentialCrowd = potentialCrowdService.selectByPrimaryKey(potentialCrowdId);
        User user = UserInfoUtil.getUser();
        dspLaunch.setCrowdId(potentialCrowdId);
        dspLaunch.setCrowdType("PC");
        dspLaunch.setCreateBy(user.getLoginName());
        dspLaunch.setCreator(user.getUserName());
        potentialCrowdService.launchPotentialCrowd(potentialCrowd, dspLaunch);
        return potentialCrowd;
    }
    
    @RequestMapping(value = { "/potentialCrowds/exportPotentialCrowd/{potentialCrowdId}" }, method = { RequestMethod.GET })
    public void exportCrowd(@PathVariable Integer potentialCrowdId, HttpServletRequest req, HttpServletResponse resp) throws Exception {
    }
    
    @RequestMapping(value = { "/potentialCrowds/{potentialCrowdId}/status/delivered" }, method = { RequestMethod.GET })
    @ResponseBody
    public List<PotentialCrowd> queryByStatus(@PathVariable Integer potentialCrowdId, String status) throws Exception {
        List<Integer> statusList = new ArrayList<Integer>();
        statusList.add(4);
        statusList.add(5);
        statusList.add(6);
        List<PotentialCrowd> rows = potentialCrowdService.queryByStatusList(potentialCrowdId,statusList);
        return rows;
    }
    
    @RequestMapping(value = { "/potentialCrowds/{status}/potentialCrowdCount" }, method = { RequestMethod.GET })
    @ResponseBody
    public Integer queryCountByStatus(@PathVariable Integer status) throws Exception {
        return potentialCrowdService.queryCountByStatus(status);
    }
    
    private boolean checkDspLaunchName(DspLaunch dspLaunch) {
        boolean isRepead = false;
        DspLaunch dspLaunchTemp = new DspLaunch();
        dspLaunchTemp.setLaunchName(dspLaunch.getLaunchName());
        List<DspLaunch> dspLaunchList = dspLaunchService.queryByDspLaunch(dspLaunchTemp);
        if (dspLaunch.getId() == null) {
            if (dspLaunchList != null && dspLaunchList.size() > 0) {
                isRepead = true;
            }
        }
        else if (dspLaunchList != null && dspLaunchList.size() > 0) {
            for (final DspLaunch rDspLaunch : dspLaunchList) {
                if (0 != rDspLaunch.getId().compareTo(dspLaunch.getId())) {
                    isRepead = true;
                }
            }
        }
        return isRepead;
    }
}
