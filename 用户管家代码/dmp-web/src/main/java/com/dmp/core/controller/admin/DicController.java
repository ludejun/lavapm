package com.dmp.core.controller.admin;

import td.enterprise.dmp.base.web.*;

import org.springframework.stereotype.*;
import org.apache.log4j.*;

import td.enterprise.console.core.service.admin.*;

import org.springframework.beans.factory.annotation.*;

import td.enterprise.console.core.entity.admin.*;

import org.springframework.web.bind.annotation.*;

import java.util.*;

import td.enterprise.dmp.meta.entity.logic.*;

import org.apache.commons.lang.*;

import com.enterprise.common.cache.WebCacheWrapper;
import com.enterprise.common.web.UserInfoUtil;

@Controller
@RequestMapping({ "/admin" })
public class DicController extends BaseController
{
    public static Logger logger = Logger.getLogger(DicController.class);
    @Autowired
    private DicService dicService;
    
    @RequestMapping(value = { "/dics/{dicId}" }, method = { RequestMethod.GET })
    @ResponseBody
    public Dic find(@PathVariable String dicId) throws Exception {
        return dicService.selectByPrimaryKey(dicId);
    }
    
    @RequestMapping(value = { "/dics/name" }, method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public Map<String, Object> getDicItems(@RequestBody Map<String, String> paramMap) throws Exception {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        if (paramMap == null || paramMap.keySet().size() == 0) {
            return resultMap;
        }
        for (Map.Entry<String, String> entry : paramMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if ("dicName".equals(key)) {
                Map<String, Object> dicMap = getConsoleDicByName(value);
                resultMap.putAll(dicMap);
            }
            else if ("metaDicName".equals(key)) {
                Map<String, Object> metaDicMap = getMetaDicByName(value);
                resultMap.putAll(metaDicMap);
            }
            else {
                DicController.logger.info("暂不支持\"" + key + "\"数据字典类型");
            }
        }
        logger.info("获取数据字典：" + resultMap.toString());
        return resultMap;
    }
    
    private Map<String, Object> getConsoleDicByName(String dicName) {
        Map<String, Object> dicMap = new HashMap<String, Object>();
        String[] split = dicName.split(",");
        for (String dicN : split) {
            dicMap.put(dicN, WebCacheWrapper.getValue("dicItemCache", dicN));
        }
        return dicMap;
    }
    
    private Map<String, Object> getMetaDicByName(String dicName) throws Exception {
        Map<String, Object> dicMap = new HashMap<String, Object>();
        String[] dicNames = dicName.split(",");
        String tenantId = UserInfoUtil.getTenant().getCaCode();
        for (String dicN : dicNames) {
            if (StringUtils.isNotBlank(dicN) && "TOUCH_POINT_TYPE".equals(dicN)) {
                DicController.logger.info("查询当前租户\"" + tenantId + "\"下账户类型");
                List<Map<String, String>> touchPointTypeList = new ArrayList<Map<String, String>>();
                List<MetaAccountIdType> metaAccountIdTypeList = (List<MetaAccountIdType>)WebCacheWrapper.getValue("metaDataAccountIdTypeCache", tenantId);
                if (metaAccountIdTypeList != null && metaAccountIdTypeList.size() > 0) {
                    for (MetaAccountIdType metaAccountIdType : metaAccountIdTypeList) {
                        Integer isMainAccountType = metaAccountIdType.getIsMainAccountType();
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("dicItemKey", metaAccountIdType.getCode());
                        map.put("dicItemValue", metaAccountIdType.getName());
                        map.put("majorAccount", (isMainAccountType != null) ? (BooleanUtils.toBoolean(isMainAccountType) + "") : "false");
                        touchPointTypeList.add(map);
                    }
                }
                dicMap.put(dicN, touchPointTypeList);
            }
            else {
                DicController.logger.info("暂不支持\"" + dicN + "\"从元数据获取字典数据");
            }
        }
        return dicMap;
    }
}
