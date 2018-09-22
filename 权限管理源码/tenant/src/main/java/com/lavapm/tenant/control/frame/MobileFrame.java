package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Mobileinfor;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;








public class MobileFrame
{
  public MobileFrame() {}
  
  public String getMobileinfo(Object mobileInfoObj, long allSumnewuser)
  {
    String info = "";
    if (mobileInfoObj == null) {
      return "";
    }
    List<Mobileinfor> listMobileInfo = (List)mobileInfoObj;
    StringBuffer tablebuffer = new StringBuffer();
    Mobileinfor mobileInfo = null;
    String tmpvalue = "";
    float sumnewuseravg = 0.0F;
    for (int k = 0; k < listMobileInfo.size(); k++) {
      mobileInfo = (Mobileinfor)listMobileInfo.get(k);
      sumnewuseravg = Util.getPercentage(Integer.valueOf(mobileInfo.getSumnewuser()), Integer.valueOf((int)allSumnewuser), ConstString.DECIMALFLAGTWO);
      mobileInfo.setSumnewuseravg(sumnewuseravg);
      tmpvalue = mobileInfo.getMobilename() + "," + mobileInfo.getDnewuser() + "," + mobileInfo.getSumnewuser() + "," + sumnewuseravg + "%";
      
      if (k < listMobileInfo.size() - 1) {
        tablebuffer.append(tmpvalue + "^");
      } else {
        tablebuffer.append(tmpvalue);
      }
    }
    info = tablebuffer.toString();
    return info;
  }
}
