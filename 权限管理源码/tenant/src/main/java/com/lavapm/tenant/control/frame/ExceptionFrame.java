package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.ExceptionInfo;
import com.lavapm.tenant.bean.Exceptionlist;
import com.lavapm.tenant.bean.Exceptionthis;
import com.lavapm.tenant.bean.PieBean;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;








public class ExceptionFrame
{
  public ExceptionFrame() {}
  
  public String getExceptionFrame(List<ExceptionInfo> exceptionlist)
  {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    ExceptionInfo exceptioninfo = null;
    float errorp = 0.0F;
    float peoplep = 0.0F;
    if (exceptionlist != null) {
      for (int i = 0; i < exceptionlist.size(); i++) {
        exceptioninfo = (ExceptionInfo)exceptionlist.get(i);
        errorp = Util.getPercentage(Integer.valueOf(exceptioninfo.getErrornum()), Integer.valueOf(exceptioninfo.getStartupnum()), ConstString.DECIMALFLAGTWO);
        peoplep = Util.getPercentage(Integer.valueOf(exceptioninfo.getErrordevnum()), Integer.valueOf(exceptioninfo.getStartupusernum()), ConstString.DECIMALFLAGTWO);
        tmpvalue = exceptioninfo.getVersion() + "," + exceptioninfo.getErrornum() + "~" + exceptioninfo.getErrordevnum() + "," + exceptioninfo.getStartupnum() + "~" + exceptioninfo.getStartupusernum() + "," + (int)errorp + "%~" + peoplep + "%";
        
        if (i < exceptionlist.size() - 1) {
          sbuffer.append(tmpvalue + "&");
        } else {
          sbuffer.append(tmpvalue);
        }
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("exceptiongrid", sbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  





  public String getExceptionlistFrame(List<Exceptionlist> listExceptionlist, HttpSession session)
  {
    String info = "";
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    Exceptionlist exceptionlist = null;
    String errormessagestrdis = "";
    String errormessage = "";
    String[] errormessagedis = null;
    if (listExceptionlist != null) {
      for (int i = 0; i < listExceptionlist.size(); i++) {
        errormessagestrdis = "";
        exceptionlist = (Exceptionlist)listExceptionlist.get(i);
        errormessage = exceptionlist.getErrormessage();
        errormessage = errormessage.replace(ConstString.ERRORMESSAGEFLAG, ConstString.SPLITFLAG);
        errormessagedis = errormessage.split(ConstString.SPLITFLAG);
        
        if (errormessagedis.length > 3) {
          for (int j = 0; j < 2; j++) {
            errormessagestrdis = errormessagestrdis + errormessagedis[j] + "\r\n";
          }
          errormessagestrdis = errormessagestrdis + "...";
        } else {
          for (int j = 0; j < errormessagedis.length; j++) {
            errormessagestrdis = errormessagestrdis + errormessagedis[j] + "\r\n";
          }
        }
        tmpvalue = exceptionlist.getId() + "," + exceptionlist.getErrorname().replace("'", " ") + "-" + errormessagestrdis + "-" + exceptionlist.getErrormessage().replace(ConstString.ERRORMESSAGEFLAG, "\r\n") + "," + exceptionlist.getVersion() + "," + Util.getTimeToStr(exceptionlist.getLasttime(), ConstString.TIMEFRAME) + "," + exceptionlist.getErrornum();
        
        if (i < listExceptionlist.size() - 1) {
          sbuffer.append(tmpvalue + "^");
        } else {
          sbuffer.append(tmpvalue);
        }
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("exceptionlist", sbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  









  public String getExceptionDetailFrame(Exceptionlist exceptionlist, List<PieBean> listMobilePieBean, int mobileall, List<PieBean> listOsPieBean, int osall, List<Exceptionthis> exceptionthislist)
  {
    String info = "";
    PieBean tmpPieBean = null;
    float tmppiey = 0.0F;
    
    for (int i = 0; i < listMobilePieBean.size(); i++) {
      tmpPieBean = (PieBean)listMobilePieBean.get(i);
      tmppiey = Util.getPercentage(Float.valueOf(tmpPieBean.getY()), Integer.valueOf(mobileall), ConstString.DECIMALFLAGTWO);
      ((PieBean)listMobilePieBean.get(i)).setY(tmppiey);
    }
    
    for (int k = 0; k < listOsPieBean.size(); k++) {
      tmpPieBean = (PieBean)listOsPieBean.get(k);
      tmppiey = Util.getPercentage(Float.valueOf(tmpPieBean.getY()), Integer.valueOf(osall), ConstString.DECIMALFLAGTWO);
      ((PieBean)listOsPieBean.get(k)).setY(tmppiey);
    }
    
    StringBuffer exceptionbuffer = new StringBuffer();
    String tmpvalue = "";
    Exceptionthis exceptionthis = null;
    String timestr = "";
    if (exceptionthislist != null) {
      for (int j = 0; j < exceptionthislist.size(); j++) {
        exceptionthis = (Exceptionthis)exceptionthislist.get(j);
        timestr = Util.getTimeToStr(exceptionthis.getTime());
        tmpvalue = timestr + "," + exceptionthis.getOsversion() + "," + exceptionthis.getMobile() + "," + exceptionthis.getErrorname() + "," + exceptionthis.getErrorname() + "-" + exceptionthis.getErrormessage().replaceAll("#\\$#", "\r\n");
        
        if (j < exceptionthislist.size() - 1) {
          exceptionbuffer.append(tmpvalue + "^");
        } else {
          exceptionbuffer.append(tmpvalue);
        }
      }
    }
    Map<String, Object> map = new HashMap();
    
    if (exceptionlist != null) {
      map.put("errorname", exceptionlist.getErrorname());
      map.put("errormessage", exceptionlist.getErrormessage().replaceAll("#\\$#", "\r\n"));
    } else {
      map.put("errorname", "");
      map.put("errormessage", "");
    }
    map.put("mobilePie", listMobilePieBean);
    map.put("osPie", listOsPieBean);
    map.put("exceptionthislist", exceptionbuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
