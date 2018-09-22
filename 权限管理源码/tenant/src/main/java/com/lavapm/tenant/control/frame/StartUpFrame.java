package com.lavapm.tenant.control.frame;

import java.util.List;

import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;

public class StartUpFrame
{
  private Daydata dayData = null;
  private Hourdata hourdata = null;
  


  public StartUpFrame() {}
  

  public String getStartInfoGrid(int type, List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    for (int i = 0; i < listInfo.size(); i++) {
      if (type == 1) {
        hourdata = ((Hourdata)listInfo.get(i));
        tmpvalue = Util.timeIntToStr(hourdata.getTimeflag(), type) + "," + hourdata.getHstartup();
      } else {
        dayData = ((Daydata)listInfo.get(i));
        tmpvalue = Util.timeIntToStr(dayData.getTimeflag(), type) + "," + dayData.getDstartup();
      }
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
  






  public String getStartInfoAvgGrid(int type, List listInfo)
  {
    StringBuffer sbuffer = new StringBuffer();
    String tmpvalue = "";
    float startinfoavg = 0.0F;
    for (int i = 0; i < listInfo.size(); i++) {
      dayData = ((Daydata)listInfo.get(i));
      startinfoavg = Util.getAvg(Integer.valueOf(dayData.getDstartup()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
      tmpvalue = Util.timeIntToStr(dayData.getTimeflag(), type) + "," + startinfoavg;
      if (i < listInfo.size() - 1) {
        sbuffer.append(tmpvalue + "&");
      } else {
        sbuffer.append(tmpvalue);
      }
    }
    return sbuffer.toString();
  }
}
