package com.lavapm.tenant.control.frame;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lavapm.tenant.bean.MobileType;
import com.lavapm.tenant.bean.Pageinfor;
import com.lavapm.tenant.bean.Pagejump;
import com.lavapm.tenant.bean.Version;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.JSONUtils;
import com.lavapm.tenant.tool.Util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;








public class PageInfoFrame
{
  public PageInfoFrame() {}
  
  public String getPageInfoFrame(List<Pageinfor> pageinfoList, Pageinfor allPageinfor, int pageflag)
  {
    String info = "";
    


    String tmpvalue = "";
    Pageinfor pageinfor = null;
    float pviewnum = 0.0F;
    float paveragestay = 0.0F;
    float averagestayavg = 0.0F;
    float pexitnum = 0.0F;
    StringBuffer tablebuffer = new StringBuffer();
    
    if (pageflag == 0) {
      for (int i = 0; i < pageinfoList.size(); i++) {
        pageinfor = (Pageinfor)pageinfoList.get(i);
        pviewnum = Util.getPercentage(Integer.valueOf(pageinfor.getViewnum()), Integer.valueOf(allPageinfor.getAllviewnum()), ConstString.DECIMALFLAGTWO);
        averagestayavg = pageinfor.getAveragestay();
        paveragestay = Util.getPercentage(Integer.valueOf(pageinfor.getAveragestay()), Integer.valueOf(allPageinfor.getAllaveragestay()), ConstString.DECIMALFLAGTWO);
        pexitnum = Util.getPercentage(Integer.valueOf(pageinfor.getExitnum()), Integer.valueOf(pageinfor.getViewnum()), ConstString.DECIMALFLAGTWO);
        if (pexitnum < 0.0F) {
          pexitnum = 0.0F;
        }
        tmpvalue = pageinfor.getPagename() + "," + pageinfor.getViewnum() + "(" + pviewnum + "%)," + (int)averagestayavg + "(" + paveragestay + "%)," + pexitnum + "%," + pageinfor.getPagename();
        
        if (i < pageinfoList.size() - 1) {
          tablebuffer.append(tmpvalue + "&");
        } else {
          tablebuffer.append(tmpvalue);
        }
      }
    } else {
      for (int i = 0; i < 10; i++) {
        if (pageinfoList.size() > i) {
          pageinfor = (Pageinfor)pageinfoList.get(i);
          pviewnum = Util.getPercentage(Integer.valueOf(pageinfor.getViewnum()), Integer.valueOf(allPageinfor.getAllviewnum()), ConstString.DECIMALFLAGTWO);
          averagestayavg = pageinfor.getAveragestay();
          paveragestay = Util.getPercentage(Integer.valueOf(pageinfor.getAveragestay()), Integer.valueOf(allPageinfor.getAllaveragestay()), ConstString.DECIMALFLAGTWO);
          pexitnum = Util.getPercentage(Integer.valueOf(pageinfor.getExitnum()), Integer.valueOf(pageinfor.getViewnum()), ConstString.DECIMALFLAGTWO);
          if (pexitnum < 0.0F) {
            pexitnum = 0.0F;
          }
          tmpvalue = pageinfor.getPagename() + "," + pageinfor.getViewnum() + "(" + pviewnum + "%)," + (int)averagestayavg + "(" + paveragestay + "%)," + pexitnum + "%," + pageinfor.getPagename();
        }
        else {
          tmpvalue = "&nbsp;,&nbsp;,&nbsp;,&nbsp;,&nbsp;";
        }
        if (i < 9) {
          tablebuffer.append(tmpvalue + "#");
        } else {
          tablebuffer.append(tmpvalue);
        }
      }
    }
    Map<String, Object> map = new HashMap();
    
    map.put("pagegridinfo", tablebuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  





  public String getPageJumpFrame(List<Pagejump> pagejumpList, int allPageJump)
  {
    String info = "";
    String tmpvalue = "";
    Pagejump pagejump = null;
    float pnum = 0.0F;
    StringBuffer tablebuffer = new StringBuffer();
    for (int i = 0; i < pagejumpList.size(); i++) {
      pagejump = (Pagejump)pagejumpList.get(i);
      pnum = Util.getPercentage(Integer.valueOf(pagejump.getNum()), Integer.valueOf(allPageJump), ConstString.DECIMALFLAGTWO);
      tmpvalue = pagejump.getLink() + "," + pagejump.getNum() + "," + pnum + "%";
      if (i < pagejumpList.size() - 1) {
        tablebuffer.append(tmpvalue + "&");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("pageJumpgridinfo", tablebuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  




  public String getVersionFrame(List<Version> getVersion)
  {
    String info = "";
    StringBuffer tablebuffer = new StringBuffer();
    Version version = null;
    for (int i = 0; i < getVersion.size(); i++) {
      version = (Version)getVersion.get(i);
      if (i < getVersion.size() - 1) {
        tablebuffer.append(version.getVersion() + "&");
      } else {
        tablebuffer.append(version.getVersion());
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("versiongrid", tablebuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
  
  public String getMobileType(List<MobileType> listmobile) {
    String info = "";
    StringBuffer tablebuffer = new StringBuffer();
    MobileType mobileType = null;
    if ((listmobile != null) && (listmobile.size() != 0)) {
      for (int i = 0; i < listmobile.size(); i++) {
        mobileType = (MobileType)listmobile.get(i);
        if (i < listmobile.size() - 1) {
          tablebuffer.append(mobileType.getMobilename() + "&");
        } else {
          tablebuffer.append(mobileType.getMobilename());
        }
      }
    }
    Map<String, Object> map = new HashMap();
    map.put("mobiletypegrid", tablebuffer.toString());
    try {
      info = JSONUtils.writeValueAsString(map);
    }
    catch (JsonProcessingException e) {
      e.printStackTrace();
    }
    return info;
  }
}
