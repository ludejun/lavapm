package com.enterprise.common.cache;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import td.enterprise.console.core.entity.admin.DicItem;
import td.enterprise.console.core.service.admin.DicItemService;
import td.enterprise.console.core.service.admin.DicService;
import td.enterprise.console.core.service.admin.ParamService;
import td.enterprise.dmp.common.ApplicationContextManager;
import lavapm.enterprise.dmp.common.cache.CacheManager;
import td.enterprise.dmp.common.exception.BusinessException;
import lavapm.enterprise.dmp.core.service.tag.TagService;
import td.enterprise.dmp.meta.service.MetadataUiService;
import td.enterprise.dmp.meta.service.logic.MetaAccountIdTypeService;

public class WebCacheWrapper {
	private static final Logger logger = Logger.getLogger(WebCacheWrapper.class);
	  
	  public static Object getValue(String cacheName, String key)
	  {
	    Object result = CacheManager.getInstance().getElementValue(cacheName,key);
	    if (result == null)
	    {
	      result = searchCacheValue(cacheName, key);
	      if (result != null) {
	    	  CacheManager.getInstance().putElemen(key, result);
	      }
	    }
	    return result;
	  }
	  
	  public static Object getValue(String cacheName, String key, Object defaultValue)
	  {
	    Object result = getValue(cacheName, key);
	    return result == null ? defaultValue : result;
	  }
	  
	  private static Object searchCacheValue(String cacheName, String key)
	  {
	    Object result = null;
	    if ("dicItemCache".equals(cacheName))
	    {
	      DicService dicService = (DicService)ApplicationContextManager.getBean("dicService");
	      DicItemService dicItemService = (DicItemService)ApplicationContextManager.getBean("dicItemService");
	      if ("dicTree".equals(key)) {
	        try
	        {
	          Map<String, Object> map = new HashMap<String, Object>();
	          
	          DicItem dicItem = dicItemService.getMerchantCommonDicItemTree();
	          Map<String, DicItem> corpDictItemMap = new HashMap<String, DicItem>();
	          for (DicItem di : dicItem.getDicItems()) {
	            corpDictItemMap.put(di.getDicItemKey(), di);
	          }
	          map.put("corpDic", corpDictItemMap);
	          
	          Object dicMap = dicService.getAllDics();
	          map.put("dicMap", dicMap);
	          
	          dicItem = dicItemService.getMerchantZHDicItemTree();
	          Map<String, DicItem> zhDictItemMap = new HashMap<String, DicItem>();
	          for (DicItem di : dicItem.getDicItems()) {
	            zhDictItemMap.put(di.getDicItemKey(), di);
	          }
	          map.put("bizDic", zhDictItemMap);
	          
	          result = map;
	        }
	        catch (Exception e)
	        {
	          throw new BusinessException("获取全量标签异常", e);
	        }
	      } else {
	        result = dicService.queryDicItemsByDicName(key);
	      }
	    }
	    else if ("systemParamCache".equals(cacheName))
	    {
	      ParamService paramService = (ParamService)ApplicationContextManager.getBean("paramService");
	      result = paramService.findByParamKey(key);
	    }
	    else if ("metadataUI".equals(cacheName))
	    {
	      try
	      {
	        result = MetadataUiService.buildUiModel(key);
	      }
	      catch (Exception e)
	      {
	        throw new BusinessException("元数据缓存更新异常", e);
	      }
	    }
	    else if ("attributeEnumValue".equals(cacheName))
	    {
	      TagService tagService = (TagService)ApplicationContextManager.getBean(TagService.class);
	      try
	      {
	        result = tagService.queryEnums(key);
	      }
	      catch (Exception e)
	      {
	        logger.error("属性枚举值查询异常", e);
	      }
	    }
	    else if ("metaDataAccountIdTypeCache".equals(cacheName))
	    {
	      MetaAccountIdTypeService metaAccountIdTypeService = (MetaAccountIdTypeService)ApplicationContextManager.getBean(MetaAccountIdTypeService.class);
	      try
	      {
	        result = metaAccountIdTypeService.queryByTenantId(key);
	      }
	      catch (Exception e)
	      {
	        logger.error("账户类型查询异常", e);
	      }
	    }
	    return result;
	  }
	  
	  public static boolean refreshCache(String cacheName)
	  {
	    logger.info("清除缓存:" + cacheName);
	    CacheManager.getInstance().remove(cacheName);
	    return true;
	  }
	  
	  public static boolean refreshCacheAll()
	  {
	    logger.info("清除所有缓存");
	    CacheManager.getInstance().removeAll();
	    return true;
	  }
}
