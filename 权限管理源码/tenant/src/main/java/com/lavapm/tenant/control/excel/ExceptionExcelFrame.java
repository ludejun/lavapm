package com.lavapm.tenant.control.excel;

import java.util.List;

import com.lavapm.tenant.bean.ExceptionInfo;
import com.lavapm.tenant.tool.Util;

public class ExceptionExcelFrame
{
  public ExceptionExcelFrame() {}
  
  public Object[][] getExceptionInfoData(List<ExceptionInfo> exceptionlist)
  {
    Object[][] data = (Object[][])null;
    ExceptionInfo exceptioninfo = null;
    
    if ((exceptionlist != null) && (exceptionlist.size() != 0)) {
      data = new Object[exceptionlist.size() + 1][4];
      data[0][0] = "版本号";
      data[0][1] = "错误（次数|人数）";
      data[0][2] = "启动（次数|人数）";
      data[0][3] = "错误率";
      

      float errorp = 0.0F;
      float peoplep = 0.0F;
      for (int i = 0; i < exceptionlist.size(); i++) {
        exceptioninfo = (ExceptionInfo)exceptionlist.get(i);
        
        errorp = Util.getPercentage(Integer.valueOf(exceptioninfo.getErrornum()), Integer.valueOf(exceptioninfo.getStartupnum()), com.lavapm.tenant.tool.ConstString.DECIMALFLAGTWO);
        peoplep = Util.getPercentage(Integer.valueOf(exceptioninfo.getErrordevnum()), Integer.valueOf(exceptioninfo.getStartupusernum()), com.lavapm.tenant.tool.ConstString.DECIMALFLAGTWO);
        

        data[(i + 1)][0] = exceptioninfo.getVersion();
        data[(i + 1)][1] = (exceptioninfo.getErrornum() + " | " + exceptioninfo.getErrordevnum());
        data[(i + 1)][2] = (exceptioninfo.getStartupnum() + " | " + exceptioninfo.getStartupusernum());
        data[(i + 1)][3] = ((int)errorp + "% | " + peoplep + "%");
      }
    }
    return data;
  }
}
