package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
import com.lavapm.tenant.bean.PartnerLineStat;
import com.lavapm.tenant.bean.PartnerStat;
import com.lavapm.tenant.bean.PieBean;
import com.lavapm.tenant.tool.Algorithm;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;











public class PartnerStatFrame
{
  public PartnerStatFrame() {}
  
  public String getTopParInfo(List<PieBean> pielist, long allSumnewuser, int pageflag)
  {
    String info = "";
    PieFrame pieFrame = new PieFrame();
    String pieinfobuffer = pieFrame.getpieStrinfo(pielist, allSumnewuser, pageflag);
    List<PieBean> tmpPieList = pieFrame.getpieinfo(pielist, allSumnewuser);
    Map<String, Object> map = new HashMap();
    
    map.put("pieinfo", tmpPieList);
    map.put("piegridinfo", pieinfobuffer);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  


















  public String getpartnerFrame(List<PartnerStat> listPartnerStat, List<PartnerLineStat> parLineListStat, long timepartner, long allpartner, int cday, Timestamp fDate, Timestamp eDate, int endtime)
  {
    String info = "";
    String tmpvalue = "";
    PartnerStat parStat = null;
    StringBuffer partnerbuffer = new StringBuffer();
    StringBuffer partneravgbuffer = new StringBuffer();
    float percentallnewuser = 0.0F;
    float percenttimenewuser = 0.0F;
    


    DecimalFormat df = new DecimalFormat("##.00");
    int cdy = 0;
    if (listPartnerStat != null) {
      for (int i = 0; i < listPartnerStat.size(); i++) {
        parStat = (PartnerStat)listPartnerStat.get(i);
        percenttimenewuser = Util.getPercentage(Float.valueOf(parStat.getNewuser()), Float.valueOf((float)timepartner), ConstString.DECIMALFLAGTWO);
        

        percentallnewuser = Util.getPercentage(Float.valueOf(parStat.getAllnewuser()), Float.valueOf((float)allpartner), ConstString.DECIMALFLAGTWO);
        

        percenttimenewuser = Float.parseFloat(df.format(percenttimenewuser));
        
        percentallnewuser = Float.parseFloat(df.format(percentallnewuser));
        
        tmpvalue = parStat.getPartnername() + "," + parStat.getTodaynewuser() + "," + parStat.getTodayactiveuser() + "," + parStat.getYesterdaynewuser() + "," + parStat.getYesterdayactiveuser() + "," + parStat.getNewuser() + "(" + percenttimenewuser + "%)," + parStat.getAllnewuser() + "(" + percentallnewuser + "%)," + parStat.getPartnerid() + "," + parStat.getPartnerid() + "," + parStat.getPartnerid();
        








        if (i < listPartnerStat.size() - 1) {
          partnerbuffer.append(tmpvalue + "&");
        } else {
          partnerbuffer.append(tmpvalue);
        }
        cdy = Util.getIntervalDays(parStat.getMintimeflag(), endtime);
        int tmpcdy = 0;
        if (cdy > cday) {
          tmpcdy = cday;
        } else {
          tmpcdy = cdy;
        }
        if (tmpcdy < 0) {
          tmpcdy = 0;
        }
        float newuseravg = Util.getAvg(Integer.valueOf(parStat.getNewuser()), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
        
        float activeuseravg = Util.getAvg(Integer.valueOf(parStat.getActiveuser()), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO);
        
        String usetimeavg = Util.floatToTime(Util.getAvg(Integer.valueOf(parStat.getUsetime()), Integer.valueOf(tmpcdy), ConstString.DECIMALFLAGTWO));
        

        tmpvalue = parStat.getPartnername() + "," + newuseravg + "," + activeuseravg + "," + usetimeavg + "," + percenttimenewuser + "%";
        

        if (i < listPartnerStat.size() - 1) {
          partneravgbuffer.append(tmpvalue + "&");
        } else {
          partneravgbuffer.append(tmpvalue);
        }
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("parlineinfo", parLineListStat);
    map.put("partnerinfo", partnerbuffer.toString());
    map.put("partneravginfo", partneravgbuffer.toString());
    map.put("cday", Integer.valueOf(cday));
    map.put("strStartDate", Util.getTimeToStr(fDate));
    
    map.put("strENDDate", Util.getTimeToStr(eDate));
    try
    {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  












  public List<Integer> getParLineList(int cday, List listInfo, Timestamp fDate, Timestamp eDate, int tmpetype)
  {
    ArrayList<Integer> parLineList = new ArrayList();
    Hashtable<String, Integer> tab = new Hashtable();
    SimpleDateFormat timeflag = null;
    Daydata dayData = null;
    Hourdata hourdata = null;
    String strTimeflag = "";
    
    int rowSize = 0;
    int type = 0;
    
    if ((cday > 0) && (cday <= 1)) {
      rowSize = 24;
      type = 1;

    }
    else
    {

      rowSize = cday;
      
      type = 2;
    }
    timeflag = new SimpleDateFormat(ConstString.INTTIME);
    Calendar cal = null;
    
    for (int i = 0; i < rowSize; i++) {
      if (rowSize < cday)
      {
        dayData = (Daydata)listInfo.get(i);
        strTimeflag = String.valueOf(dayData.getTimeflag());
      }
      else {
        cal = Calendar.getInstance();
        cal.setTimeInMillis(fDate.getTime());
        if (type == 1) {
          cal.set(11, i);
        } else {
          cal.add(5, i);
        }
        strTimeflag = timeflag.format(cal.getTime());
      }
      parLineList.add(null);
      tab.put(strTimeflag, Integer.valueOf(i));
    }
    int listKey = 0;
    int oldtimeflag = 0;
    
    for (int j = 0; j < listInfo.size(); j++) {
      if (type == 1) {
        hourdata = (Hourdata)listInfo.get(j);
        if (tab.get(String.valueOf(hourdata.getTimeflag())) == null) continue;
        listKey = ((Integer)tab.get(String.valueOf(hourdata.getTimeflag()))).intValue();
        


        switch (tmpetype) {
        case 0: 
          parLineList.set(listKey, Integer.valueOf(hourdata.getHnewuser()));
          break;
        case 1: 
          parLineList.set(listKey, Integer.valueOf(hourdata.getHactiveuser()));
          break;
        case 2: 
          parLineList.set(listKey, Integer.valueOf(hourdata.getHstartup()));
          break;
        default: 
          parLineList.set(listKey, Integer.valueOf(hourdata.getHnewuser()));
          break;
        }
      } else {
        dayData = (Daydata)listInfo.get(j);
        if (tab.get(String.valueOf(dayData.getTimeflag())) == null) continue;
        listKey = ((Integer)tab.get(String.valueOf(dayData.getTimeflag()))).intValue();
        


        switch (tmpetype) {
        case 0: 
          parLineList.set(listKey, Integer.valueOf(dayData.getDnewuser()));
          break;
        case 1: 
          parLineList.set(listKey, Integer.valueOf(dayData.getDactiveuser()));
          break;
        case 2: 
          parLineList.set(listKey, Integer.valueOf(dayData.getDstartup()));
          break;
        default: 
          parLineList.set(listKey, Integer.valueOf(dayData.getDnewuser()));
        }
        
      }
      
      if (oldtimeflag != 0) {
        int tmpvalue = 0;
        int tmpkey = 0;
        tmpvalue = listKey - oldtimeflag;
        for (int tmpfalg = -1; tmpfalg > tmpvalue; tmpfalg--) {
          tmpkey = oldtimeflag + tmpfalg;
          parLineList.set(tmpkey, Integer.valueOf(0));
        }
      }
      oldtimeflag = listKey;
    }
    if (parLineList.size() > 30) {
      parLineList = Algorithm.aggregation(parLineList);
    }
    return parLineList;
  }
}
