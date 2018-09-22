package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;




public class UserTimeExcelFrame
{
  public UserTimeExcelFrame() {}
  
  public Object[][] getUserTimeAvgData(List listUsertimeAvg, long allusertime)
  {
    Object[][] data = (Object[][])null;
    Daydata daydata = null;
    float startInfoavg = 0.0F;
    
    if ((listUsertimeAvg != null) && (listUsertimeAvg.size() != 0)) {
      data = new Object[listUsertimeAvg.size() + 1][2];
      data[0][0] = "日期";
      data[0][1] = "平均使用时长";
      
      for (int i = 0; i < listUsertimeAvg.size(); i++) {
        daydata = (Daydata)listUsertimeAvg.get(i);
        startInfoavg = Util.getAvg(Integer.valueOf(daydata.getDusetime()), Integer.valueOf(daydata.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        
        data[(i + 1)][0] = Util.timeIntToStr(daydata.getTimeflag(), 2);
        data[(i + 1)][1] = Util.floatToTime(startInfoavg);
      }
    }
    return data;
  }
  




  public Object[][] getUserTimeData(List listusertime)
  {
    Object[][] data = (Object[][])null;
    Daydata daydata = null;
    
    if ((listusertime != null) && (listusertime.size() != 0)) {
      data = new Object[listusertime.size() + 1][2];
      data[0][0] = "日期";
      data[0][1] = "使用时长";
      
      for (int i = 0; i < listusertime.size(); i++) {
        daydata = (Daydata)listusertime.get(i);
        data[(i + 1)][0] = Util.timeIntToStr(daydata.getTimeflag(), 2);
        data[(i + 1)][1] = Util.floatToTime(daydata.getDusetime());
      }
    }
    return data;
  }
}
