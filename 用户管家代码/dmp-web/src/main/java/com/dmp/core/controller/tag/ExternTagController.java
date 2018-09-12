package com.dmp.core.controller.tag;

import java.io.File;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.config.Configuration;
import td.enterprise.dmp.common.exception.BusinessException;
import lavapm.enterprise.dmp.core.entity.crowd.Crowd;
import lavapm.enterprise.dmp.core.entity.tag.ExternTag;
import lavapm.enterprise.dmp.core.page.tag.ExternTagPage;
import lavapm.enterprise.dmp.core.service.crowd.CrowdService;
import lavapm.enterprise.dmp.core.service.tag.ExternTagService;

import com.enterprise.common.web.UserInfoUtil;
import com.tendcloud.enterprise.um.umic.entity.User;

@Controller
@RequestMapping({ "/tag" })
public class ExternTagController extends BaseController
{
    public static final Logger logger = Logger.getLogger(ExternTagController.class);
    
    private Configuration conf;
    @Autowired
    private ExternTagService externTagService;
    @Autowired
    private CrowdService crowdService;
    
    public ExternTagController() {
        this.conf = Configuration.getInstance();
    }
    
    @RequestMapping(value = { "/externTags" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> query(ExternTagPage page) throws Exception {
        page.setSort("create_time");
        page.getPager().setOrderDirection(false);
        page.setTenantId(UserInfoUtil.getTenant().getCaCode());
        List<ExternTag> rows = externTagService.queryByList(page);
        return getGridData(page.getPager().getRowCount(),rows);
    }
    
    @RequestMapping(value = { "/externTags" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public ExternTag create(@RequestBody ExternTag externTag) throws Exception {
        User user = UserInfoUtil.getUser();
        externTag.setCreator(user.getUserName());
        externTag.setCreateBy(user.getLoginName());
        externTag.setTenantId(UserInfoUtil.getTenant().getCaCode());
        boolean isRepead = checkExternTag(externTag);
        if (isRepead) {
            throw new BusinessException("同一来源中标签编码和标签名称不能重复，请修改");
        }
        externTagService.insertWithAttachment(externTag);
        return externTag;
    }
    
    @RequestMapping(value = { "/externTags/createExternTag" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> createExternTag(ExternTag externTag) throws Exception {
        String msg = "";
        User user = UserInfoUtil.getUser();
        externTag.setCreator(user.getUserName());
        externTag.setCreateBy(user.getLoginName());
        if (externTag.getId() == null) {
            externTag.setTenantId(UserInfoUtil.getTenant().getCaCode());
            boolean isRepead = checkExternTag(externTag);
            if (isRepead) {
                throw new BusinessException("同一来源中标签编码和标签名称不能重复，请修改");
            }
            externTagService.insertWithAttachment(externTag);
            msg = "标签创建完成";
        }
        else {
            externTag.setUpdateBy(user.getLoginName());
            externTagService.updateWithAttachment(externTag);
            msg = "标签修改完成";
        }
        return getSuccessMessage(msg);
    }
    
    @RequestMapping(value = { "/externTags/{externTagId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public ExternTag find(@PathVariable String externTagId) throws Exception {
        return externTagService.selectByPrimaryKey(externTagId);
    }
    
    @RequestMapping(value = { "/externTags/{externTagId}" }, method = { RequestMethod.PUT }, consumes = { "application/json" })
    @ResponseBody
    public ExternTag update(@RequestBody ExternTag externTag) throws Exception {
        User user = UserInfoUtil.getUser();
        externTag.setUpdateBy(user.getLoginName());
        externTagService.updateWithAttachment(externTag);
        return externTag;
    }
    
    @RequestMapping(value = { "/externTags/{externTagId}" }, method = { RequestMethod.DELETE })
    @ResponseBody
    public Map<Object, Object> delete(@PathVariable String externTagId) throws Exception {
        ExternTag externTag = externTagService.selectByPrimaryKey(externTagId);
        checkDependence(externTag);
        ExternTag externTagForUpdate = new ExternTag();
        User user = UserInfoUtil.getUser();
        externTagForUpdate.setId(Integer.valueOf(externTagId));
        externTagForUpdate.setStatus(-1);
        externTagForUpdate.setUpdateBy(user.getLoginName());
        externTagService.updateByPrimaryKeySelective(externTag);
        return new HashMap<Object, Object>();
    }
    
    @RequestMapping(value = { "/externTags/templateFile/download/{type}" }, method = { RequestMethod.GET })
    public void downloadTemplate(@PathVariable String type, HttpServletRequest req, HttpServletResponse resp) throws Exception {
        OutputStream os = resp.getOutputStream();
        String webPath = req.getSession().getServletContext().getRealPath("");
        String templateFile = "";
        File file = null;
        String fileName = "";
        if (StringUtils.isNotEmpty(type) && "data".equalsIgnoreCase(type)) {
            templateFile = conf.getConfig("hive.table.etl.demo.data.file");
            file = new File(webPath + templateFile);
            fileName = "tagData.csv";
        }
        else if (StringUtils.isNotEmpty(type) && "tag".equalsIgnoreCase(type)) {
            templateFile = conf.getConfig("hive.table.etl.demo.data.file");
            file = new File(webPath + templateFile);
            fileName = "tagTemplate.csv";
        }
        if (!file.exists()) {
            file = new File(templateFile);
        }
        try {
            resp.reset();
            resp.setContentType("application/octet-stream; charset=utf-8");
            resp.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "utf-8"));
            os.write(FileUtils.readFileToByteArray(file));
            os.flush();
        }
        finally {
            if (os != null) {
                os.close();
            }
        }
    }
    
    private boolean checkExternTag(ExternTag externTag) {
        boolean isRepead = false;
        ExternTag externTagTemp = new ExternTag();
        externTagTemp.setSource(externTag.getSource());
        externTagTemp.setName(externTag.getName());
        externTagTemp.setCode(externTag.getCode());
        externTagTemp.setTenantId(externTag.getTenantId());
        List<ExternTag> externTagList = externTagService.queryByExternTag(externTagTemp);
        if (externTag.getId() == null) {
            if (externTagList != null && externTagList.size() > 0) {
                isRepead = true;
            }
        }
        else if (externTagList != null && externTagList.size() > 0) {
            for (final ExternTag rExternTag : externTagList) {
                if (0 != externTag.getId().compareTo(rExternTag.getId())) {
                    isRepead = true;
                }
            }
        }
        return isRepead;
    }
    
    private void checkDependence(ExternTag externTag) {
        Crowd crowd = new Crowd();
        crowd.setTagCode(externTag.getCode());
        List<Crowd> crowdList = crowdService.queryByCrowd(crowd);
        if (crowdList != null && crowdList.size() > 0) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < crowdList.size(); ++i) {
                Crowd crowdT = crowdList.get(i);
                if (i == crowdList.size() - 1) {
                    sb.append(crowdT.getName());
                }
                else {
                    sb.append(crowdT.getName() + ",");
                }
            }
            throw new BusinessException("标签“" + externTag.getName() + "”正被人群“" + sb.toString() + "”使用，不能删除");
        }
    }
}
