package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Ispinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;








public class IspinInfoFrame
{
  public IspinInfoFrame() {}
  
  public String getIspininfo(Object ispinInfoObj, long allSumnewuser)
  {
    String info = "";
    if (ispinInfoObj == null) {
      return "";
    }
    List<Ispinfor> listIpinInfo = (List)ispinInfoObj;
    StringBuffer tablebuffer = new StringBuffer();
    Ispinfor ispinfor = null;
    String tmpvalue = "";
    float sumnewuseravg = 0.0F;
    for (int k = 0; k < listIpinInfo.size(); k++) {
      ispinfor = (Ispinfor)listIpinInfo.get(k);
      sumnewuseravg = Util.getPercentage(Integer.valueOf(ispinfor.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      tmpvalue = ispinfor.getIspname() + "," + ispinfor.getDnewuser() + "," + ispinfor.getSumnewuser() + "," + sumnewuseravg + "%";
      
      if (k < listIpinInfo.size() - 1) {
        tablebuffer.append(tmpvalue + "^");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    info = tablebuffer.toString();
    return info;
  }
}
