package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Pixelinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;









public class PixelFrame
{
  public PixelFrame() {}
  
  public String getGisInfo(Object gisInfoObj, long allSumnewuser)
  {
    String info = "";
    if (gisInfoObj == null) {
      return "";
    }
    List<Pixelinfor> listPixelinfo = (List)gisInfoObj;
    StringBuffer tablebuffer = new StringBuffer();
    Pixelinfor pixelinfor = null;
    String tmpvalue = "";
    float sumnewuseravg = 0.0F;
    for (int k = 0; k < listPixelinfo.size(); k++) {
      pixelinfor = (Pixelinfor)listPixelinfo.get(k);
      sumnewuseravg = Util.getPercentage(Integer.valueOf(pixelinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      tmpvalue = pixelinfor.getPixelname() + "," + pixelinfor.getDnewuser() + "," + pixelinfor.getSumnewuser() + "," + sumnewuseravg + "%";
      
      if (k < listPixelinfo.size() - 1) {
        tablebuffer.append(tmpvalue + "&");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    info = tablebuffer.toString();
    return info;
  }
}
