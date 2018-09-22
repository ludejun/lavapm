package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
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


public class PieFrame
{
  private GisInfoFrame gisFrame = null;
  private MobileFrame mobileFrame = null;
  private OsFrame osFrame = null;
  private PixelFrame pxFrame = null;
  private IspinInfoFrame isFrame = null;
  private Daydata dayData = null;
  private Hourdata hourdata = null;
  




  public PieFrame() {}
  




  public String getPieInfo(List<PieBean> newuserPie, List<PieBean> dactiveuserPie, Object infoObj, int allNewuser, int allDactiveuser, long allSumnewuser, int type, int pageflag)
  {
    String info = "";
    float newuseravg = 0.0F;
    PieBean newuserPieBean = null;
    PieBean wnewuserPieBean = null;
    List<PieBean> newuserTmpPie = new ArrayList();
    float dactiveuseravg = 0.0F;
    PieBean dactiveuserPieBean = null;
    List<PieBean> dactiveuserTmpPie = new ArrayList();
    StringBuffer newsuersbuffer = new StringBuffer();
    StringBuffer dactiveusersbuffer = new StringBuffer();
    String tmpvalue = "";
    String infocode = "&";
    
    if (pageflag == 1) {
      infocode = "#";
      for (int i = 0; i < 10; i++) {
        if (newuserPie.size() > i) {
          newuserPieBean = (PieBean)newuserPie.get(i);
          newuseravg = Util.getPercentage(Integer.valueOf((int)newuserPieBean.getY()), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
          if (!"默认".equals(newuserPieBean.getName())) {
            tmpvalue = newuserPieBean.getName() + "," + (int)newuserPieBean.getY() + "," + newuseravg + "%";
          } else {
            wnewuserPieBean = (PieBean)newuserPie.get(i);
            continue;
          }
          newuserPieBean.setY(newuseravg);
          newuserTmpPie.add(newuserPieBean);
        } else {
          tmpvalue = "&nbsp;,&nbsp;,&nbsp;";
        }
        if (i < 9) {
          if ((tmpvalue != null) && (!"".equals(tmpvalue))) {
            newsuersbuffer.append(tmpvalue + infocode);
          }
        } else {
          newsuersbuffer.append(tmpvalue);
        }
      }
    } else {
      for (int i = 0; i < newuserPie.size(); i++) {
        newuserPieBean = (PieBean)newuserPie.get(i);
        newuseravg = Util.getPercentage(Integer.valueOf((int)newuserPieBean.getY()), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
        if (!"默认".equals(newuserPieBean.getName())) {
          tmpvalue = newuserPieBean.getName() + "," + (int)newuserPieBean.getY() + "," + newuseravg + "%";
          if (i < newuserPie.size() - 1) {
            newsuersbuffer.append(tmpvalue + infocode);
          } else {
            newsuersbuffer.append(tmpvalue);
          }
        } else {
          wnewuserPieBean = (PieBean)newuserPie.get(i);
        }
        newuserPieBean.setY(newuseravg);
        newuserTmpPie.add(newuserPieBean);
      }
    }
    
    if ((newsuersbuffer != null) && (!newsuersbuffer.toString().equals("")) && 
      (newsuersbuffer.substring(newsuersbuffer.length() - 1, newsuersbuffer.length()).equals(infocode))) {
      newsuersbuffer.replace(newsuersbuffer.length() - 1, newsuersbuffer.length(), "");
    }
    

    if (wnewuserPieBean != null) {
      newuseravg = Util.getPercentage(Integer.valueOf((int)wnewuserPieBean.getY()), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
      tmpvalue = "未知," + (int)wnewuserPieBean.getY() + "," + newuseravg + "%";
      if ((newsuersbuffer != null) && (!"".equals(newsuersbuffer.toString()))) {
        newsuersbuffer.append(infocode + tmpvalue);
      } else {
        newsuersbuffer.append(tmpvalue);
      }
    }
    
    for (int j = 0; j < dactiveuserPie.size(); j++) {
      dactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
      dactiveuseravg = Util.getPercentage(Integer.valueOf((int)dactiveuserPieBean.getY()), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
      dactiveuserPieBean.setName(dactiveuserPieBean.getName());
      dactiveuserPieBean.setY(dactiveuseravg);
      dactiveuserTmpPie.add(dactiveuserPieBean);
      tmpvalue = dactiveuserPieBean.getName() + "," + dactiveuseravg + "%";
      if (j < dactiveuserPie.size() - 1) {
        dactiveusersbuffer.append(tmpvalue + "&");
      } else {
        dactiveusersbuffer.append(tmpvalue);
      }
    }
    String tableInfo = "";
    switch (type)
    {
    case 1: 
      gisFrame = new GisInfoFrame();
      tableInfo = gisFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 2: 
      mobileFrame = new MobileFrame();
      tableInfo = mobileFrame.getMobileinfo(infoObj, allSumnewuser);
      break;
    case 3: 
      osFrame = new OsFrame();
      tableInfo = osFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 4: 
      pxFrame = new PixelFrame();
      tableInfo = pxFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 5: 
      isFrame = new IspinInfoFrame();
      tableInfo = isFrame.getIspininfo(infoObj, allSumnewuser);
      break;
    }
    
    
    Map<String, Object> map = new HashMap();
    
    map.put("newuserPie", newuserTmpPie);
    map.put("dactiveuserPie", dactiveuserTmpPie);
    map.put("newusergridinfo", newsuersbuffer.toString());
    map.put("dactiveusergridinfo", dactiveusersbuffer.toString());
    map.put("tableInfo", tableInfo);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  










  public String getBarInfo(List<PieBean> newuserPie, List<PieBean> dactiveuserPie, Object infoObj, int allNewuser, int allDactiveuser, long allSumnewuser, int type)
  {
    String info = "";
    float newuseravg = 0.0F;
    PieBean newuserPieBean = null;
    PieBean wnewuserPieBean = null;
    List<String> newuserCategories = new ArrayList();
    List<String> newuserSecCategories = new ArrayList();
    List<Integer> newuserValue = new ArrayList();
    float dactiveuseravg = 0.0F;
    PieBean dactiveuserPieBean = null;
    PieBean wdactiveuserPieBean = null;
    List<String> dactiveuserCategories = new ArrayList();
    List<String> dactiveuserSecCategories = new ArrayList();
    List<Integer> dactiveuserValue = new ArrayList();
    StringBuffer newsuersbuffer = new StringBuffer();
    StringBuffer dactiveusersbuffer = new StringBuffer();
    String tmpvalue = "";
    
    for (int i = 0; i < newuserPie.size(); i++) {
      newuserPieBean = (PieBean)newuserPie.get(i);
      if (!"默认".equals(newuserPieBean.getName())) {
        newuserCategories.add(newuserPieBean.getName());
        newuseravg = Util.getPercentage(Integer.valueOf((int)newuserPieBean.getY()), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
        
        newuserSecCategories.add(String.valueOf(newuseravg));
        newuserValue.add(Integer.valueOf((int)newuserPieBean.getY()));
      } else {
        wnewuserPieBean = (PieBean)newuserPie.get(i);
      }
    }
    





    for (int j = 0; j < dactiveuserPie.size(); j++) {
      dactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
      if (!"默认".equals(dactiveuserPieBean.getName())) {
        dactiveuseravg = Util.getPercentage(Integer.valueOf((int)dactiveuserPieBean.getY()), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
        dactiveuserCategories.add(dactiveuserPieBean.getName());
        dactiveuserSecCategories.add(String.valueOf(dactiveuseravg));
        dactiveuserValue.add(Integer.valueOf((int)dactiveuserPieBean.getY()));
      } else {
        wdactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
      }
    }
    




    String tableInfo = "";
    switch (type)
    {
    case 1: 
      gisFrame = new GisInfoFrame();
      tableInfo = gisFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 2: 
      mobileFrame = new MobileFrame();
      tableInfo = mobileFrame.getMobileinfo(infoObj, allSumnewuser);
      break;
    case 3: 
      osFrame = new OsFrame();
      tableInfo = osFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 4: 
      pxFrame = new PixelFrame();
      tableInfo = pxFrame.getGisInfo(infoObj, allSumnewuser);
      break;
    case 5: 
      isFrame = new IspinInfoFrame();
      tableInfo = isFrame.getIspininfo(infoObj, allSumnewuser);
      break;
    }
    
    

    Map<String, Object> map = new HashMap();
    
    map.put("newuserCategories", newuserCategories);
    map.put("newuserSecCategories", newuserSecCategories);
    map.put("newuseravg", newuserValue);
    map.put("dactiveuserCategories", dactiveuserCategories);
    map.put("dactiveuserSecCategories", dactiveuserSecCategories);
    map.put("dactiveuseravg", dactiveuserValue);
    map.put("tableInfo", tableInfo);
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  







  public String getCountryPieInfo(List<PieBean> newuserPie, List<PieBean> dactiveuserPie, int allNewuser, int allDactiveuser)
  {
    String info = "";
    


    float allothernewuser = 0.0F;
    float othernewuserPercentage = 0.0F;
    float newuserPercentage = 0.0F;
    PieBean newuserPieBean = null;
    PieBean wnewuserPieBean = null;
    
    float allotherdactiveuser = 0.0F;
    float otherdactiveuserPercentage = 0.0F;
    float dactiveuserPercentage = 0.0F;
    PieBean dactiveuserPieBean = null;
    PieBean wdactiveuserPieBean = null;
    
    List<String> newuserCategories = new ArrayList();
    List<String> newuserSecCategories = new ArrayList();
    List<Integer> newuserValue = new ArrayList();
    List<String> dactiveuserCategories = new ArrayList();
    List<String> dactiveuserSecCategories = new ArrayList();
    List<Integer> dactiveuserValue = new ArrayList();
    
    if (newuserPie != null) {
      for (int i = 0; i < newuserPie.size(); i++) {
        newuserPieBean = (PieBean)newuserPie.get(i);
        if ((!"默认".equals(newuserPieBean.getName())) && (!"default".equals(newuserPieBean.getName()))) {
          if (!"中国".equals(newuserPieBean.getName())) {
            allothernewuser += newuserPieBean.getY();
          }
          newuserPercentage = Util.getPercentage(Integer.valueOf((int)newuserPieBean.getY()), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
          
          if (newuserPieBean.getName().length() < 3) {
            newuserPieBean.setName(newuserPieBean.getName());
          }
          newuserCategories.add(newuserPieBean.getName());
          newuserSecCategories.add(String.valueOf(newuserPercentage));
          newuserValue.add(Integer.valueOf((int)newuserPieBean.getY()));
        } else {
          wnewuserPieBean = (PieBean)newuserPie.get(i);
        }
      }
      othernewuserPercentage = Util.getPercentage(Float.valueOf(allothernewuser), Integer.valueOf(allNewuser), ConstString.DECIMALFLAGTWO);
    }
    if (dactiveuserPie != null)
    {
      for (int j = 0; j < dactiveuserPie.size(); j++) {
        dactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
        if ((!"默认".equals(newuserPieBean.getName())) && (!"default".equals(newuserPieBean.getName()))) {
          if (!"中国".equals(dactiveuserPieBean.getName())) {
            allotherdactiveuser += dactiveuserPieBean.getY();
          }
          dactiveuserPercentage = Util.getPercentage(Integer.valueOf((int)dactiveuserPieBean.getY()), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
          dactiveuserCategories.add(dactiveuserPieBean.getName());
          dactiveuserSecCategories.add(String.valueOf(dactiveuserPercentage));
          dactiveuserValue.add(Integer.valueOf((int)dactiveuserPieBean.getY()));
        } else {
          wdactiveuserPieBean = (PieBean)dactiveuserPie.get(j);
        }
      }
      otherdactiveuserPercentage = Util.getPercentage(Float.valueOf(allotherdactiveuser), Integer.valueOf(allDactiveuser), ConstString.DECIMALFLAGTWO);
    }
    Map<String, Object> map = new HashMap();
    
    map.put("countrynewuserCategories", newuserCategories);
    map.put("countrynewuserSecCategories", newuserSecCategories);
    map.put("countrynewuserValue", newuserValue);
    map.put("countrydactiveuserCategories", dactiveuserCategories);
    map.put("countrydactiveuserSecCategories", dactiveuserSecCategories);
    map.put("countrydactiveuserValue", dactiveuserValue);
    map.put("othernewuserPercentage", Float.valueOf(othernewuserPercentage));
    map.put("otherdactiveuserPercentage", Float.valueOf(otherdactiveuserPercentage));
    try
    {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  





  public List<PieBean> getpieListinfo(List<PieBean> pielist, long allpieinfo)
  {
    List<PieBean> tmpPieList = new ArrayList();
    float pieinfoavg = 0.0F;
    PieBean pieBean = null;
    
    for (int j = 0; j < pielist.size(); j++) {
      pieBean = (PieBean)pielist.get(j);
      pieinfoavg = Util.getPercentage(Integer.valueOf((int)pieBean.getY()), Integer.valueOf((int)allpieinfo), ConstString.DECIMALFLAGTWO);
      pieBean.setY(pieinfoavg);
      tmpPieList.add(pieBean);
    }
    return tmpPieList;
  }
  





  public List<PieBean> getpieinfo(List<PieBean> pielist, long allpieinfo)
  {
    List<PieBean> tmpPieList = new ArrayList();
    float pieinfoavg = 0.0F;
    PieBean pieBean = null;
    
    for (int j = 0; j < pielist.size(); j++) {
      pieBean = (PieBean)pielist.get(j);
      pieinfoavg = Util.getPercentage(Integer.valueOf((int)pieBean.getY()), Integer.valueOf((int)allpieinfo), ConstString.DECIMALFLAGTWO);
      pieBean.setY(pieinfoavg);
      tmpPieList.add(pieBean);
    }
    return tmpPieList;
  }
  




  public String getpieStrinfo(List<PieBean> pielist, long allpieinfo, int pageflag)
  {
    float pieinfoavg = 0.0F;
    PieBean pieBean = null;
    String tmpvalue = "";
    StringBuffer pieinfobuffer = new StringBuffer();
    
    if (pielist != null) {
      if (pageflag == 0) {
        for (int j = 0; j < pielist.size(); j++) {
          pieBean = (PieBean)pielist.get(j);
          pieinfoavg = Util.getPercentage(Integer.valueOf((int)pieBean.getY()), Integer.valueOf((int)allpieinfo), ConstString.DECIMALFLAGTWO);
          tmpvalue = pieBean.getName() + "," + (int)pieBean.getY() + "," + pieinfoavg + "%";
          if (j < pielist.size() - 1) {
            pieinfobuffer.append(tmpvalue + "&");
          } else {
            pieinfobuffer.append(tmpvalue);
          }
          
        }
      } else {
        for (int j = 0; j < 10; j++) {
          if (pielist.size() > j) {
            pieBean = (PieBean)pielist.get(j);
            pieinfoavg = Util.getPercentage(Integer.valueOf((int)pieBean.getY()), Integer.valueOf((int)allpieinfo), ConstString.DECIMALFLAGTWO);
            tmpvalue = pieBean.getName() + "," + (int)pieBean.getY() + "," + pieinfoavg + "%";
          } else {
            tmpvalue = "&nbsp;,&nbsp;,&nbsp;";
          }
          if (j < 9) {
            pieinfobuffer.append(tmpvalue + "#");
          } else {
            pieinfobuffer.append(tmpvalue);
          }
        }
      }
    }
    return pieinfobuffer.toString();
  }
  












  public String getPieInfos(List<PieBean> pielist, long allpieinfo, int cday, List startnumInfo, List startnumInfoAvg, Timestamp fDate, Timestamp eDate, int pageflag)
  {
    String info = "";
    String strTimeflag = "";
    Hashtable<String, Integer> tab = new Hashtable();
    StartUpFrame startUpFrame = new StartUpFrame();
    List oldListInfo = startnumInfo;
    List oldavgListInfo = startnumInfoAvg;
    Calendar cal = null;
    SimpleDateFormat timeflag = null;
    
    List<String> newuserCategories = new ArrayList();
    List<String> newuserSecCategories = new ArrayList();
    List<Float> newuserValue = new ArrayList();
    PieBean barInfoPieBean = null;
    float pieinfoavg = 0.0F;
    for (int pielistIndex = 0; pielistIndex < pielist.size(); pielistIndex++) {
      barInfoPieBean = (PieBean)pielist.get(pielistIndex);
      pieinfoavg = Util.getPercentage(Integer.valueOf((int)barInfoPieBean.getY()), Integer.valueOf((int)allpieinfo), ConstString.DECIMALFLAGTWO);
      newuserCategories.add(barInfoPieBean.getName());
      newuserSecCategories.add(String.valueOf(pieinfoavg));
      newuserValue.add(Float.valueOf(barInfoPieBean.getY()));
    }
    

    Map<String, Object> map = new HashMap();
    
    String pieinfobuffer = getpieStrinfo(pielist, allpieinfo, pageflag);
    List<PieBean> tmpPieList = getpieListinfo(pielist, allpieinfo);
    map.put("pieinfo", tmpPieList);
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
    ArrayList<Integer> startlist = new ArrayList();
    ArrayList<Float> startavglist = new ArrayList();
    
    for (int i = 0; i < rowSize; i++) {
      if (rowSize < cday)
      {
        dayData = ((Daydata)startnumInfo.get(i));
        strTimeflag = String.valueOf(dayData.getTimeflag());
        startlist.add(null);
        startavglist.add(null);
      }
      else {
        cal = Calendar.getInstance();
        cal.setTimeInMillis(fDate.getTime());
        if (type == 1) {
          cal.set(11, i);
          startlist.add(null);
          
          if (i % 8 == 0) {
            startavglist.add(null);
          }
        } else {
          cal.add(5, i);
          startlist.add(null);
          startavglist.add(null);
        }
        
        strTimeflag = timeflag.format(cal.getTime());
      }
      tab.put(strTimeflag, Integer.valueOf(i));
    }
    
    int statime = 0;
    int listKey = 0;
    float startinfoavg = 0.0F;
    float allstartinfoavg = 0.0F;
    int oldtimeflag = 0;
    
    for (int j = 0; j < startnumInfo.size(); j++) {
      if (type == 1) {
        hourdata = ((Hourdata)startnumInfo.get(j));
        if (j == 0) {
          statime = hourdata.getTimeflag();
        }
        dayData = ((Daydata)startnumInfoAvg.get(0));
        if (tab.get(String.valueOf(hourdata.getTimeflag())) == null) continue;
        listKey = ((Integer)tab.get(String.valueOf(hourdata.getTimeflag()))).intValue();
        


        startlist.set(listKey, Integer.valueOf(hourdata.getHstartup()));
        
        startinfoavg = Util.getAvg(Integer.valueOf(dayData.getDstartup()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        startavglist.set(1, Float.valueOf(startinfoavg));
        allstartinfoavg = startinfoavg;
      } else {
        dayData = ((Daydata)startnumInfo.get(j));
        if (j == 0) {
          statime = dayData.getTimeflag();
        }
        if (tab.get(String.valueOf(dayData.getTimeflag())) == null) continue;
        listKey = ((Integer)tab.get(String.valueOf(dayData.getTimeflag()))).intValue();
        


        startlist.set(listKey, Integer.valueOf(dayData.getDstartup()));
        startinfoavg = Util.getAvg(Integer.valueOf(dayData.getDstartup()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        startavglist.set(listKey, Float.valueOf(startinfoavg));
        allstartinfoavg += startinfoavg;
      }
      

      if (j == 0) {
        oldtimeflag = listKey;
      }
      int tmpvalue = 0;
      int tmpkey = 0;
      tmpvalue = listKey - oldtimeflag;
      for (int tmpfalg = -1; tmpfalg > tmpvalue; tmpfalg--) {
        tmpkey = oldtimeflag + tmpfalg;
        if (startlist.size() - 1 >= tmpkey) {
          startlist.set(tmpkey, Integer.valueOf(0));
          if (startlist.size() == startavglist.size()) {
            startavglist.set(tmpkey, Float.valueOf(0.0F));
          }
        }
      }
      
      oldtimeflag = listKey;
    }
    
    if (startlist.size() > 30) {
      startlist = Algorithm.aggregation(startlist);
      startavglist = Algorithm.aggregationFloat(startavglist);
    }
    allstartinfoavg /= cday;
    DecimalFormat df = new DecimalFormat(ConstString.DECIMALFLAGTWO);
    allstartinfoavg = Float.parseFloat(df.format(allstartinfoavg));
    map.put("piegridinfo", pieinfobuffer);
    

    map.put("newuserCategories", newuserCategories);
    map.put("newuserSecCategories", newuserSecCategories);
    
    map.put("newuserValue", newuserValue);
    map.put("startlist", startlist);
    map.put("startavglist", startavglist);
    String startInfo = startUpFrame.getStartInfoGrid(type, oldListInfo);
    String startInfoavg = startUpFrame.getStartInfoAvgGrid(type, oldavgListInfo);
    map.put("startInfo", startInfo);
    map.put("startInfoavg", startInfoavg);
    map.put("cday", Integer.valueOf(cday));
    map.put("allstartinfoavg", Float.valueOf(allstartinfoavg));
    map.put("strStartDate", Util.getTimeToStr(fDate));
    
    map.put("strENDDate", Util.getTimeToStr(eDate));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  









  public String getUserTimePieInfos(List<PieBean> pielist, long allpieinfo, int cday, List usertimenumInfo, Timestamp fDate, Timestamp eDate)
  {
    String info = "";
    String strTimeflag = "";
    Hashtable<String, Integer> tab = new Hashtable();
    UserTimeInforFrame userTimeInforFrame = new UserTimeInforFrame();
    List oldListInfo = usertimenumInfo;
    Calendar cal = null;
    SimpleDateFormat timeflag = null;
    String pieinfobuffer = getpieStrinfo(pielist, allpieinfo, 0);
    

    List<String> newuserCategories = new ArrayList();
    List<String> newuserSecCategories = new ArrayList();
    List<Float> newuserValue = new ArrayList();
    float pieinfoavg = 0.0F;
    PieBean barInfoPieBean = null;
    float tmpAllUsertimeNum = 0.0F;
    
    for (int pielistIndexNum = 0; pielistIndexNum < pielist.size(); pielistIndexNum++) {
      barInfoPieBean = (PieBean)pielist.get(pielistIndexNum);
      tmpAllUsertimeNum = barInfoPieBean.getY() + tmpAllUsertimeNum;
    }
    
    for (int pielistIndex = 0; pielistIndex < pielist.size(); pielistIndex++) {
      barInfoPieBean = (PieBean)pielist.get(pielistIndex);
      pieinfoavg = Util.getPercentage(Float.valueOf(barInfoPieBean.getY()), Float.valueOf(tmpAllUsertimeNum), ConstString.DECIMALFLAGTWO);
      newuserCategories.add(barInfoPieBean.getName());
      newuserSecCategories.add(String.valueOf(pieinfoavg));
      newuserValue.add(Float.valueOf(barInfoPieBean.getY()));
    }
    int rowSize = 0;
    int type = 2;
    
    if ((cday > 0) && (cday <= 1)) {
      rowSize = 3;


    }
    else
    {

      rowSize = cday;
    }
    

    timeflag = new SimpleDateFormat(ConstString.INTTIME);
    ArrayList<Integer> usertimelist = new ArrayList();
    ArrayList<Integer> usertimeavglist = new ArrayList();
    
    for (int i = 0; i < rowSize; i++) {
      if (rowSize < cday)
      {
        dayData = ((Daydata)usertimenumInfo.get(i));
        strTimeflag = String.valueOf(dayData.getTimeflag());
        usertimelist.add(null);
        usertimeavglist.add(null);
      }
      else {
        cal = Calendar.getInstance();
        cal.setTimeInMillis(fDate.getTime());
        cal.add(5, i);
        usertimelist.add(null);
        usertimeavglist.add(null);
        strTimeflag = timeflag.format(cal.getTime());
      }
      tab.put(strTimeflag, Integer.valueOf(i));
    }
    

    int statime = 0;
    int listKey = 0;
    float usertimeinfoavg = 0.0F;
    float allusertimeavg = 0.0F;
    int oldtimeflag = 0;
    
    for (int j = 0; j < usertimenumInfo.size(); j++) {
      dayData = ((Daydata)usertimenumInfo.get(j));
      if (j == 0) {
        statime = dayData.getTimeflag();
      }
      if ((cday > 0) && (cday <= 1)) {
        usertimelist.set(1, Integer.valueOf(dayData.getDusetime()));
        
        usertimeinfoavg = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        usertimeavglist.set(1, Integer.valueOf((int)usertimeinfoavg));
      } else {
        if (tab.get(String.valueOf(dayData.getTimeflag())) == null) continue;
        listKey = ((Integer)tab.get(String.valueOf(dayData.getTimeflag()))).intValue();
        


        usertimelist.set(listKey, Integer.valueOf(dayData.getDusetime()));
        usertimeinfoavg = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        usertimeavglist.set(listKey, Integer.valueOf((int)usertimeinfoavg));
      }
      
      if (oldtimeflag != 0) {
        int tmpvalue = 0;
        int tmpkey = 0;
        tmpvalue = oldtimeflag - listKey;
        for (int tmpfalg = 1; tmpfalg < tmpvalue; tmpfalg++) {
          tmpkey = oldtimeflag - tmpfalg;
          usertimelist.set(tmpkey, Integer.valueOf(0));
          usertimeavglist.set(tmpkey, Integer.valueOf(0));
        }
      }
      oldtimeflag = listKey;
      allusertimeavg += usertimeinfoavg;
    }
    if (usertimelist.size() > 30) {
      usertimelist = Algorithm.aggregation(usertimelist);
      usertimeavglist = Algorithm.aggregation(usertimeavglist);
    }
    
    allusertimeavg /= cday;
    DecimalFormat df = new DecimalFormat(ConstString.DECIMALFLAGTWO);
    allusertimeavg = Float.parseFloat(df.format(allusertimeavg));
    Map<String, Object> map = new HashMap();
    map.put("pieinfo", "");
    map.put("piegridinfo", pieinfobuffer);
    

    map.put("newuserCategories", newuserCategories);
    map.put("newuserSecCategories", newuserSecCategories);
    map.put("newuserValue", newuserValue);
    map.put("usertimelist", usertimelist);
    map.put("usertimeavglist", usertimeavglist);
    String usertimeInfo = userTimeInforFrame.getUserTimeInfoGrid(type, oldListInfo);
    String usertimeInfoavg = userTimeInforFrame.getUserTimeInfoAvgGrid(type, oldListInfo);
    map.put("usertimeInfo", usertimeInfo);
    map.put("usertimeInfoavg", usertimeInfoavg);
    map.put("cday", Integer.valueOf(cday));
    map.put("allusertimeavg", Float.valueOf(allusertimeavg));
    map.put("strStartDate", Util.getTimeToStr(fDate));
    
    map.put("strENDDate", Util.getTimeToStr(eDate));
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    
    return info;
  }
}
