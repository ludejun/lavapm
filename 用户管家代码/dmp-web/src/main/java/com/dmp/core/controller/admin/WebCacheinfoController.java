package com.dmp.core.controller.admin;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import td.enterprise.console.core.service.admin.CacheinfoService;
import td.enterprise.dmp.base.web.BaseController;
import td.enterprise.dmp.common.cache.ParamCacheManager;

import com.enterprise.common.cache.WebCacheWrapper;
import com.tendcloud.enterprise.um.umic.rmi.BusinessException;

@Controller
@RequestMapping({ "/admin" })
public class WebCacheinfoController extends BaseController
{
    public static final Logger logger = Logger.getLogger(WebCacheinfoController.class);
    @Autowired
    private CacheinfoService cacheinfoService;
    private static final String SYSTEM_CACHE_NAME = "system";
    
    @RequestMapping(value = { "/cacheinfos/clearCache/{cacheName}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> clearCache(HttpServletRequest request, @PathVariable String cacheName) throws Exception {
        if (StringUtils.isBlank(cacheName)) {
            throw new BusinessException("缓存名称为空");
        }
        WebCacheWrapper.refreshCache(cacheName);
        if ("system".equals(cacheName)) {
            ParamCacheManager.getInstance().removeAll();
        }
        return new HashMap<String, Object>();
    }
}
