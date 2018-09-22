package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.Customevent;
import com.lavapm.tenant.tool.ConstString;
import com.lavapm.tenant.tool.Util;






public class CustomEventExcelFrame
{
  public CustomEventExcelFrame() {}
  
  public Object[][] getCustomeventInfoData(List<Customevent> customeventList)
  {
    Object[][] data = (Object[][])null;
    Customevent customevent = null;
    if ((customeventList != null) && (customeventList.size() != 0)) {
      data = new Object[customeventList.size() + 1][3];
      data[0][0] = "日期";
      data[0][1] = "事件发生次数";
      data[0][2] = "人均发生次数";
      float puseravg = 0.0F;
      
      for (int i = 0; i < customeventList.size(); i++) {
        customevent = (Customevent)customeventList.get(i);
        puseravg = Util.getAvg(Long.valueOf(customevent.getEventnum()), Integer.valueOf(customevent.getUsernum()), ConstString.DECIMALFLAGTWO);
        
        data[(i + 1)][0] = Util.timeIntToStr(customevent.getTimeflag(), 22);
        data[(i + 1)][1] = Long.valueOf(customevent.getEventnum());
        data[(i + 1)][2] = Float.valueOf(puseravg);
      }
    }
    return data;
  }
}
