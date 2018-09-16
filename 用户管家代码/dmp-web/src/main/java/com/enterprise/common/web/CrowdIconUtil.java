package com.enterprise.common.web;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import td.enterprise.console.core.entity.admin.DicItem;
import lavapm.enterprise.dmp.core.entity.crowd.Crowd;
import lavapm.enterprise.dmp.core.entity.crowd.LookalikeCrowd;
import lavapm.enterprise.dmp.core.entity.tag.SystemTag;
import lavapm.enterprise.dmp.core.entity.tag.Tag;
import td.enterprise.dmp.meta.entity.logic.MetaAccountIdType;

import com.enterprise.common.cache.WebCacheWrapper;

public class CrowdIconUtil
{
    private static final String ACCOUNT_ID_TYPE_ICON = "ACCOUNT_ID_TYPE_ICON";
    public static final String CROWD_ICON_TAG = "TAG";
    public static final String CROWD_ICON_SYSTEM_TAG = "SYSTEM_TAG";
    public static final String CROWD_ICON_CROWD = "CROWD";
    public static final String CROWD_ICON_LOOKALIKE = "LOOKALIKE";
    
    public static List<Object> converCrowdIcon(Object rows, String type, String tenantId) throws Exception {
        return converCrowdIcon(rows, type, tenantId, true);
    }
    
    public static void converCrowdIconForBig(Crowd crowd) throws Exception {
        Map<String, String> accountIdTypes = new HashMap<String, String>();
        accountIdTypes.put(crowd.getTouchPointType(), "");
        getCrowdIconInfo(accountIdTypes, crowd.getTenantId(), false);
        crowd.setCrowdIcon((String)accountIdTypes.get(crowd.getTouchPointType()));
    }
    
    public static List<Object> converCrowdIcon(Object rows, String type, String tenantId, boolean isSmall) throws Exception {
        Map<String, String> accountIdTypes = new HashMap<String, String>();
        
        Iterator localIterator;
        
        if ("TAG".equals(type))
            for (localIterator = ((List)rows).iterator(); localIterator.hasNext();) { 
            	Tag tag = (Tag)localIterator.next();
            	if(accountIdTypes.get(tag.getTouchPointType()) == null)
            		accountIdTypes.put(tag.getTouchPointType(), "");
            }
        
        else if ("SYSTEM_TAG".equals(type))
            for (localIterator = ((List)rows).iterator(); localIterator.hasNext();) { 
            	SystemTag tag = (SystemTag)localIterator.next();
            	if(accountIdTypes.get(tag.getTouchPointType()) == null)
            		accountIdTypes.put(tag.getTouchPointType(), "");
            }

        else if ("CROWD".equals(type))
            for (localIterator = ((List)rows).iterator(); localIterator.hasNext();) { 
            	Crowd crowd = (Crowd)localIterator.next();
            	if(accountIdTypes.get(crowd.getTouchPointType()) == null)
            		accountIdTypes.put(crowd.getTouchPointType(), "");
            }
        
        else if ("LOOKALIKE".equals(type))
            for (localIterator = ((List)rows).iterator(); localIterator.hasNext();) {
            	LookalikeCrowd crowd = (LookalikeCrowd)localIterator.next();
            	if(accountIdTypes.get(crowd.getTouchPointType()) == null)
            		accountIdTypes.put(crowd.getTouchPointType(), "");
            }
        
        
        getCrowdIconInfo(accountIdTypes, tenantId, isSmall);
        List<Object> results = new LinkedList<Object>();
        
        if ("TAG".equals(type)) {
            for (Object tag3 : (List)rows) {
                if (StringUtils.isNotBlank((String)accountIdTypes.get(((Tag) tag3).getTouchPointType()))) {
                    ((Tag) tag3).setCrowdIcon((String)accountIdTypes.get(((Tag) tag3).getTouchPointType()));
                }
                results.add(tag3);
            }
        }
        else if ("SYSTEM_TAG".equals(type)) {
            for (Object tag4 : (List)rows) {
                if (StringUtils.isNotBlank((String)accountIdTypes.get(((SystemTag) tag4).getTouchPointType()))) {
                    ((SystemTag) tag4).setCrowdIcon((String)accountIdTypes.get(((SystemTag) tag4).getTouchPointType()));
                }
                results.add(tag4);
            }
        }
        else if ("CROWD".equals(type)) {
            for (Object crowd3 : (List)rows) {
                if (StringUtils.isNotBlank((String)accountIdTypes.get(((Crowd) crowd3).getTouchPointType()))) {
                    ((Crowd) crowd3).setCrowdIcon(accountIdTypes.get(((Crowd) crowd3).getTouchPointType()));
                }
                results.add(crowd3);
            }
        }
        else if ("LOOKALIKE".equals(type)) {
            for (Object crowd4 : (List)rows) {
                if (StringUtils.isNotBlank((String)accountIdTypes.get(((LookalikeCrowd) crowd4).getTouchPointType()))) {
                    ((LookalikeCrowd) crowd4).setCrowdIcon((String)accountIdTypes.get(((LookalikeCrowd) crowd4).getTouchPointType()));
                }
                results.add(crowd4);
            }
        }
        return results;
    }
    
    private static void getCrowdIconInfo(Map<String, String> accountIdTypes, String tenantId, boolean isSmall) throws Exception {
        List<MetaAccountIdType> listMetaAccountIdTypes = (List<MetaAccountIdType>)WebCacheWrapper.getValue("metaDataAccountIdTypeCache", tenantId);
        for (MetaAccountIdType metaAccountIdType : listMetaAccountIdTypes) {
            if (accountIdTypes.get(metaAccountIdType.getCode()) != null) {
                accountIdTypes.put(metaAccountIdType.getCode(), metaAccountIdType.getCrowdIcon());
            }
        }
        ObjectMapper om = new ObjectMapper();
        List<DicItem> dicItems = (List<DicItem>)WebCacheWrapper.getValue("dicItemCache", "ACCOUNT_ID_TYPE_ICON");
        Map<String, String> map = new HashMap<String, String>();
        for (DicItem dicItem : dicItems) {
            Map<String, String> mapData = (Map<String, String>)om.readValue(dicItem.getDicItemValue(), (Class)Map.class);
            if (isSmall) {
                map.put(dicItem.getDicItemKey(), mapData.get("small"));
            }
            else {
                map.put(dicItem.getDicItemKey(), mapData.get("big"));
            }
        }
        for (Map.Entry<String, String> entry : accountIdTypes.entrySet()) {
            if (map.get(entry.getValue()) != null) {
                accountIdTypes.put(entry.getKey(), map.get(entry.getValue()));
            }
        }
    }
}