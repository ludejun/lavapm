/*package com.dmp.core.controller.campaign;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import lavapm.enterprise.dmp.common.DictConstants;
import lavapm.enterprise.dmp.core.entity.campaign.DspLaunch;
import lavapm.enterprise.dmp.core.entity.crowd.MarketingEffectTrack;
import lavapm.enterprise.dmp.core.entity.tag.ConversionEvent;
import lavapm.enterprise.dmp.core.page.campaign.DspLaunchPage;
import lavapm.enterprise.dmp.core.page.tag.ConversionEventPage;
import lavapm.enterprise.dmp.core.service.campaign.DspLaunchService;
import lavapm.enterprise.dmp.core.service.crowd.MarketingActivityService;
import lavapm.enterprise.dmp.core.service.tag.ConversionEventService;
import td.enterprise.console.core.entity.admin.DicItemColl;
import td.enterprise.console.core.service.admin.DicService;
import td.enterprise.dmp.base.web.BaseController;
import td.olap.query.MarketingTrackingQueryer;

@Controller
@RequestMapping({ "/campaign" })
public class MarketingEffectTrackingController extends BaseController
{
    public static final Logger logger = Logger.getLogger(MarketingEffectTrackingController.class);
    @Autowired
    private ConversionEventService conversionEventService;
    @Autowired
    private MarketingActivityService marketingActivityService;
    @Autowired
    private DicService dicService;
    @Autowired
    private DspLaunchService dspLaunchService;
    
    @RequestMapping(value = { "/mktEffectTrack/conversion/event/selectable" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryConversionEvent(String keywords,String type, Integer rows) throws Exception {
        ConversionEventPage page = new ConversionEventPage();
        page.setType(type);
        page.setRows(rows);
        List<ConversionEvent> eventList = conversionEventService.queryByList(page);
        return getGridData(page.getPager().getRowCount(), eventList);
    }
    
    @RequestMapping(value = { "/mktEffectTrack/activity/count" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Integer> queryMarketingEffectSurvey() throws Exception {
        return marketingActivityService.queryMarketingActivitySum();
    }
    
    @Deprecated
    public Map<String, Object> queryMarketingEffectTrack_bak(DspLaunchPage page) throws Exception {
        logger.debug("@@@@@@@@@@@@@=" + page);
        String startDay = DateFormatUtils.format(Long.valueOf(page.getReqStartDate()), "yyyyMMdd");
        String endDay = DateFormatUtils.format(Long.valueOf(page.getReqEndDate()), "yyyyMMdd");
        Map<String, Object> resultMap = marketingActivityService.queryMarketingEffectTrack(page);
        List<MarketingEffectTrack> effectList = (List)resultMap.get("marketingEffectList");
//        List<DicItemColl> dicItemCollList = dicService.queryDicItemCollByDicName("MARKETING_EFFECT_COUNT");
        for (MarketingEffectTrack effectTrack : effectList) {
            Map<String, Object> graphMap = new HashMap<String, Object>();
            Map<String, Object> graphClickDataMap = new HashMap<String, Object>();
            List<Map<String, Object>> graphDataList = new ArrayList<Map<String, Object>>();
            String batchNo = effectTrack.getBatchNo();
            Integer lanuchId = Integer.valueOf(effectTrack.getId());
            Map<String, Map<String, List<?>>> result = queryMktTrackCurveData(DictConstants.MARKETING_EFFECT_CLICK_TYPE, batchNo, startDay, endDay, effectTrack.getCrowdConversionIds(), effectTrack.getCrowdConversionEventId(), lanuchId);
            Map<String, List<?>> resultEvent = result.get("event");
            Map<String, List<?>> resultConversion = result.get("conversion");
            graphClickDataMap.put("name", "点击");
            graphClickDataMap.put("data", resultEvent.get("values"));
            graphDataList.add(graphClickDataMap);
            Map<String, Object> graphConverDataMap = new HashMap<String, Object>();
            graphConverDataMap.put("name", "转化");
            graphConverDataMap.put("data", resultConversion.get("values"));
            graphDataList.add(graphConverDataMap);
            graphMap.put("series", graphDataList);
            graphMap.put("categories", resultEvent.get("keys"));
            effectTrack.setData(graphMap);
            Map<String, Integer> sumarryMap = new HashMap<String, Integer>();
//            String indexValue = "";
//            String indexKey = "";
            Integer sum = (effectTrack.getSum() == null) ? 0 : effectTrack.getSum();
            sumarryMap.put("translate", queryConversionCount(effectTrack.getCrowdConversionIds(), effectTrack.getCrowdConversionEventId(), startDay, endDay, lanuchId));
            sumarryMap.put("touch", queryEventCount(DictConstants.MARKETING_EFFECT_TOUCH_TYPE, batchNo, startDay, endDay, lanuchId));
            sumarryMap.put("click", queryEventCount(DictConstants.MARKETING_EFFECT_CLICK_TYPE, batchNo, startDay, endDay, lanuchId));
            if (sum > 0) {
                Integer tmpCount = 0;
                for (Map.Entry<String, Integer> entry : sumarryMap.entrySet()) {
                    if (!entry.getKey().equals("sum")) {
                        tmpCount = entry.getValue();
                        sumarryMap.put(entry.getKey(), tmpCount * 100 / sum);
                    }
                }
            }
            sumarryMap.put("sum", sum);
            effectTrack.setSumarry(sumarryMap);
        }
        return resultMap;
    }
    
    @RequestMapping(value = { "/mktEffectTrack/marketingReachDesc" }, method = { RequestMethod.GET })
    @ResponseBody
    public Map<String, Object> queryMarketingEffectTrack(DspLaunchPage page) throws Exception {
        String startDay = DateFormatUtils.format(Long.valueOf(page.getReqStartDate()), "yyyyMMdd");
        String endDay = DateFormatUtils.format(Long.valueOf(page.getReqEndDate()), "yyyyMMdd");
        Map<String, Object> resultMap = marketingActivityService.queryMarketingEffectTrack(page);
        List<MarketingEffectTrack> effectList = (List<MarketingEffectTrack>) resultMap.get("marketingEffectList");
        for (MarketingEffectTrack effectTrack : effectList) {
            Map<String, Object> graphMap = new HashMap<String, Object>();
            Map<String, Object> graphClickDataMap = new HashMap<String, Object>();
            List<Map<String, Object>> graphDataList = new ArrayList<Map<String, Object>>();
            String batchNo = effectTrack.getBatchNo();
            Integer lanuchId = Integer.valueOf(effectTrack.getId());
            Map<String, Map<String, List<?>>> result = queryMktTrackCurveData(DictConstants.MARKETING_EFFECT_CLICK_TYPE, batchNo, startDay, endDay, effectTrack.getCrowdConversionIds(), effectTrack.getCrowdConversionEventId(), lanuchId);
            Map<String, List<?>> resultEvent = result.get("event");
            Map<String, List<?>> resultConversion = result.get("conversion");
            graphClickDataMap.put("name", "点击");
            graphClickDataMap.put("data", resultEvent.get("values"));
            graphDataList.add(graphClickDataMap);
            Map<String, Object> graphConverDataMap = new HashMap<String, Object>();
            graphConverDataMap.put("name", "转化");
            graphConverDataMap.put("data", resultConversion.get("values"));
            graphDataList.add(graphConverDataMap);
            graphMap.put("series", graphDataList);
            graphMap.put("categories", resultEvent.get("keys"));
            effectTrack.setData((Map)graphMap);
            Map<String, Integer> sumarryMap = new HashMap<String, Integer>();
            Integer sum = (effectTrack.getSum() == null) ? 0 : effectTrack.getSum();
            sumarryMap.put("translate", queryConversionCount(effectTrack.getCrowdConversionIds(), effectTrack.getCrowdConversionEventId(), startDay, endDay, lanuchId));
            sumarryMap.put("touch", queryEventCount(DictConstants.MARKETING_EFFECT_TOUCH_TYPE, batchNo, startDay, endDay, lanuchId));
            sumarryMap.put("click", queryEventCount(DictConstants.MARKETING_EFFECT_CLICK_TYPE, batchNo, startDay, endDay, lanuchId));
            if (sum > 0) {
                Integer tmpCount = 0;
                for (Map.Entry<String, Integer> entry : sumarryMap.entrySet()) {
                    if (!entry.getKey().equals("sum")) {
                        tmpCount = entry.getValue();
                        sumarryMap.put(entry.getKey(), tmpCount * 100 / sum);
                    }
                }
            }
            sumarryMap.put("sum", sum);
            effectTrack.setSumarry(sumarryMap);
        }
        logger.debug("EffectTrack = resultMap : " + resultMap);
        return resultMap;
    }
    
    @RequestMapping(value = { "/mktEffectTrack/marketing/funnel/info" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> queryMarketingFunnelDatas(@RequestBody Map<String, Object> params) throws Exception {
        logger.debug("&&&&&&&&&&&&&& param = " + params);
        Map<String, Object> returnMap = queryFunnel(params);
        logger.debug("&&&&&&&&&&&&&& " + returnMap);
        return returnMap;
    }
    
    @RequestMapping(value = { "/mktEffectTrack/conversion/saveup" }, method = { RequestMethod.POST })
    @ResponseBody
    public Map<String, Object> saveConversionEvent(@RequestBody List<ConversionEvent> conversionEvents, String crowdId) throws Exception {
        DspLaunch dspLaunch = dspLaunchService.selectByPrimaryKey(crowdId);
        if (dspLaunch != null) {
            if (conversionEvents != null && conversionEvents.size() > 0) {
                String conversionIds = "";
                String conversionEventId = "";
                String conversionIdType = "";
                for (ConversionEvent conversionEvent : conversionEvents) {
                    if (conversionEvent.getType().equals("1")) {
                        conversionIds = conversionIds + "," + conversionEvent.getEventId();
                    }
                    else if (conversionEvent.getType().equals("2")) {
                        conversionEventId = conversionEventId + "," + conversionEvent.getEventId();
                    }
                    else {
                        if (!conversionEvent.getType().equals("3")) {
                            continue;
                        }
                        conversionIdType = conversionIdType + "," + conversionEvent.getEventId();
                    }
                }
                if (conversionIds.indexOf(",") > -1) {
                    conversionIds = conversionIds.substring(conversionIds.indexOf(",") + 1);
                }
                if (conversionEventId.indexOf(",") > -1) {
                    conversionEventId = conversionEventId.substring(conversionEventId.indexOf(",") + 1);
                }
                if (conversionIdType.indexOf(",") > -1) {
                    conversionIdType = conversionIdType.substring(conversionEventId.indexOf(",") + 1);
                }
                dspLaunch.setConversionIds(conversionIds);
                dspLaunch.setConversionEventId(conversionEventId);
                dspLaunch.setConversionIdType(conversionIdType);
            }
            dspLaunchService.updateByPrimaryKeySelective(dspLaunch);
        }
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("success", true);
        return resultMap;
    }
    
    private Map<String, Map<String, List<?>>> queryMktTrackCurveData(Integer type, String batchNo, String startDay, String endDay, String pageId, String eventId, Integer lanuchId) {
        Map<String, Map<String, List<?>>> result = new HashMap<String, Map<String, List<?>>>();
        MarketingTrackingQueryer mq = MarketingTrackingQueryer.getInstance();
        Map<String, List<?>> resultEvent = mq.queryEvent(type, batchNo, startDay, endDay, lanuchId);
        Map<String, List<?>> resultConversion = mq.queryConversion(pageId, eventId, startDay, endDay, lanuchId);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            logger.debug(objectMapper.writeValueAsString(resultEvent));
            logger.debug(objectMapper.writeValueAsString(resultConversion));
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        result.put("event", resultEvent);
        result.put("conversion", resultConversion);
        return result;
    }
    
    private Integer queryEventCount(Integer type, String batchNo, String startDay, String endDay, Integer lanuchId) {
        MarketingTrackingQueryer mq = MarketingTrackingQueryer.getInstance();
        Integer count = mq.queryEventCount(type, batchNo, startDay, endDay, lanuchId);
        return count;
    }
    
    private Integer queryConversionCount(String pageId, String eventId, String startDay, String endDay, Integer lanuchId) {
        MarketingTrackingQueryer mq = MarketingTrackingQueryer.getInstance();
        Integer count = mq.queryConversionCount(pageId, eventId, startDay, endDay, lanuchId);
        return count;
    }
    
    public Map<String, Object> queryFunnel(Map<String, Object> params) throws Exception {
        logger.warn("调用queryserice获取漏斗数据 : " + params);
        String dspLaunchId = (String) params.get("crowdId");
        String startDay = "";
        String endDay = "";
        if (params.get("startDate") != null && !params.get("startDate").toString().trim().equals("") && params.get("endDate") != null && !params.get("endDate").toString().trim().equals("")) {
            startDay = DateFormatUtils.format(Long.valueOf(params.get("startDate").toString()), "yyyyMMdd");
            endDay = DateFormatUtils.format(Long.valueOf(params.get("endDate").toString()), "yyyyMMdd");
        }
        DspLaunch dspLaunch = dspLaunchService.selectByPrimaryKey(dspLaunchId);
        String conversionIds = dspLaunch.getConversionIds();
        String conversionEventId = dspLaunch.getConversionEventId();
        String conversionIdType = dspLaunch.getConversionIdType();
        List<DicItemColl> dicItemCollList = dicService.queryDicItemCollByDicName("MARKETING_FUNNEL_ELEMENT");
        List<DicItemColl> dicItemCountList = dicService.queryDicItemCollByDicName("MARKETING_EFFECT_COUNT");
        MarketingTrackingQueryer mq = MarketingTrackingQueryer.getInstance();
        String indexValue = "";
        String indexKey = "";
        Integer sum = (dspLaunch.getLaunchCount() == null) ? 0 : dspLaunch.getLaunchCount();
        Map<String, Integer> sumarryMap = new HashMap<String, Integer>();
        Map<String, Integer> countMap = new HashMap<String, Integer>();
        for (int i = 0; i < dicItemCountList.size(); ++i) {
            indexValue = dicItemCountList.get(i).getDicItemValue();
            indexKey = dicItemCountList.get(i).getDicItemKey();
            if (indexValue.equals("translate")) {
                sumarryMap.put(indexValue, mq.queryConversionCount(conversionIds, conversionEventId, startDay, endDay, Integer.valueOf(dspLaunchId)));
            }
            else if (indexValue.equals("click")) {
                sumarryMap.put(indexValue, mq.queryEventCount(Integer.valueOf(indexKey), dspLaunch.getBatchNo(), startDay, endDay, Integer.valueOf(dspLaunchId)));
            }
            else if (indexValue.equals("touch")) {
                sumarryMap.put(indexValue, mq.queryEventCount(Integer.valueOf(indexKey), dspLaunch.getBatchNo(), startDay, endDay, Integer.valueOf(dspLaunchId)));
            }
            countMap.put(indexValue, sumarryMap.get(indexValue));
        }
        sumarryMap.put("sum", sum);
        countMap.put("sum", sum);
        if (sum > 0) {
            Integer tmpCount = 0;
            for (Map.Entry<String, Integer> entry : sumarryMap.entrySet()) {
                logger.debug("key= " + entry.getKey() + " and value= " + entry.getValue());
                tmpCount = entry.getValue();
                sumarryMap.put(entry.getKey(), tmpCount * 100 / sum);
            }
        }
        Map<String, Object> results = new HashMap<String, Object>();
        List<String> legend = new ArrayList<String>(dicItemCollList.size());
        List<Map<String, String>> expect = new ArrayList<Map<String, String>>();
        List<Map<String, String>> actual = new ArrayList<Map<String, String>>();
        List<Map<String, String>> count = new ArrayList<Map<String, String>>();
        String funnelEleName = "";
        String funnelEleKey = "";
        for (int j = 0; j < dicItemCollList.size(); ++j) {
            funnelEleName = dicItemCollList.get(j).getDicItemValue();
            funnelEleKey = dicItemCollList.get(j).getDicItemKey();
            legend.add(funnelEleName);
            Map<String, String> actualMap = new HashMap<String, String>();
            actualMap.put("value", sumarryMap.get(funnelEleKey).toString());
            actualMap.put("name", funnelEleName);
            actual.add(actualMap);
            Map<String, String> pageShowCount = new HashMap<String, String>();
            pageShowCount.put("value", countMap.get(funnelEleKey).toString());
            pageShowCount.put("name", funnelEleName);
            count.add(pageShowCount);
        }
        results.put("legend", legend);
        results.put("expect", expect);
        results.put("actual", actual);
        results.put("count", count);
        List<ConversionEvent> conversionEventList = new ArrayList<ConversionEvent>();
        conversionEventList.addAll(getConversionEvents(conversionIds, "1"));
        conversionEventList.addAll(getConversionEvents(conversionEventId, "2"));
        conversionEventList.addAll(getConversionEvents(conversionIdType, "3"));
        results.put("conversions", conversionEventList);
        return results;
    }
    
    private List<ConversionEvent> getConversionEvents(String eventIds,String type) {
        List<ConversionEvent> tmpIdList = new ArrayList<ConversionEvent>();
        if (StringUtils.isNotBlank(eventIds)) {
            Map<String, Object> conversionMap = new HashMap<String, Object>();
            conversionMap.put("type", type);
            conversionMap.put("ids", conversionStr2List(eventIds));
            tmpIdList = conversionEventService.queryByMap(conversionMap);
        }
        return tmpIdList;
    }
    
    private List<String> conversionStr2List(String conversions) {
        List<String> tmpIdList = new ArrayList<String>();
        if (StringUtils.isNotBlank(conversions)) {
            String[] split = conversions.split(",");
            for (String eventId : split) {
                tmpIdList.add(eventId);
            }
        }
        return tmpIdList;
    }
}
*/