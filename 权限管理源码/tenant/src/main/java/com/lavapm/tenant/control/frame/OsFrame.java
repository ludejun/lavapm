package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Osinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;






public class OsFrame
{
  public OsFrame() {}
  
  public String getGisInfo(Object gisInfoObj, long allSumnewuser)
  {
    String info = "";
    if (gisInfoObj == null) {
      return "";
    }
    List<Osinfor> listOsInfo = (List)gisInfoObj;
    StringBuffer tablebuffer = new StringBuffer();
    Osinfor osinfo = null;
    String tmpvalue = "";
    float sumnewuseravg = 0.0F;
    for (int k = 0; k < listOsInfo.size(); k++) {
      osinfo = (Osinfor)listOsInfo.get(k);
      sumnewuseravg = Util.getPercentage(Integer.valueOf(osinfo.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      tmpvalue = osinfo.getOsname() + "," + osinfo.getDnewuser() + "," + osinfo.getSumnewuser() + "," + sumnewuseravg + "%";
      
      if (k < listOsInfo.size() - 1) {
        tablebuffer.append(tmpvalue + "&");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    info = tablebuffer.toString();
    return info;
  }
}
