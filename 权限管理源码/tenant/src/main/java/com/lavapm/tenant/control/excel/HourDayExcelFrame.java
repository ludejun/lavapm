package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;






public class HourDayExcelFrame
{
  public HourDayExcelFrame() {}
  
  public Object[][] getGisInfoData(List listInfo, int allnewuser, int cday)
  {
    Object[][] data = (Object[][])null;
    Daydata dayData = null;
    int type = 0;
    if ((cday > 0) && (cday <= 1)) {
      type = 1;
    } else {
      type = 2;
    }
    
    if ((listInfo != null) && (listInfo.size() != 0)) {
      data = new Object[listInfo.size() + 1][6];
      data[0][0] = "日期";
      data[0][1] = "新增用户";
      data[0][2] = "活跃用户";
      data[0][3] = "平均单次使用时长";
      data[0][4] = "启动次数";
      data[0][5] = "累计用户总量";
      
      int num = allnewuser;
      for (int i = listInfo.size(); i > 0; i--) {
        dayData = (Daydata)listInfo.get(i - 1);
        
        data[i][0] = Util.timeIntToStr(dayData.getTimeflag(), type);
        data[i][1] = Integer.valueOf(dayData.getDnewuser());
        data[i][2] = Integer.valueOf(dayData.getDactiveuser());
        float avgtime = Util.getAvg(Integer.valueOf(dayData.getDusetime()), Integer.valueOf(dayData.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        data[i][3] = Util.floatToTime(avgtime);
        data[i][4] = Integer.valueOf(dayData.getSumstartup());
        num = dayData.getDnewuser() + num;
        data[i][5] = Integer.valueOf(num);
      }
    }
    return data;
  }
}
