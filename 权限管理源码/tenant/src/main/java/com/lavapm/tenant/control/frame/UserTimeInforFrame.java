package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;

public class UserTimeInforFrame
{
  private Daydata dayData = null;
  private Hourdata hourdata = null;
  

  public UserTimeInforFrame() {}
  

  public String getUserTimeInfoGrid(int type, List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    for (int i = 0; i < listInfo.size(); i++) {
      dayData = ((Daydata)listInfo.get(i));
      tmpvalue = Util.timeIntToStr(dayData.getTimeflag(), type) + "," + dayData.getDavgusetime();
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
  





  public String getUserTimeInfoAvgGrid(int type, List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    float UserTimeinfoavg = 0.0F;
    for (int i = 0; i < listInfo.size(); i++) {
      dayData = ((Daydata)listInfo.get(i));
      UserTimeinfoavg = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      tmpvalue = Util.timeIntToStr(dayData.getTimeflag(), type) + "," + Util.floatToTime(UserTimeinfoavg);
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
}
