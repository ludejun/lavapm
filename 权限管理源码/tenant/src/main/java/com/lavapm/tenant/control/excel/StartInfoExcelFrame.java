package com.lavapm.tenant.control.excel;

import java.text.DecimalFormat;
import java.util.List;

import com.lavapm.tenant.bean.Daydata;
import com.lavapm.tenant.bean.Hourdata;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;


public class StartInfoExcelFrame
{
  public StartInfoExcelFrame() {}
  
  public Object[][] getStartInfoAvgData(List<Daydata> listStartInfoAvg, long allstartinfo)
  {
    Object[][] data = (Object[][])null;
    Daydata daydata = null;
    float startInfoavg = 0.0F;
    
    if ((listStartInfoAvg != null) && (listStartInfoAvg.size() != 0)) {
      data = new Object[listStartInfoAvg.size() + 1][2];
      data[0][0] = "日期";
      data[0][1] = "人均日启动次数";
      
      for (int i = 0; i < listStartInfoAvg.size(); i++) {
        daydata = (Daydata)listStartInfoAvg.get(i);
        
        startInfoavg = Util.getAvg(Integer.valueOf(daydata.getDstartup()), Integer.valueOf(daydata.getDactiveuser()), ConstString.DECIMALFLAGTWO);
        DecimalFormat df = new DecimalFormat("##.0");
        startInfoavg = Float.parseFloat(df.format(startInfoavg));
        
        data[(i + 1)][0] = Util.timeIntToStr(daydata.getTimeflag(), 2);
        data[(i + 1)][1] = Float.valueOf(startInfoavg);
      }
    }
    return data;
  }
  





  public Object[][] getStartInfoData(List listStartInfo, int cday)
  {
    Object[][] data = (Object[][])null;
    Daydata daydata = null;
    Hourdata hourdata = null;
    
    if ((listStartInfo != null) && (listStartInfo.size() != 0)) {
      data = new Object[listStartInfo.size() + 1][2];
      data[0][0] = "日期";
      data[0][1] = "启动次数";
      
      for (int i = 0; i < listStartInfo.size(); i++) {
        if ((cday > 0) && (cday <= 1)) {
          hourdata = (Hourdata)listStartInfo.get(i);
          data[(i + 1)][0] = Util.timeIntToStr(hourdata.getTimeflag(), 1);
          data[(i + 1)][1] = Integer.valueOf(hourdata.getHusetime());
        } else {
          daydata = (Daydata)listStartInfo.get(i);
          data[(i + 1)][0] = Util.timeIntToStr(daydata.getTimeflag(), 2);
          data[(i + 1)][1] = Integer.valueOf(daydata.getDstartup());
        }
      }
    }
    return data;
  }
}
