package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
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



public class HourDayFrame
{
  Daydata dayData = null;
  Hourdata hourdata = null;
  



  public HourDayFrame() {}
  


  public String getHourDayJson(int cday, List listInfo, List dlistInfo, Timestamp fDate, Timestamp eDate, int allnewusernum)
  {
    String info = "";
    Hashtable<String, Integer> tab = new Hashtable();
    SimpleDateFormat timeflag = null;
    String strTimeflag = "";
    int rowSize = 0;
    int type = 0;
    SimpleDateFormat edf;
    if ((cday > 0) && (cday <= 1)) {
      rowSize = 24;
      type = 1;
      edf = new SimpleDateFormat(ConstString.STATHOURFRAME);




    }
    else
    {



      rowSize = cday;
      
      type = 2;
      edf = new SimpleDateFormat(ConstString.STATDAYFRAME);
    }
    timeflag = new SimpleDateFormat(ConstString.INTTIME);
    Calendar cal = null;
    String xData = "";
    ArrayList columneylist = new ArrayList();
    ArrayList<Integer> hnewuserlist = new ArrayList();
    ArrayList<Integer> dnewuserlist = new ArrayList();
    ArrayList<Integer> hactiveuserlist = new ArrayList();
    ArrayList<Integer> avgtimelist = new ArrayList();
    ArrayList<Integer> sumstartuplist = new ArrayList();
    ArrayList<Integer> sumnewuserlist = new ArrayList();
    
    for (int i = 0; i < rowSize; i++)
    {












      cal = Calendar.getInstance();
      cal.setTimeInMillis(fDate.getTime());
      if (type == 1) {
        cal.set(11, i);
        hnewuserlist.add(null);
        
        if (i % 8 == 0) {
          dnewuserlist.add(null);
          hactiveuserlist.add(null);
          avgtimelist.add(null);
          sumnewuserlist.add(null);
        }
        sumstartuplist.add(null);
      } else {
        cal.add(5, i);
        hnewuserlist.add(null);
        dnewuserlist.add(null);
        hactiveuserlist.add(null);
        avgtimelist.add(null);
        sumstartuplist.add(null);
        sumnewuserlist.add(null);
      }
      xData = edf.format(cal.getTime());
      strTimeflag = timeflag.format(cal.getTime());
      columneylist.add(xData);
      
      tab.put(strTimeflag, Integer.valueOf(i));
    }
    
    Map<String, Object> map = new HashMap();
    map.put("columnkeys", columneylist);
    int listKey = 0;
    
    String gridInfo = "";
    int sumnewuserNum = 0;
    int statime = 0;
    int usernum = 0;
    int oldtimeflag = 0;
    if ((dlistInfo != null) && (dlistInfo.size() > 0)) {
      for (int j = listInfo.size() - 1; j >= 0; j--) {
        if (type == 1) {
          hourdata = ((Hourdata)listInfo.get(j));
          if (j == 0) {
            statime = hourdata.getTimeflag();
          }
          dayData = ((Daydata)dlistInfo.get(0));
          if (tab.get(String.valueOf(hourdata.getTimeflag())) != null) {
            listKey = ((Integer)tab.get(String.valueOf(hourdata.getTimeflag()))).intValue();
            



            if (j == listInfo.size() - 1) {
              oldtimeflag = listKey;
            }
            
            int tmpvalue = 0;
            int tmpkey = 0;
            tmpvalue = oldtimeflag - listKey;
            for (int tmpfalg = -1; tmpfalg > tmpvalue; tmpfalg--) {
              tmpkey = oldtimeflag - tmpfalg;
              hnewuserlist.set(tmpkey, Integer.valueOf(0));
              sumstartuplist.set(tmpkey, Integer.valueOf(0));
            }
            
            hnewuserlist.set(listKey, Integer.valueOf(hourdata.getHnewuser()));
            sumnewuserNum += hourdata.getHnewuser();
            dnewuserlist.set(1, Integer.valueOf(dayData.getDnewuser()));
            usernum = dayData.getDactiveuser() - dayData.getDnewuser();
            if (usernum < 0) {
              usernum = 0;
            }
            hactiveuserlist.set(1, Integer.valueOf(usernum));
            avgtimelist.set(1, Integer.valueOf((int)Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDstartup()), ConstString.DECIMALFLAGTWO)));
            sumstartuplist.set(listKey, Integer.valueOf(hourdata.getHstartup()));
            if (j == listInfo.size() - 1) {
              allnewusernum += dayData.getDnewuser();
              sumnewuserlist.set(1, Integer.valueOf(allnewusernum));
              ((Daydata)dlistInfo.get(0)).setSumnewuser(allnewusernum);
            }
            oldtimeflag = listKey;
          }
        } else { dayData = ((Daydata)listInfo.get(j));
          if (j == 0) {
            statime = dayData.getTimeflag();
          }
          if (tab.get(String.valueOf(dayData.getTimeflag())) != null) {
            listKey = ((Integer)tab.get(String.valueOf(dayData.getTimeflag()))).intValue();
            



            if (j == listInfo.size() - 1) {
              oldtimeflag = listKey;
            }
            
            int tmpvalue = 0;
            int tmpkey = 0;
            tmpvalue = oldtimeflag - listKey;
            for (int tmpfalg = -1; tmpfalg > tmpvalue; tmpfalg--) {
              tmpkey = oldtimeflag - tmpfalg;
              hnewuserlist.set(tmpkey, Integer.valueOf(0));
              dnewuserlist.set(tmpkey, Integer.valueOf(0));
              hactiveuserlist.set(tmpkey, Integer.valueOf(0));
              avgtimelist.set(tmpkey, Integer.valueOf(0));
              sumstartuplist.set(tmpkey, Integer.valueOf(0));
              sumnewuserlist.set(tmpkey, Integer.valueOf(allnewusernum));
            }
            
            hnewuserlist.set(listKey, Integer.valueOf(dayData.getDnewuser()));
            sumnewuserNum += dayData.getDnewuser();
            dnewuserlist.set(listKey, Integer.valueOf(dayData.getDnewuser()));
            usernum = dayData.getDactiveuser() - dayData.getDnewuser();
            if (usernum < 0) {
              usernum = 0;
            }
            hactiveuserlist.set(listKey, Integer.valueOf(usernum));
            avgtimelist.set(listKey, Integer.valueOf((int)Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDstartup()), ConstString.DECIMALFLAGTWO)));
            sumstartuplist.set(listKey, Integer.valueOf(dayData.getSumstartup()));
            allnewusernum += dayData.getDnewuser();
            sumnewuserlist.set(listKey, Integer.valueOf(allnewusernum));
            ((Daydata)dlistInfo.get(j)).setSumnewuser(allnewusernum);
            oldtimeflag = listKey;
          }
        }
      }
    }
    




















    gridInfo = getGridInfo(type, dlistInfo);
    map.put("hnewuser", hnewuserlist);
    map.put("dnewuserlist", dnewuserlist);
    map.put("hactiveuser", hactiveuserlist);
    map.put("avgtime", avgtimelist);
    map.put("sumstartup", sumstartuplist);
    map.put("sumnewuser", sumnewuserlist);
    map.put("tableinfo", gridInfo);
    
    map.put("cday", Integer.valueOf(cday));
    
    map.put("strStartDate", Util.getTimeToStr(fDate));
    map.put("strENDDate", Util.getTimeToStr(eDate));
    map.put("sumnewuserNum", Integer.valueOf(sumnewuserNum));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  
  public String getGridInfoJson(int type, List listInfo) {
    String info = "";
    Map<String, Object> map = new HashMap();
    String gridInfo = getGridInfo(type, listInfo);
    map.put("tableinfo", gridInfo);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  






  public String getGridInfo(int type, List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    for (int i = 0; i < listInfo.size(); i++) {
      dayData = ((Daydata)listInfo.get(i));
      float avgusetime = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      tmpvalue = Util.timeIntToStr(dayData.getTimeflag(), type) + "," + dayData.getDnewuser() + "," + dayData.getDactiveuser() + "," + Util.floatToTime(avgusetime) + "," + dayData.getSumstartup() + "," + dayData.getSumnewuser();
      
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
}
