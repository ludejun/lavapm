package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
import com.lavapm.tenant.bean.SummarizeBase;
import com.lavapm.tenant.bean.SummarizeBean;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;



public class SummarizeFrame
{
  Daydata dayData = null;
  Hourdata hourdata = null;
  








  public SummarizeFrame() {}
  







  public String getSummarize(List<Daydata> ydayDataList, List<Hourdata> ydayHourDataList, List<Hourdata> yydayHourDataList, List<Hourdata> ywdayHourDataList, List<Hourdata> ymdayHourDataList, List<Hourdata> tdayHourDataList, List<Hourdata> twdayHourDataList, List<Hourdata> tmdayHourDataList, Timestamp tfDate, List<SummarizeBean> summarizeBeanList, SummarizeBase summarizeBase)
  {
    int rowSize = 24;
    String info = "";
    SimpleDateFormat edf = new SimpleDateFormat(ConstString.HOURFRAME);
    ArrayList<Integer> thnewuserlist = new ArrayList();
    ArrayList<Integer> twhnewuserlist = new ArrayList();
    ArrayList<Integer> tmhnewuserlist = new ArrayList();
    ArrayList<Integer> yhnewuserlist = new ArrayList();
    ArrayList<Integer> yyhnewuserlist = new ArrayList();
    ArrayList<Integer> ywhnewuserlist = new ArrayList();
    ArrayList<Integer> ymhnewuserlist = new ArrayList();
    ArrayList<Integer> tstartuplist = new ArrayList();
    ArrayList<Integer> twstartuplist = new ArrayList();
    ArrayList<Integer> tmstartuplist = new ArrayList();
    ArrayList<Integer> ystartuplist = new ArrayList();
    ArrayList<Integer> yystartuplist = new ArrayList();
    ArrayList<Integer> ywstartuplist = new ArrayList();
    ArrayList<Integer> ymstartuplist = new ArrayList();
    
    Hashtable<String, Integer> tab = new Hashtable();
    Calendar cal = null;
    String xData = "";
    
    for (int i = 0; i < rowSize; i++) {
      cal = Calendar.getInstance();
      cal.setTimeInMillis(tfDate.getTime());
      cal.set(11, i);
      
      thnewuserlist.add(null);
      twhnewuserlist.add(null);
      tmhnewuserlist.add(null);
      yhnewuserlist.add(null);
      yyhnewuserlist.add(null);
      ywhnewuserlist.add(null);
      ymhnewuserlist.add(null);
      tstartuplist.add(null);
      twstartuplist.add(null);
      tmstartuplist.add(null);
      ystartuplist.add(null);
      yystartuplist.add(null);
      ywstartuplist.add(null);
      ymstartuplist.add(null);
      xData = edf.format(cal.getTime());
      tab.put(xData, Integer.valueOf(i));
    }
    
    Map<String, Object> map = new HashMap();
    
    getSummarizeLine(tdayHourDataList, tab, 0, thnewuserlist);
    map.put("thnewuserlist", thnewuserlist);
    getSummarizeLine(twdayHourDataList, tab, 0, twhnewuserlist);
    map.put("twhnewuserlist", twhnewuserlist);
    getSummarizeLine(tmdayHourDataList, tab, 0, tmhnewuserlist);
    map.put("tmhnewuserlist", tmhnewuserlist);
    getSummarizeLine(ydayHourDataList, tab, 0, yhnewuserlist);
    map.put("yhnewuserlist", yhnewuserlist);
    getSummarizeLine(yydayHourDataList, tab, 0, yyhnewuserlist);
    map.put("yyhnewuserlist", yyhnewuserlist);
    getSummarizeLine(ywdayHourDataList, tab, 0, ywhnewuserlist);
    map.put("ywhnewuserlist", ywhnewuserlist);
    getSummarizeLine(ymdayHourDataList, tab, 0, ymhnewuserlist);
    map.put("ymhnewuserlist", ymhnewuserlist);
    
    getSummarizeLine(tdayHourDataList, tab, 1, tstartuplist);
    map.put("tstartuplist", tstartuplist);
    getSummarizeLine(twdayHourDataList, tab, 1, twstartuplist);
    map.put("twstartuplist", twstartuplist);
    getSummarizeLine(tmdayHourDataList, tab, 1, tmstartuplist);
    map.put("tmstartuplist", tmstartuplist);
    getSummarizeLine(ydayHourDataList, tab, 1, ystartuplist);
    map.put("ystartuplist", ystartuplist);
    getSummarizeLine(yydayHourDataList, tab, 1, yystartuplist);
    map.put("yystartuplist", yystartuplist);
    getSummarizeLine(ywdayHourDataList, tab, 1, ywstartuplist);
    map.put("ywstartuplist", ywstartuplist);
    getSummarizeLine(ymdayHourDataList, tab, 1, ymstartuplist);
    map.put("ymstartuplist", ymstartuplist);
    String gridInfo = getSummarize(ydayDataList);
    String gridSummarizeBean = getSummarizeBeanInfo(summarizeBeanList);
    String gridSummarizeBase = "";
    if (summarizeBase != null) {
      gridSummarizeBase = summarizeBase.getAllnewser() + ",--," + summarizeBase.getAllstartup() + "," + (int)summarizeBase.getYsactiveuser() + " (" + summarizeBase.getPysactiveuser() + "%)," + (int)summarizeBase.getYtactiveuser() + " (" + summarizeBase.getPytactiveuser() + "%)," + summarizeBase.getPsilentuser() + "%";
    }
    


    map.put("gridSummarizeBean", gridSummarizeBean);
    map.put("gridSummarizeBase", gridSummarizeBase);
    map.put("tableinfo", gridInfo);
    map.put("strStartDate", Util.getTimeToStr(tfDate));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  




  public String getSummarizeBeanInfo(List<SummarizeBean> summarizeBeanList)
  {
    String info = "";
    if (summarizeBeanList == null) {
      return "";
    }
    SummarizeBean summarizeBean = null;
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    String newusertime = "";
    String activeusertime = "";
    for (int i = 0; i < summarizeBeanList.size(); i++) {
      summarizeBean = (SummarizeBean)summarizeBeanList.get(i);
      if (summarizeBean != null) {
        if (summarizeBean.getNewusertime() != -1) {
          newusertime = "(test)";
        } else {
          newusertime = "";
        }
        if (summarizeBean.getActiveusertime() != -1) {
          activeusertime = "(test)";
        } else {
          activeusertime = "";
        }
        if (summarizeBean.getName().equals("历史最高")) {
          tmpvalue = summarizeBean.getName() + "," + summarizeBean.getMaxnewuser() + "," + summarizeBean.getMaxactiveuser() + ",--,--,--," + summarizeBean.getPactiveuser() + "%" + activeusertime;

        }
        else if ((summarizeBean.getName().equals("今日")) || (summarizeBean.getName().equals("昨日此时"))) {
          tmpvalue = summarizeBean.getName() + "," + summarizeBean.getNewuser() + newusertime + "," + summarizeBean.getActiveuser() + activeusertime + "," + summarizeBean.getPewuser() + "%," + summarizeBean.getAvgstartup() + "," + summarizeBean.getAvgusetime() + ",--";
        }
        else
        {
          tmpvalue = summarizeBean.getName() + "," + summarizeBean.getNewuser() + newusertime + "," + summarizeBean.getActiveuser() + activeusertime + "," + summarizeBean.getPewuser() + "%," + summarizeBean.getAvgstartup() + "," + summarizeBean.getAvgusetime() + "," + summarizeBean.getPactiveuser() + "%" + activeusertime;
        }
        


        if (i < summarizeBeanList.size() - 1) {
          sbuffer.append(tmpvalue + "&");
        } else {
          sbuffer.append(tmpvalue);
        }
      }
    }
    info = sbuffer.toString();
    return info;
  }
  








  public void getSummarizeLine(List listInfo, Hashtable<String, Integer> tab, int type, ArrayList<Integer> tmplist)
  {
    if (listInfo != null) {
      int listKey = 0;
      String key = "";
      int oldtimeflag = 0;
      for (int i = 0; i < listInfo.size(); i++) {
        hourdata = ((Hourdata)listInfo.get(i));
        key = String.valueOf(hourdata.getTimeflag());
        key = key.substring(key.length() - 2, key.length());
        if (oldtimeflag != 0) {
          int tmpvalue = 0;
          int tmpkey = 0;
          tmpvalue = Util.strToInt(key) - oldtimeflag;
          for (int tmpfalg = -1; tmpfalg > tmpvalue; tmpfalg--) {
            tmpkey = oldtimeflag + tmpfalg;
            tmplist.set(tmpkey, Integer.valueOf(0));
          }
        }
        if (tab.get(key) != null) {
          listKey = ((Integer)tab.get(key)).intValue();
          


          if (type == 0) {
            tmplist.set(listKey, Integer.valueOf(hourdata.getHnewuser()));
          } else {
            tmplist.set(listKey, Integer.valueOf(hourdata.getHstartup()));
          }
          
          oldtimeflag = Util.strToInt(key);
        }
      }
    }
  }
  


  public String getSummarize(List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    float startupavg = 0.0F;
    float usertimeavg = 0.0F;
    float activeuserPercentage = 0.0F;
    float newuserPercentage = 0.0F;
    for (int i = 0; i < listInfo.size(); i++) {
      dayData = ((Daydata)listInfo.get(i));
      startupavg = Util.getAvg(Integer.valueOf(dayData.getDstartup()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      usertimeavg = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      activeuserPercentage = Util.getPercentage(Integer.valueOf(dayData.getDactiveuser()), Integer.valueOf(dayData.getSumnewuser()), ConstString.DECIMALFLAGTWO);
      newuserPercentage = Util.getPercentage(Integer.valueOf(dayData.getDnewuser()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      tmpvalue = dayData.getDnewuser() + "," + dayData.getDactiveuser() + "," + startupavg + "," + usertimeavg + "," + activeuserPercentage + "%," + newuserPercentage + "%";
      
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
}
