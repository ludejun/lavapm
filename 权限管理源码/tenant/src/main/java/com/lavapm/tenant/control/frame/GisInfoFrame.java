package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Gisinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;







public class GisInfoFrame
{
  public GisInfoFrame() {}
  
  public String getGisInfo(Object gisInfoObj, long allSumnewuser)
  {
    String info = "";
    if (gisInfoObj == null) {
      return "";
    }
    List<Gisinfor> listGisInfo = (List)gisInfoObj;
    StringBuffer tablebuffer = new StringBuffer();
    Gisinfor gisInfo = null;
    Gisinfor wgisInfo = null;
    String tmpvalue = "";
    float sumnewuseravg = 0.0F;
    
    for (int k = 0; k < listGisInfo.size(); k++) {
      gisInfo = (Gisinfor)listGisInfo.get(k);
      sumnewuseravg = Util.getPercentage(Integer.valueOf(gisInfo.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      gisInfo.setSumnewuseravg(sumnewuseravg);
      if (!"默认".equals(gisInfo.getProvincename())) {
        tmpvalue = gisInfo.getProvincename() + "," + gisInfo.getDnewuser() + "," + gisInfo.getSumnewuser() + "," + sumnewuseravg + "%";
        
        if (k < listGisInfo.size() - 1) {
          tablebuffer.append(tmpvalue + "&");
        } else {
          tablebuffer.append(tmpvalue);
        }
      } else {
        wgisInfo = (Gisinfor)listGisInfo.get(k);
      }
    }
    
    if ((tablebuffer != null) && (!tablebuffer.toString().equals("")) && 
      (tablebuffer.substring(tablebuffer.length() - 1, tablebuffer.length()).equals("&"))) {
      tablebuffer.replace(tablebuffer.length() - 1, tablebuffer.length(), "");
    }
    

    if (wgisInfo != null) {
      sumnewuseravg = Util.getPercentage(Integer.valueOf(wgisInfo.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      tmpvalue = "未知," + wgisInfo.getDnewuser() + "," + wgisInfo.getSumnewuser() + "," + sumnewuseravg + "%";
      
      if ((tablebuffer != null) && (!"".equals(tablebuffer.toString()))) {
        tablebuffer.append("&" + tmpvalue);
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    info = tablebuffer.toString();
    return info;
  }
}
